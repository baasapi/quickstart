<template>
    <div v-if="posts.length">
      <div class="container" v-for="item in posts">
        <div class='post'>
          <div class='postTitle'>{{item.title}}</div>
          <div class='postTime'>
            {{new Date(item.createdAt).toLocaleString()}}
          </div>
          <div class='postContent'>{{item.content}}</div>
        </div>
      </div>
    </div>
    <div v-else class="noContent">没有文章</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      posts:[]
    }
  },
  mounted(){
    fetch('https://cn-east-1.baasapi.com/', {
      headers: {
        envid: 'yorhcDIFv2VLKyKE5YRa-', // 替换为你的环境ID
        keyid: 'frDo9pCfewCfBQ93otisA', // 替换为上面环境的密匙ID
      },
      method: 'POST',
      body: JSON.stringify({
        appId: 'qinglin-simple-blog', // 应用ID
        api: 'getManyPost', // 应用API
        version: 'v1', // API版本
        args: {}, // API参数
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.posts = data.posts ? data.posts.data : [];
      })
      .catch((e) => console.error(e));
  }
}
</script>

<style>
body {
  background-color: #f1f1f1;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post {
  background-color: #fff;
  border-radius: 8px;
  margin: 20px;
  padding: 20px;
  width: 900px;
  max-width: 90%;
}
.postTitle {
  font-size: 2em;
}
.postTime {
  font-size: 0.8em;
  color: #999;
  margin: 20px auto;
}
.postContent {
  color: #666;
}
.noContent {
  margin: 20%;
}
</style>
