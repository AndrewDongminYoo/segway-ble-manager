const VALIDATION_TYPES: Record<string, RegExp> = {
  'mac-address': /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/gim,
  'IMEI': /^[0-9]{15}$/gm,
  'device-ble-key': /^[0-9A-Za-z]{8}$/gim,
  'operator-code': /^[0-9A-Za-z]{6}$/gim, // ApiKey
  'secret-key': /^[0-9a-z]{31}$/gim, // Bluetooth SDK Key
} as const;

type ValidationType = keyof typeof VALIDATION_TYPES;

export function validateRegex(input: string, type: ValidationType) {
  const re = VALIDATION_TYPES[type] as RegExp;
  console.debug('validateRegex', { input, type, re });
  return re.test(input);
}
