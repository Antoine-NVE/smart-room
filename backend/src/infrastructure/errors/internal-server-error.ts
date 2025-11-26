import { HttpError } from './http-error';

export class InternalServerError extends HttpError {
    constructor(
        message: string = 'Internal server error',
    ) {
        super(message, 500);
    }
}
