const VALIDATION_TYPES = {
  'mac-address': /^([A-Z0-9]{2}:){5}[A-Z0-9]{2}$/,
  'IMEI': /\d{15}/,
  'device-ble-key': /^\w{8}$/,
  'operator-code': /^[A-Z0-9]{6}$/, // ApiKey
  'secret-key': /^[0-9a-z]{32}$/, // Bluetooth SDK Key
};

const assert = (condition: boolean, message: string) => {
  !condition && console.error(new Error(message));
};

type ValidationType = keyof typeof VALIDATION_TYPES;
export function validateRegex(target: string, type: ValidationType) {
  const re = VALIDATION_TYPES[type];
  const isValid = RegExp(re, 'gm').test(target);
  console.debug(`${type} ${target} is matching with ${re}gm?`, isValid);
  return isValid;
}

export const validateScooter = (MAC_ADDRESS: string, DEV_BLE_KEY: string, IOT_IMEI: string) => {
  console.log('checking key code...', { MAC_ADDRESS, DEV_BLE_KEY, IOT_IMEI });
  const a = validateRegex(MAC_ADDRESS, 'mac-address');
  const b = validateRegex(DEV_BLE_KEY, 'device-ble-key');
  const c = validateRegex(IOT_IMEI, 'IMEI');
  assert(a, 'Mac Address of device is not valid');
  assert(b, 'Device BLE Key is not valid');
  assert(c, "IoT's IMEI Code is not valid");
  return a && b && c;
};
export function validateKeyCode(operatorCode: string, secretKey: string, isDebug: boolean) {
  console.log('checking key code...', { operatorCode, secretKey, isDebug });
  const a = validateRegex(operatorCode, 'operator-code');
  const b = validateRegex(secretKey, 'secret-key');
  console.debug('DEBUG MODE', isDebug);
  assert(a, 'Operator Code is not valid');
  assert(b, 'Secret Key is not valid');
  return a && b;
}
