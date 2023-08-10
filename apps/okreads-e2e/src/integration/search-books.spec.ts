describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  beforeEach(() => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-content').then((ele) => {
      const ele2 = ele.find('.reading-list-item');
      const len = ele2.length;
      if (len > 0) {
        cy.get('.reading-list-item').each(($ele) => {
          cy.wrap($ele).find('button').last().click();
        });
      }
    });
    cy.get('[data-testing="reading-list-container"] h2 button').click();
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  xit('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
  });
  
  it('Then: add book to reading list & undo the action', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    cy.get('[data-testing="book-item"]')
      .first()
      .find('button[data-testing="add book"]')
      .click();
    cy.get('.test-add-redo-action .mat-simple-snackbar-action button').click();
    cy.get('[data-testing="book-item"]')
      .first()
      .find('button[data-testing="add book"]')
      .should('be.enabled');
  });
});
