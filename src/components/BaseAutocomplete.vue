<template>
  <div
    class="input__wrapper"
    :class="{ loading: isLoading }"
    v-click-outside="outsideClickHandler"
  >
    <input
      type="text"
      class="input"
      v-model="localValue"
      :placeholder="placeholder"
      @input="open = true"
    />
    <base-icon
      class="input__cross"
      :class="{ 'input__cross--visible': value }"
      name="autocomplete-cross"
      @click.native="localValue = ''"
    />
    <ul
      class="input__list"
      :class="{ 'input__list--visible': isListOpen }"
      @mouseover="isInputInFocus = true"
    >
      <template v-if="filteredList && filteredList.length">
        <li
          v-for="(item, index) of filteredList"
          :key="index"
          class="input__list-item"
          @click="selectHandler(index)"
        >
          {{ item.name }}
        </li>
      </template>
      <li v-else class="input__list-item">Нет совпадений...</li>
    </ul>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "BaseAutocomplete",
  props: {
    value: {
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: Array
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      localValue: "",
      open: false
    };
  },
  computed: {
    isLengthFull() {
      return this.localValue.length >= 2;
    },
    isListOpen() {
      return this.open && this.isLengthFull;
    },
    sortedList() {
      if (this.list) {
        const list = [...this.list];
        return list.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        return [];
      }
    },
    filteredList() {
      if (this.localValue) {
        const list = [...this.sortedList];
        return list.filter(item => {
          return item.name
            .toLowerCase()
            .includes(this.localValue.toLowerCase());
        });
      } else {
        return this.sortedList;
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.localValue = newValue?.name || "";
      }
    }
  },
  methods: {
    selectHandler(index) {
      this.$emit("input", { ...this.filteredList[index] });
      this.$emit("select");
      this.open = false;
    },
    outsideClickHandler() {
      this.open = false;
    }
  }
};
</script>

<style scoped lang="scss">
.input__wrapper {
  position: relative;
  max-width: 224px;
  width: 100%;
}

.input {
  padding: 3px 24px 3px 9px;
  border: none;
  border-bottom: 1px solid $dark-grey;
  outline: none;
  width: 100%;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: $black;

  &::placeholder {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: $dark-grey;
  }
}

.input__cross {
  position: absolute;
  height: 8px;
  width: 8px;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: opacity 0.3s;
  opacity: 0;
  pointer-events: none;

  &--visible {
    opacity: 1;
    pointer-events: unset;
  }
}

.input__list {
  position: absolute;
  height: 106px;
  top: 100%;
  left: 0;
  right: 0;
  background: $white;
  border: 1px solid $light-grey;
  border-top: none;
  padding: 11px 7px;
  overflow-y: auto;
  opacity: 0;
  pointer-events: none;
  z-index: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-left: 1px solid $light-grey;
    border-right: 1px solid $light-grey;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $dark-grey;
    border: 2px solid transparent;
    border-radius: 4px;
    background-clip: content-box;
  }

  &--visible {
    opacity: 1;
    pointer-events: unset;
  }
}

.input__list-item {
  font-weight: 300;
  font-size: 14px;

  line-height: 16px;
  color: $dark-grey;
  transition: color 0.3s;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: $accent;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
