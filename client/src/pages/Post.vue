<template>
  <div class="page-module">
    <div class="poetry-body">
      <h2 class="title">{{ poetryObj.title }}</h2>
      <pre>
        <li class="verse-item" :key="item._id"
          v-for="item in this.poetryObj.paragraphs">
          {{ item }}
        </li>
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      poetryObj: {}
    }
  },
  created() {
    const params = {
      _id: this.$route.params.id,
      dynasty: 'tang'
    }
    this.$apis.poetry.getPoetryById(params).then(result => {
      this.poetryObj = result
    })
  }
}
</script>

<style lang="scss">
.page-module{
  .poetry-body {
    width: 100%;
    height: 100vh;
    @include flex-box-center(column);
    .title {
      text-align: center;
    }
    .verse-item {
      list-style: none;
      line-height: 1rem;
    }
  }
}
</style>

