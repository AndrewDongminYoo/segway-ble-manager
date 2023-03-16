
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSegwayBleManagerSpec.h"

@interface SegwayBleManager : NSObject <NativeSegwayBleManagerSpec>
#else
#import <React/RCTBridgeModule.h>

@interface SegwayBleManager : NSObject <RCTBridgeModule>
#endif

@end
