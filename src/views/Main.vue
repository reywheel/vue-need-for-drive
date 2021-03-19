<template>
  <div class="main">
    <div class="main__sidebar">
      <div @click="toggleMenuVisibility" class="main__burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <AppLangSwitcher :text="this.lang" @click="toggleLang" />
    </div>
    <div class="main__content">
      <div class="main__content-header">
        <div class="main__content-header-top">
          <div
            @click="toggleMenuVisibility"
            class="main__burger main__content-burger"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <router-link
            :to="{ name: 'main' }"
            v-slot="{ href, navigate }"
            custom
          >
            <a :href="href" class="main__logo" @click.prevent="navigate"
              >Need for drive</a
            >
          </router-link>
        </div>
        <div
          class="main__location"
          v-if="!isLocationSelectorShow"
          @click="toggleLocationSelectorVisibility"
        >
          <span class="main__location-text">{{ currentLocation }}</span>
        </div>
        <AppSelector
          v-else
          v-model.trim="currentLocation"
          :list="locationList"
          @close="toggleLocationSelectorVisibility"
          placeholder="Начните вводить город..."
        />
      </div>
      <div class="main__content-center">
        <h1 class="main__title">Каршеринг <span>Need for drive</span></h1>
        <p class="main__description">Поминутная аренда авто твоего города</p>
        <AppButton class="main__button">Забронировать</AppButton>
      </div>
      <div class="main__content-footer">
        <span class="main__policy">© 2016-2019 «Need for drive»</span>
        <AppLink
          class="main__phone"
          href="tel:84952342244"
          :type="windowWidth > 600 ? 'black' : 'green'"
          >8 (495) 234-22-44
        </AppLink>
      </div>
    </div>
    <div class="main__slider">
      <slider
        animation="fade"
        height="100%"
        :speed="1000"
        :interval="5000"
        :autoplay="false"
        :indicators="false"
        :control-btn="false"
        v-model="currentSlideIndex"
      >
        <slider-item v-for="(item, index) in sliderItems" :key="index">
          <div class="main__slider-item">
            <h3 class="slider__item-title">{{ item.title }}</h3>
            <p class="slider__item-description">{{ item.description }}</p>
            <AppButton class="slider__item-button" :gradient="item.gradient"
              >Подробнее</AppButton
            >
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
    <div class="main__menu" :class="{ 'main__menu--visible': isMenuOpen }">
      <button
        @click="toggleMenuVisibility"
        class="main__menu-close-btn"
      ></button>
      <ul class="main__menu-list">
        <li class="main__menu-item">
          <a href="#" class="main__menu-link">Парковка</a>
        </li>
        <li class="main__menu-item">
          <a href="#" class="main__menu-link">Страховка</a>
        </li>
        <li class="main__menu-item">
          <a href="#" class="main__menu-link">Бензин</a>
        </li>
        <li class="main__menu-item">
          <a href="#" class="main__menu-link">Обслуживание</a>
        </li>
      </ul>
      <div class="social-media">
        <a href="#" class="social-media__item">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM10.7144 14.5343C9.11157 15.2341 7.46472 15.9532 5.95883 16.7826L5.95873 16.7828C5.17241 17.3585 6.21758 17.7657 7.19803 18.1476C7.35391 18.2084 7.50814 18.2685 7.65313 18.3285C7.77377 18.3656 7.89647 18.4047 8.02079 18.4443C9.11124 18.7917 10.3272 19.1791 11.3858 18.5963C13.1248 17.5973 14.766 16.4424 16.4059 15.2883C16.9432 14.9102 17.4803 14.5322 18.0207 14.1598C18.046 14.1436 18.0746 14.1251 18.1058 14.1048C18.5662 13.8064 19.6016 13.1353 19.2186 14.06C18.313 15.0504 17.3429 15.9272 16.3676 16.8087C15.7103 17.4027 15.0506 17.999 14.4066 18.6336C13.8457 19.0894 13.2633 20.0059 13.8914 20.644C15.3379 21.6567 16.8071 22.6449 18.2755 23.6325C18.7533 23.9538 19.231 24.2752 19.7079 24.5972C20.516 25.2425 21.779 24.7206 21.9567 23.7123C22.0357 23.2485 22.115 22.7847 22.1944 22.3208C22.6328 19.7578 23.0713 17.1938 23.4587 14.6223C23.5113 14.219 23.571 13.8156 23.6307 13.4121C23.7755 12.434 23.9204 11.4547 23.9656 10.4714C23.849 9.49009 22.6592 9.70585 21.997 9.9265C18.5935 11.2216 15.224 12.6126 11.8679 14.0282C11.4877 14.1967 11.1023 14.3649 10.7144 14.5343Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a href="#" class="social-media__item">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32 16C32 7.1625 24.8375 0 16 0C7.1625 0 0 7.1625 0 16C0 23.9875 5.85 30.6062 13.5 31.8062V20.625H9.4375V16H13.5V12.475C13.5 8.46563 15.8875 6.25 19.5438 6.25C21.2938 6.25 23.125 6.5625 23.125 6.5625V10.5H21.1063C19.1188 10.5 18.5 11.7344 18.5 13V16H22.9375L22.2281 20.625H18.5V31.8062C26.15 30.6062 32 23.9875 32 16Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a href="#" class="social-media__item">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM12.4822 7.51824C13.3924 7.47682 13.6833 7.46668 16.0008 7.46668H15.9981C18.3164 7.46668 18.6062 7.47682 19.5164 7.51824C20.4248 7.55984 21.0453 7.70366 21.5893 7.91469C22.1511 8.13247 22.6258 8.42403 23.1004 8.8987C23.5751 9.37301 23.8667 9.84911 24.0853 10.4104C24.2951 10.9529 24.4391 11.573 24.4818 12.4815C24.5227 13.3917 24.5333 13.6826 24.5333 16.0001C24.5333 18.3176 24.5227 18.6078 24.4818 19.518C24.4391 20.4261 24.2951 21.0464 24.0853 21.5891C23.8667 22.1502 23.5751 22.6263 23.1004 23.1006C22.6263 23.5753 22.1509 23.8676 21.5898 24.0855C21.0469 24.2965 20.4261 24.4404 19.5176 24.482C18.6074 24.5234 18.3174 24.5335 15.9997 24.5335C13.6824 24.5335 13.3917 24.5234 12.4815 24.482C11.5732 24.4404 10.9529 24.2965 10.41 24.0855C9.84909 23.8676 9.37299 23.5753 8.89886 23.1006C8.42436 22.6263 8.1328 22.1502 7.91467 21.589C7.70382 21.0464 7.56 20.4263 7.51822 19.5178C7.47697 18.6076 7.46666 18.3176 7.46666 16.0001C7.46666 13.6826 7.47733 13.3915 7.51804 12.4813C7.55893 11.5732 7.70293 10.9529 7.91449 10.4102C8.13316 9.84911 8.42472 9.37301 8.89939 8.8987C9.3737 8.4242 9.8498 8.13265 10.411 7.91469C10.9536 7.70366 11.5737 7.55984 12.4822 7.51824Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.2353 9.00445C15.3839 9.00422 15.5438 9.00429 15.7164 9.00437L16.0008 9.00445C18.2792 9.00445 18.5493 9.01263 19.449 9.05352C20.281 9.09156 20.7326 9.23059 21.0334 9.34739C21.4316 9.50206 21.7155 9.68695 22.014 9.98562C22.3127 10.2843 22.4976 10.5687 22.6526 10.967C22.7694 11.2674 22.9086 11.719 22.9465 12.551C22.9874 13.4505 22.9963 13.7208 22.9963 15.9981C22.9963 18.2755 22.9874 18.5457 22.9465 19.4453C22.9084 20.2773 22.7694 20.7288 22.6526 21.0293C22.4979 21.4275 22.3127 21.7111 22.014 22.0096C21.7153 22.3082 21.4318 22.4931 21.0334 22.6478C20.7329 22.7651 20.281 22.9038 19.449 22.9418C18.5494 22.9827 18.2792 22.9916 16.0008 22.9916C13.7222 22.9916 13.4522 22.9827 12.5526 22.9418C11.7206 22.9034 11.269 22.7644 10.968 22.6476C10.5698 22.4929 10.2854 22.3081 9.98669 22.0094C9.68802 21.7107 9.50313 21.427 9.34811 21.0286C9.23131 20.7281 9.09211 20.2766 9.05424 19.4446C9.01335 18.545 9.00517 18.2748 9.00517 15.996C9.00517 13.7172 9.01335 13.4484 9.05424 12.5488C9.09228 11.7168 9.23131 11.2653 9.34811 10.9645C9.50278 10.5662 9.68802 10.2818 9.98669 9.98313C10.2854 9.68446 10.5698 9.49957 10.968 9.34455C11.2688 9.22721 11.7206 9.08854 12.5526 9.05032C13.3398 9.01476 13.6449 9.0041 15.2353 9.00232V9.00445ZM20.5559 10.4213C19.9905 10.4213 19.5319 10.8795 19.5319 11.445C19.5319 12.0103 19.9905 12.469 20.5559 12.469C21.1212 12.469 21.5799 12.0103 21.5799 11.445C21.5799 10.8797 21.1212 10.421 20.5559 10.421V10.4213ZM11.6185 16.0001C11.6185 13.58 13.5806 11.6179 16.0006 11.6178C18.4207 11.6178 20.3824 13.58 20.3824 16.0001C20.3824 18.4202 18.4209 20.3815 16.0008 20.3815C13.5807 20.3815 11.6185 18.4202 11.6185 16.0001Z"
              fill="currentColor"
            />
            <path
              d="M16.0008 13.1556C17.5717 13.1556 18.8453 14.4291 18.8453 16.0001C18.8453 17.571 17.5717 18.8446 16.0008 18.8446C14.4298 18.8446 13.1563 17.571 13.1563 16.0001C13.1563 14.4291 14.4298 13.1556 16.0008 13.1556Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
      <AppLangSwitcher
        :text="this.lang"
        @click="toggleLang"
        class="main__menu-lang-switcher"
      />
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/Button";
import AppLangSwitcher from "@/components/LangSwitcher";
import AppSelector from "@/components/Selector";
import AppLink from "@/components/Link";
import { Slider, SliderItem } from "vue-easy-slider";
import { getterTypes, mutationTypes } from "@/store/app";
import { mapGetters } from "vuex";

