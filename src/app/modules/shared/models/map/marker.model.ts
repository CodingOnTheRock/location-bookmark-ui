// Models
import { Coords } from './coords.model';

export class Marker {
    constructor(
        public name: String,
        public description: String,
        public coords: Coords
    ) {}
}
