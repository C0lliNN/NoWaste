import { ReportService } from '../../../core/reports/ReportService';
import * as express from 'express';
import * as asyncHandler from 'express-async-handler';

export class ReportController {
  service: ReportService;
  router: express.IRouter;

  constructor(service: ReportService, router: express.IRouter) {
    this.service = service;
    this.router = router;
  }

  public handler(): express.Handler {
    this.router.get('/status', asyncHandler(this.getUserStatus.bind(this)));
    return this.router;
  }

  async getUserStatus(req: express.Request, res: express.Response) {
    const userStatusResponse = await this.service.getUserStatus({
      userId: req.userId,
      month: req.query.month as string,
      year: parseInt(req.query.year as string)
    });

    res.send(userStatusResponse);
  }
}
