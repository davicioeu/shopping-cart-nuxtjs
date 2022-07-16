import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    FAVORITE_PRODUCTS_KEY: 'favoriteProducts/key'
  }),
  methods: {
    addToFavorite () {
      this.$store.dispatch('favoriteProducts/add', {
        productId: this.product.id,
        favoriteKey: this.FAVORITE_PRODUCTS_KEY
      }).then((res) => {
        if (res.status === 'success') {
          if (res.check_if_exists === 0) {
            this.$store.dispatch('favoriteProducts/increaseValueCount')
          }

          this.successAlert(this.$t('message.favorite_success_add'))
        }
      })
    }
  }
}
