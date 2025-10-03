import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ErrorOverlay() {
  return (
    <View style={styles.conatiner}>
      <Text style={[styles.text, styles.title]}>An error Occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
