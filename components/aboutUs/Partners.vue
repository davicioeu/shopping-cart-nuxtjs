<template>
  <section class="our_partners">
    <div v-if="partners" class="container">
      <div class="row title_block">
        <h2 class="line_before">
          {{ $t('text.partners') }}
        </h2>
      </div>
      <div class="row brands">
        <template
          v-for="partner in partners"
        >
          <div :key="partner.id" class="brand_name">
            <a
              :href="(partner.url) ? partner.url : 'javascript:void(0)'"
              target="_blank"
            >
              <img :src="getUrlImg(`partner/${partner.image_origin}`)" alt="">
            </a>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import imageMixin from '../../mixins/imageMixin'

export default {
  name: 'Partners',
  mixins: [imageMixin],
  props: ['partners']
}
</script>
