const VALIDATION_TYPES = {
  'mac-address': /^([A-Z0-9]{2}:){5}[A-Z0-9]{2}$/, // mac address of scooter.
  /**
   * @description `IMEI` stands for "International Mobile Equipment Identity".
   * It’s a unique number for identifying a device on a mobile network.
   * It has 15 digits and is assigned to every GSM device.
   */
  'IMEI': /\d{15}/, // Peripheral Device's IMEI Code
  'device-ble-key': /^\w{8}$/, // Peripheral Device's BLE Key
  'operator-code': /^[A-Z0-9]{6}$/, // ApiKey
  'secret-key': /^[0-9a-z]{32}$/, // Central Bluetooth SDK Key
};

/**
 * React native applications do not support secondary logging such as assert, timestamp, and so on, rather than just logging levels such as error, warn, info, etc. On the console.
 * So I've only implemented some extensions for easy debugging.
 */
export const logger = {
  /**
   * React-native doesn't support console.assert for debugging, So I did.
   *
   * @param {string} condition - Condition to check it's true or false.
   * @param {string} message - Error message to show in console if condition is false.
   * @throws {Error} - Throws an error if condition is false(Only in development mode).
   * @example logger.assert(1 === 1, '1 is not equal to 1');
   */
  assert(condition: boolean, message: string) {
    if (!condition) {
      if (__DEV__) {
        console.trace(new Error(message));
      } else {
        console.trace(message);
      }
    }
  },
  /**
   * @description Log a debug message with timestamp.
   * @param {string} message - Message to log.
   * @param {unknown[]} optionalArgs - Optional arguments to log.
   * @example logger.debug('Hello World!');
   */
  debug(message: string | Error, ...optionalArgs: unknown[]) {
    const time = new Date().toLocaleTimeString('en-gb');
    const timestamp = '\u001B[1m\u001B[100m\u001B[97m _time_ \u001B[39m\u001B[49m\u001B[22m'.replace('_time_', time);
    console.debug(`${timestamp} ${message}`, ...optionalArgs);
  },
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
  logger.debug(`${type} ${target} is matching with ${re}gm:`, isValid);
  return isValid;
}

/**
 * @description Validate scooter's mac address, device ble key and IoT's IMEI code.
 * @param {string} MAC_ADDRESS - Mac address of scooter.
 * @param {string} DEV_BLE_KEY - Device's BLE Key.
 * @param {string} IOT_IMEI - IoT's IMEI Code.
 * @returns {boolean} - True if all strings are valid, otherwise false.
 * @example
 * const MAC_ADDRESS = '00:00:00:00:00:00';
 * const DEV_BLE_KEY = '00000000000000000000000000000000';
 * const IOT_IMEI = '000000000000000';
 * validateScooter(MAC_ADDRESS, DEV_BLE_KEY, IOT_IMEI); // will return true.
 */
export function validateScooter(MAC_ADDRESS: string, DEV_BLE_KEY: string, IOT_IMEI: string): boolean {
  logger.debug('checking key code...', { MAC_ADDRESS, DEV_BLE_KEY, IOT_IMEI });
  const a = validateRegex(MAC_ADDRESS, 'mac-address');
  const b = validateRegex(DEV_BLE_KEY, 'device-ble-key');
  const c = validateRegex(IOT_IMEI, 'IMEI');
  logger.assert(a, 'Mac Address of device is not valid');
  logger.assert(b, 'Device BLE Key is not valid');
  logger.assert(c, "IoT's IMEI Code is not valid");
  return a && b && c;
}

/**
 * @description Validate operator code and secret key.
 * @param {string} operatorCode - Operator Code.
 * @param {string} secretKey - Secret Key.
 * @param {boolean} isDebug - Debug mode.
 * @returns {boolean} - True if all strings are valid, otherwise false.
 * @example
 * const operatorCode = '830201';
 * const secretKey = 'f5e5c6cf34214936b2b309c4077a949d'; // trunk-ignore(gitleaks/generic-api-key)
 * const isDebug = true;
 * validateKeyCode(operatorCode, secretKey, isDebug); // will return true;
 */
export function validateKeyCode(operatorCode: string, secretKey: string, isDebug: boolean): boolean {
  logger.debug('checking key code...', { operatorCode, secretKey, isDebug });
  const a = validateRegex(operatorCode, 'operator-code');
  const b = validateRegex(secretKey, 'secret-key');
  __DEV__ ?? console.debug('DEBUG MODE', isDebug);
  logger.assert(a, 'Operator Code is not valid');
  logger.assert(b, 'Secret Key is not valid');
  return a && b;
}
