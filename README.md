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
```

# Request
- スマートフォンでのレンダリングを取得したい
  - 【対応】ユーザーエージェントと、画面サイズを指定してレンダリングができる処理を追加
  - 【対応】optionファイル(.json)ファイルを作成して、optionをコマンドで指定する事で、任意のレンダリングができるように機能追加

# ユーザーエージェントサンプル
- 参考 : https://htaccess.cman.jp/useragent/smartphone/
```
- iphone
Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML,like Gecko) Version/5.0.2 Mobile/8C148a Safari/6533.18.5

- Android
Mozilla/5.0 (Linux; U; Android 2.3.3; ja-jp; INFOBAR A01 Build/S7142) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1

- windows phone
Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; FujitsuToshibaMobileCommun; IS12T; KDDI)
```

- sample
  option.json
  ```
  {
    "ua" : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML,like Gecko) Version/5.0.2 Mobile/8C148a Safari/6533.18.5",
    "width" : 320
  }
  ```
  $ node index --file list.txt --option option.json

