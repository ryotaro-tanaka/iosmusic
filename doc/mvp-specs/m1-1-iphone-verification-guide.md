# M1-1 実機確認ガイド（iPhone）

最終更新: 2026-02-28

## 1. 結論（先に要点）

- **MacBook（macOS + Xcode）は必要**。
- **iPhoneだけでは不可**（このリポジトリの現状態では、ビルド前に iOS 側実装が必要）。
- 「cloneして Xcode でビルドしてインストール」だけで済むのは、
  - iOS プロジェクト（`ios/`）が存在し、
  - かつ `LocalTrackScanner` ネイティブモジュールが実装済み、
  の場合のみ。

## 2. なぜビルド前作業が必要か

JS 側の実装は `NativeModules.LocalTrackScanner` を必須としており、未登録時はエラーになる。

- `scanM4ATracks(targetSubDirectory)`
- `getTargetDirectoryPath(targetSubDirectory)`

上記2メソッドを iOS ネイティブ側で提供しないと、M1-1 の一覧取得は失敗する。

## 3. 事前チェック（5分）

1. リポジトリ直下に `ios/` フォルダがあるか確認
2. iOS 側に `LocalTrackScanner` 実装があるか確認
3. Apple Developer 設定（Team / Signing）ができるか確認

`ios/` がない場合は、まず iOS プロジェクトを作る必要がある（セクション4）。

## 4. iOS プロジェクトがない場合の準備

> 現在のリポジトリは `ios/` フォルダが見当たらないため、この手順が必要な可能性が高い。

1. Node / npm / Ruby(CocoaPods) を整える
2. `npx react-native@0.79.5 init TempApp --skip-install` などで同バージョン雛形を作成
3. 生成された `ios/` を本リポジトリに取り込む
4. `npx pod-install ios`
5. `ios/*.xcworkspace` を Xcode で開く

> 既存プロジェクトの構成を壊さないよう、別ブランチで作業すること。

## 5. `LocalTrackScanner` の実装要件（iOS 側）

M1-1 仕様に合わせて、ネイティブ側で以下を実装する。

### 5.1 入力

- `targetSubDirectory`（想定: `m4a`）

### 5.2 探索仕様

- ベースは App Documents ディレクトリ
- 探索対象は `Documents/<targetSubDirectory>`
- 拡張子 `.m4a` / `.M4A` を対象
- 0バイトを除外
- 読み取り不可・不正ファイルはスキップ + ログ
- ファイル名昇順で返却

### 5.3 返却データ形

各要素に最低限以下を含める。

- `id`: 一意（例: フルパス）
- `title`: ファイル名
- `uri`: `file://` 付きパス
- `durationMs`: `null` 可

### 5.4 エラー時

- フォルダ未存在: 空配列を返し警告ログ
- 読み取り失敗: エラーを返す（UI側でエラーメッセージ表示）

## 6. Xcode でのビルド〜実機インストール

1. Mac に iPhone を接続
2. `ios/*.xcworkspace` を Xcode で開く
3. Target > Signing & Capabilities で Team を設定
4. Bundle Identifier をユニーク値に調整（必要なら）
5. 実機を Run Destination に選択
6. Product > Build
7. Product > Run でインストール
8. 初回は iPhone 側で開発者信頼を許可

## 7. M1-1 手動テスト手順（実機）

1. `Documents/m4a` を空にして起動
   - 「再生可能なM4Aファイルが見つかりません」を確認
2. 同フォルダに M4A を3件入れて再起動または「再読み込み」
   - 3件表示されることを確認
3. 「再読み込み」を3回連続実行
   - 件数が毎回一致することを確認
4. 0バイトの `.m4a` を配置
   - 一覧に出ないことを確認

## 8. よくある詰まりポイント

- `No such module` / Build error: Pod 未導入 or Xcode バージョン不一致
- `NativeModules.LocalTrackScanner` が undefined: ネイティブ実装未登録
- 実機に入らない: Signing / Provisioning 設定不足
- ファイルが出ない: 配置先が `Documents/m4a` 以外

## 9. 追加メモ（運用上のおすすめ）

- 実機確認用に M4A テストデータ（0件/3件/0バイト）を固定化する
- ログ（対象フォルダ、除外件数、最終件数）を毎回確認する
- M1-1 完了判定は DoD に沿って記録を残す
