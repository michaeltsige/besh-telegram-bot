const { Markup } = require("telegraf");

module.exports = (ctx) => {
  ctx.reply(
    "🎉 Welcome to Besh Bingo!\nPlease share your phone number to start.",
    Markup.keyboard([
      Markup.button.contactRequest("📱 Share Contact"),
    ]).resize(),
  );
};
