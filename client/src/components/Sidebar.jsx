import React , {useContext, useEffect} from 'react'
import '../styles/sidebar2.css'
import { FaSistrix } from "react-icons/fa";
import { GrVirtualMachine  } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { TfiLayoutMediaRightAlt } from "react-icons/tfi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbChartGridDots } from "react-icons/tb";
import { IoIosArrowForward , IoIosNotificationsOutline } from "react-icons/io";
import { IoLogOutOutline , IoLogInOutline  } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";

import ProfilePic from "../assets/profilePic.jpeg";
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const {user , logoutUser } = useContext(AuthContext);

    useEffect(() => {
        const expand_btn = document.querySelector(".expand-btn");
        function toggleCollapse() {
            document.body.classList.toggle("collapsed");
        }

        if (expand_btn) {
            expand_btn.addEventListener("click", toggleCollapse);
        }

        return () => {
            if (expand_btn) {
                expand_btn.removeEventListener("click", toggleCollapse);
            }
        };
    }, []);

  return (
    <nav className='sidebar-container'>

        {/* Top Most elements */}
        <div className='sidebar-top-wrapper'>
            <div className="sidebar-top">
                <a className="logo_wrapper">
                    <GrVirtualMachine />
                    <span className="hide">
                        Inter<span>link</span>
                    </span>
                </a>
            </div>
            <div className="expand-btn">
                {/* Expand Button */}
                <IoIosArrowForward />
            </div>
        </div>

        {/* Searchbar */}
        <div className="search-wrapper">
            <FaSistrix />
            <input type="search" placeholder='Search for anything...' />
        </div>

        {/* Main Navbar links */}
        <div className="sidebar-links">
            <h2>Main</h2>
            <ul>
                <li>
                    <a href="dashboard" className='tooltip'>
                        <RxDashboard />
                        <span className='link hide'>Dashboard</span>
                        <span className='tooltip_content'>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="Communities" className='tooltip'>
                        <TbChartGridDots />
                        <span className='link hide'>Communities</span>
                        <span className='tooltip_content'>Communities</span>
                    </a>
                </li>
                <li>
                    <Link to={"/chat"} className='tooltip'>
                        <CiChat1/>
                        <span className='link hide'>Chat</span>
                        <span className='tooltip_content'>Chat</span>
                    </Link>
                </li>
                <li>
                    <a href="Friends" className='tooltip'>
                        <HiOutlineUserGroup />
                        <span className='link hide'>Friends</span>
                        <span className='tooltip_content'>Friends</span>
                    </a>
                </li>
                <li>
                    <a href="Store" className='tooltip'>
                        <MdOutlineLocalGroceryStore />
                        <span className='link hide'>Store</span>
                        <span className='tooltip_content'> Store</span>
                    </a>
                </li>
            </ul>
        </div>

        {/* Bottom Links */}
        <div className="sidebar-links bottom-links">
            <h2>Settings</h2>
            <ul>
                <li>
                    <a className='tooltip'>
                        <CiLight />
                        <span className='link hide' onClick={document.querySelector('body').classList.toggle('darkMode')}>Dark mode</span>
                        <span className='tooltip_content' >Dark mode</span>
                    </a>
                </li>
                <li>
                    <a className='tooltip'>
                        <IoIosNotificationsOutline />
                        <span className='link hide'>Notifications</span>
                        <span className='tooltip_content'>Notifications</span>
                    </a>
                </li>
            </ul>
            <div className="divider"></div>

            {/* Hides the login and registeration button when user is logged in and shows logout button instead */}
            {user && (<div className="user_profile">
                <div className="user_avatar">
                    <img className='avatar' src={ProfilePic} alt="" />
                    <div className="online_status"></div>
                </div>
                <section className='user_info hide'>
                        <div className="user_name">
                            {user.name}
                        </div>
                        <div className="email">{user.email}</div>
                </section>
                <a className='logout' onClick={logoutUser}>
                    <Link to={"/login"}>
                        <IoLogOutOutline />    
                    </Link>
                    
                </a>
            </div>)}

            {!user && (
                <div className="user_profile">
                    <section className='user_info hide'>
                        <div className="user_name">
                            <Link to={"/login"}>Login / Sign Up</Link>
                        </div>
                    </section>
                    <a className="login">
                        <IoLogInOutline /> 
                    </a>
                </div>
            )}
        </div>
    </nav>
  )
}
export default Sidebar;