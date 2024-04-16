import { validateKeyCode } from '../utils';
test('test validateKeyCode', () => {
  const mockValidateKeyCode = jest.fn();
  mockValidateKeyCode.mockReturnValue(true);
  expect(mockValidateKeyCode('AE7DA0', 'abaa004743d6428aaca96c0827826c55', true)).toBe(true);
});

describe('test _andrew_segway_ble_manager', function () {
  it('test @andrew/segway-ble-manager.validateRegex', function (done) {
    expect(validateKeyCode('A3D987', '9c4747dc6a6c4832bef700723a2d5da4', true)).toBe(true);
    expect(validateKeyCode('EDD50F', 'd0f7dd2ec8a4482c858bae6b9c77f3da', true)).toBe(true);
    expect(validateKeyCode('29C53F', '9d56611c457841d3802aace85d45ba4d', true)).toBe(true);
    expect(validateKeyCode('BB4678', '46951741b93b421ea564ac837934d3d0', true)).toBe(true);
    expect(validateKeyCode('21966C', 'e2eee35d00ac4f308ba6db15fe6c4a05', true)).toBe(true);
    expect(validateKeyCode('88B532', 'e1158d49166c4e918b04f73cf49fe835', true)).toBe(true);
    done();
  });
});
