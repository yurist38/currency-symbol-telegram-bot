import getSymbolFromCurrency from 'currency-symbol-map';
import TelegramBot from 'node-telegram-bot-api';

const { TELEGRAM_BOT_TOKEN = '' } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  // tslint:disable-next-line no-console
  console.error('Seems like you forgot to pass Telegram Bot Token. I can not proceed...');
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
  console.log(msg); // tslint:disable-line
  const startMessage = 'Hi! I can give you a currency symbol for a currency code you send to me!';
  bot.sendMessage(msg.chat.id, startMessage);
});

bot.on('message', (msg) => {
  const {text, chat: { id }} = msg;
  if (!text) {
    bot.sendMessage(id, 'Seems like you did not send me anything...');
    return;
  }

  const symbol = getSymbolFromCurrency(text);
  const responseText = symbol || 'Sorry, I don\'t know the currency code...';

  bot.sendMessage(id, responseText);
});
