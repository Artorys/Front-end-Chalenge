import styled from "styled-components"

export const StyledDiv = styled.div`
    width : 100%;
    height : 100%;
    display: flex;
    align-items: center;
    justify-content : center;
`
export const StyledHome = styled.main`
    border : ${(props)=> `2px ${props.theme.shadow} solid`};
    display : flex; 
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    @media only screen and (max-width: 520px){
        flex-direction : column
    }

`
export const StyledSectionInput = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding : 40px;
    border-radius: 10px;
    width: 50%;
    height : 100%;
    background: ${(props)=> props.theme.background.sectionInput.background};

    @media only screen and (max-width: 520px){
        width : 100%
    }

`
export const StyledInputBox = styled.div`
    width: auto;
    height: auto;

`
export const StyledForm = styled.form`
    display : flex;
    flex-direction: column;
    gap : 1.2rem;
`
export const StyledSectionInfo = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding : 40px;
    border-radius: 10px;
    width: 50%;
    height : 100%;
    background: ${(props)=> props.theme.background.sectionInfo.background};

    @media only screen and (max-width: 520px){
        width : 100%
    }

    
`

export const StyledResultBox = styled.div`
    margin-top: 2rem;
    display : flex;
    flex-direction: column;
    gap : 1.2rem;
`