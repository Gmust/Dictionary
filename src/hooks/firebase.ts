import {useAppSelector} from "./redux";


export const useAuth = () => {
    const {id, email, token} = useAppSelector(state => state.user)


    return {
        isAuth: !!email,
        email,
        token,
    }


};