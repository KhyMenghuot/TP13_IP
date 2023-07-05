<template>
  
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div id="logo" style="display: flex; justify-content: center;margin-top: 30px;">
        <img src="../../assets/logo.svg" style="width: 70px; margin-top:20px ;">

     </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" style="margin-top: 30px;">
        <a-menu-item key="1" @click="activeTab = 'Category'" >
            <ApartmentOutlined />
          <span>Category</span>
        </a-menu-item>
        <a-menu-item key="2" @click="activeTab = 'Subcategory'" >
          <appstore-outlined />
          <span>Items</span>
        </a-menu-item>
        <a-menu-item key="3" @click="activeTab = 'Product'">
          <shopping-cart-outlined />
          <span>Product</span>
        </a-menu-item>
        <a-menu-item key="4">
            <user-outlined />
          <span>User</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header" style="width: 100%; display: flex; justify-content: space-around;">
        
        <a-menu
            v-model:selectedKeys="selectedKeys1"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px'}"
        >
            <a-menu-item key="5" style="font-size: 18px;">Home</a-menu-item>
            <a-menu-item key="6" style="font-size: 18px;">
                <router-link to="/page1">Page 1</router-link>
            </a-menu-item >
            <a-menu-item key="7" style="font-size: 18px;">Admit</a-menu-item>
        </a-menu>
        <h2 style="color:aliceblue">DachBoard Admin</h2>
        </a-layout-header >
       
        <tableCategory :dataObject="listC" v-if="activeTab === 'Category'"/>
        <tableSubcategory :dataObject="listSubc" :data-category="listC"  v-if="activeTab ==='Subcategory'" />
        <tableProduct :dataObject="listP" v-if="activeTab === 'Product'"/> 
        
           
        <a-layout-footer style="text-align: center">[]
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
    UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  FileOutlined,
  ExclamationCircleOutlined ,
  PlusOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined
  
} from '@ant-design/icons-vue';
import  { defineComponent, ref, withKeys   } from 'vue'; 
import { Ref, UnwrapRef ,createVNode } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { message, Modal } from 'ant-design-vue';
import type { TableProps } from 'ant-design-vue';
import tableCategory from '../../views/table_Category.vue'
import tableSubcategory from '../../views/table_Subcategory.vue';
import tableProduct from '../../views/table_Product.vue'
    
export default {
 
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['2']),
      listC  : ref([]),
      listSubc :  ref([]),
      listP : ref([]),
      category : 'category',
      activeTab : 'Subcategory',
    
  
    };
  },

  methods:{
        async listSubCategory(){
            this.listC = [];
            let res = await fetch("http://localhost:8080/api/read_subcategory")
            this.listSubC = await res.json();
            console.log(this.listSubC);
            console.log((this.listC))
            return this.listSubC
        },
        async listProduct(){
            let res = await fetch("http://localhost:8080/api/read_product")
            this.listP = await res.json();
            console.log(this.listP)
        },
        show(){
          console.log(this.category,"hello")
        }
        
  }, 
  mounted(){
    // this.listCategory()
    // this.listSubCategory()
    // this.listProduct()
    this.show()
  },
  components: {
    tableCategory,
    tableSubcategory,
    tableProduct,
    ApartmentOutlined,
    AppstoreOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    
  },computed:{
    
  }

}; 
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}



header .ant-layout-header{
  height: 100px;
}

aside span{
  font-size: 17px;
}

.ant-layout-sider-chilrean  ul{

}
</style>
