<template>
  <date-picker
    v-bind="$attrs"
    v-on="$listeners"
    type="datetime"
    :show-second="false"
    :show-time-panel="showTimePanel"
    format="DD.MM.YYYY HH:mm"
  >
    <template v-slot:footer>
      <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
        {{ showTimePanel ? "Выбарть дату" : "Выбрать время" }}
      </button>
    </template>
  </date-picker>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/ru";

export default {
  name: "BaseDatetimePicker",
  components: {
    DatePicker
  },
  data() {
    return {
      showTimePanel: false
    };
  },
  methods: {
    toggleTimePanel() {
      this.showTimePanel = !this.showTimePanel;
    }
  }
};
</script>

<style lang="scss">
$primary-color: $accent;

@import "~vue2-datepicker/scss/index.scss";

.mx-datepicker {
  max-width: 224px;
  width: 100%;
}

.mx-input {
  padding: 3px 24px 3px 9px;
  border: none;
  border-bottom: 1px solid $dark-grey;
  border-radius: unset;
  outline: none;
  width: 100%;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: $black;
  box-shadow: unset;
  height: unset;

  &::placeholder {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: $dark-grey;
  }

  &:hover,
  &:focus {
    border-color: $dark-grey;
  }
}

.mx-icon-calendar {
  display: none;
}
</style>
