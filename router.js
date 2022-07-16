import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
  { path: '/', redirect: 'ru' },
  { path: '/:lang', name: 'index', component: page('index.vue') },
  { path: '/:lang/text_page/:slug', name: 'textPage', component: page('text-page.vue') },
  { path: '/:lang/about_us', name: 'aboutUs', component: page('page.vue') },
  { path: '/:lang/user_agreement', name: 'userAgreement', component: page('page.vue') },
  { path: '/:lang/cart', name: 'cart', component: page('cart.vue') },
  { path: '/:lang/catalog', name: 'catalog', component: page('catalog.vue') },
  { path: '/:lang/contacts', name: 'contacts', component: page('contacts.vue') },
  { path: '/:lang/products', name: 'products', component: page('category.vue') },
  { path: '/:lang/category/:slug', name: 'category', component: page('category.vue') },
  { path: '/:lang/product/:product_slug', name: 'product', component: page('product.vue') },
  {
    path: '/:lang/user/contact_information',
    name: 'UserContactInformation',
    component: page('user/contact-information.vue')
  },
  {
    path: '/:lang/user/favorite',
    name: 'UserFavorite',
    component: page('user/favorite.vue')
  },
  {
    path: '/:lang/user/promotional_codes',
    name: 'UserPromotionalCodes',
    component: page('user/promotional-codes.vue')
  }
]

export function createRouter () {
  return new Router({
    routes,
    scrollBehavior,
    mode: 'history'
  })
}
