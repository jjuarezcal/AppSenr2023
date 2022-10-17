import { Component, OnInit } from '@angular/core';

import { EventsService } from '../providers/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(public _es: EventsService) { }

  ngOnInit() {
  }

}
