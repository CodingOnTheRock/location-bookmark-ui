// Models
import { Coords } from './coords.model';

export class Marker {
    constructor(
        public icon: String,
        public label: String,
        public title: String,
        public name: String,
        public description: String,
        public coords: Coords
    ) {}
}
