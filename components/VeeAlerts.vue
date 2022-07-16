<template>
  <div
    v-if="errors !== null"
    role="alert"
    :class="`alert ${classAlert}`"
    @click="errors = null"
  >
    <p
      v-for="(error, index) in errors"
      :key="`error-p-${index}`"
      :style="(classAlert === 'alert-danger') ? 'color:#BD4F50' : ''"
      class="p-in-vee-alerts"
    >
      {{ error.msg }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'VeeAlerts',
  props: ['propErrors'],
  data: () => ({
    classAlert: 'alert-danger',
    errors: null
  }),
  watch: {
    'propErrors' (errors) {
      this.errors = errors
    }
  },
  mounted () {
    this.errors = this.propErrors
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
