import { StyledDiv, StyledForm, StyledHome, StyledInputBox, StyledResultBox, StyledSectionInfo, StyledSectionInput } from "./style";
import { Header } from "../../components/Header";
import { Title } from "../../components/Title";
import { Line } from "../../components/Line";
import { Result } from "../../components/Result";
import { Input } from "../../components/Input";
import { useEffect, useState } from "react";
import * as yup from "yup"
import {ValidationError} from "yup"
import { ErrorMessage } from "../../components/ErrorMessage";
import { StyledDivInput } from "../../components/Input/style";
import { api } from "../../api";

export function Home(){
    
    const valorSchema = yup.object().shape({
        valor : yup.number().required("O Valor da venda é necessário").positive("O valor tem que ser um número válido maior que 1000").moreThan(999,"O valor tem que ser maior ou igual a 1000").typeError("O valor tem que ser um número válido")
    })
    const parcelaSchema = yup.object().shape({
        parcela : yup.number().required("O número de parcelas é necessário").positive("Mínimo de 0 parcelas e o máximo 12").lessThan(12,"Parcelado no máximo em 12 vezes").typeError("A parcela tem que ser um número válido")
    })

    const mdrSchema = yup.object().shape({
        mdr : yup.number().required("A taxa mdr é necessária").lessThan(101,"A taxa mdr tem quer ser menor ou igual a 100").typeError("A taxa mdr tem que ser um número válido"),
    })

    const [result,setResult] = useState({
        amanha : 0,
        quinze_dias : 0,
        trinta_dias : 0,
        noventa_dias :0 
    })

    const [valor,setValor] = useState(undefined)
    const [parcela,setParcela] = useState(undefined)
    const [mdr,setMdr] = useState(undefined)       

    const [valorError,setValorError] = useState("")
    const [parcelaError,setParcelaError] = useState("")
    const [mdrError,setMdrError] = useState("")
    
    useEffect(()=>{
        async function AnticipationResponse(){
            try{
                if(!valorError && !parcelaError && !mdrError){
    
                    const data = {amount : valor,installments : parcela,mdr : mdr}
                    const response =  await api.post("",data)
                    const days = response.data
                    setResult({amanha : days[1],quinze_dias : days[15],trinta_dias : days[30], noventa_dias : days[90]})
                }
                else{
                    setResult({amanha : 0,quinze_dias : 0,trinta_dias : 0,noventa_dias : 0})
                }
            }
            catch(err){               
            }
        }
        AnticipationResponse()
        console.log(result)
    },[valor,parcela,mdr,valorError,parcelaError,mdrError])

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
                <Title text="VOCÊ RECEBERÁ"></Title>
                <Line></Line>
                <StyledResultBox>
                    <Result result={result.amanha ? result.amanha : 0} resultText="Amanhã: "></Result>
                    <Result result={result.quinze_dias  ? result.quinze_dias : 0} resultText="em 15 dias:"></Result>
                    <Result result={result.trinta_dias ? result.trinta_dias : 0} resultText="em 30 dias:"></Result>
                    <Result result={result.noventa_dias ? result.noventa_dias : 0} resultText="em 90 dias:"></Result>
                </StyledResultBox>
            </StyledSectionInfo>
        </StyledHome> 
    </StyledDiv>
        )

        
}