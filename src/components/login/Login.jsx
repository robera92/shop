import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import loginUser from "../../services/loginUser";

const Login = () => {

    const navigate = useNavigate();
    const userContext = useUserContext();
    const [alert, setAlert] = useState('');
    const [userData, setUserData] = useState({
        email:'',
        password:''
    })

    const handleChange = (e)=>{
        setAlert(null);
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
  
          const response = await loginUser(userData);
          
          if(response.data.status === true){
            setAlert('Login successful!');
            const userData = response.data.data;
            userContext.signInUser(userData)
            navigate('/');
          }

        } catch (error) {
          if (error.response) {
            setAlert(error.response.data.message);
          } else if (error.request) {
            setAlert('No response received from the server');
          } else {
            setAlert('Error setting up the request:', error.message);
          }
        }
      };

    return (
        <>
        <form className="mt-4" onSubmit={handleSubmit}>
        <h2>Welcome! Login to continue..</h2>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1"  onChange={handleChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={handleChange}/>
        </div>
        {alert && <div className="alert alert-danger my-2" role="alert">{alert}</div>}
        <button type="submit" className="mb-3 btn btn-primary">Submit</button>
        <div className="mb-3">
            <p>No account? <Link to="/register">Register now</Link>.</p>
        </div>
        </form>
        </>
    );
}
 
export default Login;