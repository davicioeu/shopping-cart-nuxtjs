import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ru from './../node_modules/vee-validate/dist/locale/ru'
import uk from './../node_modules/vee-validate/dist/locale/uk'

Validator.localize({
  uk,
  ru
})

Vue.use(VeeValidate)
