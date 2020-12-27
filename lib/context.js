const { BaseScene } = require('telegraf')
const SceneContext = require('telegraf/scenes/context')

class BetterSceneContext extends SceneContext {
  constructor(ctx, scenes, options) {
    super(ctx, scenes, options)
  
    this.steps = [...scenes.values()]
    this.cursor = this.ctx.session.cursor || 0
  }

  get step() {
    return this.cursor >= 0 && this.steps[this.cursor]
  }

  selectStep(index) {
    this.cursor = index
    this.ctx.session.cursor = index

    return this
  }

  enter(sceneId, initialState, silent) {
    if (sceneId instanceof BaseScene) {
      return this.enter(sceneId.id, initialState, silent)
    }
    
    this.selectStep(this.steps.findIndex(step => step.id === sceneId))

    return super.enter(sceneId, initialState, silent)
  }

  next(state, silent) {
    const nextStep = this.selectStep(this.cursor + 1).step

    if (nextStep) {
      return this.enter(nextStep, state, silent)
    }

    return this.ctx.scene.leave()
  }

  back(state, silent) {
    const prevStep = this.selectStep(this.cursor - 1).step

    if (prevStep) {
      return this.enter(prevStep, state, silent)
    }

    return this.ctx.scene.leave()
  }
}

module.exports = BetterSceneContext
