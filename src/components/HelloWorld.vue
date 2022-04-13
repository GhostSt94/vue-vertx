<template>
  <div>
    <div class="container-fluid text-center bg-light">
      <div class="row">
        <div class="col-md-3">
          <div class="mb-3">
            <label for="formFile" class="form-label h6 my-3">Enter a CSV file</label>
            <input class="form-control" type="file" accept=".csv">
            <button @click="saveFile" class="btn btn-outline-primary" type="submit">Save</button>
          </div>
        </div>
      </div>
      
      <!-- <input class="input-form" type="file" accept=".csv">
      <button @click="saveFile" class="btn btn-outline-primary" type="submit">Save</button> -->
    </div>
    
    
    <br>
    <span>{{error}}</span>
    <br>
    <div id="main"></div>
  </div>
</template>

<script>
import EventBus from '@vertx/eventbus-bridge-client.js'
import axios from "axios"

export default {
  name: 'HelloWorld',
  data(){
    return{
      error:""
    }
  },
  methods:{
    saveFile(){
      const file=document.querySelector("input[type='file']").files[0]
      file==undefined ? this.error="no file found" : this.error=""
      if(this.error==""){
        var myFormData = new FormData();
        myFormData.append('file', file);

        axios.post("http://localhost:8888/file/save",myFormData)
        .then(res=>console.log(res.data))
        .catch(err=>console.error(err))
      }
    }
  },
  mounted(){
    const div=document.querySelector("#main")

    var eb = new EventBus('http://localhost:8888/eventbus');
    eb.onopen = function() {
        console.log('connected');
        eb.registerHandler('com.client', function(err,message) {
          div.innerHTML=div.innerHTML+"<br>"+JSON.stringify(message.body.message)
        });
    };
    eb.onclose = function() {
        console.log("disconnected");
        eb = null;
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
