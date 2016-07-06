declare class T3D {
    static beginStr: string;
    static endStr: string;
    finish(): void;
    children: Array<T3D>;
    parent: T3D;
    name: string;
    clazz: string;
    nodeName: string;
    parentNode: T3D;
}
declare class BTCompositeSelector extends T3D {
    clazzName: string;
    Name: string;
}
declare class BehaviorTree extends T3D {
}
declare class Parser {
    private objectStack;
    private parsingObject;
    parse(text: string): void;
    private parseLine(line);
    private getClassNameFromString(str);
}
