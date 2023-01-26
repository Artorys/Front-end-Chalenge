import * as yup from "yup"

export const valorSchema = yup.object().shape({
    valor : yup.number().required("O Valor da venda é necessário").positive("O valor tem que ser um número válido maior que 1000").moreThan(999,"O valor tem que ser maior ou igual a 1000").typeError("O valor tem que ser um número válido")
})
export const parcelaSchema = yup.object().shape({
    parcela : yup.number().required("O número de parcelas é necessário").positive("Mínimo de 0 parcelas e o máximo 12").lessThan(13,"Parcelado no máximo em 12 vezes").typeError("A parcela tem que ser um número válido")
})

export const mdrSchema = yup.object().shape({
    mdr : yup.number().required("A taxa mdr é necessária").positive("A taxa de mdr tem que ser um número válido menor ou igual a 100").lessThan(101,"A taxa mdr tem quer ser menor ou igual a 100").typeError("A taxa mdr tem que ser um número válido"),
})

export const daysSchema = yup.array().of(yup.number().typeError("Os dias precisam ser números válidos"))
