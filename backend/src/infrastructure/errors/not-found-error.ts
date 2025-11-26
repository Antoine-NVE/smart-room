import { HttpError } from './http-error';

export class NotFoundError extends HttpError {
    constructor(
        message: string = 'Not found',
    ) {
        super(message, 404);
    }
}
