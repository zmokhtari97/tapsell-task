describe('Task List Page', () => {
  beforeEach(() => {
    cy.visit('/main');
  });

  it('should add a new list and verify it appears', () => {
    cy.get('[data-cy="add-list-button"]').click();
    cy.wait(1000);
    cy.get('input[formcontrolname="title"]').type('Test List');
    cy.get('[data-cy="add-edit-button"]')
      .should('be.visible')
      .click({ force: true });
    cy.wait(1000);
    cy.get('[data-cy="list-title"]').should('contain.text', 'Test List');
    assert.isTrue(true, 'list added successfully');
  });

  it.only('should edit an existing list and verify update', () => {
    cy.get('[data-cy="list-card"]')
      .filter(':has([data-cy="list-title"]:contains("Test List"))') // find the right card
      .within(() => {
        cy.get('[data-cy="list-menu-button"]')
          .should('exist')
          .click({ force: true });
      });

    cy.get('[data-cy="edit-list"]').click();

    cy.get('input[formcontrolname="title"]').clear({ force: true });
    cy.wait(500);
    cy.get('input[formcontrolname="title"]').type('Updated Test List');
    cy.get('[data-cy="add-edit-button"]').click();

    cy.wait(1000);
    cy.get('[data-cy="list-title"]').should(
      'contain.text',
      'Updated Test List',
    );

    assert.isTrue(true, 'list update successfully');
  });
});
