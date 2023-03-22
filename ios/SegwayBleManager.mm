#import "SegwayBleManager.h"
#import <NBIoTBleKit/NBIoTBleKit.h>

@implementation SegwayBleManager

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

- (void)onSuccess:(NSString *)eventName result:(BOOL)result {
    NSString * toBool = result ? @"true" : @"false";
    NSLog(@"BluetoothKit : %@: %@", eventName, toBool);
    [self sendEventWithName:eventName body:@{
                  @"result": [NSNumber numberWithBool:result]}];
}

- (void)onFailure:(NSString *)eventName message:(NSString *)message code:(NSInteger)code {
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
               isDebug:(BOOL)isDebug) {
    if (isDebug) {
        [NBIoTBleService.shared setIsDebugEnabled:isDebug];
    }
    [NBIoTBleService.shared startWithOperatorCode:operatorCode
                                        andSecret:secretKey
                                completionHanlder:^(BOOL isSuccess, NSError * _Nullable error) {
         if (error) {
             NSLog(@"%@", error);
             [self onFailure:@"InitializeResult" message:error.description code:error.code];
         } else {
             [self onSuccess:@"InitializeResult" result:isSuccess];
         }
     }];
};

RCT_EXPORT_METHOD(queryVehicleInformation) {
    [self.iotController queryVehicleInformation];
};

RCT_EXPORT_METHOD(queryIoTInformation) {
    [self.iotController queryIoTInformation];
};

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(connect:(NSString *)bleMac
                                        bleKey:(NSString *)bleKey
                                       iotImei:(NSString *)iotImei) {
    NSLog(@"invoke from RN side: %@,%@,%@", iotImei, bleMac, bleKey);
    [self.iotController connectDeviceByIMEI:iotImei
                                 macAddress:bleMac
                               andDeviceKey:bleKey];
    return @(YES);
};

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(disconnect) {
    [self.iotController disconnect];
    return @(YES);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(unLock) {
    [self.iotController unlock];
    return @(YES);
};

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(lock) {
    [self.iotController lock];
    return @(YES);
};

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(openBatteryCover){
    [self.iotController openBatteryCover];
    return @(YES);
};

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(openSaddle){
    [self.iotController openSaddle];
    return @(YES);
};

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(openTailBox){
    [self.iotController openTailBox];
    return @(YES);
};

# pragma mark - NBIoTBleDelegate
- (void)connectionStateChange:(ConnectionState)state {
    NSLog(@"connection state changed: %ld", state);
    [self sendEventWithName:@"ConnectResult" body: @(state)];
}

- (void)connectDeviceOnError:(NSError *)error {
    NSLog(@"connection on error: %@", error);
    [self onFailure:@"ConnectResult" message:error.description code:error.code];
}

- (void)bluetoothStateChanged: (CBManagerState)state {
    NSLog(@"bluetooth state changed: %ld", state);
    [self sendEventWithName:@"ConnectResult" body:@(state)];
}

/// lock result
/// @param isSuccess YES or NO
- (void)lockScooterResult: (BOOL)isSuccess withError: (NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"LockResult" message:error.description code:error.code];
        return;
    }
    [self sendEventWithName:@"LockResult" body:[NSNumber numberWithBool:isSuccess]];
}

/// unlock result
/// @param isSuccess YES/NO
- (void)unlockScooterResult: (BOOL)isSuccess withError: (NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"UnlockResult" message:error.description code:error.code];
        return;
    }
    [self sendEventWithName:@"UnlockResult" body:[NSNumber numberWithBool:isSuccess]];
}

/// query IoT information
/// @param iotInfo information model
/// @param error if error returned, the iotInfo will be nil.
- (void)queryIoTInformationResult: (NBIoTInfo * _Nullable) iotInfo withError: (NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"IoTInfoResult" message:error.description code:error.code];
        return;
    }
    NSLog(@"%@", iotInfo);
    [self sendEventWithName:@"IoTInfoResult" body:[self dictionaryFromIoTInfo:iotInfo]];
}

/// query scooter information finished
/// @param vehicleInfo vehicle information
/// @param error if error returned, the scooterInfo will be nil.
- (void)queryVehicleInformationResult: (NBVehicleInfo * _Nullable) vehicleInfo withError: (NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"VehicleInfoResult" message:error.description code:error.code];
        return;
    }
    NSLog(@"%@", vehicleInfo);
    [self sendEventWithName:@"VehicleInfoResult" body:[self dictionaryFromVehicleInfo:vehicleInfo]];
}


/// open battery cover result
/// @param isFinished YES/NO
- (void)openBatteryCoverResult: (BOOL)isFinished withError: (NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"OpenCoverResult" message:error.description code:error.code];
        return;
    }
    [self sendEventWithName:@"OpenCoverResult" body:[NSNumber numberWithBool:isFinished]];
}

/// open saddle result
/// @param isFinished YES/NO
- (void)openSaddleResult: (BOOL)isFinished withError: (NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"OpenSaddleResult" message:error.description code:error.code];
        return;
    }
    [self sendEventWithName:@"OpenSaddleResult" body:[NSNumber numberWithBool:isFinished]];
}

/// open tail box result
/// @param isFinished YES/NO
- (void)openTailBoxResult: (BOOL)isFinished withError: (NSError *_Nullable)error {
    if (error) {
        [self onFailure:@"OpenTailBoxResult" message:error.description code:error.code];
        return;
    }
    [self sendEventWithName:@"OpenTailBoxResult" body:[NSNumber numberWithBool:isFinished]];
}

- (NSDictionary *)dictionaryFromIoTInfo:(NBIoTInfo * _Nullable)iotInfo {
    return @{
        @"voltage": [NSNumber numberWithInt:iotInfo.voltage],
        @"majorVersionNumber": [NSNumber numberWithInt:iotInfo.majorVersionNumber],
        @"minorVersionNumber": [NSNumber numberWithInt:iotInfo.minorVersionNumber],
        @"updateTimes": [NSNumber numberWithInt:iotInfo.updateTimes],
        @"isLocked": [NSNumber numberWithBool:iotInfo.isLocked]
    };
};

- (NSDictionary *)dictionaryFromVehicleInfo:(NBVehicleInfo * _Nullable) vehicleInfo {
    return @{
        @"powerPercent": [NSNumber numberWithInt:vehicleInfo.powerPercent],
        @"speedMode": @(vehicleInfo.speedMode),
        @"currentSpeed": @(vehicleInfo.currentSpeed),
        @"totalRange": @(vehicleInfo.totalRange),
        @"remainingRange": @(vehicleInfo.remainingRange)
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

@end

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSegwayBleManagerSpecJSI>(params);
}

#endif
