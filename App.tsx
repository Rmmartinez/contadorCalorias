/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import Routes from './src/routes/Routes';
import { StyleSheet } from 'react-native';



function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Routes/>
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  
});

