import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  init(secretKey: string, operatorCode: string, isDebug: boolean): void;
  connect(bleMac: string, bleKey: string, iotImei: string): void;
  disconnect(): void;
  unlock(): void;
  lock(): void;
  vehicleInfo(): void;
  openBattebryCover(): void;
  openSaddle(): void;
  openTailBox(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SegwayBleManager');
