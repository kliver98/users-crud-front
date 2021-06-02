describe('Given a list that is mocked', () =>{

    before(() => {
        cy.server();
        cy.route('http://localhost:3000/api/latest/users', [
            {
                "active":true,
                "_id":100000,
                "lastname":"",
                "firstname":"admin",
                "username":"admin",
                "id_type":"CI - CedulaIdentidad",
                "password":"",
                "photo":""
                ,"__v":0
            }
        ]);
    })
    describe('When the user goes to the list section', ()=>{
        before(() =>{
            cy.visit('http://localhost:8080/');
        })
    
        it('Then the username should be the right one', ()=>{

            cy.get(`[data-testid=100000]`).should(($p) => {
                expect($p).to.contain("admin");
                expect($p).to.contain(100000);
            });
        })
    })
})

describe('When the main page is loaded', ()=>{
    before(() =>{
        cy.visit('http://localhost:8080/');
    })
    it('The title, create and edit button, login nav bar and search input textbox', ()=>{
        cy.get('h1[data-v-73968b0a=""]').should('be.visible');
        cy.get('.input-group > .form-control').should('be.visible');
        cy.get('.input-group-append > .btn').should('be.visible');
        cy.get('.btn-primary').should('be.visible');
        

    })
})
