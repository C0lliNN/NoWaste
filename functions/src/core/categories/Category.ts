import { FieldError, ValidationError } from '../errors/ValidationError';

export class Category {
  id: string;
  name: string;
  userId: string;

  constructor(id: string, name: string, userId: string) {
    this.id = id;
    this.name = name;
    this.userId = userId;
  }

  validate() {
    const errors: FieldError[] = [];
    if (!this.name.trim()) {
      errors.push({ field: 'name', message: 'this field cannot be empty' });
    }

    if (!this.userId.trim()) {
      errors.push({ field: 'userId', message: 'this field cannot be empty' });
    }

    if (errors.length) {
      throw new ValidationError(errors);
    }
  }
}
