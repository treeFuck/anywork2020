<style scoped lang="scss">
.con {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #fff;
}
</style>

<template>
  <div class="con">
    <loginCon v-show="model"></loginCon>
    <regCon v-show="!model"></regCon>
  </div>
</template>

<script>
import loginCon from "@/components/Login/loginCon";
import regCon from "@/components/Login/regCon";
export default {
  name: "login",
  components: {
    loginCon,
    regCon
  },
  data() {
    return {
      model: true // true-> 登录，false-> 注册
    };
  },
  methods: {
    toIndex() {
      this.$router.replace({ name: "index" });
    }
  }
};
</script>
</script>