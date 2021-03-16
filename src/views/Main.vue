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
        <router-link :to="{ name: 'main' }" v-slot="{ href }" custom>
          <a :href="href" class="main__logo">Need for drive</a>
        </router-link>
        <div class="main__location">
          <span class="main__location-text">Ульяновск</span>
        </div>
      </div>
      <div class="main__content-center">
        <h1 class="main__title">Каршеринг <span>Need for drive</span></h1>
        <p class="main__description">Поминутная аренда авто твоего города</p>
        <AppButton>Забронировать</AppButton>
      </div>
      <div class="main__content-footer">
        <span class="main__policy">© 2016-2019 «Need for drive»</span>
        <a href="tel:84952342244" class="main__phone">8 (495) 234-22-44</a>
      </div>
    </div>
    <div class="main__slider">
      <slider
        animation="fade"
        height="100%"
        :speed="1000"
        :interval="5000"
        :indicators="false"
        :control-btn="false"
        v-model="currentSlideIndex"
      >
        <slider-item v-for="(item, index) in sliderItems" :key="index">
          <div class="main__slider-item">
            <h3 class="slider__item-title">{{ item.title }}</h3>
            <p class="slider__item-description">{{ item.description }}</p>
            <button class="slider__item-button">Подробнее</button>
          </div>
        </slider-item>
      </slider>
      <button
        @click="changeCurrentSlideIndex(currentSlideIndex - 1)"
        class="main__slider-arrow main__slider-arrow--prev"
      ></button>
      <button
        @click="changeCurrentSlideIndex(currentSlideIndex + 1)"
        class="main__slider-arrow main__slider-arrow--next"
      ></button>
      <div class="main__slider-dots">
        <div
          class="slider__dot"
          v-for="(item, index) in sliderItems"
          :key="index"
          @click="changeCurrentSlideIndex(index)"
          :class="index === currentSlideIndex ? 'slider__dot--active' : null"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/Button";
import { Slider, SliderItem } from "vue-easy-slider";

export default {
  name: "Main",
  components: {
    AppButton,
    Slider,
    SliderItem
  },
  data() {
    return {
      isLoading: false,
      currentSlideIndex: 0,
      sliderItems: [
        {
          title: "Бесплатный парковка",
          description:
            "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах."
        },
        {
          title: "Страховка",
          description: "Полная страховка страховка автомобиля"
        },
        {
          title: "Бензин",
          description: "Полный бак на любой заправке города за наш счёт"
        },
        {
          title: "Обслуживание",
          description: "Автомобиль проходит еженедельное ТО"
        }
      ]
    };
  },
  methods: {
    toggleIsLoading() {
      this.isLoading = !this.isLoading;
    },
    changeCurrentSlideIndex(newIndex) {
      if (newIndex > this.sliderItems.length - 1) newIndex = 0;
      if (newIndex < 0) newIndex = this.sliderItems.length - 1;
      this.currentSlideIndex = newIndex;
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
  width: 100%;
  position: relative;
}

.main__slider-item {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  height: 100%;
  padding: 237px 96px 0;
}

.slider-item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
}

.slider-item:nth-child(1) {
  background-image: url("~@/assets/slider-item1.jpg");
}

.slider-item:nth-child(2) {
  background-image: url("~@/assets/slider-item2.jpg");
}

.slider-item:nth-child(3) {
  background-image: url("~@/assets/slider-item3.jpg");
}

.slider-item:nth-child(4) {
  background-image: url("~@/assets/slider-item4.jpg");
}

.slider__item-title {
  font-weight: 500;
  font-size: 40px;
  line-height: 47px;
  color: #ffffff;
  margin-bottom: 8px;
}

.slider__item-description {
  font-weight: 300;
  font-size: 24px;
  line-height: 100%;
  color: #eeeeee;
  margin-bottom: 32px;
  max-width: 495px;
}

.slider__item-button {
  background: linear-gradient(90deg, #13493f 0%, #0c7b1b 100%);
  border-radius: 4px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #eeeeee;
  padding: 13px 36px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(90deg, #195f53 0%, #0fa024 100%);
  }

  &:focus {
    outline: none;
  }
}

.slider-item:nth-child(2) .slider__item-button {
  background: linear-gradient(90deg, #132949 0%, #0c7b67 100%);
}

.slider-item:nth-child(3) .slider__item-button {
  background: linear-gradient(90deg, #493013 0%, #7b0c3b 100%);
}

.slider-item:nth-child(4) .slider__item-button {
  background: linear-gradient(90deg, #281349 0%, #720c7b 100%);
}

.main__slider-arrow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 64px;
  transition: background-color 0.3s;
  z-index: 101;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background: rgba(#0ec261, 0.2);
  }

  &::before {
    position: absolute;
    content: "";
    width: 10px;
    height: 20px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url("~@/assets/arrow-left.svg") center no-repeat;
    background-size: contain;
  }

  &--prev {
    left: 0;
  }

  &--next {
    right: 0;

    &::before {
      transform: translate(-50%, -50%) rotate(180deg);
    }
  }
}

.main__slider-dots {
  position: absolute;
  height: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 100;
}

.slider__dot {
  width: 8px;
  height: 8px;
  background-color: #eeeeee;
  border-radius: 100%;
  cursor: pointer;

  &--active {
    background-color: #0ec261;
  }
}
</style>
