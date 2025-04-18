describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/introduction');
  });

  it('should display the logo image', () => {
    cy.get('img[alt="Logo"]').should('be.visible');
    cy.wait(500);
  });

  it('should display the page title', () => {
    cy.contains('Angular Task (To Do List)').should('be.visible');
    cy.wait(500);
  });

  it('should display developer credit with GitHub link', () => {
    cy.contains('Developed by').should('be.visible');
    cy.get('a[href*="github.com/zmokhtari97"]').should('be.visible');
    cy.wait(500);
  });

  it('should display the instructions and code snippet', () => {
    cy.contains('Start your interactions by going to').should('be.visible');
    cy.contains('code', 'Daily Task List').should('be.visible');
    cy.wait(500);
  });

  it('should navigate to the Daily page when button is clicked', () => {
    cy.get('[data-cy="go-to-daily"]').should('be.visible').click();
    cy.url().should('include', '/daily');
    cy.wait(500);
    assert.isTrue(true, 'introduction test pass');
  });
});
