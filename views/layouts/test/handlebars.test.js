const chai = require('chai');
const { expect } = chai;
const handlebars = require('express-handlebars');

// Example data to be used in the tests
const testData = { title: 'Test Title', content: 'Test Content' };

// Create an instance of Handlebars
const hbs = handlebars.create();

// Example Handlebars template
const template = hbs.compile('{{title}} - {{content}}');

// Describe your test suite
describe('Handlebars Tests', () => {
  // Test case for rendering a Handlebars template
  it('should render the template with correct data', () => {
    // Render the template with testData
    const result = template(testData);

    // Assert that the result matches the expected output
    expect(result).to.equal('Test Title - Test Content');
  });

  // Add more test cases as needed
});
