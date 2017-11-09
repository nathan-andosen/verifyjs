import { dependencyManager } from '../../src/services/dependency-manager';
import { ParameterService } from '../../src/services/parameter.service';

export class TestHelper {
  setupDependencyManager() {
    dependencyManager.clear();
    dependencyManager.add(ParameterService);
  }
}