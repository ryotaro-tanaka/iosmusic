# M1-1 実機確認ガイド（iPhone）

最終更新: 2026-02-28

## 1. 先に結論

- あなたの理解「**Macで clone → Xcodeでビルド → iPhoneへインストール**」は、**ほぼ正しい**。
- ただし現状は、ビルド前に最低1つだけ前提がある。
  - JS 側が `LocalTrackScanner` ネイティブモジュールを呼ぶ設計なので、iOS 側実装が必要。
- その前提がリポジトリに入っていれば、Mac 側作業はほぼ `git clone` とビルドだけで完結する。

## 2. 個人アプリなら何が不要で、何が必要か

### 2.1 不要（配布しない前提）

- App Store 提出向け設定
- TestFlight 配布設定
- ストア申請用メタデータ整備

### 2.2 必要（自分のiPhoneに入れるだけでも必要）

- Mac + Xcode
- Apple ID での署名設定（無料枠でも可）
- 実機インストールのための Team/Signing 設定
- iOS ネイティブ実装（`LocalTrackScanner`）

## 3. 「Mac上での追加コーディングは不要」にできるか

結論として、**可能**。ただし条件がある。

- 条件A: `ios/` プロジェクトが repo に含まれている
- 条件B: `LocalTrackScanner` 実装が repo に含まれている

この2つが満たされれば、Mac 側は「clone してビルド」中心になる。

> 現在の repo には `ios/` が見当たらないため、今のままでは条件Aが未充足。

## 4. なぜ `LocalTrackScanner` 実装が必須か

JS 側実装は `NativeModules.LocalTrackScanner` を前提にしている。

- `scanM4ATracks(targetSubDirectory)`
- `getTargetDirectoryPath(targetSubDirectory)`

このモジュールが未登録だと一覧取得が失敗する。

## 5. iOS 側の実装要件（最小）

M1-1 仕様に合わせ、ネイティブ側で以下を満たす。

- 対象フォルダ: `Documents/<targetSubDirectory>`（想定 `Documents/m4a`）
- 対象拡張子: `.m4a` / `.M4A`
- 除外: 0バイト
- 不正ファイル: スキップ + ログ
- 並び順: ファイル名昇順
- 返却: `{ id, title, uri, durationMs }`

エラー系の扱い:

- フォルダ未存在: 空配列 + 警告ログ
- 読み取り失敗: エラー返却（UI で再読み込み可能）

## 6. 推奨手順（最短）

### Step 0: 事前判定

1. `ios/` があるか
2. `LocalTrackScanner` 実装があるか

### Step 1: 前提が揃っている場合（理想）

1. `git clone`
2. `npm install`
3. `npx pod-install ios`
4. `ios/*.xcworkspace` を Xcode で開く
5. Team/Signing を設定
6. 実機を選んで Build/Run

### Step 2: 前提が不足している場合

- `ios/` がない → 先に iOS プロジェクトを生成して取り込む
- `LocalTrackScanner` がない → 先に iOS ネイティブモジュールを実装する

## 7. M1-1 の実機テスト

1. `Documents/m4a` を空にして起動し、空状態文言を確認
2. M4Aを3件配置し、3件表示を確認
3. 「再読み込み」を3回押して件数一致を確認
4. 0バイト M4A が一覧に出ないことを確認

## 8. よくある誤解への回答

### Q. 「個人アプリなら Xcode 設定は不要？」

- いいえ。実機インストール時の署名設定は必要。

### Q. 「iPhoneだけで完結できる？」

- いいえ。iOS ネイティブ実装とビルドには通常 Mac + Xcode が必要。

### Q. 「今ここで実装しておけば、Macでは clone とビルドだけで済む？」

- はい、**repo に `ios/` と `LocalTrackScanner` 実装まで含めれば**その運用に近づける。
