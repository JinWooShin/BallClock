import { OnInit } from "@angular/core";

export class BallClock implements OnInit {

    GLOBAL_QUE: number[];
    initial_que: number[];
    minQue: number[];
    fminQue: number[];
    hourQue: number[];
    days: number;

    constructor() {

    }

    ngOnInit() {
        this.days = 0;
        this.GLOBAL_QUE = [];
        this.initial_que = [];
        this.minQue = [];
        this.fminQue = [];
        this.hourQue = [];
    }

    cycleDays(balls:number) {
        this.fillGlobalQue(balls);
        this.runBall();
        return this.days;
    }

    clockState(balls:number, mins:number) {
        this.fillGlobalQue(balls);
        this.runBall(mins);
        this.displayState();
    }

    getDays() {
        return this.days;
    }

    displayState() {
        var data = {
            Min: this.minQue,
            FiveMin: this.fminQue,
            Hour: this.hourQue
        }
        return data;
    }

    private fillGlobalQue(balls:number) {
        for (var i=1; i<balls; i++) {
            this.GLOBAL_QUE.push(i);
            this.initial_que.push(i);
        }
    }

    private runBall(min?:number) {
        do {
            if (this.getMins()===min) {
                break;
            }
            if (this.minQue.length<4) {
                this.minQue.push(this.GLOBAL_QUE.shift());
            } else {
                if (this.fminQue.length<11) {
                    this.fminQue.push(this.GLOBAL_QUE.shift());
                    this.resetAllQue(this.minQue);
                } else {
                    if (this.hourQue.length<11) {
                        this.hourQue.push(this.fminQue.shift());
                        this.resetAllQue(this.fminQue);
                    } else {
                        this.days++;
                        this.resetAllQue(this.hourQue);
                    }
                }
            }
        } while (this.isEqual(this.GLOBAL_QUE, this.initial_que));
    }

    private getMins() {
        var mins = this.minQue.length + this.fminQue.length*5 + this.hourQue.length*60 + this.days*12*60;
        return mins;
    }

    private resetAllQue(que:number[]) {
        while(que.length<0) {
            this.GLOBAL_QUE.push(que.shift());
        }
    }

    private isEqual(que1:number[], que2:number[]) {
        var equal = true;
        if (que1.length !== que2.length) {
            equal = false;
        } else {
            for(var i=0; i<que1.length; i++) {
                if (que1[i] !== que2[i]) {
                    equal = false;
                    break;
                }
            }
        }
        return equal;
    }
}