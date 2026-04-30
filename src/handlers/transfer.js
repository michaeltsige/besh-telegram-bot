const api = require("../utils/api");
const session = require("../utils/session");

const enter = (ctx) => {
  session.clear(ctx.chat.id);
  ctx.reply("Enter the phone number of the recipient:");
  session.get(ctx.chat.id).state = "awaiting_transfer_phone";
};

const textHandler = async (ctx, next) => {
  // <-- ADD async
  const sess = session.get(ctx.chat.id);
  if (!sess.state) return next();

  const text = ctx.message.text;

  if (sess.state === "awaiting_transfer_phone") {
    sess.toPhone = text;
    sess.state = "awaiting_transfer_amount";
    ctx.reply("Enter the amount to transfer:");
  } else if (sess.state === "awaiting_transfer_amount") {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return ctx.reply("❌ Please enter a valid amount.");
    }
    const telegramId = ctx.from.id;
    const { toPhone } = sess;

    try {
      await api.transfer(telegramId, toPhone, amount);
      ctx.reply(`✅ Transferred ${amount} ETB to ${toPhone}.`);
    } catch {
      ctx.reply("❌ Transfer failed. Check the phone number and your balance.");
    }
    session.clear(ctx.chat.id);
  } else {
    return next();
  }
};

module.exports = { enter, textHandler };
