
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const tableName = "Post"  //process.env.POST_TABLE

// Invoke with:
// sam build; sam local invoke -e events/event-get-posts.json getPostsFunction --env-vars env.json
exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accepts GET method, you tried: ${event.httpMethod} method.`);
  }

  console.info('received ', event);
  
  const body = JSON.parse(event.body);
  const { user_id } = body;
  
  try {
    const params = {
      TableName: tableName,
      FilterExpression: "user_id = :u",
      ExpressionAttributeValues: {
        ":u": user_id
      }
    }

    const posts = await (await docClient.scan(params).promise()).Items;

    return {
      statusCode: 200,
      body: JSON.stringify(posts)
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
}