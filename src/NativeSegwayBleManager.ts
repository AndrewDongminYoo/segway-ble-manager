import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  init(secretKey: string, operatorCode: string, isDebug: boolean): void;
  connect(bleMac: string, bleKey: string, iotImei: string): boolean;
  disconnect(): boolean;
  unLock(): boolean;
  lock(): boolean;
  vehicleInfo(): void;
  openBatteryCover(): boolean;
  openSaddle(): boolean;
  openTailBox(): boolean;
  queryVehicleInformation(): void;
  queryIotInformation(): void;
  supportedEvents: string[];
}

export default TurboModuleRegistry.getEnforcing<Spec>('SegwayBleManager');
