<template>
  <div class="testimonials">
    <div class="testimonial_titles">
      <h3 class="desc_title">
        {{ $t('text.customer_reviews') }}
      </h3>
      <button
        data-fancybox
        data-src="#product-review-content"
        class="get_testimonial"
        @click="parentId = null"
      >
        {{ $t('link.create_review') }}
      </button>
    </div>
    <div v-if="reviews.data.length === 0" class="testimonial">
      <Alerts
        :prop-alerts="$t('message.no_data_on_request')"
        prop-class-alert="alert-primary"
        style="margin-top: 10px"
        @resetAlerts="() => { return false }"
      />
    </div>
    <div
      v-for="review in reviews.data"
      :key="`review-item-${review.id}`"
      class="testimonial"
    >
      <div class="testimonial_title">
        <ul>
          <li class="name">
            {{ review.name }}
          </li>
          <li class="date">
            {{ review.created_at_date }}
          </li>
        </ul>
        <star-rating
          :rating="review.rating"
          :increment="1"
          :max-rating="5"
          inactive-color="#CCCCCC"
          active-color="#FFCD00"
          :star-size="25"
          :read-only="true"
          :show-rating="false"
        >
        </star-rating>
      </div>
      <p class="testimonial_text">
        {{ review.message }}
      </p>
      <div class="likes">
        <button
          class="answer_btn"
          data-fancybox
          data-src="#product-review-content"
          @click="clickAnswerLink(review.id, review.name)"
        >
          {{ $t('link.response_to_review') }}
        </button>
        <ul class="like" style="display: none">
          <li>
            <a class="like-counter"><img src="/images/like.png" alt=""></a><span class="click-text">( 7 )</span>
          </li>
          <li>
            <a class="dislike-counter"><img src="/images/dislike.png" alt=""></a><span class="disclick-text">( 2 )</span>
          </li>
        </ul>
      </div>
      <div
        v-for="answer in review.descendants"
        :key="`review-answer-${answer.id}`"
        class="answer"
      >
        <ul>
          <li class="name">
            {{ answer.name }}
          </li>
          <li class="date">
            {{ answer.created_at_date }}
          </li>
        </ul>
        <p class="answer_text">
          {{ answer.message }}
        </p>
      </div>
    </div>

    <button
      v-if="reviews.next_page_url !== null"
      class="see_all_answers"
      @click="loadMoreReviews"
    >
      {{ $t('link.show_more_reviews') }}
    </button>

    <ProductReview
      :product-id="productId"
      :parent-id="parentId"
      :parent-name="parentName"
    />
  </div>
</template>

<script>
import axios from 'axios'
import ProductReview from '../modals/ProductReview'
import Alerts from '../Alerts'

export default {
  name: 'Reviews',
  components: {
    Alerts,
    ProductReview
  },
  props: ['productId'],
  data: () => ({
    reviews: {
      data: [],
      current_page: null,
      last_page: null,
      next_page_url: null
    },
    parentId: null,
    parentName: null
  }),
  watch: {
    'productId' () {
      this.getReviews()
    }
  },
  mounted () {
    this.getReviews()
  },
  methods: {
    clickAnswerLink (id, name) {
      this.parentId = id
      this.parentName = name
    },
    loadMoreReviews () {
      const nextPage = this.reviews.current_page + 1
      if (this.reviews.last_page >= nextPage) {
        this.getReviews(nextPage)
      }
    },
    getReviews (page = 1) {
      if (this.productId !== null) {
        axios.post('/product/reviews/get', {
          product_id: this.productId,
          page
        }).then((res) => {
          const data = res.data
          if (this.reviews.data.length) {
            this.reviews.data = this.reviews.data.concat(res.data.reviews.data)
            this.reviews.last_page = res.data.reviews.last_page
            this.reviews.current_page = res.data.reviews.current_page
            this.reviews.next_page_url = res.data.reviews.next_page_url
          } else {
            this.reviews = res.data.reviews
          }
          this.$emit('changeAvgReviews', data.avg)
        })
      }
    }
  }
}
</script>

<style scoped>
  .link-create-review {
    margin-bottom: 30px;
  }
</style>
