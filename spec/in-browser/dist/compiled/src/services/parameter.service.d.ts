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
export declare class ParameterService {
    getDataType(param: any): ParameterDataType;
    getDataTypeAsString(param: any): string;
    isDefined(param: any): boolean;
    isSet(param: any): boolean;
    isJson(param: any): boolean;
    isArray(param: any): boolean;
    isString(param: any): boolean;
    isNumber(param: any, allowNumbersAsStrings?: boolean): boolean;
    isInt(param: any, allowIntAsString?: boolean): boolean;
    isEmail(param: any): boolean;
    isBoolean(param: any): boolean;
    isEmpty(param: any): boolean;
}
