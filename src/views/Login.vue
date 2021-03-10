<template>
  <div class="login">
    <div class="myMiddle">
      <div class="loginContent">
        <div class="loginTitle">
          <h1>小竹熊致力于玩具行业高效服务</h1>
          <p>Xiaozhuxiong is committed to efficient service in toy industry</p>
        </div>
        <div class="loginbox">
          <loginForm />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loginForm from "@/components/LoginForm/LoginForm.vue";
export default {
  name: "Home",
  components: {
    loginForm
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100vh;
  .myMiddle {
    height: 100%;
    .loginContent {
      width: 100%;
      height: 100%;
      background: url("~@/assets/images/loginBgImg.png") no-repeat left;
      background-size: auto 800px;
      position: relative;
      .loginTitle {
        position: absolute;
        left: 400px;
        top: 100px;
        color: #000;
        h1 {
          font-weight: bold;
          font-size: 36px;
        }
        p {
          margin-top: 18px;
          font-size: 17px;
        }
      }
      .loginbox {
        width: 400px;
        height: 400px;
        position: absolute;
        left: 60%;
        top: 50%;
        padding: 50px;
        box-sizing: border-box;
        transform: translate(0, -50%);
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.15);
      }
    }
  }
}
</style>
