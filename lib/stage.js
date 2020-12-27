const { Composer, Stage } = require('telegraf')

const BetterSceneContext = require('./context')

const { compose, lazy, optional, safePassThru } = Composer

class BetterStage extends Stage {
  middleware () {
    return optional(
        (ctx) => ctx[this.options.sessionName],
        compose([
            (ctx, next) => {
              ctx.scene = new BetterSceneContext(ctx, this.scenes, this.options)
      
              return next()
            },
            lazy((ctx) => ctx.scene.current || safePassThru())
        ]),
    )
  }

  static next(state) {
    return (ctx) => ctx.scene.next(state)
  }

  static back(state) {
    return (ctx) => ctx.scene.back(state)
  }
}

module.exports = BetterStage
