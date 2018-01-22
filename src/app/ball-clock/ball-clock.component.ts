import { Component, OnInit } from '@angular/core';
import { BallClock } from "../BallClock/BallClock";

@Component({
  selector: 'app-ball-clock',
  templateUrl: './ball-clock.component.html',
  styleUrls: ['./ball-clock.component.scss']
})
export class BallClockComponent implements OnInit {
  clock:{days:number, mins: number}
  ballClock: BallClock;
  cycle: number;
  state: {};
  constructor() { }

  ngOnInit() {
    this.ballClock = new BallClock();
    this.clock = {days:0, mins:0};
  }

  cycleCompute() {
    this.ballClock.cycleDays(this.clock.days)
    this.cycle = this.ballClock.getDays();
  }

  stateCompute() {
    this.ballClock.clockState(this.clock.days, this.clock.mins);
    this.state = this.ballClock.displayState();
  }
}
