import { Pressable, View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Button({ children, onPress, mode, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        mode === 'flat' && styles.flat,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
        {children}
      </Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
  },
});
