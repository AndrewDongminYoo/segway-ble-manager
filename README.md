# @gbike/segway-ble-manager

`react-native-segway-ble-manager` is a React Native library for managing Bluetooth Low Energy (BLE) connections with Segway devices.
`react-native-segway-ble-manager` provides an easy-to-use API for connecting to and communicating with Segway devices over BLE.
The library supports both Android and iOS platforms and includes features such as device discovery, connection management, and data transfer.
With `react-native-segway-ble-manager`, developers can easily integrate Segway device control into their React Native applications.

## Installation

```sh
npm install @gbike/segway-ble-manager
```

## Usage

```xml
    <!-- iOS 13 and newer, include the `NSBluetoothAlwaysUsageDescription` -->
    <key>NSBluetoothAlwaysUsageDescription</key>
    <string>스쿠터 조작을 위해 블루투스를 사용합니다</string>
    <!-- iOS 12 and earlier, include `NSBluetoothPeripheralUsageDescription` -->
    <key>NSBluetoothPeripheralUsageDescription</key>
    <string>스쿠터 조작을 위해 블루투스를 사용합니다</string>
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>스쿠터 조작을 위해 위치데이터를 접근합니다</string>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
