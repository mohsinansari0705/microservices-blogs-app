import React from 'react';
import { space } from './common/utils/Sizes';
import { colors } from './common/utils/Colors';
import {
  View,
  StatusBar
} from 'react-native';
import PostList from './components/PostList';
import PostCreate from './components/PostCreate';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' backgroundColor={colors.darkBlue} />
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: colors.darkBlue,
        paddingHorizontal: space.lg
      }}>
        <View style={{ flex: 4 }}>
          <PostCreate />
        </View>

        <View style={{ borderColor: colors.textMuted, borderWidth: 1 }} />

        <View style={{ flex: 6 }}>
          <PostList />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
