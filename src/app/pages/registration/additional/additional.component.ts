import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PROVINCES } from '../../../common/provinces';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss']
})
export class AdditionalComponent implements OnInit {

  @Input() form: FormGroup;
  public provinces = PROVINCES;
  public province: number = 3;

  constructor() { }

  ngOnInit() {
    this.province = +this.form.controls['province'].value;
    this.form.controls['province'].valueChanges.subscribe(val => this.province = +val);
  }

}
