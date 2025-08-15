// src/services/BackgroundLocation.ts
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import BackgroundActions from 'react-native-background-actions';

export type Location = {
  coords: { latitude: number; longitude: number; accuracy: number; altitude?: number | null; speed?: number | null; heading?: number | null; };
  timestamp: number;
};

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

let isRunning = false;
let lastEmit = 0;
let pollIntervalMs = 5000;

async function ensureNotificationPermissionAndroid(): Promise<void> {
  if (Platform.OS !== 'android' || Platform.Version < 33) return;
  try {
    // @ts-ignore older RN types
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  } catch {}
}

export async function ensureLocationPermissions(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;

  try {
    const fine = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    const coarse = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

    if (fine !== PermissionsAndroid.RESULTS.GRANTED || coarse !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission required', 'Please allow location access.', [
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
        { text: 'Cancel', style: 'cancel' },
      ]);
      return false;
    }

    if (Platform.Version >= 29) {
      const bg = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION, {
        title: 'Background Location',
        message: 'Allow background location so the app can work when closed.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      });
      if (bg !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Allow all the time', 'Set Location to "Allow all the time" in Settings for full background updates.', [
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
          { text: 'Later', style: 'cancel' },
        ]);
        // continue in foreground-only if you prefer
      }
    }

    await ensureNotificationPermissionAndroid();
    return true;
  } catch (e) {
    console.warn('[ensureLocationPermissions] error', e);
    return false;
  }
}

async function pollLocationOnce(onLocation?: (loc: Location) => void) {
  return new Promise<void>((resolve) => {
    Geolocation.getCurrentPosition(
      (pos) => {
        console.log("latitude and longitude:",pos.coords);
        const loc: Location = {
          coords: {
            latitude: Number(pos?.coords?.latitude) || 0,
            longitude: Number(pos?.coords?.longitude) || 0,
            accuracy: Number(pos?.coords?.accuracy) || 0,
            altitude: pos?.coords?.altitude ?? null,
            speed: pos?.coords?.speed ?? null,
            heading: pos?.coords?.heading ?? null,
          },
          timestamp: Number(pos?.timestamp) || Date.now(),
        };

        const now = Date.now();
        if (now - lastEmit >= 1000) {
          lastEmit = now;
          onLocation?.(loc);
          BackgroundActions.updateNotification({
            taskDesc: `Lat: ${loc.coords.latitude.toFixed(5)}, Lon: ${loc.coords.longitude.toFixed(5)}`
          }).catch(() => {});
        }
        resolve();
      },
      (err) => {
        console.warn('[getCurrentPosition] error', err);
        resolve();
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
}

async function trackLoop(onLocation?: (loc: Location) => void) {
  while (isRunning) {
    await pollLocationOnce(onLocation);

    const step = Math.max(1000, pollIntervalMs);
    for (let t = 0; t < step && isRunning; t += 250) {   
      await sleep(250);
    }
  }
}

const BACKGROUND_TASK_OPTIONS = {
  taskName: 'Location Tracking',  
  taskTitle: 'Tracking location',
  taskDesc: 'Initializing…',
  taskIcon: { name: 'ic_launcher', type: 'mipmap' },
  color: '#000000',
  linkingURI: '',
  parameters: {},
};

export async function startBackgroundLocation(onLocation?: (loc: Location) => void, options?: { intervalMs?: number }) {
  if (isRunning) return true;
  const ok = await ensureLocationPermissions();
  if (!ok) return false;

  if (options?.intervalMs && options.intervalMs >= 1000) pollIntervalMs = options.intervalMs;

  try {
    isRunning = true;
    await BackgroundActions.start(async () => {           
      await trackLoop(onLocation);
    }, BACKGROUND_TASK_OPTIONS);
    return true;
  } catch (e) {
    console.warn('[startBackgroundLocation] error', e);
    isRunning = false;
    return false;
  }
}

export async function stopBackgroundLocation() {
  if (!isRunning) return;
  try {
    isRunning = false;
    await BackgroundActions.stop();
  } catch (e) {
    console.warn('[stopBackgroundLocation] error', e);
  }
}

export function getIsRunning() { return isRunning; }
