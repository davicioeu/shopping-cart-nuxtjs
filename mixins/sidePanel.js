export default {
  methods: {
    openSidePanel: (id) => {
      const x = window.matchMedia('(max-width:900px)')

      if (x.matches) {
        document.getElementById(id).style.width = '80%'
      } else {
        document.getElementById(id).style.width = '25%'
      }
    },
    closeSidePanel: (id) => {
      document.getElementById(id).style.width = '0'
    }
  }
}
