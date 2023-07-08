import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function App({ navigation }) {
  //https://see-by-sound-api.onrender.com/upload?name={name}&description={description}

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}><Text style={styles.title}>추가</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            autoComplete='name'
            enterKeyHint='done'
            inputMode='text'
            placeholder="물건의 이름을 입력해주세요."
          />
          <TextInput
            style={styles.input2}
            autoCapitalize='none'
            autoComplete='none'
            enterKeyHint='done'
            inputMode='text'
            placeholder="물건의 이름을 설명해주세요."
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.button2}
            onPress={() => Alert.alert("테스트")}
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
