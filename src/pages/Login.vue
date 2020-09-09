<template>
  <div id="login">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名">
    <h4>密码</h4>
    <input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin">
    <el-button size="medium" @click="onLogin">立即登录</el-button>
    <p class="notice">没有账号？<router-link to="/register">注册新用户</router-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLogin() {
      // console.log(this.username + this.password);
      this.login({username: this.username, password: this.password})
        .then(()=>{
          this.$router.push({ path: this.$route.query.redirect || '/' })
          // 登陆成功后跳转回原来登录前就计划前往的那个页面(该页面被存储在this.$router.query.redirect 中，没有就跳转到首页)
        })
    },
    ...mapActions([
      'login'
    ])
  }
}
</script>

<style scoped lang="less">
@import url('../assets/base.less');

#login, #register {
  display: grid;
  justify-content: center; //整个内容在容器里面的水平位置
  padding-top: 30px;
  
  h4 {
    margin: 10px 0 5px;
  }

  p {
    margin: 5px 0;
  }

  input {
    width: 400px;
  }

  .error {
    font-size: 12px;
    color: #f00;
  }

  button {
    margin-top: 30px;
    justify-self: start; 
    //  justify-items: 设置容器里面的所有子元素的水平轴排列方式 
    //  justify-self:  设置该子元素在容器里面的的水平轴排列方式 
  }

  .notice {
    font-size: 12px;
    color: @textLighterColor;
    text-align: center;
    margin-top: 30px;

    a {
      color: @themeColor;
    }
  }
}


</style>
