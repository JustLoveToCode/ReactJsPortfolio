import Wrapper from "../assets/wrappers/Navbar";
import {FaAlignLeft, FaUserCircle, FaCaretDown} from 'react-icons/fa';
import Logo from './Logo';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import the toggleSidebar from the userSlice:
import {toggleSidebar,logoutUser,clearStore} from "../features/user/userSlice";



const Navbar =()=>{
    const [showLogout, setShowLogout] = useState(false)

    const {user} = useSelector((store)=>store.user);
    // Using the useDispatch() Hook:
    const dispatch = useDispatch();

    const toggle =()=>{
        dispatch(toggleSidebar())
    }
    return(
    <Wrapper>
       <div className="nav-center">
            <button type="button" className="toggle-btn" onClick={toggle}>
                <FaAlignLeft/>
            </button>

            <div>
                <Logo/>
                <h3 className="logo-text">
                Dashboard</h3>
            </div>

            <div className="btn-container">
                {/* Creating the function for the onClick Here */}
                <button type="button" className="btn" onClick={()=>setShowLogout(!showLogout)}>
                    <FaUserCircle/>
                    {/* Using the ? to check if the user Actually Exist, Optional Chaining*/}
                    {user?.name}
                    <FaCaretDown/>
                </button>
                {/* If it is true for showLogout: dropdown show-dropdown:
                This is the className if it is true.
                If it is false, it will only show dropdown 
                Creating the Ternary Operator for the CSS className*/}
                <div className={showLogout?'dropdown show-dropdown':'dropdown'}>
                    {/* This will invoke the logoutUser using the dispatch Hook: */}
                    {/* Dispatch the action of clearStore Here */}
                    <button type="button" className="dropdown-btn" onClick={()=>dispatch(clearStore('Logging Out the User...'))}>
                        Logout Here
                    </button>
                </div>
            </div>
       </div>


    </Wrapper>
        
    )
}

export default Navbar