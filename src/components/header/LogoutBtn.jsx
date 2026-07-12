import React from "react";
import { useDispatch } from "react-redux";
import authService from '../../services/authService';
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(
            () => {
                dispatch(logout());
            }
        )
    }

    return (
        <button className='inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn;