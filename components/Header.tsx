import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { createHomeStyles } from '../assets/images/styles/home.styles';

const Header = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const completedTodos = todos?.filter((todo) => todo.isCompleted).length || 0;
  const totalTodos = todos?.length || 0;
  const progress = totalTodos > 0 ? completedTodos / totalTodos : 0;
  const progressPercentage = Math.round(progress * 100);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progressPercentage]);

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <View style={[homeStyles.iconContainer, { backgroundColor: colors.primary }]}>
          <Ionicons name="checkmark-done-outline" size={32} color="#fff" />
        </View>
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Todo List</Text>
          <Text style={homeStyles.subtitle}>
            {completedTodos === totalTodos && totalTodos !== 0
              ? "Tüm görevler tamamlandı!"
              : "Bugünün görevlerini gör ve yönet"}
          </Text>
        </View>
      </View>
      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <Animated.View
              style={[
                homeStyles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  }),
                  backgroundColor: colors.success,
                },
              ]}
            />
          </View>
          <Animated.Text style={homeStyles.progressText}>
            {progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0', '100'],
              extrapolate: 'clamp',
            })}
            %
          </Animated.Text>
        </View>
        <Text style={homeStyles.subtitle}>
          Tamamlanan: {completedTodos} / {totalTodos}
        </Text>
      </View>
    </View>
  );
};

export default Header;