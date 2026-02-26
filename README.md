# iosmusic

React Native + Expo で作成した iOS 音楽アプリ開発用プロジェクトです。

## 現在の状態（要約）

- `create-expo-app` テンプレートをベースにした初期構成
- `expo-router` のタブ構成（Home / Explore）
- ダークモード対応、カスタムフォント読み込み、ハプティクス、簡易アニメーション実装
- まだ音楽再生などのドメイン機能は未実装

詳細は `doc/implementation-status.md` を参照してください。

---

## 前提環境

以下のインストールを推奨します。

- Node.js 22 系（例: `v22.17.1`）
- npm 11 系（例: `11.4.2`）

> このリポジトリではグローバルに `expo` を入れず、`npx expo ...` を使用します。

バージョン確認:

```bash
node -v
npm -v
```

---

## 開発再開までの手順（最短）

### 1) 依存関係インストール

```bash
npm install
```

### 2) 開発サーバ起動

```bash
npx expo start
```

必要に応じて以下を利用:

- iOS向け起動: `npm run ios`
- Android向け起動: `npm run android`
- Web向け起動: `npm run web`
- トンネル接続で起動: `npx expo start --tunnel`

### 3) 動作確認

- iPhone の Expo Go で QR を読み取って確認
- もしくはシミュレータ / エミュレータで確認

---

## よく使うコマンド

```bash
# 開発サーバ
npm run start

# iOS / Android / Web
npm run ios
npm run android
npm run web

# Lint
npm run lint

# 初期テンプレートへ近い状態に戻す（注意: app配下を移動）
npm run reset-project
```

---

## プロジェクト構成

```text
app/
  _layout.tsx          # ルートレイアウト（テーマ・フォント・Stack）
  (tabs)/
    _layout.tsx        # タブレイアウト
    index.tsx          # Home
    explore.tsx        # Explore
components/            # 再利用UIコンポーネント
hooks/                 # カラースキーム等のフック
constants/             # カラー定義
assets/                # 画像・フォント
doc/                   # 開発ドキュメント
```

---

## 補足

- 初回起動でエラーが出た場合は、依存再インストールを試してください。

```bash
rm -rf node_modules package-lock.json
npm install
```

- Expo / React Native の互換性は `package.json` のバージョンを基準にしてください。
