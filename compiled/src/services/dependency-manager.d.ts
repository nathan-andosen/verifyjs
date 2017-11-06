export declare class DependencyManager {
    private services;
    private addByName(name, service);
    private getByName<T>(name);
    add(...serviceClasses: any[]): void;
    get<T>(c: new (...args: any[]) => T): T;
    clear(): void;
}
declare let dependencyManager: DependencyManager;
export { dependencyManager };
