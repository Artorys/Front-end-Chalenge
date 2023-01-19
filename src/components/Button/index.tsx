import { MouseEventHandler } from "react";
import { StyledButton } from "./style"


interface IDescriptionProps{
    text : string;
    onClick? : MouseEventHandler
    type : 'submit' | 'reset' | 'button' | undefined;
}

export function Button(props : IDescriptionProps){
    return (
        <StyledButton type={props.type}>{props.text}</StyledButton>
    )
}