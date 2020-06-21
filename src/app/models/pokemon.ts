export class Pokemon {
    name ?: string;
    url ?: string;

    constructor(values: object = {}) {
        Object.assign(this, values);

    }
}
