<template>
  <div>
    <div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="searchbar">
          <input class="search_input" v-model="searchText" type="text" name="" placeholder="Search...">
          <NuxtLink :to="`stream/${searchText}`" class="search_icon"><i class="fas fa-search"></i></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      searchText: ''
    }
  }
}
</script>

<style scoped>

    body,html{
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      background: #e74c3c !important;
    }

    .searchbar{
      margin-bottom: auto;
      margin-top: auto;
      height: 60px;
      background-color: #353b48;
      border-radius: 30px;
      padding: 10px;
    }

    .search_input{
      color: white;
      border: 0;
      outline: 0;
      background: none;
      width: 0;
      caret-color:transparent;
      line-height: 40px;
      transition: width 0.4s linear;
    }

    .searchbar:hover > .search_input{
      padding: 0 10px;
      width: 450px;
      caret-color:red;
      transition: width 0.4s linear;
    }

    .searchbar:hover > .search_icon{
      background: white;
      color: #e74c3c;
    }

    .search_icon{
      height: 40px;
      width: 40px;
      float: right;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      color:white;
      text-decoration:none;
    }
</style>