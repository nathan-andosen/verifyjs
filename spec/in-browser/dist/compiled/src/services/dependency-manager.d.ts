export declare class DependencyManager {
    private services;
    private addByName(name, service);
    getByName<T = any>(name: string): T;
    add(...serviceClasses: any[]): void;
    clear(): void;
}
declare let dependencyManager: DependencyManager;
export { dependencyManager };
