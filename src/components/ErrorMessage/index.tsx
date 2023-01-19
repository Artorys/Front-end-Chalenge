import { StyledErrorMessage } from "./style";
import { ReactElement } from "react";

interface IErrorMessageProps{
    children : ReactElement | string
}

export function ErrorMessage(props : IErrorMessageProps){
    return (
        <StyledErrorMessage>{props.children}</StyledErrorMessage>
    )
}