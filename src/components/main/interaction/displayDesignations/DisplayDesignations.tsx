import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import React, {FC, useEffect, useState} from 'react';
import {db} from "../../../../firebase";
import Designation from "./desigantion/Designation";
import Preloader from "../../../preloader/Preloader";
import './DisplayDesignations.scss'
// import {setDesignations} from "../../../../store/DesignationSlice";


type Des = {
    id: string,
    author: string,
    text: string,
}

const DisplayDesignations: FC = () => {


    const [designations, setDesignation] = useState([{author: <Preloader/>, id: 'initial'}])



    useEffect(()=>{

        const collectionRef = collection(db,'dictionary');
        const q = query(collectionRef, orderBy("timestamp","desc"))
        const unsub = onSnapshot(q,(snapshot)=> {
            // @ts-ignore
            setDesignation(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
        })
        return unsub;
    },[])


    const designationsList = designations?.map(item =>
        // @ts-ignore
        <div key={item.id} >
            <Designation
                // @ts-ignore
                author={item.author} id={item.id}  text={item.text}/>
        </div>
    )

    return (
        <div className={'designationsWrapper'}>
            {designations? designationsList : <Preloader/> }
        </div>
    );
};

export default DisplayDesignations;

