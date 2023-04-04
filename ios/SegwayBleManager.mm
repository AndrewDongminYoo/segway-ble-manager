#import "SegwayBleManager.h"
#import <NBIoTBleKit/NBIoTBleKit.h>

@interface SegwayBleManager() <NBIoTBleDelegate>

@property(nonatomic, copy) RCTPromiseResolveBlock unlockResolve;
@property(nonatomic, copy) RCTPromiseRejectBlock unlockReject;

@property(nonatomic, copy) RCTPromiseResolveBlock lockResolve;
@property(nonatomic, copy) RCTPromiseRejectBlock lockReject;

@property(nonatomic, copy) RCTPromiseResolveBlock batteryCoverResolve;
@property(nonatomic, copy) RCTPromiseRejectBlock batteryCoverReject;

@property(nonatomic, copy) RCTPromiseResolveBlock saddleResolve;
@property(nonatomic, copy) RCTPromiseRejectBlock saddleReject;

@property(nonatomic, copy) RCTPromiseResolveBlock tailBoxResolve;
@property(nonatomic, copy) RCTPromiseRejectBlock tailBoxReject;

@end

@implementation SegwayBleManager {
    bool hasListeners;
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[
        @"InitializeResult",
        @"DisconnectResult",
        @"ConnectResult",
        @"UnlockResult",
        @"LockResult",
        @"VehicleInfoResult",
        @"OpenCoverResult",
        @"OpenSaddleResult",
        @"OpenTailBoxResult",
        @"IoTInfoResult",
    ];
}

- (void)startObserving {
    hasListeners = YES;
}

- (void)stopObserving {
    hasListeners = NO;
}

- (void)onSuccess:(NSString *)eventName
           result:(BOOL)result {
    NSString * toBool = result ? @"true" : @"false";
    NSLog(@"BluetoothKit : %@: %@", eventName, toBool);
    [self sendEventWithName:eventName body:@{
                  @"result": [NSNumber numberWithBool:result]}];
}

- (void)onFailure:(NSString *)eventName
          message:(NSString *)
     message code:(NSInteger)code {
    [self sendEventWithName:eventName
                       body:@{
                  @"result": @(NO),
                 @"message": message,
                    @"code": [NSString stringWithFormat:@"%ldd", code]}];
}

/// Register sdk, should be called first
/// You can get platformCode and secret key from Dashboard
/// @param operatorCode platform code
/// @param secretKey secret key
/// @param isDebug whether if is developing build
/// @param completionHandler called when the register is finished.
RCT_EXPORT_METHOD(init:(NSString *)secretKey
          operatorCode:(NSString *)operatorCode
               isDebug:(BOOL)isDebug
               resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject) {
    if (isDebug) {
        [NBIoTBleService.shared setIsDebugEnabled:isDebug];
    }
    [NBIoTBleService.shared startWithOperatorCode:operatorCode
                                        andSecret:secretKey
                                /// cSpell:ignoreWord: Hanlder
                                completionHanlder:^(BOOL isSuccess, NSError * _Nullable error) {
        if (error) {
             NSLog(@"%@", error);
            [self onFailure:@"InitializeResult"
                    message:error.description
                       code:error.code];
        } else {
            [self onSuccess:@"InitializeResult"
                     result:isSuccess];
        }
    }];
};

RCT_EXPORT_METHOD(queryVehicleInformation) {
    [self.iotController queryVehicleInformation];
};

RCT_EXPORT_METHOD(queryIoTInformation) {
    [self.iotController queryIoTInformation];
};

/// try to connect bluetooth equipment
/// @param iotImei imei
/// @param deviceMac mac address
/// @param deviceKey device key
RCT_EXPORT_METHOD(connect:(NSString *)deviceMac
                deviceKey:(NSString *)deviceKey
                  iotImei:(NSString *)iotImei) {
    NSLog(@"invoke from RN side: %@,%@,%@", iotImei, deviceMac, deviceKey);
    [self.iotController connectDeviceByIMEI:iotImei
                                 macAddress:deviceMac
                               andDeviceKey:deviceKey];
};

RCT_EXPORT_METHOD(disconnect:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject) {
    [self.iotController disconnect];
}

RCT_EXPORT_METHOD(unLock:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    self.unlockResolve = resolve;
    self.unlockReject = reject;
    [self.iotController unlock];
};

RCT_EXPORT_METHOD(lock:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject) {
    self.lockResolve = resolve;
    self.lockReject = reject;
    [self.iotController lock];
};

RCT_EXPORT_METHOD(openBatteryCover:(RCTPromiseResolveBlock)resolve
                            reject:(RCTPromiseRejectBlock)reject){
    self.batteryCoverResolve = resolve;
    self.batteryCoverReject = reject;
    [self.iotController openBatteryCover];
};

RCT_EXPORT_METHOD(openSaddle:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject){
    self.saddleResolve = resolve;
    self.saddleReject = reject;
    [self.iotController openSaddle];
};

RCT_EXPORT_METHOD(openTailBox:(RCTPromiseResolveBlock)resolve
                       reject:(RCTPromiseRejectBlock)reject){
    self.tailBoxResolve = resolve;
    self.tailBoxReject = reject;
    [self.iotController openTailBox];
};

# pragma mark - NBIoTBleDelegate
- (void)connectionStateChange:(ConnectionState)state {
    NSLog(@"connection state changed: %ld", state);
    [self sendEventWithName:@"ConnectResult"
                       body:@(state)];
}

- (void)connectDeviceOnError:(NSError *)error {
    NSLog(@"connection on error: %@", error);
    [self onFailure:@"ConnectResult"
            message:error.description
               code:error.code];
}

