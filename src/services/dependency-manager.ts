
/**
 * Simple class to handle dependency injection
 * 
 * @export
 * @class DependencyManager
 */
export class DependencyManager {
  private services: { [name: string]: any } = {};

  /**
   * Add a service by name
   * 
   * @private
   * @param {string} name 
   * @param {*} service 
   * @memberof DependencyManager
   */
  private addByName(name: string, service: any) {
    this.services[name] = service;
    this.services[name.toLowerCase()] = service;
  }


  /**
   * Get a service by name
   * 
   * @private
   * @template T 
   * @param {string} name 
   * @returns {T} 
   * @memberof DependencyManager
   */
  private getByName<T = any>(name: string): T {
    return this.services[name];
  }


  /**
   * Add services / dependencies
   * 
   * @param {...any[]} serviceClasses 
   * @memberof DependencyManager
   */
  add(...serviceClasses: any[]) {
    serviceClasses.forEach((serviceClass) => {
      let service = serviceClass;
      if (service instanceof Function) {
        service = new serviceClass();
      }
      this.addByName(service.constructor.name, service);
    });
  }


  /**
   * Get a service / dependency by type
   * 
   * @template T 
   * @param {new (...args: any[]) => T} c 
   * @returns {T} 
   * @memberof DependencyManager
   */
  get<T>(c: new (...args: any[]) => T): T {
    return this.getByName<T>(c['name'].toLowerCase());
  }


  /**
   * CLear all dependencies
   * 
   * @memberof DependencyManager
   */
  clear() {
    this.services = {};
  }
}


let dependencyManager = new DependencyManager();
export { dependencyManager };