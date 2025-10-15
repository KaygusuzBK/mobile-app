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
                    borderTopWidth: 0,
                    shadowColor: colors.shadow,
                    shadowOffset: {
                        width: 0,
                        height: -4,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 16,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 80,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 4,
                },
                tabBarIconStyle: {
                    marginTop: 4,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Görevler',
                    tabBarLabel: 'Görevler',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkmark-done-outline" size={size ?? 24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Ayarlar',
                    tabBarLabel: 'Ayarlar',
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
