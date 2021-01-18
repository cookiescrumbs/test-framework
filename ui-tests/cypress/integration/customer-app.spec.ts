/// <reference types="cypress" />

import { CustomerAppApi, Customer } from '../../../test-framework-lib/types';
import { sizeOfCustomer } from '../../../test-framework-lib/utils';

let database: CustomerAppApi;

context('Customer App', () => {
    const appUserName = 'Jimi Hendrix';
    const errorMessage = 'Please provide your name';
    const missingContactInfoMessage = 'No contact info available';

    let customerMissingContactDetails: Customer;
    let firstCustomer: Customer;

    before(() => {
        // read data from pseudo database
        cy.readFile('../database/dev-database.json').then((data) => {
            database = data;
            customerMissingContactDetails = database.customers[3];
            firstCustomer = database.customers[0];
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    describe('Scenario: App user provides their name', () => {
        describe('Given the app user provides their name', () => {
            it('Then they should be presented with the Customer List Screen', () => {
                cy.get('#name').type(appUserName);
                cy.get('[type="button"]').click();
                cy.get('body').contains(appUserName);
            });
        });
    });

    describe('Scenario: App user fails to supply their name', () => {
        describe('Given the app user doesn\'t provide their name', () => {
            it('Then they should see a message "Please provide your name"',() => {
                cy.get('[type="button"]').click();
                cy.get('body').contains(errorMessage);
            });
        });
    });

    describe('Scenario: Customer List Screen', () => {
        describe('Given there are customers', () => {
            it('Then you should be able to see the "Name", "# of Employees", "Size" of all the customers in the system',() => {
                cy.get('#name').type(appUserName);
                cy.get('[type="button"]').click();

                database.customers.map((customer, index) => {
                    const row = index + 1;
                    const size = sizeOfCustomer(customer.employees);
                    cy.get(`:nth-child(${row}) > :nth-child(1) > a`).contains(customer.name);
                    cy.get(`tbody > :nth-child(${row}) > :nth-child(2)`).contains(customer.employees);
                    cy.get(`tbody > :nth-child(${row}) > :nth-child(3)`).contains(size);
                });
            });
        });
    });    


    describe('Scenario: Contacts Detail Screen', () => {
        describe('When the user selects a name of the company from the Customer List Screen', () => {
            it('Then they should be presented with the Contact Detail Screen showing the "Name", "# of Employees", "Size"',() => {
                const size =  sizeOfCustomer(firstCustomer.employees);
                cy.get('#name').type(appUserName);
                cy.get('[type="button"]').click();
                cy.get(`a:contains(${firstCustomer.name})`).click();
                cy.get('body').contains(firstCustomer.name);
                cy.get('body').contains(firstCustomer.employees);
                cy.get('body').contains(size);
            });
        });
    }); 

    describe('Scenario: Contact Datails Screen - No contact info available', () => {
        describe('When the user selects a name of the company from the Customer List Screen', () => {
            describe('And the customer doesn\'t have contact info', () => {
                it('Then a message "No contact info available" should be shown',() => {
                    cy.get('#name').type(appUserName);
                    cy.get('[type="button"]').click();
                    cy.get(`a:contains(${customerMissingContactDetails.name})`).click();
                    cy.get('body').contains(missingContactInfoMessage);
                });
                
            });
        });
    });

    describe('Scenario: Contact Datails Screen - Back to the Customer List Screen', () => {
        describe('When a app user clicks the "back to list" button', () => {
            describe('Then they should be presented with the Customer List Screen', () => {
                it('Then a message "No contact info available" should be shown',() => {
                    cy.get('#name').type(appUserName);
                    cy.get('[type="button"]').click();
                    cy.get(`a:contains(${firstCustomer.name})`).click();
                    cy.get('[type="button"]').click();
                    cy.get('thead > tr > :nth-child(1)').contains('Name');
                    cy.get('thead > tr > :nth-child(2)').contains('# of Employees');
                    cy.get('thead > tr > :nth-child(3)').contains('Size');
                });
                
            });
        });
    });
});
