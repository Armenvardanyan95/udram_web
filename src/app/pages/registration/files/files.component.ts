import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  @Input() files: {passport?: File, acra?: File} = {};

  constructor() { }

  ngOnInit() {
  }

}
