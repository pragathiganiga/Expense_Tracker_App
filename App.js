import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpense from './screens/AllExpense';
import ExpensesContextProvider from './store/expense-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverView({}) {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('ManageExpense')}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpense"
        component={RecentExpense}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Icon name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpense"
        component={AllExpense}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-dark" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="ExpensesOverView"
              component={ExpensesOverView}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                title: 'Manage Expense',
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
