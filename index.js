require("dotenv").config();
const { Telegraf } = require("telegraf");
const { setupHandlers } = require("./src/commands");

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("❌ TELEGRAM_BOT_TOKEN missing");

const bot = new Telegraf(token);

// 🔒 Private bot – only allowed users
const allowed = (process.env.ALLOWED_USER_IDS || "")
  .split(",")
  .map(Number)
  .filter(Boolean);

bot.use((ctx, next) => {
  if (allowed.length && !allowed.includes(ctx.from?.id)) {
    return ctx.reply("⛔ Sorry, this is a private bot.");
  }
  return next();
});

setupHandlers(bot);
bot.launch();
console.log("🤖 Besh Bingo bot (Telegraf) running");
