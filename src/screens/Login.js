import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
function Login() {
    const signup=()=>{
        localStorage.removeItem('token');
        navigate('/signup');
    }
    const [credentials, setCredentials] = useState({email: "", cpassword: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, cpassword: credentials.cpassword})
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
        localStorage.setItem('userEmail', credentials.email); 
        localStorage.setItem('token', json.token); 
          navigate('/');
          alert("Successfully loged in");
       }
       else{
           navigate('/login')
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
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div ><button onClick={signup} type="submit" className="btn btn-primary">Sign Up</button></div>
         </div> 
    </>
  )
}


export default Login
