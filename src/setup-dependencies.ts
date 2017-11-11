import { dependencyManager } from './services/dependency-manager';
import { ParameterService } from './services/parameter.service';
import { EqualService } from './services/equal.service';

// order is important, if ServiceB depends on ServiceA, then ServiceB should be
// added after ServiceA
export let setupDependencies = () => {
  dependencyManager.clear();
  dependencyManager.add(
    { name: 'ParameterService', service: ParameterService }, 
    { name: 'EqualService', service: EqualService }
  );
};
