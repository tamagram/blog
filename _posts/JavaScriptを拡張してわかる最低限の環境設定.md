---
date: '2021-06-14'
update: '2021-06-14'
tags: [Node.js, Yarn, webpack, Babel, TypeScript]
---

![image](https://user-images.githubusercontent.com/66813233/121908630-25d5e600-cd68-11eb-9482-ad33b7a9428b.png)

## HTML と JavaScript だけの場合

node.js がインストールされているなら

```bash
npx serve
```

すれば簡単に起動できる。

## パッケージ管理を行う(yarn 使用)

- Yarn

```bash
yarn init -y
```

`package.json`

```json
{
  "name": "hoge-app",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/hoge",
  "author": "hoge",
  "license": "MIT"
}
```

package.json と yarn.lock が作成され、ライブラリの追加・削除ができるようになる。

## モジュールバンドらツール webpack を使う

- Yarn + webpack

Babel や TypeScript などのコンパイラで処理・分割されたコードをひとつにまとめたい。

```bash
yarn add webpack webpack-cli --dev
```

webpack-cli をインストールしておき、CLI からも実行できるようにしておく。

webpack の設定ファイルも追加

`webpack.config.js`

```json
// プロジェクトのルートディレクトリパスを取得
const path = require('path')

module.exports = {
  // build時のモード
  mode: process.env.NODE_ENV || 'development',
  // はじめに実行されるjsファイルをおいとく
  entry: path.resolve('src/app.js'),
  // build時にまとめられたファイルの置き場所
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

CLI から実行できるようにしておいたので

楽に実行できるようにしておく。

`package.json`

```json
{
  "name": "hoge-app",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/hoge",
  "author": "hoge",
  "license": "MIT",
  // ↓ここらへんに追加
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.2"
  }
}
```

そして

```bash
yarn build
```

を叩くと dist ディレクトリ内にビルドされた js ファイルが作成されている。

## トランスパイラ Babel を使う

- Yarn + webpack + Babel

旧ブラウザなどには対応していない仕様も実装者が意識しなくて済むようしたい。

@babel/preset-env はコンパイル時に対象とする OS やブラウザの設定ができるように、

babel-loader は webpack でビルドされる際に Babel のコンパイルも実行するためのもの。

```bash
yarn add @babel/core @babel/preset-env babel-loader --dev
```

webpack.config.json にも追記

```json
// プロジェクトのルートディレクトリパスを取得
const path = require('path')

module.exports = {
  // build時のモード
  mode: process.env.NODE_ENV || 'development',
  // はじめに実行されるjsファイルをおいとく
  entry: path.resolve('src/app.js'),
  // build時にまとめられたファイルの置き場所
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
	// ↓ここらへんから
  module: {
    rules: [
      {
        // 変換対象
        test: /\.js$/,
        // 正常にコンパイルされなくなるため除外
        exclude: /node_modules/,
        use: {
          // build時babelコンパイル
          loader: 'babel-loader',
          options: {
            // ES2015+の変換を有効にする
            presets: ['@babel/preset-env']
          },
        },
      },
    ],
  },
}
```

## 型定義ができる TypeScript を使う

- Yarn + webpack + Babel + TypeScript

バグやエラーを起こしにくい型安全なコードを書きたい。

まずは tsc コマンドが使えるようにする。

```bash
yarn add typescript --dev
```

設定ファイルの作成

```bash
tsc init
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,
    "target": "es5",
    "module": "commonjs",
    // "lib": [],
    // "allowJs": true,
    // "checkJs": true,
    // "jsx": "preserve",
    // "declaration": true,
    // "declarationMap": true,
    // "sourceMap": true,
    // "outFile": "./",
    // "outDir": "./",
    // "rootDir": "./",
    // "composite": true,
    // "tsBuildInfoFile": "./",
    // "removeComments": true,
    // "noEmit": true,
    // "importHelpers": true,
    // "downlevelIteration": true,
    // "isolatedModules": true,

    /* Strict Type-Checking Options */
    "strict": true, //厳格な型チェックを行う
    // "noImplicitAny": true,
    // "strictNullChecks": true,
    // "strictFunctionTypes": true,
    // "strictBindCallApply": true,
    // "strictPropertyInitialization": true,
    // "noImplicitThis": true,
    // "alwaysStrict": true,

    /* Additional Checks */
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noImplicitReturns": true,
    // "noFallthroughCasesInSwitch": true,
    // "noUncheckedIndexedAccess": true,

    /* Module Resolution Options */
    // "moduleResolution": "node",
    // "baseUrl": "./",
    // "paths": {},
    // "rootDirs": [],
    // "typeRoots": [],
    // "types": [],
    // "allowSyntheticDefaultImports": true,
    "esModuleInterop": true, //TypeScriptでもCommonJSでモジュール読み込みができるようにする
    // "preserveSymlinks": true,
    // "allowUmdGlobalAccess": true,

    /* Source Map Options */
    // "sourceRoot": "",
    // "mapRoot": "",
    // "inlineSourceMap": true,
    // "inlineSources": true,

    /* Experimental Options */
    // "experimentalDecorators": true,
    // "emitDecoratorMetadata": true,

    /* Advanced Options */
    "skipLibCheck": true, // *.d.tsファイルによる型チェックをスキップ
    "forceConsistentCasingInFileNames": true // 参照ファイル名の大文字小文字を区別する
  }
}
```

このままでも大体は動くはず。
es6 だと let や const が使えるので便利かも。
