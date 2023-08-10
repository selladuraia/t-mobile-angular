describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
  it('Then: I should mark first book as finished reading if not already done', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-content').then((ele) => {
      const ele2 = ele.find('.reading-list-item');
      const len = ele2.length;
      if (len > 0) {
        if (ele.find('[data-finish-btn="book_0"]').length > 0) {
          cy.get('[data-finish-btn="book_0"]').should('be.visible').click();
        }
        cy.get('.read-finished').should('be.visible');
      } else {
        cy.get('.reading-list-content p').should(
          'contain.text',
          "You haven't added any books to your reading list yet."
        );
      }
    });
  });
});
