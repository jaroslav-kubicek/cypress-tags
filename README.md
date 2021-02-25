# @kbjz/cypress-tags

Run Cypress tests by tags 🎉

Cypress has no native support for running tests by tags. So you either had to rely on folder structure, implement [custom solution](https://www.mariedrake.com/post/using-tags-to-filter-your-cypress-tests), or use [Cucumber](https://www.npmjs.com/package/cypress-cucumber-preprocessor).

`@kbjz/cypress-tags` is just tiny wrapper around `cucumber-tag-expressions`. Which means you can use all the expressiveness of Cucumber-like tagging without opting into Gherkin syntax.

## Install

```
yarn add @kbjz/cypress-tags
```

Then in your support file (e.g. `support/index.ts`):

```diff
+ import "@kbjz/cypress-tags";
```

## Example

Consider a following test:

```js
defineSuite("Landing page", ["@smoke"], () => {
  it("shows navigation menu", () => {
    cy.visit("/");
    cy.findByTestId("NavBar").should("be.visible");

    cy.log("🍔 menu can be opened");
    cy.findByLabelText("Open navigation menu").click();
    cy.findByTestId("SideNav").should("be.visible");
  });
});
```

If we run tests as follow, it would get skipped:

```
export CYPRESS_TAGS="@feature and not @smoke" 
yarn cypress run
```

## Q&A

- Do I need to switch all my `describe` blocks to `defineSuite` now?

_Nope_, it can be adopted gradually, and both functions can coexist happily in a single codebase. Tests that are using `describe` will be just executed every time. In fact, `defineSuite` calls `describe` function underneath if tags match.
