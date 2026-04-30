const api = require("../utils/api");
const { mainMenu } = require("../commands");

module.exports = async (ctx) => {
  const contact = ctx.message.contact;
  if (!contact?.phone_number) {
    return ctx.reply("❌ Could not read your phone number. Please try again.");
  }

  try {
    await api.verifyPhone(ctx.from.id, contact.phone_number);
    ctx.reply("✅ Phone verified! Welcome to Besh Bingo.", mainMenu());
  } catch (err) {
    console.error("Verification error:", err.response?.data || err.message);
    ctx.reply("❌ Verification failed. Please try again.");
  }
};
