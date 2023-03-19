/**
 * Creates a post given a keypath, 
 */

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const tableName = "Post"  //process.env.POST_TABLE

exports.handler = async (event) => {
  /*
   * Create a new post and return the ID of that post.
   * sam build; sam local invoke -e events/event-create-post.json createPostFunction --env-vars env.json
   */

  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
  }

  console.info('received:', event);

  const body = JSON.parse(event.body);
  const { user_id, fileKey, questions} = body;

  let response = {};
  const id = Math.random().toString(36).slice(2);

  try {
    const params = {
      TableName: tableName,
      Item: {
        id,
        user_id,
        fileKey,
        questions
      },
    };

    await docClient.put(params).promise();

    response = {
      statusCode: 200,
      body: JSON.stringify(id)
    };
  } catch (e) {
    console.log(e);
    response = {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  } finally {
    return response;
  }
}
