import { StyledDescription } from "./style";

interface IDescriptionProps{
    text : string
}

export function Description(props : IDescriptionProps){
    return (
        <StyledDescription>{props.text}</StyledDescription>
    )
}