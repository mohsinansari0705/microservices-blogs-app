import React, { useState } from 'react';
import { space } from './components/utils/Sizes';
import { colors } from './components/utils/Colors';
import {
  View,
  StatusBar
} from 'react-native';
import PostList from './components/PostList';
import PostCreate from './components/PostCreate';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  const [refreshCounter, setRefreshCounter] = useState(0);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' backgroundColor={colors.background} />
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: space.lg
      }}>
        <View>
          <PostCreate onPostCreated={() => setRefreshCounter(prev => prev + 1)} />
        </View>

        <View style={{ borderColor: colors.border, borderWidth: 1 }} />

        <View style={{ flex: 1 }}>
          <PostList refreshKey={refreshCounter} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
