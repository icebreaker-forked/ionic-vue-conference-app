describe('template spec', () => {
  it('passes', () => {
    cy.visit('')
    cy.get('#ion-input-0').type('wonderSign')
    cy.get('#ion-input-1').type('password')
    // cy.get('button[type="submit"]', { includeShadowDom: true }).click({ multiple: true })
  })
})
