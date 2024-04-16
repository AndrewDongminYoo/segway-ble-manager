
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSegwayBleManagerSpec.h"

@interface SegwayBleManager : NSObject <NativeSegwayBleManagerSpec>
#else

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <NBIoTBleKit/NBIoTBleKit.h>

@interface SegwayBleManager : RCTEventEmitter <RCTBridgeModule, NBIoTBleDelegate>
@property(nonatomic, strong) NBIoTBle *iotController;

#endif

- (void)init:(NSString *)secretKey
operatorCode:(NSString *)operatorCode
     isDebug:(BOOL)isDebug
     resolve:(RCTPromiseResolveBlock)resolve
      reject:(RCTPromiseRejectBlock)reject;
- (void)connect:(NSString *)deviceMac
      deviceKey:(NSString *)deviceKey
        iotImei:(NSString *)iotImei;
- (void)disconnect:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject;
- (void)unLock:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject;
- (void)lock:(RCTPromiseResolveBlock)resolve
      reject:(RCTPromiseRejectBlock)reject;
- (void)openBatteryCover:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject;
- (void)openSaddle:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject;
- (void)openTailBox:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject;
- (void)queryVehicleInformation;
- (void)queryIoTInformation;
- (void)addListener:(NSString *)eventType;
- (void)removeListeners:(double)count;
- (NSDictionary *)constantsToExport;
- (NSDictionary *)getConstants;

@end
