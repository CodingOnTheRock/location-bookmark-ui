// Core Modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { Coords } from './../../../models/map/coords.model';
import { Marker } from './../../../models/map/marker.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() coords: Coords = new Coords(0, 0);
  @Input() zoom: Number = 14;
  @Input() markers: Array<Marker> = [];
  @Input() showOverlay: Boolean = false;
  @Output() onFocus = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onMapClick($event) {
    this.focus();
  }

  onMapDblClick($event) {
    this.focus();
  }

  onMapRightClick($event) {
    this.focus();
  }

  onBoundsChange($event) {
    // Do something
  }

  onIdle($event) {
    // Do something
  }

  focus() {
    this.onFocus.emit();
  }
}
