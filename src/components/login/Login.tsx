import React, {FC, useState} from 'react';
import './Login.scss'
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setIsLoading, setupUsers} from "../../store/UserSlice";
import Preloader from "../preloader/Preloader";
import {useAuth} from "../../hooks/firebase";


type loginInputs = {
    email: string,
    password: string,
    showPassword: boolean
}


const Login: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [passwordVisibility, togglePasswordVisibility] = useState<boolean>(false)
    const {register, handleSubmit, formState: {errors}} = useForm<loginInputs>({
        mode: 'onBlur'
    });
    const {isLoading} = useAppSelector(state => state.user)
    const auth = useAuth();


    const onSubmit: SubmitHandler<loginInputs> = ({email, password}) => {
        const auth = getAuth();
        dispatch(setIsLoading());
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setupUsers({
                        id: user.uid,
                        email: user.email,
                        token: user.refreshToken,
                    })
                )
                navigate('/')

            })
            .catch(()=>alert('An error has occured!'))
        dispatch(setIsLoading());
    };

    return (
        <>
            {isLoading ?
                <Preloader/>
                :
                <form onSubmit={handleSubmit(onSubmit)} className={'loginWrapper'}>

            <span className={'inputWrapper'}>

                <div className={'emailInputStyle'}>
                    <label>Email</label>:
                    <input type={'email'} {...register('email', {
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}/>
                    <div>
                            {errors?.email?.type === 'required' &&
                                <span className={'error'}>This field is required!</span>
                                || errors?.email?.type === 'pattern' &&
                                <span className={'error'}>No such email exists</span>
                            }
                    </div>
                </div>

                <div className={'passwordInputStyle'}>
                    <label>Password</label>:
                        <input type={passwordVisibility ? 'text' : 'password'} {...register('password', {
                            required: true,
                        })}/>
                    <div>
                        {errors?.password && <span className={'error'}>This field is required!</span>}
                    </div>
                </div>

                <div className={'checkBoxStyle'}>
                    <input onClick={() => togglePasswordVisibility(!passwordVisibility)}
                           type={'checkbox'} {...register('showPassword')}/>
                    <label>Show password</label>
                </div>

                <div className={'submitButtonStyle'}>
                    <input disabled={ isLoading || auth.isAuth} type={'submit'} value={'Submit'}/>

                </div>

                <div className={'additionalStyle'}>Don`t have an account? <Link to={'/signUp'}>Sign Up</Link> </div>
            </span>


                </form>

            }

        </>

    );
};

export default Login;