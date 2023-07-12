import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import DropDownPicker from "react-native-dropdown-picker";
import axios from 'axios';

const baseUrl = 'https://see-by-sound-api.run.goorm.site'

export default function App({ navigation }) {
  const [barcode, setbarcode] = useState('');
  const [name, setname] = useState('');
  const [des, setdes] = useState('');
  const [price, setprice] = useState('');
  const [what, setwhat] = useState('');
  const [kcal, setkcal] = useState('');
  const [sodium, setsodium] = useState('');
  const [carbohydrates, setcarbohydrates] = useState('');
  const [sugars, setsugars] = useState('');
  const [fats, setfats] = useState('');
  const [trans_fat, settrans_fat] = useState('');
  const [saturated_fat, setsaturated_fat] = useState('');
  const [cholesterol, setcholesterol] = useState('');
  const [proteins, setproteins] = useState('');
  const [calcium, setcalcium] = useState('');


  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: '음식', value: 'food'},
    {label: '음료', value: 'drink'},
    {label: '그 외', value: 'another'}
  ]);


  //https://see-by-sound-api.run.goorm.site/upload?name={name}&description={description}
  const [data, setData] = useState(null);

  const getAPI = async () => {
    if (name === '' || des === '' || price === '') {
      Alert.alert('입력 오류', '이름과 설명, 가격을 입력해주세요.');
      return;
    }
    else if (barcode === '' && name !== '' && des !== '' && price !== '') {
      // API 호출
      axios.get('https://see-by-sound-api.run.goorm.site/upload?name='+name+'&description='+des+"가격은 "+price+"입니다.")
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
    }
    else if (barcode !== '' && name !== '' && des !== '' && price !== '' && what === '' && kcal === '' && sodium === '' && carbohydrates === '' && sugars === '' && fats === '' && trans_fat === '' && saturated_fat === '' && cholesterol === '' && proteins === '' && calcium === '') {
      Alert.alert('입력 오류', '종류나 영양정보를 입력해주세요.');
    }
    else {
      // API 호출
      axios.get(`https://see-by-sound-api.run.goorm.site/upload_food?barcode={barcode}&name={name}&description={des}&price={price}&what={what}&kcal={kcal}&sodium={sodium}&carbohydrates={carbohydrates}&sugars={sugars}&fats={fats}&trans_fat={trans_fat}&saturated_fat={saturated_fat}&cholesterol={cholesterol}&proteins={proteins}&calcium={calcium}`)
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
    }
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
      <View style={styles.titleContainer}><Text style={styles.title}>음식 추가</Text>
        <ScrollView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="바코드 / (선택) 미작성시 종류, 영양정보 미포함"
            onChangeText={newbarcode => setbarcode(newbarcode)}
            defaultValue={barcode}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="이름"
            onChangeText={newname => setname(newname)}
            defaultValue={name}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="설명 / 은(는)으로 시작해 ~이다.로 끝내주세요."
            onChangeText={newdes => setdes(newdes)}
            defaultValue={des}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="가격 / 1,000원, 2,000원 2+1 행사 상품"
            onChangeText={newprice => setprice(newprice)}
            defaultValue={price}
          />
          <View style={{ zIndex: 100 }}>
            <DropDownPicker
              style={styles.input}
              open={open}
              value={what}
              items={items}
              setOpen={setOpen}
              setValue={setwhat}
              setItems={setItems}
              listMode="SCROLLVIEW"
              nestedScrollEnabled={false}
              closeOnBackPressed={true}
              dropDownContainerStyle={{
                width: 300,
                margin: 12,
                borderRadius: 20,
              }}
            />
          </View>
          <Text style={styles.inputtext}>입력할때 단위는 입력하지 말아주세요.</Text>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="칼로리 / kcal (선택)"
            onChangeText={newkcal => setkcal(newkcal)}
            defaultValue={kcal}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="나트륨 / mg (선택)"
            onChangeText={newsodium => setsodium(newsodium)}
            defaultValue={sodium}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="탄수화물 / g (선택)"
            onChangeText={newcarbohydrates => setcarbohydrates(newcarbohydrates)}
            defaultValue={carbohydrates}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="당류 / g (선택)"
            onChangeText={newsugars => setsugars(newsugars)}
            defaultValue={sugars}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="지방 / g (선택)"
            onChangeText={newfats => setfats(newfats)}
            defaultValue={fats}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="트랜스 지방 / g (선택)"
            onChangeText={newtrans_fat => settrans_fat(newtrans_fat)}
            defaultValue={trans_fat}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="포화 지방 / g (선택)"
            onChangeText={newsaturated_fat => setsaturated_fat(newsaturated_fat)}
            defaultValue={saturated_fat}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="콜레스테롤 / mg (선택)"
            onChangeText={newcholesterol => setcholesterol(newcholesterol)}
            defaultValue={cholesterol}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="단백질 / g (선택)"
            onChangeText={newproteins => setproteins(newproteins)}
            defaultValue={proteins}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="칼슘 / mg (선택)"
            onChangeText={newcalcium => setcalcium(newcalcium)}
            defaultValue={calcium}
          />
        </ScrollView>
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
    alignContent: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    textAlignVertical: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex : 100,
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
  inputtext: {
    width: 300,
    marginHorizontal: 12,
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
