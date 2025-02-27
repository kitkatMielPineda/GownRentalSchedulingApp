import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    //padding: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    //marginVertical: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    home: {
      width: '70%',
      marginBottom: 10,
      padding: 20,
    },
    sigin: {
      width: '100%',
      padding: 15,
    },
    createAccount: {
      width: '100%',
      padding: 15,
    },
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: 'gray',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  bodyText: {
    color: '#000',
    marginTop: 15,
    fontSize: 16,
  },
  header: {
    backgroundColor: 'white',
    //alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    marginTop: Dimensions.get('window').height * 0.1,
  },
});

export default styles;
