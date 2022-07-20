import { View, Text,StyleSheet,Image,useWindowDimensions,ScrollView,Alert} from 'react-native'
import React,{useState} from 'react'
import Logo from '../assets/images/Logo_2.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import SocialSignInButtons from '../components/SocialSignInButtons'
import { useForm,Controller } from 'react-hook-form'
import { Auth } from 'aws-amplify'

const SignInScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  const {height} = useWindowDimensions();

  const {control,handleSubmit} = useForm();



  const onSignInPressed=async (data)=>{
    if  (loading){
      return
    }

    setLoading(true);

    try {
     const response =  await Auth.signIn(data.username, data.password);
     console.log(response)
    } catch (error) {
      Alert.alert('Opps', error.message)
    }
    
    setLoading(false)
  }

  const onForgotPasswordPressed=()=>{
    navigation.navigate('ForgotPassword')
  }


  const onSignUpPressed=()=>{
    navigation.navigate('SignUp')
  }
  

  return (
   <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Image 
      source={Logo} 
      style={[styles.logo,{height:height*0.3}]}
      />

      <CustomInput 
      placeholder='username' 
      control={control} 
      name={'username'} 
      rules={{required:'Username is required'}} 
      />

      <CustomInput 
      placeholder='password' 
      secureTextEntry 
      control={control} 
      name={'password'}  
      rules={{required:'Password is required', 
      minLength :{
        value:3, 
        message:'Password should be minimum 3 character'
      }}} 
      />

      <CustomButton  text={loading ? 'Loading...' : 'Sign In'} onPress={handleSubmit(onSignInPressed)}/>

       <CustomButton 
        text='Forgot Password?'
        onPress={onForgotPasswordPressed}
        type='TERTIARY'
       />
      <SocialSignInButtons />
       <CustomButton 
        text="Don't have an account? Create one"
        onPress={onSignUpPressed}
        type='TERTIARY'
       />
    </View>
   </ScrollView>
  )
}

export default SignInScreen;

const styles= StyleSheet.create({
  root:{
    alignItems:'center',
    padding:20,
    
  },
   logo:{
     width:'70%',
     maxWidth:300,
     maxHeight:200,
     resizeMode:'contain',
   }
})