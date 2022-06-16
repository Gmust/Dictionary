import React, {FC, useState} from 'react';
import './Designation.scss';
import {useAuth} from "../../../../../hooks/firebase";
import {doc, serverTimestamp, updateDoc} from 'firebase/firestore';
import {db} from '../../../../../firebase';
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import {setDesignationsText} from "../../../../../store/DesignationSlice";

type Props = {
    author: string,
    text: string,
    id: string,
}


const Designation: FC<Props> = ({text, author, id}) => {

    const [editing, setEditing] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {textValue} = useAppSelector(state => state.designations)
    const {isAuth} = useAuth();


    const handleEdit = async (id: string) => {
        const docRef = doc(db, 'dictionary', id);
        const payload = {author: author, text: textValue, timestamp: serverTimestamp() };
         await updateDoc(docRef, payload);
    }


    return (
        <div className={'designationWrapper'}>
            <div className={'authorStyle'}>
                {author}
            </div>
            <hr/>
            <div className={'textStyle'}>
                {editing ? <>  <textarea defaultValue={text}
                                      onChange={(ev)=>{dispatch(setDesignationsText(ev.target.value))}} />
                        <button onClick={() =>{ handleEdit(id)
                                                setEditing(false)}}>✅</button>
                    </>
                    : text}
            </div>


            <div className={'editStyle'}>
                {isAuth ? <button onClick={() => setEditing(true)}>Edit</button> : null}
            </div>
        </div>
    );
};

export default Designation;