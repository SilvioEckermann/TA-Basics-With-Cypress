describe('test with backend', () => {
  beforeEach('login to the application', () => {
    // cy.intercept('GET', Cypress.env('apiUrl') + '/api/tags', { fixture: 'tags.json' }); // use full url
    // cy.intercept('GET', '**/tags', { fixture: 'tags.json' }); // use wildcard
    cy.intercept({ method: 'GET', path: 'tags' }, { fixture: 'tags.json' }); // use routeMatcher
    // cy.loginToApplication();
    cy.loginToApplicationWithHeadlessAuthentication();
  });

  it('verify correct request and response', () => {
    // arrange - intercept the request
    cy.intercept('POST', Cypress.env('apiUrl') + '/articles').as('postArticles');
    const timestamp = new Date().getTime();
    const articleTitle = 'Test Article ' + timestamp;
    // act - perform the action
    cy.get('[ui-sref="app.editor"]').click();
    cy.get('[ng-model="$ctrl.article.title"]').type(articleTitle);
    cy.get('[ng-model="$ctrl.article.description"]').type('Test description');
    cy.get('[ng-model="$ctrl.article.body"]').type('Test body');
    cy.get('[ng-click="$ctrl.submit()"]').click();

    // assert - verify the response
    cy.wait('@postArticles').then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.request.body.article.body).to.equal('Test body');
      expect(xhr.response.body.article.description).to.equal('Test description');
    });
  });

  it('intercepting and modifying the request and response', () => {
    const timestamp = new Date().getTime();
    const articleTitle = 'Test Article ' + timestamp;
    // intercept request
    // cy.intercept('POST', Cypress.env('apiUrl') + '/articles', (req) => {
    //   req.body.article.description = 'Test description 2';
    // }).as('postArticles');

    // intercept response
    cy.intercept('POST', Cypress.env('apiUrl') + '/articles', (req) => {
      req.reply((res) => {
        expect(res.body.article.description).to.equal('Test description');
        res.body.article.description = 'Test description 2';
      });
    }).as('postArticles');

    cy.get('[ui-sref="app.editor"]').click();
    cy.get('[ng-model="$ctrl.article.title"]').type(articleTitle);
    cy.get('[ng-model="$ctrl.article.description"]').type('Test description');
    cy.get('[ng-model="$ctrl.article.body"]').type('Test body');
    cy.get('[ng-model="$ctrl.tagField"]').type('API Testing Cypress');
    cy.get('[ng-click="$ctrl.submit()"]').click();

    cy.wait('@postArticles').then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.request.body.article.body).to.equal('Test body');
      expect(xhr.response.body.article.description).to.equal('Test description 2');
    });
  });

  it('verify popular tags are displayed', () => {
    cy.get('.tag-list').should('contain', 'cypress').and('contain', 'automation').and('contain', 'testing');
  });

  it('verify global feed likes count', () => {
    cy.intercept('GET', Cypress.env('apiUrl') + '/articles/feed*', { articles: [], articlesCount: 0 });
    cy.intercept('GET', Cypress.env('apiUrl') + '/articles*', { fixture: 'articles.json' });
    cy.contains('Global Feed').click();
    cy.get('article-list button').then((heartList) => {
      expect(heartList[0]).to.contain(1);
      expect(heartList[1]).to.contain(5);
    });

    cy.fixture('articles').then((file) => {
      const articleLink = file.articles[1].slug;
      file.articles[1].favoritesCount = 6;
      cy.intercept('POST', Cypress.env('apiUrl') + '/articles/' + articleLink + '/favorite', file);
    });
    cy.get('article-list button').eq(1).click().should('contain', '6');
  });
});
