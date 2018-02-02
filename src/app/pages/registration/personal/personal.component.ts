import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMatcher } from '../../../common/error-matcher';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  @Input() form: FormGroup;
  public matcher: ErrorMatcher = new ErrorMatcher();
  public startDate: Date = new Date('December 17, 1995 00:00:00');

  constructor() { }

  ngOnInit() {
  }

}
