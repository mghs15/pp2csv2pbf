# produce1

地理院タイル（単写真）を加工してPBFにするツール。
GeoJSONのまま管理しているのはめんどくさいので、CSVに変換しておいて、そこから一連の流れをスタートする方法の実験。

1. GeoJSONタイルをダウンロード
2. GeoJSONをCSVに変換　←　このCSVを管理
3. CSVからpbfを作成する

結論：手間はそんなに変わらんかも……。

備考：CSV → pbfでだいたい1時間30分！小縮尺のZLが時間がかかる（　＾ω＾）・・・


## 参考文献等
### データ出典
* 地理院タイル
* 地理院タイル（単写真）を加工
* 地図・空中写真閲覧サービス
### 参考文献
* https://webbibouroku.com/Blog/Article/node-bom-utf8
* https://developer.mozilla.org/ja/
