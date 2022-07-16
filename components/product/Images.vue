<template>
  <div class="product-image-gallery">
    <div class="main_image">
      <img
        id="main-product-image"
        class="main_img"
        :src="(image.id !== null) ? getUrlImg(`products/${image.image_origin}`) : ''"
        alt=""
        @click="clickMainImage"
      >
    </div>
    <ul class="product-thumbs">
      <li
        v-for="(item, index) in images"
        :key="`image-${item.id}`"
      >
        <a class="sim-thumb"
           :data-image="getUrlImg(`products/${item.image_origin}`)"
           @click="clickImage(item, index)"
        >
          <img :src="getUrlImg(`products/${item.image_origin}`)" alt="">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import productImageMixin from '../../mixins/productImageMixin'

export default {
  name: 'Images',
  mixins: [productImageMixin]
}
</script>
