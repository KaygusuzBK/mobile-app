import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import useTheme from '../../hooks/useTheme';

const Settings = () => {
    const { isDarkMode, toggleDarkMode, colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
            </View>
            
            <View style={styles.content}>
                <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
                    
                    <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                        <View style={styles.settingLeft}>
                            <Ionicons 
                                name={isDarkMode ? "moon" : "sunny"} 
                                size={24} 
                                color={colors.primary} 
                                style={styles.settingIcon}
                            />
                            <View style={styles.settingTextContainer}>
                                <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
                                <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>
                                    {isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleDarkMode}
                            trackColor={{ false: colors.border, true: colors.primary }}
                            thumbColor={isDarkMode ? colors.surface : colors.textMuted}
                            ios_backgroundColor={colors.border}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        borderRadius: 12,
        borderWidth: 1,
        overflow: 'hidden',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        marginRight: 12,
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 14,
    },
})

export default Settings;
