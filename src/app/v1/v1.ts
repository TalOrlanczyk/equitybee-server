import {AxiosResponse} from 'axios';
import {Router, Request, Response, NextFunction} from 'express';
import {axiosHandler} from '../../utils/axionsHandler';
import {asyncHandler} from '../../utils/functions';
import {getOrSetCache, RedisKey} from '../../utils/redis/client';
import domainListHandler from './handlers/domianList';
import findDomainHandler from './handlers/findDomain';

const v1Handler = Router();

v1Handler.use('/domain/find',findDomainHandler)
v1Handler.use('/domain/list',domainListHandler)
export default v1Handler;
