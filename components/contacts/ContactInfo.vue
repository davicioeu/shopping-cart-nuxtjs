<template>
  <div class="contact_info">
    <div class="phones">
      <img src="/images/phones.png" alt="">
      <ul>
        <li v-if="tel1 !== null">
          {{ tel1 }}
        </li>
        <li v-if="tel2 !== null">
          {{ tel2 }}
        </li>
      </ul>
    </div>
    <div class="mail">
      <img src="/images/mail.png" alt="">
      <ul>
        <li>{{ email }}</li>
      </ul>
    </div>
    <div class="time">
      <img src="/images/time.png" alt="">
      <ul>
        <li v-html="schedule"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import setting from '../../mixins/setting'

export default {
  name: 'ContactInfo',
  mixins: [setting],
  data: () => ({
    tel1: null,
    tel2: null,
    email: null,
    schedule: null
  }),
  computed: mapGetters({
    SETTINGS: 'commonData/settings',
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
    setData () {
      if (this.LOAD_DATA) {
        this.tel1 = this.getSettingItem('tel1').parent_value
        this.tel2 = this.getSettingItem('tel2').parent_value
        this.email = this.getSettingItem('email').parent_value
        this.schedule = this.getSettingItem('schedule').value.replace(new RegExp(/<\s*(\w+).*?>/, 'g'), '<$1>')
      }
    }
  }
}
</script>
