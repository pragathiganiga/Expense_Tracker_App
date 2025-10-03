import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expense-context';
import { GlobalStyles } from '../constants/styles';
import {
  storeExpense,
  updateExpense,
  deleteExpense as deleteExpenseHttp,
} from '../util/http';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === editedExpenseId,
  );

  // Safe default values
  const defaultValues = selectedExpense
    ? {
        amount: selectedExpense.amount ?? '',
        date: selectedExpense.date ?? new Date(),
        description: selectedExpense.description ?? '',
      }
    : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    if (!editedExpenseId) return;

    // Show confirmation alert
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              // Delete from server
              await deleteExpenseHttp(editedExpenseId);
              // Delete from context
              expensesCtx.deleteExpense(editedExpenseId);
              // Go back to previous screen
              navigation.goBack();
            } catch (error) {
              console.error('Failed to delete expense:', error);
              Alert.alert(
                'Delete failed',
                'Could not delete this expense. Please try again later.',
              );
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ],
    );
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        // Update in context and server
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        // Add to server first
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save expense:', error);
      Alert.alert(
        'Save failed',
        'Could not save expense. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay message="Processing..." />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={defaultValues}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
