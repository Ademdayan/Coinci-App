import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import {deviceHeight, deviceWidth} from '../../utils/Dimensions';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../utils/Loading';

const HomeScreen = () => {
  const [isLoading, setIsloading] = useState(false);
  const {signout, user} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [userCoinList, setUserCoinList] = useState([]);
  const [coinList, setCoinList] = useState([]);

  const usersColl = firestore().collection('users');
  const coinsColl = firestore().collection('coins');
  const userCoinsColl = firestore().collection('userCoins');

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          flexDirection: 'row',
          width: '95%',
          height: 60,
          borderWidth: 1,
          margin: 10,
          borderRadius: 20,
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          {coinList.map(x => {
            if (x.id == item.coinID) {
              return <Text key={x.id}>{x.name}</Text>;
            }
          })}
        </View>

        <View style={{flex: 1}}>
          <Text style={{textAlign: 'right', fontSize: 18}}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setIsloading(true);
    usersColl
      .doc(user.uid)
      .get()
      .then(result => {
        setCurrentUser(result.data());
        userCoinsColl.onSnapshot(querySnapshot => {
          let list = [];
          querySnapshot.forEach(doc => {
            const {userID, coinID, value} = doc.data();

            if (userID == user.uid) {
              list.push({
                id: doc.id,
                userID,
                coinID,
                value,
              });
            }
          });

          setUserCoinList(list);
        });

        coinsColl.onSnapshot(querySnapshot => {
          let list = [];
          querySnapshot.forEach(doc => {
            const {name} = doc.data();
            list.push({
              id: doc.id,
              name,
            });
          });

          setCoinList(list);
        });
      });
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
          <View
            style={{
              margin: 20,
              padding: 20,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 5,
              width: deviceWidth / 2,
              height: deviceHeight / 8,
              borderRadius: deviceWidth,
            }}>
            <Text>Merhaba</Text>
            <Text
              style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>
              {user.displayName}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                }}>
                {currentUser.TRY}
              </Text>
              <View
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 2,
                  marginLeft: 5,
                }}>
                <Text>TL</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 3, width: '90%'}}>
            <FlatList
              style={{flex: 1, width: '100%'}}
              data={userCoinList}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;