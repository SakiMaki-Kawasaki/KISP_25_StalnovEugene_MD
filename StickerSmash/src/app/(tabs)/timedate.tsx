import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function TimeDate() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  const dateString = day + '_' + month + '_' + year;

  const timeString = now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{dateString}</Text>
      <Text style={styles.timeText}>{timeString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  dateText: {
    color: '#ffd33d',
    fontSize: 24,
    fontWeight: '600',
  },
  timeText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
});
