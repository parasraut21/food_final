import React from 'react'

import  {useState} from 'react'
import {useNavigate} from 'react-router-dom';
export default function Reset() {
    const [credentials, setCredentials] = useState({email: "", cpassword: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/reset-password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email})
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
          navigate('/verify');
       }
      else{
         alert("please login with correct crendential");
     }
       
        }
    

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

 
  return (
    <>
        <div className='container mt-3'>
        <h2 >Log in</h2>
    <form  onSubmit={handleSubmit} className="my-5">
                <div className="mb-3" >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
         </div> 
    </>
  )
}
