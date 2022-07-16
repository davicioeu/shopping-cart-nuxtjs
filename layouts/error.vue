<template>
  <div class="container">
    <div class="error">
      <p v-if="error.statusCode === 404">
        404<br>
        {{ $t('message.page_not_found') }}
      </p>
      <p v-else>
        {{ $t('message.error') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default'
}
</script>

<style scoped>
  .error {
    text-align: center;
    color: #A9A7BA;
    font-size: 32px;
    font-weight: bold;
  }
</style>
