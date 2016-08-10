/// <reference path="./typings/node/node.d.ts" />
import {T3DFileConverter} from './T3DFileConverter'
function main(){
   var cwd = process.cwd();
   var t3dFileDir = process.argv[2];
   var jsFileDir = process.argv[3];
   var converter = new T3DFileConverter(t3dFileDir,jsFileDir);
   converter.run((error)=>{
      if(!error){
         console.log('all t3d files have converted to js success!')
      }
   })
}

main();