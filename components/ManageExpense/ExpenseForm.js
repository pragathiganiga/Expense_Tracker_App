import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount?.toString() || '',
      isValid: true,
    },
    date: {
      value: defaultValues?.date ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues?.description || '',
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    // For amount, allow only numbers with up to 2 decimal places
    if (inputIdentifier === 'amount') {
      enteredValue = enteredValue.replace(/[^0-9.]/g, '');
      const parts = enteredValue.split('.');
      if (parts.length > 2) enteredValue = parts[0] + '.' + parts[1];
      if (parts[1] && parts[1].length > 2)
        enteredValue = parts[0] + '.' + parts[1].slice(0, 2);
    }

    // For description, limit to 100 words
    if (inputIdentifier === 'description') {
      const words = enteredValue.trim().split(/\s+/);
      if (words.length > 100) enteredValue = words.slice(0, 100).join(' ');
    }

    setInputs(curInputs => ({
      ...curInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: parseFloat(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value.trim(),
    };

    // Amount validation: >0 and max 10 digits with 2 decimals
    const amountIsValid =
      !isNaN(expenseData.amount) &&
      expenseData.amount > 0 &&
      /^\d{1,10}(\.\d{1,2})?$/.test(inputs.amount.value);

    // Date validation: YYYY-MM-DD
    const dateIsValid =
      /^\d{4}-\d{2}-\d{2}$/.test(inputs.date.value) &&
      !isNaN(expenseData.date.getTime());

    // Description validation: max 100 words
    const descriptionIsValid =
      expenseData.description.split(/\s+/).length <= 100 &&
      expenseData.description.length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs(curInputs => ({
        amount: { value: curInputs.amount.value, isValid: amountIsValid },
        date: { value: curInputs.date.value, isValid: dateIsValid },
        description: {
          value: curInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          {!inputs.amount.isValid &&
            '⚠ Amount must be a number up to 10 digits and max 2 decimals.\n'}
          {!inputs.date.isValid && '⚠ Date must be in YYYY-MM-DD format.\n'}
          {!inputs.description.isValid &&
            '⚠ Description cannot exceed 100 words.'}
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
