import { ClockQue } from '../ClockQue/ClockQue';

export class BallClock {

    GLOBAL_QUE: ClockQue;;
    minQue: ClockQue;
    fminQue: ClockQue;
    hourQue: ClockQue;
    days: number;
    balls: number; 
    constructor() {
    }

    init(balls: number) {
        this.days = 0;
        this.minQue = new ClockQue(4);
        this.fminQue = new ClockQue(11);
        this.hourQue = new ClockQue(11);
        this.balls = balls;
        this.fillGlobalQue();
    }

    getDays() {
        return {days: this.days, balls: this.balls};
    }

    getCurrentState() {
        var data = {
            Min: this.minQue.data,
            FiveMin: this.fminQue.data,
            Hour: this.hourQue.data,
            Main: this.GLOBAL_QUE.data
        }
        return data;
    }

    runBall(balls:number, min?:number) {
        if ( 27 > balls || 127 < balls ) {
            throw new Error ('Number of balls should be 27 ~ 127.');
        }
        this.init(balls);

        var ball;
        do {
            if (min && this.getMins()>=min) {
                break;
            }
            ball = this.GLOBAL_QUE.deQue();
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

    private fillGlobalQue() {
        this.GLOBAL_QUE = new ClockQue(this.balls);
        for (var i=1; i<this.balls+1; i++) {
            this.GLOBAL_QUE.que(i);
        }
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