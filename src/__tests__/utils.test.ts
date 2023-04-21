import { validateRegex } from '../utils';

describe('test _andrew_segway_ble_manager', function () {
  it('test @andrew/segway-ble-manager.validateRegex', function (done) {
    expect(validateRegex('00:1A:22:33:44:πø', 'mac-address')).toBe(false);
    expect(validateRegex('00:11:B2:33:DD:5E', 'mac-address')).toBe(true);
    expect(validateRegex('00:11:B2:33:DD:5E', 'device-ble-key')).toBe(false);
    expect(validateRegex('231B6C33', 'device-ble-key')).toBe(true);
    expect(validateRegex('C2BDEB7844811BA', 'IMEI')).toBe(false);
    expect(validateRegex('719959406232790', 'IMEI')).toBe(true);
    done();
  });
});
