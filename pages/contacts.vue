<template>
  <fragment>
    <section class="contacts">
      <div class="container">
        <div class="row">
          <ContactInfo />

          <ContactForm />
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
import ContactInfo from '../components/contacts/ContactInfo'
import ContactForm from '../components/contacts/ContactForm'

export default {
  name: 'Contacts',
  head () {
    return {
      title: this.$t('link.contacts')
    }
  },
  components: {
    ContactForm,
    ContactInfo
  },
  mounted () {
    this.$store.dispatch('breadcrumbs/setBreadcrumbs', [
      { linkName: this.$t('link.contacts') }
    ])
  }
}
</script>
