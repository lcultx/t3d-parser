class T3D {
    public static beginStr = "Begin Object";
    public static endStr = "End Object";

    public finish() {
        for (var i in this.finishCallbacks) {
            var callback = this.finishCallbacks[i];
            callback();
        }
    }

    public parser: Parser;

    constructor(parser: Parser) {
        this.parser = parser;
    }

    public finishCallbacks: Array<Function> = [];

    public isRoot: boolean = false;

    public children: Array<T3D> = [];

    public parent: T3D;

    public Name: string;

    public nodeName: string;
    public parentNode: T3D;

    public static getClassName() {
        return (this as any).name;
    }

    public getClassName(): string {
        return (this as any).constructor.name;
    }

    public getNodeByName(name) {
        return this.parser.nodesMap[name];
    }

    public parseLine(line: string) {
        // console.log(this,'parse line: ' + line);
    }

    public addParentFinishTask(callback: Function) {
        this.parent.finishCallbacks.push(callback)
    }

    public addRootFinishTask() {

    }

    public removeChild(obj: T3D) {
        var index = this.children.indexOf(obj);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
}

class BTCompositeSelector extends T3D {

}

class BehaviorTree extends T3D {

}

class BehaviorTreeGraph extends T3D {

}

class BehaviorTreeGraphNode_Root extends T3D {

}

class EdGraphPin extends T3D {

}

class BehaviorTreeGraphNode_Composite extends T3D {

}

class BehaviorTreeGraphNode_CompositeDecorator extends T3D {

}

class BehaviorTreeDecoratorGraph extends T3D {

}

class BehaviorTreeDecoratorGraphNode_Logic extends T3D {

}

class BehaviorTreeGraphNode_SubtreeTask extends T3D {

}

class BTTask_RunBehavior extends T3D {
    public BehaviorAsset: string;
    public AssetName: string;
    public AssetPath: string;
    public parseLine(line: string) {
        super.parseLine(line);
        if (line.indexOf('BehaviorAsset') > -1) {
            this.parseBehaviorAsset(line);
        } else if (line.indexOf('ParentNode') > -1) {
            var parentName = this.parseParentName(line);
            var parent = this.getNodeByName(parentName);
            this.parent.removeChild(this);
            this.parent = parent;
        }
    }

    private parseBehaviorAsset(line: string) {
        var reg = /BehaviorTree'(([^\.]*)\.(.*))'/
        if (reg.test(line)) {
            var res = reg.exec(line);
            this.BehaviorAsset = res[1];
            this.AssetName = res[3];
            this.AssetPath = res[2];
        }
    }

    private parseParentName(line: string) {
        var reg = /ParentNode=[^']*'[^\:]*:(.*)'/
        if (reg.test(line)) {
            var res = reg.exec(line);
            var name = res[1];
            return name;
        }
    }

}

class BTComposite_Sequence extends T3D {
    public parseLine(line: string) {
        super.parseLine(line);
        if (line.indexOf('Children') > -1) {
            this.addParentFinishTask(() => {
                this.parseChildLine(line);
            })
        }
    }

    private parseChildLine(line: string) {
        var reg = /Children\((\d+)\)=\(([^=]*)=([^']*)'((.*)\:(.*))'\)/
        if (reg.test(line)) {
            var res = reg.exec(line);
            var order = parseInt(res[1]);
            var childType = res[2];
            var btType = res[3];
            var asset = res[5];
            var name = res[6];
            var node = this.getNodeByName(name);
            this.children[order] = node;
        }
    }
}

class BTComposite_Selector extends T3D {
    public parseLine(line: string) {
        super.parseLine(line);
        if (line.indexOf('NodeName') > -1) {
            this.parseNodeName(line);
        } else if (line.indexOf('ParentNode') > -1) {
            var parentName = this.parseParentName(line);
            var parent = this.getNodeByName(parentName);
            this.parent.removeChild(this);
            this.parent = parent;
        }
    }

    public parseNodeName(line: string) {
        var reg = /NodeName="(.*)"/
        if (reg.test(line)) {
            var res = reg.exec(line);
            this.nodeName = res[1]
        }
    }
    private parseParentName(line: string) {
        var reg = /ParentNode=[^']*'[^\:]*:(.*)'/
        if (reg.test(line)) {
            var res = reg.exec(line);
            var name = res[1];
            return name;
        }
    }
}



var sysClazzes = {

    BehaviorTree: BehaviorTree
    , BehaviorTreeGraph: BehaviorTreeGraph
    , BehaviorTreeGraphNode_Root: BehaviorTreeGraphNode_Root
    , EdGraphPin: EdGraphPin
    , BehaviorTreeGraphNode_Composite: BehaviorTreeGraphNode_Composite

    , BehaviorTreeGraphNode_CompositeDecorator: BehaviorTreeGraphNode_CompositeDecorator
    , BehaviorTreeDecoratorGraph: BehaviorTreeDecoratorGraph
    , BehaviorTreeDecoratorGraphNode_Logic: BehaviorTreeDecoratorGraphNode_Logic

    , BehaviorTreeGraphNode_SubtreeTask: BehaviorTreeGraphNode_SubtreeTask

    , BTTask_RunBehavior: BTTask_RunBehavior
    , BTComposite_Sequence: BTComposite_Sequence

    , BTComposite_Selector: BTComposite_Selector
}

class Parser {

    private objectStack: Array<T3D> = [];
    private parsingObject: T3D;
    private root: T3D;
    public nodesMap: {
        [name: string]: T3D
    } = {};
    public parse(text: string) {
        var lines = text.split('\n');
        for (var i in lines) {
            var line = lines[i];
            this.parseLine(line)
        }
        return this.root;
    }


    private parseBeginLine(line) {
        var className = this.getClassNameFromString(line)
        var name = this.getNameFromString(line);
        var obj: T3D = null
        if (className) {
            //console.log(className)
            var clazz = sysClazzes[className]
            if (clazz != undefined) {
                obj = new clazz(this);
            } else {
                console.log('No Class: ',className)
                obj = new T3D(this);
            }
            obj.Name = name;
            this.nodesMap[name] = obj;
        } else if (name) {
            obj = this.nodesMap[name]
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
                parent.children.push(obj)
            }

            this.objectStack.push(obj);

            // switch (obj.getClassName()) {
            //     case "BehaviorTree":

            //         break;
            //     case "BTComposite_Sequence":

            //         break;

            //     default:


            // }
        }
    }

    private parseLine(line: string) {
        if (line.indexOf(T3D.beginStr) > -1) {
            this.parseBeginLine(line);
        } else if (line.indexOf(T3D.endStr) > -1) {
            this.parsingObject.finish();
            this.objectStack.pop();
            this.parsingObject = this.getLastStackNode();
        } else if (this.parsingObject) {
            this.parsingObject.parseLine(line);
        }
    }

    public getLastStackNode(): T3D {
        return this.objectStack[this.objectStack.length - 1]
    }

    private getClassNameFromString(str) {
        var reg = /Class=([^\s]*)\s/
        if (reg.test(str)) {
            var res = reg.exec(str);
            return res[1]
        } else {
            return null;
        }
    }

    private getNameFromString(str) {
        var reg = /Name="(.*)"/
        if (reg.test(str)) {
            var res = reg.exec(str);
            return res[1]
        } else {
            return null;
        }
    }

    public test(root: T3D) {
        if (root instanceof BehaviorTree) {
            root.children.forEach(function (node) {
                // console.log(node.Name)
            })
        }
    }
}


