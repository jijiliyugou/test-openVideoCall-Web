<template>
  <div class="home" id="homeBox"></div>
</template>

<script>
import RMT from "@/assets/js/signalROptions/signalROptions";
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    initRMT() {
      const rtc = new RMT({ groupNumber: "111" });
      rtc.startBasicCall();
    }
  },
  created() {
    this.initRMT();
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url("../assets/images/ag-index-background.png") center no-repeat;
  background-size: 100% 100%;
}
</style>
