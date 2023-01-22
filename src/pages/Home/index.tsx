import { StyledDiv, StyledForm, StyledHome, StyledInputBox, StyledResultBox, StyledSectionInfo, StyledSectionInput } from "./style";
import { Header } from "../../components/Header";
import { Title } from "../../components/Title";
import { Line } from "../../components/Line";
import { Result } from "../../components/Result";
import { Input } from "../../components/Input";
import { useEffect, useState } from "react";
import {ValidationError} from "yup"
import { ErrorMessage } from "../../components/ErrorMessage";
import { StyledDivInput } from "../../components/Input/style";
import { api } from "../../api";
import { daysSchema, mdrSchema, parcelaSchema, valorSchema } from "../../schemas/home";

export function Home(){

interface IPersonalizeResult{
    [key: string] : number
}    

    const [valor,setValor] = useState(undefined)
    const [parcela,setParcela] = useState(undefined)
    const [mdr,setMdr] = useState(undefined)   
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
                if(!valorError && !parcelaError&& !mdrError && !daysError){
                    if(valor && parcela && mdr && days){
                        const data = {amount : valor,installments : parcela,mdr : mdr,days : days}
                        const response =  await api.post("",data)
                        const daysData = response.data
                        const personalizeDays = []
                        for(const key in daysData){
                            personalizeDays.push({[key] : daysData[key]})
                        }
                        setPersonalizeResult(personalizeDays)
                    }
                    if(valor && parcela && mdr)
                    {
                        const data = {amount : valor,installments : parcela,mdr : mdr}
                        const response =  await api.post("",data)
                        const daysData = response.data
                        setResult({amanha : daysData[1],quinze_dias : daysData[15],trinta_dias : daysData[30], noventa_dias : daysData[90]})
                    }
                }
                else{
                    setPersonalizeResult([{}])
                    setResult({amanha : 0,quinze_dias : 0,trinta_dias : 0,noventa_dias : 0})
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
                                const value = (eve.target as HTMLInputElement).value as any
                                try{
                                    const data = {valor : value}
                                    await valorSchema.validate(data,{abortEarly : false,stripUnknown : true})  
                                    setValor(value)
                                    setValorError("")
                                }
                                catch(err){
                                    if(err instanceof ValidationError){
                                        setValorError(err.message)
                                    }
                                }
                                        
                                
                                }} placeholder="Digite o valor" id="valor" type="text" textLabel="Informe o valor da venda *"></Input>
                                {valorError && <ErrorMessage>{valorError}</ErrorMessage>}
                        </StyledInputBox>
                        <StyledInputBox>
                            <Input onChange={async(eve)=>{
                                const value = (eve.target as HTMLInputElement).value as any
                                try{
                                    const data = {parcela : value}
                                    await parcelaSchema.validate(data,{abortEarly : false,stripUnknown : true})  
                                    setParcela(value)
                                    setParcelaError("")
                                }
                                catch(err){
                                    if(err instanceof ValidationError){
                                        setParcelaError(err.message)
                                    }
                                }
                            }} placeholder="Digite as parcelas" id= "parcelas"type="text" textLabel="Em quantas parcelas *"></Input>
                            {parcelaError && <ErrorMessage>{parcelaError}</ErrorMessage>}
                        </StyledInputBox>
                        <StyledDivInput>
                            <Input onChange={async(eve)=>{
                                const value = (eve.target as HTMLInputElement).value as any
                                try{
                                    const data = {mdr : value}
                                    await mdrSchema.validate(data,{abortEarly : false,stripUnknown : true})  
                                    setMdr(value)
                                    setMdrError("")
                                }
                                catch(err){
                                    if(err instanceof ValidationError){
                                        setMdrError(err.message)
                                    }
                                }
                            }}   placeholder="Digite a taxa mdr" id= "mdr" type="text" textLabel="Informe o percentual de MDR *"></Input>
                            {mdrError && <ErrorMessage>{mdrError}</ErrorMessage>}
                        </StyledDivInput>
                    </StyledForm>
            </StyledSectionInput>
            <StyledSectionInfo>
            <StyledDivInput>
                <Input onChange={async(eve)=>{
                    const value = (eve.target as HTMLInputElement).value
                    try{
                        const daysMatched = value.match(/(^[0-9]+)|(,[0-9]+)|(, [0-9]+)|( [0-9]+)/g)
                        if(!daysMatched){
                            setDaysError("Digite números separados por vírgula ou espaçados")
                        }
                        const formattedDays = daysMatched?.map((day)=>{
                            let formatted = day.replace(",","")
                            formatted = formatted.trim()
                            return Number(formatted)
                        }) as number[]
                        const schema = await daysSchema.validate(formattedDays,{stripUnknown : true,abortEarly : false})
                        console.log(schema)
                        setDays(formattedDays)
                        setDaysError("")
                    }
                    catch(err){
                        if(err instanceof ValidationError){
                            setDaysError(err.message)
                        }
                    }
                }}   placeholder="virgula ou espaçado" id= "dias" type="text" textLabel="Informe os dias * opcional"></Input>
                {daysError && <ErrorMessage>{daysError}</ErrorMessage>}
            </StyledDivInput>
                <Title text="VOCÊ RECEBERÁ"></Title>
                <Line></Line>
                <StyledResultBox>
                    {Object.keys(personalizeResult[0]).length != 0 ? personalizeResult.map((result,index)=>{
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