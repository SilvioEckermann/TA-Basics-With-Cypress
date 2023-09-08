# TA Basics with Cypress.io
Test automation training with hands-on exercises with Cypress.io

## Prerequisites
- Node.js (please use LTS version) - see https://nodejs.org/en 
- Git - see https://git-scm.com/downloads
- IDE (recommended: Visual Studio Code) - see https://code.visualstudio.com/
- Cypress.io - see https://www.cypress.io/

## Content
- 01-JS-Fundamentals - a simple example of JS fundamentals
- 02-CypressBasics - a simple example of UI testing with Cypress.io
- 03-CypressApiTesting - a simple example of API testing with Cypress.io

## Setup
1. Clone this repository
2. Open the project in Visual Studio Code
3. Open a terminal in Visual Studio Code
4. Navigate to the example folder

### 01-JS-Fundamentals
5. Navigate to the lesson folder
6. Run `node lessonX.js` to run script, output will be displayed in the terminal
### 02-CypressBasics 
1. Run `npm install --force` to install the dependencies (--force because application has a vulnerability in one of the dependencies)
2. Run `npm start` to start the application (it will run on http://localhost:4200)
3. Run `npx cypress open` to open Cypress.io
4. . Run `npx cypress run` to run the tests in headless mode
### 03-CypressApiTesting
1. Run `npm install` to install the dependencies
2. Run `npx cypress open` to open Cypress.io
3. Run `npx cypress run` to run the tests in headless mode




