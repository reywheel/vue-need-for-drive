<template>
  <div class="main">
    <div class="main__content">
      <div class="main__content-header">
        <div class="main__content-header-top">
          <base-burger
            :is-active="menuIsOpen"
            class="main__content-burger"
            :class="{ 'main__content-burger--active': menuIsOpen }"
            @click="toggleMenuVisibility"
          />
          <router-link :to="{ name: 'main' }" class="main__logo">
            Need for drive
          </router-link>
        </div>
        <div
          v-if="!isLocationSelectorShow"
          class="main__location"
          @click="toggleLocationSelectorVisibility"
        >
          <span class="main__location-text">{{ currentLocation.name }}</span>
        </div>
        <base-autocomplete
          v-else
          v-model="currentLocation"
          :list="cityList"
          :placeholder="$t('main.citySelectorPlaceholder')"
          @select="toggleLocationSelectorVisibility"
          v-click-outside="toggleLocationSelectorVisibility"
        />
      </div>
      <div class="main__content-center">
        <h1 class="main__title">
          {{ $t("main.title") }} <span>Need for drive</span>
        </h1>
        <p class="main__description">{{ $t("main.description") }}</p>
        <router-link :to="{ name: 'orderStart' }" v-slot="{ navigate }" custom>
          <base-button class="main__button" @click="navigate">
            {{ $t("main.buttonText") }}
          </base-button>
        </router-link>
      </div>
      <div class="main__content-footer">
        <span class="main__policy">© 2016-2019 «Need for drive»</span>
        <base-link class="main__phone" href="tel:84952342244">
          8 (495) 234-22-44
        </base-link>
      </div>
    </div>
    <div
      class="main__slider"
      @mouseenter="deleteInterval"
      @mouseleave="setInterval"
    >
      <transition name="fade" v-for="(item, index) in sliderItems" :key="index">
        <div
          class="main__slider-item"
          v-show="currentSlideIndex === index"
          :style="{
            backgroundImage: `url(${item.backgroundImg})`
          }"
        >
          <h3 class="slider__item-title">
            {{ $t(`main.slider.items[${index}].title`) }}
          </h3>
          <p class="slider__item-description">
            {{ $t(`main.slider.items[${index}].description`) }}
          </p>
          <base-button class="slider__item-button" :gradient="item.gradient">
            {{ $t("main.slider.buttonText") }}
          </base-button>
        </div>
      </transition>
      <button
        class="main__slider-arrow main__slider-arrow--prev"
        @click="changeCurrentSlideIndex(currentSlideIndex - 1)"
      ></button>
      <button
        class="main__slider-arrow main__slider-arrow--next"
        @click="changeCurrentSlideIndex(currentSlideIndex + 1)"
      ></button>
      <div class="main__slider-dots">
        <div
          v-for="index in sliderItems.length"
          :key="index"
          class="slider__dot"
          :class="
            index - 1 === currentSlideIndex ? 'slider__dot--active' : null
          "
          @click="changeCurrentSlideIndex(index - 1)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getterTypes as appGT, mutationTypes as appMT } from "@/store/app";
import { getterTypes as cityListGT } from "@/store/cityList";
import { mapGetters, mapMutations } from "vuex";
import vClickOutside from "v-click-outside";

export default {
  name: "Main",
  directives: {
    vClickOutside
  },
  data() {
    return {
      intervalInstance: null,
      currentSlideIndex: 0,
      isLocationSelectorShow: false,
      sliderItems: [
        {
          backgroundImg: require("@/assets/slider-item1.jpg"),
          gradient: {
            from: "#13493F",
            to: "#0C7B1B"
          }
        },
        {
          backgroundImg: require("@/assets/slider-item2.jpg"),
          gradient: {
            from: "#132949",
            to: "#0C7B67"
          }
        },
        {
          backgroundImg: require("@/assets/slider-item3.jpg"),
          gradient: {
            from: "#493013",
            to: "#7B0C3B"
          }
        },
        {
          backgroundImg: require("@/assets/slider-item4.jpg"),
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
      menuIsOpen: appGT.menuIsOpen,
      location: appGT.location,
      cityList: cityListGT.allCities,
      cityListIsEmpty: cityListGT.isEmpty
    }),
    currentLocation: {
      get() {
        return this.location;
      },
      set(newLocation) {
        this[appMT.setLocation](newLocation);
      }
    }
  },
  methods: {
    ...mapMutations([appMT.setLocation, appMT.toggleMenuVisibility]),
    changeCurrentSlideIndex(newIndex) {
      if (newIndex > this.sliderItems.length - 1) newIndex = 0;
      if (newIndex < 0) newIndex = this.sliderItems.length - 1;
      this.currentSlideIndex = newIndex;
    },
    toggleMenuVisibility() {
      this[appMT.toggleMenuVisibility]();
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
  min-height: 100%;
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
  color: $dark-grey;
}

.main__content-burger {
  display: none;

  &--active {
    z-index: 104;
  }
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
  color: $black;
  max-width: 477px;
  margin-bottom: 34px;

  span {
    color: $accent;
    display: block;
  }
}

.main__description {
  font-weight: 300;
  font-size: 26px;
  line-height: 30px;
  color: $dark-grey;
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
  color: $dark-grey;
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
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
  padding: 45px 96px 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.slider__item-title {
  font-weight: 500;
  font-size: 40px;
  line-height: 47px;
  color: $white;
  margin-bottom: 8px;
}

.slider__item-description {
  font-weight: 300;
  font-size: 24px;
  line-height: 100%;
  color: $light-grey;
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
  background-color: $light-grey;
  border-radius: 100%;
  cursor: pointer;

  &--active {
    background-color: $accent;
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
    display: block;
    width: 21px;
  }

  #app .main__content-burger {
    --color: #{$black};
  }

  .main__button {
    width: calc(100% + 32px);
    margin: 0 -16px;
  }

  #app .main__button {
    --border-radius: 0px;
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

  #app .main__phone {
    --color: #{$accent};
    --color-hover: #{$light-grey};
    --color-active: #{$light-grey};
  }

  .main__menu-link {
    font-size: 22px;
    line-height: 26px;
  }
}
</style>
