import getSymbolFromCurrency from 'currency-symbol-map';
import TelegramBot from 'node-telegram-bot-api';

const { TELEGRAM_BOT_TOKEN = '' } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  // tslint:disable-next-line no-console
  console.error('Seems like you forgot to pass Telegram Bot Token. I can not proceed...');
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {polling: true});
const startMessage = 'Hi! I can give you a currency symbol for a currency code you send to me!';

bot.on('message', (msg) => {
  const {text, chat: { id }} = msg;

  if (!text || text.match(/\/start/)) {
    bot.sendMessage(id, startMessage);
    return;
  }

  const symbol = getSymbolFromCurrency(text);
  const responseText = symbol || 'Sorry, I don\'t know the currency code...';

  bot.sendMessage(id, responseText);
});
