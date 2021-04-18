
const fs = require('fs')

const readPpGeojson = (filename) => {
    const data = fs.readFileSync(filename, 'utf8');
    
    if(!data){
      console.log("Error:", filename);
      return;
    }
    
    // BOMを無視する https://webbibouroku.com/Blog/Article/node-bom-utf8
    if (data.charCodeAt(0) === 0xFEFF) {
      json = data.substr(1);
    }
    
    const geojson = JSON.parse(json);
    
    geojson.features.forEach( f => {
      
      const yearsfile = "./test/photo.csv";
      
      //書き出し
      //console.log(yearsfile);
      //const s = JSON.stringify(f) + "\n";
      const s = f.geometry.coordinates[0] + ","
              + f.geometry.coordinates[1] + ","
              + f.properties["ID"] + ","
              + f.properties["撮影年月日"] + ","
              + f.properties["撮影縮尺"] + ","
              + f.properties["カラー種別"] + "\n";
      
      try{
        fs.appendFileSync(yearsfile, s);
      }catch(err){
        console.log(err);
      }
      
    });
} 

const dir = 'pp';
fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  files.forEach( file => {
    if(file.match(/^14/)){
      const filepath = './' + dir + '/' + file;
      console.log(filepath);
      readPpGeojson(filepath);
    }
  });

});


