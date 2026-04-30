const { Markup } = require("telegraf");

function mainMenu() {
  return Markup.keyboard([
    ["🎮 Play", "💰 Balance"],
    ["💳 Deposit", "📖 Instruction"],
    ["🔄 Transfer", "💸 Withdraw"],
    ["💬 Contact Support", "👥 Invite"],
  ]).resize();
}

function setupHandlers(bot) {
  // Start & contact
  bot.command("start", require("./handlers/start"));
  bot.on("contact", require("./handlers/contact"));

  // Play button
  bot.hears("🎮 Play", (ctx) => {
    ctx.reply(
      "Launching Besh Bingo…",
      Markup.inlineKeyboard([
        Markup.button.webApp("🎮 Play Now", process.env.MINI_APP_URL),
      ]),
    );
  });

  // Balance
  bot.hears("💰 Balance", require("./handlers/balance"));

  // Deposit flow
  const deposit = require("./handlers/deposit");
  bot.hears("💳 Deposit", deposit.enter);
  bot.on("text", deposit.textHandler);

  // Withdraw flow
  const withdraw = require("./handlers/withdraw");
  bot.hears("💸 Withdraw", withdraw.enter);
  bot.on("text", withdraw.textHandler);

  // Transfer flow
  const transfer = require("./handlers/transfer");
  bot.hears("🔄 Transfer", transfer.enter);
  bot.on("text", transfer.textHandler);

  // Invite, Support, Instructions
  bot.hears("👥 Invite", require("./handlers/invite"));
  bot.hears("💬 Contact Support", require("./handlers/support"));
  bot.hears("📖 Instruction", require("./handlers/instructions"));
}

module.exports = { setupHandlers, mainMenu };
