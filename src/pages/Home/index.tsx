import { StyledDiv, StyledForm, StyledHome, StyledInputBox, StyledResultBox, StyledSectionInfo, StyledSectionInput } from "./style";
import { Header } from "../../components/Header";
import { Title } from "../../components/Title";
import { Line } from "../../components/Line";
import { Result } from "../../components/Result";
import { Input } from "../../components/Input";
import { useEffect, useState } from "react";
import * as yup from "yup"
import {ValidationError} from "yup"
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import { StyledDivInput } from "../../components/Input/style";

export function Home(){
    
    const valorSchema = yup.object().shape({
        valor : yup.number().required("O Valor da venda é necessário").positive("O valor tem que ser um número válido maior que 1000").moreThan(1000,"O valor tem que ser maior que 1000").typeError("O valor tem que ser um número válido")
    })
    const parcelaSchema = yup.object().shape({
        parcela : yup.number().required("O número de parcelas é necessário").positive("Mínimo de 0 parcelas e o máximo 12").lessThan(12,"Parcelado no máximo em 12 vezes").typeError("A parcela tem que ser um número válido")
    })

    const mdrSchema = yup.object().shape({
        mdr : yup.number().required("A taxa mdr é necessária").typeError("A taxa mdr tem que ser um número válido"),
    })

    const [valor,setValor] = useState(undefined)
    const [parcela,setParcela] = useState(undefined)
    const [mdr,setMdr] = useState(undefined)          
    const [valorError,setValorError] = useState("")
    const [parcelaError,setParcelaError] = useState("")
    const [mdrError,setMdrError] = useState("")

    return (
    <StyledDiv>
        <StyledHome>
            <StyledSectionInput>
                <Header text="Simule sua antecipação"></Header>
                    <StyledForm onSubmit={async(eve)=> {eve.preventDefault}}>
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
                        <Button type="submit" text="ENVIAR"></Button>
                    </StyledForm>
            </StyledSectionInput>
            <StyledSectionInfo>
                <Title text="VOCÊ RECEBERÁ"></Title>
                <Line></Line>
                <StyledResultBox>
                    <Result resultText="Amanhã"></Result>
                    <Result resultText="em 15 dias"></Result>
                    <Result resultText="em 30 dias"></Result>
                    <Result resultText="em 90 dias"></Result>
                </StyledResultBox>
            </StyledSectionInfo>
        </StyledHome> 
    </StyledDiv>
        )

        
}