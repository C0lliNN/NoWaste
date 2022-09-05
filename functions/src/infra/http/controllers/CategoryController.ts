import { CategoryService } from '../../../core/categories/CategoryService';
import * as express from 'express';
import { Category } from '../../../core/categories/Category';

export class CategoryController {
  service: CategoryService;
  router: express.IRouter;

  constructor(service: CategoryService, router: express.IRouter) {
    this.service = service;
    this.router = router;
  }

  private async getCategories(_: express.Request, resp: express.Response) {
    const categories = await this.service.getCategories();
    resp.send(categories);
  }

  private async createCategory(req: express.Request, resp: express.Response) {
    const category = req.body as Category;
    await this.service.createCategory(category);
    resp.status(201).send(category);
  }

  private async updateCategory(req: express.Request, resp: express.Response) {
    const category = req.body as Category;
    await this.service.updateCategory(req.params.id, category);
    resp.status(200);
  }

  private async deleteCategory(req: express.Request, resp: express.Response) {
    await this.service.deleteCategory(req.params.id);
  }

  public handler(): express.Handler {
    this.router.get('/categories', this.getCategories.bind(this));
    this.router.post('/categories', this.createCategory.bind(this));
    this.router.put('/categories/:id', this.updateCategory.bind(this));
    this.router.delete('/categories/:id', this.deleteCategory.bind(this));
    return this.router;
  }
}
