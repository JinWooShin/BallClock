import { Component, OnInit } from '@angular/core';
import { BallClock } from "../BallClock/BallClock";

@Component({
  selector: 'app-ball-clock',
  templateUrl: './ball-clock.component.html',
  styleUrls: ['./ball-clock.component.scss']
})
export class BallClockComponent implements OnInit {
  clock:{nBall:string, mins: string, nBall2: string}
  ballClock: BallClock;
  cycle: {};
  state: {};
  constructor() { }

  ngOnInit() {
    this.ballClock = new BallClock();
    this.cycle = {};
    this.state = "";
    this.clock = {nBall:"0", mins:"0", nBall2:"0"};
  }

  cycleCompute() {
    this.cycle = {};
    var start = new Date().getTime();
    this.ballClock.cycleDays(parseInt(this.clock.nBall));
    var end = new Date().getTime();
    var elapse = end - start;
    this.cycle ={days: Math.floor(this.ballClock.getDays()/2), time: elapse};
  }

  stateCompute() {
    this.state = "";
    this.ballClock.clockState(parseInt(this.clock.nBall2), parseInt(this.clock.mins));
    this.state = this.ballClock.displayState();
  }
}
