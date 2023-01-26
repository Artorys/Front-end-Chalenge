import { Dispatch, SetStateAction } from "react";
import { ValidationError } from "yup";
import { SchemaLike } from "yup/lib/types";
import { IPersonalizeResult } from "../../pages/Home";

interface ISetValue{
    value : string
    setState? : Dispatch<SetStateAction<number>>
    setArrayState? : Dispatch<SetStateAction<Array<number>>>
    setErrorState : Dispatch<SetStateAction<string>>
    schema : SchemaLike
    type : "valor" | "parcela" | "mdr" | "days"
}

export async function SetValue(config : ISetValue): Promise<void>{
    const {schema,setErrorState,setState,value,type,setArrayState} = config 
    if(setArrayState){
        const daysMatched = value.match(/(^[0-9]+)|(,[0-9]+)|(, [0-9]+)|( [0-9]+)/g)
        const formattedDays = daysMatched?.map((day)=>{
            let formatted = day.replace(",","")
            formatted = formatted.trim()
            return Number(formatted)
        }) as number[]
        setArrayState(formattedDays)
        setErrorState("")
    }
    if(setState){
        try{
                const valueNumber = Number(value)
                const data = {[type] : valueNumber}
                await schema.validate(data,{abortEarly : false,stripUnknown : true})  
                setState(valueNumber)
                setErrorState("")
            }
            catch(err){
                if(err instanceof ValidationError){
                    setErrorState(err.message)
                }
            }
    }
    }