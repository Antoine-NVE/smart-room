import { HttpError } from './http-error';

export class BadRequestError extends HttpError {
    constructor(
        message: string = 'Bad request',
    ) {
        super(message, 400);
    }
}
