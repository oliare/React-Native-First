import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from '@/services/db';
import migrations from '@/drizzle/migrations';
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  )
}
