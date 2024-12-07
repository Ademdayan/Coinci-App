import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Loading from '../../utils/Loading';

const PiyasaScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const getData = async () => {
    try {
      setIsloading(true);
      let response = await fetch('https://www.paribu.com/ticker');
      let responseData = await response.json();
      setData(responseData);
      setIsloading(false);
    } catch (error) {
      alert(error);
      setIsloading(false);
    }
  };
  useEffect(() => {
    getData();
    return null;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 32, color: '#f00'}}>Piyasalar</Text>
          </View>

          <ScrollView style={{flex: 1, width: '100%'}}>
            {Object.keys(data).map((key, index) => (
              <TouchableOpacity
                key={index.toString()}
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
                  <Text style={{textAlign: 'left', fontSize: 18}}>{key}</Text>
                </View>

                <View style={{flex: 1}}>
                  <Text style={{textAlign: 'right', fontSize: 18}}>
                    {data[key].last}
                  </Text>
                </View>

                <View style={{flex: 1}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 18,
                      color:
                        data[key].percentChange > 0
                          ? '#0f0'
                          : data[key].percentChange < 0
                          ? '#f00'
                          : '#000',
                    }}>
                    {data[key].percentChange}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PiyasaScreen;