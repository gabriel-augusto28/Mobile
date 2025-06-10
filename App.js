import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Switch, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
function useFichaTreino() {
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
  const limparFicha = () => {
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
  };
  const getFichaData = () => ({
    nome,
    idade,
    peso,
    objetivo,
    nivel,
    treino,
    intensidade,
    tempo,
    alongamento,
    aquecimento,
  });
  return {
    nome, setNome, idade, setIdade, peso, setPeso, objetivo, setObjetivo, nivel, setNivel, treino, setTreino, intensidade, setIntensidade, tempo, setTempo, alongamento, setAlongamento, aquecimento, setAquecimento, limparFicha, getFichaData,
  };
}
function LoginScreen({ signIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleAuth = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (isRegistering) {
      Alert.alert('Registro', `Usuário ${username} registrado com sucesso!`);
    } else {
      Alert.alert('Login', `Bem-vindo, ${username}!`);
    }
    setIsLoading(false);
    signIn(username);
  };
  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>{isRegistering ? 'Registrar' : 'Login'}</Text>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/295/295128.png' }}
        style={styles.loginImage} />
      <TextInput placeholder="Nome de Usuário" style={estilos.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput placeholder="Senha" style={estilos.input} value={password} onChangeText={setPassword} secureTextEntry />
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1E90FF" />
        ) : (
          <Button title={isRegistering ? 'Registrar' : 'Entrar'} onPress={handleAuth} color="#1E90FF" />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title={isRegistering ? 'Já tenho conta' : 'Criar uma conta'} onPress={() => setIsRegistering(!isRegistering)} color="#32CD32" />
      </View>
    </View>
  );
}
function DashboardScreen({ navigation }) {
  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>Dashboard do App</Text>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3257/3257121.png' }}
        style={styles.homeImage} />
      <Text style={styles.sobreText}>Aqui você encontra um resumo do seu progresso!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Criar Nova Ficha de Treino" onPress={() => navigation.navigate('GerenciarFicha', { screen: 'NovaFicha' })} color="#1E90FF" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ver Detalhes do Dia" onPress={() => navigation.navigate('ItemDetail', { itemId: 123, itemName: 'Treino de Pernas' })} color="#32CD32" />
      </View>
    </View>
  );
}
function FichaTreinoScreen({ navigation }) {
  const ficha = useFichaTreino();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (ficha.intensidade > 80) {
      Alert.alert('Atenção!', 'A intensidade do treino está muito alta. Tenha cuidado!');
    }
  }, [ficha.intensidade]);
  const salvarEVerDetalhes = async () => {
    const dadosFicha = ficha.getFichaData();
    if (!dadosFicha.nome || !dadosFicha.idade || !dadosFicha.peso || !dadosFicha.objetivo) {
      Alert.alert('Campos Vazios', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    navigation.navigate('DetalhesTreino', { ficha: dadosFicha });
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Ficha de Treino</Text>
      <TextInput placeholder="Nome Completo" style={estilos.input} value={ficha.nome} onChangeText={ficha.setNome} />
      <TextInput placeholder="Idade" keyboardType="numeric" style={estilos.input} value={ficha.idade} onChangeText={ficha.setIdade} />
      <TextInput placeholder="Peso (kg)" keyboardType="numeric" style={estilos.input} value={ficha.peso} onChangeText={ficha.setPeso} />
      <TextInput placeholder="Objetivo Principal" style={estilos.input} value={ficha.objetivo} onChangeText={ficha.setObjetivo} />
      <Text style={estilos.label}>Nível de Treino:</Text>
      <Picker selectedValue={ficha.nivel} onValueChange={ficha.setNivel} style={estilos.picker}>
        <Picker.Item label="Iniciante" value="Iniciante" />
        <Picker.Item label="Intermediário" value="Intermediário" />
        <Picker.Item label="Avançado" value="Avançado" />
      </Picker>
      <Text style={estilos.label}>Grupo Muscular do Dia:</Text>
      <Picker selectedValue={ficha.treino} onValueChange={ficha.setTreino} style={estilos.picker}>
        <Picker.Item label="Peito" value="Peito" />
        <Picker.Item label="Costas" value="Costas" />
        <Picker.Item label="Pernas" value="Pernas" />
        <Picker.Item label="Braços" value="Braços" />
        <Picker.Item label="Ombros" value="Ombros" />
      </Picker>
      <Text style={estilos.label}>Intensidade do Treino: {ficha.intensidade}%</Text>
      <Slider style={estilos.slider} minimumValue={0} maximumValue={100} step={1} value={ficha.intensidade} onValueChange={ficha.setIntensidade} minimumTrackTintColor="#1E90FF" maximumTrackTintColor="#000" />
      <Text style={estilos.label}>Tempo de Treino: {ficha.tempo} min</Text>
      <Slider style={estilos.slider} minimumValue={30} maximumValue={120} step={5} value={ficha.tempo} onValueChange={ficha.setTempo} minimumTrackTintColor="#32CD32" maximumTrackTintColor="#000" />
      <View style={estilos.switchContainer}>
        <Text>Alongamento Incluso</Text>
        <Switch value={ficha.alongamento} onValueChange={ficha.setAlongamento} />
      </View>
      <View style={estilos.switchContainer}>
        <Text>Aquecimento Incluso</Text>
        <Switch value={ficha.aquecimento} onValueChange={ficha.setAquecimento} />
      </View>
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1E90FF" />
        ) : (
          <Button title="Salvar e Ver Detalhes" onPress={salvarEVerDetalhes} color="#1E90FF" />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Limpar Tudo" onPress={ficha.limparFicha} color="#FF4500" />
      </View>
      <Text style={styles.imageSectionTitle}>Exemplos de Exercícios:</Text>
      <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/incline-bench-press/incline-bench-press-800.jpg' }} style={estilos.imagem} />
      <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif' }} style={estilos.imagem} />
      <Image source={{ uri: 'https://static.strengthlevel.com/images/exercises/hammer-curl/hammer-curl-400.avif' }} style={estilos.imagem} />
    </ScrollView>
  );
}
function DetalhesTreinoScreen({ route, navigation }) {
  const { ficha } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Detalhes da Ficha Salva</Text>
      <View style={styles.detailsCard}>
        <Text style={estilos.detalheItem}>👤 Nome: {ficha.nome}</Text>
        <Text style={estilos.detalheItem}>🎂 Idade: {ficha.idade}</Text>
        <Text style={estilos.detalheItem}>⚖️ Peso: {ficha.peso} kg</Text>
        <Text style={estilos.detalheItem}>🎯 Objetivo: {ficha.objetivo}</Text>
        <Text style={estilos.detalheItem}>💪 Nível: {ficha.nivel}</Text>
        <Text style={estilos.detalheItem}>🏋️ Treino do Dia: {ficha.treino}</Text>
        <Text style={estilos.detalheItem}>🔥 Intensidade: {ficha.intensidade}%</Text>
        <Text style={estilos.detalheItem}>⏱️ Tempo: {ficha.tempo} min</Text>
        <Text style={estilos.detalheItem}>🧘 Alongamento: {ficha.alongamento ? 'Sim' : 'Não'}</Text>
        <Text style={estilos.detalheItem}>🏃 Aquecimento: {ficha.aquecimento ? 'Sim' : 'Não'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Voltar para Ficha" onPress={() => navigation.goBack()} color="#1E90FF" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ir para Dashboard" onPress={() => navigation.navigate('DashboardStack', { screen: 'Dashboard' })} color="#32CD32" />
      </View>
    </ScrollView>
  );
}
function ItemDetailScreen({ route }) {
  const { itemId, itemName } = route.params;
  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>Detalhes do Item</Text>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2852/2852233.png' }}
        style={styles.sobreImage} />
      <Text style={styles.sobreText}>ID do Item: {itemId}</Text>
      <Text style={styles.sobreText}>Nome: {itemName}</Text>
      <Text style={styles.sobreText}>Informações adicionais sobre este item específico, talvez um plano de treino detalhado ou métricas de progresso.</Text>
    </View>
  );
}
function ExerciciosScreen() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = 'djMH5UXWIz3g0yym6+Tu0Q==Bk6EGSnJgTzCJOtN';
  const muscle = 'biceps';
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey
          },
        });
        if (!response.ok) throw new Error('Falha ao buscar dados. Verifique a chave da API.');
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);
  if (loading) {
    return <View style={styles.containerCenter}><ActivityIndicator size="large" color="#2E8B57" /></View>;
  }
  if (error) {
    return <View style={styles.containerCenter}><Text style={{ color: 'red' }}>{error}</Text></View>;
  }
  return (
    <FlatList data={exercises} keyExtractor={(item, index) => `${item.name}-${index}`} contentContainerStyle={styles.scrollContainer} ListHeaderComponent={<Text style={styles.title}>Exercícios para {muscle.charAt(0).toUpperCase() + muscle.slice(1)}</Text>} renderItem={({ item }) => (
      <View style={estilos.exerciseCard}>
        <Text style={estilos.exerciseName}>{item.name}</Text>
        <Text style={estilos.detalheItem}>Tipo: {item.type}</Text>
        <Text style={estilos.detalheItem}>Equipamento: {item.equipment}</Text>
        <Text style={estilos.detalheItem}>Dificuldade: {item.difficulty}</Text>
        <Text style={estilos.exerciseInstructions}>Instruções: {item.instructions}</Text>
      </View>
    )} />
  );
}
function ProfileScreen({ signOut }) {
  const [profileName, setProfileName] = useState('Usuário Teste');
  const [profileEmail, setProfileEmail] = useState('usuario@example.com');
  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: () => signOut() }
      ]
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }}
        style={styles.loginImage} />
      <Text style={estilos.label}>Nome:</Text>
      <TextInput style={estilos.input} value={profileName} onChangeText={setProfileName} />
      <Text style={estilos.label}>Email:</Text>
      <TextInput style={estilos.input} value={profileEmail} onChangeText={setProfileEmail} keyboardType="email-address" />
      <Text style={styles.imageSectionTitle}>Configurações</Text>
      <View style={estilos.switchContainer}>
        <Text>Notificações</Text>
        <Switch value={true} onValueChange={() => { }} />
      </View>
      <View style={estilos.switchContainer}>
        <Text>Modo Escuro</Text>
        <Switch value={false} onValueChange={() => { }} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Salvar Alterações" onPress={() => Alert.alert('Salvar', 'Alterações salvas!')} color="#1E90FF" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sair do App" onPress={handleLogout} color="#FF4500" />
      </View>
    </ScrollView>
  );
}
function SobreScreen() {
  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>Sobre o Aplicativo</Text>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10000/10000978.png' }} style={styles.sobreImage} />
      <Text style={styles.sobreText}>Este é um aplicativo para gerenciamento de fichas de treino.</Text>
      <Text style={styles.sobreText}>Versão 1.0.0</Text>
      <Text style={styles.sobreText}>Desenvolvido com React Native.</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const MenuButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
    <Text style={{ fontSize: 28, color: 'white' }}>☰</Text>
  </TouchableOpacity>
);
function AuthStackNavigator({ signIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={(props) => <LoginScreen {...props} signIn={signIn} />} />
    </Stack.Navigator>
  );
}
function DashboardStackNavigator({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#32CD32' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerLeft: () => <MenuButton navigation={navigation} />,
    }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={{ title: 'Detalhes do Item' }} />
    </Stack.Navigator>
  );
}
function FichaStackNavigator({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#1E90FF' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerLeft: () => <MenuButton navigation={navigation} />,
    }}>
      <Stack.Screen name="NovaFicha" component={FichaTreinoScreen} options={{ title: 'Criar Ficha' }} />
      <Stack.Screen name="DetalhesTreino" component={DetalhesTreinoScreen} options={{ title: 'Detalhes da Ficha' }} />
    </Stack.Navigator>
  );
}
function ExerciciosStackNavigator({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#2E8B57' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerLeft: () => <MenuButton navigation={navigation} />,
    }}>
      <Stack.Screen name="ListaExercicios" component={ExerciciosScreen} options={{ title: 'Buscar Exercícios' }} />
    </Stack.Navigator>
  );
}
function ProfileStackNavigator({ navigation, signOut }) {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#FF8C00' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerLeft: () => <MenuButton navigation={navigation} />,
    }}>
      <Stack.Screen name="MeuPerfil" component={(props) => <ProfileScreen {...props} signOut={signOut} />} options={{ title: 'Meu Perfil' }} />
    </Stack.Navigator>
  );
}
function CustomDrawerContent(props) {
  const { signOut } = props;
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#f9f9f9' }}>
      <View style={styles.drawerHeader}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3043/3043235.png' }} style={styles.drawerImage} />
        <Text style={styles.drawerHeaderText}>Meu App Fitness</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Ajuda" onPress={() => Alert.alert('Ajuda', 'Esta é a seção de ajuda do aplicativo. Em breve mais informações!')} icon={() => <Text style={{ fontSize: 20 }}>❓</Text>} labelStyle={{ marginLeft: -20, fontSize: 15 }} />
      <DrawerItem label="Sair" onPress={signOut}
        icon={() => <Text style={{ fontSize: 20 }}>🚪</Text>} labelStyle={{ marginLeft: -20, fontSize: 15 }} />
    </DrawerContentScrollView>
  );
}
function AppDrawerNavigator({ signOut }) {
  return (
    <Drawer.Navigator initialRouteName="DashboardStack" drawerContent={props => <CustomDrawerContent {...props} signOut={signOut} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#1E90FF',
        drawerInactiveTintColor: 'gray',
        drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
      }}>
      <Drawer.Screen name="DashboardStack" component={DashboardStackNavigator} options={{ title: 'Dashboard', drawerIcon: ({ color }) => <Text style={{ fontSize: 20, color: color }}>📊</Text> }} />
      <Drawer.Screen name="GerenciarFicha" component={FichaStackNavigator} options={{ title: 'Ficha de Treino', drawerIcon: ({ color }) => <Text style={{ fontSize: 20, color: color }}>🏋️</Text> }} />
      <Drawer.Screen name="BuscarExercicios" component={ExerciciosStackNavigator} options={{ title: 'Buscar Exercícios', drawerIcon: ({ color }) => <Text style={{ fontSize: 20, color: color }}>🔍</Text> }} />
      <Drawer.Screen name="MeuPerfil" component={(props) => <ProfileStackNavigator {...props} signOut={signOut} />}
        options={{ title: 'Meu Perfil', drawerIcon: ({ color }) => <Text style={{ fontSize: 20, color: color }}>👤</Text>, headerShown: false }} />
      <Drawer.Screen name="Sobre" component={SobreScreen} options={{
        title: 'Sobre o App', drawerIcon: ({ color }) => <Text style={{ fontSize: 20, color: color }}>ℹ️</Text>, headerShown: true,
        headerStyle: { backgroundColor: '#FF6347' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: (props) => (
          <TouchableOpacity onPress={() => props.onPress()} style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 28, color: 'white' }}>☰</Text>
          </TouchableOpacity>
        ),
      }} />
    </Drawer.Navigator>
  );
}
const estilos = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '100%',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  picker: {
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  imagem: {
    width: 250,
    height: 250,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
  },
  detalheItem: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  exerciseInstructions: {
    fontSize: 15,
    marginTop: 5,
    fontStyle: 'italic',
    color: '#555',
  },
});
const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  homeImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#ddd'
  },
  loginImage: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  sobreImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  sobreText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: '#555',
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 8,
  },
  imageSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    marginTop: 25,
    color: '#333',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  drawerHeader: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    marginBottom: 10,
  },
  drawerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default function App() {
  const [userToken, setUserToken] = useState(null);
  const signIn = (token) => {
    setUserToken(token);
  };
  const signOut = () => {
    setUserToken(null);
  };
  return (
    <NavigationContainer>
      {userToken ? (
        <AppDrawerNavigator signOut={signOut} />
      ) : (
        <AuthStackNavigator signIn={signIn} />
      )}
    </NavigationContainer>
  );
}
