import {Component, OnInit, ViewChild} from '@angular/core';
import {LogService} from '../../service/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  constructor(public logService: LogService) {
  }

  ngOnInit(): void {
  }

}
