# Production Level Backend Setup

This is a video series on backened with javascript

- [Model Link](https://www.youtube.com/watch?v=9B4CvtzXRpc&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=7)

## 1. Git Setup:

```
git init
git add .
git commit -m "Initial Commit"
git branch -M main
git remote add origin https://github.com/john2121981/chai-backend-01.git
git push -u origin main
```

## 2. Setup Nodemon

```
npm install --save-dev nodemon
npm i -D nodemon
```

> create .gitignore file and add copy from [link]https://mrkandreev.name/snippets/gitignore-generator/#Node
> create .env file

## 3. Setup package.json

```
"type": "module",
"dev": "nodemon src/index.js"
```

## 4. Setup Prettier [LInk]https://prettier.io/docs/

`npm i -D prettier`

> create file .prettierrc and add below code:

```
{
"singleQuote" :false,
"bracketSpacing": true,
"tabWidth": 2,
"semi": true,
"trailingComma": "es5"
}
```

> create another file .prettierignore

```
/.vscode
/node*modules
./dist
*.env
.env
.env\_
```

## 4. install express, mongoose, cors and cookie-parser

`npm i express mongoose cookie-parser cors`

## 5. Setup Database connection using index.js in db folder

> Set up the mongodb atlas and copy the connection string to .env file
> define and export the database name in constants.js and import in index.js
> defind cors origin in .env (temporarirly use \* and in produciton time, use the actual origin for front end) Read more about cors documentation and whitelisting etc.
> Setup the connection in the db/index.js using the following code:

```js
import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    ); //()`${process.env.MONGODB_URL}/${{DB_NAME}`)
    console.log(
      `MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`
    ); // console.log(connectionInstance); to see what is coming its interesting
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
```

## 6. Setup app.js

> define app from express and export it

> use all middleware for handling incoming data

```js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//check cors documentation for whitelists
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); //to avoid crashing the site due to excess json files
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //read documentation
app.use(express.static("public"));
app.use(cookieParser());

export default app;
```

## 7. Setup common middlewares in Utils

> Middleware flow

![middleware](../chai-backend-01/public/temp/middleware.jpg)

> Setup middleware asyncHandler.js in utils folder

```js
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
```

alternatively using try catch block

```js
const asyncHandler = (fn) => {
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
};
```

> Setup middleware ApiError.js in utils folder
> Study <https://nodejs.org/api/errors.html>

```js
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
```

> Setup middleware ApiResponse.js in utils folder
> Study this.data and javascript class and inheritence

```js
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
```
