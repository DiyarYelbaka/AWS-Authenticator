import { View, Text,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import ConfirmEmailScreen from './screens/ConfirmEmailScreen';
import HomeScreen from './screens/HomeScreen';
import { Auth,Hub } from 'aws-amplify'


const Router = () => {
    const Stack = createStackNavigator();
    const [user,setUser] = useState(undefined)

    const checkUser = async() => {
      try {
        const authUser = await Auth.currentAuthenticatedUser({bypassCache:true});
        setUser(authUser)
      } catch (error) {
        setUser(null);
      }
    }
    useEffect(()=>{
      checkUser();
    },[])

    useEffect(()=>{
     const listener = (data) =>{
       if(data.payload.event === 'signIn' || data.payload.event === 'signOut'){
         checkUser();
       }
     };
     Hub.listen('auth',listener);
     return () => Hub.remove('auth',listener);
    },[])
     
   if(user === undefined){
     return(
       <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator />
       </View>
     )
   }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
         {user ? (
           <Stack.Screen name="Home" component={HomeScreen} />
         ):(
           <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          </>
         )}
         

         
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router