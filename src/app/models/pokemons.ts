import { Pokemon } from './pokemon';

export class Pokemons {
    count ?: number;
    next ?: string;
    previous ?: string;
    results ?: Pokemon[];

    constructor(values: object = {}) {
        Object.assign(this, values);

    }
}
