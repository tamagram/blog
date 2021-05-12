---
date: '2021-4-8'
update: '2021-4-25'
tags: [Python, VSCode]
---

DiscordBot を作るときに忘れてしまっていたので、今後同じようにならないためにも書き込んでおきます。

## 対象

OS: Windows
エディタ: VScode

## Pyhton インストール

まず Python をインストールしましょう。

仮想環境構築に使用するモジュール[`venv`はバージョン 3.3 で追加](https://docs.python.org/ja/3/library/venv.html#venv-def)されているので、それ以上のバージョンをお勧めします。

## 仮想環境を構築

次のようなコマンドを cmd 上で打ちます。

`python3 -m venv [環境名]`

すると環境名ディレクトリと次のようなファイル群が生成されます。

![fileinvenv](https://user-images.githubusercontent.com/66813233/116742928-1c502300-aa33-11eb-8ff3-b6583b274299.png)

## activate

仮想環境を動かすためには`activate`させる必要があります。

activate しないまま作業を行ってしまうとグローバルな環境が適応されてしまうので注意してください。

`Scripts`ディレクトリへ移動して、`activate.bat`を実行します。

また、`activate`のみで実行すると、違った環境が立ち上がってしまう場合がありますので、必ず`activate.bat`で実行したほうが良いでしょう。

`activate`状態になると環境名が表示されたコマンドラインが表示されるはずです。

コマンド `pip list` でインストールされているパッケージを確認してみます。

![piplist](https://user-images.githubusercontent.com/66813233/116742981-32f67a00-aa33-11eb-89c8-f1be7e685e9d.png)

まっさらな状態であることが確認できました。ここから開発を進めていけます。

ついでに自動的に activate するために、VScode が仮想環境内のインタプリタを使ってもらうように設定しておきます。

VScode 上で`CTRL + SHIFT + P`を押し、`Select Interpreter`を選択、そこから Scripts 内にある`python.exe`までの path を通します。

## プログラムを実行してみる

試しに HelloWorld します。

仮想環境直下に`main.py`を作成して、`print("Hello World!")`を書き込んで実行

![helloworld](https://user-images.githubusercontent.com/66813233/116743027-41dd2c80-aa33-11eb-8505-3cec6efc995d.png)

モジュールもインストールしてみましょう。

コマンド `pip install numpy`

![module](https://user-images.githubusercontent.com/66813233/116743066-50c3df00-aa33-11eb-8237-b997a20129d4.png)

こちらも確認できました。
