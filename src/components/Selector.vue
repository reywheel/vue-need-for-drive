<template>
  <div class="input__wrapper" v-click-outside="closeListWithoutSaveValue">
    <input
      type="text"
      class="input"
      :value="value"
      :placeholder="placeholder"
      @input="inputHandler"
    />
    <svg
      @click="clearValue"
      class="input__cross"
      :class="{ 'input__cross--visible': value }"
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0.805714L7.19429 0L4 3.19429L0.805714 0L0 0.805714L3.19429 4L0 7.19429L0.805714 8L4 4.80571L7.19429 8L8 7.19429L4.80571 4L8 0.805714Z"
        fill="currentColor"
      />
    </svg>
    <ul class="input__list" :class="{ 'input__list--visible': value }">
      <template v-if="filteredList.length">
        <li
          v-for="(item, index) of filteredList"
          :key="index"
          class="input__list-item"
          @click="
            selectHandler(index);
            closeList();
          "
        >
          {{ item }}
        </li>
      </template>
      <li v-else class="input__list-item">Нет совпадений...</li>
    </ul>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "Selector",
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
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      initialValue: null
    };
  },
  computed: {
    preparedList() {
      let list = [...this.list];
      return list.sort();
    },
    filteredList() {
      if (this.value) {
        let list = [...this.preparedList];
        return list.filter(item => {
          return item.toLowerCase().includes(this.value.toLowerCase());
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    inputHandler($event) {
      this.$emit("input", $event.target.value);
    },
    clearValue() {
      this.$emit("input", null);
    },
    selectHandler(index) {
      this.$emit("input", this.filteredList[index]);
    },
    closeListWithoutSaveValue() {
      this.$emit("input", this.initialValue);
      this.$emit("close");
    },
    closeList() {
      this.$emit("close");
    }
  },
  created() {
    this.initialValue = this.value;
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
  border-bottom: 1px solid #999999;
  outline: none;
  width: 100%;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #121212;

  &::placeholder {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #999999;
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
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-right: none;
  padding: 11px 7px;
  overflow-y: auto;
  transition: opacity 0.3s;
  opacity: 0;
  pointer-events: none;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border: 2px solid transparent;
    border-radius: 4px;
    max-width: 2px;
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
  color: #999999;
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
