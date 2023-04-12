# @dongminyu/segway-ble-manager

`react-native-segway-ble-manager`는 세그웨이 기기와 블루투스 저에너지(BLE) 연결을 관리하기 위한 리액트 네이티브 라이브러리입니다.
`react-native-segway-ble-manager`는 세그웨이 기기와 BLE를 통해 연결하고 통신하기 위한 사용하기 쉬운 API를 제공합니다.
이 라이브러리는 안드로이드와 iOS 플랫폼을 모두 지원하며 디바이스 검색, 연결 관리, 데이터 전송과 같은 기능을 포함하고 있습니다.
개발자는 `react-native-segway-ble-manager`를 사용하여 나인봇 세그웨이 디바이스 제어 기능을 React Native 애플리케이션에 쉽게 통합할 수 있습니다.

## 프로젝트 개요

이 프로젝트는 기존에 있던 네이티브 모듈을 대폭 개선한 프로젝트입니다. 이전 모듈은 모든 메서드를 임포트된 모듈에서 직접 가져왔습니다. 그리고 타입-세이프하지 않아서 몇 가지 오류가 발생합니다. 모듈을 개선하기 위해 React Native의 새로운 아키텍처를 사용하는 새로운 네이티브 모듈을 만들었습니다. 이 모듈을 통해 개발자는 세그웨이 차량에 연결하고, 차량 정보를 쿼리 및 기기를 조작하고, 디바이스에서 생성된 이벤트를 구독할 수 있습니다.

## 설치 방법

```shell
# npm을 사용한다면, (기본 패키지 매니저입니다.)
$ npm install @dongminyu/react-native-step-counter
```

```shell
# Yarn을 선호한다면, (병렬 설치를 지원해 빠른 속도를 제공하는 패키지 매니저입니다.)
$ yarn add @dongminyu/react-native-step-counter
```

```shell
# pnpm을 선호한다면, (글로벌 패키지와 하드링크로 빠른 속도를 제공하는 패키지 매니저입니다.)
$ pnpm add @dongminyu/react-native-step-counter
```

리액트네이티브 0.60 버전 이후 설치된 네이티브 모듈은 오토 링크됩니다. 네이티브 모듈을 수동으로 연결할 필요가 없습니다.

👣 리액트 네이티브의 새로운 아키텍쳐를 사용하기 때문에 원하지 않는 경우에도 사용할 수 있습니다.

## 관련 권한 설정

- iOS 설정

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

- in Android

  ```xml
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.BLUETOOTH" />
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
  <uses-feature
    android:name="android.hardware.bluetooth_le"
    android:required="true" />
  ```

## 간단한 예제 코드

다음은 `react-native-segway-ble-manager` 모듈을 사용하여 세그웨이 차량에 연결하고 잠금을 해제하고 연결을 해제하는 방법을 보여주는 코드 스니펫 예시입니다:

```typescript
import {
  connect,
  disconnect,
  init,
  openBatteryCover,
  openSaddle,
  openTailBox,
  queryVehicleInformation,
  queryIoTInformation,
} from '@dongminyu/segway-ble-manager';

const BLE_INIT_SECRET_KEY = 'MY_SECRET_KEY';
const BLE_INIT_OPERATION_CODE = 'MY_OPERATOR_CODE';
const deviceMac = 'DEVICE_MAC_ADDRESS';
const deviceKey = 'DEVICE_KEY';
const iotImei = 'IOT_IMEI';

React.useEffect(() => {
  init(BLE_INIT_SECRET_KEY, BLE_INIT_OPERATION_CODE, true);
  // get required permissions
  getRequiredPermissions();
}, []);

React.useEffect(() => {
  let intervalId: number;
  if (timer > 0) {
    intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
  }
  return () => {
    setLoading(false);
    return clearInterval(intervalId);
  };
}, [timer]);
```

이 예제에서는 먼저 `react-native-segway-ble-manager` 모듈에서 `Spec` 인터페이스를 포함한 필요한 모듈을 임포트합니다. 그런 다음 `NativeEventEmitter` 클래스의 새 인스턴스를 생성하고 `BleManager` 모듈을 인수로 전달합니다.

다음으로, `secretKey`, `operatorCode`, `deviceMac`, `deviceKey` 및 `iotImei`와 같은 몇 가지 구성 변수를 정의합니다. 그런 다음 `BleManager` 모듈을 초기화하여 `secretKey`, `operatorCode` 및 디버그 모드 사용 여부를 나타내는 부울 값을 전달합니다.

`BleManager`가 초기화되면 `connect` 메서드를 호출하여 `deviceMac`, `deviceKey`, `iotImei`를 전달합니다. 그런 다음 세그웨이 차량이 연결될 때(`onConnected`)와 연결이 끊어질 때(`onDisconnected`)에 대한 두 개의 이벤트 리스너를 정의합니다.

세그웨이 차량이 연결되면 `unLock` 메서드를 호출하여 잠금을 해제합니다. 잠금이 해제되면 콘솔에 메시지를 기록한 다음 `disconnect` 메서드를 호출하여 차량과의 연결을 끊습니다.

