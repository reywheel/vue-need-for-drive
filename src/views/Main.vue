<template>
  <div class="main">
    <div class="main__content">
      <div class="main__content-header">
        <div class="main__content-header-top">
          <AppBurger
            class="main__content-burger"
            :is-active="menuIsOpen"
            :width="22"
            @click="toggleMenuVisibility"
            :style="{ 'z-index': menuIsOpen ? 104 : null }"
          />
          <router-link
            :to="{ name: 'main' }"
            v-slot="{ href, navigate }"
            custom
            tag="a"
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
        <AppLink class="main__phone" href="tel:84952342244">
          8 (495) 234-22-44
        </AppLink>
      </div>
    </div>
    <div
      class="main__slider"
      v-if="windowWidth > 768"
      @mouseenter="deleteInterval"
      @mouseleave="setInterval"
    >
      <transition name="fade" v-for="(item, index) in sliderItems" :key="index">
        <div class="main__slider-item" v-show="currentSlideIndex === index">
          <h3 class="slider__item-title">{{ item.title }}</h3>
          <p class="slider__item-description">{{ item.description }}</p>
          <AppButton class="slider__item-button" :gradient="item.gradient"
            >Подробнее
          </AppButton>
        </div>
      </transition>
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
    <AppMenu />
  </div>
</template>

<script>
import AppButton from "@/components/Button";
import AppSelector from "@/components/Selector";
import AppLink from "@/components/Link";
import AppBurger from "@/components/Burger";
import AppMenu from "@/components/Menu";
import { getterTypes, mutationTypes } from "@/store/app";
import { mapGetters } from "vuex";

export default {
  name: "Main",
  components: {
    AppButton,
    AppSelector,
    AppLink,
    AppBurger,
    AppMenu
  },
  data() {
    return {
      intervalInstance: null,
      currentSlideIndex: 0,
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
      windowWidth: getterTypes.windowWidth,
      menuIsOpen: getterTypes.menuIsOpen
    }),
    currentLocation: {
      get() {
        return this.$store.getters[getterTypes.location];
      },
      set(newLocation) {
        this.$store.commit(mutationTypes.setLocation, newLocation);
      }
    }
  },
  methods: {
    changeCurrentSlideIndex(newIndex) {
      if (newIndex > this.sliderItems.length - 1) newIndex = 0;
      if (newIndex < 0) newIndex = this.sliderItems.length - 1;
      this.currentSlideIndex = newIndex;
    },
    toggleMenuVisibility() {
      this.$store.commit(mutationTypes.toggleMenuVisibility);
    },
    toggleLocationSelectorVisibility() {
      this.isLocationSelectorShow = !this.isLocationSelectorShow;
    },
    setInterval() {
      this.intervalInstance = setInterval(() => {
        this.changeCurrentSlideIndex(this.currentSlideIndex + 1);
      }, 3000);
    },
    deleteInterval() {
      clearInterval(this.intervalInstance);
    }
  },
  mounted() {
    this.setInterval();
  },
  beforeDestroy() {
    this.deleteInterval();
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
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
  overflow: hidden;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 0.5;
  transition: opacity 1s;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  opacity: 0.5;
  transition: opacity 1s;
}

.fade-leave-to {
  opacity: 0;
}

.main__slider-item {
  position: absolute;
  background: url("~@/assets/slider-item1.jpg") no-repeat center;
  background-size: cover;
  height: 100%;
  width: 100%;
  padding: 237px 96px 45px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    z-index: 0;
  }

  & > * {
    z-index: 1;
  }
}

.slider-item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
}

.main__slider-item:nth-child(1) {
  background-image: url("~@/assets/slider-item1.jpg");
}

.main__slider-item:nth-child(2) {
  background-image: url("~@/assets/slider-item2.jpg");
}

.main__slider-item:nth-child(3) {
  background-image: url("~@/assets/slider-item3.jpg");
}

.main__slider-item:nth-child(4) {
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
}

//---------------- 768px ----------------

@media (max-width: 768px) {
  .main__content {
    width: 100%;
  }

  .main__slider {
    display: none;
  }
}

//---------------- 600px ----------------

@media (max-width: 600px) {
  .main__content {
    width: 100%;
    padding: 16px;
  }

  .main__content-center {
    padding: 33px 0;
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

  .main__content-burger {
    display: flex;

    span {
      background-color: #121212;
      width: 21px;
    }
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
    color: $accent;
    margin-bottom: 8px;

    &:hover {
      color: $light-grey;
    }
  }

  .main__menu-link {
    font-size: 22px;
    line-height: 26px;
  }
}
</style>
