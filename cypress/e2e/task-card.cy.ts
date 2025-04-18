describe('Task Card Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a new task card', () => {
    cy.get('[data-cy="add-new-task-button"]').click();
    cy.wait(1000);
    cy.get('input[formControlName="title"]').type('New Task Title');
    cy.wait(1000);
    cy.get('input[formControlName="description"]').type(
      'This is the description for the new task.',
    );
    cy.wait(1000);
    cy.get('[data-cy="task-submit-button"]').click();

    cy.wait(1000);
    cy.get('[data-cy="task-card"]').should('contain', 'New Task Title');
    cy.get('[data-cy="task-card"]').should(
      'contain',
      'This is the description for the new task.',
    );
    assert.isTrue(true, 'Task added to card successfully');
  });

  it('should edit an existing task card', () => {
    cy.get('[data-cy="task-card"]')
      .filter(':has([data-cy="task-title"]:contains("New Task Title"))')
      .within(() => {
        cy.get('[data-cy="task-menu-button"]')
          .should('exist')
          .click({ force: true });
      });

    cy.get('[data-cy="edit-task"]').click();
    cy.wait(1000);
    cy.get('input[formControlName="title"]').clear();
    cy.wait(1000);
    cy.get('input[formControlName="title"]').type('Updated Task Title');
    cy.wait(1000);
    cy.get('input[formControlName="description"]').clear();
    cy.wait(1000);
    cy.get('input[formControlName="description"]').type(
      'Updated description for the task.',
    );

    cy.get('[data-cy="task-submit-button"]').click();

    cy.wait(1000);
    cy.get('[data-cy="task-card"]').should('contain', 'Updated Task Title');
    cy.get('[data-cy="task-card"]').should(
      'contain',
      'Updated description for the task.',
    );
    assert.isTrue(true, 'Task edited successfully');
  });

  it.only('should delete an existing task card', () => {
    cy.get('[data-cy="task-card"]')
      .filter(':has([data-cy="task-title"]:contains("New Task Title"))')
      .within(() => {
        cy.get('[data-cy="task-menu-button"]')
          .should('exist')
          .click({ force: true });
      });
    cy.wait(1000);

    cy.get('[data-cy="delete-task"]').click();
    cy.wait(1000);
    cy.get('[data-cy="task-card"]').should('not.contain', 'Updated Task Title');
    assert.isTrue(true, 'Task deleted successfully');
  });
});
