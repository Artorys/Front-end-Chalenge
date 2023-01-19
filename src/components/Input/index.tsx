
import { StyledDivInput, StyledInput, StyledLabel } from "./style";
import { ChangeEventHandler } from "react";

interface IInputProps{
    textLabel : string
    type :  | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | (string & {});
    id : string
    placeholder : string;
    onChange : ChangeEventHandler           
}
export function Input(props: IInputProps){
    return (
        <StyledDivInput>
            <StyledLabel htmlFor={props.id}>{props.textLabel}</StyledLabel>
            <StyledInput onChange={props.onChange} placeholder={props.placeholder} id={props.id} type = {props.type}></StyledInput>
        </StyledDivInput>
    )
}