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
    nodeName: string;
    parentNode: T3D;
    static getClassName(): any;
    getClassName(): string;
    getNodeByName(name: any): T3D;
    parseLine(line: string): void;
    addParentFinishTask(callback: Function): void;
    addRootFinishTask(): void;
    removeChild(obj: T3D): void;
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
    private parseParentName(line);
}
declare class BTComposite_Sequence extends T3D {
    parseLine(line: string): void;
    private parseChildLine(line);
}
declare class BTComposite_Selector extends T3D {
    parseLine(line: string): void;
    parseNodeName(line: string): void;
    private parseParentName(line);
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
    test(root: T3D): void;
}
