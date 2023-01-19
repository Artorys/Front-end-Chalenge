import styled from "styled-components";

export const StyledDivInput = styled.div`
    width: 100%;
    height : 100%;
    display : flex;
    flex-direction: column;
`

export const StyledLabel = styled.label`
    color : ${(props)=> props.theme.color.sectionInput.labelInput};
    font-weight : 600;
    font-size : 0.8rem;
    margin-bottom: 0.3rem;
`

export const StyledInput = styled.input`
    height : 15%;
    border : ${(props)=> props.theme.shadow} solid 1px;
    border-radius: 5px;
    padding : 10px;
`