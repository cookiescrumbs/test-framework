/// <reference types="cypress" />

interface CustomerAppApi {
    name: string;
    timestamp: number;
    customers: Array<Customer>
}

interface Customer {
    id: number;
    name: string;
    employees: number;
    contactInfo: ContactInfo;
    size: number;
}

interface ContactInfo { 
    name: string;
    email: string;
}

import { sizeOfCustomer } from '../../../test-framework-lib/utils';

let database: CustomerAppApi;

context('Customer App', () => {
    const appUserName = 'Jimi Hendrix';
    const errorMessage = 'Please provide your name';

    before(() => {
        // read data from pseudo database
        cy.readFile('../database/dev-database.json').then((data) => {
            database = data;
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
});


