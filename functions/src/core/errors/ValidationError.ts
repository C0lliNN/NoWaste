const message = 'The provided entity is not valid';

export interface FieldError {
  field: string;
  message: string;
}

export class ValidationError extends Error {
  errors: FieldError[];

  constructor(errors: FieldError[]) {
    super(message);
    this.errors = errors;
  }
}
