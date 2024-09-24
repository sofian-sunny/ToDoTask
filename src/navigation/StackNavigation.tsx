import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, CreateTaskScreen, EditTaskScreen} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
export enum MainRoutes {
  HomeScreen = 'HomeScreen',
  CreateTaskScreen = 'CreateTaskScreen',
  EditTaskScreen = 'EditTaskScreen',
}

export type RootStackParamList = {
  [MainRoutes.HomeScreen]: {};
  [MainRoutes.CreateTaskScreen]: {};
  [MainRoutes.EditTaskScreen]: {};
};

const StackNavigation = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <RootStack.Navigator initialRouteName={MainRoutes.HomeScreen}>
      <RootStack.Screen
        options={{headerShown: false}}
        name={MainRoutes.HomeScreen}
        component={HomeScreen}
      />
      <RootStack.Screen
        options={{headerShown: false}}
        name={MainRoutes.CreateTaskScreen}
        component={CreateTaskScreen}
      />
      <RootStack.Screen
        options={{headerShown: false}}
        name={MainRoutes.EditTaskScreen}
        component={EditTaskScreen}
      />
    </RootStack.Navigator>
  );
};
export default StackNavigation;
