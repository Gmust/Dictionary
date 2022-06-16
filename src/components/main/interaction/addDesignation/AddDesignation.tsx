import React, {FC} from 'react';
import './AddDesignation.scss';
import {db} from "../../../../firebase";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import {SubmitHandler, useForm} from "react-hook-form";
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useAppDispatch} from "../../../../hooks/redux";

type designationInputs = {
    author: string,
    text: string,
}

const AddDesignation: FC = () => {

    const dispatch = useAppDispatch();

    const formSchema = Yup.object().shape({
        author: Yup.string().required('This field is required').min(2, 'Nme must be two or more symbols '),
        text: Yup.string().required('This field is required').min(10, 'The designation must be at least 10 symbols')
    })

    const formOption = {resolver: yupResolver(formSchema)};
    const {register, resetField, handleSubmit, formState: {errors}} = useForm<designationInputs>(formOption);
    const onSubmit: SubmitHandler<designationInputs> = async ({author,text},event) => {
        event?.preventDefault();
        if(author || text !== ''){
         await  addDoc(collection(db,'dictionary'),{
             author,
             text,
             timestamp: serverTimestamp()
         });
        }
        resetField('author');
        resetField('text');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'addDesignationWrapper'}>

            <div className={'authorName'}>
                <label>Name:</label>
                <input type={'text'} {...register('author')}/>
                <div className={'error'}>{errors?.author?.message}</div>
            </div>

            <div className={'mainText'}>
                <label>Text:</label>
                <textarea {...register('text')} />
                <div className={'error'}>{errors?.text?.message}</div>
            </div>

            <input type={'submit'} className={'submitDesignation'} />
        </form>
    );
};

export default AddDesignation;