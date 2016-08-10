import {JsWriter} from './JsWriter';
import {JsonWriter} from './JsonWriter';
import {Parser} from './UnrealT3D';
import * as fs from 'fs';
import * as path from 'path';
export class T3DFileConverter {
   /** t3d文件目录 */
   private t3dFileDir: string;
   /** js文件目录 */
   private jsFileDir: string;

   private items: {
      [name: string]: string;
   }

   constructor(t3dFileDir: string, jsFileDir: string) {
      this.t3dFileDir = t3dFileDir;
      this.jsFileDir = jsFileDir;
      this.items = {};
   }

   public run(callback: (error?: any) => void) {
      this.batchExec();
      this.writeConfigFile();
      if (callback) callback();
   }

   private writeConfigFile() {
      var configFile = path.join(this.jsFileDir, 'btreeConfig.json');
      var jsonWriter = new JsonWriter(configFile);
      var items = jsonWriter.get('items');
      if (!items) {
         items = {};
      }
      for (var i in this.items) {
         items[i] = this.items[i];
      }
      jsonWriter.set('items',items);
      jsonWriter.writeToFile(configFile);      
   }

   private getJsFile(t3dFile: string): string {
      var basename = path.basename(t3dFile);
      var name = basename.split('.T3D')[0];
      var jsFileName = name + '.js';

      this.items[name] = jsFileName;

      var jsFile = path.join(this.jsFileDir, jsFileName);
      return jsFile;
   }

   private batchExec() {
      var files = fs.readdirSync(this.t3dFileDir);
      for (var i in files) {
         var file = path.join(this.t3dFileDir, files[i]);
         if (path.extname(file) == '.T3D') {
            this.convert(file);
         }
      }

   }

   private readT3DFile(t3dFile): string {
      var content = fs.readFileSync(t3dFile, 'ucs2')
      return content;
   }

   private convert(t3dFile) {
      console.log(t3dFile);
      console.log('convert...')
      var jsFile = this.getJsFile(t3dFile);
      var jsWriter = new JsWriter(jsFile);
      var t3dContent = this.readT3DFile(t3dFile);
      var parser = new Parser();
      var root = parser.parse(t3dContent)
      var json = parser.toJson(root);
      jsWriter.set('bp', json);
      jsWriter.writeToFile(jsFile);
      console.log('convert success!')
   }
}