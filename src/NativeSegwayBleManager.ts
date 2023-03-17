import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  init(
    secretKey: string,
    operatorCode: string,
    isDebug: boolean,
    callback: (msg: string) => void
  ): void;
  connect(
    bleMac: string,
    bleKey: string,
    iotImei: string,
    callback: () => void
  ): void;
  disconnect(callback: () => void): void;
  unLock(callback: () => void): void;
  lock(callback: () => void): void;
  vehicleInfo(callback: () => void): void;
  openBatteryCover(callback: () => void): void;
  openSaddle(callback: () => void): void;
  openTailBox(callback: () => void): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SegwayBleManager');
