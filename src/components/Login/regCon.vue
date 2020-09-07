<style scoped lang="scss">
</style>

<template>
  <div class="regCon">
    <div class="input">
      <img src />
      <input type="text" v-model="stuId" />
    </div>
    <div class="input">
      <img src />
      <input type="password" v-model="stuId" />
    </div>
  </div>
</template>

<script>
export default {
  name: "regCon",
  data() {
    return {
      stuId: "",
      pass: "",
      surePass: "",
      email: "",
      phone: ""
    };
  }
};
</script>
