import { StyledTitle} from "./style";

interface ITitleProps{
    text : string
}

export function Title(props: ITitleProps){
    return (
        <StyledTitle>{props.text}</StyledTitle>
    )
}