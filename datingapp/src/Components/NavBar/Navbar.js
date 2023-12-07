import React, { useEffect, useState } from "react";
import "./Navbar.css"
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('saveData')));

    useEffect(() => {
        const prevData = JSON.parse(localStorage.getItem('saveData'));
        setCurrentUser(prevData);
    }, []);

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    }

    if (window.location.pathname === "/") return null;
    if (window.location.pathname === "/register") return null;
    // return(
    //     <nav className="nav">
    //         <Link to="/" className="sitename">DateWalk</Link>
    //         <div className="links">
    //             <a href="/profile" className="profile">Profile</a>
    //             <a href="/" className="explore">Explore</a>
    //             <a href="/rating" className="rating">Rating</a>
    //             <button className="logout" onClick= {logoutHandler}>Log Out</button>
    //         </div>
    //     </nav>
    // )

    return (
        <nav className="nav">
            <a href="/" className="sitename">
                <span>DateWalk</span>
                <img src="/dateWalkLogo.png" alt="logo" className="logo-image"  />
            </a>
            <div className="links">
                {console.log(currentUser.pic)}
                {currentUser && <img src = {currentUser.pic[0]} alt = "Profile" className = "avatar"/>}
                <a href="/profile" className="profile">Profile</a>
                <a href="/" className="explore">Explore</a>
                <a href="/rating" className="rating">Rating</a>
                <button className="logout" onClick={logoutHandler}>Log Out</button>
            </div>
        </nav>
    );
    
}

export default Navbar;