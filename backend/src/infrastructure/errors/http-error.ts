export abstract class HttpError extends Error {
    protected constructor(
        message: string,
        public status: number,
    ) {
        super(message);
        this.name = new.target.name;
    }
}
