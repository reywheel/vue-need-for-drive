<template>
  <div class="model">
    <base-loader v-if="isCarListLoading || isCategoryListLoading" />
    <template v-else>
      <div class="model__header">
        <base-radio-button
          v-model="filter"
          value="all"
          label="Все"
          name="filter"
          class="model__radio-wrapper"
        />
        <base-radio-button
          v-for="(category, index) of categoryList"
          :key="index"
          v-model="filter"
          :value="category.id"
          :label="category.name"
          name="filter"
          class="model__radio-wrapper"
        />
      </div>
      <div class="model__list">
        <div class="model__list-inner">
          <app-car-card
            v-for="(car, index) of preparedCarList"
            v-show="filter === 'all' || car.categoryId.id === filter"
            :key="index"
            :car="car"
            :is-active="selectedCar && selectedCar.id === car.id"
            @click.native="selectedCar = car"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  getterTypes as carListGT,
  actionTypes as carListAT
} from "@/store/carList";
import {
  getterTypes as categoryListGT,
  actionTypes as categoryListAT
} from "@/store/categoryList";
import {
  getterTypes as orderGT,
  mutationTypes as orderMT
} from "@/store/order";
import { mapActions, mapGetters } from "vuex";
import AppCarCard from "@/components/CarCard";

export default {
  name: "OrderModel",
  components: {
    AppCarCard
  },
  data() {
    return {
      filter: "all"
    };
  },
  computed: {
    ...mapGetters({
      carList: carListGT.allCars,
      isCarListLoading: carListGT.isLoading,
      isCarListEmpty: carListGT.isEmpty,
      categoryList: categoryListGT.allCategories,
      isCategoryListLoading: categoryListGT.isLoading
    }),
    preparedCarList() {
      if (!this.isCarListEmpty) {
        const baseUrl = process.env.VUE_APP_API_URL.replace("/api/", "");
        return this.carList.map(car => {
          const newCar = { ...car };
          newCar.thumbnail.path = baseUrl + newCar.thumbnail.path;
          return newCar;
        });
      } else {
        return [];
      }
    },
    selectedCar: {
      get() {
        return this.$store.getters[orderGT.car];
      },
      set(newCar) {
        this.$store.commit(orderMT.setCar, newCar);
      }
    }
  },
  methods: {
    ...mapActions({
      fetchCarList: carListAT.getCarList,
      fetchCategoryList: categoryListAT.getCategoryList
    })
  },
  created() {
    this.fetchCarList();
    this.fetchCategoryList();
  }
};
</script>

<style scoped lang="scss">
.model {
  padding: 32px 64px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.model__header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.model__radio-wrapper {
  margin-bottom: 10px;
  &:not(:last-child) {
    margin-right: 16px;
  }
}

.model__radio {
  display: none;
}

.model__radio-label {
  position: relative;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: $black;
  padding-left: 20px;
  cursor: pointer;

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid $dark-grey;
    border-radius: 100%;
  }
}

.model__radio:checked ~ .model__radio-label {
  &::before {
    border: 3px solid $accent;
  }
}

.model__list {
  flex-grow: 1;
  position: relative;
}

.model__list-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border: 1px solid $light-grey;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $dark-grey;
    border: 2px solid transparent;
    border-radius: 4px;
    background-clip: content-box;
  }
}

@media (max-width: 600px) {
  .model {
    padding: 32px;
  }

  .model__list {
    min-height: 500px;
  }
}
</style>
