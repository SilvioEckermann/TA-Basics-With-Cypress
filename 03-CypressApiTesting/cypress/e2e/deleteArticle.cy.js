// https://api.realworld.io/api/users/login

describe('test with backend', () => {
  beforeEach('login to the application', () => {
    // cy.intercept('GET', 'https://api.realworld.io/api/tags', { fixture: 'tags.json' }); // use full url
    // cy.intercept('GET', '**/tags', { fixture: 'tags.json' }); // use wildcard
    cy.intercept({ method: 'GET', path: 'tags' }, { fixture: 'tags.json' }); // use routeMatcher
    // cy.loginToApplication();
    cy.loginToApplicationWithHeadlessAuthentication();
  });

  it.only('delete an article in the application', () => {
    // Szenario:
    // 1. login via API to get token / token is stored in the local storage
    // 2. create an article via API
    // 3. delete the article via UI
    // 4. verify that the article is deleted via API

    const bodyRequest = {
      article: {
        title: 'Request from API',
        description: 'API Testing is easy',
        body: 'Hello from Body',
        tagList: [],
      },
    };
    // 1. login via API to get token
    cy.get('@token').then((token) => {
      // 2. create an article via API
      // should provide object, because we have to provide headers
      cy.request({
        url: Cypress.env('apiUrl') + '/articles',
        headers: { Authorization: 'Token ' + token },
        method: 'POST',
        body: bodyRequest,
      }).then((response) => {
        const requestSlug = response.body.article.slug;
        cy.log('requestSlug:' + requestSlug);
        expect(response.status).to.equal(201);

        // 3. delete the article via UI
        cy.contains('Global Feed').click();
        cy.get('article-preview').contains(bodyRequest.article.title).click();
        cy.get('[ng-click="$ctrl.deleteArticle()"]').first().click();
        cy.wait(500);

        // 4. verify that the article is deleted via API
        cy.request({
          method: 'GET',
          url: Cypress.env('apiUrl') + '/articles/' + requestSlug,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(404);
        });
      });
    });
  });
});
