import * as express from 'express';
import { Category } from '../../core/categories/category';

const router = express.Router();

router.get('/categories', (req, res) => {
  const categories: Category[] = [
    {
      id: 'id-1',
      name: 'Category 1'
    },
    {
      id: 'id-2',
      name: 'Category 2'
    }
  ];
  return res.send(categories);
});

export default router;
