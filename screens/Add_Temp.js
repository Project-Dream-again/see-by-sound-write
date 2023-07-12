import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import axios from 'axios';

const baseUrl = 'https://see-by-sound-api.run.goorm.site'

export default function App({ navigation }) {
  const [name, setname] = useState('');
  const [des, setdes] = useState('');
  //https://see-by-sound-api.run.goorm.site/upload?name={name}&description={description}
  const [data, setData] = useState(null);

  const getAPI = async () => {
    if (name === '' || des === '') {
      Alert.alert('입력 오류', '이름과 설명을 입력해주세요.');
      return;
    }

    // API 호출
    axios.get('https://see-by-sound-api.run.goorm.site/upload?name='+name+'&description='+des)
      .then(response => {
        // 성공적인 응답을 받은 경우
        // 데이터 저장
        setData(response.data);
        // Alert 표시
        Alert.alert('API 호출 성공', `확인을 누른 후 NFC를 휴대폰 뒷면에 올려주세요.`);
        NFCWriteURL(response.data)
      })
      .catch(error => {
        // API 호출 중 에러가 발생한 경우
        // Alert 표시
        Alert.alert('API 호출 에러', 'API 호출 중 에러가 발생했습니다.');
      });
  };

  // 코드 나누기

  useEffect(() => {
    // 컴포넌트가 마운트될 때 NFC 기능 활성화
    NfcManager.start();

    return () => {
      // 컴포넌트가 언마운트될 때 NFC 기능 비활성화
      NfcManager.stop();
    };
  }, []);

  const writeUrlToTag = async (url) => {
    let result = false;

    try {
      // NFC 태그 감지 설정
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
      }
    } catch (error) {
      console.warn(error);
    } finally {
      // NFC 태그 감지 설정 해제
      NfcManager.cancelTechnologyRequest();
    }

    if (result) {
      Alert.alert('성공', 'NFC 태그에 정상적으로 입력되었습니다.');
    } else {
      Alert.alert('실패', 'NFC 태그에 붙어있지 않거나 다른 문제로 취소되었습니다.');
    }
  };

  const NFCWriteURL = (url) => {
    writeUrlToTag(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}><Text style={styles.title}>추가</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="메뉴 및 물건의 이름을 입력해주세요."
            onChangeText={newname => setname(newname)}
            defaultValue={name}
          />
          <TextInput
            style={styles.input2}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="메뉴 및 물건을 설명해주세요."
            onChangeText={newdes => setdes(newdes)}
            defaultValue={des}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => getAPI()}
        >
          <Text style={styles.buttonText}>✅</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>❌</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE1DE',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleContainer: {
    height: '80%',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 100,
    height: '0%',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    textAlignVertical: 'center',
    flexDirection: 'row',
  },
  inputContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  listContainer: {
    marginHorizontal: 20,
    marginVertical: 25,
    marginBottom: 50,
    width: 300,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: 5,
    marginTop: 25
  },
  button: {
    width: "50%",
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    padding: 10,
    marginLeft: 10
  },
  button2: {
    width: "100%",
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    padding: 10,
    marginRight: 10,
  },
  buttonText: {
    width: '100%',
    height: '100%',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  input: {
    height: 60,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: 'transparent'
  },
  input2: {
    height: 240,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: 'transparent',
    textAlignVertical: 'top',
  },
  text: {
    fontSize: 18,
  }
});
