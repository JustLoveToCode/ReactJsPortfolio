import {NavLink} from 'react-router-dom';
import links from "../utils/links";

const NavLinks=({toggleSidebar})=>{
    return(
        <div className="nav-links">
        {links.map((link) => {
          //Using the Object Destructuring Properties:
          // to extract the Various Properties from the link:
          const { id, text, path, icon } = link;
          return (
          // NavLink Component Here:
            <NavLink
              to={path}
              className={({isActive})=>{
              return isActive?'nav-link active':'nav-link'
              }}
              key={id}
              onClick={toggleSidebar}
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
    
    )
}

export default NavLinks