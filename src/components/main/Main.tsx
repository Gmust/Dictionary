import React, {FC, useState} from 'react';
import './Main.scss'
import Preloader from "../preloader/Preloader";
import {useAppSelector} from "../../hooks/redux";
import {useAuth} from "../../hooks/firebase";
import ModalAdd from "../../assets/modal/ModalAdd";
import ModalError from "../../assets/errors/modalError/ModalError";
import AddDesignation from "./interaction/addDesignation/AddDesignation";
import DisplayDesignations from "./interaction/displayDesignations/DisplayDesignations";


const Main: FC = () => {

    const isLoading = useAppSelector(state => state.user.isLoading)
    const {isAuth} = useAuth();
    const [active, setActive] = useState<boolean>(false)
    const [errorModal, setErrorModal] = useState<boolean>(false)

    const checkPermission = () =>{
            setActive(true);
    }


    return (
        <>
            {
                isLoading ?
                    <Preloader/>
                    :
                    <div className={'mainWrapper'}>
                        <div className={'addDesignation'}>
                            <button onClick={checkPermission}>Add designation</button>
                        </div>
                        <DisplayDesignations/>
                    </div>
            }
            {
                isAuth?
                    <ModalAdd children={<AddDesignation/>} active={active} setActive={setActive}/>
                    : <ModalAdd children={<ModalError/>} active={active} setActive={setActive}/>

            }

        </>

    );
};

export default Main;