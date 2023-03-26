import { type PermissionStatus, PERMISSIONS, request, RESULTS, checkMultiple } from 'react-native-permissions';
import { Platform, type Rationale } from 'react-native';
import appInformation from '../package.json';

const locationWhenIUse = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
const locateBackground = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
const takeFineLocation = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
const bluetoothDevices = PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL;
const bluetoothEmitter = PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE;
const bluetoothConnect = PERMISSIONS.ANDROID.BLUETOOTH_CONNECT;
const bluetoothScanner = PERMISSIONS.ANDROID.BLUETOOTH_SCAN;

export type Permission =
  | typeof locationWhenIUse
  | typeof locateBackground
  | typeof takeFineLocation
  | typeof bluetoothConnect
  | typeof bluetoothEmitter
  | typeof bluetoothScanner
  | typeof bluetoothDevices;

const CHECK = <S = PermissionStatus>(result: S) => result === RESULTS.GRANTED;

const permissionNames: Record<Permission, string> = {
  [locationWhenIUse]: 'Location When In Use',
  [bluetoothConnect]: 'Bluetooth Connect',
  [bluetoothScanner]: 'Bluetooth Scan',
  [bluetoothDevices]: 'Bluetooth Peripheral',
  [takeFineLocation]: 'Access Fine Location',
  [locateBackground]: 'Access Location in Background',
  [bluetoothEmitter]: 'Bluetooth BroadCast',
};

function getRational(permission: Permission): Rationale {
  const data = permissionNames[permission];
  const appName = appInformation.name;
  return {
    title: `"${data}" Permission`,
    message: `"${appName}" needs access to your ${data.toLowerCase()} data.`,
    buttonPositive: 'ACCEPT',
    buttonNegative: 'DENY',
  };
}

async function requestPermission(permission: Permission) {
  const rationale = getRational(permission);
  return request(permission, rationale).then(CHECK);
}

export async function getRequiredPermissions() {
  const bluetoothPermission = Platform.OS === 'ios' ? bluetoothDevices : bluetoothConnect;
  const locationPermission = Platform.OS === 'ios' ? locationWhenIUse : locateBackground;
  await requestPermission(bluetoothPermission);
  await requestPermission(locationPermission);
  return await checkMultiple([
    locationWhenIUse,
    locateBackground,
    takeFineLocation,
    bluetoothConnect,
    bluetoothEmitter,
    bluetoothScanner,
    bluetoothDevices,
  ]);
}
