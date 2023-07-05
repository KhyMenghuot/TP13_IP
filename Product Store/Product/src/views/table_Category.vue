<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0;display: flex; justify-content: space-around ">
          <div>
            <h1 style="font-size: 18px;">Daskboard Category</h1>
          </div>
          <div>   
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item> 
            <a-breadcrumb-item>App</a-breadcrumb-item> 
           </div>
          <a-button type="primary" @click="showModal1" size="large"> Create Category
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
          <a-modal  v-model:visible="visible1" width="1000px" title="Create Category" @ok="createCategoty" >
            <a-space direction="vertical">
            <label style="font-size: 16px;">ID Category</label>
            <a-input v-model="new_categoryID" placeholder="Input Category ID"  @input="handleInput_categoryID" style="width: 500px; "/>
            <label style="font-size: 16px;">Name Category</label>
            <a-input v-model="new_name" placeholder="Input Name Category" @input="handleInput_nameCategory" style="width: 500px"/>
            </a-space>
          </a-modal>
       
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">

            <!-- Listing data from table  -->
            <a-table
                    :columns="columns"
                    :data-source="listC"
                    :row-key = "record => record.categoryID"
                    bordered 
                    
                                  
                            >
                <template #bodyCell="{ column, index, record }" >
                <template v-if="column.key === 'name'" >{{ record.name }}</template>
                <template v-else-if="column.key === 'Editor'">
                   <a-space>
                    <a-button type="primary" style="background-color: ;"  @click="showModal(record.categoryID)" :key="index">Edit</a-button>
                    <a-button type="primary" style="background-color: rgb(255, 44, 44);border: rgb(185, 20, 20); border-radius: ;" @click="deleteCategory(record.categoryID)" >Delete</a-button>
                    <a-modal
                      v-model:visible="visible"
                      title="Category"
                      ok-text="OK"
                      cancel-text="Cancel"
                      @ok="UpdateCategory"
                    >
                      <a-space direction="vertical">
                        <div>
                          <h3>ID : {{ this.default_categoryID }}</h3>
                          <h3>Old Name : {{ this.default_name }}</h3>
                        </div>
                      <div style="text-align: centers;"><h2>Update Information Category</h2></div>
                      <label>ID of Category</label>
                      <a-input :v-model="new_categoryID" placeholder="Input Category ID"  @input="handleInput_categoryID" style="width: 300px"/>
                      <label>New Name Category</label>
                      <a-input :v-model="new_name" placeholder="Input Name Category"   @input="handleInput_nameCategory" style="width: 300px"/>
                      </a-space>

                    </a-modal>
                    
                   </a-space>
                </template>
                </template>
                
            </a-table>
        </div>
    </a-layout-content>
</template>



<script lang="ts">
import {
    UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  FileOutlined,
  ExclamationCircleOutlined ,
  PlusOutlined
  
} from '@ant-design/icons-vue';
import  { defineComponent, ref, withKeys   } from 'vue'; 
import { Ref, UnwrapRef ,createVNode } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { message, Modal } from 'ant-design-vue';
import type { TableProps } from 'ant-design-vue';
const visible = ref<boolean>(false);
const visible1 = ref<boolean>(false);


const columns= [

    {
        title : 'ID',
        dataIndex : 'categoryID',
        sorter : true,
        width : '30%',
        key:'categoryID',
    },
    {
        title : 'Name',
        dataIndex: 'name',
        sorter : true,
        width : '30%',
        key:'name',


    },
    {
        title : 'Editor',
        width : '30%',
        key : 'Editor'
    }

]
interface DataItem {
  categoryID: string;
  name: string;

}

    
export default defineComponent({
    props: {
    dataObject: {
      type: Array,
      required: true,
    },
  },
  components: {
    UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
    FileOutlined,
    PlusOutlined
    
  },

  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
      listC : ref([]),
      columns,
      index:ref(),
      itemRefs : ref([]),
      visible,
      confirm,
      visible1,
      

      // data from dataform of update category 
      new_categoryID : ref(),
      new_name : ref(''),
      default_categoryID : ref(),
      default_name: ref(''),
     
    };
  },
  methods:{
    async listCategory(){
            let res =await fetch("http://localhost:8080/api/read_category");
            this.listC = await res.json();
            console.log(this.listC);
            return this.listC
           
        },
      async createCategoty(event){
        visible1.value = false;
        fetch("http://localhost:8080/api/create_category",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"    // declares format of data
            },
            body: JSON.stringify(               // turns data into JSON string
              {
                "categoryID": this.new_categoryID,              // keys and values we want to add
                "name": this.new_name,
              }
            ) 
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              console.log(data);
              this.listC = this.listCategory()
              return data
              
            }).then(data => {
                return message.success(data.message);
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
             
              
            })
      },
    

        async deleteCategory(categoryID){
         
       
           fetch("http://localhost:8080/api/delete_categoty/"+categoryID,{
            method:"DELETE",
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              console.log(data);
              this.listC = this.listCategory()
              return data
               
            }).then(data => {
              if(data.update){
                return message.success(data.message)
              }else{
                return message.error(data.message)
              }
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
            })
        },

        async UpdateCategory(){
          visible.value = false;
          console.log(this.new_categoryID,this.new_name)
          fetch("http://localhost:8080/api/update_category",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"    // declares format of data
            },
            body: JSON.stringify(               // turns data into JSON string
              {
                "categoryID": this.new_categoryID,              // keys and values we want to add
                "name": this.new_name,
              }
            ) 
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              console.log(data);
              this.listC = this.listCategory()
              return data
            
            }).then(data =>{
              if(data.update){
                return message.success(data.message)
              }else{
                return message.error(data.message)
              }
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
              
            })
            
        },

        getIndex(index){
          let i=0;
          // console.log(this.listC.length)
          for(i=0;i<this.listC.length;i++){
            // console.log(this.listC[i].categoryID)
            if(this.listC[i].categoryID==index){
              this.index = i;
              // console.log(this.index)
            }
          }
        },
       
        getRowKey(record, index) {
          return index; // Return the index as the row key
        },

        handleInput_categoryID(event) {
          console.log(event.target.value);
          this.new_categoryID = event.target.value
        },
        
        handleInput_nameCategory(event){
          console.log(event.target.value);
          this.new_name = event.target.value
        },

        async show(){
         
        },
        
         showModal(categoryID){
            console.log(categoryID)
            this.getIndex(categoryID)
            console.log(this.index)
            visible.value = true;
            this.default_categoryID = this.listC[this.index].categoryID
            this.default_name = this.listC[this.index].name
          },
          hideModal (event){
            visible.value = false;
            console.log(this.new_categoryID,this.new_name)
          },
          showModal1(){
            visible1.value = true;
          },
          hideModal1 (event){
            visible1.value = false;
            console.log(this.new_categoryID,this.new_name)
          },

     confirm  ()  {
      Modal.confirm({
        title: 'Confirm',
        icon: createVNode(ExclamationCircleOutlined),
        content: 'Bla bla ...',
        okText: 'OK',
        cancelText: 'Cancel',
      });
    },
   
        
  },
  mounted(){
    this.listCategory()
    // this.listSubCategory()
    // this.listProduct()
    // this.show()
  }

}); 
</script>

<style>
/* #components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
} */

.header{
    background-color: rgb(105, 100, 100)
}

tr{
    background-color: antiquewhite;
    border: 2px solid black;
    font-size: large;
}

td{
    background-color:rgb(193, 193, 184);
    font-size: medium;
    margin-top:100px;
}

.ant-breadcrumb{
  height: 70px;
  margin: auto;
  text-align: center;
}
</style>
