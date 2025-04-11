import React, { Component } from "react";
import { View, Text, Image, Platform, ScrollView, Button } from 'react-native';

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
  moreInfoText: {
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
    paddingHorizontal: 10,
  },
};

class App extends Component {
  state = {
    mostrarTreinoPerna: false,
  };

  toggleTreinoPerna = () => {
    this.setState(prev => ({ mostrarTreinoPerna: !prev.mostrarTreinoPerna }));
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>Bem-vindo ao seu auxiliar de treino 💪</Text>
          <Text style={styles.subtitle}>Esses são os exercícios para você começar!</Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.title}>Treino de Peito</Text>
          <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif' }} style={styles.image} />
          <Text style={styles.text}>Supino reto com barra</Text>
          <Text style={styles.text}>Músculo recrutado: Peitoral</Text>
          <Text style={styles.text}>Tipo do exercício: Peso livre</Text>

          <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/incline-bench-press/incline-bench-press-800.jpg' }} style={[styles.image, { marginTop: 15 }]} />
          <Text style={styles.text}>Supino inclinado com barra</Text>
          <Text style={styles.text}>Músculo recrutado: Peitoral</Text>
          <Text style={styles.text}>Tipo do exercício: Peso livre</Text>
        </View>

        <Jobs largura={250} altura={250} />

        <View style={{ marginTop: 30 }}>
          <Button
            title={this.state.mostrarTreinoPerna ? "Ocultar treino de pernas" : "Mostrar treino de pernas"}
            onPress={this.toggleTreinoPerna}
            color="#1E90FF"
          />
        </View>

        {this.state.mostrarTreinoPerna && <Pernas largura={250} altura={250} />}
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

class Pernas extends Component {
  render() {
    const { largura, altura } = this.props;
    const pernas = [
      {
        nome: 'Agachamento barra',
        musculo: 'Quadríceps',
        tipo: 'Peso livre',
        sinergista: 'Posterior de coxa',
        articulacoes: 'Multiarticular',
        img: 'https://static.strengthlevel.com/images/exercises/squat/squat-400.avif',
        info: 'Ajuda a melhorar a força nas pernas e glúteos, pois recruta esses músculos com a mesma intensidade.'
      },
      {
        nome: 'Leg press 45',
        musculo: 'Quadríceps',
        tipo: 'Máquina',
        sinergista: 'Posterior de coxa',
        articulacoes: 'Monoarticular',
        img: 'https://static.strengthlevel.com/images/exercises/sled-leg-press/sled-leg-press-400.avif',
        info: 'Exercício seguro e ideal para progressão de carga com foco em quadríceps.'
      },
      {
        nome: 'Cadeira extensora',
        musculo: 'Quadríceps',
        tipo: 'Máquina',
        sinergista: 'Posterior',
        articulacoes: 'Monoarticular',
        img: 'https://static.strengthlevel.com/images/exercises/leg-extension/leg-extension-400.avif',
        info: 'É um dos melhores exercícos para pernas,pois é focado em isolar o quadríceps, ótimo para fortalecimento dessa região da perna.'
      },
      {
        nome: 'Mesa flexora',
        musculo: 'Posterior de coxa',
        tipo: 'Máquina',
        sinergista: 'Glúteo',
        articulacoes: 'Monoarticular',
        img: 'https://static.strengthlevel.com/images/exercises/lying-leg-curl/lying-leg-curl-400.avif',
        info: 'É um exercício bem seguro e permite trabalhar o posterior da coxa de forma isolada.'
      },
      {
        nome: 'Stiff',
        musculo: 'Posterior de coxa',
        tipo: 'Peso livre',
        sinergista: 'Lombar, Abdômen',
        articulacoes: 'Multiarticular',
        img: 'https://static.strengthlevel.com/images/exercises/good-morning/good-morning-400.avif',
        info: 'Apesar de sua complexidade,é um ótimo exercício,pois fortalece a posterior, glúteos e lombar simultâneamente.'
      }
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.title}>Treino de Pernas</Text>
        <Text style={styles.subtitle}>Aqui estão exercícios para pernas e posteriores</Text>

        {pernas.map((ex, index) => (
          <View key={index} style={{ alignItems: 'center', marginTop: 20 }}>
            <Image source={{ uri: ex.img }} style={{ width: largura, height: altura, borderRadius: 10 }} />
            <Text style={styles.text}>Nome do exercício: {ex.nome}</Text>
            <Text style={styles.text}>Músculo recrutado: {ex.musculo}</Text>
            <Text style={styles.text}>Tipo: {ex.tipo}</Text>
            {ex.sinergista && <Text style={styles.text}>Músculo auxiliar: {ex.sinergista}</Text>}
            {ex.articulacoes && <Text style={styles.text}>Tipo de movimento: {ex.articulacoes}</Text>}
            <Text style={styles.moreInfoText}>{ex.info}</Text>
          </View>
        ))}
      </View>
    );
  }
}


