import imageMixin from './imageMixin'

export default {
  mixins: [imageMixin],
  props: ['images', 'mainImage'],
  data: () => ({
    image: {
      id: null,
      image_preview: '',
      image_origin: ''
    }
  }),
  watch: {
    'mainImage' () {
      this.setData()
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      this.image = this.mainImage

      const galleryImages = this.images.map((el) => {
        return this.getUrlImg(`products/${el.image_origin}`)
      })
      this.$emit('changeGalleryImages', galleryImages)
    },
    clickImage (image, index) {
      this.image = image
      this.$emit('changeImageIndex', index)
    },
    clickMainImage () {
      const index = this.images.findIndex(el => el.id === this.image.id)
      this.$emit('changeImageIndex', index)
    }
  }
}
