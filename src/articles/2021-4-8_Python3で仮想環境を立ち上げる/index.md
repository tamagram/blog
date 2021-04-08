DiscordBotを作るときに忘れてしまっていたので、今後同じようにならないためにも書き込んでおきます。

## 対象

OS: Windows
エディタ: VScode

## Pyhtonインストール
まずPythonをインストールしましょう。

仮想環境構築に使用するモジュール[`venv`はバージョン3.3で追加](https://docs.python.org/ja/3/library/venv.html#venv-def)されているので、それ以上のバージョンをお勧めします。

## 仮想環境を構築
次のようなコマンドをcmd上で打ちます。

`python3 -m venv [環境名]`

すると環境名ディレクトリと次のようなファイル群が生成されます。

![](https://raw.githubusercontent.com/tamagram/blog/master/src/articles/2021-4-8_Python3%E3%81%A7%E4%BB%AE%E6%83%B3%E7%92%B0%E5%A2%83%E3%82%92%E7%AB%8B%E3%81%A1%E4%B8%8A%E3%81%92%E3%82%8B/img/fileinvenv.png)

## activate
仮想環境を動かすためには`activate`させる必要があります。

activateしないまま作業を行ってしまうとグローバルな環境が適応されてしまうので注意してください。

`Scripts`ディレクトリへ移動して、`activate.bat`を実行します。

また、`activate`のみで実行すると、違った環境が立ち上がってしまう場合がありますので、必ず`activate.bat`で実行したほうが良いでしょう。

`activate`状態になると環境名が表示されたコマンドラインが表示されるはずです。

コマンド `pip list` でインストールされているパッケージを確認してみます。

![](https://raw.githubusercontent.com/tamagram/blog/master/src/articles/2021-4-8_Python3%E3%81%A7%E4%BB%AE%E6%83%B3%E7%92%B0%E5%A2%83%E3%82%92%E7%AB%8B%E3%81%A1%E4%B8%8A%E3%81%92%E3%82%8B/img/piplist.png)

まっさらな状態であることが確認できました。ここから開発を進めていけます。

ついでに自動的にactivateするために、VScodeが仮想環境内のインタプリタを使ってもらうように設定しておきます。

VScode上で`CTRL + SHIFT + P`を押し、`Select Interpreter`を選択、そこからScripts内にある`python.exe`までのpathを通します。

## プログラムを実行してみる
試しに HelloWorld します。

仮想環境直下に`main.py`を作成して、`print("Hello World!")`を書き込んで実行

![](https://raw.githubusercontent.com/tamagram/blog/master/src/articles/2021-4-8_Python3%E3%81%A7%E4%BB%AE%E6%83%B3%E7%92%B0%E5%A2%83%E3%82%92%E7%AB%8B%E3%81%A1%E4%B8%8A%E3%81%92%E3%82%8B/img/helloworld.png)

モジュールもインストールしてみましょう。

コマンド `pip install numpy`

![](https://raw.githubusercontent.com/tamagram/blog/master/src/articles/2021-4-8_Python3%E3%81%A7%E4%BB%AE%E6%83%B3%E7%92%B0%E5%A2%83%E3%82%92%E7%AB%8B%E3%81%A1%E4%B8%8A%E3%81%92%E3%82%8B/img/module.png)

こちらも確認できました。
