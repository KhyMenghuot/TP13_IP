<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0;display: flex; justify-content: space-around ">
          <div>
            <h1 style="font-size: 18px;">Daskboard Product</h1>
          </div>
          <div>   
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item> 
            <a-breadcrumb-item>App</a-breadcrumb-item> 
           </div>
           <!-- product table -->
          <a-button type="primary" @click="showModal1" size="large"> Create  product
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
          <a-modal v-model:visible="visible1" width="1000px" title="Create Product" @ok="createProduct" >
            <form action="http://localhost:8080/api/create_product" enctype="multipart/form-data" method="post">
            <div style="width: 100%; display: flex; justify-content: center">
              <a-space direction="vertical" >
              
              <label style="font-size: 16px;">Name Items</label>
                <a-select
                  :value="value"
                  show-search
                  placeholder="Select Items"
                  style="width: 500px"
                  :options="listSubC"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"

                ></a-select>
                <label style="font-size: 16px;">Name Product</label>
                <a-input   v-model="new_name" placeholder="Input Name Product" @input="handleInput_nameProduct" style="width: 500px"/>

                <label style="font-size: 16px;">Upload Profile</label>
                <input type="file" name="file" id="file" ref="file" @change="handleFileUpload"/>
                <div>
                <div style="display: flex;justify-content: space-around; position: relative; ">
                
                  <a-space direction="horizontal"><div >
                    <label style="font-size: 16px;" >Shope 1</label>
                    <a-input v-model="shop1" placeholder="Input Name Shope" @input="handleInput_shop1"></a-input>
                  </div>
                  <div>
                    <label style="font-size: 16px;">Price</label>
                    <a-input v-model="price1" placeholder="Input Price" @input="handleInput_price1"></a-input>
                  </div></a-space>
                
                </div>
                <div style="display: flex;justify-content: space-around; position: relative; ">
                  <a-space direction="horizontal">  <div >
                    <label style="font-size: 16px;">Shope 2 </label>
                    <a-input v-model="shop2" placeholder="Input Name Shope" @input="handleInput_shop2"></a-input>
                  </div>
                  <div>
                    <label style="font-size: 16px;">Price</label>
                    <a-input v-model="price2" placeholder="Input Price" @input="handleInput_price2"></a-input>
                  </div></a-space>
                
                </div>
              </div>
          
              </a-space>
            </div>
          </form>
          </a-modal>
       
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">

            <!-- Listing data from table  -->
            <a-table
                    :columns="columns"
                    :data-source="listP"
                    :row-key = "record => record.productID"
                    bordered 
                    
                                  
                            >
                <template #bodyCell="{ column, index, record }" >
                <template v-if="column.key == 'name'" >{{ record.name }}</template>
                <template v-else-if="column.key === 'Editor'">
                   <a-space >
                    <a-button type="primary" style="background-color: ;"  @click="showModal(record.productID)" :key="index">Edit</a-button>
                    <a-button type="primary" style="background-color: rgb(255, 44, 44);border: rgb(185, 20, 20); border-radius: ;"  @click="deleteProduct(record.productID)" >Delete</a-button>
                    <a-modal
                      v-model:visible="visible"
                      title="Product"
                      ok-text="OK"
                      width="900px"
                      cancel-text="Cancel"

                      @ok="UpdateProduct(record.productID)"
                    >
                    <a-space direction="vertical">
                        <div style="width: 750px; height:30%; ">
                          <h3>Items : {{ this.default_categoryID }}</h3>
                          <h3>Old Name : {{ this.default_name }}</h3>
                        </div>
                        <div style="width: 100%; height:70%; display: flex; justify-content: space-around;">
                          <div >
                            <a-space direction="vertical">
                            <div style="text-align: centers;"><h2 style="color:rgb(32, 83, 137)">Update Information Product</h2></div>
                            <label style="font-size: 16px;">Name Items</label>
                            <a-select
                            :value="value"
                              show-search
                              placeholder="Select a items"
                              style="width: 300px"
                              :options="listSubC"
                              :filter-option="filterOption"
                              @focus="handleFocus"
                              @blur="handleBlur"
                              @change="handleChange"

                            ></a-select>
                            <label>New Productsi</label>
                            <a-input :v-model="new_name" placeholder="Input products"   @input="handleInput_nameProduct" style="width: 300px"/>
                            <label>New Image</label>
                            <input type="file" name="file" id="file" ref="file" @change="handleFileUpload"/>
                            <div style="margin-top: 20px ;">
                                  <a-space :size="130">
                                  <tr style="border: 2px soild black">
                                    <th style="width: 200px;"><h2>Shop</h2></th>
                                    <th style="width: 100px;"><h2>Price</h2></th>
                                    <th style="width: 200px;"><h2>Update {{this.listP[this.index].store.length}}</h2></th>
                                  </tr>
                                
                                  </a-space>
                                
                                
                                  <div v-for="(shop,index) in listP[this.index].store" :key="index">
                                    <a-space :size="90">
                                      <tr>
                                        <td style="width: 200px; text-align: center;" >  
                                          <h3 v-if="shop.shop==hideModal4(shop.shop)">{{ shop.shop }}</h3>
                                          <a-input style="width: 120px" :v-model="shop.shop" :allowClear="true"  v-if="shop.shop==this.enable_disble" placeholder="Input Shop"   @input="handleInput_newShop"/>
                                        </td>
                                        <td style="width: 100px;">
                                          <h3 v-if="shop.price==hideModal4_1(shop.price)" >{{ shop.price }}</h3> 
                                          <a-input style="width: 120px" :v-model="shop.price" :allowClear="true" v-if="shop.price==this.enable_disble1 "  placeholder="Input Price"   @input="handleInput_newPrice"/>
                                        </td >
                                        <td style="width: 200px;">
                                          <div style="display: inline-block; justify-content: space-around;" > 
                                            <a-button type="primary" @click="showModal4(shop.shop,shop.price,index)">
                                              <edit-filled style="font-size: 20px;"/>
                                            </a-button>
                                            <a-button type="primary" danger style="margin-left: 3px;" @click="delete_shop(index)">
                                              <delete-filled style="font-size: 20px;"/>
                                            </a-button >
                                            
                                            <a-button type="primary" ghost  style="margin-left: 3px;" v-if="index==listP[this.index].store.length-1 " @click="add">
                                              <plus-circle-filled style="font-size: 20px;"/>
                                            </a-button>
                                            <div>
                                              <a-button type="primary" ghost  style="margin-left: 3px;" v-if="listP[this.index].store.length==0" @click="add">
                                                    add 
                                              </a-button>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    
                                  


                                   
                                    </a-space>
                                    
                                  </div>
                                  <div  v-if="show=='display'" style="margin-top: 30px;">
                                    <a-space :size="30">
                                      <div style="display: flex; "> 
                                        <a-space :size="10"> 
                                          <img src="../../image/shop-svgrepo-com.svg" style="width: 30px; height: 30px;"/>
                                          <a-input style="width: 150px" :v-model="new_shop" :key="index" :allowClear="true" placeholder="Input Shop"   @input="handleInput_newShop"/>
                                        </a-space>
                                      </div>
                                      <div style="display: flex; "> 
                                        <a-space :size="10"> 
                                      
                                          <img src="../../image/dollar-sign-svgrepo-com.svg" style="width: 30px; height: 30px;"/>
                                          <a-input style="width: 150px" :v-model="new_price"  :key="index" :allowClear="true" placeholder="Input Price"   @input="handleInput_newPrice"/>
                                        </a-space>
                                      </div>
                                      <a-button @click="add_newStore(index)">
                                        ADD
                                      </a-button>
                                    </a-space>
                                  </div>
                            </div>
                            
                              </a-space>
                            </div>  
                            <div style="margin-left: 50px;">
                              <img :src="url()" style="width: 100%; height: 180px;"/>
                            </div>
                        </div>
                       
                      </a-space>

                    </a-modal>
                    
                   </a-space>
                </template>
                <template v-else-if="column.key === 'subcategoryID'">
                  {{ this.getnameCategory(record.subcategoryID) }}
                </template>
                <template  v-else-if="column.key === 'image'" >
                  <div style="width: 100%; display: flex; justify-content: center">
                    <a-button type="dashed" block style="width: 130px; height: 40px;" @click="showModal2(record.productID)">Image Product</a-button>
                    <a-modal v-model:visible="visible2" width="700px" title="Image Product" @ok="hideModal2">
                     <div style="width: 100%; display: grid; justify-content: center;text-align: center;">
                      <h2>{{ listP[this.index].name }} </h2>
                      <a-image
                        :width="300"
                        :src="url()"
                      />
                     </div>
                    </a-modal>
                  </div>
                </template>
                <template  v-else-if="column.key === 'store'" >
                  <div style="width: 100%; display: flex; justify-content: center">
                    <a-button type="dashed" block style="width: 130px; height: 40px; " @click="showModal3(record.productID)">Store</a-button>
                    <a-modal  v-model:visible="visible3" width="700px" title="Image Product" @ok="hideModal3">
                      <div  style="width: 100%; display: grid; justify-content: center;text-align: center;">
                        <h2>{{ listP[this.index].name }}</h2>
                        <div v-for="(pro,index) in listP[this.index].store" :key="index">
                          <h2>{{ pro.shop }} - {{ pro.price }} $</h2>
                        </div>
                      </div>
                    
                    </a-modal>
                  </div>
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
  PlusOutlined,
  EditFilled,
  DeleteFilled,
  PlusCircleFilled,
  
} from '@ant-design/icons-vue';
import  { defineComponent, ref, withKeys    } from 'vue'; 
import { Ref, UnwrapRef ,createVNode } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { message, Modal,SelectProps  } from 'ant-design-vue';
import type { TableProps ,UploadChangeParam } from 'ant-design-vue';
import axios from 'axios';
import { defaultPrefixCls } from 'ant-design-vue/lib/config-provider';

