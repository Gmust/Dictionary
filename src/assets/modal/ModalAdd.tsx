import React, {FC, ReactElement} from 'react';
import './Modal.scss'


interface Props {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactElement
}

const ModalAdd: FC<Props> = ({active,setActive, children}) => {

    return (
        <div className={active? 'modalWrapper active' : 'modalWrapper '} onClick={()=>{setActive(false)}}>
            <div className={active?'modalStyle active' : 'modalStyle'} onClick={e=>{e.stopPropagation()}}>
                <span className={'closeButton'}><button onClick={()=>{setActive(false)}} >X</button></span>
                <>
                    {children}
                </>
            </div>
        </div>
    );
};

export default ModalAdd;