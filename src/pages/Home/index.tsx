import { StyledDiv, StyledForm, StyledHome, StyledInputBox, StyledResultBox, StyledSectionInfo, StyledSectionInput } from "./style";
import { Header } from "../../components/Header";
import { Title } from "../../components/Title";
import { Line } from "../../components/Line";
import { Result } from "../../components/Result";
import { Input } from "../../components/Input";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { StyledDivInput } from "../../components/Input/style";
import { api } from "../../api";
import { daysSchema, mdrSchema, parcelaSchema, valorSchema } from "../../schemas/home";
import { SetValue } from "../../utils/Home";
export interface IPersonalizeResult{
    [key: string] : number
}    

export function Home(){


    const [valor,setValor] = useState(0)
    const [parcela,setParcela] = useState(0)
    const [mdr,setMdr] = useState(0)   
    const [days,setDays] = useState<Array<number>>([])    
    const [result,setResult] = useState({
        amanha : 0,quinze_dias : 0,trinta_dias : 0, noventa_dias : 0
    })
    const [personalizeResult,setPersonalizeResult] = useState([{} as IPersonalizeResult])

    const [valorError,setValorError] = useState("")
    const [parcelaError,setParcelaError] = useState("")
    const [mdrError,setMdrError] = useState("")
    const [daysError,setDaysError] = useState("")

    useEffect(()=>{
        async function AnticipationResponse(){
            try{
                if((valor || parcela || mdr)){
                    if((!valorError && !parcelaError && !mdrError) && (days && days.length > 0)){
                        const data = {amount : valor,installments : parcela,mdr : mdr,days : days}
                        const response =  await api.post("",data)
                        const daysData = response.data
                        const personalizeDays = []
                        for(const key in daysData){
                            personalizeDays.push({[key] : daysData[key]})
                        }
                        setPersonalizeResult(personalizeDays)
                    }
                    else{
                        setPersonalizeResult([{}])
                    }
                    if((!valorError && !parcelaError && !mdrError)){
                        const data = {amount : valor,installments : parcela,mdr : mdr}
                        const response =  await api.post("",data)
                        const daysData = response.data
                        setResult({amanha : daysData[1],quinze_dias : daysData[15],trinta_dias : daysData[30], noventa_dias : daysData[90]})   
                    }
                    else{
                        console.log("salve")
                        setResult({amanha : 0,quinze_dias : 0,trinta_dias : 0,noventa_dias : 0})
                    }
                }
            }
            catch(err){
                            
            }
        }
        AnticipationResponse()
    },[valor,parcela,mdr,valorError,parcelaError,mdrError,days,daysError])

    return (
    <StyledDiv>
        <StyledHome>
            <StyledSectionInput>
                <Header text="Simule sua antecipação"></Header>
                    <StyledForm>
                        <StyledInputBox>
                            <Input onChange={async (eve)=>{
                                const value = (eve.target as HTMLInputElement).value
                                SetValue({setState: setValor,setErrorState : setValorError,schema : valorSchema,type : "valor" , value : value})
                                    
                                }} placeholder="Digite o valor" id="valor" type="text" textLabel="Informe o valor da venda *"></Input>
                                {valorError && <ErrorMessage>{valorError}</ErrorMessage>}
                        </StyledInputBox>
                        <StyledInputBox>
                            <Input onChange={async(eve)=>{
                                const value = (eve.target as HTMLInputElement).value
                                SetValue({setState: setParcela,setErrorState : setParcelaError,schema : parcelaSchema,type : "parcela" , value : value})
                            }} placeholder="Digite as parcelas" id= "parcelas"type="text" textLabel="Em quantas parcelas *"></Input>
                            {parcelaError && <ErrorMessage>{parcelaError}</ErrorMessage>}
                        </StyledInputBox>
                        <StyledDivInput>
                            <Input onChange={async(eve)=>{
                                const value = (eve.target as HTMLInputElement).value
                                SetValue({setState: setMdr,setErrorState : setMdrError,schema : mdrSchema,type : "mdr" , value : value})
                            }}   placeholder="Digite a taxa mdr" id= "mdr" type="text" textLabel="Informe o percentual de MDR *"></Input>
                            {mdrError && <ErrorMessage>{mdrError}</ErrorMessage>}
                        </StyledDivInput>
                    </StyledForm>
            </StyledSectionInput>
            <StyledSectionInfo>
            <StyledDivInput>
                <Input onChange={async(eve)=>{
                    const value = (eve.target as HTMLInputElement).value
                    SetValue({setErrorState : setDaysError,schema : daysSchema,type : "days" , value : value,setArrayState : setDays})
                }}   placeholder="virgula ou espaçado" id= "dias" type="text" textLabel="Informe os dias * opcional"></Input>
                {daysError && <ErrorMessage>{daysError}</ErrorMessage>}
            </StyledDivInput>
                <Title text="VOCÊ RECEBERÁ"></Title>
                <Line></Line>
                <StyledResultBox>
                    {Object.keys(personalizeResult[0]).length > 0 ? personalizeResult.map((result,index)=>{
                        if(index < 4){
                            const key = Object.keys(result)[0]
                            const value = Object.values(result)[0]
                            return <Result key={index} result={value} resultText={`em ${key} dias:`}></Result>
                        }

                    })
                    :
                    <>
                        <Result result={result.amanha ? result.amanha : 0} resultText="Amanhã: "></Result>
                        <Result result={result.quinze_dias  ? result.quinze_dias : 0} resultText="em 15 dias:"></Result>
                        <Result result={result.trinta_dias ? result.trinta_dias : 0} resultText="em 30 dias:"></Result>
                        <Result result={result.noventa_dias ? result.noventa_dias : 0} resultText="em 90 dias:"></Result>
                    </>
                }
                </StyledResultBox>
            </StyledSectionInfo>
        </StyledHome> 
    </StyledDiv>
        )

        
}