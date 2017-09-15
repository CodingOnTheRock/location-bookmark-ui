// Models
import { Coords } from './coords.model';

export class InfoWindow {
    constructor(
        public coords: Coords,
        public isOpen: Boolean
    ) {}
}
