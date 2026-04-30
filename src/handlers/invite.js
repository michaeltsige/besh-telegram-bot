module.exports = async (ctx) => {
  const botUser = await ctx.telegram.getMe();
  const link = `https://t.me/${botUser.username}?start=${ctx.from.id}`;
  ctx.reply(`👥 Share Besh Bingo with friends!\n\nYour invite link:\n${link}`);
};
