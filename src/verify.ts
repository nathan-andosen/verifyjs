import { VerifyParam } from './verify-param';

export let verify = (parameter: any, parameterName?: string): VerifyParam => {
  let verifyParam = new VerifyParam(parameter, parameterName);
  return verifyParam;
};