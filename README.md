# Creator Studio App

## Summary
This is the central repository for the React Native app for supporting CCC's marketplace app which allows women in the Congo to upload digital artwork and transform them into clothing. The target audience is women survivors in the Congo with majority Android devices.


The repository is split into two parts `/client` which corresponds to the React Native front-end application and `/service` which is the AWS backend, written in Node.js.

# Client 
The react native app is bundled with  [Expo](https://expo.io/). We run the project as an expo bare react native android project, as opposed to the Expo Go simulator, because Auth0, our identity provider, is not compatible with that managed workflow.

## How to Run
You can use VSCode or your favorite editor.

1. Install dependencies with `npm i` in the root directory.
2. Open an android emulator. To do this follow [these instructions](https://docs.expo.dev/workflow/android-studio-emulator/).
3. In the emulator, log into your google account (Navigate to Google Chrome, log in the top right icon)
4.![Google Login](https://gcdnb.pbrd.co/images/LafGyiOOn9GA.png?o=1)
5. In one terminal run `npx react-native start` to start the bundler. This is where you can see console messages.
6. In a different terminal run `npx react-native run-android` to start the application.

## Auth0

Auth0 is how we provide authentication and authorization for users. Currently we support an email/password login scheme. 

Our "tentant" (Team account) is `congoclothingco`. Auth0 has a database connection called `Username-Password-Authentication` under `Authentication` which shows the current users. Auth0 can only store basic info like email and name, so all other user state is contained with the `Users` Dynamo DB table in AWS. 

We use the 'CCC Creator Studio' Application and provide ClientID and Client Secrets to AWS from this Application.

For all authentication events, Auth0 provides their own portals, which would work great for regular web applications. However, we are building a native application and therefore use our own custom UI and call the [Auth0 Authentication API](https://auth0.com/docs/api/authentication) to perform Signups/Login/Logout, etc. 

## AWS
Login as IAM user, organization ID `344824068064`. Ask Milain for an account.

### SAM
On the backend, we use [AWS SAM](https://aws.amazon.com/serverless/sam/) to develop a serverless application. SAM simplifies the Infrastructure as Code (IaC) model and uses [CloudFormation](https://aws.amazon.com/cloudformation/) under the hood. You can learn more about SAM [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html). Our infrastructure stack is described by `template.yaml` and gives definitions for tables, functions, and storage (S3). 
- All functions are stateless [Lambda](https://aws.amazon.com/lambda/) functions written in Node.js. 
- All tables are NoSQL [DynamoDb](https://aws.amazon.com/dynamodb/) tables.
- We use [S3](https://aws.amazon.com/s3/) blob object store for storing blob data.
- We specify a web endpoint through [API Gateway](https://aws.amazon.com/api-gateway/). When you deploy the SAM application, you will receive a web endpoint where you can direct all HTTP requests. 
- Logs are deployed to [https://aws.amazon.com/cloudwatch/](Cloudwatch).

You can deploy this SAM template by:
1. `sam build`
2. `sam deploy --guided`, you can use all defaults. 

#### Testing locally
To test out your lambda functions locally. You first build the SAM template, then follow [https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-invoke.html](these) steps. An example command to create a user would be
`sam local invoke -e events/event-create-user.json createUserFunction --env-vars env.json`. 




You can read more about this bundling process [here](https://reactnative.dev/docs/environment-setup#:~:text=Running%20your%20React%20Native%20application,the%20default%20iOS%20Camera%20app.).


# Design
Our design for this application is hosted on Figma. You can access the link [here](https://www.figma.com/file/MbWAhrXHhKiO9a4boR32r5/CCC-Marketplace?node-id=85%3A2&t=Hc47LAzSiK8IDy5T-1). There are 3 pages to this design:

## Marketplace Console
This is the dashboard that CCC can use to view uploaded photos and organize them. Photos are uploaded to AWS S3 buckets though the key `user/filename`. This console mirrors that design with an interface that looks and feels a lot like Google Drive.

## Mobile App
This is the React Native app that the women use to upload photos. Currently all front-end pages are present, but the functionality does not work 100%. 

#### Here is what is finished

- Create an account
- Login
- Logout
- Upload a photo to S3
- Detail View of a post

#### Here is what needs to be finished
- See your uploaded photos:
	- Uploaded photos should populate the home/Designs page. Dummy data is used. This entails fetching photos for a user from the `Posts` DynamoDB table with the associated `S3` blobs
- Forgot password
	- Make a call to [this](https://auth0.com/docs/authenticate/database-connections/password-change) Auth0 endpoint
	- Profile page change settings
		- Update DynamoDB user tables and Auth0 database with information. (These 2 user states should be consistent)
- Cashout button
	- Once payments are integrated, we need a way to initiate a cashout to mobile money account process.

# Payments

The documentation, provided by Insight technologies can be found under `/payments`. There is one relevant API, the one described by bullet `10b`. Essentially, we need to create an authentication token and send a request to `https://access.payworld.cg/api/v1/payment/PosRequest` with the correct parameters.

The payment flow, for the "Insight Technologies API" is as follows:

0. Insight assign us, Congo clothing company, a merchant_id. We use this `merchant_id` for all transactions.
1. A seller creates an account with a phone number, Insight assigned them an id `seller_id`.  Let’s assume this is a MTN number.
2. Seller lists an item for 10 USD (20450 CDF).
3. Congo Clothing company clicks “buy” on this item. We create an order reference number and associate this with our user ID “seller_id”. We send this request to the endpoint `/payment/PosRequest` described in section 10b of the documentation.
4. From this request response, we capture transaction id, payment id, status, amount, date, transaction fees, and receiving number.  If successful, the seller sees they now have 10USD in their account.
5. Seller presses a “Cashout” button. This sends a request to the “MTN Disbursement Payment Request API” which has the same /payment/PosRequest endpoint. This requests succeeds and now their mobile money account has been credited 10 USD.