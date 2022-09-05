export class EntityNotFoundError extends Error {
  entityName: string;
  entityId: string;

  constructor(entityName: string, entityId: string) {
    const message = `${entityName} with id ${entityId} was not found`;

    super(message);

    this.entityId = entityId;
    this.entityName = entityName;
  }
}
