export declare class EqualService {
    private parameterSrv;
    paramEqualsValue(param: any, paramName: string, val: any): boolean | Error;
    private binaryEquals(param, paramName, val);
    private arrayEquals(param, paramName, val);
    private arraysAreEqual(a, b);
    private jsonEquals(param, paramName, val);
    paramEqualsMin(param: any, paramName: string, val: number): boolean | Error;
    private stringMin(param, paramName, val);
    private arrayMin(param, paramName, val);
    private numberMin(param, paramName, val);
    paramEqualsMax(param: any, paramName: string, val: number): boolean | Error;
    private stringMax(param, paramName, val);
    private arrayMax(param, paramName, val);
    private numberMax(param, paramName, val);
    paramLengthEquals(param: any, paramName: string, val: number): boolean | Error;
}
