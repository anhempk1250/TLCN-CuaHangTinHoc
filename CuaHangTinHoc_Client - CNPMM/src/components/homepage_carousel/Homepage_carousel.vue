<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active" data-interval="5000">
          <img
            src="https://img1.phongvu.vn/media/banner/pv-banner-660x390-fc502.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item" data-interval="5000">
          <img
            src="https://img1.phongvu.vn/media/banner/pv-banner-660x390-7d988.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item" data-interval="5000">
          <img
            src="https://img1.phongvu.vn/media/banner/pv-banner-660x390-15aa3.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#carouselExampleIndicators {
  z-index: 0;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 30rem;
  }
}
</style>