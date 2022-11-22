import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container } from "./styles";
import { InputMaskInvoiceValue } from "../../components/InputMaskInvoiceValue";
import { InputMaskIssueDate } from "../../components/InputMaskIssueDate";
import axios from "axios";

function convertDate(data: string) {
  const dataArray = data.split("/");
  return new Date(dataArray[1] + "/" + dataArray[0] + "/" + dataArray[2]);
}
export function Dashboard() {
  const [description, setDescription] = useState("");
  const [invoice_Value, setInvoice_Value] = useState("");
  const [issue_Date, setIssue_Date] = useState("");
  const [client, setClient] = useState("");

  async function handleAddInvoice() {
    const invoice = {
      id: new Date().getTime(),
      description,
      invoice_value: parseFloat(
        invoice_Value
          .slice(2, invoice_Value.length)
          .replace(".", "")
          .replace(",", ".")
      ),
      issue_date: convertDate(issue_Date),
      client,
    };


    console.log({invoice});

    axios
      .post("http://192.168.11.216:3333/invoice", invoice)
      .then(() => {
        console.log("Invoice cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        console.log("Erro ao cadastrar Invoice!");
      });

    setDescription("");
    setInvoice_Value("");
    setIssue_Date("");
    setClient("");
  }

  return (
    <Container>
      <Header title="Cadastro de Funcionários" />

      <Input
        placeholder="Descrição do Serviço"
        placeholderTextColor="#363F5F"
        value={description}
        onChangeText={(value) => setDescription(value)}
      />

      <InputMaskInvoiceValue
        placeholder="Valor da NF"
        placeholderTextColor="#363F5F"
        value={invoice_Value}
        onChangeText={(value) => setInvoice_Value(value)}
      />

      <InputMaskIssueDate
        placeholder="Data da NF"
        placeholderTextColor="#363F5F"
        value={issue_Date}
        onChangeText={(value) => setIssue_Date(value)}
      />

      <Input
        placeholder="Nome do Cliente"
        placeholderTextColor="#363F5F"
        value={client}
        onChangeText={(value) => setClient(value)}
      />

      <Button title="Adicionar" handleUser={handleAddInvoice} />
    </Container>
  );
}
