<template>
  <section v-if="routeName !== 'index'" class="breadcrumbs">
    <div class="container">
      <div class="row">
        <ul>
          <li>
            <nuxt-link :to="{ name: 'index' }">
              {{ $t('link.index') }}
            </nuxt-link>
          </li>
          <template v-for="(breadcrumb, index) in breadcrumbs">
            <li :key="`b-right-${index}`">
              <i class="fas fa-chevron-right" />
            </li>
            <template v-if="index !== breadcrumbs.length - 1">
              <template v-if="typeof breadcrumb.routeBack !== 'undefined'">
                <li :key="`b-link-${index}`">
                  <a href="javascript:void(0)" @click="routeBack">
                    {{ breadcrumb.linkName }}
                  </a>
                </li>
              </template>
              <template v-else-if="typeof breadcrumb.routeObject !== 'undefined'">
                <li :key="`b-link-${index}`">
                  <nuxt-link :to="breadcrumb.routeObject">
                    {{ breadcrumb.linkName }}
                  </nuxt-link>
                </li>
              </template>
              <template v-else>
                <li :key="`b-link-${index}`">
                  <nuxt-link :to="{ name: breadcrumb.routeName }">
                    {{ breadcrumb.linkName }}
                  </nuxt-link>
                </li>
              </template>
            </template>
            <template v-else>
              <li :key="`b-link-${index}`" class="last">
                {{ breadcrumb.linkName }}
              </li>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Breadcrumbs',
  data: () => ({
    routeName: null,
    breadcrumbs: []
  }),
  computed: mapGetters({
    BREADCRUMBS: 'breadcrumbs/breadcrumbs'
  }),
  watch: {
    $route () {
      this.routeName = this.$route.name
    },
    'BREADCRUMBS' (breadcrumbs) {
      this.breadcrumbs = breadcrumbs
    }
  },
  mounted () {
    this.routeName = this.$route.name
  },
  methods: {
    routeBack () {
      this.$router.back()
    }
  }
}
</script>
