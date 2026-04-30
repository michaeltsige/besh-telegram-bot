const api = require("../utils/api");
const session = require("../utils/session");

const enter = (ctx) => {
  session.clear(ctx.chat.id);
  ctx.reply("Enter the amount you want to deposit (min 10 ETB):");
  session.get(ctx.chat.id).state = "awaiting_deposit_amount";
};

const textHandler = async (ctx, next) => {
  // <-- ADD async
  const sess = session.get(ctx.chat.id);
  if (!sess.state) return next();

  const text = ctx.message.text;

  if (sess.state === "awaiting_deposit_amount") {
    const amount = parseInt(text);
    if (isNaN(amount) || amount < 10) {
      return ctx.reply(
        "❌ Minimum deposit is 10 ETB. Please enter a valid amount.",
      );
    }
    sess.amount = amount;
    sess.state = "awaiting_deposit_reference";
    ctx.reply(
      `📱 Send **${amount} ETB** to:\n📞 ${process.env.TELEBIRR_PHONE}\n👤 ${process.env.TELEBIRR_NAME}\n\nThen paste the SMS confirmation message here.`,
    );
  } else if (sess.state === "awaiting_deposit_reference") {
    const reference = text;
    const { amount } = sess;
    const telegramId = ctx.from.id;

    try {
      await api.requestDeposit(telegramId, amount, reference);
      ctx.reply(
        "✅ Deposit submitted for review. Your balance will be updated once approved.",
      );
    } catch {
      ctx.reply("❌ Deposit submission failed. Please try again.");
    }
    session.clear(ctx.chat.id);
  } else {
    return next();
  }
};

module.exports = { enter, textHandler };
