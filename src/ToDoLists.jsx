import React from "react";

const ToDoLists = ({todoItem, onDelete}) => {
    console.log(todoItem)
    if(todoItem){
    return (<>
    <div className={todoItem.isDeleted?"todo_style todo_style_deleted":"todo_style"} key={todoItem.id}>
        <i
            className = "fa fa-times"
            aria-hidden = "true"
            onClick={() =>{
                if(!todoItem.isDeleted){
                onDelete(todoItem.id);}
            }
            
            } />
    <li>{todoItem.value}</li>;
    </div>
    </>
    );  }
};
export default ToDoLists;