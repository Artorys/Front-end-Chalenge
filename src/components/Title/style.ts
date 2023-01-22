import styled from "styled-components";

export const StyledTitle = styled.h2`
    margin-top : 1rem;
    text-align: center;
    font-size : 1rem;
    font-style : italic;
    font-weight : 700;
    color: ${(props)=> props.theme.color.sectionInfo.title};

`