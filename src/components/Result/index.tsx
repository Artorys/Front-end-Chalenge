import {StyledResult,StyledResultBox,StyledResultText} from "./style"
interface IResultProps{
    resultText?: string;
    result?: number;
}

export function Result(props : IResultProps){
    return (
        <StyledResultBox>
            <StyledResultText>{props.resultText}</StyledResultText>
            <StyledResult></StyledResult>
        </StyledResultBox>
    )
}