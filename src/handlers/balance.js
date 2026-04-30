const api = require("../utils/api");

module.exports = async (ctx) => {
  try {
    const res = await api.getProfile(ctx.from.id);
    const u = res.data;
    ctx.reply(
      `🏆 Main Wallet: ${u.mainBalance} ETB\n🎮 Play Wallet: ${u.playBalance} ETB`,
    );
  } catch {
    ctx.reply("❌ Could not fetch balance. Make sure you are verified.");
  }
};
