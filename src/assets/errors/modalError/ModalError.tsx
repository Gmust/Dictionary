import React, {FC} from 'react';
import './ModalError.scss'
import {Link} from "react-router-dom";

const ModalError:FC = () => {


    return (
        <div className={'modalErrorWrapper'}>
            <div className={'modalErrorStyle'}>
               <p>To add designation you must be logged in! <Link to={'/login'} >Log in</Link></p>
            </div>
            <br/>
            <br/>
            <br/>
            <div className={'passwordImg'}>
                <img src={'password.jpg'}  />
            </div>
        </div>
    );
};

export default ModalError;