
const { Telegraf, session, Composer } = require('telegraf')
const Scene = require('telegraf/scenes/base')

const { reply } = Composer

const BetterStage = require('../lib')

const bot = new Telegraf(process.env.BOT_TOKEN)

const regAge = new Scene('regAge')
    .enter(reply('Введите свой возраст'))
    .on('text', (ctx) => {
        return ctx.scene.next({ age: ctx.message.text })
    })

const regName = new Scene('regName')
    .enter(reply('Введите свое имя'))
    .on('text', (ctx) => {
        return ctx.scene.next({ ...ctx.scene.state, name: ctx.message.text })
    })

const regCity = new Scene('regCity')
    .enter(reply('Введите свой город'))
    .on('text', (ctx) => {
        return ctx.scene.next({ ...ctx.scene.state, city: ctx.message.text })
    })

const result = new Scene('result')
    .enter(ctx => {
        const state = ctx.scene.state

        return ctx.reply(`Ваши данные:\nВозраст: ${state.age}\nИмя: ${state.name}\nГород: ${state.city}`)
    })

const stage = new BetterStage([
    regAge,
    regName,
    regCity,
    result,
])

bot.use(session())
bot.use(stage.middleware())
bot.start(BetterStage.enter(regAge))
bot.launch()
