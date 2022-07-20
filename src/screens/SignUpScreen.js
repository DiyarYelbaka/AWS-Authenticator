import { View, Text,StyleSheet,ScrollView,Alert } from 'react-native'
import React,{useState} from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import SocialSignInButtons from '../components/SocialSignInButtons'
import { useForm } from "react-hook-form";
import { Auth } from 'aws-amplify'

const EMAIL_REGEX = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignUpScreen = ({navigation}) => {

  const [loading, setLoading] = useState(false)

 const { control, handleSubmit, watch } = useForm();
 const pwd = watch('password')

  const onRegisterPressed=async(data)=>{
    const {username, password, email, name} = data;

    if  (loading){
      return
    }

    setLoading(true);
    try {
      await Auth.signUp({
        username,
        password,
        attributes:{email,name,preferred_username: username}
      });
      navigation.navigate('ConfirmEmail',{username})
      
    } catch (error) {
      Alert.alert('Oopes',error.message)
      
    }
    setLoading(false);
  }

  const onForgotPasswordPressed=()=>{
    navigation.navigate('ForgotPassword')
  }

  const onSignInPressed=()=>{
    navigation.navigate('SignIn')
  }
  
  return (
   <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>
          Create an account
      </Text>
  
      <CustomInput
      placeholder='Name'
      control={control}
      name={'name'}
      rules={{required:'Name is required', 
      minLength :{
        value:3, 
        message:'Name should be at least  3 character long'
      },
      maxLength :{
        value:24, 
        message:'Name should be max  24 character long',
      },
      }}
      />
 
      <CustomInput
      placeholder='Username'
      control={control}
      name={'username'}
      rules={{required:'username is required', 
      minLength :{
        value:3, 
        message:'Username should be at least  3 character long'
      },
      maxLength :{
        value:24, 
        message:'Username should be max  24 character long',
      },
      }}
      />
      <CustomInput
      placeholder='Email'
      control={control}
      name={'email'}
      rules={{
        pattern :{value: EMAIL_REGEX, message :'Email is invalid'},
        required:'Email is required',
      }
      }
      />
      <CustomInput
      placeholder='password'
      control={control}
      name={'password'}
      secureTextEntry
      rules={{required:'password is required', 
       minLength :{
        value:3, 
        message:'Password should be at least  3 character long'
       },
      }}
       />
       <CustomInput
      placeholder='Repeat Password'
      control={control}
      name={'password-repeat'}
      secureTextEntry
      rules={{
        validate:value => value == pwd || 'password do not match'
       }}
       />


       <CustomButton 
        text={loading ? 'Loading...' : 'Sign In'}
        onPress={handleSubmit(onRegisterPressed)}
        type='PRIMARY'
       />
       <Text style={styles.text}>By registering,you confirm that you accept our{' '}
           <Text style={styles.link}>Terms of Use</Text>{' '}
            and <Text style={styles.link}>Privacy Policy</Text> 
       </Text>
       <CustomButton 
        text='Forgot Password?'
        onPress={onForgotPasswordPressed}
        type='TERTIARY'
       />
       <SocialSignInButtons />
       <CustomButton 
        text="Have an account? Sign in"
        onPress={onSignInPressed}
        type='TERTIARY'
       />
    </View>
   </ScrollView>
  )
}

export default SignUpScreen;

const styles= StyleSheet.create({
  root:{
    alignItems:'center',
    padding:20,
    
  },
   title:{
       fontSize:24,
       fontWeight:'bold',
       color:'#051C60',
       margin:10,
   },
   text:{
    color:'gray',
    marginVertical :10,
   },
   link:{
    color:'#FDB075'
   },
})