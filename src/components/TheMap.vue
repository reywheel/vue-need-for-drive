<template>
  <div id="map" style="width: 100%; height: 400px"></div>
</template>

<script>
export default {
  name: "TheMap",
  data() {
    return {
      map: null
    };
  },
  methods: {
    addPoint(address) {
      // eslint-disable-next-line no-undef
      ymaps
        .geocode(address, {
          results: 1
        })
        .then(res => {
          let firstGeoObject = res.geoObjects.get(0);
          firstGeoObject.options.set(
            "iconImageHref",
            require("@/assets/icons/map-point.svg")
          );
          firstGeoObject.options.set("iconLayout", "default#image");
          this.map.geoObjects.add(firstGeoObject);
          const bounds = this.map.geoObjects.getBounds();
          this.map.setBounds(bounds, {
            zoomMargin: 40
          });
        });
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    ymaps.ready(() => {
      // eslint-disable-next-line no-undef
      this.map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
      });

      this.addPoint("сочи павлова 89");
      this.addPoint("сочи победы 111");
      this.addPoint("сочи победы 300");
    });
  }
};
</script>

<style lang="scss">
.ymaps-2-1-78-ground-pane {
  filter: grayscale(1);
}
</style>
