<template>
  <div id="hidden-content"
       class="mobile-search-content fancybox-content"
       style="display: none;"
  >
    <h3>Поиск</h3>
    <input type="text" class="ms-input">
    <ul class="ms_btns">
      <li>
        <button class="find">
          Поиск
        </button>
      </li>
      <li>
        <span data-fancybox-close class="ms_cancel">Отмена</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchMobile'
}
</script>
