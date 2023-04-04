import { FieldError, ValidationError } from '../errors/ValidationError';
import { CategoryType } from './CategoryType';

export class Category {
  constructor(
    public id: string,
    public name: string,
    public type: CategoryType,
    public color: string,
    public useCount: number,
    public userId: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.color = color;
    this.useCount = useCount;
    this.userId = userId;
  }

  validate() {
    const errors: FieldError[] = [];
    if (!this.id || !this.id.trim()) {
      errors.push({ field: 'id', message: 'this field cannot be empty' });
    }

    if (!this.name || !this.name.trim()) {
      errors.push({ field: 'name', message: 'this field cannot be empty' });
    }

    if (!this.color || !this.color.trim() || this.color.length != 7) {
      errors.push({ field: 'color', message: 'this field must contain a valid color hex' });
    }

    if (!this.userId || !this.userId.trim()) {
      errors.push({ field: 'userId', message: 'this field cannot be empty' });
    }

    if (errors.length) {
      throw new ValidationError(...errors);
    }
  }

  incrementUseCount() {
    this.useCount++;
  }
}
