const store = new Map();

function get(chatId) {
  if (!store.has(chatId)) store.set(chatId, {});
  return store.get(chatId);
}

function clear(chatId) {
  store.delete(chatId);
}

module.exports = { get, clear };
