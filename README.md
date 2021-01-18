# Test and Automation Challenge #

#### Usage
 
The only dependency you need to run the framework is [Docker](https://docs.docker.com/engine/install/)

## Development Sandbox

This repo uses docker-compose to create a development sandbox because it's important to start with the developer experience.

You can run the whole app in development mode doing this command `npm run sandbox` and use it at http://localhost:3000


## Task 1: Create an automated API level test scenario ##

Just run `npm run api-tests` to run the api-tests.
 
#### Improvements

I created a pseudo test database and dev database on the file system. The application uses the appropriate file depending which mode it is run in `ENV=test` or `ENV=dev`. To improve this I'd create a database container and add this to the Docker Compose. Enabling Direct Model Access (DMA) would facilitate the "Given" part of the testing; where test data is set up in a specific state and inserted into the database directly before executing the test.

I'd leverage Typescript in the application code and have static types as the foundation of the test pyramid. Catching type error at compile time and whilst developing.


## Task 2: Create an automated UI level test scenario ##

Just run `npm run ui-tests` to run the ui-tests 

#### Improvements

I use the psuedo dev database directly in the ui-tests to assert the expectations are correct.
Ideally this would be an actual database and not JSON files in a directory.

Created app specific methods for the ui-testing by extending Cypress.

Used page objects or extend Cypress with methods that encapsulted the CSS selectors used in the tests.

Not used the UI to setup state for the app tests.

Added test anchors in the HTML for selelcting elements in the tests

## Task 3: Create a CI pipeline


#### Improvements







