import { NativeModules, Platform } from 'react-native';

import type { TrackListItem, TrackRepository } from '../domain/track';
import type { Logger } from './logger';

const TARGET_SUB_DIRECTORY = 'm4a';

type NativeTrackItem = {
  id: string;
  title: string;
  uri: string;
  durationMs?: number | null;
};

type LocalTrackScannerNativeModule = {
  scanM4ATracks(targetSubDirectory: string): Promise<NativeTrackItem[]>;
  getTargetDirectoryPath(targetSubDirectory: string): Promise<string>;
};

const localTrackScannerModule =
  NativeModules.LocalTrackScanner as LocalTrackScannerNativeModule | undefined;

export class FileSystemTrackRepository implements TrackRepository {
  constructor(private readonly logger: Logger) {}

  async findPlayableM4ATracks(): Promise<TrackListItem[]> {
    if (!localTrackScannerModule) {
      this.logger.error('LocalTrackScanner native module is not registered.', {
        platform: Platform.OS,
      });
      throw new Error('端末ファイル探索モジュールが未設定です。');
    }

    try {
      const tracks = await localTrackScannerModule.scanM4ATracks(TARGET_SUB_DIRECTORY);
      return tracks.sort((a, b) => a.title.localeCompare(b.title, 'ja'));
    } catch (error) {
      this.logger.error('Failed to scan local M4A files.', { error });
      throw new Error('M4Aファイル一覧の読み込みに失敗しました。');
    }
  }
}

export const getM4ATargetDirectoryPath = async (): Promise<string> => {
  if (!localTrackScannerModule) {
    return '(native module not available)';
  }

  return localTrackScannerModule.getTargetDirectoryPath(TARGET_SUB_DIRECTORY);
};
