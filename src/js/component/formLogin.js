import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";


export const FormLogin = () => {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
   const {store, actions}= useContext(Context)
   let navigate = useNavigate()

   async function handleSubmit(e) {
        e.preventDefault()
        // console.log(email,password);
        //    boolean   <=
        let isLogged = await actions.login(email,password)
        console.log(isLogged);
        if(isLogged){//true
            navigate("/")
        }
    }

    
    return(
        <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
)};