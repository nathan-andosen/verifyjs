export declare enum ParameterDataType {
    Null = 0,
    Undefined = 1,
    String = 2,
    Number = 3,
    Boolean = 4,
    Array = 5,
    Json = 6,
    Unknown = 7,
}
export declare class Parameter {
    getDataType(param: any): ParameterDataType;
    isDefined(param: any): boolean;
    isSet(param: any): boolean;
    isJson(param: any): boolean;
    isArray(param: any): boolean;
    isString(param: any): boolean;
    isNumber(param: any): boolean;
    isInt(param: any): boolean;
    isEmail(param: any): boolean;
}
