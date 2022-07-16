<template>
  <div
    :id="`product-render-item-${product.id}`"
    class="item"
    @click="clickProductItem(product.slug, $event)"
  >
    <button
      v-if="showDeleteFavoriteBtn"
      class="delete"
      @click="removeFromFavorite"
    >
      {{ $t('link.delete') }}
    </button>

    <div class="image">
      <div
        v-if="!showDeleteFavoriteBtn"
        class="labels"
      >
        <div v-if="product.discount_is_active" class="sale">
          <b>{{ $t('text.discount') }}</b>
        </div>
        <div v-if="product.is_hit" class="hit">
          <b>{{ $t('text.hit') }}</b>
        </div>
        <div v-if="product.new_product" class="new">
          <b>
            {{ $t('text.new') }}
          </b>
        </div>
      </div>

      <nuxt-link
        v-if="product.slug.length"
        :to="{ name: 'product', params: { product_slug: product.slug } }"
      >
        <img
          v-if="product.main_image !== null"
          :src="getUrlImg(`products/${product.main_image.image_preview}`)"
          :alt="product.name"
          class="item_img"
        >
      </nuxt-link>
      <div class="item_btns">
        <button
          v-if="!showDeleteFavoriteBtn"
          class="like"
          @click="addToFavorite"
        >
          <img src="/images/heart-white.png" alt="">
        </button>
        <button
          v-if="product.uah_price > 0"
          class="add"
          @click="addToCart(1)"
        >
          <img src="/images/cart-white.png" alt="">
        </button>
      </div>
    </div>
    <h3
      v-if="product.slug.length"
      class="item_desc"
    >
      <nuxt-link :to="{ name: 'product', params: { product_slug: product.slug } }">
        {{ product.name }}
      </nuxt-link>
    </h3>
    <p class="price">
      <strike v-if="product.uah_old_price > 0">
        {{ product.uah_old_price }} {{ $t('text.uah') }}<br>
      </strike>
      {{ product.uah_price }} {{ $t('text.uah') }}
      <span v-if="product.main_filter_item !== null" class="price_desc">
        / {{ product.main_filter_item.name }}
      </span>
    </p>
  </div>
</template>

<script>
import imageMixin from '../../mixins/imageMixin'
import alertsMixin from '../../mixins/alertsMixin'
import favoriteMixin from '../../mixins/favoriteMixin'
import cartMixin from '../../mixins/cartMixin'

export default {
  name: 'RenderItem',
  mixins: [imageMixin, alertsMixin, favoriteMixin, cartMixin],
  props: {
    productItem: {
      default: null
    },
    showDeleteFavoriteBtn: {
      default: false
    }
  },
  data: () => ({
    product: {
      id: null,
      name: '',
      slug: '',
      price: 0,
      old_price: null,
      uah_price: 0,
      uah_old_price: null,
      main_image: {
        id: null,
        image_origin: '',
        image_preview: '',
        sorting_order: 0
      },
      main_filter_item: {
        name: ''
      },
      is_hit: 0,
      discount_is_active: 0,
      new_product: 0
    }
  }),
  mounted () {
    this.product = this.productItem
  },
  methods: {
    clickProductItem (slug, event) {
      event.preventDefault()
      if (event.target.className === 'item') {
        this.$router.push({ name: 'product', params: { product_slug: slug } })
      }
    },
    removeFromFavorite () {
      this.$store.dispatch('favoriteProducts/remove', {
        productId: this.product.id,
        favoriteKey: this.FAVORITE_PRODUCTS_KEY
      }).then((res) => {
        if (res.status === 'success') {
          this.$emit('removeProduct', this.product.id)
          this.$store.dispatch('favoriteProducts/decreaseValueCount')
          this.successAlert(this.$t('message.favorite_success_add'))
        }
      })
    }
  }
}
</script>
