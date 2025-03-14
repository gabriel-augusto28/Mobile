import React, { Component } from "react";
import { View, Text, Image, Platform, ScrollView } from 'react-native';

class App extends Component {
  render() {
    return(
      <ScrollView>
        <View>
          <Text style={{color: '#1C1C1C', fontSize: 25, margin: 10, fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
            Auxiliar de treino
          </Text>
          <Text style={{
            fontFamily: Platform.select({
              android: 'Open Sans',
              ios: 'Open Sans',
            }),
            fontWeight: 'normal',
            textAlign: 'center'
          }}>
            Exercícios 
          </Text>

          <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, margin: 10, alignItems: 'center' }}>
            <Image
              source={{uri: 'https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif'}}
              style={{width: 250, height: 250}}
            />
            <Text style={{ fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
              Supino reto com barra
            </Text>
            <Text style={{ fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
              Músculo recrutado: Peitoral
            </Text>
            <Text style={{ fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
              Tipo do exercício: Peso livre 
            </Text>
          </View>

          <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, margin: 10, alignItems: 'center' }}>
            <Image
              source={{uri: 'https://static.strengthlevel.com/images/exercises/incline-bench-press/incline-bench-press-800.jpg'}}
              style={{width: 250, height: 250, marginTop: 10}}
            />
            <Text style={{ fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
              Supino inclinado com barra
            </Text>
            <Text style={{ fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
              Músculo recrutado: Peitoral
            </Text>
            <Text style={{ fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
              Tipo do exercício: Peso livre 
            </Text>
          </View>

          <Jobs largura={250} altura={250}/>
        </View>
      </ScrollView>
    );
  }
}

export default App;

// Processo de Carregamento rápido da aplicação
class Jobs extends Component {
  render() {
    let img = 'https://static.strengthlevel.com/images/exercises/machine-chest-fly/machine-chest-fly-800.jpg';
    
    return(
      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, margin: 10, alignItems: 'center' }}>
        <Image
          source={{uri: img}}
          style={{width: this.props.largura, height: this.props.altura}}
        />
        <Text style={{ fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
          Nome do exercício: Crucifixo com máquina
        </Text>
        <Text style={{ fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
          Músculo recrutado: Peitoral
        </Text>
        <Text style={{ fontFamily: 'Open Sans', fontWeight: 'normal', textAlign: 'center'}}>
          Tipo do exercício: Máquina 
        </Text>
      </View>
    );
  }
}
