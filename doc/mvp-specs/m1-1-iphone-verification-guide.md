# M1-1 実機確認手順（MacBook + iPhone）

最終更新: 2026-02-28

## あなたの作業（この順番で実施）

1. MacBook に Xcode をインストールして起動し、初期セットアップを完了する。
2. Node.js を 18.18 以上（推奨: 20 LTS）に更新し、`node -v` を確認する。
3. リポジトリを clone してルートで `npm install` を実行する。
4. `npm ls @react-native-community/cli` が空の場合は `npm i -D @react-native-community/cli` を実行する。
5. `ios/` 配下に `.xcodeproj` がない場合は、React Native 0.79.5 の iOS プロジェクト雛形を作成して `ios/` 一式をこのリポジトリへ配置する。
6. `ios` プロジェクトに `ios/iosmusic/LocalTrackScanner.swift` と `ios/iosmusic/LocalTrackScanner.m` を追加する。
7. `npx pod-install ios` を実行する。
8. `ios/*.xcworkspace` を Xcode で開く。
9. Target の Signing で Team を設定する。
10. iPhone を接続し、Run Destination で実機を選択する。
11. Build / Run を実行して iPhone にインストールする。
12. iPhone の Files でアプリ Documents 配下に `m4a` フォルダを作成し、M4A ファイルを配置する。
13. アプリで「再読み込み」を押し、0件・3件・0バイトM4A除外を確認する。
