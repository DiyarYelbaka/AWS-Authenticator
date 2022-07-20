import { View, Text,StyleSheet,ScrollView,Alert } from 'react-native'
import React,{useState} from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useForm} from 'react-hook-form'
import { useRoute } from '@react-navigation/native'
import { Auth } from 'aws-amplify'

const ConfirmEmailScreen = ({navigation}) => {
  const route =useRoute();
  const {control,handleSubmit,watch} = useForm({
    defaultValues : {username: route?.params?.username}
  });

  const [loading, setLoading] = useState(false)
  
  const username = watch('username');

  const onConfirmPressed=async(data)=>{
    if  (loading){
      return
    }

    setLoading(true);

    try {
      await Auth.confirmSignUp(data.username,data.code);
      navigation.navigate('SignIn')
    } catch (error) {
      Alert.alert('Oops', error.message)
    }
   setLoading(false);
  }

  const onResendPressed=async()=>{
    try {
      await Auth.resendSignUp(username);
      Alert.alert('Success', 'Code was resent to your email')
    } catch (error) {
      Alert.alert('Oops', error.message)
    }
  
  }

  const onSignInPressed=()=>{
    navigation.navigate('SignIn')
  }
  
  return (
   <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>
          Confirm your email
      </Text>
      <CustomInput
      placeholder='Username'
      name={'username'}
      control={control}
      rules={{
        required:'code is required'
      }}
      />

      <CustomInput
      placeholder='Enter tour confirmation code'
      name={'code'}
      control={control}
      rules={{
        required:'code is required'
      }}
      />
       <CustomButton 
        text={loading ? 'Loading...' : 'Confirm'}
        onPress={handleSubmit(onConfirmPressed)}
       />

       <CustomButton 
        text='Resend Code'
        onPress={onResendPressed}
        type='SECONDARY'
       />
       <CustomButton 
        text="Back to Sign in"
        onPress={onSignInPressed}
        type='TERTIARY'
       />
    </View>
   </ScrollView>
  )
}

export default ConfirmEmailScreen;

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