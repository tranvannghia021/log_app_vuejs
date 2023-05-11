<template>
  <div id="app">
    <div class="box_model">
      <div class="box_header">
        <div class="box_search">
          <SearchBox @searchKeyword="searchKeyword"/>
        </div>
        <div class="box_filter">
            <!-- <ToastComponent/> -->
            <!-- <FilterComponent :classProp="className"/> -->
            <VueModalComponent @getList="getData"/>
          </div>
        </div>
        <div class="box_body">
            <TableComponent :data="data"/>
            <PaginationComponent :paginate="paginate" @changePage="changePage"/>
        </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "./components/SearchComponent.vue"
// import FilterComponent from "./components/FilterComponent.vue"
import TableComponent from "./components/TableComponent.vue"
import VueModalComponent from "./components/VueModalComponent.vue"
import PaginationComponent from "./components/PaginationComponent.vue"
// import ToastComponent from "./components/ToastComponent.vue"
import {getListLog} from './api/http.js'
export default {
  name: 'App',
  data(){
    return{
      data:[],
      keyword:"",
      paginate:{
        page:1,
        next:'',
        prev:''
      },
    };
  },
  components: {
    SearchBox,
    // FilterComponent,
    TableComponent,
    PaginationComponent,
    VueModalComponent,
    // ToastComponent
  },
  methods:{
   async getData(){
      try {
        const res= await getListLog(this.paginate.page,this.keyword);
        if(res.data.status){
          let data=res.data.data.data;
          let paginate=res.data.data;
            data = data.map((item)=>{

            return {
              id:item.id,
              key:item.key,
              value:item.value,
              shopifyId:item.shopify_shop_id,
              domain:item.raw_domain,
              type:item.type,
              created_at:item.created_at,
            }
          })

          this.paginate.next=paginate.next_page_url !==null ? paginate.current_page + 1 : null 
          this.paginate.page=paginate.current_page
          this.paginate.prev=paginate.prev_page_url !== null ? paginate.current_page - 1 : null
          this.data=[...data]
        }
      } catch (error) {
        console.log(error);
      }
    },
    changePage(payload){
        this.paginate.page =payload.page
    },
    searchKeyword(value){
      this.keyword=value.keyword
    }
  
  },
  watch:{
    statePage(){
      this.getData()
    },
    keyword(){
      this.getData()
    }
  },
  computed:{
    
    statePage(){
      return this.paginate.page
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body{
  width: 100%;
  height: 100%;
}
#app {
  background-color: #fff;
  width: 90%;
  margin: auto;
  box-shadow: 2px 2px 2px 4px#cccc;
}
.box_model{
  width: 100%;
  height: 100%;
  padding: 20px;
  display: inline-block;

}
.box_header{
  /* background-color: aqua; */
  border-top: 2px solid #dddd;
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  display: flex; 
  justify-content: space-between; 
}
.box_body{
  width: 100%;
  height: 90%;
}
.box_search{
  padding: 20px 0;
  flex: 0.4;
}
.box_filter{
  padding: 20px 0;
  flex: 0.4;

}
</style>
