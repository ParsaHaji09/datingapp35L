import React from "react";
import "./Navbar.css"
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/reduxActions';

// for another day

// function CustomLink({to,children,...props}){
//     const path = window.location.pathname
//     return (
//         <li className={path === to ? "active" : "" }>
//             <Link to={to} {...props}>
//                 {children}
//             </Link>
//         </li>
//     )
// }


function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    }

    if (window.location.pathname === "/") return null;
    if (window.location.pathname === "/register") return null;
    return(
        <nav className="nav">
            <Link to="/" className="sitename">DateWalk</Link>
            <div className="links">
                <Link to="/profile" className="profile">Profile</Link>
                <Link to = "/" className="explore">Explore</Link>
                <Link to="/ratings" className="rating">Ratings</Link>
                <button className="logout" onClick= {logoutHandler}>Log Out</button>
            </div>
        </nav>
    )
}

export default Navbar;