import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Characters from '../screens/characters';
import Profile from '../screens/profile';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="CharacterList">
      <Stack.Screen name="CharacterList" component={Characters} />
      <Stack.Screen name="CharacterDetail" component={Profile} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