const visible = ref<boolean>(false);
const visible1 = ref<boolean>(false);
const visible2 = ref<boolean>(false);
const visible3 = ref<boolean>(false);
let show = 'not';
const file = '';

let Urlimage = '';





const columns= [

    {
        title : 'ID',
        dataIndex : 'productID', 
        sorter : true,
        width : '10%',
        key:'productID',
    },
    {
        title : 'Product',
        dataIndex: 'name',
        sorter : true,
        width : '15%',
        key:'name',


    },
    {
        title : 'Subcategory_ID',
        dataIndex: 'subcategoryID',
        sorter : true,
        width : '15%',
        key:'subcategoryID',


    },
    {
        title : 'Image',
        dataIndex: 'image',
        sorter : true,
        width : '20%',
        key:'image',


    },
    {
        title : 'Store',
        width : '20%',
        key : 'store'
    },
    {
        title : 'Editor',
        width : '20%',
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
    PlusOutlined,
    EditFilled,
    DeleteFilled,
    PlusCircleFilled
    
  },


  setup(){
    const listSubC = ref([])
    return{
      listSubC
    }
  },

  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
      columns,
      index:ref(),
      enable_disble:"disble",
      enable_disble1:-1,
      listP : ref([]),
      itemRefs : ref([]),
      visible,
      confirm,
      visible1,
      visible2,
      visible3,
      openupdateStore:"enable",
      show,
      var:'',
      value: ref<string | undefined>(undefined),
      options,
      file,
      Urlimage,
      headers: {
        authorization: 'authorization-text',
      },
      
      

      // data from dataform of update category 
      new_categoryID : ref(),
      productID_update : ref(),
      new_name : ref(''),
      image : ref,
      default_categoryID : ref(''),
      default_name: ref(''),
      shop1 : ref(''),
      shop2 : ref(''),
      price1 : ref(),
      price2 : ref(),
      new_shop : ref(''),
      new_price : ref(),
     
    };
  },
  methods:{
      async listProduct(){
            let res = await fetch("http://localhost:8080/api/read_product")
            this.listP = await res.json();
            this.listP = this.listP.data
            console.log(this.listP.data)
            return this.listP
            
        },
      // async listCategory(){
      //       let res =await fetch("http://localhost:8080/api/read_category");
      //       this.listC = await res.json();
            
      //       this.listC = this.listC.map(item => {
      //         return {
      //           value: item.categoryID,
      //           label: item.name
      //         }
      //       })
      //       this.option = this.listC;
      //       console.log(this.option)
      //       return this.listC
      //   },
      async listSubCategory(){
              let res = await fetch("http://localhost:8080/api/read_subcategory")
              this.listSubC = await res.json();
              
              this.listSubC = this.listSubC.map(item => {
                return {
                  value: item.subcategoryID,
                  label: item.name
                }
              })
              this.option = this.listSubC;
              console.log(this.listSubC);
              return this.listSubC
      },

      async createProduct(){
        
        let formdata = new FormData;

        formdata.append('file',this.file);
        formdata.append('subcategoryID',this.new_categoryID);
        formdata.append('name',this.new_name);
        formdata.append('image',this.file.name);
        formdata.append('store[0][shop]',this.shop1)
        formdata.append('store[0][price]',this.price1)
        formdata.append('store[1][shop]',this.shop2)
        formdata.append('store[1][price]',this.price2)
        console.log(formdata)

        axios.post("http://localhost:8080/api/create_product",
            formdata,
           {
            headers:{
              "Content-Type": "multipart/form-data"  
            }
           }
        
        ).then(response => response.data)
              .then(data => {
              // Process the response data
              console.log(data);
              this.listP = this.listProduct()
              return data
              
            }).then(data => {
                return message.success(data.message);
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
             
              
            })
        visible1.value = false;
      
      },
    
        async deleteProduct(index){
        
           fetch("http://localhost:8080/api/delete_product/"+index,{
            method:"POST",
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              console.log(data);
              this.listP = this.listProduct()
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

        async UpdateProduct(index){
          console.log(this.listP[this.index].productID)
          let formdata = new FormData; 
          formdata.append('subcategoryID',this.new_categoryID);
          formdata.append('image',this.file.name);
          formdata.append('file',this.file);
          formdata.append('name',this.new_name);
          formdata.append('productID',this.listP[this.index].productID)
          console.log(formdata);
          visible.value = false;
         
          console.log(this.new_categoryID,this.new_name)
              axios.post("http://localhost:8080/api/update_product",
                formdata,
              {
                headers:{
                  "Content-Type": "multipart/form-data"  
                }
              }
            
            ).then(response => response.data)
              .then(data => {
              // Process the response data
              console.log(data);
              this.listP = this.listProduct()
             
            
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

        async delete_shop(index){
          
          console.log(this.listP[this.index].productID,this.listP[this.index].store[index-1].shop);
            fetch("http://localhost:8080/api/pull_store",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"    // declares format of data
            },
            body: JSON.stringify(               // turns data into JSON string
              {
                "productID": this.listP[this.index].productID,              // keys and values we want to add
                "shop": this.listP[this.index].store[index].shop
                
              }
            ) 
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              this.listP = this.listProduct()
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

        async add_newStore(index){
            console.log(this.listP[this.index].productID,this.listP[this.index].store[index],"sdfasd");
            console.log(this.new_shop,this.new_price,"asdfasd")
            fetch("http://localhost:8080/api/push_store",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"    // declares format of data
            },
            body: JSON.stringify(               // turns data into JSON string
              {
                "productID": this.listP[this.index].productID,              // keys and values we want to add
                "shop": this.new_shop,
                "price": this.new_price
                
              }
            ) 
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              this.listP = this.listProduct()
              this.show = 'not'
               
            }).then(data => {
              if(data.message){
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

        updateStore(index){
          console.log(this.listP[this.index].store[index].shop,this.new_shop,this.new_price,"chech")
          fetch("http://localhost:8080/api/update_store",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"    // declares format of data
            },
            body: JSON.stringify(               // turns data into JSON string
              {
                "productID": this.listP[this.index].productID,              // keys and values we want to add
                "shop":this.listP[this.index].store[index].shop,
                "new_shop": this.new_shop,
                "price": this.new_price
                
              }
            ) 
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              this.listP = this.listProduct()
              this.new_shop = ""
              this.new_price =0
            }).then(data => {
              if(data.message){
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
          for(i=0;i<this.listP.length;i++){
            if(this.listP[i].productID==index){
              this.index = i;

            }
          }
        },

        getnameCategory(subcategoryID){
          let i=0;
          for(i=0;i<this.listSubC.length;i++){
            if(this.listSubC[i].value==subcategoryID){
              let result = this.listSubC[i].label
               return result;
            }
          }
        },
       
        getRowKey(record, index) {
          console.log(record.id)
          return record.id; // Return the index as the row key
        },

        handleInput_categoryID(event) {
          console.log(event.target.value);
          this.new_categoryID = event.target.value
        },
        
        handleInput_nameProduct(event){
          console.log(event.target.value);
          this.new_name = event.target.value
          
        },

        handleInput_shop1(event){
          console.log(event.target.value);
          this.shop1 = event.target.value
          
        },

        handleInput_shop2(event){
          console.log(event.target.value);
          this.shop2 = event.target.value
          
        },

        handleInput_price1(event){
          console.log(event.target.value);
          this.price1 = event.target.value
          
        },

        handleInput_price2(event){
          console.log(event.target.value);
          this.price2 = event.target.value
          
        },
        handleInput_newShop(event,perameter){
          console.log(event.target.value);
          this.new_shop = event.target.value
          
        },
        handleInput_newPrice(event){
          console.log(event.target.value);
          this.new_price = event.target.value
          
        },

        url(){
         
          this.Urlimage = "http://localhost:8080/static/" + this.listP[this.index].image
          return this.Urlimage
          
        },




        // async show(){
            
        //     console.log(this.new_categoryID,this.new_name)
        // },
        
         showModal(productID){
            this.getIndex(productID)
            console.log(productID)
            visible.value = true;
            let i=0;
            for( i=0;i<this.listSubC.length;i++){
              console.log( this.listSubC[i])
              if(this.listP[this.index].subcategoryID === this.listSubC[i].value){
                this.default_categoryID = this.listSubC[i].label
              }
            }
            this.default_name = this.listP[this.index].name
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

          showModal2(productID){
            this.getIndex(productID)
            console.log(this.index)
            visible2.value = true;
          },

          hideModal2 (event){
            this.show = 'not';
            visible2.value = false;
            console.log(this.new_categoryID,this.new_name)
          },

          showModal3(productID){
            
           this.getIndex(productID)
            visible3.value = true;
          },
          hideModal3 (event){
            visible3.value = false;
            console.log(this.new_categoryID,this.new_name)
          },

          showModal4(perameter,perameter1,index){
            if(this.openupdateStore=="enable"){
              this.enable_disble=perameter
              this.enable_disble1=perameter1
              this.openupdateStore="disble"
              console.log(this.openupdateStore)
            }else if(this.openupdateStore=="disble"){
              if(this.new_shop!="" || this.new_price !=0){
                 this.updateStore(index)
              }
              this.enable_disble=""
              this.enable_disble1=0
              this.openupdateStore="enable"
              console.log(this.openupdateStore)
            }
           
          },

          hideModal4(perameter){
              if(perameter==this.enable_disble){
                this.var="enble"
                return "enble"
                
              }else{
                this.var=perameter
                return perameter;
              }

          },

          hideModal4_1(perameter1){
            if(perameter1==this.enable_disble1){
                this.var="enble"
                return "enble"
                
              }else{
                this.var=perameter1
                return perameter1;
              }
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
          handleFileUpload(){
            this.file = this.$refs.file.files[0];
            console.log(this.file)
          },



          
          add(){
            if(this.show == 'not'){
              this.show = 'display'
            }else{
              this.show = 'not'
            }
            console.log(show)
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
    // this.listCategory()
    this.listSubCategory()
    this.listProduct()
    
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
    background-color:rgb(215, 215, 215);
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
