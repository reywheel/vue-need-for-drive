<template>
  <div class="menu" :class="{ 'menu--visible': menuIsOpen }">
    <ul class="menu-list">
      <li class="menu-item">
        <a href="#" class="menu-link">{{ $t("menu.parking") }}</a>
      </li>
      <li class="menu-item">
        <a href="#" class="menu-link">{{ $t("menu.insurance") }}</a>
      </li>
      <li class="menu-item">
        <a href="#" class="menu-link">{{ $t("menu.petrol") }}</a>
      </li>
      <li class="menu-item">
        <a href="#" class="menu-link">{{ $t("menu.service") }}</a>
      </li>
    </ul>
    <div class="social-media">
      <a href="#" class="social-media__item">
        <app-icon name="telegram.svg" />
      </a>
      <a href="#" class="social-media__item">
        <app-icon name="facebook.svg" />
      </a>
      <a href="#" class="social-media__item">
        <app-icon name="instagram.svg" />
      </a>
    </div>
    <app-lang-switcher class="menu-lang-switcher" />
  </div>
</template>

<script>
import AppLangSwitcher from "@/components/LangSwitcher";
import { getterTypes } from "@/store/app";
import { mapGetters } from "vuex";
import AppIcon from "@/components/Icon";

export default {
  name: "Menu",
  components: {
    AppLangSwitcher,
    AppIcon
  },
  computed: {
    ...mapGetters({
      menuIsOpen: getterTypes.menuIsOpen
    })
  }
};
</script>

<style scoped lang="scss">
.menu {
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
    width: calc((100% - 64px) * 0.48 + 64px);
    background: #111518;
  }

  &--visible {
    opacity: 1;
    pointer-events: unset;
  }
}

.menu-close-btn {
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

.menu-list {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 44px;
  max-width: 500px;
}

.menu-item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover .menu-link {
    color: $accent;
  }
}

.menu-link {
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

  svg {
    fill: white;
  }
}

.menu-lang-switcher {
  display: none;
  z-index: 0;
}

//---------------- 1024px ----------------

@media (max-width: 1024px) {
  .menu {
    padding-left: 97px;

    &::before {
      width: calc((100% - 64px) * 0.54 + 64px);
    }
  }

  .menu-close-btn {
    left: 17px;
    top: 28px;
  }
}

//---------------- 768px ----------------

@media (max-width: 768px) {
  .menu {
    padding: 97px;

    &::before {
      width: 100%;
    }
  }

  .menu-link {
    font-size: 28px;
    line-height: 33px;
  }
}

//---------------- 600px ----------------

@media (max-width: 600px) {
  .menu {
    padding: 80px 28px;
    justify-content: flex-start;
  }

  .menu-close-btn {
    left: 20px;
    top: 20px;
  }

  .menu-lang-switcher {
    display: flex;
    position: absolute;
    left: 16px;
    bottom: 16px;
  }
}
</style>
