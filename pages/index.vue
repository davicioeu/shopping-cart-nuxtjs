<template>
  <div>
    <Recommendation />

    <SaleSlider />

    <TabsSlider />

    <AboutUs />
  </div>
</template>

<script>
import Recommendation from '../components/Recommendation'
import SaleSlider from './../components/index/SaleSlider'
import TabsSlider from './../components/index/TabsSlider'
import AboutUs from './../components/index/AboutUs'

export default {
  name: 'Index',
  head () {
    return {
      title: this.$t('link.index')
    }
  },
  layout: 'default',
  components: {
    AboutUs,
    TabsSlider,
    SaleSlider,
    Recommendation
  }
}
</script>
