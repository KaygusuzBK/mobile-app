import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, TextInput, TouchableOpacity, View } from 'react-native';
import { createHomeStyles } from '../assets/images/styles/home.styles';

interface TodoInputProps {
    onAddTodo: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [scaleAnim] = useState(new Animated.Value(1));

    const handleAddTodo = () => {
        if (input.trim()) {
            // Add animation feedback
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 0.95,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();
            
            onAddTodo(input);
            setInput('');
        }
    };

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                    style={[
                        homeStyles.input,
                        isFocused && homeStyles.inputFocused,
                        { 
                            backgroundColor: colors.backgrounds.input,
                            borderColor: isFocused ? colors.primary : colors.border,
                            color: colors.text,
                        }
                    ]}
                    placeholder="Yeni görev ekle..."
                    placeholderTextColor={colors.textMuted}
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={handleAddTodo}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline
                    maxLength={200}
                />
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity 
                        style={[
                            homeStyles.addButton,
                            { backgroundColor: colors.primary },
                            !input.trim() && homeStyles.addButtonDisabled
                        ]}
                        onPress={handleAddTodo}
                        disabled={!input.trim()}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
};