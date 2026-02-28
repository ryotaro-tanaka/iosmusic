import Foundation
import React

@objc(LocalTrackScanner)
class LocalTrackScanner: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(scanM4ATracks:resolver:rejecter:)
  func scanM4ATracks(
    _ targetSubDirectory: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    do {
      let tracks = try listM4AFiles(targetSubDirectory: targetSubDirectory)
      resolve(tracks)
    } catch {
      reject("E_SCAN_FAILED", "Failed to scan M4A files.", error)
    }
  }

  @objc(getTargetDirectoryPath:resolver:rejecter:)
  func getTargetDirectoryPath(
    _ targetSubDirectory: String,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) {
    do {
      let targetDirectory = try getTargetDirectoryURL(targetSubDirectory: targetSubDirectory)
      resolve(targetDirectory.path)
    } catch {
      reject("E_TARGET_PATH", "Failed to resolve target directory path.", error)
    }
  }

  private func listM4AFiles(targetSubDirectory: String) throws -> [[String: Any?]] {
    let fileManager = FileManager.default
    let targetDirectory = try getTargetDirectoryURL(targetSubDirectory: targetSubDirectory)

    var isDirectory: ObjCBool = false
    let exists = fileManager.fileExists(atPath: targetDirectory.path, isDirectory: &isDirectory)

    if !exists || !isDirectory.boolValue {
      return []
    }

    let urls = try fileManager.contentsOfDirectory(
      at: targetDirectory,
      includingPropertiesForKeys: [.isRegularFileKey, .fileSizeKey],
      options: [.skipsHiddenFiles]
    )

    var tracks: [[String: Any?]] = []

    for fileURL in urls {
      let resourceValues = try fileURL.resourceValues(forKeys: [.isRegularFileKey, .fileSizeKey])

      guard resourceValues.isRegularFile == true else {
        continue
      }

      guard fileURL.pathExtension.lowercased() == "m4a" else {
        continue
      }

      let fileSize = resourceValues.fileSize ?? 0
      guard fileSize > 0 else {
        continue
      }

      tracks.append([
        "id": fileURL.path,
        "title": fileURL.lastPathComponent,
        "uri": fileURL.absoluteString,
        "durationMs": NSNull(),
      ])
    }

    return tracks.sorted {
      let lhs = ($0["title"] as? String) ?? ""
      let rhs = ($1["title"] as? String) ?? ""
      return lhs.localizedStandardCompare(rhs) == .orderedAscending
    }
  }

  private func getTargetDirectoryURL(targetSubDirectory: String) throws -> URL {
    guard let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else {
      throw NSError(domain: "LocalTrackScanner", code: 1, userInfo: [NSLocalizedDescriptionKey: "Documents directory not found"])
    }

    return documentsDirectory.appendingPathComponent(targetSubDirectory, isDirectory: true)
  }
}