export default {
  name: "Main",
  components: {
    AppButton,
    AppLangSwitcher,
    AppSelector,
    AppLink,
    Slider,
    SliderItem
  },
  data() {
    return {
      currentSlideIndex: 0,
      isMenuOpen: false,
      isLocationSelectorShow: false,
      sliderItems: [
        {
          title: "Бесплатная парковка",
          description:
            "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
          gradient: {
            from: "#13493F",
            to: "#0C7B1B"
          }
        },
        {
          title: "Страховка",
          description: "Полная страховка страховка автомобиля",
          gradient: {
            from: "#132949",
            to: "#0C7B67"
          }
        },
        {
          title: "Бензин",
          description: "Полный бак на любой заправке города за наш счёт",
          gradient: {
            from: "#493013",
            to: "#7B0C3B"
          }
        },
        {
          title: "Обслуживание",
          description: "Автомобиль проходит еженедельное ТО",
          gradient: {
            from: "#281349",
            to: "#720C7B"
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      locationList: getterTypes.locationList,
      windowWidth: getterTypes.windowWidth
    }),
    currentLocation: {
      get() {
        return this.$store.getters[getterTypes.location];
      },
      set(newLocation) {
        this.$store.commit(mutationTypes.setLocation, newLocation);
      }
    },
    lang: {
      get() {
        return this.$store.getters[getterTypes.lang];
      },
      set(newLang) {
        this.$store.commit(mutationTypes.setLang, newLang);
      }
    }
  },
  methods: {
    changeCurrentSlideIndex(newIndex) {
      if (newIndex > this.sliderItems.length - 1) newIndex = 0;
      if (newIndex < 0) newIndex = this.sliderItems.length - 1;
      this.currentSlideIndex = newIndex;
    },
    toggleLang() {
      if (this.lang === "Eng") this.lang = "Рус";
      else this.lang = "Eng";
    },
    toggleMenuVisibility() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleLocationSelectorVisibility() {
      this.isLocationSelectorShow = !this.isLocationSelectorShow;
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
  align-items: center;
  height: 100%;
  max-width: 64px;
  width: 100%;
  padding: 32px 8px 16px;
  background-color: #151b1f;
}

.main__burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  span {
    display: inline-block;
    width: 27px;
    height: 3px;
    border-radius: 2px;
    background-color: #ffffff;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
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

.main__content-burger {
  display: none;
}

.main__content-center {
  flex-grow: 1;
  display: flex;
  padding: 163px 0;
  flex-direction: column;
  justify-content: flex-start;
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
    display: block;
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

.main__slider {
  width: 100%;
  position: relative;
}

.main__slider-item {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  height: 100%;
  padding: 237px 96px 45px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

.main__slider-item .slider__item-button {
  border-radius: 4px;
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

.main__menu {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(21, 27, 31, 0.81);
  z-index: 103;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 128px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: calc(48% + 64px);
    background: #111518;
  }

  &--visible {
    opacity: 1;
    pointer-events: unset;
  }
}

.main__menu-close-btn {
  position: absolute;
  left: 16px;
  top: 32px;
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: none;
  background-image: url(~@/assets/close-btn.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  outline: none;
  cursor: pointer;
}

.main__menu-list {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 44px;
  max-width: 500px;
}

.main__menu-item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover .main__menu-link {
    color: $accent;
  }
}

.main__menu-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  font-size: 32px;
  line-height: 37px;
  transition: all 0.3s;
}

.social-media {
  display: flex;
  align-items: center;
  gap: 24px;
}

.social-media__item {
  position: relative;
  width: 32px;
  height: 32px;
  color: white;
  transition: all 0.5s;

  &:hover {
    color: $accent;
  }
}

.main__menu-lang-switcher {
  display: none;
  z-index: 0;
}

//---------------- 1024px ----------------

@media (max-width: 1024px) {
  .main__content {
    width: 54%;
    padding: 32px;
  }

  .main__slider-arrow {
    width: 32px;
  }

  .main__slider-item {
    padding-left: 64px;
    padding-right: 64px;
  }

  .slider__item-title {
    font-size: 32px;
    line-height: 37px;
  }

  .slider__item-description {
    font-size: 22px;
    line-height: 100%;
  }

  .main__menu {
    padding-left: 97px;

    &::before {
      width: calc(54% + 64px);
    }
  }

  .main__menu-close-btn {
    left: 17px;
    top: 28px;
  }
}

//---------------- 768px ----------------

@media (max-width: 768px) {
  .main__sidebar {
    max-width: 86px;
  }

  .main__burger {
    span {
      width: 35px;
    }
  }

  .main__content {
    width: calc(100% - 86px);
  }

  .main__slider {
    display: none;
  }

  .main__menu {
    padding: 97px;

    &::before {
      width: 100%;
    }
  }

  .main__menu-link {
    font-size: 28px;
    line-height: 33px;
  }
}

//---------------- 600px ----------------

@media (max-width: 600px) {
  .main__sidebar {
    display: none;
  }

  .main__content {
    width: 100%;
    padding: 16px;
  }

  .main__content-center {
    padding: 33px 0;
  }

  .main__burger {
    display: flex;

    span {
      background-color: #121212;
      width: 21px;
    }
  }

  .main__title {
    font-size: 32px;
    line-height: 100%;
    margin-bottom: 16px;

    span {
      margin-top: 6px;
    }
  }

  .main__description {
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 32px;
  }

  .main__content-header {
    flex-direction: column;
    align-items: flex-end;
  }

  .main__content-header-top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .main__button {
    width: calc(100% + 32px);
    border-radius: 0;
    margin: 0 -16px;
  }

  .main__content-footer {
    flex-direction: column-reverse;
    padding: 16px;
    align-items: flex-end;
    background-color: #151b1f;
    margin: -16px;
    margin-top: 0;
  }

  .main__phone {
    margin-bottom: 8px;
  }

  .main__menu-link {
    font-size: 22px;
    line-height: 26px;
  }

  .main__menu {
    padding: 80px 28px;
    justify-content: flex-start;
  }

  .main__menu-close-btn {
    left: 20px;
    top: 20px;
  }

  .main__menu-lang-switcher {
    display: flex;
    position: absolute;
    left: 16px;
    bottom: 16px;
  }
}
</style>
