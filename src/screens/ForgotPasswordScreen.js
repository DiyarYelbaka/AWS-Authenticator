import { View, Text,StyleSheet,ScrollView,Alert } from 'react-native'
import React,{useState} from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useForm} from 'react-hook-form'
import { Auth } from 'aws-amplify'




const ForgotPasswordScreen = ({navigation}) => {

  const [loading, setLoading] = useState(false)
 
  const {control,handleSubmit,watch} = useForm();

  const username = watch('username');

  const onSedPressed=async(data)=>{
    if  (loading){
      return
    }

    setLoading(true);

    try {
      await Auth.forgotPassword(data.username)
      navigation.navigate('NewPassword',{username})
    } catch (error) {
      Alert.alert('Oops', error.message)
    }
     setLoading(false);
  }


  const onSignInPressed=()=>{
    navigation.navigate('SignIn')
  }
  
  return (
   <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>
          Reset your password
      </Text>
      <CustomInput
      placeholder='Username'
      control={control}
      name={'username'}
      rules={{required:'username is required'}}
      />
       <CustomButton 
        text={loading ? 'Loading...' : 'Send'}
        onPress={handleSubmit(onSedPressed)}
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

export default ForgotPasswordScreen;

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