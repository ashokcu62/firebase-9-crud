
import { async } from '@firebase/util';
import { collection, getDocs,addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase/Firebase-config'

function App() {
  const usersCollectionRef = collection(db, 'users')
  const [users, setUsers] = useState([])
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)

  useEffect(() => {
    //  getDocs(usersCollectionRef).then((res)=>{
    //    const data=res
    //    console.log(res)
    //  })
    const getusers = async () => {                                                   //read 
      const data = await getDocs(usersCollectionRef)
      console.log(data.docs)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))          //destructuring

    }
    getusers()
  }, [])
  
  const insert =async (event) => {
    event.preventDefault();
    // await addDoc()--  usable
    addDoc(usersCollectionRef,{name:newName,age:newAge}).then(()=>{ console.log("data inserted")})    ///write
   
  }
  const update=async(id,age)=>{                          //update function
    const userDocRef=doc(db,"users",id)
     const newFiledData=({age:age + 1})
   await updateDoc(userDocRef,newFiledData).then(()=>console.log("updated"))
  } 

  const deleteUser=async(id)=>{
    const userDocRef=doc(db,"users",id)
    await deleteDoc(userDocRef)
  }

  return (
    <div className="App">
      <form  onSubmit={insert}>
        <input type="text" placeHolder="name"
         
        
          onChange={(e) => setNewName(e.target.value)} />

        <input type="number" placeHolder="age"
          value={newAge}
         
          onChange={(e) => setNewAge(e.target.value)} />
        <button type="submit">insert </button>

      </form>

      <h1> users data read</h1>
      {users.map((obj) => <div>       {/*  read map*/}
        <p>name:{obj.name}</p>
        <p> age:{obj.age}</p>
         <button onClick={()=>update(obj.id,obj.age)}> increase age</button>    {/*// onClik alwas has a function in side  */}
         <button onClick={()=>deleteUser(obj.id)}>Delete</button>
      </div>)}
    </div>
  );
}

export default App;
