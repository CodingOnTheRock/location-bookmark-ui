// Core Modules
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

// Models
import { Coords } from './../../../models/map/coords.model';
import { Marker } from './../../../models/map/marker.model';
import { LocationInfo } from './../../../models/map/locationInfo.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() coords: Coords = new Coords(0, 0);
  @Input() zoom: Number = 14;
  @Input() markers: Array<Marker> = [];
  @Input() showOverlay: Boolean = false;
  @Output() onFocus = new EventEmitter();
  @Output() onLostFocus = new EventEmitter();
  @Output() onRightClick: EventEmitter<Coords> = new EventEmitter<Coords>();
  @Output() onCenterChange: EventEmitter<Coords> = new EventEmitter<Coords>();

  @Output() onNewMarkerInfoWindowClose: EventEmitter<Marker> = new EventEmitter<Marker>();
  @Output() onMarkerSave: EventEmitter<Marker> = new EventEmitter<Marker>();
  @Output() onMarkerUpdate: EventEmitter<Marker> = new EventEmitter<Marker>();
  @Output() onMarkerDelete: EventEmitter<Marker> = new EventEmitter<Marker>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // showOverlay
    if (changes.showOverlay && !changes.showOverlay.firstChange) {
      if (changes.showOverlay.currentValue) {
        this.lostFocus();
      }
    }
  }

  onMapClick(event) {
    this.focus();
  }

  onMapDblClick(event) {
    this.focus();
  }

  onMapRightClick(event) {
    this.focus();
    this.rightClick(event);
  }

  onMapBoundsChange(event) {
    // No Action
  }

  onMapCenterChange(event) {
    const lat = event.lat;
    const lng = event.lng;
    const coords = new Coords(lat, lng);

    this.onCenterChange.emit(coords);
  }

  onIdle(event) {
    // No Action
  }

  onNewMarkerInfoWindowClosed(locationInfo: LocationInfo) {
    const marker = this.findMarker(locationInfo);
    const newMarker = Object.assign({}, marker);

    this.onNewMarkerInfoWindowClose.emit(newMarker);
  }

  onLocationInfoSaved(locationInfo: LocationInfo) {
    const marker = this.findMarker(locationInfo);
    const newMarker = Object.assign({}, marker);
    newMarker.locationInfo = locationInfo;

    this.onMarkerSave.emit(newMarker);
  }

  onLocationInfoUpdated(locationInfo: LocationInfo) {
    const marker = this.findMarker(locationInfo);
    const updateMarker = Object.assign({}, marker);
    updateMarker.locationInfo = locationInfo;

    this.onMarkerUpdate.emit(updateMarker);
  }

  onLocationInfoDeleted(locationInfo: LocationInfo) {
    const deleteMarker = this.findMarker(locationInfo);

    this.onMarkerDelete.emit(deleteMarker);
  }

  findMarker(locationInfo: LocationInfo) {
    const id = locationInfo.id;
    const found = this.markers.find((marker) => {
      return marker.locationInfo.id === id;
    });

    return found;
  }

  focus() {
    this.onFocus.emit();
  }

  lostFocus() {
    this.onLostFocus.emit();
  }

  rightClick(event) {
    const lat = event.coords.lat;
    const lng = event.coords.lng;
    const coords = new Coords(lat, lng);

    this.onRightClick.emit(coords);
  }
}
