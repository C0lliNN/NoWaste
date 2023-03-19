import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import { CategoryService } from '../../../core/categories/CategoryService';

export class CategoryController {
  service: CategoryService;
  router: express.IRouter;

  constructor(service: CategoryService, router: express.IRouter) {
    this.service = service;
    this.router = router;
  }

  public handler(): express.Handler {
    this.router.get('/categories', asyncHandler(this.getCategories.bind(this)));
    this.router.post('/categories', asyncHandler(this.createCategory.bind(this)));
    this.router.put('/categories/:id', asyncHandler(this.updateCategory.bind(this)));
    this.router.delete('/categories/:id', asyncHandler(this.deleteCategory.bind(this)));
    return this.router;
  }

  private async getCategories(req: express.Request, resp: express.Response) {
    const categories = await this.service.getCategories({ userId: req.userId });
    resp.send(categories);
  }

  private async createCategory(req: express.Request, resp: express.Response) {
    await this.service.createCategory({
      id: req.body.id,
      name: req.body.name,
      type: req.body.type,
      color: req.body.color,
      userId: req.userId
    });

    resp.sendStatus(201);
  }

  private async updateCategory(req: express.Request, resp: express.Response) {
    await this.service.updateCategory({
      id: req.params.id,
      name: req.body.name,
      type: req.body.type,
      color: req.body.color,
      userId: req.userId
    });

    resp.sendStatus(200);
  }

  private async deleteCategory(req: express.Request, resp: express.Response) {
    await this.service.deleteCategory({ categoryId: req.params.id, userId: req.userId });
    resp.sendStatus(200);
  }
}
