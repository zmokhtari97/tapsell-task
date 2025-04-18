describe('Add and Complete Task Flow', () => {
  it('should add a task and mark it as complete', () => {
    const taskTitle = 'New Task To Complete';
    const taskDescription = 'Task description for completion';

    cy.visit('/daily');
    cy.contains('button', 'Add New Task').click();

    cy.wait(1000);
    cy.get('input[formControlName="title"]').type(taskTitle);
    cy.get('input[formControlName="description"]').type(taskDescription);
    cy.get('button').contains('Add Task').click();

    cy.wait(1000);
    cy.get('[data-cy="task-card"]')
      .filter(`:has([data-cy="task-title"]:contains("${taskTitle}"))`)
      .should('exist');

    cy.wait(1000);
    cy.get('[data-cy="task-card"]')
      .filter(`:has([data-cy="task-title"]:contains("${taskTitle}"))`)
      .within(() => {
        cy.get('mat-checkbox input[type="checkbox"]').check({ force: true });
      });

    cy.wait(1000);
    cy.visit('completed');

    cy.wait(1000);
    cy.get('[data-cy="complete-task-card"]')
      .filter(`:has([data-cy="task-title"]:contains("${taskTitle}"))`)
      .should('exist');

    cy.wait(1000);
    assert.isTrue(true, 'complete test pass');
  });
});
