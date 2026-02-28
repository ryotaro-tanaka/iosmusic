# M1-1 実機確認手順（MacBook + iPhone）

最終更新: 2026-02-28

## あなたの作業（この順番で実施）

1. MacBook に Xcode をインストールして起動し、初期セットアップを完了する。
2. ターミナルでリポジトリを clone する。
3. プロジェクト直下で `npm install` を実行する。
4. `ios` フォルダを Xcode のプロジェクトに取り込む（`ios/iosmusic/LocalTrackScanner.swift` と `ios/iosmusic/LocalTrackScanner.m`）。
5. 必要なら `npx pod-install ios` を実行する。
6. Xcode で `.xcworkspace` を開く。
7. Target の Signing で Team を設定する。
8. iPhone を MacBook に接続し、Run Destination で自分の iPhone を選択する。
9. Build / Run を実行して iPhone にインストールする。
10. iPhone の Files でアプリの Documents 配下に `m4a` フォルダを作成する。
11. `m4a` フォルダにテスト用 M4A を配置する。
12. アプリを起動して「再読み込み」を押し、一覧表示を確認する。
13. 0件・3件・0バイトM4Aの3ケースを確認する。
