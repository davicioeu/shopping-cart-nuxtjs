<template>
  <section class="contact_information my_info_mobile">
    <div class="container">
      <div class="row">
        <Links :block-classes="'contact_btns'" />

        <div class="personal_data">
          <h2>{{ $t('link.promotional_codes') }}</h2>

          <Alerts
            :prop-alerts="responseAlerts"
            :prop-class-alert="responseClassAlerts"
          />

          <div v-if="promotionalCodes.length" class="my_promocodes">
            <div class="promocode">
              <div class="title">
                <h3>{{ $t('text.promotional_code') }}</h3>
                <h3>{{ $t('text.promotion_code_discount') }}</h3>
                <h3>{{ $t('text.validity') }}</h3>
                <h3>{{ $t('text.date_of_receipt') }}</h3>
                <h3>{{ $t('text.status') }}</h3>
              </div>
              <div v-for="promotionalCode in promotionalCodes"
                   :key="`desk-pc-${promotionalCode.id}`"
                   class="promoinfo"
              >
                <p @click="copyCode(promotionalCode.code)">
                  {{ promotionalCode.code }}
                </p>
                <p v-if="promotionalCode.type === 0">
                  {{ promotionalCode.discount }} %
                </p>
                <p v-else>
                  {{ promotionalCode.cash_value }} {{ $t('text.uah') }}
                </p>
                <p>
                  <template v-if="promotionalCode.date_end === null">
                    {{ $t('text.perpetual') }}
                  </template>
                  <template v-else>
                    {{ $t('text.to') }} {{ promotionalCode.date_end }}
                  </template>
                </p>
                <p>{{ promotionalCode.created_at }}</p>
                <p v-if="promotionalCode.is_active">
                  {{ $t('text.active') }}
                </p>
                <p v-else>
                  {{ $t('text.used') }}
                </p>
              </div>
            </div>

            <div class="promocode_mobile">
              <template
                v-for="promotionalCode in promotionalCodes"
              >
                <button :key="`mobile-pc-${promotionalCode.id}`"
                        :class="(checkStatusCollapse(promotionalCode.id).show) ? 'collapsible' : 'collapsible active'"
                        @click="handlerClickCollapse(promotionalCode.id)"
                >
                  <h3>{{ $t('text.promotional_code') }}</h3>
                  <span>{{ promotionalCode.code }}</span>
                </button>
                <div v-if="checkStatusCollapse(promotionalCode.id).show"
                     :key="`mobile-div-pc-${promotionalCode.id}`"
                     class="content"
                >
                  <ul>
                    <li><h3>{{ $t('text.promotion_code_discount') }}</h3></li>
                    <li>
                      <p v-if="promotionalCode.type === 0">
                        {{ promotionalCode.discount }} %
                      </p>
                      <p v-else>
                        {{ promotionalCode.cash_value }} {{ $t('text.uah') }}
                      </p>
                    </li>
                  </ul>
                  <ul>
                    <li><h3>{{ $t('text.validity') }}</h3></li>
                    <li>
                      <template v-if="promotionalCode.date_end === null">
                        <p>{{ $t('text.perpetual') }}</p>
                      </template>
                      <template v-else>
                        <p>{{ $t('text.to') }} {{ promotionalCode.date_end }}</p>
                      </template>
                    </li>
                  </ul>
                  <ul>
                    <li><h3>{{ $t('text.date_of_receipt') }}</h3></li>
                    <li><p>{{ promotionalCode.created_at }}</p></li>
                  </ul>
                  <ul>
                    <li><h3>{{ $t('text.status') }}</h3></li>
                    <li>
                      <p v-if="promotionalCode.is_active === 1">
                        {{ $t('text.active') }}
                      </p>
                      <p v-else>
                        {{ $t('text.used') }}
                      </p>
                    </li>
                  </ul>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <Links :block-classes="'contact_btns my_ordersinfo_mobile_btns'" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Links from '../../components/user/Links'
import alertsMixin from '../../mixins/alertsMixin'
import Alerts from '../../components/Alerts'

export default {
  name: 'PromotionalCodes',
  components: {
    Alerts,
    Links
  },
  mixins: [alertsMixin],
  head () {
    return {
      title: this.$t('link.promotional_codes')
    }
  },
  data: () => ({
    promotionalCodes: [],
    collapseStatus: [],
    responseAlerts: null,
    responseClassAlerts: 'alert-primary'
  }),
  computed: mapGetters({
    PROMOTIONAL_CODES: 'commonData/promotionalCodes',
    LOAD_DATA: 'commonData/loadData'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    handlerClickCollapse (itemId) {
      const index = this.collapseStatus.findIndex(el => el.itemId === itemId)
      const item = this.collapseStatus[index]
      item.show = (!item.show)
      this.collapseStatus[index] = item
    },
    checkStatusCollapse (itemId) {
      if (this.collapseStatus.length) {
        return this.collapseStatus.find(el => el.itemId === itemId)
      }
      return {
        show: false
      }
    },
    copyCode (code) {
      const self = this
      this.$copyText(code).then(function (e) {
        self.successAlert(self.$t('message.success_copy_promotional_code'))
      })
    },
    setData () {
      this.$store.dispatch('breadcrumbs/setBreadcrumbs', [
        { linkName: this.$t('link.promotional_codes') }
      ])

      this.promotionalCodes = this.PROMOTIONAL_CODES
      if (this.promotionalCodes.length) {
        this.responseAlerts = null

        this.promotionalCodes.forEach((item) => {
          this.collapseStatus.push({
            itemId: item.id,
            show: true
          })
        })
      } else {
        this.responseAlerts = this.$t('message.no_data_on_request')
      }
    }
  }
}
</script>
