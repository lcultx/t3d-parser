var fs = require('fs');
var path = require('path');
var FileUtil_1 = require('./FileUtil');
var JsonWriter = (function () {
    function JsonWriter(file) {
        if (file && fs.existsSync(file)) {
            var jsContent = fs.readFileSync(file, 'utf8');
            this.json = this.parseJson(jsContent);
        }
        else {
            this.json = {};
        }
    }
    JsonWriter.prototype.set = function (key, object) {
        this.json[key] = object;
    };
    JsonWriter.prototype.get = function (key) {
        return this.json[key];
    };
    JsonWriter.prototype.parseJson = function (str) {
        return JSON.parse(str);
    };
    JsonWriter.prototype.toFileString = function () {
        var str = JSON.stringify(this.json, null, 3);
        return str;
    };
    JsonWriter.prototype.writeToFile = function (file) {
        var _this = this;
        var dir = path.dirname(file);
        FileUtil_1.mkdirs(dir, null, function () {
            fs.writeFileSync(file, _this.toFileString(), 'utf8');
            console.log('writeConfigFile success!');
            console.log(file);
            console.log(_this.toFileString());
        });
    };
    return JsonWriter;
}());
exports.JsonWriter = JsonWriter;
//# sourceMappingURL=JsonWriter.js.map