<template>
  <div :class="blockClasses">
    <template v-if="AUTH_CHECK">
      <nuxt-link
        :to="{ name: 'UserContactInformation' }"
        :class="(activeRouteName === 'UserContactInformation') ? 'active' : ''"
      >
        {{ $t('link.contact_information') }}
      </nuxt-link>

      <nuxt-link
        :to="{ name: 'UserPromotionalCodes' }"
        :class="(activeRouteName === 'UserPromotionalCodes') ? 'active' : ''"
      >
        {{ $t('link.promotional_codes') }}
      </nuxt-link>
    </template>

    <nuxt-link
      :to="{ name: 'UserFavorite' }"
      :class="(activeRouteName === 'UserFavorite') ? 'active' : ''"
    >
      {{ $t('link.favorite') }}
    </nuxt-link>

    <a
      v-if="AUTH_CHECK"
      href="javascript:void(0)"
      @click="logout"
    >
      {{ $t('link.exit') }}
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Links',
  props: ['blockClasses'],
  data: () => ({
    'activeRouteName': null
  }),
  computed: mapGetters({
    AUTH_CHECK: 'auth/check'
  }),
  mounted () {
    this.activeRouteName = this.$route.name
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({ name: 'index' })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
    }
  }
}
</script>
