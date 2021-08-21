<style scoped lang="scss">
.joinOrganization {
  .top {
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 2em 0;

    .logo {
      height: 3.5em;
    }

    .title {
      padding-left: 1.5em;
      font-size: 2.2em;
      font-weight: bold;
      color: #548cfe;
    }
  }

  .inputCon {
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2em;
      // height: 2em;
      line-height: 2em;

      span {
        display: block;
        margin-right: 0.5em;
        width: 6em;
        color: #548cfe;
        font-size: 1.3em;
        text-align: right;
      }

      input {
        width: 16em;
        color: #495060;
        border: none;
        outline: none;
        font-size: 1em;

        border-bottom: 1px solid #548cfe;
      }

      input::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        color: #ababab;
      }
    }
  }

  .btn {
    margin-top: 2em;
    height: 2.2em;
    color: #fff;
    font-size: 1.3em;
    background: #548cfe;
  }
  .btn.search {
    width: 50px;
    font-size: 1em;
    cursor: pointer;
    border: #fff 1px solid;
    margin-top: 0px;
  }

  .orga-list {
    max-height: 200px;
    margin-top: 0 !important;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .orga-item {
      width: 100%;
      justify-content: flex-start;
      input {
        width: 50px;
      }
      p {
        margin-left: 10px;
      }
    }
  }
}
</style>

<template>
  <div class="joinOrganization">
    <div class="top">
      <img class="logo" src="../../../assets/images/anywork@2x.png" alt="" />
      <div class="title">加入组织</div>
    </div>

    <div class="inputCon">
      <div>
        <span>搜索组织</span>
        <input
          type="text"
          v-model="organizationName"
          @keydown.enter="searchOrganization"
          placeholder="请输入组织名称"
        />
        <button class="btn search" @click="searchOrganization">搜索</button>
      </div>
      <div>
        <span>选择组织</span>
      </div>
      <div class="orga-list" v-for="item in organizations">
        <div class="orga-item">
          <span
            ><input
              type="radio"
              name="organization"
              v-model="organizationId"
              :value="item.organizationId"
          /></span>
          <p>{{ item.organizationName }}{{ item.isJoin ? "(已加入)" : "" }}</p>
          <p>{{ item.teacherName }}</p>
        </div>
      </div>
      <div>
        <span>输入口令</span>
        <input
          type="text"
          v-model="token"
          placeholder="请输入组织口令"
          @keydown.enter="joinOrganization"
        />
      </div>
    </div>
    <Button class="btn" @click="joinOrganization" long>加入组织</Button>
  </div>
</template> 
<script>
import personalApi from "../../../share/api/personalApi";
export default {
  name: "joinOrganization",
  props: {},
  data() {
    return {
      organizationName: "",
      organizationId: "",
      token: "",
      organizations: [],
    };
  },
  methods: {
    searchOrganization() {
      if (!this.organizationName) {
        this.$Message.warning("组织名称不能为空");
        return;
      }
      let send = {
        organizationName: this.organizationName,
      };
      personalApi.searchOrganization(send).then((res) => {
        if (res.state === 1) {
          this.$Message.success({
            content: res.stateInfo,
          });
          this.organizations = res.data;
        } else {
          this.$Message.warning({
            content: res.stateInfo,
          });
        }
      });
    },
    joinOrganization() {
      if (!this.organizationId || !this.token) {
        this.$Message.warning("请选择组织或输入口令");
        return;
      }
      let send = {
        organizationId: this.organizationId,
        token: this.token,
      };

      personalApi.joinOrganization(send).then((res) => {
        if (res.state === 1) {
          this.$Message.success({
            content: res.stateInfo,
          });
          this.$router.back()
        } else {
          this.$Message.warning({
            content: res.stateInfo,
          });
        }
      });
    },
  },
};
</script>