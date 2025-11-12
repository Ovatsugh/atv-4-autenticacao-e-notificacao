import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Alert } from 'react-native';
import Constants from 'expo-constants';

// Verificar se está rodando no Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

// Configurar como as notificações devem ser tratadas quando o app está em primeiro plano
if (!isExpoGo) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export interface NotificationHistoryItem {
  id: string;
  title: string;
  body: string;
  timestamp: number;
}

// Solicitar permissões de notificação
export async function registerForPushNotificationsAsync() {
  if (isExpoGo) {
    Alert.alert(
      'Aviso',
      'As notificações não funcionam completamente no Expo Go. Para funcionalidade completa, use um development build.\n\nNotificações locais agendadas ainda funcionarão parcialmente.',
      [{ text: 'OK' }]
    );
  }

  let token;

  if (Platform.OS === 'android' && !isExpoGo) {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'notification-sound.wav',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert('Aviso', 'Permissão para notificações não concedida!');
      return;
    }
  } else {
    Alert.alert('Aviso', 'Use um dispositivo físico para melhor experiência com notificações');
  }

  return token;
}

// Agendar notificação imediata para teste
export async function scheduleImmediateNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "💧 Hora de beber água!",
      body: 'Mantenha-se hidratado! Beba um copo de água agora.',
      sound: 'notification-sound.wav',
      data: { type: 'hydration_reminder' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });
}

// Agendar notificação para um horário específico
export async function scheduleNotificationAtTime(hour: number, minute: number) {
  // Cancelar notificações agendadas anteriores
  await Notifications.cancelAllScheduledNotificationsAsync();

  const trigger: Notifications.DailyTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.DAILY,
    hour,
    minute,
  };

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "💧 Hora de beber água!",
      body: 'Não se esqueça de se manter hidratado!',
      sound: 'notification-sound.wav',
      data: { type: 'hydration_reminder' },
    },
    trigger,
  });

  return notificationId;
}

// Agendar notificações recorrentes (a cada hora)
export async function scheduleRecurringNotifications() {
  // Cancelar notificações agendadas anteriores
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Agendar notificação que se repete a cada 1 hora
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "💧 Lembrete de Hidratação",
      body: 'Está na hora de beber água! Cuide da sua saúde!',
      sound: 'notification-sound.wav',
      data: { type: 'hourly_reminder' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 3600, // 1 hora em segundos
      repeats: true,
    },
  });

  return notificationId;
}

// Agendar múltiplas notificações ao longo do dia (a cada 2 horas)
export async function scheduleMultipleNotifications() {
  // Cancelar notificações agendadas anteriores
  await Notifications.cancelAllScheduledNotificationsAsync();

  const notifications = [];
  
  // Agendar notificações das 8h às 22h (a cada 2 horas)
  for (let hour = 8; hour <= 22; hour += 2) {
    const trigger: Notifications.DailyTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute: 0,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "💧 Hora de beber água!",
        body: `Lembrete das ${hour}:00 - Beba um copo de água!`,
        sound: 'notification-sound.wav',
        data: { type: 'scheduled_reminder', hour },
      },
      trigger,
    });

    notifications.push(notificationId);
  }

  return notifications;
}

// Cancelar todas as notificações
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Obter notificações agendadas
export async function getScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

// Listener para notificações recebidas
export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
) {
  return Notifications.addNotificationReceivedListener(callback);
}

// Listener para quando o usuário interage com a notificação
export function addNotificationResponseListener(
  callback: (response: Notifications.NotificationResponse) => void
) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}
