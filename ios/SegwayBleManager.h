
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
- (NSNumber *)connect:(NSString *)deviceMac
            deviceKey:(NSString *)deviceKey
              iotImei:(NSString *)iotImei;
- (NSNumber *)disconnect;
- (NSNumber *)unLock;
- (NSNumber *)lock;
- (void)vehicleInfo;
- (NSNumber *)openBatteryCover;
- (NSNumber *)openSaddle;
- (NSNumber *)openTailBox;

@end
