import { ValidationArguments } from 'class-validator';
import { ExceptionTranslateParse } from './exception-translate-parse';

export class ApiError extends Array<ExceptionTranslateParse> {
  protected constructor(error?: ApiError[0]) {
    super();
    if (error) this.push(error);
  }

  static parse(message: string, args?: Partial<ValidationArguments>) {
    return `${message}|${JSON.stringify({
      property: args.property,
      c0: args.constraints ? args.constraints[0] : null,
    })}`;
  }
}
