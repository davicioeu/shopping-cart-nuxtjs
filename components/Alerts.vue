<template>
  <div
    v-if="alerts !== null"
    role="alert"
    :class="`alert ${classAlert}`"
    @click="resetAlerts"
  >
    <template v-if="alerts instanceof Object">
      <template
        v-for="(errors, indexError) in alerts"
      >
        <p
          v-for="(message, indexMessage) in errors"
          :key="`error-m-${indexError}-${indexMessage}`"
          :style="`colorText`"
          class="p-in-alerts"
        >
          {{ message }}
        </p>
      </template>
    </template>

    <template v-if="typeof alerts === 'string'">
      <p :style="colorText">
        {{ alerts }}
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Alerts',
  props: ['propAlerts', 'propClassAlert'],
  data: () => ({
    classAlert: '',
    alerts: null,
    colorText: 'color:#fe3152'
  }),
  watch: {
    'propAlerts' (alerts) {
      this.alerts = alerts
    },
    'propClassAlert' (classAlert) {
      this.classAlert = classAlert
      this.setColorText()
    }
  },
  mounted () {
    this.alerts = this.propAlerts
    this.classAlert = this.propClassAlert
    this.setColorText()
  },
  methods: {
    resetAlerts () {
      this.$emit('resetAlerts')
    },
    setColorText () {
      switch (this.classAlert) {
        case 'alert-danger':
          this.colorText = 'color:#BD4F50'
          break
        case 'alert-success':
          this.colorText = 'color:#2C7C3F'
          break
        case 'alert-primary':
          this.colorText = 'color:#163F6F'
      }
    }
  }
}
</script>

<style scoped>
  .alert-primary {
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
  }
  .alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  .alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }

  .alert {
    position: relative;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
  }
</style>
