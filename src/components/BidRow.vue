<template>
  <div class="bid__model bid__row">
    <div class="bid__row-title">
      <slot name="label"></slot>
    </div>
    <div class="bid__row-divided"></div>
    <div class="bid__row-value">
      <slot name="value"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BidRow"
};
</script>

<style scoped lang="scss">
.bid__row {
  display: flex;
  align-items: flex-end;
  margin-bottom: 16px;
}

.bid__row-title {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #121212;
}

.bid__row-divided {
  height: 5px;
  flex-grow: 1;
  border-top: 1px dotted #999999;

  margin: 0 12px;
}

.bid__row-value {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: #999999;
}
</style>
