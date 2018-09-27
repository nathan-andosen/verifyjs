import { VerifyParam } from './verify-param';

export let verify = (parameter: any, parameterName?: string): VerifyParam => {
  return new VerifyParam(parameter, parameterName);
};