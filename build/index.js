var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var T3D = (function () {
    function T3D() {
    }
    T3D.prototype.finish = function () {
    };
    T3D.beginStr = "Begin Object";
    T3D.endStr = "End Object";
    return T3D;
}());
var BTCompositeSelector = (function (_super) {
    __extends(BTCompositeSelector, _super);
    function BTCompositeSelector() {
        _super.apply(this, arguments);
        this.clazzName = 'BTComposite_Selector';
    }
    return BTCompositeSelector;
}(T3D));
var BehaviorTree = (function (_super) {
    __extends(BehaviorTree, _super);
    function BehaviorTree() {
        _super.apply(this, arguments);
    }
    return BehaviorTree;
}(T3D));
var Parser = (function () {
    function Parser() {
        this.objectStack = [];
    }
    Parser.prototype.parse = function (text) {
        var lines = text.split('\n');
        for (var i in lines) {
            var line = lines[i];
            this.parseLine(line);
        }
    };
    Parser.prototype.parseLine = function (line) {
        if (line.indexOf(T3D.beginStr) > -1) {
            var className = this.getClassNameFromString(line);
            var obj = new T3D();
        }
        if (line.indexOf(T3D.endStr) > -1) {
        }
    };
    Parser.prototype.getClassNameFromString = function (str) {
        var reg = /Class(.*)\s/;
        if (reg.test(str)) {
            var res = reg.exec(str);
            return res[1];
        }
        else {
            return null;
        }
    };
    return Parser;
}());
