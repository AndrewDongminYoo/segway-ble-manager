import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getConstants(): {
    supportedEvents: string[];
    moduleName: string;
  };
  init(secretKey: string, operatorCode: string, isDebug: boolean): Promise<boolean>;
  connect(deviceMac: string, deviceKey: string, iotImei: string): void;
  disconnect(): Promise<boolean>;
  unLock(): Promise<boolean>;
  lock(): Promise<boolean>;
  openBatteryCover(): Promise<boolean>;
  openSaddle(): Promise<boolean>;
  openTailBox(): Promise<boolean>;
  queryVehicleInformation(): void;
  queryIoTInformation(): void;
  addListener(eventType: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SegwayBleManager') as Spec;
