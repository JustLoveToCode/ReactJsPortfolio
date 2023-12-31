import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute =({children})=>{
    // This is getting the store.user using the useSelector Hook:
    const {user}= useSelector((store)=>store.user)
    // If the user do not exist, Navigate to the landing Page:
    if(!user){
        return <Navigate to="/landing"/>
    }
    return children;
}

export default ProtectedRoute;