import parse from "cucumber-tag-expressions";

type DefineSuite = (description: string, tags: string[], testFn: () => void) => void

declare global {
  var defineSuite: DefineSuite;
}

const defineSuite: DefineSuite = (description, tags, testFn) => {
  if (typeof tags === "function") {
    describe(description, tags);
    return;
  }

  const executionTags = Cypress.env("TAGS");

  if (!executionTags) {
    describe(description, testFn);
    return;
  }

  const expression = parse(executionTags);

  if (expression.evaluate(tags)) {
    describe(description, testFn);
  }
};

global.defineSuite = defineSuite;
