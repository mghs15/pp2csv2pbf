target=$1

if [ "$target" = '' ]; then

  echo "引数がありません"
  
else

  # 必要なフォルダの作成・既存フォルダの削除
  mkdir dst
  mkdir dst/${target}
  rm -r dst/${target}/*

  mkdir mb
  mkdir mb/${target}
  rm -r mb/${target}/*

  mkdir xyz
  rm -r xyz/${target}/*

  # CSVをndjsonへ
  node csv2ndjson.js ${target}
  
  # ndjsonを大縮尺用ベクトルタイル（mbtiles）へ
  node ndjson2mbtiles_large.js ${target} 11 11
  
  # ndjsonを小縮尺用ベクトルタイル（mbtiles）へ
  # - クラスタリング処理を行う
  node ndjson2mbtiles_small.js ${target} 6 10
  
  # mbtilesをまとめてひとつのデータセット（XYZ形式のpbf群）へ
  node mbtiles2pbf.js ${target}
  
fi
