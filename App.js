import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native-web';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function buscarTarefas() {
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      if (tarefasSalvas) {
        setTarefas(JSON.parse(tarefasSalvas));
      }
    }
    buscarTarefas();
  }, []);

  const adicionarTarefa = async () => {
    if (tarefa === '') {
      alert('Digite uma tarefa primeiro!');
      return;
    }
    const novaLista = [...tarefas, tarefa];
    await AsyncStorage.setItem('tarefas', JSON.stringify(novaLista));
    setTarefas(novaLista);
    setTarefa('');
    alert('Tarefa adicionada com sucesso!');
  };
  const excluirTarefa = async (index) => {
    const novaLista = tarefas.filter((_, i) => i !== index);
    await AsyncStorage.setItem('tarefas', JSON.stringify(novaLista));
    setTarefas(novaLista);
  };

  const limparTudo = async () => {
    await AsyncStorage.removeItem('tarefas');
    setTarefas([]);
    alert('Todas as tarefas foram apagadas!');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.titulo}>Minhas Tarefas</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite uma nova tarefa"
        value={tarefa}
        onChangeText={setTarefa}
      />
      <Button title="Adicionar" onPress={adicionarTarefa} />

      <Button title="Limpar Tudo" color="red" onPress={limparTudo} />

      {tarefas.length === 0 ? (
        <Text style={styles.mensagemVazia}>Nenhuma tarefa encontrada. Adicione uma nova tarefa!</Text>
      ) : (
        <FlatList
        data={tarefas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.tarefaContainer}>
            <Text style={styles.tarefaTexto}>{item}</Text>
            <TouchableOpacity onPress={() => excluirTarefa(index)}>
              <Text style={styles.excluirTexto}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        />
      )}
      </View>
  )
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  tarefaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tarefaTexto: {
    fontSize: 18,
  },
  excluirTexto: {
    color: 'red',
    fontWeight: 'bold',
  },
  mensagemVazia: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});