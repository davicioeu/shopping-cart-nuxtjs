<template>
  <div
    v-if="forPayment > 0"
    :class="(addClassAfterScroll) ? 'items_sum itemsSum-menu' : 'items_sum'"
  >
    <div class="items_sum_column">
      <p class="sum_header">
        {{ $t('text.total') }}
      </p>
      <div class="row sum_products">
        <p class="quantity">
          <span>{{ countProducts }} {{ $t('text.pc') }}</span> {{ $t('text.for_sum') }}
        </p>
        <p class="summ">
          {{ totalPrice }} {{ $t('text.uah') }}
        </p>
      </div>
      <div
        v-if="discount > 0"
        class="row sum_discount"
      >
        <p class="disc_text">
          {{ $t('text.discount') }}
        </p>
        <p class="discount">
          {{ discount }} {{ $t('text.uah') }}
        </p>
      </div>
      <div class="hr">
        <hr>
      </div>
      <div class="amount">
        <p>{{ forPayment }} {{ $t('text.uah') }}</p>
      </div>
    </div>
    <div class="items_sum_promo" style="display: none">
      <p class="sum_footer">
        У Вас есть промокод?
      </p>
      <div class="promo_btns">
        <input type="text" class="promocode" placeholder="Введите промокод">
        <!--<div class="modal_error">
            <p class="success">
                УСПЕХ
            </p>
            <p class="error">
                ОШИБКА
            </p>
            <p class="alert">
                ВНИМАНИЕ
            </p>
        </div> -->
        <button class="submit_promo">
          Применить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Total',
  props: [
    'addClassAfterScroll',
    'totalPrice',
    'discount',
    'countProducts',
    'forPayment'
  ]
}
</script>
