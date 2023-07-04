describe('Spartan API Tests', {baseUrl: 'http://44.200.6.124:8000/'}, () => {
    it('Get a single spartan', () => {
        cy.request('GET', 'api/spartans/100').then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal('Terence');
        })
    })
    xit('POST a spartan test', () => {
        cy.request({
            method: 'POST',
            url: 'api/spartans',
            body:{
                "gender": "Male",
                "name": "KingOscar",
                "phone": 4567893121
                }
        }
        ).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.success).to.equal('A Spartan is Born!');
            expect(response.body.data.name).to.equal('KingOscar');
            
        })
    })
})