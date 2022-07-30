import React, { useContext } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, } from 'firebase/auth';
import { useState } from 'react';
import { FirebaseContext } from '../firebase/Context';

function Signin() {
    const {auth}=useContext(FirebaseContext)
    const [regEmail, setRegEmail] = useState("")
    const [regPassword, setRegPassword] = useState("")
    const [logEmail, setLogEmail] = useState("")
    const [logPassword, setLogPassword] = useState("")
    const [loguser, setLoguser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {            //====================================== //user state
        if (currentUser) {
          console.log("logged in")
          setLoguser(currentUser)
          console.log(loguser)
        } else {
          console.log("not logged")
        }
      })
    
    
      const register = () => {                                    //================================//create user with email
    
        console.log(regEmail, regPassword)
        createUserWithEmailAndPassword(auth, regEmail, regPassword)
          .then((userCredintial) => {
            //login
            const user = userCredintial.user
            console.log(user.email)
          }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
          })
      }
    
      const login = () => {                                          //=============================================//sign in
        signInWithEmailAndPassword(auth, logEmail, logPassword)         
          .then((userCredintial) => {
            const lguser = userCredintial.user
            console.log(lguser.email)
          })
      }
    
    
      const logout = () => {             //===============================================//log out
        signOut(auth).then(() => {
          console.log("sign out")
        }).catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage)
        })
    
      }

  return (
    <div>
      <div>
        <h1>
          create accout
        </h1>
        <input type="email"
          placeholder='email'
          onChange={(e) => setRegEmail(e.target.value)}
        />

        <input type="password"
          placeholder='password'
          onChange={(e) => setRegPassword(e.target.value)}
        />

        <button onClick={register}> register</button>
      </div>
      <div>
        <h1>
          login
        </h1>
        <input type="email"
          placeholder='email'
          onChange={(e) => setLogEmail(e.target.value)}
        />

        <input type="password"
          placeholder='password'
          onChange={(e) => setLogPassword(e.target.value)}
        />

        <button onClick={login}>singnin</button>


      </div>
      <h4> user logged in :{loguser.email}</h4>
      <button onClick={logout}> logout</button>

    </div>
  )
}

export default Signin
