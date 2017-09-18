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
  @Output() onNewMarkerInfoWindowClose = new EventEmitter();
  @Output() onLocationInfoSave: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();
  @Output() onLocationInfoUpdate: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();
  @Output() onLocationInfoDelete: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();

  constructor() { }

  ngOnInit() {
  }

  changeInfoWindowMode(mode) {
    this.marker.mode = mode;
  }

  onInfoWindowClose() {
    if (this.marker.mode === 'add') {
      const locationInfo = this.marker.locationInfo;
      this.onNewMarkerInfoWindowClose.emit(locationInfo);
      return;
    }

    if (this.marker.mode === 'edit') {
      this.changeInfoWindowMode('view');
      return;
    }
  }

  onLocationInfoModeChanged(mode) {
    this.changeInfoWindowMode(mode);
  }

  onLocationInfoSaved(locationInfo: LocationInfo) {
    this.onLocationInfoSave.emit(locationInfo);
  }

  onLocationInfoUpdated(locationInfo: LocationInfo) {
    this.onLocationInfoUpdate.emit(locationInfo);
  }

  onLocationInfoDeleted(locationInfo: LocationInfo) {
    this.onLocationInfoDelete.emit(locationInfo);
  }
}
