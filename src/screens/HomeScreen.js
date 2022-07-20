import { View, Text,Image } from 'react-native'
import React from 'react'
import Logo from '../assets/images/Welcome.png'
import { Auth } from 'aws-amplify'

const HomeScreen = () => {
  const signOut = () =>{
    Auth.signOut();

  }
  return (
    
    <View style={{flex:1,alignItems:'center',backgroundColor:'red'}}>
      
      <Image 
      source={Logo} 
      style={{ 
      width:'70%',
      maxWidth:300,
      maxHeight:500,
      resizeMode:'contain',
      }}
      />
      <Text
      onPress={signOut}
      style={{
        width:'100%',
        textAlign:'center',
        color:'yellow',
        marginTop:'auto',
        marginVertical:20,
        fontSize:20,
      }}
      >
      Sign out
      </Text>
    </View>
  )
}

export default HomeScreen