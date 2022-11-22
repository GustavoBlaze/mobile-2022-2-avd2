import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import { Header } from '../../components/Header'
import { Container } from './styles'
import { ListCard } from '../../components/ListCard';
import axios from 'axios';

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

const transform = (invoice: Omit<ListInvoiceProps, 'pis' | 'cofins' | 'csll' | 'iss' | 'liquid_value'> & {issue_date: string}): ListInvoiceProps => {
  const { invoice_value } = invoice;
  const pis = invoice_value * 0.0065;
  const cofins = invoice_value * 0.03;
  const csll = invoice_value * 0.01;
  const iss = invoice_value * 0.05;
  const liquid_value = invoice_value - (pis + cofins + csll + iss);

  return {
    ...invoice,
    pis,
    cofins,
    csll,
    iss,
    liquid_value,
    issue_date: new Date(invoice.issue_date)
  }
}

export function ListInvoice() {
  const [invoice, setInvoice] = useState<ListInvoiceProps[]>([])

  async function loadInvoice() {
    axios.get('http://192.168.11.216:3333/invoice')
      .then(response => (response.data ?? []).map(transform))
      .then(setInvoice)
      .catch(error => {
        console.log(error)
        Alert.alert('Erro ao carregar os dados')
      });
  }

  function handleDeleteInvoice(id: string) {
    Alert.alert('Exclusão', 'Tem certeza?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed')
      },
      {
        text: 'OK',
        onPress: () => setInvoice(invoice =>
          invoice.filter(invoic => invoic.id !== id))
      },
    ])
  }

  useEffect(() => {
    loadInvoice()
  }, [])

  useFocusEffect(useCallback(() => {
    loadInvoice()
  }, []))

  return (
    <Container>
      <Header title='Listagem dos Dados das NFs' />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={invoice}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListCard
            item={item}
            onPress={() => handleDeleteInvoice(item.id)}
          />
        )}
      />
    </Container>
  )
}
