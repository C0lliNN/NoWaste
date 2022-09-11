import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import { Category } from '../../../core/categories/Category';
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

  private async getCategories(_: express.Request, resp: express.Response) {
    const categories = await this.service.getCategories();
    resp.send(categories);
  }

  private async createCategory(req: express.Request, resp: express.Response) {
    const category = new Category(req.body.id, req.body.name, req.userId);

    await this.service.createCategory(category);
    resp.status(201).send(category);
  }

  private async updateCategory(req: express.Request, resp: express.Response) {
    const category = new Category(req.body.id, req.body.name, req.userId);

    await this.service.updateCategory(req.params.id, category);
    resp.status(200);
  }

  private async deleteCategory(req: express.Request, resp: express.Response) {
    await this.service.deleteCategory(req.params.id);
  }
}
