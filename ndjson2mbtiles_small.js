const child_process = require('child_process');
const fs = require('fs')

//後で引数で受け取る。
//CSV名（拡張子除く）
const target = process.argv[2];
const minz = +process.argv[3];
const maxz = +process.argv[4];

const dir = 'dst/' + target;
const outdirroot = 'mb/' + target;

const option = [
  '--no-progress-indicator',
  '--force', 
  '--no-tile-size-limit', 
  '--no-tile-compression',
  '--no-feature-limit',
  '--minimum-zoom=' + minz,
  '--maximum-zoom=' + maxz,
  '--base-zoom=' + minz,
  '--simplification=' + 2,
  '-r1',
  '--cluster-distance=' + 100, //clusting points within this pixel
  '-l', 'cluster'
];


fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  files.forEach( file => {
    const filepath = dir + '/' + file;
    const outpath = file.replace('ndjson', 'mbtiles'); // 要調整
    
    //コマンド生成
    let command = 'tippecanoe';
    option.forEach( op => {
      command = command + " " + op;
    });
    command = command + ' -o ' + outdirroot + '/' + outpath + " " + filepath;
    console.log(command);
    child_process.execSync(`${command}`);
  });

});


