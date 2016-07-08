declare class T3D {
    static beginStr: string;
    static endStr: string;
    finish(): void;
    parser: Parser;
    constructor(parser: Parser);
    finishCallbacks: Array<Function>;
    isRoot: boolean;
    children: Array<T3D>;
    parent: T3D;
    Name: string;
    className: string;
    nodeName: string;
    parentNode: T3D;
    static getClassName(): any;
    getClassName(): string;
    getNodeByName(name: any): T3D;
    parseLine(line: string): void;
    parseNodeName(line: string): void;
    addParentFinishTask(callback: Function): void;
    addRootFinishTask(): void;
    removeChild(obj: T3D): void;
    private parseParentName(line);
    private parseChildLine(line);
}
declare class BTCompositeSelector extends T3D {
}
declare class BehaviorTree extends T3D {
}
declare class BehaviorTreeGraph extends T3D {
}
declare class BehaviorTreeGraphNode_Root extends T3D {
}
declare class EdGraphPin extends T3D {
}
declare class BehaviorTreeGraphNode_Composite extends T3D {
}
declare class BehaviorTreeGraphNode_CompositeDecorator extends T3D {
}
declare class BehaviorTreeDecoratorGraph extends T3D {
}
declare class BehaviorTreeDecoratorGraphNode_Logic extends T3D {
}
declare class BehaviorTreeGraphNode_SubtreeTask extends T3D {
}
declare class BTTask_RunBehavior extends T3D {
    BehaviorAsset: string;
    AssetName: string;
    AssetPath: string;
    parseLine(line: string): void;
    private parseBehaviorAsset(line);
}
declare class BTComposite_Sequence extends T3D {
    parseLine(line: string): void;
}
declare class BTComposite_Selector extends T3D {
    parseLine(line: string): void;
}
declare class BehaviorTreeGraphNode_Task extends T3D {
}
declare class Blueprint extends T3D {
}
declare class BlackboardData extends T3D {
    Keys: Array<{
        name: string;
        type: string;
    }>;
    parseLine(line: string): void;
    private parseKeys(line);
}
declare class CustomNode extends T3D {
    args: {
        [key: string]: any;
    };
    parseLine(line: string): void;
    private parseArguments(line);
}
declare class 定义重合_C extends CustomNode {
}
declare class 定义跟随_C extends CustomNode {
}
declare class 定义衣柜宽度_C extends CustomNode {
}
declare class 定义窗帘宽度_C extends CustomNode {
}
declare class 定义床与床头柜宽度_C extends CustomNode {
}
declare class 定义吸附_C extends CustomNode {
}
declare class 定义背景墙_C extends CustomNode {
}
declare var sysClazzes: {
    BehaviorTree: typeof BehaviorTree;
    BehaviorTreeGraph: typeof BehaviorTreeGraph;
    BehaviorTreeGraphNode_Root: typeof BehaviorTreeGraphNode_Root;
    EdGraphPin: typeof EdGraphPin;
    BehaviorTreeGraphNode_Composite: typeof BehaviorTreeGraphNode_Composite;
    BehaviorTreeGraphNode_CompositeDecorator: typeof BehaviorTreeGraphNode_CompositeDecorator;
    BehaviorTreeDecoratorGraph: typeof BehaviorTreeDecoratorGraph;
    BehaviorTreeDecoratorGraphNode_Logic: typeof BehaviorTreeDecoratorGraphNode_Logic;
    BehaviorTreeGraphNode_SubtreeTask: typeof BehaviorTreeGraphNode_SubtreeTask;
    BTTask_RunBehavior: typeof BTTask_RunBehavior;
    BTComposite_Sequence: typeof BTComposite_Sequence;
    BTComposite_Selector: typeof BTComposite_Selector;
    定义重合_C: typeof 定义重合_C;
    定义跟随_C: typeof 定义跟随_C;
    定义衣柜宽度_C: typeof 定义衣柜宽度_C;
    定义窗帘宽度_C: typeof 定义窗帘宽度_C;
    定义床与床头柜宽度_C: typeof 定义床与床头柜宽度_C;
    定义吸附_C: typeof 定义吸附_C;
    定义背景墙_C: typeof 定义背景墙_C;
    BehaviorTreeGraphNode_Task: typeof BehaviorTreeGraphNode_Task;
    BlackboardData: typeof BlackboardData;
};
declare class Parser {
    private objectStack;
    private parsingObject;
    private root;
    nodesMap: {
        [name: string]: T3D;
    };
    parse(text: string): T3D;
    private parseBeginLine(line);
    private parseLine(line);
    getLastStackNode(): T3D;
    private getClassNameFromString(str);
    private getNameFromString(str);
    print(root: T3D): void;
    private getPrintName(node);
    private endIndex;
    private getPrevStr(num);
    printNode(prev: any, node: any): void;
}
