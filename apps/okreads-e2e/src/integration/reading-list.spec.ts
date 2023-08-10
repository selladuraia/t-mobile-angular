describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  beforeEach(() => {
    // :: reset the application state
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
    cy.get('tmo-book-search').then((ele) => {
      const ele2 = ele.find('[data-testing="book-item"]');
      const len = ele2.length;
      if (len === 0) {
        cy.get('input[type="search"]').type('javascript');
        cy.get('form').submit();
        cy.get('[data-testing="book-item"]').should(
          'have.length.greaterThan',
          1
        );
        cy.get('[data-testing="book-item"]').first().find('button').click();
      } else {
        const firstEle = cy
          .get('[data-testing="book-item"]')
          .first()
          .find('button[data-testing="add book"]');
        if (!firstEle.disabled) {
          cy.get('[data-testing="book-item"]')
            .first()
            .find('button[data-testing="add book"]')
            .click();
        }
      }
    });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});
