import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem({ item }) {
  return <ExpenseItem {...item} />;
}

function ExpenseList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  );
}

export default ExpenseList;
