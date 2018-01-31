import { Component, OnInit } from '@angular/core';
import { BallClock } from "../BallClock/BallClock";

@Component({
  selector: 'app-ball-clock',
  templateUrl: './ball-clock.component.html',
  styleUrls: ['./ball-clock.component.scss']
})

export class BallClockComponent implements OnInit {
  clock:{nBall:number, mins: number, nBall2: number}
  ballClock: BallClock;
  cycle: {};
  state: {};
  constructor() { }

  ngOnInit() {
    this.ballClock = new BallClock();
    this.cycle = {};
    this.state = {};
    this.clock = {nBall: 27, mins: 0, nBall2: 27};
  }

  cycleCompute() {
    if (this.checkValidBall(this.clock.nBall)) {
      var start = new Date().getTime();
      this.ballClock.runBall(this.clock.nBall);
      var end = new Date().getTime();

      var result = this.ballClock.getDays();
      this.cycle = {
        days: Math.floor(result.days/2), 
        time: end - start,
        balls: result.balls
      };
    } else {
      this.cycle = {};
      alert("Invalid number of balls. \nNumber of ball should be 27~127");
    }
  }

  stateCompute() {
    if (this.checkValidBall(this.clock.nBall2)) {
    this.ballClock.runBall(this.clock.nBall2, this.clock.mins);

    this.state = this.ballClock.getCurrentState();
    } else {
      this.state = {};
      alert("Invalid number of balls. \nNumber of ball should be 27~127");
    }
  }

  checkValidBall(ball:number) {
    if (ball < 27 || ball > 127) {
      return false;
    }
    return true;
  }
}
