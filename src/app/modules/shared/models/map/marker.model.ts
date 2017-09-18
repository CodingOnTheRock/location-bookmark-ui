// Models
import { Coords } from './coords.model';
import { LocationInfo } from './locationInfo.model';
import { InfoWindow } from './infowindow.model';

export class Marker {
    constructor(
        public mode: String,
        public icon: String,
        public label: String,
        public title: String,
        public locationInfo: LocationInfo,
        public coords: Coords,
        public infoWindow: InfoWindow
    ) {}
}
