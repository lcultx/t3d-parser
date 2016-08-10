import * as fs from 'fs';
import * as path from 'path';
export function mkdirs(dirpath, mode, callback) {
   fs.exists(dirpath, function (exists) {
      if (exists) {
         callback(dirpath);
      } else {
         //尝试创建父目录，然后再创建当前目录
         mkdirs(path.dirname(dirpath), mode, function () {
            fs.mkdir(dirpath, mode, callback);
         });
      }
   });
};