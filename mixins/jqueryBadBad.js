/* eslint-disable */
export default {
  mounted() {
    const tabLinks = document.querySelectorAll(".tabs a");
    const tabPanels = document.querySelectorAll(".tabs-panel");

    for (let el of tabLinks) {
      el.addEventListener("click", e => {
        e.preventDefault();

        document.querySelector(".tabs li.active").classList.remove("active");
        document.querySelector(".tabs-panel.active").classList.remove("active");

        const parentListItem = el.parentElement;
        parentListItem.classList.add("active");
        const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

        const panel = [...tabPanels].filter(el => el.getAttribute("data-index") == index);
        panel[0].classList.add("active");
      });
    }

    // eslint-disable-next-line
    $(document).ready(function(){
      // eslint-disable-next-line
      $(".tab-slider--body").hide();
      // eslint-disable-next-line
      $(".tab-slider--body:first").show();
    });

    // eslint-disable-next-line
    $(".tab-slider--nav li").click(function() {
      // eslint-disable-next-line
      $(".tab-slider--body").hide();
      // eslint-disable-next-line
      let activeTab = $(this).attr("rel");
      // eslint-disable-next-line
      $("#"+activeTab).fadeIn();
      // eslint-disable-next-line
      $(".tab-slider--nav li").removeClass("active");
      // eslint-disable-next-line
      $(this).addClass("active");
    });
  }
}
