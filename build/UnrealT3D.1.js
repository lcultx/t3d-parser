var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var T3D = (function () {
    function T3D(parser) {
        this.finishCallbacks = [];
        this.isRoot = false;
        this.decorators = [];
        this.children = [];
        this.parser = parser;
    }
    T3D.prototype.finish = function () {
        for (var i in this.finishCallbacks) {
            var callback = this.finishCallbacks[i];
            callback();
        }
    };
    T3D.getClassName = function () {
        return this.name;
    };
    T3D.prototype.getClassName = function () {
        return this.className || this.constructor.name;
    };
    T3D.prototype.getNodeByName = function (name) {
        return this.parser.nodesMap[name];
    };
    T3D.prototype.parseLine = function (line) {
        var _this = this;
        if (line.indexOf('ParentNode') > -1) {
            var parentName = this.parseParentName(line);
            var parent = this.getNodeByName(parentName);
            this.parent.removeChild(this);
            this.parent = parent;
        }
        if (line.indexOf('Children') > -1) {
            this.addParentFinishTask(function () {
                _this.parseChildLine(line);
            });
        }
        if (line.indexOf('NodeName') > -1) {
            this.parseNodeName(line);
        }
    };
    T3D.prototype.parseNodeName = function (line) {
        var reg = /NodeName="(.*)"/;
        if (reg.test(line)) {
            var res = reg.exec(line);
            this.nodeName = res[1];
        }
    };
    T3D.prototype.addParentFinishTask = function (callback) {
        this.parent.finishCallbacks.push(callback);
    };
    T3D.prototype.addRootFinishTask = function () {
    };
    T3D.prototype.removeChild = function (obj) {
        var index = this.children.indexOf(obj);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    T3D.prototype.parseParentName = function (line) {
        var reg = /ParentNode=[^']*'[^\:]*:(.*)'/;
        if (reg.test(line)) {
            var res = reg.exec(line);
            var name = res[1];
            return name;
        }
    };
    T3D.prototype.parseChildLine = function (line) {
        var reg = /Children\((\d+)\)=\(([^=]*)=([^']*)'((.*)\:(.*))'\)/;
        var decorators = [];
        if (line.indexOf('Decorators') > -1) {
            var dreg = /Decorators=([^']*)'((.*)\:(.*))'/;
            var res = dreg.exec(line);
            if (res[0].indexOf('\',') > -1) {
                var r = /^Decorators=\((.*\')/;
                var l = r.exec(res[0]);
                var list = l[1].split(',');
                for (var i in list) {
                    var d = list[i];
                    var getNameReg = /:(.*)'/;
                    var getNameResList = getNameReg.exec(d);
                    var name = getNameResList[1];
                    var node = this.getNodeByName(name);
                    decorators.push(node);
                }
            }
            else {
                var name = res[4];
                var node = this.getNodeByName(name);
                decorators.push(node);
            }
            line = line.replace(/,Decorators.*'\)/, '');
        }
        if (reg.test(line)) {
            var res = reg.exec(line);
            var order = parseInt(res[1]);
            var childType = res[2];
            var btType = res[3];
            var asset = res[5];
            var name = res[6];
            var node = this.getNodeByName(name);
            node.decorators = decorators;
            console.log(decorators);
            this.children[order] = node;
        }
    };
    T3D.beginStr = "Begin Object";
    T3D.endStr = "End Object";
    return T3D;
}());
var BTCompositeSelector = (function (_super) {
    __extends(BTCompositeSelector, _super);
    function BTCompositeSelector() {
        _super.apply(this, arguments);
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
var BehaviorTreeGraph = (function (_super) {
    __extends(BehaviorTreeGraph, _super);
    function BehaviorTreeGraph() {
        _super.apply(this, arguments);
    }
    return BehaviorTreeGraph;
}(T3D));
var BehaviorTreeGraphNode_Root = (function (_super) {
    __extends(BehaviorTreeGraphNode_Root, _super);
    function BehaviorTreeGraphNode_Root() {
        _super.apply(this, arguments);
    }
    return BehaviorTreeGraphNode_Root;
}(T3D));
var EdGraphPin = (function (_super) {
    __extends(EdGraphPin, _super);
    function EdGraphPin() {
        _super.apply(this, arguments);
    }
    return EdGraphPin;
}(T3D));
var BehaviorTreeGraphNode_Composite = (function (_super) {
    __extends(BehaviorTreeGraphNode_Composite, _super);
    function BehaviorTreeGraphNode_Composite() {
        _super.apply(this, arguments);
    }
    return BehaviorTreeGraphNode_Composite;
}(T3D));
var BehaviorTreeGraphNode_CompositeDecorator = (function (_super) {
    __extends(BehaviorTreeGraphNode_CompositeDecorator, _super);
    function BehaviorTreeGraphNode_CompositeDecorator() {
        _super.apply(this, arguments);
    }
    return BehaviorTreeGraphNode_CompositeDecorator;
}(T3D));
var BehaviorTreeDecoratorGraph = (function (_super) {
    __extends(BehaviorTreeDecoratorGraph, _super);
    function BehaviorTreeDecoratorGraph() {
        _super.apply(this, arguments);
    }
    return BehaviorTreeDecoratorGraph;
}(T3D));
var BehaviorTreeDecoratorGraphNode_Logic = (function (_super) {
    __extends(BehaviorTreeDecoratorGraphNode_Logic, _super);
    function BehaviorTreeDecoratorGraphNode_Logic() {
        _super.apply(this, arguments);
    }
    return BehaviorTreeDecoratorGraphNode_Logic;
}(T3D));
var BehaviorTreeGraphNode_SubtreeTask = (function (_super) {
    __extends(BehaviorTreeGraphNode_SubtreeTask, _super);
    function BehaviorTreeGraphNode_SubtreeTask() {
        _super.apply(this, arguments);
    }
    return BehaviorTreeGraphNode_SubtreeTask;
}(T3D));
var BTTask_RunBehavior = (function (_super) {
    __extends(BTTask_RunBehavior, _super);
    function BTTask_RunBehavior() {
        _super.apply(this, arguments);
    }
    BTTask_RunBehavior.prototype.parseLine = function (line) {
        _super.prototype.parseLine.call(this, line);
        if (line.indexOf('BehaviorAsset') > -1) {
            this.parseBehaviorAsset(line);
        }
    };
    BTTask_RunBehavior.prototype.parseBehaviorAsset = function (line) {
        var reg = /BehaviorTree'(([^\.]*)\.(.*))'/;
        if (reg.test(line)) {
            var res = reg.exec(line);
            this.BehaviorAsset = res[1];
            this.AssetName = res[3];
            this.AssetPath = res[2];
            this.nodeName = this.AssetName;
        }
    };
    return BTTask_RunBehavior;
}(T3D));
var BTComposite_Sequence = (function (_super) {
    __extends(BTComposite_Sequence, _super);
    function BTComposite_Sequence() {
        _super.apply(this, arguments);
    }
    BTComposite_Sequence.prototype.parseLine = function (line) {
        _super.prototype.parseLine.call(this, line);
    };
    return BTComposite_Sequence;
}(T3D));
var BTComposite_Selector = (function (_super) {
    __extends(BTComposite_Selector, _super);
    function BTComposite_Selector() {
        _super.apply(this, arguments);
    }
    BTComposite_Selector.prototype.parseLine = function (line) {
        _super.prototype.parseLine.call(this, line);
    };
    return BTComposite_Selector;
}(T3D));
var BTDecorator_Blackboard = (function (_super) {
    __extends(BTDecorator_Blackboard, _super);
    function BTDecorator_Blackboard() {
        _super.apply(this, arguments);
    }
    BTDecorator_Blackboard.prototype.parseLine = function (line) {
        _super.prototype.parseLine.call(this, line);
        console.log(line);
    };
    return BTDecorator_Blackboard;
}(T3D));
var BehaviorTreeGraphNode_Task = (function (_super) {
    __extends(BehaviorTreeGraphNode_Task, _super);
    function BehaviorTreeGraphNode_Task() {
        _super.apply(this, arguments);
    }
    return BehaviorTreeGraphNode_Task;
}(T3D));
var Blueprint = (function (_super) {
    __extends(Blueprint, _super);
    function Blueprint() {
        _super.apply(this, arguments);
    }
    return Blueprint;
}(T3D));
var BlackboardData = (function (_super) {
    __extends(BlackboardData, _super);
    function BlackboardData() {
        _super.apply(this, arguments);
        this.Keys = [];
    }
    BlackboardData.prototype.parseLine = function (line) {
        _super.prototype.parseLine.call(this, line);
        if (line.indexOf('Keys(') > -1) {
            this.parseKeys(line);
        }
    };
    BlackboardData.prototype.parseKeys = function (line) {
        var reg = /Keys\((\d+)\)=\(EntryName="([^"]*)",KeyType=BlackboardKeyType_([^']+)'/;
        if (reg.test(line)) {
            var res = reg.exec(line);
            this.Keys.push({
                name: res[2],
                type: res[3]
            });
        }
    };
    return BlackboardData;
}(T3D));
var CustomNode = (function (_super) {
    __extends(CustomNode, _super);
    function CustomNode() {
        _super.apply(this, arguments);
        this.args = {};
    }
    CustomNode.prototype.parseLine = function (line) {
        _super.prototype.parseLine.call(this, line);
        if (line.indexOf('ParentNode') > -1) {
        }
        else if (line.indexOf('TreeAsset') > -1) {
        }
        else {
            this.parseArguments(line);
        }
    };
    CustomNode.prototype.parseArguments = function (line) {
        var reg = /([^=\s]*)=(.*)/;
        if (reg.test(line)) {
            var res = reg.exec(line);
            var key = res[1];
            var val = res[2];
            if (!isNaN(val)) {
                val = parseFloat(val);
            }
            else {
                if (val.indexOf('NSLOCTEXT') > -1) {
                    var r = /([^"]*)"\)/;
                    if (r.test(val)) {
                        var v = r.exec(val);
                        val = v[1];
                    }
                }
                if (val.indexOf('"') > -1) {
                    var r = /"(.*)"/;
                    if (r.test(val)) {
                        var v = r.exec(val);
                        val = v[1];
                    }
                }
            }
            this.args[key] = val;
        }
    };
    return CustomNode;
}(T3D));
var sysClazzes = {
    BehaviorTree: BehaviorTree,
    BehaviorTreeGraph: BehaviorTreeGraph,
    BehaviorTreeGraphNode_Root: BehaviorTreeGraphNode_Root,
    EdGraphPin: EdGraphPin,
    BehaviorTreeGraphNode_Composite: BehaviorTreeGraphNode_Composite,
    BehaviorTreeGraphNode_CompositeDecorator: BehaviorTreeGraphNode_CompositeDecorator,
    BehaviorTreeDecoratorGraph: BehaviorTreeDecoratorGraph,
    BehaviorTreeDecoratorGraphNode_Logic: BehaviorTreeDecoratorGraphNode_Logic,
    BehaviorTreeGraphNode_SubtreeTask: BehaviorTreeGraphNode_SubtreeTask,
    BTTask_RunBehavior: BTTask_RunBehavior,
    BTComposite_Sequence: BTComposite_Sequence,
    BTComposite_Selector: BTComposite_Selector,
    BehaviorTreeGraphNode_Task: BehaviorTreeGraphNode_Task,
    BlackboardData: BlackboardData
};
var Parser = (function () {
    function Parser() {
        this.objectStack = [];
        this.nodesMap = {};
        this.endIndex = [];
    }
    Parser.prototype.parse = function (text) {
        var lines = text.split('\n');
        for (var i in lines) {
            var line = lines[i];
            this.parseLine(line);
        }
        return this.root;
    };
    Parser.prototype.parseBeginLine = function (line) {
        var className = this.getClassNameFromString(line);
        var name = this.getNameFromString(line);
        var obj = null;
        if (className) {
            var clazz = sysClazzes[className];
            if (clazz != undefined) {
                obj = new clazz(this);
            }
            else {
                console.log('No Class: ', className);
                obj = new CustomNode(this);
            }
            obj.Name = name;
            obj.className = className;
            this.nodesMap[name] = obj;
        }
        else if (name) {
            obj = this.nodesMap[name];
        }
        if (obj) {
            if (!this.root) {
                this.root = obj;
                obj.isRoot = true;
            }
            this.parsingObject = obj;
            var parent = this.getLastStackNode();
            if (parent && parent !== obj && parent.children.indexOf(obj) == -1) {
                obj.parent = parent;
                parent.children.push(obj);
            }
            this.objectStack.push(obj);
        }
    };
    Parser.prototype.parseLine = function (line) {
        if (line.indexOf(T3D.beginStr) > -1) {
            this.parseBeginLine(line);
        }
        else if (line.indexOf(T3D.endStr) > -1) {
            this.parsingObject.finish();
            this.objectStack.pop();
            this.parsingObject = this.getLastStackNode();
        }
        else if (this.parsingObject) {
            this.parsingObject.parseLine(line);
        }
    };
    Parser.prototype.getLastStackNode = function () {
        return this.objectStack[this.objectStack.length - 1];
    };
    Parser.prototype.getClassNameFromString = function (str) {
        var reg = /Class=([^\s]*)\s/;
        if (reg.test(str)) {
            var res = reg.exec(str);
            return res[1];
        }
        else {
            return null;
        }
    };
    Parser.prototype.getNameFromString = function (str) {
        var reg = /Name="(.*)"/;
        if (reg.test(str)) {
            var res = reg.exec(str);
            return res[1];
        }
        else {
            return null;
        }
    };
    Parser.prototype.print = function (root) {
        var _this = this;
        var prev = 0;
        if (root instanceof BehaviorTree || root instanceof BlackboardData) {
            console.log(this.getPrevStr(prev) + this.getPrintName(root));
            prev++;
            root.children.forEach(function (item) {
                if (item instanceof BTComposite_Selector || item instanceof BTComposite_Sequence) {
                    console.log(_this.getPrevStr(prev) + _this.getPrintName(item));
                    _this.printNode(prev, item);
                }
            });
        }
    };
    Parser.prototype.toJson = function (root) {
        var _this = this;
        var json = {};
        json.name = root.Name;
        json.className = root.className;
        json.nodeName = root.nodeName;
        json.children = [];
        if (root instanceof BehaviorTree || root instanceof BlackboardData) {
            root.children.forEach(function (item) {
                if (item instanceof BTComposite_Selector || item instanceof BTComposite_Sequence) {
                    json.children.push(_this.node2Json(item));
                }
            });
        }
        return json;
    };
    Parser.prototype.node2Json = function (node) {
        var _this = this;
        var json = {};
        json.name = node.Name;
        json.className = node.className;
        json.nodeName = node.nodeName;
        if (node instanceof CustomNode) {
            json.args = node.args;
        }
        json.children = [];
        json.decorators = [];
        node.children.forEach(function (item) {
            json.children.push(_this.node2Json(item));
        });
        node.decorators.forEach(function (item) {
            json.decorators.push(_this.node2Json(item));
        });
        return json;
    };
    Parser.prototype.getPrintName = function (node) {
        if (node.nodeName != undefined) {
            return node.nodeName;
        }
        else {
            return node.Name;
        }
    };
    Parser.prototype.getPrevStr = function (num) {
        var str = '--|';
        for (var i = 0; i < num; i++) {
            str += '--';
            if (this.endIndex.indexOf(i) > -1) {
                str += '|';
            }
        }
        this.endIndex.push(i);
        return str;
    };
    Parser.prototype.printNode = function (prev, node) {
        var _this = this;
        prev++;
        node.children.forEach(function (item) {
            console.log(_this.getPrevStr(prev) + _this.getPrintName(item));
            _this.printNode(prev, item);
        });
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=UnrealT3D.1.js.map