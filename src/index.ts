class T3D{
    public static beginStr = "Begin Object";
    public static endStr = "End Object";

    public finish(){

    }

    public children:Array<T3D>;

    public parent:T3D;

    public name:string;
    public clazz:string;

    public nodeName:string;
    public parentNode:T3D;
}

class BTCompositeSelector extends T3D{
    clazzName = 'BTComposite_Selector'
    Name:string
}

class BehaviorTree extends T3D{
    
}


class Parser{

    private objectStack:Array<T3D> = [];
    private parsingObject:T3D ;
    public parse(text:string){
        var lines = text.split('\n');
        for(var i in lines){
            var line = lines[i];
            this.parseLine(line)
        }
        
    }

    private parseLine(line:string){
        if(line.indexOf(T3D.beginStr) > -1){
            var className = this.getClassNameFromString(line)
            if(className){
                console.log(className)
                var obj = null;
                switch (className) {
                    case "BehaviorTree":
                        obj = new BehaviorTree();
                        break;
                
                    default:
                        break;
                }
                this.parsingObject = obj;
            }else{

            }
           
        }

        if(line.indexOf(T3D.endStr) > -1){
            
        }


    }

    private getClassNameFromString(str){
        var reg = /Class=([^\s]*)\s/
        if(reg.test(str)){
            var res = reg.exec(str);
            return res[1]
        }else{
            return null;
        }
    }
}


