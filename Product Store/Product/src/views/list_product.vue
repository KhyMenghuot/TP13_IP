<template>
     <div class="gutter-example">
    <a-row :gutter="16"  >
      <a-col class="gutter-row" :span="4" v-for="(data,index) in dataObject.data" :key="index" >
        <div class="gutter-box">
            <div class="image" style="width: 100%">
              
                <img :src="url(dataObject,index)" style="width: 100%; height: 180px;"/>
              
            </div>
            <div class="list_shop">
              <h2>{{ data.name}} </h2>
              <div  >
                  <p v-for="(store,index) in data.store" :key="index" style="line-height: 10px;">{{ store.shop}}   -  {{store.price}} $</p> 
              </div>
            </div> 
        </div>
      </a-col>
      
    </a-row>
  </div>
</template>

<style scoped>

.gutter-example :deep(.ant-row > div) {
  background: transparent;
  border: 0;
}

.gutter-box {
  position: relative;
  display: grid;
  background: #5a6c75;
  border-radius: 10px;
  border: 4px solid rgb(82, 78, 78);
  height: 100%;
  width: 100%;
  margin: 10px
  
}

.gutter-box :hover{

}

.list_shop{
  position: relative; 
  background-color: rgb(255, 255, 255) ;
  height: 40%;


}
h2{
  text-align: center;
}

p{
  margin-left: 20px;
}
.image{
  position: relative;
    height: 100%;
    border-radius: 5px 5px 0px 0px ;
   
    display: flex;
    
}
</style>


<script>

export default {
  props: {
    dataObject: {
      type: Array,
      required: true,
    },
  },
  data(){
    return{
       data1 : this.dataObject[1],
       Urlimage : ''
    }
  },
  methods:{
    showinC(){
      console.log(this.dataObject)
    },
    url(dataObject,index){
        let image = dataObject
          
          this.Urlimage = "http://localhost:8080/static/" + image.data[index].image
          return this.Urlimage
        console.log(this.Urlimage)
         
    },
    
  },
  mounted(){
    this.showinC()
  
  }
};
</script>