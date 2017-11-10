export declare class EqualService {
    private parameterSrv;
    constructor();
    paramEqualsValue(param: any, paramName: string, val: any): boolean | Error;
    private binaryEquals(param, paramName, val);
    private arrayEquals(param, paramName, val);
    private arraysAreEqual(a, b);
    private jsonEquals(param, paramName, val);
    paramEqualsMin(param: any, paramName: string, val: number): boolean | Error;
    private stringMin(param, paramName, val);
    private arrayMin(param, paramName, val);
    private numberMin(param, paramName, val);
}
