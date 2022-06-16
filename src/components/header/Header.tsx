import React from 'react';
import './Header.scss'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/firebase";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {removeUsers, setIsLoading} from "../../store/UserSlice";

const Header = () => {

    const navigate = useNavigate();
    const isAuth = useAuth();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(removeUsers());
        navigate('/')
    }

    return (
        <>
            {
                isAuth.isAuth ?
                        <div className={'headerWrapper'}>
                            <h2 onClick={() => {
                                navigate('/')
                            }}><span className={'textWrapper'}>Толковый словарь gayсского языка</span></h2>

                            <div className={'buttonWrapper'}>
                                <button onClick={handleLogout}>Logout
                                </button>
                            </div>
                        </div>
                        :
                        <div className={'headerWrapper'}>
                            <h2 onClick={() => {
                                navigate('/')
                            }}><span className={'textWrapper'}>Толковый словарь gayсского языка</span></h2>

                            <div className={'buttonWrapper'}>
                                <button onClick={(e) => {
                                    navigate('/login')
                                }}>Login
                                </button>
                            </div>

                        </div>
                }
        </>
    );
};

export default Header;