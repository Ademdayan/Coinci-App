import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';

const LoginScreen = ({navigation}) => {
  const [isSecurePass, setIsSecurePass] = useState(true);
  const {login} = useContext(AuthContext);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Boş geçilemez')
      .email('Geçerli bir email adresi giriniz!'),
    password: yup
      .string()
      .required('Boş geçilemez')
      .min(6, ({min}) => 'Şifre en az ' + min + ' karakter olmalıdır!'),
  });
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: '80%',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#ddd',
          borderRadius: 30,
        }}>
        <Text style={{fontSize: 24}}>Üye Girişi</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={values => login(values.email, values.password)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <TextInput
                name="email"
                placeholder="Email Adresiniz"
                style={{
                  height: 50,
                  width: '90%',
                  padding: 10,
                  margin: 10,
                  borderColor: '#000',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={{color: '#f00', fontSize: 14}}>
                  {errors.email}
                </Text>
              )}

              <View
                style={{
                  borderColor: '#000',
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '90%',
                  flexDirection: 'row',
                  margin: 10,
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  name="password"
                  placeholder="Şifreniz"
                  style={{
                    height: 50,
                    width: '70%',
                    borderWidth: 0,
                    fontSize: 16,
                  }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={isSecurePass}
                />

                <TouchableOpacity
                  onPress={() => setIsSecurePass(!isSecurePass)}>
                  <Icon
                    style={{marginRight: 10}}
                    size={20}
                    name={isSecurePass ? 'eye-slash' : 'eye'}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={{color: '#f00', fontSize: 14}}>
                  {errors.password}
                </Text>
              )}
              <View style={{width: '50%'}}>
                <Button
                  color="#f00"
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Giriş"
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;