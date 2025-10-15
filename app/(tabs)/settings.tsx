import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '../../hooks/useTheme';

const Settings = () => {
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <LinearGradient colors={colors.gradients.background} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle={colors.statusBarStyle} />
                <Animated.View 
                    style={[
                        styles.header, 
                        { 
                            backgroundColor: colors.surface,
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <View style={styles.headerContent}>
                        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
                            <Ionicons name="settings-outline" size={32} color="#fff" />
                        </View>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Ayarlar</Text>
                    </View>
                </Animated.View>
                
                <Animated.View 
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <View style={[styles.section, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tema Tercihleri</Text>
                        
                        <TouchableOpacity 
                            style={[styles.settingItem, { borderBottomColor: colors.border }]}
                            activeOpacity={0.7}
                        >
                            <View style={styles.settingLeft}>
                                <View style={[styles.iconWrapper, { backgroundColor: colors.primary }]}>
                                    <Ionicons 
                                        name={isDarkMode ? "moon" : "sunny"} 
                                        size={24} 
                                        color="#fff"
                                    />
                                </View>
                                <View style={styles.settingTextContainer}>
                                    <Text style={[styles.settingTitle, { color: colors.text }]}>Karanlık Mod</Text>
                                    <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>
                                        {isDarkMode ? "Karanlık tema aktif" : "Açık tema aktif"}
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
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.section, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Uygulama Bilgileri</Text>
                        
                        <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                            <View style={styles.settingLeft}>
                                <View style={[styles.iconWrapper, { backgroundColor: colors.success }]}>
                                    <Ionicons name="information-circle" size={24} color="#fff" />
                                </View>
                                <View style={styles.settingTextContainer}>
                                    <Text style={[styles.settingTitle, { color: colors.text }]}>Versiyon</Text>
                                    <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>
                                        v1.0.0
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <View style={[styles.iconWrapper, { backgroundColor: colors.warning }]}>
                                    <Ionicons name="star" size={24} color="#fff" />
                                </View>
                                <View style={styles.settingTextContainer}>
                                    <Text style={[styles.settingTitle, { color: colors.text }]}>Değerlendir</Text>
                                    <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>
                                        Uygulamayı beğendiyseniz değerlendirin
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                        </View>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 24,
        marginBottom: 20,
        borderRadius: 20,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        letterSpacing: -1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        overflow: 'hidden',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 14,
        fontWeight: '400',
    },
})

export default Settings;
