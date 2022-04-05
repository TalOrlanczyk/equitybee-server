import {ApiError} from './error';
import { Request } from 'express';
import snakeCase from 'lodash/snakeCase';

export const asyncHandler =
  (fn) =>
  (...args) => {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
export const isRequired = (paramName: string, statusCode: number = 400) => {
  throw new ApiError(statusCode, `${paramName} is required`);
};

export const filterKeys = (
  req: Request,
  payload: any,
  mappings: {[key: string]: string} = {},
): any =>
  Object.keys(payload).reduce((_payload, attribute) => {
    if (
      req.body.additionalInformation.hasOwnProperty(snakeCase(attribute)) ||
      req.body.additionalInformation.hasOwnProperty(snakeCase(mappings[attribute]))
    ) {
      _payload[attribute] = payload[attribute];
    }
    return _payload;
  }, {});
