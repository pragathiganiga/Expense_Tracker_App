import { useContext, useEffect } from 'react';
import ExpenseOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expense-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

function RecentExpense() {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        // Ensure we have an array and convert date strings to Date objects
        if (expenses && Array.isArray(expenses)) {
          const expensesWithDate = expenses.map(exp => ({
            ...exp,
            date: new Date(exp.date),
          }));
          expensesCtx.setExpense(expensesWithDate); // ✅ fixed naming
        } else {
          expensesCtx.setExpense([]);
        }
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
        expensesCtx.setExpense([]);
      }
    }

    getExpenses();
  }, []);

  const expensesArray = expensesCtx.expenses || [];

  const recentExpenses = expensesArray.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpenseOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpense;
