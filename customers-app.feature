Feature: Customers App

The Customers App web application is aimed at our sales team so that they can have access to our customer's contact information.

Scenario: App user provides their name
    Given the app user provides their name
    Then they should be presented with the Customer List Screen

Scenario: App user fails to supply their name
    Given the app user doesn't provide their name
    Then they should see a message "Please provide your name"

Scenario: Customer List Screen
    Given there are customers
    Then you should be able to see the "Name", "# of Employees", "Size" of all the customers in the system

Scenario: Contacts Detail Screen
    When the user selects a name of the company from the Customer List Screen
    Then they should be presented with the Contact Detail Screen showing the "Name", "# of Employees", "Size"

Scenario: Contact Datails Screen - No contact info available
    When the user selects a name of the company from the Customer List Screen
    And the customer doesn't have contact info
    Then a message "No contact info available" should be shown

Scenario: Contact Datails Screen - Back to the Customer List Screen
    When a app user clicks the "back to list" button
    Then they should be presented with the Customer List Screen
    

Scenario: App user provides their name
    Given the app user provides their name
    Then their name should be in the response

Scenario: Contact info is not in the system
    When the customer's contact information is not in the system
    Then no information should be shown

Scenario: A small company
    When the number of employees is 10 or less 
    Then the company is considered Small

Scenario: A medium company
    When the number of employees is 1000 or less 
    Then the company is considered Medium

Scenario: A big company
    When the number of employees is greater than 1000 
    Then the company is considered big
