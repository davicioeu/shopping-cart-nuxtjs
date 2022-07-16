<template>
  <div :class="(showAuthModal) ? 'modal show-modal' : 'modal'">
    <div v-click-outside="vcoConfig"
         class="modal-content"
    >
      <div class="tabs-container">
        <ul class="tabs">
          <li :class="(tabAuth) ? 'taba active' : 'taba'"
              @click="handlerClickTab"
          >
            <a href="javascript:void(0)">
              {{ $t('link.enter_account') }}
            </a>
          </li>
          <li :class="(!tabAuth) ? 'taba active' : 'taba'"
              @click="handlerClickTab"
          >
            <a href="javascript:void(0)">
              {{ $t('link.registration') }}
            </a>
          </li>
        </ul>
        <div class="tabs-content">
          <div :class="(tabAuth) ? 'tabs-panel active' : 'tabs-panel'"
               data-index="0"
          >
            <LoginForm
              :status-reset-form-login="statusResetFormLogin"
              @handlerCloseAuthModal="handlerCloseAuthModal"
            />
          </div>
          <div :class="(!tabAuth) ? 'tabs-panel active' : 'tabs-panel'"
               data-index="1"
          >
            <RegistrationForm
              :status-reset-form-registration="statusResetFormRegistration"
              @handlerCloseAuthModal="handlerCloseAuthModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationForm from '../forms/RegistrationForm'
import LoginForm from '../forms/LoginForm'

export default {
  name: 'Auth',
  components: {
    LoginForm,
    RegistrationForm
  },
  props: ['showAuthModal'],
  data () {
    return {
      vcoConfig: {
        handler: this.handlerCloseAuthModal,
        middleware: this.middlewareVco,
        events: ['dblclick', 'click'],
        isActive: true
      },
      tabAuth: true,
      statusResetFormRegistration: 0,
      statusResetFormLogin: 0
    }
  },
  watch: {
    $route () {
      this.handlerCloseAuthModal()
    },
    'showAuthModal' (show) {
      if (show) {
        this.statusResetFormRegistration++
        this.statusResetFormLogin++
      }
    }
  },
  methods: {
    handlerClickTab () {
      this.statusResetFormRegistration++
      this.statusResetFormLogin++

      this.tabAuth = !(this.tabAuth)
    },
    handlerCloseAuthModal (event, el) {
      this.$emit('closeAuthModal')
    },
    middlewareVco (event, el) {
      return event.target.className !== 'my_cabinet trigger' &&
        !event.target.className.includes('alert') &&
        event.target.className !== 'p-in-alerts' &&
        event.target.className !== 'p-in-vee-alerts'
    }
  }
}
</script>
