import { useEffect, useState } from "react";
import {StyledResult,StyledResultBox,StyledResultText} from "./style"
import { Loading } from "../Loading";
interface IResultProps{
    resultText: string;
    result: number;
}

export function Result(props : IResultProps){

    return (
        <StyledResultBox>
            <StyledResultText>{props.resultText}</StyledResultText>
            {!props.result ? <Loading></Loading> : <StyledResult>{`R$${props.result},00`}</StyledResult>}
        </StyledResultBox>
    )
}