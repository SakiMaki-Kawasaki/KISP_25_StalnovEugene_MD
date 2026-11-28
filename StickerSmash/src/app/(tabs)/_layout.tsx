import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#ffd33d' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="image" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="timedate"
        options={{
          title: 'Time',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
