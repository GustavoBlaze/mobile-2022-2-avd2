import React, { TouchableOpacityProps } from 'react-native'

import {
    Container,
    TextTitle,
    TextCard
} from './styles'

interface ListInvoiceProps {
    id: string,
    description: string,
    invoice_value: number,
    issue_date: Date,
    client: string,
    pis: number,
    cofins: number,
    csll: number,
    iss: number,
    liquid_value: number,
}

interface ListCardProps extends TouchableOpacityProps {
    item: ListInvoiceProps;
}

export function ListCard({ item, ...rest }: ListCardProps) {

    return (
        <Container
            {...rest}
            key={item.id}>
            <TextTitle>Dados da Nota Fiscal</TextTitle>
            <TextCard>Descrição do Serviço: {item.description}</TextCard>
            <TextCard>Valor da NF: R$ {item.invoice_value.toFixed(2)}</TextCard>
            <TextCard>Data da NF: {item.issue_date.toLocaleDateString('pt-BR')}</TextCard>
            <TextCard>Cliente: {item.client}</TextCard>
            <TextCard>PIS: R$ {item.pis.toFixed(2)}</TextCard>
            <TextCard>COFINS: R$ {item.cofins.toFixed(2)}</TextCard>
            <TextCard>CSLL: R$ {item.csll.toFixed(2)}</TextCard>
            <TextCard>ISS: R$ {item.iss.toFixed(2)}</TextCard>
            <TextCard>Valor Líquido: R$ {item.liquid_value.toFixed(2)}</TextCard>
        </Container>
    )
}


