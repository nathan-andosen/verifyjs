
/**
 * Simple class to handle dependency injection.
 * 
 * We add dependencies using names and fetch the dependencies by name, we use
 * a name so that when the library gets minified, nothing breaks. If you add
 * by type and get by type, it wont work when the library gets minified.
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
  public getByName<T = any>(name: string): T {
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
      let service = serviceClass.service;
      if (service instanceof Function) {
        service = new serviceClass.service();
      }
      this.addByName(serviceClass.name, service);
    });
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