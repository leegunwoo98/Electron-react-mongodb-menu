import Columns from './Columns';
import React, { Component } from 'react';
import { runInThisContext } from 'vm';
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectID;
import mongoose from 'mongoose';
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://gunwoo9758:55045290Lc%3F@cluster0.dbdyt.mongodb.net/menu_board?retryWrites=true&w=majority";
const dbName = "menu_board";
const client = new MongoClient(url);
const { ipcRenderer } = require('electron')
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
                      
async function run() {
   var data=[];
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("category");
         const items=db.collection("menu_board");
         // Insert a single document, wait for promise so we can read it back
         // Find one document
         var myDoc= await col.find().toArray();
         myDoc.forEach(async mycol  =>{
            var item= await items.find({"col":mycol._id}).toArray();
            Object.assign(mycol,{"properties":item});
         })
         data=myDoc;
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
    return data;
}


class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      menus:[]
    }
  }
  componentDidMount(){
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
    

    let currentComponent=this;
    run().then(res => {
          currentComponent.setState({
            menus:res
          });
        }
      )
    
  }
  


  render(){
    return (
      <div className='page'>
          {this.state.menus.map((data) => {
            if(data.type=="text_image"){
              return <Columns data={data}
              key={data._id}
              />
            }
            else{
              return <Image data={data}
              key={data._id}/>
            }
          }
          )}
      </div>
    );
  }
}

export default App;
       