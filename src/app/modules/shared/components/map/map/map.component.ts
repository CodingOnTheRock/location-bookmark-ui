import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() showOverlay: Boolean = true;
  @Output() onFocus = new EventEmitter();

  lat: Number = 13.635526;
  lng: Number = 100.716373;

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
