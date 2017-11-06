export declare class Verify {
    isDefined(): void;
    isDefinedOrThrowError(err?: any): void;
    isNotDefined(): void;
    isSet(): void;
    isSetOrThrowError(err?: any): void;
    isSetOrUseDefault(): void;
    isNotSet(): void;
    isValid(): void;
    isNotValid(): void;
    isValidOrThrowError(err?: any): void;
    string(): void;
    array(): void;
    number(): void;
    int(): void;
    json(): void;
    min(): void;
    max(): void;
    email(): void;
    equals(val: any): void;
    notEquals(val: any): void;
    lengthEquals(val: number): void;
    empty(): void;
    notEmpty(): void;
}
export declare let verify: () => void;
