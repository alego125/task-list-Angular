import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  title:string = 'My list';

  constructor() { }

  ngOnInit(): void {
  }

  toggleAddTask(){
    console.log("Consulta Toggle agregada");
  }

}
