const Handlebars = require("handlebars");

const renderTemplate = (htmlContent, data) => {
  const template = Handlebars.compile(htmlContent);
  return template(data);
};

module.exports = { renderTemplate };
