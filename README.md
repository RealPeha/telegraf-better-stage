# Telegraf Better Stage
[Telegraf.js stage](https://github.com/telegraf/telegraf/blob/develop/src/stage.ts) with sequential transition between scenes

## Installation
npm

```javascript
npm i telegraf-better-stage --save
```

yarn

```javascript
yarn add telegraf-better-stage
```

## Usage
Just replace

```javascript
const Stage = require('telegraf/stage')
```

with
```javascript
const Stage = require('telegraf-better-stage')
```

And now you can you this stage as default telegraf stage, but you have new cool methods:

### ctx.scene.next

Enter to the next scene

```javascript
const scene1 = new Scene('scene1')
    .enter((ctx) => ctx.scene.next())

const scene2 = new Scene('scene2')
    .enter((ctx) => ctx.reply('Scene 2'))

const stage = new Stage([
    scene1, // first scene
    scene2, // next scene
])

bot.use(stage.middleware())
```

### ctx.scene.back

Enter to the previous scene

### ctx.scene.enter

New way to enter the scene

```javascript
const scene1 = new Scene('scene_first')
    .enter(Composer.reply('Scene 1'))

const scene2 = new Scene('scene_second')
    .enter(Composer.reply('Scene 2'))

bot.start(Stage.enter(scene1)) // instead of using id bot.start(Stage.enter('scene_first'))
```