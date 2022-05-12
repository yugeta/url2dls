URLから画面キャプチャを自動取得するツール
==
~~~
Date   : 2022.01.18
Author : Yugeta.Koji
~~~

# Install
1. gitでソースをcloneする。

2. node-modulesをインストールする。
  > $ npm install

3. 完了！


# Howto

- ターミナルで実行
```
起動テスト
  $ node index
  * このヘルプが表示されます。

URLを指定する場合
  $ node index --url http://example.com/index.html

テキストに書かれたURLリストを指定する場合、
  $ node index --file data/url_lists.txt

出力画像フォーマット
  * 何も付けないとPNG形式、jpegの場合は、--type jpg
  $ node index --url https://example.com --type jpg

