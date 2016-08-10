var JsWriter_1 = require('./JsWriter');
var JsonWriter_1 = require('./JsonWriter');
var UnrealT3D_1 = require('./UnrealT3D');
var fs = require('fs');
var path = require('path');
var T3DFileConverter = (function () {
    function T3DFileConverter(t3dFileDir, jsFileDir) {
        this.t3dFileDir = t3dFileDir;
        this.jsFileDir = jsFileDir;
        this.items = {};
    }
    T3DFileConverter.prototype.run = function (callback) {
        this.batchExec();
        this.writeConfigFile();
        if (callback)
            callback();
    };
    T3DFileConverter.prototype.writeConfigFile = function () {
        var configFile = path.join(this.jsFileDir, 'btreeConfig.json');
        var jsonWriter = new JsonWriter_1.JsonWriter(configFile);
        var items = jsonWriter.get('items');
        if (!items) {
            items = {};
        }
        for (var i in this.items) {
            items[i] = this.items[i];
        }
        jsonWriter.set('items', items);
        jsonWriter.writeToFile(configFile);
    };
    T3DFileConverter.prototype.getJsFile = function (t3dFile) {
        var basename = path.basename(t3dFile);
        var name = basename.split('.T3D')[0];
        var jsFileName = name + '.js';
        this.items[name] = jsFileName;
        var jsFile = path.join(this.jsFileDir, jsFileName);
        return jsFile;
    };
    T3DFileConverter.prototype.batchExec = function () {
        var files = fs.readdirSync(this.t3dFileDir);
        for (var i in files) {
            var file = path.join(this.t3dFileDir, files[i]);
            if (path.extname(file) == '.T3D') {
                this.convert(file);
            }
        }
    };
    T3DFileConverter.prototype.readT3DFile = function (t3dFile) {
        var content = fs.readFileSync(t3dFile, 'ucs2');
        return content;
    };
    T3DFileConverter.prototype.convert = function (t3dFile) {
        console.log(t3dFile);
        console.log('convert...');
        var jsFile = this.getJsFile(t3dFile);
        var jsWriter = new JsWriter_1.JsWriter(jsFile);
        var t3dContent = this.readT3DFile(t3dFile);
        var parser = new UnrealT3D_1.Parser();
        var root = parser.parse(t3dContent);
        var json = parser.toJson(root);
        jsWriter.set('bp', json);
        jsWriter.writeToFile(jsFile);
        console.log('convert success!');
    };
    return T3DFileConverter;
}());
exports.T3DFileConverter = T3DFileConverter;
//# sourceMappingURL=T3DFileConverter.js.map