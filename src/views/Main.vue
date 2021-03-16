<template>
  <div class="main">
    <div class="main__sidebar">
      <div class="main__burger">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 16H28"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 8H28"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 24H28"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="main__lang-selector">Eng</div>
    </div>
    <div class="main__content">
      <div class="main__content-header">
        <router-link :to="{ name: 'main' }" v-slot="{ href }">
          <a :href="href" class="main__logo">Need for drive</a>
        </router-link>
        <div class="main__location">
          <span class="main__location-text">Ульяновск</span>
        </div>
      </div>
      <div class="main__content-center">
        <h1 class="main__title">Каршеринг <span>Need for drive</span></h1>
        <p class="main__description">Поминутная аренда авто твоего города</p>
        <AppButton text="Забронировать" />
      </div>
      <div class="main__content-footer">
        <span class="main__policy">© 2016-2019 «Need for drive»</span>
        <a href="tel:84952342244" class="main__phone">8 (495) 234-22-44</a>
      </div>
    </div>
    <div class="main__slider">slider</div>
  </div>
</template>

<script>
import AppButton from "@/components/Button";

export default {
  name: "Main",
  components: {
    AppButton
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    toggleIsLoading() {
      this.isLoading = !this.isLoading;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  height: 100%;
}

.main__sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: 64px;
  width: 100%;
  padding: 32px 16px;
  background-color: #151b1f;
}

.main__burger {
  cursor: pointer;
}

.main__lang-selector {
  color: $accent;
}

.main__content {
  padding: 32px 64px;
  width: 48%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.main__content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main__logo {
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: $accent;
  text-decoration: none;
}

.main__location {
  position: relative;
  padding: 3px 0 3px 24px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 20px;
    background-image: url("~@/assets/Group.svg");
  }
}

.main__location-text {
  font-size: 14px;
  line-height: 16px;
  color: #999999;
}

.main__content-center {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.main__title {
  font-weight: bold;
  font-size: 70px;
  line-height: 66px;
  color: #121212;
  max-width: 477px;
  margin-bottom: 34px;

  span {
    color: #0ec261;
  }
}

.main__description {
  font-weight: 300;
  font-size: 26px;
  line-height: 30px;
  color: #999999;
  margin-bottom: 60px;
}

.main__content-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main__policy {
  font-size: 13px;
  line-height: 15px;
  color: #999999;
}

.main__phone {
  font-size: 13px;
  line-height: 15px;
  color: #121212;
  text-decoration: none;
}

.main__slider {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  width: 100%;
}
</style>
