# 実装状況ドキュメント

最終更新: 2026-02-26

## 1. 概要

本プロジェクトは Expo テンプレートベースの React Native アプリです。現在は「アプリ基盤の初期セットアップ + サンプル画面」が中心で、音楽アプリ固有の機能（再生キュー、バックグラウンド再生、ライブラリ管理、課金など）は未着手です。

## 2. 実装済み

### 2.1 アプリ基盤

- Expo Router によるルーティング
  - ルート: `app/_layout.tsx`
  - タブ: `app/(tabs)/_layout.tsx`
- テーマ切替
  - `useColorScheme` を用いた Light / Dark テーマ
- カスタムフォント読み込み
  - `SpaceMono` を `useFonts` でロード
- ステータスバー設定

### 2.2 画面

- Home (`app/(tabs)/index.tsx`)
  - Parallax ヘッダー
  - テンプレート説明文
- Explore (`app/(tabs)/explore.tsx`)
  - 各種サンプル（routing, images, fonts, dark mode, animation）

### 2.3 UIコンポーネント

- `ParallaxScrollView`
  - `react-native-reanimated` によるスクロール連動アニメーション
- `HelloWave`
  - 手のアイコンの繰り返し回転アニメーション
- `HapticTab`
  - iOS でタブ押下時ハプティクス

## 3. 未実装（今後の開発対象）

- 音楽再生機能
  - 再生/停止/シーク
  - プレイリスト / キュー管理
  - バックグラウンド再生
  - ロック画面・コントロールセンター連携
- 楽曲データの永続化
- 認証 / ユーザー管理
- API連携（楽曲取得・検索など）
- エラーハンドリング、ロギング、解析基盤
- テスト（ユニット / E2E）

## 4. 技術スタック

- React Native 0.79.5
- React 19
- Expo SDK 53
- Expo Router 5
- TypeScript
- ESLint（expo lint）

## 5. 再開時の推奨手順

1. `README.md` の「開発再開までの手順」を実行
2. `npm run lint` で静的チェック
3. `app/(tabs)/index.tsx` を起点に、音楽アプリ向けの情報設計を反映
4. 機能実装前に以下を決定
   - データソース（ローカル / API）
   - オーディオ再生ライブラリ
   - 状態管理方針
