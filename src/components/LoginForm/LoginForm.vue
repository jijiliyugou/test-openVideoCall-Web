<template>
  <div class="formBox">
    <div class="titleBox">
      <i class="titleIcon"></i>
      <h2 class="title">登录系统</h2>
    </div>
    <el-form :model="loginforms" ref="mobileRef" class="smsLogin">
      <el-form-item prop="username">
        <div class="mobileBox">
          <el-input
            placeholder="请输入手机号"
            v-model="loginforms.username"
            @keyup.enter.native="handleLogin"
          ></el-input>
          <div class="mobileIconBox">
            <i class="mobileIcon"></i>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="verifycode">
        <div class="countDownBox">
          <div class="codeBox">
            <el-input
              placeholder="请输入登录码"
              v-model="loginforms.verifycode"
              class="verifycode"
              @keyup.enter.native="handleLogin"
            ></el-input>
            <div class="codeIconBox">
              <i class="codeIcon"></i>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="submintBtn" type="primary" @click="handleLogin"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginforms: {
        username: null,
        verifycode: null
      }
    };
  },
  methods: {
    handleLogin() {
      if (this.loginforms.username || this.loginforms.verifycode) {
        sessionStorage.setItem("isLogin", true);
        this.$router.push("/home");
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.formBox {
  width: 100%;
  height: 100%;
  .titleBox {
    display: flex;
    justify-content: center;
    align-items: center;
    .titleIcon {
      display: block;
      width: 30px;
      height: 30px;
      background: url("~@/assets/images/yonghu.png") center center no-repeat;
      background-size: contain;
      margin-right: 10px;
    }
    .title {
      font-size: 24px;
      font-weight: 500;
    }
  }
  .loginFormLaout {
    margin-top: 40px;
    .smsLogin {
      padding-top: 27px;
      .el-form-item {
        margin-bottom: 25px;
      }
    }
  }
  .el-form-item ::v-deep .submintBtn {
    width: 100%;
    height: 48px;
    font-size: 22px;
  }
  .el-input ::v-deep .el-input__inner {
    font-size: 16px;
    height: 50px;
    padding-left: 50px;
  }
  .countDownBox {
    display: flex;
    align-items: center;
    .codeBox {
      width: 100%;
      position: relative;
      .codeIconBox {
        position: absolute;
        width: 50px;
        height: 50px;
        left: 0;
        top: 0;
        .codeIcon {
          position: absolute;
          width: 13px;
          height: 20px;
          left: 50%;
          top: 50%;
          background: url("~@/assets/images/suotou.png") no-repeat center center;
          background-size: contain;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .mobileBox {
    position: relative;
    .mobileIconBox {
      position: absolute;
      width: 50px;
      height: 50px;
      left: 0;
      top: 0;
      .mobileIcon {
        position: absolute;
        width: 13px;
        height: 20px;
        left: 50%;
        top: 50%;
        background: url("~@/assets/images/shouji.png") no-repeat center center;
        background-size: contain;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
