<template>
  <div class="additionally">
    <!-- color -->
    <div class="additionally__color">
      <div class="additionally__color-title">Цвет</div>
      <template v-if="isColorChoiceAvailable">
        <base-radio-button
          v-model="color"
          value="Любой"
          label="Любой"
          name="color"
          class="additionally__color-input"
        />
        <base-radio-button
          v-for="(value, index) of selectedCar.colors"
          :key="index"
          v-model="color"
          :value="value"
          :label="value"
          name="color"
          class="additionally__color-input"
        />
      </template>
      <div v-else>Выбор цвета недоступен</div>
    </div>

    <!-- date -->
    <div class="additionally__date">
      <div class="additionally__date-title">Дата аренды</div>
      <div class="additionally__date-row">
        <span>С</span>
        <base-datetime-picker
          v-model="dateFrom"
          placeholder="Введите дату и время"
        />
      </div>
      <div class="additionally__date-row">
        <span>По</span>
        <base-datetime-picker
          v-model="dateTo"
          placeholder="Введите дату и время"
        />
      </div>
    </div>

    <!-- tariff -->
    <div class="additionally__tariff">
      <div class="additionally__tariff-title">Тариф</div>
      <base-radio-button
        v-for="(rate, index) of rateList"
        :key="index"
        v-model="tariffName"
        name="tariff"
        :value="rate.rateTypeId.name"
        :label="
          `${rate.rateTypeId.name}, ${rate.price}₽/${rate.rateTypeId.unit}`
        "
        class="additionally__tariff-input"
      />
    </div>

    <!-- services -->
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
import {
  getterTypes as orderGT,
  mutationTypes as orderMT
} from "@/store/order";
import {
  actionTypes as rateListAT,
  getterTypes as rateListGT
} from "@/store/rateList";
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseDatetimePicker from "@/components/BaseDatetimePicker";

export default {
  name: "OrderAdditionally",
  components: { BaseDatetimePicker },
  computed: {
    ...mapGetters([
      orderGT.color,
      orderGT.dateFrom,
      orderGT.dateTo,
      orderGT.tariff,
      orderGT.fullTank,
      orderGT.babyChair,
      orderGT.rightHandDrive
    ]),
    ...mapGetters({
      dateList: orderGT.dateList,
      selectedCar: orderGT.car,
      rateList: rateListGT.allRates,
      isRateListLoading: rateListGT.isLoading
    }),
    isColorChoiceAvailable() {
      return this.selectedCar.colors.length > 0;
    },
    color: {
      get() {
        return this[orderGT.color];
      },
      set(newColor) {
        this[orderMT.setColor](newColor);
      }
    },
    dateFrom: {
      get() {
        return this[orderGT.dateFrom];
      },
      set(newDateFrom) {
        this[orderMT.setDateFrom](newDateFrom);
      }
    },
    dateTo: {
      get() {
        return this[orderGT.dateTo];
      },
      set(newDateTo) {
        this[orderMT.setDateTo](newDateTo);
      }
    },
    tariffName: {
      get() {
        return this[orderGT.tariff].rateTypeId?.name;
      },
      set(newTariffName) {
        let tariff = this.rateList.find(
          rate => rate.rateTypeId.name === newTariffName
        );
        this[orderMT.setTariff](tariff);
      }
    },
    fullTank: {
      get() {
        return this[orderGT.fullTank];
      },
      set(newValue) {
        this[orderMT.setFullTank](newValue);
      }
    },
    babyChair: {
      get() {
        return this[orderGT.babyChair];
      },
      set(newValue) {
        this[orderMT.setBabyChair](newValue);
      }
    },
    rightHandDrive: {
      get() {
        return this[orderGT.rightHandDrive];
      },
      set(newValue) {
        this[orderMT.setRightHandDrive](newValue);
      }
    }
  },
  watch: {
    selectedCar() {
      this.color = "Любой";
    }
  },
  methods: {
    ...mapMutations([
      orderMT.setColor,
      orderMT.setDateFrom,
      orderMT.setDateTo,
      orderMT.setTariff,
      orderMT.setFullTank,
      orderMT.setBabyChair,
      orderMT.setRightHandDrive
    ]),
    ...mapActions({
      fetchRateList: rateListAT.getRateList
    })
  },
  created() {
    this.fetchRateList().then(() => {
      this[orderMT.setTariff](this.rateList[0]);
    });
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

@media (max-width: 600px) {
  .additionally {
    padding: 32px;
  }
}
</style>
