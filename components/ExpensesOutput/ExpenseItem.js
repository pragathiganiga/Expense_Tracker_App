import { Pressable, View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';

function ExpenseItem({ id, description, amount, date }) {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate('ManageExpense', {
      expenseId: id, // Pass id so ManageExpense knows it’s an edit
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => [styles.expenseItem, pressed && styles.pressed]}
    >
      <View style={styles.infoContainer}>
        <Text style={[styles.textBase, styles.description]}>
          {description || 'No Description'}
        </Text>
        <Text style={styles.textBase}>{getFormattedDate(date) || 'N/A'}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{(amount ?? 0).toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3, // Android shadow
    shadowColor: GlobalStyles.colors.gray500, // iOS shadow
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  infoContainer: {
    flex: 1,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
