import {AxiosResponse} from 'axios';
import {Router, Request, Response, NextFunction} from 'express';
import {axiosHandler} from '../../../utils/axionsHandler';
import {asyncHandler, isRequired} from '../../../utils/functions';
import {
  deleteHandler,
  getOrSetCache,
  RedisKey,
} from '../../../utils/redis/client';
import {Domains} from '../../models/Domains';
import {BodyParser} from '../helpers/addDomainBody';
const findDomainHandler = Router();
findDomainHandler.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const {domain} = req.query;
    console.time('answer time');
    let data: AxiosResponse<any, any> = await getOrSetCache(
      `${RedisKey.DOMAIN}_${domain}`,
      async () => {
        const request = await axiosHandler('/find', {
          params: {
            domain,
          },
          headers: {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          },
        });
        const isAddedDomain = await Domains.findOne({
          where: {domainId: request.data.id},
        });
        const dataReAssign = {
          domain: request.data.domain,
          domainAliases: request.data.domainAliases,
          id: request.data.id,
          isAdded:isAddedDomain ? true : false,
          additionalInformation: {
            name: request.data.name,
            logo: request.data.logo,
            description: request.data.description,
            industry: request.data.category.industry,
            money_raised: request.data.metrics.raised,
            market_cap: request.data.metrics.marketCap,
            annual_revenue: request.data.metrics.annualRevenue,
            number_of_employees: request.data.metrics.employees,
            location: request.data.location,
            type: request.data.type,

          },
        };
        return {status: request.status, data: dataReAssign};
      },
      15000,
    );

    console.timeEnd('answer time');

    res.status(data.status).send(data.data);
  }),
);

findDomainHandler.post(
  '/add',
  asyncHandler(async (req: Request, res: Response) => {
    const {
      domain = isRequired('domain'),
      id = isRequired('id'),
      domainAliases = isRequired('domainAliases'),
      additionalInformation = isRequired('domainAliases'),
    } = req.body;

    await deleteHandler(`${RedisKey.DOMAIN}_${domain}`);
    const data = await Domains.create({
      domainId: id,
      domain,
      domainAliases,
      additionalInformation: await BodyParser(req),
    });

    res.status(200).send({
      id:data.domainId,
      domainAliases:data.domainAliases,
      domain:data.domain,
      additionalInformation:data.additionalInformation
    });
  }),
);
export default findDomainHandler;
