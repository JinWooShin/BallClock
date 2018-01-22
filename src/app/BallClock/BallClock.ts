import { ClockQue } from '../ClockQue/ClockQue';

export class BallClock {

    GLOBAL_QUE: ClockQue;;
    minQue: ClockQue;
    fminQue: ClockQue;
    hourQue: ClockQue;
    days: number;

    constructor() {
        this.init();
    }

    init() {
        this.days = 0;
        // this.initial_que = [];
        this.minQue = new ClockQue(4);
        this.fminQue = new ClockQue(11);
        this.hourQue = new ClockQue(11);
    }

    cycleDays(balls:number) {
        this.init();
        this.fillGlobalQue(balls);
        this.runBall(balls);
        return this.days;
    }

    clockState(balls:number, mins:number) {
        this.init();

        this.fillGlobalQue(balls);
        this.runBall(balls, mins);
        this.displayState();
    }

    getDays() {
        return this.days;
    }

    displayState() {
        var data = {
            Min: this.minQue.data,
            FiveMin: this.fminQue.data,
            Hour: this.hourQue.data,
            Main: this.GLOBAL_QUE.data
        }
        return JSON.stringify(data);
    }

    private fillGlobalQue(balls:number) {
        this.GLOBAL_QUE = new ClockQue(balls);
        for (var i=1; i<balls+1; i++) {
            this.GLOBAL_QUE.que(i);
        }
    }

    private runBall(balls, min?:number) {
        var ball;
        do {

            ball = this.GLOBAL_QUE.deQue();

            if (min && this.getMins()>=min) {
                break;
            }
            if (!this.minQue.isFull()) {
                this.minQue.que(ball);
            } else {
                this.resetAllQue(this.minQue);
                if (!this.fminQue.isFull()) {
                    this.fminQue.que(ball);
                } else {
                    this.resetAllQue(this.fminQue);
                    if (!this.hourQue.isFull()) {
                        this.hourQue.que(ball);
                    } else {
                        this.resetAllQue(this.hourQue);
                        this.GLOBAL_QUE.que(ball);
                        this.days++;
                    }
                }
            }
        } while (!this.GLOBAL_QUE.isInitialOrder());
    }

    private getMins() {
        var mins = this.minQue.length() + this.fminQue.length()*5 + this.hourQue.length()*60 + this.days*12*60;
        return mins;
    }

    private resetAllQue(que:ClockQue) {
        while(que.length()>0) {
            this.GLOBAL_QUE.que(que.reverseDeQue());
        }
    }

}