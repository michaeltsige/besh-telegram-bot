const axios = require("axios");
const BACKEND_URL = process.env.BACKEND_URL;
const BOT_SECRET = process.env.BOT_SECRET;

module.exports = {
  verifyPhone: (telegramId, phoneNumber) =>
    axios.post(`${BACKEND_URL}/api/auth/update-phone`, {
      telegramId,
      phoneNumber,
      secret: BOT_SECRET,
    }),
  getProfile: (telegramId) =>
    axios.get(`${BACKEND_URL}/api/user/profile-by-telegram-id/${telegramId}`),
  requestDeposit: (telegramId, amount, reference) =>
    axios.post(`${BACKEND_URL}/api/payments/deposit`, {
      telegramId,
      amount,
      reference,
      secret: BOT_SECRET,
    }),
  requestWithdraw: (telegramId, amount, phoneNumber) =>
    axios.post(`${BACKEND_URL}/api/payments/withdraw`, {
      telegramId,
      amount,
      phoneNumber,
      secret: BOT_SECRET,
    }),
  transfer: (fromTelegramId, toPhoneNumber, amount) =>
    axios.post(`${BACKEND_URL}/api/payments/transfer`, {
      fromTelegramId,
      toPhoneNumber,
      amount,
      secret: BOT_SECRET,
    }),
  getReferralInfo: (telegramId) =>
    axios.get(`${BACKEND_URL}/api/user/referral/${telegramId}`),
};
