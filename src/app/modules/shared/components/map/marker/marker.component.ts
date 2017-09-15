// Core Modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { Marker } from './../../../models/map/marker.model';
import { LocationInfo } from './../../../models/map/locationInfo.model';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {
  @Input() marker: Marker;
  @Output() onLocationInfoUpdate: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();
  @Output() onLocationInfoDelete: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();

  mode: String = 'view';

  constructor() { }

  ngOnInit() {
  }

  changeInfoWindowMode(mode) {
    this.mode = mode;
  }

  onInfoWindowClose() {
    this.changeInfoWindowMode('view');
  }

  onLocationInfoModeChanged(mode) {
    this.changeInfoWindowMode(mode);
  }

  onLocationInfoSaved(locationInfo: LocationInfo) {
    this.onLocationInfoUpdate.emit(locationInfo);
  }

  onLocationInfoDeleted(locationInfo: LocationInfo) {
    this.onLocationInfoDelete.emit(locationInfo);
  }
}
