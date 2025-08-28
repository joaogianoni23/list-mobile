import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native-web';

export default function App () {
  //Estados: o que o usuário digita e o nome salvo
  const [nome, setNome] = useState('');
  const [nomeSalvo, setNomeSalvo] = useState('');

  //Busca o nome salvo quando o app abre
  useEffect(() => {
    async function buscarNome() {
      const nomeGuardado = await AsyncStorage.getItem('nomeUsuario');
      if (nomeGuardado) {
        setNomeSalvo(nomeGuardado);
      }
    }
    buscarNome();
  }, []);

  // Função para salvar o nome
  const salvarNome = async () => {
    if (nome === '') {
      alert('Digite um nome primeiro!');
      return;
    }
    await AsyncStorage.setItem('nomeUsuario', nome);
    setNomeSalvo(nome);
    setNome(''); // Limpa o campo
    alert('Nome salvo com sucesso!');
  };

  return (
    <View style={StyleSheet.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/*Mostra o nome salvo */}
      <Text style={StyleSheet.texto}>
        {nomeSalvo ? `Olá, ${nomeSalvo}!` : 'Nenhum nome salvo.'}
      </Text>
      {/* Campo para digitar */}
      <TextInput
        style={StyleSheet.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
        />
        {/* Botão para salvar */}
        <Button title="Salvar Nome" onPress={salvarNome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBotton: 20,
  },
  texto: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  }
})
