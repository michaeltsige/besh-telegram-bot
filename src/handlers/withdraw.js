const api = require("../utils/api");
const session = require("../utils/session");

const enter = (ctx) => {
  session.clear(ctx.chat.id);
  ctx.reply("Enter the amount to withdraw (min 10 ETB):");
  session.get(ctx.chat.id).state = "awaiting_withdraw_amount";
};

const textHandler = async (ctx, next) => {
  // <-- ADD async
  const sess = session.get(ctx.chat.id);
  if (!sess.state) return next();

  const text = ctx.message.text;

  if (sess.state === "awaiting_withdraw_amount") {
    const amount = parseInt(text);
    if (isNaN(amount) || amount < 10) {
      return ctx.reply(
        "❌ Minimum withdrawal is 10 ETB. Please enter a valid amount.",
      );
    }
    sess.amount = amount;
    sess.state = "awaiting_withdraw_phone";
    ctx.reply("Enter your phone number to receive the payment:");
  } else if (sess.state === "awaiting_withdraw_phone") {
    const phoneNumber = text;
    const { amount } = sess;
    const telegramId = ctx.from.id;

    try {
      await api.requestWithdraw(telegramId, amount, phoneNumber);
      ctx.reply(
        "✅ Withdrawal request submitted. It will be processed shortly.",
      );
    } catch {
      ctx.reply("❌ Withdrawal request failed. Please try again later.");
    }
    session.clear(ctx.chat.id);
  } else {
    return next();
  }
};

module.exports = { enter, textHandler };
