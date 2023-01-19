import { StyledH1, StyledHeader } from "./style";

interface IInputHeader{
    text : string
}

export function Header(props: IInputHeader){
    return (
        <StyledHeader>
            <StyledH1>{props.text}</StyledH1>
        </StyledHeader>
    )
}