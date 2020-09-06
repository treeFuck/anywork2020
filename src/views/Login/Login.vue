<style scoped lang="scss">
</style>

<template>
  <div class="login">
    <h1>登录页面</h1>
    <Button @click="toIndex">去主页</Button>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    toIndex() {
      this.$router.replace({name: 'index'})
    }
  }
};
</script>