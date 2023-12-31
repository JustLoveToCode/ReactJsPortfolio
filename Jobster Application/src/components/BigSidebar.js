import Wrapper from '../assets/wrappers/BigSidebar'
import Logo from './Logo';
import NavLinks from './NavLinks';
import {useSelector} from 'react-redux';

const BigSidebar=()=>{
    // Getting the Properties isSidebarOpen from the store.user:
    const {isSidebarOpen} = useSelector((store)=>store.user);

    return(
    <Wrapper>
    {/* In the Redux userSlice.js, isSidebarOpen is initially set to false */}
    {/* This is what will toggle the Open and Close SideBar for the Big Screen */}
    <div className={isSidebarOpen?'sidebar-container':'sidebar-container show-sidebar'}>
        <div className='content'>
            <header>
                <Logo/>
            </header>
                <NavLinks/>
        </div>

    </div>
       
    </Wrapper>
    
    )
}

export default BigSidebar

