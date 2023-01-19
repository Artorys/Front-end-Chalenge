import * as yup from "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"

export function Profile(){

    const schema = yup.object().shape({
        name : yup.string().required(),
        password : yup.string().required()
    })

    
    const {handleSubmit,formState : {errors},register,watch} = useForm()
    
    return (
        <form onSubmit={handleSubmit((data)=>{
            console.log(data)
        })}>
          <input 
            {...register("firstName", { required: true })} 
            aria-invalid={errors.firstName ? "true" : "false"} 
          />
          {errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}
    
          <input 
            {...register("mail", { required: "Email Address is required" })} 
            aria-invalid={errors.mail ? "true" : "false"} 
          />
          {errors.mail && <p role="alert"><>{errors.mail?.message}</></p>}
          
          <input type="submit" />
        </form>
      );
}