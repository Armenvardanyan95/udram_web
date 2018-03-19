import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

const generateYearRange = (start, end) =>{
  const arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
};

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSelectorComponent),
      multi: true
    }
  ]
})
export class DateSelectorComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() placeholder: string = '';
  @Input() startYear: number = new Date().getFullYear() - 88;
  @Input() endYear: number = new Date().getFullYear() - 18;
  years = generateYearRange(this.startYear, this.endYear);
  months = [
    {name: 'Հունվար', value: 1},
    {name: 'Փետրվար', value: 2},
    {name: 'Մարտ', value: 3},
    {name: 'Ապրիլ', value: 4},
    {name: 'Մայիս', value: 5},
    {name: 'Հունիս', value: 6},
    {name: 'Հուլից', value: 7},
    {name: 'Օգոստոս', value: 8},
    {name: 'Սեպտեմբեր', value: 9},
    {name: 'Հոկտեմբեր', value: 10},
    {name: 'Նոյեմբեր', value: 11},
    {name: 'Դեկտեմբեր', value: 12},
    ];
  days = Array.from(Array(31).keys());

  onChange: Function = () => {};
  onTouched: Function = () => {};
  form: FormGroup = new FormGroup({
    day: new FormControl('', Validators.required),
    month: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit() {
    this.form.valueChanges
      .filter(() => this.form.valid)
      .map(value => new Date(value.year, value.month - 1, value.day + 1))
      .subscribe(value => this.onChange(value));
  }

  ngOnChanges() {
    this.years = generateYearRange(this.startYear, this.endYear);
  }

  writeValue() {}

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

}
