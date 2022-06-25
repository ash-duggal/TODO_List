import React, { useState, useEffect } from 'react';
import ToDoLists from './ToDoLists';

const App = () =>{
  // inputItem is use to store input
  const [inputItem, setInputItem] = useState("");
  // items is use to store items(todo list)
  const [items, setItems] = useState([]);

  // on load it check if localsorage is having data then store it in item
  useEffect(()=>{
    let storageItems = localStorage.getItem("todos");
    if(storageItems){
      setItems(JSON.parse(storageItems));
    }     
  },[])

  // on change in items it directly add it in localsorage
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(items));
  }, [items])
  

  const itemEvents =(event) =>{
    setInputItem(event.target.value);
  };
  // item is an array of oject containing-
  // 1. id
  // 2. value
  // 3. isDeleted
  // 4. timestamp
  const listOfItems =() =>{
    setItems((oldItems)=>{
      let newItem = {
        id:Math.floor(Math.random() * 90000 + 100000),
        value:inputItem,
        isDeleted:false,
        timestamp:Date.now()
      }
      return [...oldItems, newItem];
    });
    setInputItem("");
  }; 
  
  //on deleting item we change isDeleted to true and update the timestamp
  // timestamp helps in moving the latest deleted in top
  const deltItem = (id) => {
    setItems((oldItems) => {
      return oldItems.map((arrElem, index) =>(
      arrElem.id !== id?arrElem:{...arrElem,isDeleted:true,timestamp:Date.now()}
      ));
    });
  };

  const resetItem = () => {
    setItems([]);
  }
  return (<>
    <div className = "main_div">
      <div className='reset_div'>
      <button className='reset_button' onClick={resetItem}>Reset</button>
      </div>
      <div className = "center_div">
        <br  />
        <h1>ToDo List</h1>
        <br />
        <div className='input_div'>
        <input type = "text" placeholder='Add a Items'
          value={inputItem}
        onChange={itemEvents} />
        <button className='add_input' onClick={listOfItems}> + </button>
      {console.log(items)}
        </div>
        <ol>
          {
              //firstly we filter the items that are not deleted and the sort it in descending order and then add them in list
              items.filter((item) => (!item.isDeleted)).sort((a,b) => b.timestamp-a.timestamp).map((item, index) => {
                return <ToDoLists 
                todoItem ={item}
              onDelete = {deltItem}/>
          })}
          {
              //we filter items that are deleted and then sort them in descending order and then add them in list
              items.filter((item) => (item.isDeleted)).sort((a,b) => b.timestamp-a.timestamp).map((item, index) => {
                console.log("item",item)
              return <ToDoLists 
              todoItem ={item}
              onDelete = {deltItem}/>
          })}
        </ol>
      </div>
    </div>
  </>)
}

export default App;