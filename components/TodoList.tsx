import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import React, { useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    PanResponder,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { createHomeStyles } from '../assets/images/styles/home.styles';

interface TodoItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  colors: any;
  homeStyles: any;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  id, 
  text, 
  isCompleted, 
  onToggle, 
  onDelete, 
  onUpdate, 
  colors, 
  homeStyles 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [opacityAnim] = useState(new Animated.Value(1));
  const [translateX] = useState(new Animated.Value(0));
  const [showActions, setShowActions] = useState(false);
  
  const pan = useRef(new Animated.ValueXY()).current;

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
    setShowActions(false);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 10;
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
    },
    onPanResponderMove: (evt, gestureState) => {
      pan.setValue({ x: gestureState.dx, y: 0 });
    },
    onPanResponderRelease: (evt, gestureState) => {
      pan.flattenOffset();
      
      if (gestureState.dx > 100) {
        // Swipe right - Edit
        Animated.spring(pan, {
          toValue: { x: 120, y: 0 },
          useNativeDriver: false,
        }).start();
        setShowActions(true);
        setTimeout(() => {
          handleEdit();
        }, 300);
      } else if (gestureState.dx < -100) {
        // Swipe left - Delete
        Animated.spring(pan, {
          toValue: { x: -120, y: 0 },
          useNativeDriver: false,
        }).start();
        setShowActions(true);
        setTimeout(() => {
          handleDelete();
        }, 300);
      } else {
        resetPosition();
      }
    },
  });

  const handleToggle = () => {
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
    onToggle(id);
  };

  const handleDelete = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete(id);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    resetPosition();
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdate(id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <Animated.View
      style={[
        homeStyles.todoItemWrapper,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.container}>
        {/* Background Actions */}
        <View style={styles.backgroundActions}>
          <View style={[styles.actionLeft, { backgroundColor: colors.primary }]}>
            <Ionicons name="pencil" size={18} color="#fff" />
            <Text style={styles.actionText}>Düzenle</Text>
          </View>
          <View style={[styles.actionRight, { backgroundColor: colors.danger }]}>
            <Ionicons name="trash" size={18} color="#fff" />
            <Text style={styles.actionText}>Sil</Text>
          </View>
        </View>

        {/* Main Card */}
        <Animated.View
          style={[
            homeStyles.todoItem,
            { 
              backgroundColor: colors.surface,
              transform: pan.getTranslateTransform()
            }
          ]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            onPress={handleToggle}
            activeOpacity={0.7}
          >
            <View
              style={[
                homeStyles.checkboxInner,
                {
                  backgroundColor: isCompleted ? colors.success : 'transparent',
                  borderColor: isCompleted ? colors.success : colors.border,
                },
              ]}
            >
              {isCompleted && (
                <Ionicons name="checkmark" size={20} color="#fff" />
              )}
            </View>
          </TouchableOpacity>

          <View style={homeStyles.todoTextContainer}>
            {isEditing ? (
              <View style={homeStyles.editContainer}>
                <TextInput
                  style={[homeStyles.editInput, { backgroundColor: colors.backgrounds.editInput }]}
                  value={editText}
                  onChangeText={setEditText}
                  autoFocus
                  multiline
                />
                <View style={homeStyles.editButtons}>
                  <TouchableOpacity
                    style={[homeStyles.editButton, { backgroundColor: colors.success }]}
                    onPress={handleSaveEdit}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Kaydet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[homeStyles.editButton, { backgroundColor: colors.danger }]}
                    onPress={handleCancelEdit}
                  >
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>İptal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text
                style={[
                  homeStyles.todoText,
                  {
                    color: isCompleted ? colors.textMuted : colors.text,
                    textDecorationLine: isCompleted ? 'line-through' : 'none',
                  },
                ]}
              >
                {text}
              </Text>
            )}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const EmptyState: React.FC<{ colors: any; homeStyles: any }> = ({ colors, homeStyles }) => (
  <View style={homeStyles.emptyContainer}>
    <View style={[homeStyles.emptyIconContainer, { backgroundColor: colors.border }]}>
      <Ionicons name="checkmark-circle-outline" size={60} color={colors.textMuted} />
    </View>
    <Text style={[homeStyles.emptyText, { color: colors.text }]}>
      Henüz görev yok
    </Text>
    <Text style={[homeStyles.emptySubtext, { color: colors.textMuted }]}>
      İlk görevinizi ekleyerek başlayın!
    </Text>
  </View>
);

export const TodoList: React.FC = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const handleToggle = (id: string) => {
    toggleTodo({ id: id as any });
  };

  const handleDelete = (id: string) => {
    deleteTodo({ id: id as any });
  };

  const handleUpdate = (id: string, text: string) => {
    updateTodo({ id: id as any, text });
  };

  if (todos === undefined) {
    return (
      <View style={homeStyles.loadingContainer}>
        <Text style={[homeStyles.loadingText, { color: colors.text }]}>
          Görevler yükleniyor...
        </Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.todoList}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem
            id={item._id}
            text={item.text}
            isCompleted={item.isCompleted}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            colors={colors}
            homeStyles={homeStyles}
          />
        )}
        contentContainerStyle={homeStyles.todoListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState colors={colors} homeStyles={homeStyles} />}
      />
    </View>
  );
};

const styles = {
  container: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  backgroundActions: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
  },
  actionLeft: {
    width: 80,
    height: '100%',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    flexDirection: 'column' as const,
    gap: 4,
    borderRadius: 16,
    marginRight: 8,
  },
  actionRight: {
    width: 80,
    height: '100%',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    flexDirection: 'column' as const,
    gap: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600' as const,
  },
};