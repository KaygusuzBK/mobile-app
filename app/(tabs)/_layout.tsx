import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import useTheme from '../../hooks/useTheme';

const Layout = () => {
    const { colors } = useTheme();
    
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    shadowColor: colors.shadow,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '600',
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Todos',
                    tabBarLabel: 'Todos',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkmark-done-outline" size={size ?? 24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarLabel: 'Settings',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size ?? 24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

// Removed unused styles

export default Layout;
