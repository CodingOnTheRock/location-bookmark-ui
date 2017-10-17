// Core Modules
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

// Dropzone
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  @ViewChild('dropzone') dropzone;

  @Input() config: DropzoneConfigInterface = {};
  @Input() message: String = '';
  @Input() placeholder: String = '';

  @Output() onUploadSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onUploadError: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  uploadSuccess(data) {
    this.onUploadSuccess.emit(data);
  }

  uploadError(err) {
    this.onUploadError.emit(err);
  }

  reset() {
    this.dropzone.reset();
  }
}
