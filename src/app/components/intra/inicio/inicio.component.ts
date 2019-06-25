import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../../services/event.service';
import * as moment from 'moment';


@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
    events: any[];
    options: any;
    now: any;
    header: any;
    constructor(private eventService: EventService) { }
    ngOnInit() {
        this.now = moment().format('YYYY-MM-DD');
     
        this.events =[
            {
                id: 1,
                title: "All Day Event.",
                start: "2017-02-01"
            },
            {
                id: 2,
                title: "All Day Event.",
                start: "2017-02-02"
            },
            {
                id: 3,
                title: "All Day Event.",
                start: "2017-02-03"
            },
            {
                id: 4,
                title: "All Day Event.",
                start: "2017-02-04"
            },
            {
                id: 5,
                title: "cumple",
                start: "2019-05-04"
            },
            {
                id: 5,
                title: "Dia de las madre",
                start: "2019-05-10"
            }    

          ]
        
       ;
        // this.eventService.getEvents().then(events => { this.events = events; });
      
        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: this.now ,
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true
        };
    }
}