<template>
  <div class="product_price">
    <div class="name">
      <h1>{{ product.name }}</h1>
      <ul class="name_param">
        <li>
          <p class="sku">
            {{ $t('text.article') }}: <span class="sku_number">{{ product.article }}</span>
          </p>
        </li>
        <li>
          <div class="availability">
            <p
              v-if="product.available > 0"
              class="plus"
            >
              {{ $t('text.in_stock') }}
            </p>
            <p
              v-else
              class="plus"
              style="color: red"
            >
              {{ $t('text.out_of_stock') }}
            </p>
            <form v-if="avgReviews > 0">
              <star-rating
                v-model="avgReviews"
                :increment="1"
                :max-rating="5"
                inactive-color="#CCCCCC"
                active-color="#FFCD00"
                :star-size="25"
                :read-only="true"
                :show-rating="false"
              >
              </star-rating>
            </form>
          </div>
        </li>
      </ul>
    </div>
    <div class="price">
      <ul>
        <li class="new_price">
          {{ product.uah_price }} {{ $t('text.uah') }}
        </li>
        <li v-if="product.uah_old_price > 0" class="old_price">
          <strike>{{ product.uah_old_price }} {{ $t('text.uah') }}</strike>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: ['productItem', 'avgReviews'],
  data: () => ({
    product: {
      name: '',
      article: '',
      uah_price: 0,
      uah_old_price: null
    }
  }),
  watch: {
    'productItem' (value) {
      this.product = value
    }
  },
  mounted () {
    this.product = this.productItem
  }
}
</script>
