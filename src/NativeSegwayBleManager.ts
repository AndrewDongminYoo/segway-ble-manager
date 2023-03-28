import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getConstants(): {
    supportedEvents: string[];
    moduleName: string;
  };
  init(secretKey: string, operatorCode: string, isDebug: boolean): void;
  connect(deviceMac: string, deviceKey: string, iotImei: string): void;
  disconnect(): void;
  unLock(): void;
  lock(): void;
  openBatteryCover(): void;
  openSaddle(): void;
  openTailBox(): void;
  queryVehicleInformation(): void;
  queryIoTInformation(): void;
  addListener(eventType: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SegwayBleManager') as Spec;
