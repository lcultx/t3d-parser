var fs = require('fs');
var path = require('path');
function mkdirs(dirpath, mode, callback) {
    fs.exists(dirpath, function (exists) {
        if (exists) {
            callback(dirpath);
        }
        else {
            mkdirs(path.dirname(dirpath), mode, function () {
                fs.mkdir(dirpath, mode, callback);
            });
        }
    });
}
exports.mkdirs = mkdirs;
;
//# sourceMappingURL=FileUtil.js.map