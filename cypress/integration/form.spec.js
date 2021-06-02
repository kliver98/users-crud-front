describe('When the user want create an account', ()=>{
    before(() =>{
        cy.visit('http://localhost:8080/');
        cy.get('.btn-primary').click();
    })

    it('The title, name input, lastname input, url input, combobox type identification, number of identification spinbutton, username input, password input, active account checkbox, create and cancel button should be visible', ()=>{
        cy.get('#firstname').should('be.visible');
        cy.get('#lastname').should('be.visible');
        cy.get('#photo').should('be.visible');
        cy.get('#id_type').should('be.visible');
        cy.get('#_id').should('be.visible');
        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#active').should('be.visible');
        cy.get('.form-check-label').should('be.visible');
        cy.get('[style=""] > .mt-4 > .display-4').should('be.visible');
        cy.get('form.text-center > .d-flex > :nth-child(2)').should('be.visible');
        cy.get('.btn-danger').should('be.visible');

    })
})