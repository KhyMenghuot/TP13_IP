
<template>
  <a-layout>
    <a-layout-header class="header" style="width: 100%;">
     <div id="logo">
        <img src="../../assets/logo.svg" style="width: 70px; margin-top:20px ;">

     </div>
     <div id="title" >
        <h1 style="font-size: 40px; color: rgb(190, 184, 184);">TOP 1 .COM</h1>
     </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
         
         c
          mode="inline"
          :defaultSelectedKeys="['101']"
          :defaultOpenKeys="['101']"
          :selectedKeys="selectedKeys" 
          :openKeys="openKeys"
          :style="{ height: '100%', borderRight: 0 }"
        >
       
            <a-sub-menu  v-for="(listItem,index1) in listItems " :key=listItem.categoryID @click="this.getcategoryByID(listItems[index1].categoryID ) ">
              <template #title>
                <span>
                  <apartment-outlined  style="font-size: 22px;"/>
                  {{ listItem.name }}
                </span>
              </template>
              <!-- <a-menu-item v-for="(sub,index) in listSubItems" :key ="`${index1}-${index}`">
                <div  v-if="sub.categoryID === listItem.categoryID" >
                  {{sub.name}}
                </div>
                <div v-else-if="sub.categoryID !== listItem.categoryID">
                   {{ index=index-1 }}
                </div>
              </a-menu-item>      -->
              <div v-for="(sub,index) in listSubItems" :key="index">
                <a-menu-item v-if="sub.categoryID === listItem.categoryID" :key ="sub.subcategoryID" @click="getproductID(sub.subcategoryID)">
                  {{sub.name}}
                </a-menu-item>
              </div>
            </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0; color:rgb(206, 206, 206); font-size: 20px;">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-view  >About</router-view>
          </a-breadcrumb-item>
          <a-breadcrumb-item style="color: rgb(206, 206, 206);">App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <listProduct :dataObject="this.listProductID" />
         <h />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;

}
.site-layout-background {
  background: #fff;
}

.ant-layout *{
  font-size: 18px;
}

.ant-menu{
  background-color:rgba(22, 21, 37, 0.879);

}


.ant-layout{
  background-color: rgba(65, 71, 84, 0.567);
}

header{
  height: 100px;
}

.ant-menu-overflow-item{
  display: flex;
  justify-content: center;
}

.ant-menu{
  font-size: 16pxx;
}

#menu_bar{
  margin: 0;
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  width: 50% 
}

#list_menu{
  width: 100%;
   margin: 0;
  font-size: 20px;
  display: flex;
  
  justify-content: center;
  /* gap:2rem; */
  
}

#list_menu::before{
  content: unset;
}

span{
  color:#cdcdcd
}

.header{
  display: flex;
}

.header #logo{
  width: 30%;
 
}
.header #title{
  width: 70%;
  text-align: center;
  margin-top: 10px;
}



</style>

<script >
import { UserOutlined, LaptopOutlined, NotificationOutlined, ShopTwoTone ,ApartmentOutlined} from '@ant-design/icons-vue';
import { defineComponent, nextTick, ref, toValue } from 'vue';
import listProduct from '../../views/list_product.vue'
// import axios from 'axios';
export default {

        // listcategory : `<a-menu-item class="items" key="1">Home</a-menu-item>`,
        // selectedKeys1: ref<string[]>(['2']),
        // selectedKeys2: ref<String>(["Laptops","Cars","Phone"]),
        // collapsed: ref<Boolean>(false),
        // openKeys: ref<String>(['Laptops']),

        data() {
          return {
              listsub : ref([]),
              listItems: ref([]),
              nameSub : '',
              oneItem : [],
              listSubItems: [],
              listProduct: [],
              listProductID : [],
              // test : [[ {name:"Asus"},{name:"Lenovo"},{name:"Dell"}],[{name:"Toyota"},{name:"Mazada"},{name:"Merserdes"},{name:"BMW"}],[{name:"Iphone"}]],     
          }
        },
        methods: {
          async getcategory() {
              let res =await fetch("http://localhost:8080/api/read_category");
                 this.listItems = await res.json();
          },
          async getcategoryByID(id){
               
                let data = [];
                let res =await fetch("http://localhost:8080/api/read_subcategory_CID/"+id);
                // console.log(`http://localhost:8080/api/subcategory_ID/`+id)
                this.oneItem = await res.json()       
                // console.log(this.oneItem);
                // console.log(this.oneItem.data[0].name)   
          },
          async getitems() {
             let res = await fetch("http://localhost:8080/api/read_subcategory");
                this.listSubItems = await res.json();
                // console.log(this.listSubItems[0].subcategoryID)
          },
          async getproduct() {
            let res = await fetch("http://localhost:8080/api/read_product");
                this.listProduct = await res.json();
                // console.log(this.listProduct)
                // console.log(this.listProduct.data[0].name)
          },
          async getproductID(id) {
            console.log(id)
            let res = await fetch("http://localhost:8080/api/read_product_PID/"+id)
              this.listProductID = await res.json();
              console.log(this.listProductID)
              console.log(this.listProductID.data[0])
          },
          async show(){
            console.log(this.listProductID)
          }

        },
        mounted() {
          this.getcategory()
          this.getitems()
          this.getproduct()
          // this.getproductID(1)
          // this.show()

        },components : {
            UserOutlined,
            LaptopOutlined,
            NotificationOutlined,
            listProduct,
            ApartmentOutlined
        }        
};
</script>