import {Link, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import registerNewUser from "../../services/registerUser"; 
import { useUserContext } from "../../context/userContext";

const Register = () => {

    const userContext = useUserContext();

    const [userData, setUserData] = useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
    })

    const [alert, setAlert] = useState(null);

    const navigate = useNavigate();

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
  
          const response = await registerNewUser(userData);
          
          if(response.data.status === true){
            setAlert('Registration successful!');
            const userData = response.data.data;
            userContext.signInUser(userData)
            navigate('/');
          }

        } catch (error) {
          if (error.response) {
            if (error.response.status === 400){
              setAlert(Object.values(error.response.data.errors)[0]);
            } else {
              setAlert('Server responded with non-2xx status:', error.response.data);
            }
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
        <h2>Registration</h2>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">Your name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} id="exampleInputName1"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password" onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
            
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Repeat Password</label>
            <input type="password" name="password_confirmation" onChange={handleChange} className="form-control" id="exampleInputPassword2"/>
        </div>
        {alert && <div className="alert alert-danger my-2" role="alert">{alert}</div>}
        <button type="submit" className="mb-3 btn btn-primary">Submit</button>
        <div className="mb-3">
            <p>Already registered user? <Link to="/login">Login</Link>.</p>
        </div>
        </form>
        </>
    );
}
 
export default Register;