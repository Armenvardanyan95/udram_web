import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IdentificationType } from '../../../common/identification.type.enum';
import { ErrorMatcher } from '../../../common/error-matcher';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

  @Input() form: FormGroup;
  @Output() typeOfIdentificationChanged: EventEmitter<IdentificationType> = new EventEmitter();

  public identificationTypes = IdentificationType;
  public identificationType: IdentificationType = IdentificationType.Passport;
  public startDate: Date = new Date();
  public matcher = new ErrorMatcher();
  public currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    this.identificationType = this.form.controls['identificationType'].value;
    this.form.controls['identificationType'].valueChanges.subscribe(() => this.onIdentificationTypeChange())
  }

  public onIdentificationTypeChange(): void {
    this.identificationType = this.form.controls['identificationType'].value;
    this.typeOfIdentificationChanged.emit(this.form.controls['identificationType'].value);
  }

}
