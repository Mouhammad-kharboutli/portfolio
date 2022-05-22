# Subscribers REST API

Subscribers REST API is a a public REST API which accept REST ACTIONS on it.

## Capability
This API coming with the following capability:

      o Get all subscribers 
      o Submit new subscriber
      o Get a specific subscriber
      o update a specific subscriber
      o delete a specific subscriber



## HOW TO
I am using a postman application to interact with our API , you can find a detailed explanation about this tool [here](https://github.com/Moooodykh/isPalindrome./blob/main/Readme%20documentation/How%20to%20Postman.pdf)


## Usage
0. Install mongoDB from https://www.mongodb.com/try/download/community  (be sure that you installed it correctly)
1. Install node from https://nodejs.org/en/download/
2. navigate to the location that you downloaded/cloned subsriber project 
3. Open command prompt inside that folder
4. type: yarn dev or npm run dev (this will start up the server)
5. Navigate to (https://localhost:3000/api) to check the all capabilities mentioned above.


#### the phrase's schema is:
```js 
const subscriberSchema = {
  name: {
    type: String,
    required: true,
  },
  subscribedToChannel: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
};
```

## Deployment
I used heroku dev center to deploy my application, for deployment follow the instructions below :

[Getting Started with Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

[Preparing a Codebase for Heroku Deployment](https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment)

[Deploying Node.js Apps](https://devcenter.heroku.com/articles/deploying-nodejs)


## Project status
The implementation is fisnished for this project .please note that there are a lot of ideas to further develop this project but if u want to further develop it . Anyone may choose to fork this project as maintainer or further developer. 

## Support
If you face any issue , I lovely go for help.
just sent an email to [myEmail](mailto:eng.mouhammad.kharboutli@gmail.com)
or drop me a call via Telegram :[Mouhammad kh]

## Feedback 
Thanks a lot for your time reading through the documentation. 
If you have any idea for further development of the solution or the documentation  I higly appreciate your feedback. 
Do not hesitate to contact me to [myEmail](mailto:eng.mouhammad.kharboutli@gmail.com).


## Author 
Mouhammad Kharboutli
