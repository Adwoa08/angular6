import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private progressService: NgProgress) {}

  ngOnInit() {
  }

}
