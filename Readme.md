# chai aur backend series

This is a video series on backened with javascript

- [Model Link](https://www.youtube.com/watch?v=9B4CvtzXRpc&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=7)

## Commands:

git init
git add .
git commit -m "Initial Commit"
git branch -M main
git remote add origin https://github.com/john2121981/chai-backend-01.git
git push -u origin main

npm install --save-dev nodemon
npm i -D nodemon

create .gitignore file and add copy from [link]https://mrkandreev.name/snippets/gitignore-generator/#Node
create .env file

## inside package.json

"type": "module",
"dev": "nodemon src/index.js"

# Add Prettier [LInk]https://prettier.io/docs/

npm i -D prettier
create file .prettierrc and add below code:
{
"singleQuote" :false,
"bracketSpacing": true,
"tabWidth": 2,
"semi": true,
"trailingComma": "es5"
}

create another file .prettierignore

/.vscode
/node*modules
./dist
*.env
.env
.env\_

npm i cookie-parser cors
