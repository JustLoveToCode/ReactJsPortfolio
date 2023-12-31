import {useState} from 'react';
import {FormRow} from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {updateUser} from '../../features/user/userSlice';

const Profile=()=>{
    const {isLoading, user} = useSelector((store)=>store.user);
    // Invoking the useDispatch() Method:
    const dispatch = useDispatch();
    // Setting the userData as the Empty Object:
    const [userData, setUserData] = useState({
        name:user?.name||'',
        email:user?.email||'',
        lastName:user?.lastName||'',
        location:user?.location||'',
    });

    const handleSubmit=(e)=>{
        // Prevent the Default Submission of the Form:
        e.preventDefault();
        // Object Destructuring for the userData:
        const {name, email,lastName, location} = userData;
        // If the Above Properties do not exist:
        if(!name||!email||!lastName||!location){
        toast.error('Please Provide the Details');
        return;
    }
// Using the updateUser Function:
    dispatch(updateUser(userData));
}

    const handleChange=(e)=>{
        // This is the HTML element:
        const name = e.target.name
        // This is the value inside the HTML element:
        const value = e.target.value
        // Making the Dynamic Change in the Key and Value:
        setUserData({...userData, [name]:value})

    }
    return(
    <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
         
            <h3>Profile</h3>
            {/* Whenever there is a Change in the User Data,
            it will invoke the handleChange Function which 
            will then invoke the useState which is the [name]:value*/}
            <div className="form-center">
                <FormRow type="text" name="name" value={userData.name}
                handleChange={handleChange}/>
                <FormRow type="text" name="email" value={userData.email}
                handleChange={handleChange}/>
                <FormRow type="text" name="lastName" labelText='Last Name' value={userData.lastName}
                handleChange={handleChange}/>
                <FormRow type="text" name="location" value={userData.location}
                handleChange={handleChange}/>
                
                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    {isLoading?'Please Wait....': 'Save Changes'}
                </button>
            </div>
        </form>
    </Wrapper>
    )
}

export default Profile