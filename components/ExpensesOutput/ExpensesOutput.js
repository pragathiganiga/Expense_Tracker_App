import { View, StyleSheet, Text } from 'react-native';
import ExpenseSummary from './ExpenseSummary';
import ExpenseList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

function ExpenseOutput({
  expenses = [],
  expensePeriod,
  fallbackText = 'No expenses found.',
}) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={expensePeriod} />
      {content}
    </View>
  );
}

export default ExpenseOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
