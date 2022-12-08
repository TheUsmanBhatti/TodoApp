
import React from 'react';
import FlashMessage from "react-native-flash-message";

import {
  SafeAreaView,
  Text,
} from 'react-native';

import { COLORS } from './src/utilities/Colors';
import TodoScreen from './src/screens/TodoScreen';


const App = () => {

  return (
    <>
    <TodoScreen />
    <FlashMessage position="top" /> 
    </>
  );
};



export default App;
