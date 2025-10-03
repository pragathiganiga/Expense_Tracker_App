import { useContext, useEffect, useState } from 'react';
import ExpenseOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expense-context';
import { fetchExpenses, deleteExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';

function AllExpense() {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function getExpenses() {
      try {
        setIsFetching(true);
        const expenses = await fetchExpenses();

        if (expenses && Array.isArray(expenses)) {
          // Each expense must have proper date object
          const expensesWithDate = expenses.map(exp => ({
            ...exp,
            date: new Date(exp.date),
          }));
          expensesCtx.setExpense(expensesWithDate); // use correct context function
        } else {
          expensesCtx.setExpense([]);
        }
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
        expensesCtx.setExpense([]);
      } finally {
        setIsFetching(false);
      }
    }

    getExpenses();
  }, []);

  async function deleteHandler(expenseId) {
    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);
    } catch (error) {
      console.error('Failed to delete expense:', error);
      Alert.alert('Error', 'Could not delete the expense. Try again later.');
    }
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpenseOutput
      expenses={expensesCtx.expenses}
      expensePeriod="Total"
      fallbackText="No registered expenses found!"
      onDeleteExpense={deleteHandler}
    />
  );
}

export default AllExpense;
