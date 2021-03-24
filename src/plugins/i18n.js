import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  ru: {
    main: {
      title: "Каршеринг",
      description: "Поминутная аренда авто твоего города",
      buttonText: "Забронировать",
      citySelectorPlaceholder: "Начните вводить город ...",
      slider: {
        items: [
          {
            title: "Бесплатная парковка",
            description:
              "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах."
          },
          {
            title: "Страховка",
            description: "Полная страховка страховка автомобиля"
          },
          {
            title: "Бензин",
            description: "Полный бак на любой заправке города за наш счёт"
          },
          {
            title: "Обслуживание",
            description: "Автомобиль проходит еженедельное ТО"
          }
        ],
        buttonText: "Подробнее"
      }
    },
    menu: {
      parking: "Парковка",
      insurance: "Страховка",
      petrol: "Бензин",
      service: "Обслуживание"
    }
  },
  eng: {
    main: {
      title: "Car sharing",
      description: "Per-minute car rental in your city",
      buttonText: "To book",
      citySelectorPlaceholder: "Start typing a city ...",
      slider: {
        items: [
          {
            title: "Free parking",
            description:
              "Leave your car in paid city parking lots and permitted places, without violating traffic rules, as well as at airports."
          },
          {
            title: "Insurance",
            description: "Full insurance car insurance"
          },
          {
            title: "Petrol",
            description:
              "A full tank at any gas station in the city at our expense"
          },
          {
            title: "Service",
            description: "The car undergoes weekly maintenance"
          }
        ],
        buttonText: "More details"
      }
    },
    menu: {
      parking: "Parking",
      insurance: "Insurance",
      petrol: "Petrol",
      service: "Service"
    }
  }
};

const i18n = new VueI18n({
  locale: "ru",
  messages
});

export default i18n;
