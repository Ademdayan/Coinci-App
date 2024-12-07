import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  ImageBackground,
  Modal,
} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Loading from '../../utils/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconAD from 'react-native-vector-icons/AntDesign';

import {ActivityIndicator} from 'react-native-paper';

const ProfilScreen = () => {
  const [isLoading, setIsloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState();
  const [uploadTask, setUploadTask] = useState();
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});
  const {signout, user} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserName, setCurrentUserName] = useState('');
  const usersColl = firestore().collection('users');
  const [showModal, setShowModal] = useState(false);

  const onTakePhoto = async () => {
    await launchCamera({mediaType: 'photo', saveToPhotos: true}, onMediaSelect);
  };

  const onSelectImagePress = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', saveToPhotos: true},
      onMediaSelect,
    );
  };

  const onMediaSelect = async media => {
    if (!media.didCancel) {
      setIsUploading(true);
      const reference = storage().ref(
        'Uploads/Users/' + media.assets[0].fileName,
      );

      const task = reference.putFile(media.assets[0].uri);

      task.then(async () => {
        const downloadURL = await reference.getDownloadURL();
        setDownloadURL(downloadURL);
        await usersColl.doc(user.uid).update({
          ImageUrl: downloadURL,
        });
        setIsUploading(false);
        setUploadTaskSnapshot({});
        setShowModal(false);
        getCurrentUser();
      });
    }
  };

  const getCurrentUser = async () => {
    usersColl
      .doc(user.uid)
      .get()
      .then(result => {
        setCurrentUser(result.data());
        setCurrentUserName(result.data().Name);
      });
  };

  const updateCurrentUser = async () => {
    setIsloading(true);

    await usersColl.doc(user.uid).update({
      Name: currentUserName,
    });

    await user.updateProfile({
      displayName: currentUserName,
    });
    getCurrentUser();
    setIsloading(false);
  };

  useEffect(() => {
    setIsloading(true);
    getCurrentUser();
    setIsloading(false);
    return null;
  }, []);

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onRequestClose={() => {
              alert('Güle Güle!');
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#eee',
                padding: 10,
                margin: 20,
              }}>
              <TouchableOpacity
                onPress={onTakePhoto}
                style={{
                  margin: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: '#000',
                  width: '80%',
                }}>
                <Text style={{fontSize: 20}}>Fotoğraf Çek</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onSelectImagePress}
                style={{
                  marginBottom: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: '#000',
                  width: '80%',
                }}>
                <Text style={{fontSize: 20}}>Kütüphaneden Seç</Text>
              </TouchableOpacity>

              {isUploading && (
                <View
                  style={{
                    marginTop: 50,
                    marginBottom: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size={50} color="#f00" />
                  <Text style={{fontSize: 20, margin: 20}}>Uploading</Text>
                  <Text style={{fontSize: 20, margin: 20}}>
                    {(
                      (uploadTaskSnapshot.bytesTransferred /
                        uploadTaskSnapshot.totalBytes) *
                      100
                    ).toFixed(2) + '% / 100%'}
                  </Text>
                </View>
              )}

              <Button onPress={() => setShowModal(!showModal)} title="Kapat" />
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => setShowModal(!showModal)}
            style={{
              width: 100,
              height: 100,
              borderRadius: 40,
              margin: 10,
            }}>
            <ImageBackground
              source={{
                uri: currentUser.ImageUrl,
              }}
              imageStyle={{borderRadius: 50}}
              style={{
                flex: 1,
              }}></ImageBackground>

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 36,
                height: 36,
                borderRadius: 20,
                backgroundColor: '#000',
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#fff',
              }}>
              <Icon name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={{fontSize: 24}}>{currentUser.Name}</Text>

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
            onChangeText={value => setCurrentUserName(value)}
            value={currentUserName}
          />

          <Button onPress={() => updateCurrentUser()} title="Güncelle" />

          <TouchableOpacity
            onPress={signout}
            style={{
              position: 'absolute',
              top: 30,
              right: 30,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconAD name="logout" size={32} color="#f00" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfilScreen;