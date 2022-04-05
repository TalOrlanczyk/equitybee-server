import { Request } from "express";
import { filterKeys } from "../../../utils/functions";

export const BodyParser = (req:Request)=>{

   const tempPayload={
    logo:"",
    name:"",
    description:"",
    industry:"",
    money_raised:"",
    market_cap:"",
    annual_revenue:"",
    location:"",
    number_of_employees:"",
    type:"",
    ...req.body.additionalInformation
   }
   const payload = filterKeys(req,tempPayload)
    return payload
}
