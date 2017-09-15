// Core Modules
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Models
import { LocationInfo } from './../../../models/map/locationInfo.model';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css']
})
export class LocationInfoComponent implements OnInit, OnChanges {
  @Input() mode: String = 'view';
  @Input() locationInfo: LocationInfo;
  @Output() onModeChange: EventEmitter<String> = new EventEmitter<String>();
  @Output() onSave: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();
  @Output() onDelete: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();

  state = {
    ui: {
      description: {
        visible: true
      }
    }
  };

  form_location: FormGroup;
  tbx_description: FormControl;

  constructor() { }

  ngOnInit() {
    this.initialForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // mode
    if (changes.mode && !changes.mode.firstChange) {
      this.tbx_description.setValue(this.locationInfo.description);
    }
  }

  initialForm() {
    this.tbx_description = new FormControl('', [
      Validators.required
    ]);
    this.tbx_description.setValue(this.locationInfo.description);

    this.form_location = new FormGroup({
      description: this.tbx_description
    });

    this.tbx_description.valueChanges
      .subscribe((value) => {
        const description = (value.length > 0) ? value.trim() : value;
        this.state.ui.description.visible = (description.length > 0) ? true : false;
    });
  }

  isLocationFormValid() {
    return this.form_location.valid;
  }

  viewClick() {
    this.onModeChange.emit('view');

    this.tbx_description.setValue(this.locationInfo.description);
  }

  editClick() {
    this.onModeChange.emit('edit');
  }

  deleteClick() {
    this.onDelete.emit(this.locationInfo);
  }

  saveClick() {
    const isFormValid = this.isLocationFormValid();
    if (isFormValid) {
      const newLocationInfo = Object.assign({}, this.locationInfo);
      newLocationInfo.description = this.tbx_description.value;

      this.onSave.emit(newLocationInfo);
    }
  }
}
