import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pokemon from './src/app/screens/pokemon';
import { StackScreen } from 'react-native-screens';
import PokemonDetalhes from './src/app/screens/detalhesPokemon';

export default function App() {
  const Stack = createStackNavigator<any>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
             name="Pokedex"
            component={Pokemon}
            options={{
              headerShown: false,
             }}
        >
        </Stack.Screen>

        <Stack.Screen
             name="PokemonDetalhes"
            component={PokemonDetalhes}
            options={{
              headerShown: false,
             }}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