마지막으로 차량 연결이 해제되면 콘솔에 또 다른 메시지를 기록하고 이벤트 리스너를 제거하여 메모리 누수를 방지합니다.

간단한 예시일 뿐이지만, `react-native-segway-ble-manager` 모듈을 사용하여 세그웨이 차량에 연결하고 제어하는 방법에 대한 어느 정도의 가이드를 얻을 수 있을 것입니다.

## 데이터 타입 정의 및 하위 호환성

새로운 아키텍처는 실제로 React Native가 야심차게 발표한 고성능의 터보 모듈(+패브릭 컴포넌트)을 제공하지만, RN 0.69 버전 이전 환경에서는 임포트할 수 없습니다. 이를 보완하기 위해 몇 가지 하위 호환용 설정을 준비했습니다.

하위 호환 설정을 충분히 했기 떄문에, 이는 모듈을 사용하기 위한 필수 요건은 아닙니다. 하지만 새로운 아키텍처(Fabric, TurboModule)가 React Native 개발자들의 다양한 기술적 성능 요청에 대한 Facebook의 대답인 것을 생각하면, 앞으로 더 많은 애플리케이션 프로젝트와 ReactNative 라이브러리가 이를 사용하여 개발될 것으로 예상됩니다.

```typescript
/// index.tsx
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const SegwayBleManagerModule = isTurboModuleEnabled
  ? require('./NativeSegwayBleManager').default
  : NativeModules.SegwayBleManager;
```

위의 타입스크립트 코드는 자바스크립트 애플리케이션에 브릿지 역할을 하는 코드의 일부입니다. 이 코드는 Global 변수의 프로퍼티로 터보모듈프록시가 선언되어 있는지 확인하고 (자바스크립트에서 명시적으로 선언하지 않는 더블 언더바 변수이며, C++ 모듈에서 주입됨), 애플리케이션에 New Architecture가 활성화되어 있는지 확인한 후, 활성화되어 있다면 NativeModules에서 인덱스로 보통의 리액트네이티브로 구현된 세그웨이 모듈을 가져오는 형태를 취하고, (이 부분은 타입 세이프하지 않습니다.) 그렇지 않다면 터보모듈을 구현하는 세그웨이 모듈을 가져오는 형태를 취하고 있습니다. 두 아키텍쳐의 성능에는 차이가 있지만 다른 모든 동작과 데이터 유형은 일치합니다.

```groovy
android {
   sourceSets {
      main {
         jniLibs.srcDirs += ["lib"]
         //noinspection GroovyImplicitNullArgumentCall
         if (isNewArchitectureEnabled()) {
            java.srcDirs += [
               "src/newarch",
               // This is needed to build Kotlin project with NewArch enabled
               "${project.buildDir}/generated/source/codegen/java"
            ]
         } else {
            java.srcDirs += ["src/oldarch"]
         }
      }
   }
}
```

위 코드는 안드로이드 빌드 스크립트 파일의 일부입니다. isNewArchitectureEnabled는 환경 변수에서 새 아키텍처 변수가 true로 설정되어 있는지 확인한 다음, src 폴더의 새 arch 디렉토리에서 NativeModuleSpec 추상 클래스와 ReactNativeCodeGen의 구성 파일을 가져옵니다. false를 반환하면 개발자가 직접 선언한 이전 아치에 있는 추상 클래스를 임포트합니다. 두 클래스의 이름과 주요 속성은 정확히 동일하지만 내부 구현은 터보 모듈과 다릅니다.

```diagram
android
├─ build.gradle
├─ gradle.properties
└─ src
   ├─ main
   │  ├─ AndroidManifest.xml
   │  ├─ java
   │  │  └─ com
   │  │    └─ gBike
   │  │       └─ segwayBleManager
   │  │        ├─ SegwayBleManagerModule.kt
   │  │        └─ SegwayBleManagerPackage.kt
   │  └─ newArch
   │      └─ SegwayBleManagerSpec.kt
   └──── oldArch
          └─ SegwayBleManagerSpec.kt
/// no need to think about to implement which class.
```

위의 다이어그램은 해당 디렉터리의 실제 구조를 나타냅니다. 두 인터페이스의 이름은 모두 SegwayBleManagerSpec.kt이며, 환경에 따라 적절한 arch 디렉토리에 접근하기 때문에 간단한 클래스 이름만 사용하여 SegwayBleManagerModule.kt를 임포트할 수 있습니다.

## 차량 및 IoT 모듈 상태

이 코드는 타입스크립트로 작성되었으며 차량 정보 및 IoT 디바이스 정보에 대한 여러 인터페이스를 정의합니다. 또한 지원되는 이벤트 이름에 대한 열거도 포함되어 있습니다.

`Scooter` 인터페이스는 스쿠터 번호, 디바이스 MAC 주소, 디바이스 키, IMEI와 같은 스쿠터에 대한 속성을 정의합니다.

