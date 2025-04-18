describe('Create List, Add Task, Move To Daily', () => {
  const listName = 'Temp List for Move';
  const taskTitle = 'Move This Task To Daily';
  const taskDescription = 'Task inside custom list';

  it('should create a list, add a task, move it to daily, and check in daily page', () => {
    cy.visit('/main');

    cy.wait(1000);
    cy.get('[data-cy="add-list-button"]').click();
    cy.wait(1000);
    cy.get('input[formControlName="title"]').type(listName);
    cy.get('[data-cy="add-edit-button"]')
      .should('be.visible')
      .click({ force: true });
    cy.wait(1000);

    cy.get('[data-cy="list-card"]')
      .filter(`:has([data-cy="list-title"]:contains("${listName}"))`)
      .click({ multiple: true });
    cy.wait(1000);

    cy.get('[data-cy="add-new-task-button"]').click();
    cy.wait(1000);
    cy.get('input[formControlName="title"]').type(taskTitle);
    cy.wait(1000);
    cy.get('input[formControlName="description"]').type(taskDescription);
    cy.get('[data-cy="task-submit-button"]').click();
    cy.wait(1000);
    cy.get('[data-cy="task-card"]')
      .filter(`:has([data-cy="task-title"]:contains("${taskTitle}"))`)
      .within(() => {
        cy.get('[data-cy="task-menu-button"]').click({ force: true });
      });
    cy.wait(1000);
    cy.contains('button', 'Move Daily').click();

    cy.wait(1000);
    cy.visit('/daily');

    cy.wait(1000);
    cy.get('[data-cy="task-card"]')
      .filter(`:has([data-cy="task-title"]:contains("${taskTitle}"))`)
      .should('exist');
    assert.isTrue(true, 'Task Move to Daily successfully');
  });
});
