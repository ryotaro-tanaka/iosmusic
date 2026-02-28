#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LocalTrackScanner, NSObject)

RCT_EXTERN_METHOD(scanM4ATracks:(NSString *)targetSubDirectory
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getTargetDirectoryPath:(NSString *)targetSubDirectory
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
