from telegram.ext import Updater, CommandHandler
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

TOKEN = "7978947898:AAFfshFH2M03IMfqLnyzS8rpL7tJAvkUzP8"

updater = Updater(TOKEN)

def start(update, context):
    kb = [[InlineKeyboardButton(
        "🎬 Abrir DoramaFlix Pro",
        web_app=WebAppInfo(url="https://SEU_SITE/miniapp/index.html")
    )]]
    update.message.reply_text(
        "💜 Bem-vindo ao DoramaFlix Pro\nAssista Doramas Premium abaixo:",
        reply_markup=InlineKeyboardMarkup(kb)
    )

updater.dispatcher.add_handler(CommandHandler("start", start))
updater.start_polling()