import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pokemon from './src/app/screens/pokemon';
import { StackScreen } from 'react-native-screens';
import PokemonDetalhes from './src/app/screens/detalhesPokemon';
import React from 'react';
import Main from './src/app/screens/main';
import Abilities from './src/app/screens/abilities';
import Moves from './src/app/screens/moves';
import Natures from './src/app/screens/nature';

export default function App() {
  const Stack = createStackNavigator<any>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
             name="Main"
            component={Main}
            options={{
              headerShown: false,
             }}
        >
        </Stack.Screen>
        <Stack.Screen
             name="Abilities"
            component={Abilities}
            options={{
              headerShown: false,
             }}
        >
        </Stack.Screen>
                <Stack.Screen
             name="Moves"
            component={Moves}
            options={{
              headerShown: false,
             }}
        >
        </Stack.Screen>
        <Stack.Screen
          name="Natures"
          component={Natures}
          options={{ headerShown: false }}
         />
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
