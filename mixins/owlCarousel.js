export default {
  methods: {
    initOwlClickDots: (el, dots, trigger) => {
      // eslint-disable-next-line
      const owlEl = $(el)
      owlEl.owlCarousel()

      // eslint-disable-next-line
      $(dots).click(function () {
        // eslint-disable-next-line
        owlEl.trigger(trigger, [$(this).index(), 300])
      })
    },
    initOwlClickPrevNext: (el, prev, next, triggerPrev, triggerNext) => {
      // eslint-disable-next-line
      let owlEl = $(el)
      owlEl.owlCarousel()

      // eslint-disable-next-line
      $(prev).click(function() {
        owlEl.trigger(triggerPrev, [300])
      })

      // eslint-disable-next-line
      $(next).click(function() {
        owlEl.trigger(triggerNext)
      })
    }
  }
}
