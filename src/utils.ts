const VALIDATION_TYPES = {
  'mac-address': /^([A-Z0-9]{2}:){5}[A-Z0-9]{2}$/, // mac address of mobile Phone.
  /**
   * @description `IMEI` stands for "International Mobile Equipment Identity".
   * It’s a unique number for identifying a device on a mobile network.
   * It has 15 digits and is assigned to every GSM phone.
   */
  'IMEI': /\d{15}/, // Peripheral Device's IMEI Code
  'device-ble-key': /^\w{8}$/, // Peripheral Device's BLE Key
  'operator-code': /^[A-Z0-9]{6}$/, // ApiKey
  'secret-key': /^[0-9a-z]{32}$/, // Central Bluetooth SDK Key
};

/**
 * React-native doesn't support console.assert for debugging, So I did.
 *
 * @param {string} condition - Condition to check it's true or false.
 * @param {string} message - Error message to show in console if condition is false.
 * @throws {Error} - Throws an error if condition is false. (Only in development mode)
 * @example assert(1 === 1, '1 is not equal to 1');
 */
const assert = (condition: boolean, message: string) => {
  if (!condition) {
    if (__DEV__) {
      console.debug(new Error(message));
    } else {
      console.error(message);
    }
  }
};

type ValidationType = keyof typeof VALIDATION_TYPES;

/**
 * @description Validate a string with a regex.
 * @param {string} target - String to validate.
 * @param {ValidationType} type - Type of validation.
 * @returns {boolean} - True if string is valid, otherwise false.
 * @example validateRegex('00:11:22:33:44:55', 'mac-address');
 */
export function validateRegex(target: string, type: ValidationType): boolean {
  const re = VALIDATION_TYPES[type];
  const isValid = RegExp(re, 'gm').test(target);
  console.debug(`${type} ${target} is matching with ${re}gm?`, isValid);
  return isValid;
}

export const validateScooter = (MAC_ADDRESS: string, DEV_BLE_KEY: string, IOT_IMEI: string): boolean => {
  console.log('checking key code...', { MAC_ADDRESS, DEV_BLE_KEY, IOT_IMEI });
  const a = validateRegex(MAC_ADDRESS, 'mac-address');
  const b = validateRegex(DEV_BLE_KEY, 'device-ble-key');
  const c = validateRegex(IOT_IMEI, 'IMEI');
  assert(a, 'Mac Address of device is not valid');
  assert(b, 'Device BLE Key is not valid');
  assert(c, "IoT's IMEI Code is not valid");
  return a && b && c;
};
export function validateKeyCode(operatorCode: string, secretKey: string, isDebug: boolean): boolean {
  console.log('checking key code...', { operatorCode, secretKey, isDebug });
  const a = validateRegex(operatorCode, 'operator-code');
  const b = validateRegex(secretKey, 'secret-key');
  __DEV__ ?? console.debug('DEBUG MODE', isDebug);
  assert(a, 'Operator Code is not valid');
  assert(b, 'Secret Key is not valid');
  return a && b;
}
