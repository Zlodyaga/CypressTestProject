describe('Transaction add tests', () => {
  beforeEach(() => {
    cy.visit('https://dev120.nymbus.com/login')
    cy.fixture('dataLogin').then((dataLogin) => {
      cy.xpath("//input[@name='username']").type(dataLogin.username)
      cy.xpath("//input[@type='password']").type(dataLogin.password)
      cy.xpath("//div[@id='gridMasterContent']//button[@type='button']").click()
    })
  })
  afterEach(() => {
    cy.xpath("//cui-menu[@container='headMenu']").should('exist').click();
    cy.xpath("//a[@aria-label='Logout']").should('exist').click();
    cy.xpath("//button[@class='dialog-button-ok ui-button ui-corner-all ui-widget']").should('exist').click();
  });
it ("Adding transaction test", () => {

  })
})
