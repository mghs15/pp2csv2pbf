const fs = require('fs');

//後で引数で受け取る。
//CSV名（拡張子除く）
const target = process.argv[2];

const readPpGeojson = (filename) => {
    const data = fs.readFileSync(filename, 'utf8');
    
    if(!data){
      console.log("Error:", filename);
      return;
    }
    
    const lines = data.split("\n");
    
    let n = 0;
    
    lines.forEach( line => {
      
      n = n + 1;
      console.log(n);
      
      
      if( !line || line=="" ) return;
      
      
      columns = line.split(",");
      
      const lon = +columns[0];
      const lat = +columns[1];
      
      const g = {
        "type":"Feature",
        "geometry":{
          "type":"Point",
          "coordinates":[
            lon,
            lat
          ]
        },
        "properties":{}
      };
      
      
      const specificationID = columns[2];
      g.properties["ID"] = specificationID;
      
      
      const yearrange = 10;
      const photodate = columns[3] + "";
      const photoyear = photodate.substr(0,4);
      const photoyears = Math.floor(+photoyear / yearrange) * yearrange;
      //console.log(photoyear,photoyears);
      g.properties["date"] = photodate;
      
      
      const photoscaleorg = +columns[4];
      //const photoscale = Math.floor(photoscaleorg/1000) * 1000;
      const photoscale = Math.ceil(photoscaleorg/5000) * 5000;
      g.properties["scale"] = photoscaleorg;
      
      
      let photocolor = "";
      if(columns[5]){
        photocolor = columns[5];
        g.properties["color"] = photocolor;
      }
      
      
      const outfile = "./dst/" + target + "/"
                      + photoyear + "-"
                      + photoscale + "-"  
                      + photocolor + ".ndjson";
      
      //書き出し
      //console.log(outfile);
      const s = JSON.stringify(g) + "\n";
      
      try{
        fs.appendFileSync(outfile, s);
      }catch(err){
        console.log(err);
      }
      
    });
} 

const filepath = target + ".csv";
console.log(filepath);
readPpGeojson(filepath);


