import { Tabs } from 'expo-router';
import React from 'react';
// Removed unused StyleSheet import

import { Ionicons } from '@expo/vector-icons';

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#8e8e93',
                tabBarStyle: {
                    backgroundColor: '#000000ff',
                    borderTopWidth: 0,
                    shadowColor: '#000'
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
