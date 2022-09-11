import { FieldError, ValidationError } from '../errors/ValidationError';
import { CategoryType } from './CategoryType';

export class Category {
  id: string;
  name: string;
  type: CategoryType;
  userId: string;

  constructor(id: string, name: string, type: CategoryType, userId: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.userId = userId;
  }

  validate() {
    const errors: FieldError[] = [];
    if (!this.id.trim()) {
      errors.push({ field: 'name', message: 'this field cannot be empty' });
    }

    if (!this.name.trim()) {
      errors.push({ field: 'name', message: 'this field cannot be empty' });
    }

    if (!this.userId.trim()) {
      errors.push({ field: 'userId', message: 'this field cannot be empty' });
    }

    if (errors.length) {
      throw new ValidationError(...errors);
    }
  }
}
