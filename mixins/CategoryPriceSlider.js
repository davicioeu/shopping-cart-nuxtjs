export default {
  methods: {
    initPriceSlider (idAmountMin, idAmountMax, idRange, values, min, max) {
      // eslint-disable-next-line
      let elAmountMin = $(idAmountMin);
      // eslint-disable-next-line
      let elAmountMax = $(idAmountMax);
      // eslint-disable-next-line
      let elRange = $(idRange);

      elRange.slider({
        range: true,
        min,
        max,
        values,
        animate: true,
        step: 5,
        slide (event, ui) {
          elAmountMin.val(ui.values[0])
          elAmountMax.val(ui.values[1])
        }
      })

      elAmountMin.val(elRange.slider('values', 0))
      elAmountMax.val(elRange.slider('values', 1))
    }
  }
}
