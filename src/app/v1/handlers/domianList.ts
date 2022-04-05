import { Request, Response, Router } from 'express';
import { asyncHandler } from '../../../utils/functions';
import { Domains } from '../../models/Domains';

const domainListHandler = Router();

domainListHandler.get(
  '/',
  asyncHandler(async (req:Request, res:Response) => {
      const domains = await Domains.findAll({
          order:[['createdAt','DESC']]
      });
      const formatData = domains.map((domain)=>{
          return {
            id:domain.domainId,
            domainAliases:domain.domainAliases,
            domain:domain.domain,
            additionalInformation:domain.additionalInformation
          }
      })
      res.status(200).send(formatData);
  }),
);
domainListHandler.get(
  '/:id',
  asyncHandler(async (req:Request, res:Response) => {

    const {id} = req.params;
      const domain = await Domains.findOne({
          where:{
              domainId:id
          }
      });

      res.status(200).send({
        id:domain.domainId,
        domainAliases:domain.domainAliases,
        domain:domain.domain,
        additionalInformation:domain.additionalInformation
      });
  }),
);

export default domainListHandler;
