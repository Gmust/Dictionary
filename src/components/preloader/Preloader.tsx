import React, {FC} from 'react';
import './Preloader.scss'
import {useAppSelector} from "../../hooks/redux";

const Preloader:FC = () => {


    return (
        <>
            <div className={'preloaderWrapper'}>
                <img src={'gachi-gachimuchi.gif'}/>
            </div>

        </>
    );
};

export default Preloader;    