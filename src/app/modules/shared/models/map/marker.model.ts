// Models
import { Coords } from './coords.model';
import { LocationInfo } from './locationInfo.model';

export class Marker {
    constructor(
        public icon: String,
        public label: String,
        public title: String,
        public locationInfo: LocationInfo,
        public coords: Coords
    ) {}
}
