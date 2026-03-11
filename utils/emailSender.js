const { Resend } = require("resend");
const Handlebars = require("handlebars");

const Settings = require("../models/settings.model");
const EmailTemplate = require("../models/emailTemplate.model");

const sendEmail = async ({ templateName, to, variables }) => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      throw new Error("Email settings not configured");
    }

    const resend = new Resend(settings.resendApiKey);

    const template = await EmailTemplate.findOne({
      templateName,
      status: "active",
    });

    if (!template) {
      throw new Error("Email template not found");
    }

    const compiledTemplate = Handlebars.compile(template.htmlContent);

    const html = compiledTemplate(variables);

    const response = await resend.emails.send({
      from: `${settings.emailFromName} <${settings.emailFromAddress}>`,
      to,
      subject: template.subject,
      html,
    });

    return response;
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};

module.exports = { sendEmail };
