import {useState, useEffect} from 'react';
import {Logo, FormRow} from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
// Importing loginUser, registerUser:
import {loginUser, registerUser} from '../features/user/userSlice';
import {useNavigate} from 'react-router-dom';


// Creating the initialState Here:
// with the Empty Object for the initialState:
const initialState={
    name: '',
    email: '',
    password: '',
    isMember: true,
};


const Register=()=>{
    // values here is Equal to the initialState:
    const [values, setValues] = useState(initialState)
    // Using the useSelector Method:
    const {user, isLoading} = useSelector(store=>store.user)
    // Using the useDispatch() Method Here:
    const dispatch = useDispatch();
    const navigate = useNavigate();




// Creating the handleChange Function:
// e.target will get you the input form:
    const handleChange=(e)=>{
// This is targeting the HTML Element:
    const name = e.target.name;
// This is targeting the value inside the HTML Element:
// That the User has entered into the Value:
    const value = e.target.value;
// This is using the Dynamic Key and Value:
// This is using the JavaScript Syntax:
// Note that the name and value can be Anything:
    setValues({...values,[name]:value})
       
    }
//Creating the onSubmit Form Function:
// e.target will get you the Entire Form:
    const onSubmit=(e)=>{
// Prevent the form from Submitting:
       e.preventDefault();
       const {name, email, password, isMember} = values
// If isMember is false, then you will check whether
// the name actually exist using !name: 
// This is using the && AND Operator:
// If the isMember is True, it will check whether
// name actually exist, if name does not exist:
// The Toastify Error will Come Out:
       if(!email || !password ||(!isMember && !name)){
// This is the toast.error that will be getting back:
        toast.error('Please Fill Out All the Fields');
// If there is the error, return the result, do not
// have to continue reading the code:
        return;
       }
       if(isMember){
// This is the dispatch Action for loginUser:
        dispatch(loginUser({email:email, password:password}))
        return;
       }
// Otherwise, this is the dispatch Action for registerUser:
       dispatch(registerUser({email,name,password}))

    }

// Creating the toggleMember Function:
    const toggleMember = ()=>{
        // Copying the Properties from the initialState
        // and then Overriding the isMember:!values.isMember:
        setValues({...values, isMember:!values.isMember});
    }
    // Using the useEffect Hook to Programmatically 
    // Navigate back to the HomePage after 2000ms:
    useEffect(()=>{
    if(user){
        setTimeout(()=>{
        navigate('/')
        },2000)
    }
    }, [user])

    return(
    // Wrapper here is the Styled Component:
    <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
        <Logo/>
        {/* If values.isMember is true */}
        <h3>{values.isMember?'Login':'Register'}</h3>

        {!values.isMember&&(
        <FormRow type='text' name="name" 
        value={values.name} handleChange={handleChange}/>
        )}
        
        {/* Creating for the email: */}
        <FormRow type="email" name="email"
        value={values.email} handleChange={handleChange}/>

        {/* Creating for the password: */}
        <FormRow type="password" name="password"
        value={values.password} handleChange={handleChange}/>
   
        <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading?'Loading...': 'Submit'}
        </button>

        <button type="button" className="btn btn-block btn-hipster"
        onClick={()=>dispatch(loginUser({email:'testUser@test.com', password:'secret'}))}
        // button is disabled when isLoading is true:
        disabled={isLoading}>
        {/*When isLoading is true, it will show loading...
        and if it is not loading, it will show Submit */}
            {isLoading?'loading...':'Demo App'}
        </button>
        <p>
        {/* If it is true, or if it is false */}
        {values.isMember?'Not a Member Yet?': 'Already a Member?'}
        <button type='button' onClick={toggleMember}

        className="member-btn">
        {/* Using the Ternary Operator: */}
        {values.isMember?'Register': 'Login'}
        </button>
        </p>

        </form>
    </Wrapper> 
    )
}

export default Register