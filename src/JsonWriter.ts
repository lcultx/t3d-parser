import * as fs from 'fs';
import * as path from 'path';
import {mkdirs} from './FileUtil';

export class JsonWriter {
   private json;
   constructor(file?: string) {
      //readFile
      if (file && fs.existsSync(file)) {
         var jsContent = fs.readFileSync(file, 'utf8');
         this.json = this.parseJson(jsContent);
      } else {
         this.json = {};
      }

   }

   public set(key, object) {
      this.json[key] = object;
   }

   public get(key){
      return this.json[key];
   }

   /** 解析json*/
   private parseJson(str: string) {
      return JSON.parse(str);
   }

   private toFileString() {
      var str = JSON.stringify(this.json,null,3);
      return str;
   }

   public writeToFile(file: string) {
      var dir = path.dirname(file);
      mkdirs(dir, null, () => {
         fs.writeFileSync(file, this.toFileString(), 'utf8');
         console.log('writeConfigFile success!');
         console.log(file);
         console.log(this.toFileString());
      })

   }
}