import { useSelector } from 'react-redux';
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from '@/redux/store';
import { useNotifications } from '@/hooks/useNotifications';

export default function Layout() {
    useNotifications()
    const notifications = useSelector((state: RootState) =>
        state.todo.tasks.filter(task => task.status != 'completed').length);

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }} />
            <Tabs.Screen name="todoList"
                options={{
                    title: "To-Do",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-outline" size={size} color={color} />
                    ),
                    tabBarBadge: notifications == 0 ? undefined : notifications
                }} />
            <Tabs.Screen name="gallery"
                options={{
                    title: "Gallery",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="color-palette-outline" size={size} color={color} />
                    ),
                }} />
            <Tabs.Screen name="animation"
                options={{
                    title: "Animation",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="logo-ionic" size={size} color={color} />
                    ),
                }} />
        </Tabs>
    );
}
