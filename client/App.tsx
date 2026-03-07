import React from 'react';
import { StatusBar } from 'react-native';
import { space } from './common/utils/Sizes';
import { colors } from './common/utils/Colors';
import PostCreate from './components/PostCreate';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' backgroundColor={colors.darkBlue} />
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: colors.darkBlue,
        paddingHorizontal: space.lg,
        paddingVertical: space.lg
      }}>
        <PostCreate />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
