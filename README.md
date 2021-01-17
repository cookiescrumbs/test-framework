# Test and Automation Challenge #

## Task 1: Create an automated API level test scenario ##

#### Usage
 
The only dependency you need to run the framework is [Docker](https://docs.docker.com/engine/install/)

Just run `ENV=test docker-compose run api-tests npm run test` to run the api-tests.
 

#### Improvements

I created a pseudo test database and dev database on the file system. The application uses the appropriate file depending which mode it is run in `ENV=test` or `ENV=dev`. To improve this I'd create a database container and add this to the Docker Compose. Enabling Direct Model Access (DMA) would facilitate the "Given" part of the testing; where test data is set up in a specific state and inserted into the database directly before executing the test.

I'd leverage Typescript in the application code and have static types as the foundation of the test pyramid. Catching type error at compile time and whilst developing.

## Task 2: Create an automated UI level test scenario ##

## Task 3: Create a CI pipeline