- (void)bluetoothStateChanged: (CBManagerState)state {
    NSLog(@"bluetooth state changed: %ld", state);
    [self sendEventWithName:@"ConnectResult"
                       body:@(state)];
}

/// lock result
/// @param isSuccess YES or NO
- (void)lockScooterResult:(BOOL)isSuccess
                withError:(NSError *_Nullable)error {
    if (error) {
          [self onFailure:@"LockResult"
                  message:error.description
                     code:error.code];
          return;
    }
    [self sendEventWithName:@"LockResult"
                       body:[NSNumber numberWithBool:isSuccess]];
}

/// unlock result
/// @param isSuccess YES/NO
- (void)unlockScooterResult:(BOOL)isSuccess
                  withError:(NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"UnlockResult"
                message:error.description
                   code:error.code];
        return;
    }
    [self sendEventWithName:@"UnlockResult"
                       body:[NSNumber numberWithBool:isSuccess]];
}

/// query IoT information
/// @param iotInfo information model
/// @param error if error returned, the iotInfo will be nil.
- (void)queryIoTInformationResult:(NBIoTInfo * _Nullable)iotInfo
                        withError:(NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"IoTInfoResult"
                message:error.description
                   code:error.code];
        return;
    }
    NSLog(@"%@", iotInfo);
    [self sendEventWithName:@"IoTInfoResult"
                       body:[self dictionaryFromIoTInfo:iotInfo]];
}

/// query scooter information finished
/// @param vehicleInfo vehicle information
/// @param error if error returned, the scooterInfo will be nil.
- (void)queryVehicleInformationResult:(NBVehicleInfo * _Nullable)vehicleInfo
                            withError:(NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"VehicleInfoResult"
                message:error.description
                   code:error.code];
        return;
    }
    NSLog(@"%@", vehicleInfo);
    [self sendEventWithName:@"VehicleInfoResult"
                       body:[self dictionaryFromVehicleInfo:vehicleInfo]];
}


/// open battery cover result
/// @param isFinished YES/NO
- (void)openBatteryCoverResult:(BOOL)isFinished
                     withError:(NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"OpenCoverResult"
                message:error.description
                   code:error.code];
        return;
    }
    [self sendEventWithName:@"OpenCoverResult"
                       body:[NSNumber numberWithBool:isFinished]];
}

/// open saddle result
/// @param isFinished YES/NO
- (void)openSaddleResult:(BOOL)isFinished
               withError:(NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"OpenSaddleResult"
                message:error.description
                   code:error.code];
        return;
    }
    [self sendEventWithName:@"OpenSaddleResult"
                       body:[NSNumber numberWithBool:isFinished]];
}

/// open tail box result
/// @param isFinished YES/NO
- (void)openTailBoxResult:(BOOL)isFinished
                withError:(NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"OpenTailBoxResult"
                message:error.description
                   code:error.code];
        return;
    }
    [self sendEventWithName:@"OpenTailBoxResult"
                       body:[NSNumber numberWithBool:isFinished]];
}

- (NSDictionary *)dictionaryFromIoTInfo:(NBIoTInfo * _Nullable)iotInfo {
    return @{
        @"voltage": [NSNumber numberWithInt:iotInfo.voltage],
        @"isLocked": [NSNumber numberWithBool:iotInfo.isLocked],
        @"updateTimes": [NSNumber numberWithInt:iotInfo.updateTimes],
        @"minorVersionNumber": [NSNumber numberWithInt:iotInfo.minorVersionNumber],
        @"majorVersionNumber": [NSNumber numberWithInt:iotInfo.majorVersionNumber],
    };
};

- (NSDictionary *)dictionaryFromVehicleInfo:(NBVehicleInfo * _Nullable)vehicleInfo {
    return @{
        @"powerPercent": [NSNumber numberWithInt:vehicleInfo.powerPercent],
        @"speedMode": @(vehicleInfo.speedMode), // NS_ENUM(NSUInteger, NBSpeedMode) 1|2|3
        @"remainingRange": [NSNumber numberWithInt:vehicleInfo.remainingRange],
        @"totalRange": [NSNumber numberWithInt:vehicleInfo.totalRange],
        @"currentSpeed": [NSNumber numberWithInt:vehicleInfo.currentSpeed]
    };
}

- (NBIoTBle *)iotController {
    if (!_iotController) {
        _iotController = [[NBIoTBle alloc] init];
        _iotController.delegate = self;
    }
    return _iotController;
}

- (NSDictionary *)constantsToExport {
    return [self getConstants];
}

- (NSDictionary *)getConstants {
    return @{
        @"supportedEvents" : [self supportedEvents],
        @"moduleName" : @"SegwayBleManager",
    };
}

- (NSDictionary *)typesToExport {
    return @{
        @"ConnectionStateDisconnected": @(ConnectionStateDisconnected),
        @"ConnectionStateConnected": @(ConnectionStateConnected),
        @"CBManagerStateUnknown": @(CBManagerStateUnknown),
        @"CBManagerStateResetting": @(CBManagerStateResetting),
        @"CBManagerStateUnsupported": @(CBManagerStateUnsupported),
        @"CBManagerStateUnauthorized": @(CBManagerStateUnauthorized),
        @"CBManagerStatePoweredOff": @(CBManagerStatePoweredOff),
        @"CBManagerStatePoweredOn": @(CBManagerStatePoweredOn)
    };
}

- (void)addListener:(NSString *)eventType {
}

- (void)removeListeners:(double)count {
}

@end

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSegwayBleManagerSpecJSI>(params);
}

#endif
