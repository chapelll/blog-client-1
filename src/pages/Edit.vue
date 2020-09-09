<template>
  <div id="edit">
    <h1>编辑文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title" type="textarea" :autosize="{ minRows: 1, maxRows: 4}"></el-input>
    <p class="msg">请输入标题</p>
    <h3>内容简介</h3>
    <el-input v-model="description" type="textarea" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
    <p class="msg">请输入简介</p>
    <h3>文章内容</h3>
    <el-input v-model="content" type="textarea" :autosize="{ minRows: 6, maxRows: 30}"></el-input>
    <p class="msg">请输入内容</p>
    <p>
      <label>是否展示到首页</label>
      <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </p>
    <el-button @click="onEdit">确定</el-button>
  </div>
</template>

<script>
import blog from '@/api/blog.js'

export default {
  name: "Create",
  data() {
    return {
      title: '',
      description: '',
      content: '',
      atIndex: false,
    }
  },

  created() {
    this.blogId = this.$route.params.blogId
    blog.getDetail({blogId: this.blogId}).then((res)=>{
      this.title = res.data.title
      this.description = res.data.description
      this.content = res.data.content
      this.atIndex = res.data.atIndex
    })
  },

  methods: {
    onEdit() {
      blog.updateBlog({blogId: this.blogId},{ title: this.title, content: this.content, description: this.description, atIndex: this.atIndex})
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push({ path: `/detail/${res.data.id}`})
        }) 
    }
  }
}
</script>

<style scoped lang="less">
  .msg {
    color: grey;
    display: flex;
    flex-direction: row-reverse;
  }
</style>
