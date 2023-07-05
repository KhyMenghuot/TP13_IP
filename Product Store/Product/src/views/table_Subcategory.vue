<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0;display: flex; justify-content: space-around ">
          <div>
            <h1 style="font-size: 18px;">Daskboard Items</h1>
          </div>
          <div>   
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item> 
            <a-breadcrumb-item>App</a-breadcrumb-item> 
           </div>
          <a-button type="primary" @click="showModal1" size="large"> Create Item
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
          <a-modal v-model:visible="visible1" width="1000px" title="Item of Product" @ok="createCategoty" >
            <a-space direction="vertical">
            <label style="font-size: 16px;">Name Category</label>
              <a-select
                v-model:value="value"
                show-search
                placeholder="Select a person"
                style="width: 500px"
                :options="listC"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"

              ></a-select>
            <label style="font-size: 16px;">Name Items</label>
            <a-input v-model="new_name" placeholder="Input Name Category" @input="handleInput_nameCategory" style="width: 500px"/>
            </a-space>
          </a-modal>
       
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">

            <!-- Listing data from table  -->
            <a-table
                    :columns="columns"
                    :data-source="listSubC"
                    :row-key = "record => record.subcategoryID" 
                    bordered 
                    
                                  
                            >
                <template #bodyCell="{ column, index, record }" >
                <template v-if="column.key == 'name'" >{{ record.name }}</template>
                <template v-if="column.key == 'categoryID'">{{ this.getnameCategory(record.categoryID) }} </template>
                <template v-else-if="column.key === 'Editor'">
                   <a-space>
                    <a-button type="primary" style="background-color: ;"  @click="showModal(record.subcategoryID)" :key="index">Edit</a-button>
                    <a-button type="primary" style="background-color: rgb(255, 44, 44);border: rgb(185, 20, 20); border-radius: ;"  @click="deleteSubCategory(record.subcategoryID)" >Delete</a-button>
                    <a-modal
                      v-model:visible="visible"
                      title="Category"
                      ok-text="OK"
                      cancel-text="Cancel"
                      @ok="UpdateCategory"
                    >
                      <a-space direction="vertical">
                        <div>
                          <h3>Category : {{ this.default_categoryID }}</h3>
                          <h3>Old Name : {{ this.default_name }}</h3>
                        </div>
                      <div style="text-align: centers;"><h2>Update Information Category</h2></div>
                      <label style="font-size: 16px;">Name Category</label>
                        <a-select
                          v-model:value="value"
                          show-search
                          placeholder="Select a Category"
                          style="width: 300px"
                          :options="listC"
                          :filter-option="filterOption"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @change="handleChange"

                        ></a-select>
                      <label>New Items</label>
                      <a-input :v-model="new_name" placeholder="Input Items"   @input="handleInput_nameCategory" style="width: 300px"/>
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
import  { defineComponent, ref, withKeys    } from 'vue'; 
import { Ref, UnwrapRef ,createVNode } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { message, Modal,SelectProps  } from 'ant-design-vue';
import type { TableProps } from 'ant-design-vue';
const visible = ref<boolean>(false);
const visible1 = ref<boolean>(false);





const columns= [

    {
        title : 'ID',
        dataIndex : 'subcategoryID',
        sorter : true,
        width : '25%',
        key:'subcategoryID',
    },
    {
        title : 'Item',
        dataIndex: 'name',
        sorter : true,
        width : '25%',
        key:'name',


    },
    {
        title : 'CategoryID',
        dataIndex: 'categoryID',
        sorter : true,
        width : '25%',
        key:'categoryID',


    },
    {
        title : 'Editor',
        width : '25%',
        key : 'Editor'
    }

]

const options = ref<SelectProps['options']>([]);

interface DataItem {
  subcategoryID: number;
  name: string;
  categoryID:number;

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


  setup(){
    const listC = ref([])
    return{
      listC
    }
  },

  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
      columns,
      listSubC : ref([]),
      nameCategory : ref(''),
      itemRefs : ref([]),
      index : ref(),
      visible,
      confirm,
      visible1,
      value: ref<string | undefined>(undefined),
      options,
      

      // data from dataform of update category 
      new_categoryID : ref(),
      new_name : ref(''),
      default_categoryID : ref(''),
      default_name: ref(''),
     
    };
  },
  methods:{
      async listCategory(){
            let res =await fetch("http://localhost:8080/api/read_category");
            this.listC = await res.json();
            
            this.listC = this.listC.map(item => {
              return {
                value: item.categoryID,
                label: item.name
              }
            })
            this.option = this.listC;
            console.log(this.option)
            return this.listC
        },
      async listSubCategory(){
              let res = await fetch("http://localhost:8080/api/read_subcategory")
              this.listSubC = await res.json();
              console.log(this.listSubC);
              return this.listSubC
      },

      async createCategoty(event){
        visible1.value = false;
        fetch("http://localhost:8080/api/create_subcategory",{
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
              this.listSubC = this.listSubCategory()
              return data
              
            }).then(data => {
                return message.success(data.message);
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
             
              
            })
      },
    

        async deleteSubCategory(subcategoryID){
           fetch("http://localhost:8080/api/delete_subcategory/"+subcategoryID,{
            method:"POST",
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              console.log(data);
              this.listSubC = this.listSubCategory()
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

          let res = await this.listSubC[this.index].subcategoryID
          console.log(res)
          console.log(this.new_categoryID,this.new_name)
          fetch("http://localhost:8080/api/update_subcategory",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"    // declares format of data
            },
            body: JSON.stringify(               // turns data into JSON string
              {
                "categoryID": this.new_categoryID,              // keys and values we want to add
                "name": this.new_name,
                "subcategoryID" : res
              }
            ) 
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              console.log(data);
              this.listSubC = this.listSubCategory()
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
          for(i=0;i<this.listSubC.length;i++){
            // console.log(this.listC[i].categoryID)
            if(this.listSubC[i].subcategoryID==index){
              this.index = i;
              // console.log(this.index)
            }
          }
        },

        getnameCategory(categoryID){
          let i=0;
          for(i=0;i<this.listC.length;i++){
            if(this.listC[i].value==categoryID){
              let result = this.listC[i].label
               return result;
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
            
            console.log(this.new_categoryID,this.new_name)
        },
        
         showModal(subcategoryID){
            this.getIndex(subcategoryID)
            visible.value = true;
            let i=0;
            for( i=0;i<this.listC.length;i++){
              console.log( this.listC[i])
              if(this.listSubC[this.index].categoryID === this.listC[i].value){
                this.default_categoryID = this.listC[i].label
              }
            }
            this.default_name = this.listSubC[this.index].name
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

          handleChange (value: string){
            this.new_categoryID = value;
            console.log(`selected ${value}`);
          },
          handleBlur  (){
            console.log('blur');
          },
          handleFocus (){
            console.log('focus');
          },
          filterOption(input: string, option: any)  {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
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
    this.listSubCategory()
    // this.listProduct()
    this.show()
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
