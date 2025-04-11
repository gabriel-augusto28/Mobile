import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [nivel, setNivel] = useState('Iniciante');
  const [treino, setTreino] = useState('Peito');
  const [intensidade, setIntensidade] = useState(50);
  const [tempo, setTempo] = useState(30);
  const [alongamento, setAlongamento] = useState(false);
  const [aquecimento, setAquecimento] = useState(false);

  const mostrarInfo = () => {
    alert(`Nome: ${nome}\nIdade: ${idade}\nPeso: ${peso}\nObjetivo: ${objetivo}`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>Ficha de Treino</Text>

      <TextInput placeholder="Nome" style={estilos.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="Idade" keyboardType="numeric" style={estilos.input} value={idade} onChangeText={setIdade} />
      <TextInput placeholder="Peso (kg)" keyboardType="numeric" style={estilos.input} value={peso} onChangeText={setPeso} />
      <TextInput placeholder="Objetivo" style={estilos.input} value={objetivo} onChangeText={setObjetivo} />

      <Text style={estilos.label}>Nível de Treino:</Text>
      <Picker selectedValue={nivel} onValueChange={setNivel} style={estilos.picker}>
        <Picker.Item label="Iniciante" value="Iniciante" />
        <Picker.Item label="Intermediário" value="Intermediário" />
        <Picker.Item label="Avançado" value="Avançado" />
      </Picker>

      <Text style={estilos.label}>Grupo Muscular do Dia:</Text>
      <Picker selectedValue={treino} onValueChange={setTreino} style={estilos.picker}>
        <Picker.Item label="Peito" value="Peito" />
        <Picker.Item label="Costas" value="Costas" />
        <Picker.Item label="Pernas" value="Pernas" />
      </Picker>

      <Text style={estilos.label}>Intensidade do Treino: {intensidade}%</Text>
      <Slider
        style={estilos.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={intensidade}
        onValueChange={setIntensidade}
        minimumTrackTintColor="#1E90FF"
        maximumTrackTintColor="#000"
      />

      <Text style={estilos.label}>Tempo de Treino: {tempo} min</Text>
      <Slider
        style={estilos.slider}
        minimumValue={30}
        maximumValue={120}
        step={5}
        value={tempo}
        onValueChange={setTempo}
        minimumTrackTintColor="#32CD32"
        maximumTrackTintColor="#000"
      />

      <View style={estilos.switchContainer}>
        <Text>Alongamento</Text>
        <Switch value={alongamento} onValueChange={setAlongamento} />
      </View>

      <View style={estilos.switchContainer}>
        <Text>Aquecimento</Text>
        <Switch value={aquecimento} onValueChange={setAquecimento} />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Button title="Salvar Ficha" onPress={mostrarInfo} color="#1E90FF" />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Button title="Limpar Tudo" onPress={() => {
          setNome('');
          setIdade('');
          setPeso('');
          setObjetivo('');
          setNivel('Iniciante');
          setTreino('Peito');
          setIntensidade(50);
          setTempo(30);
          setAlongamento(false);
          setAquecimento(false);
        }} color="#FF4500" />
      </View>

      
      <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/incline-bench-press/incline-bench-press-800.jpg' }} style={estilos.imagem} />
      <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif' }} style={estilos.imagem} />
      <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/hammer-curl/hammer-curl-400.avif' }} style={estilos.imagem} />
      <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/lying-leg-curl/lying-leg-curl-400.avif' }} style={estilos.imagem} />
      <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/good-morning/good-morning-400.avif' }} style={estilos.imagem} />
    </ScrollView>
  );
}

const estilos = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  imagem: {
    width: 250,
    height: 250,
    marginVertical: 10,
    borderRadius: 10,
  }
};
