import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function App({ navigation }) {
  const store
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}><Text style={styles.title}>검색</Text>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          enterKeyHint='search'
          inputMode='search'
          placeholder="가게 이름을 입력해주세요."
        /></View>
        <ScrollView style={styles.listContainer}>
          <TouchableOpacity style={styles.list}><Text style={styles.text}>{}</Text></TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
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
    width: 50,
    height: '0%',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    textAlignVertical: 'center',
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
    width: "100%",
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    padding: 10,
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
  list: {
    height: 45,
    width: 300,
    marginVertical: 7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFBDBD',
    borderColor: 'transparent',
    justifyContent: 'center',
    verticalAlign: 'middle',
    textAlignVertical: 'center',
  },
  text: {
    fontSize: 18,
  }
});
