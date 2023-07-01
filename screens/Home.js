import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}><Text style={styles.title}>👀 By 🔈</Text></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.buttonText}>🔍</Text>
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
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: 'center',
    textAlignVertical: 'center',
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
  }
});
