import { AUTH } from "../contants/actionTypes"
import * as api from "../../api";

export const signin = (formData, history) => async ( dispatch ) => {
    try {
        //history is for to push to home page we can't import history here from library we need to pass through params
        //log in user

        const { data}  = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        history.push('/')
        
    } catch (error) {
        console.log(error);

    }
};


export const signup = (formData, history ) => async ( dispatch ) => {
    try {
          //signup up the user..
          const { data } = await api.signUp(formData);
          dispatch({ type:AUTH, data });

          history.push('/')
    } catch (error) {
        console.log(error);
        
    }
}
