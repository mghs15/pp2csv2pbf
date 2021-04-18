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
  '--force', 
  '--no-tile-size-limit', 
  '--no-tile-compression',
  '--no-feature-limit',
  '--minimum-zoom=' + minz,
  '--maximum-zoom=' + maxz,
  '--base-zoom=' + minz,
  '--simplification=' + 2,
  '-l', 'single'
];


fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  //コマンド生成
  let command = 'tippecanoe';
  command = command + ' -o ' +  outdirroot + '/largeZL.mbtiles';
  
  files.forEach( file => {
  
    const filepath = dir + '/' + file;
    command = command  + " " + filepath;
  
  });
  
  option.forEach( op => {
    command = command + " " + op;
  });
  
  
  console.log(command);
  child_process.execSync(`${command}`);
  
});