```typescript
export interface Scooter {
  number: string;
  deviceMac: string;
  deviceKey: string;
  iotImei: string;
}
```

`VehicleInfo` 인터페이스는 배터리 백분율 값, 속도 모드, 현재 속도, 총 주행 가능 거리, 남은 주행 가능 거리 등 차량 정보에 대한 속성을 정의합니다. 또한 Android에서는 사용할 수 있지만 Java에서는 더 이상 사용되지 않고 iOS에는 존재하지 않는 일부 사용 중단된 프로퍼티도 포함되어 있습니다. 이러한 사용되지 않는 프로퍼티는 `powerPercent` 및 `speedMode`와 같은 새로운 프로퍼티로 대체됩니다.

```typescript
export interface VehicleInfo {
  powerPercent: number;
  speedMode: number;
  currentSpeed: number;
  totalRange: number;
  remainingRange: number;
}
```

`IoTInformation` 인터페이스는 배터리의 최저전압 및 최고전압, 충전 상태, 버전 번호와 같은 IoT 디바이스의 정보에 대한 속성을 정의합니다. 나인봇의 모듈 특성 상 iOS와 Android의 인터페이스와 데이터타입이 완전히 일치하지는 않아, 더 이상 사용되지 않는 @deprecated 프로퍼티가 포함되어 있으며, 타입스크립트 사용 시에 JSDoc을 통해 알 수 있습니다. 각각 `majorVersionNumber`, `minorVersionNumber`, `updateTimes`와 같은 새로운 프로퍼티로 대체됩니다.

```typescript
export interface IoTInformation {
  lowBatteryVoltage: number;
  highBatteryVoltage: number;
  powerStatus: number;
  majorVersionNumber: number;
  minorVersionNumber: number;
  versionRevisions: number;
  modifiedTimes: number;
  updateTimes: number;
  isLocked: boolean;
  voltage: number;
}
```

마지막으로 `EventNames` 이넘 타입은 지원되는 이벤트 이름을 정의하며, 이는 네이티브 모듈의 이벤트 이름과 동일해야 합니다.

```typescript
export interface IoTInformation {
  lowBatteryVoltage: number;
  highBatteryVoltage: number;
  powerStatus: number;
  majorVersionNumber: number;
  minorVersionNumber: number;
  versionRevisions: number;
  modifiedTimes: number;
  updateTimes: number;
  isLocked: boolean;
  voltage: number;
}
```

## 인터페이스 상세 정보

모듈의 인터페이스는 다음과 같은 메서드로 구성됩니다:

### `getConstants()`

이 메서드는 다음 속성을 가진 상수 객체를 반환합니다:

- `supportedEvents`: 지원되는 이벤트 유형 배열
- `moduleName`: 모듈의 이름

### `init(secretKey: string, operatorCode: string, isDebug: boolean): Promise<boolean>`

이 메서드는 비밀 키, 오퍼레이터 코드, 그리고 모듈이 디버그 모드로 실행되어야 하는지의 여부를 나타내는 플래그를 파라미터로 사용하여 모듈을 초기화합니다. 초기화에 성공했는지 여부를 나타내는 부울 값으로 확인되는 프로미스를 반환합니다.

### `connect(deviceMac: string, deviceKey: string, iotImei: string): void`

지정된 MAC 주소, 디바이스 키, IoT IMEI로 세그웨이 차량에 연결을 설정합니다.

### `disconnect(): Promise<boolean>`

세그웨이 차량과의 연결을 끊고 연결 끊기 성공 여부를 나타내는 부울 값으로 확인되는 프로미스로 반환합니다.

### `unLock(): Promise<boolean>`

세그웨이 차량의 잠금을 해제하고 잠금 해제가 성공했는지 여부를 나타내는 부울 값으로 확인되는 프로미스로 반환합니다.

### `lock(): Promise<boolean>`

세그웨이 차량을 잠그고 잠금이 성공했는지 여부를 나타내는 부울 값으로 확인되는 프로미스를 반환하는 메서드입니다.

### `openBatteryCover(): Promise<boolean>`

세그웨이 차량의 배터리 커버를 열고 작업 성공 여부를 나타내는 부울 값으로 해석되는 프로미스를 반환하는 메서드입니다.

### `openSaddle(): Promise<boolean>`

세그웨이 차량의 안장을 열고 작업 성공 여부를 나타내는 부울 값으로 해석되는 프로미스를 반환하는 메서드입니다.

### `openTailBox(): Promise<boolean>`

세그웨이 비히클의 테일 박스를 열고 작업 성공 여부를 나타내는 부울 값으로 해석되는 프로미스를 반환하는 메서드입니다.

### `queryVehicleInformation(listener): void`

세그웨이 차량에 펌웨어 버전, 시리얼 번호, 배터리 잔량 등 디바이스에 대한 정보를 쿼리합니다.

### `queryIoTInformation(listener): void`

세그웨이 차량 디바이스의 네트워크 상태, 신호 세기, IMEI와 같은 IoT 정보를 조회합니다.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
