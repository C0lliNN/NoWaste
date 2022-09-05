import { FieldError, ValidationError } from '../errors/ValidationError';

export class Category {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  validate() {
    const errors: FieldError[] = [];
    if (!this.name.trim()) {
      errors.push({ field: 'name', message: 'this field cannot be empty' });
    }

    if (errors.length) {
      throw new ValidationError(errors);
    }
  }
}
