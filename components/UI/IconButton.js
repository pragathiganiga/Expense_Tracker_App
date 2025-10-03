import { Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      hitSlop={10}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
