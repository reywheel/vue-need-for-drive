<template>
  <div class="additionally">
    <div class="additionally__color">
      <div class="additionally__color-title">Цвет</div>
      <base-radio-button
        v-model="color"
        name="color"
        native-value="any"
        label="Любой"
        class="additionally__color-input"
      />
      <base-radio-button
        v-model="color"
        name="color"
        native-value="red"
        label="Красный"
        class="additionally__color-input"
      />
      <base-radio-button
        v-model="color"
        name="color"
        native-value="blue"
        label="Голубой"
        class="additionally__color-input"
      />
    </div>
    <div class="additionally__date">
      <div class="additionally__date-title">Дата аренды</div>
      <div class="additionally__date-row">
        <span>С</span>
        <base-autocomplete
          v-model.trim="dateFrom"
          :list="dateList"
          placeholder="Введите дату и время"
        />
      </div>
      <div class="additionally__date-row">
        <span>По</span>
        <base-autocomplete
          v-model.trim="dateTo"
          :list="dateList"
          placeholder="Введите дату и время"
        />
      </div>
    </div>
    <div class="additionally__tariff">
      <div class="additionally__tariff-title">Тариф</div>
      <base-radio-button
        v-model="tariff"
        name="tariff"
        native-value="minuteByMinute"
        label="Поминутно, 7₽/мин"
        class="additionally__tariff-input"
      />
      <base-radio-button
        v-model="tariff"
        name="tariff"
        native-value="forADay"
        label="На сутки, 1999 ₽/сутки"
        class="additionally__tariff-input"
      />
    </div>
    <div class="additionally__services">
      <div class="additionally__services-title">Доп услуги</div>
      <base-checkbox
        v-model="fullTank"
        id="fullTank"
        label="Полный бак, 500р"
        class="additionally__services-checkbox"
      />
      <base-checkbox
        v-model="babyChair"
        id="babyChair"
        label="Детское кресло, 200р"
        class="additionally__services-checkbox"
      />
      <base-checkbox
        v-model="rightHandDrive"
        id="rightHandDrive"
        label="Правый руль, 1600р"
        class="additionally__services-checkbox"
      />
    </div>
  </div>
</template>

<script>
import { getterTypes, mutationTypes } from "@/store/order";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "OrderAdditionally",
  computed: {
    ...mapGetters([
      getterTypes.color,
      getterTypes.dateFrom,
      getterTypes.dateTo,
      getterTypes.tariff,
      getterTypes.fullTank,
      getterTypes.babyChair,
      getterTypes.rightHandDrive
    ]),
    ...mapGetters({
      dateList: getterTypes.dateList
    }),
    color: {
      get() {
        return this[getterTypes.color];
      },
      set(newColor) {
        this[mutationTypes.setColor](newColor);
      }
    },
    dateFrom: {
      get() {
        return this[getterTypes.dateFrom];
      },
      set(newDateFrom) {
        this[mutationTypes.setDateFrom](newDateFrom);
      }
    },
    dateTo: {
      get() {
        return this[getterTypes.dateTo];
      },
      set(newDateTo) {
        this[mutationTypes.setDateTo](newDateTo);
      }
    },
    tariff: {
      get() {
        return this[getterTypes.tariff];
      },
      set(newTariff) {
        this[mutationTypes.setTariff](newTariff);
      }
    },
    fullTank: {
      get() {
        return this[getterTypes.fullTank];
      },
      set(newValue) {
        this[mutationTypes.setFullTank](newValue);
      }
    },
    babyChair: {
      get() {
        return this[getterTypes.babyChair];
      },
      set(newValue) {
        this[mutationTypes.setBabyChair](newValue);
      }
    },
    rightHandDrive: {
      get() {
        return this[getterTypes.rightHandDrive];
      },
      set(newValue) {
        this[mutationTypes.setRightHandDrive](newValue);
      }
    }
  },
  methods: {
    ...mapMutations([
      mutationTypes.setColor,
      mutationTypes.setDateFrom,
      mutationTypes.setDateTo,
      mutationTypes.setTariff,
      mutationTypes.setFullTank,
      mutationTypes.setBabyChair,
      mutationTypes.setRightHandDrive
    ])
  }
};
</script>

<style scoped lang="scss">
.additionally {
  padding: 32px 64px;
}

.additionally__color-title,
.additionally__date-title,
.additionally__tariff-title,
.additionally__services-title {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: $black;
  margin-bottom: 16px;
}

.additionally__color-input {
  display: inline-block;

  &:not(:last-child) {
    margin-right: 16px;
  }
}

.additionally__color,
.additionally__date,
.additionally__tariff {
  margin-bottom: 32px;
}

.additionally__date-row {
  display: flex;
  align-items: center;

  span {
    min-width: 18px;
    margin-right: 8px;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: $black;
  }

  &:nth-child(2) {
    margin-bottom: 13px;
  }
}

.additionally__tariff-input {
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}

.additionally__services-checkbox {
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
</style>
