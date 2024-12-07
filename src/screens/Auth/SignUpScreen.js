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

const SignUpScreen = ({navigation}) => {
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecurePassConfirm, setIsSecurePassConfirm] = useState(true);

  const {signup} = useContext(AuthContext);
  const singupValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Boş geçilemez')
      .min(3, ({min}) => 'Adınız en az ' + min + ' karakter olmalıdır!'),
    phone: yup
      .string()
      .required('Boş geçilemez')
      .min(10, ({min}) => 'Adınız en az ' + min + ' karakter olmalıdır!'),
    email: yup
      .string()
      .required('Boş geçilemez')
      .email('Geçerli bir email adresi giriniz!'),
    password: yup
      .string()
      .required('Boş geçilemez')
      .min(6, ({min}) => 'Şifre en az ' + min + ' karakter olmalıdır!')
      .matches(/\w*[a-z]\w*/, 'En az 1 adet küçük harf kullanmalısınız!')
      .matches(/\w*[A-Z]\w*/, 'En az 1 adet büyük harf kullanmalısınız!')
      .matches(/\d/, 'En az 1 adet rakam kullanmalısınız!')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'En az 1 adet özel karakter kullanmalısınız!',
      ),
    passwordConfirm: yup
      .string()
      .required('Boş geçilemez')
      .oneOf([yup.ref('password')], 'Şifreler uyumsuz'),
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
        <Text style={{fontSize: 24}}>Üye Kayıt</Text>
        <Formik
          validationSchema={singupValidationSchema}
          initialValues={{
            name: '',
            phone: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          onSubmit={values =>
            signup(values.email, values.password, values.name, values.phone, navigation)
          }>
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
                name="name"
                placeholder="Adınız"
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
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType="email-address"
              />
              {errors.name && (
                <Text style={{color: '#f00', fontSize: 14}}>{errors.name}</Text>
              )}
              <TextInput
                name="phone"
                placeholder="Telefon Numaranız (5321645027)"
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
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="phone-pad"
              />
              {errors.phone && (
                <Text style={{color: '#f00', fontSize: 14}}>
                  {errors.phone}
                </Text>
              )}
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
                  name="passwordConfirm"
                  placeholder="Şifreniz (Doğrula)"
                  style={{
                    height: 50,
                    width: '70%',
                    borderWidth: 0,
                    fontSize: 16,
                  }}
                  onChangeText={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  value={values.passwordConfirm}
                  secureTextEntry={isSecurePassConfirm}
                />

                <TouchableOpacity
                  onPress={() => setIsSecurePassConfirm(!isSecurePassConfirm)}>
                  <Icon
                    style={{marginRight: 10}}
                    size={20}
                    name={isSecurePassConfirm ? 'eye-slash' : 'eye'}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>
              {errors.passwordConfirm && (
                <Text style={{color: '#f00', fontSize: 14}}>
                  {errors.passwordConfirm}
                </Text>
              )}
              <View style={{width: '50%'}}>
                <Button
                  color="#f00"
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Kaydet"
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;