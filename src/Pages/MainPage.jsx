import React from 'react'
import { useState } from 'react'
import AddTodos from '../components/AddTask'
import AllTodo from '../components/AllTodo'
import { useSelector } from 'react-redux'
const MainPage = () => {

    const [editingTodo, setEditingTodo] = useState(null);
    const [isnew,setIsNew]=useState(false);
    const{token}=useSelector(state=>state.auth);
  return (
    <div>
       <AddTodos editingTodo={editingTodo} setEditingTodo={setEditingTodo} setIsNew={setIsNew}/>
       {/* <ListTodo setEditingTodo={setEditingTodo} />
        */}

        {token && 
        <AllTodo setEditingTodo={setEditingTodo} isnew={isnew} setIsNew={setIsNew} />
            }
                </div>
  )
}

export default MainPage
