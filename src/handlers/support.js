module.exports = (ctx) => {
  ctx.reply(
    `📞 Contact Support\n\nReach out to: ${process.env.SUPPORT_USERNAME}\nDescribe your issue and we'll help.`,
  );
};
