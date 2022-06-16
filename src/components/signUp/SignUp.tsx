import React, {FC, useState} from 'react';
import './SignUp.scss'
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from "yup"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setIsLoading, setupUsers} from "../../store/UserSlice";
import Preloader from "../preloader/Preloader";
import {useAuth} from "../../hooks/firebase";

type registerInputs = {
    email: string,
    password: string,
    confirmPassword: string,
}


const SignUp: FC = () => {

    const formSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Required field').min(6, 'Password must be at least 6 characters!'),
        confirmPassword: Yup.string().required('Required field').oneOf([Yup.ref('password')], 'Password does not match'),
    })

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => state.user)
    const auth = useAuth();

    const formOption = {resolver: yupResolver(formSchema)};
    const {register, handleSubmit, formState: {errors}} = useForm<registerInputs>(formOption);


    const onSubmit: SubmitHandler<registerInputs> = ({email, password}) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {

                setupUsers({
                    id: user.uid,
                    email: user.email,
                    token: user.refreshToken
                })
                navigate('/login')

            })
            .catch(console.error)
        dispatch(setIsLoading());
    }


    return (
        <>
            {isLoading ?
                <Preloader/>
                :
                <form className={'signUpWrapper'} onSubmit={handleSubmit(onSubmit)}>
                    <div className={'signUpInputWrapper'}>

                        <div className={'emailRegisterInputStyle'}>
                            <label>Email: </label>
                            <input type={'email'}  {...register('email', {
                                required: true,
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })} />
                            <div>
                                {errors?.email?.type === 'required' &&
                                    <span className={'error'}>This field is required!</span>
                                    || errors?.email?.type === 'pattern' &&
                                    <span className={'error'}>No such email exists</span>
                                }
                            </div>
                        </div>

                        <div className={'passwordRegisterInputStyle'}>
                            <label> Password: </label>
                            <input type={'password'} {...register('password')}/>
                            <div className={'error'}>{errors?.password?.message}</div>
                        </div>

                        <div className={'passwordConfirmInputStyle'}>
                            <label> Confirm password: </label>
                            <input type={'password'} {...register('confirmPassword')}/>
                            <div className={'error'}>{errors?.confirmPassword?.message}</div>
                        </div>


                        <div className={'submitRegisterButtonStyle'}>
                            <input  disabled={ isLoading || auth.isAuth }  type={'submit'} value={'Sign Up'}/>

                        </div>

                    </div>
                </form>

            }
        </>

    );
};

export default SignUp;