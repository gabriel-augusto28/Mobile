import React, { Component } from "react";
import { View, Text, Image, Platform, ScrollView } from 'react-native';


const styles = {
  container: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  section: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#1C1C1C',
    fontSize: 25,
    marginVertical: 10,
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Platform.select({ android: 'Open Sans', ios: 'Open Sans' }),
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 4,
  },
};

class App extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.section}>
          <Text style={styles.title}>Bem-vindo ao seu auxiliar de treino 💪</Text>
          <Text style={styles.subtitle}>Esses são os exercícios para você começar!</Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.title}>Treino de Peito</Text>

          <Image
            source={{ uri: 'https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif' }}
            style={styles.image}
          />
          <Text style={styles.text}>Supino reto com barra</Text>
          <Text style={styles.text}>Músculo recrutado: Peitoral</Text>
          <Text style={styles.text}>Tipo do exercício: Peso livre</Text>

          <Image
            source={{ uri: 'https://static.strengthlevel.com/images/exercises/incline-bench-press/incline-bench-press-800.jpg' }}
            style={[styles.image, { marginTop: 15 }]}
          />
          <Text style={styles.text}>Supino inclinado com barra</Text>
          <Text style={styles.text}>Músculo recrutado: Peitoral</Text>
          <Text style={styles.text}>Tipo do exercício: Peso livre</Text>
        </View>

        
        <Jobs largura={250} altura={250} />
      </ScrollView>
    );
  }
}

export default App;

class Jobs extends Component {
  render() {
    const exercicios = [
      
      {
        nome: 'Remada curvada com barra',
        musculo: 'Costas',
        tipo: 'Peso livre',
        sinergista: 'Bíceps',
        articulacoes: 'Multiarticular',
        img: 'https://static.strengthlevel.com/images/exercises/bent-over-row/bent-over-row-800.jpg'
      },
      {
        nome: 'Remada sentada máquina',
        musculo: 'Costas',
        tipo: 'Máquina',
        sinergista: 'Bíceps',
        articulacoes: 'Multiarticular',
        img: 'https://static.strengthlevel.com/images/exercises/machine-row/machine-row-800.jpg'
      },
      {
        nome: 'Puxada alta máquina',
        musculo: 'Costas',
        tipo: 'Máquina',
        sinergista: 'Antebraço e bíceps',
        articulacoes: 'Multiarticular',
        img: 'https://static.strengthlevel.com/images/exercises/reverse-grip-lat-pulldown/reverse-grip-lat-pulldown-800.jpg'
      },
      {
        nome: 'Barra fixa',
        musculo: 'Costas',
        tipo: 'Peso do corpo',
        sinergista: 'Antebraço e bíceps',
        articulacoes: 'Multiarticular',
        img: 'https://static.strengthlevel.com/images/exercises/pull-ups/pull-ups-400.avif'
      },
      {
        nome: 'Rosca martelo',
        musculo: 'Bíceps',
        tipo: 'Peso livre',
        sinergista: 'Antebraço',
        articulacoes: 'Monoarticular',
        img: 'https://static.strengthlevel.com/images/exercises/hammer-curl/hammer-curl-400.avif'
      },
      {
        nome: 'Rosca direta barra',
        musculo: 'Bíceps',
        tipo: 'Peso livre',
        sinergista: 'Antebraço',
        articulacoes: 'Monoarticular',
        img: 'https://static.strengthlevel.com/images/exercises/barbell-curl/barbell-curl-400.avif'
      }
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.title}>Treino de Costas e Bíceps</Text>
        <Text style={styles.subtitle}>Aqui estão exercícios para costas e bíceps</Text>

        {exercicios.map((ex, index) => (
          <View key={index} style={{ alignItems: 'center', marginTop: 20 }}>
            <Image source={{ uri: ex.img }} style={{ width: this.props.largura, height: this.props.altura, borderRadius: 10 }} />
            <Text style={styles.text}>Nome do exercício: {ex.nome}</Text>
            <Text style={styles.text}>Músculo recrutado: {ex.musculo}</Text>
            <Text style={styles.text}>Tipo: {ex.tipo}</Text>
            {ex.sinergista && <Text style={styles.text}>Músculo auxiliar: {ex.sinergista}</Text>}
            {ex.articulacoes && <Text style={styles.text}>Tipo de movimento: {ex.articulacoes}</Text>}
          </View>
        ))}
      </View>
    );
  }
}

