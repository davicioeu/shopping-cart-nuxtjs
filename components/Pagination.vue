<template>
  <div
    v-if="shouldShowPagination()"
    class="row pagination"
  >
    <div
      v-if="currentPage < totalPages"
      class="more_btn"
    >
      <i class="fas fa-redo" />
      <button @click="showMoreProducts">
        {{ $t('link.show_more') }}
      </button>
    </div>
    <div class="paginats">
      <ul>
        <template
          v-for="page in pageLinks()"
        >
          <a :key="page"
             href="javascript:void(0)"
             :class="(isActive(page)) ? 'page_link active' : 'page_link'"
             @click="pageClicked(page)"
          >
            <template v-if="page === '...' || page === '....'">
              {{ '...' }}
            </template>
            <template v-else>
              {{ page }}
            </template>
          </a>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  data: () => ({
    currentPage: 1,
    totalPages: 1
  }),
  computed: mapGetters({
    PAGINATION: 'products/pagination'
  }),
  watch: {
    'PAGINATION.currentPage' (currentPage) {
      this.currentPage = currentPage
    },
    'PAGINATION.totalPages' (totalPages) {
      this.totalPages = totalPages
    }
  },
  mounted () {
    this.currentPage = this.PAGINATION.currentPage
    this.totalPages = this.PAGINATION.totalPages
  },
  methods: {
    pageLinks () {
      if (this.PAGINATION.totalPages === undefined) {
        return []
      }
      const arr = []
      let preDots = false
      let postDots = false
      for (let i = 1; i <= this.PAGINATION.totalPages; i++) {
        if (this.PAGINATION.totalPages <= 10) {
          arr.push(i)
        } else if (i === 1) {
          arr.push(i)
        } else if (i === this.PAGINATION.totalPages) {
          arr.push(i)
        } else if (
          (i > this.PAGINATION.currentPage - 4 && i < this.PAGINATION.currentPage + 4) ||
              (i < 4 && this.PAGINATION.currentPage < 4) ||
              (i > this.PAGINATION.totalPages - 4 && this.PAGINATION.currentPage > this.PAGINATION.totalPages - 4)) {
          arr.push(i)
        } else if (i < this.PAGINATION.currentPage && !preDots) {
          arr.push('...')
          preDots = true
        } else if (i > this.PAGINATION.currentPage && !postDots) {
          arr.push('....')
          postDots = true
        }
      }
      return arr
    },
    shouldShowPagination () {
      if (this.PAGINATION.totalPages === undefined) {
        return false
      }
      if (this.PAGINATION.count === 0) {
        return false
      }
      return this.PAGINATION.totalPages > 1
    },
    isActive (page) {
      const currentPage = this.PAGINATION.currentPage || 1
      return currentPage === page
    },
    showMoreProducts () {
      this.$emit('showMoreProducts')
    },
    pageClicked (page) {
      if (page === '...' || page === '....' ||
          page === this.PAGINATION.currentPage ||
          page > this.PAGINATION.totalPages ||
          page < 1) {
        return
      }

      this.$router.push({ query: Object.assign(
        {}, this.$route.query, { page }
      ) })

      this.$store.dispatch('products/paginationUpdateCurrentPage', {
        currentPage: page
      })

      this.$emit('pageChange', page)
    }
  }
}
</script>
