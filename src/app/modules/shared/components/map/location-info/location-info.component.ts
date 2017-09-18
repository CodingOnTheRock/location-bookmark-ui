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
  @Input() mode: String;
  @Input() locationInfo: LocationInfo;
  @Output() onModeChange: EventEmitter<String> = new EventEmitter<String>();
  @Output() onSave: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();
  @Output() onUpdate: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();
  @Output() onDelete: EventEmitter<LocationInfo> = new EventEmitter<LocationInfo>();

  state = {
    ui: {
      view: {
        visible: true
      },
      save: {
        visible: false
      },
      update: {
        visible: false
      }
    }
  };

  form_add_location: FormGroup;
  tbx_add_name: FormControl;
  tbx_add_description: FormControl;

  form_edit_location: FormGroup;
  tbx_edit_description: FormControl;

  constructor() { }

  ngOnInit() {
    this.initialForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // mode
    if (changes.mode.currentValue === 'edit') {
      if (changes.mode && !changes.mode.firstChange) {
        this.tbx_edit_description.setValue(this.locationInfo.description);
      }
    }
  }

  initialForm() {
    // Add form
    this.tbx_add_description = new FormControl('', [
      Validators.required
    ]);
    this.tbx_add_name = new FormControl('', [
      Validators.required
    ]);
    this.form_add_location = new FormGroup({
      name: this.tbx_add_name,
      description: this.tbx_add_description
    });

    this.tbx_add_name.valueChanges
      .debounceTime(50)
      .subscribe((value) => {
        const name = (value.length > 0) ? value.trim() : value;
        if (name.length === 0) {
          this.state.ui.save.visible = false;
          return;
        }

        const isFormValid = this.isLocationAddFormValid();
        this.state.ui.save.visible = isFormValid;
      });

    this.tbx_add_description.valueChanges
      .debounceTime(50)
      .subscribe((value) => {
        const description = (value.length > 0) ? value.trim() : value;
        if (description.length === 0) {
          this.state.ui.save.visible = false;
          return;
        }

        const isFormValid = this.isLocationAddFormValid();
        this.state.ui.save.visible = isFormValid;
    });

    // Edit form
    this.tbx_edit_description = new FormControl('', [
      Validators.required
    ]);
    this.tbx_edit_description.setValue(this.locationInfo.description);
    this.form_edit_location = new FormGroup({
      description: this.tbx_edit_description
    });

    this.tbx_edit_description.valueChanges
      .subscribe((value) => {
        const description = (value.length > 0) ? value.trim() : value;
        this.state.ui.update.visible = (description.length > 0) ? true : false;
    });
  }

  isLocationAddFormValid() {
    return this.form_add_location.valid;
  }

  isLocationEditFormValid() {
    return this.form_edit_location.valid;
  }

  viewClick() {
    this.onModeChange.emit('view');

    this.tbx_edit_description.setValue(this.locationInfo.description);
  }

  editClick() {
    this.onModeChange.emit('edit');
  }

  deleteClick() {
    this.onDelete.emit(this.locationInfo);
  }

  saveClick() {
    const isFormValid = this.isLocationAddFormValid();
    if (isFormValid) {
      const name = this.tbx_add_name.value.trim();
      const description = this.tbx_add_description.value.trim();
      const locationInfo = new LocationInfo('', name, description, new Date(), new Date());

      this.onSave.emit(locationInfo);
    }
  }

  updateClick() {
    const isFormValid = this.isLocationEditFormValid();
    if (isFormValid) {
      const update = Object.assign({}, this.locationInfo);
      update.description = this.tbx_edit_description.value;

      this.onUpdate.emit(update);
    }
  }
}
