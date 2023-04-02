
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
     isDebug:(BOOL)isDebug;
- (void)connect:(NSString *)deviceMac
      deviceKey:(NSString *)deviceKey
        iotImei:(NSString *)iotImei;
- (void)disconnect;
- (void)unLock;
- (void)lock;
- (void)openBatteryCover;
- (void)openSaddle;
- (void)openTailBox;
- (void)queryVehicleInformation;
- (void)queryIoTInformation;
- (void)addListener:(NSString *)eventType;
- (void)removeListeners:(double)count;
- (NSDictionary *)constantsToExport;
- (NSDictionary *)getConstants;

@end
