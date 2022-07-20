import React from 'react'
import {View,Text,SafeAreaView,StyleSheet} from 'react-native'
import Router from './src/Router'
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

const App = ()=>{
  return(
    <SafeAreaView style={styles.root}>
      <Router />
    </SafeAreaView>
  )
}
export default App;

const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:'#f0f8ff'
  }
})

