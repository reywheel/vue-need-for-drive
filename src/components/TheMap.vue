<template>
  <div id="map" style="height: 400px; width: auto;"></div>
</template>

<script>
export default {
  name: "TheMap",
  props: {
    city: {
      type: [Object, String],
      required: true
    },
    pointList: {
      type: Array,
      default: () => [],
      validator(value) {
        return value.every(
          point =>
            // eslint-disable-next-line no-prototype-builtins
            point.hasOwnProperty("address") &&
            typeof point?.address === "string"
        );
      }
    }
  },
  data() {
    return {
      map: null
    };
  },

  watch: {
    city: {
      async handler(newCity) {
        const cityCoordinates = await this.getCityCoordinates(newCity.name);
        this.map.setCenter(cityCoordinates);
        this.map.geoObjects.removeAll();
      }
    },
    pointList() {
      this.setAllPoints();
    }
  },

  methods: {
    async addPoint(point) {
      const address = `${this.city.name}, ${point.address}`;
      // беру гео-объект по адресу
      // eslint-disable-next-line no-undef
      const res = await ymaps.geocode(address, {
        results: 1
      });
      const geoObject = res.geoObjects.get(0);

      // устанавливаю гео-объекту иконку
      geoObject.options.set(
        "iconImageHref",
        require("@/assets/icons/map-point.svg")
      );
      geoObject.options.set("iconLayout", "default#image");

      // вешаю на гео-объект обработчик события
      geoObject.events.add("click", () => {
        this.$emit("select", point);
      });

      // добавляю гео-объект
      this.map.geoObjects.add(geoObject);
    },

    setAllPoints() {
      if (this.pointList && this.pointList.length) {
        const pointList = [...this.pointList];
        if (pointList && pointList.length && this.map) {
          const promiseArray = pointList.map(point => this.addPoint(point));
          Promise.all(promiseArray).then(() => this.fitMapSize());
        }
      }
    },

    fitMapSize() {
      const bounds = this.map.geoObjects.getBounds();
      this.map.setBounds(bounds, {
        zoomMargin: 100
      });
      this.map.setZoom(11, {
        duration: 500
      });
    },

    async getCityCoordinates(cityName) {
      // eslint-disable-next-line no-undef
      const res = await ymaps.geocode(cityName, {
        results: 1
      });
      const geoObject = res.geoObjects.get(0);
      return geoObject.geometry._coordinates;
    }
  },

  mounted() {
    // eslint-disable-next-line no-undef
    ymaps.ready(async () => {
      const cityCoordinates = await this.getCityCoordinates(this.city.name);
      // eslint-disable-next-line no-undef
      this.map = new ymaps.Map("map", {
        center: cityCoordinates,
        zoom: 11
      });

      // удаление ненужных управляющих элементов
      this.map.controls.remove("fullscreenControl");
      this.map.controls.remove("routeEditor");
      this.map.controls.remove("rulerControl");
      this.map.controls.remove("searchControl");
      this.map.controls.remove("trafficControl");
      this.map.controls.remove("typeSelector");

      // добавление точек
      this.setAllPoints();
    });
  },
  beforeDestroy() {
    this.map.destroy();
  }
};
</script>

<style lang="scss">
.ymaps-2-1-78-ground-pane {
  filter: grayscale(1);
}
</style>
