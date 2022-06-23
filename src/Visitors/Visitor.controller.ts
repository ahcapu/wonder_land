import { Request, Response } from "express";
import { CreateGuardianDto } from "./Guardian/Guardian-create.dto";
import { Guardian } from "./Guardian/Guardian.entity";
import { GuardianService } from "./Guardian/Guardian.service";
import { CreateKidDto } from "./Kid/Kid-create.dto";
import { Kid } from "./Kid/Kid.entity";
import { KidService } from "./Kid/Kid.service";
import { CreateVisitDto } from "./Visit/Visit-create.dto";
import { Visit } from "./Visit/Visit.entity";
import { VisitService } from "./Visit/Visit.service";
import { VisitorUtils } from "./Visitor.utls";

export class VisitorController {
  static add = async (req: Request, res: Response) => {
    try {
      let user = req.user;
      let dataGuardian: CreateGuardianDto = req.body;
      dataGuardian.user = user;
      dataGuardian.phone_number = req.body.phone_number;
      let resultGuardian = await GuardianService.add(dataGuardian);
      if (!(resultGuardian instanceof Guardian)) {
        return res.status(400).json({ status: 400, error: resultGuardian });
      }

      for (let i = 0; i < req.body.kids.length; i++) {
        const dataKid: CreateKidDto = req.body.kids[i];
        dataKid.user = user;
        dataKid.guardain_id = resultGuardian.id as any;

        let resultKid: any = await KidService.add(dataKid);
        if (resultKid.message !== 'success') {
          if (!(resultKid instanceof Kid)) {
            return res.status(400).json({ status: 400, error: resultKid });
          } 
        }
      
        const dataVisit = {
          user: user,
          kid_id: resultKid.kid_id as any || resultKid.id as any,
          guardain_id: resultGuardian.id as any,
        } as CreateVisitDto;

        let resultVisit = await VisitService.add(dataVisit);
        if (!(resultVisit instanceof Visit)) {
          return res.status(400).json({ status: 400, error: resultVisit });
        }
      }
      const result = await VisitorUtils.getVisitor(resultGuardian.phone_number);
      return res.status(201).json({ status: 201, data: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static addNew = async (req: Request, res: Response) => {
    try {
      let user = req.user;

      for (let i = 0; i < req.body.kids.length; i++) {

        let dataGuardian: CreateGuardianDto = req.body.kids[i];
        dataGuardian.user = user;
        let resultGuardian = await GuardianService.add(dataGuardian);
        if (!(resultGuardian instanceof Guardian)) {
          return res.status(400).json({ status: 400, error: resultGuardian });
        }

        const dataKid: CreateKidDto = req.body.kids[i];
        dataKid.user = user;
        dataKid.guardain_id = resultGuardian.id as any;

        let resultKid: any = await KidService.add(dataKid);
        if (resultKid.message !== 'success') {
          if (!(resultKid instanceof Kid)) {
            return res.status(400).json({ status: 400, error: resultKid });
          } 
        }
      
        const dataVisit = {
          user: user,
          kid_id: resultKid.kid_id as any || resultKid.id as any,
          guardain_id: resultGuardian.id as any,
          visit_date: req.body.kids[i].visit_date,
          visit_time: req.body.kids[i].visit_time,
        } as CreateVisitDto;

        let resultVisit = await VisitService.add(dataVisit);
        if (!(resultVisit instanceof Visit)) {
          return res.status(400).json({ status: 400, error: resultVisit });
        }
      }
      // const result = await VisitorUtils.getVisitor(resultGuardian.phone_number);
      return res.status(201).json({ status: 201, data: 'result' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static get = async (req: Request, res: Response) => {
    try {
      const result = await VisitorUtils.getVisitor(req.params.phone);
      if (!result) {
        return res.status(204).json({ status: 204, message: 'no record found' });
      }
      
      return res.status(200).json({ status: 200, data: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      
      const result = await VisitorUtils.getAllVisitor();
      if (!result) {
        return res.status(204).json({ status: 204, message: 'no record found' });
      }
      
      return res.status(200).json({ status: 200, data: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static stationStatus = async (req: Request, res: Response) => {
    try {
      let start = req.body.start;
      let end = req.body.end;
      const result = await VisitorUtils.stationStatus(start, end);
      if (!result) {
        return res.status(204).json({ status: 204, message: 'no record found' });
      }
      
      return res.status(200).json({ status: 200, data: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
