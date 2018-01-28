export class ClockQue {
    size: number;
    data: number[];

    constructor(size) {
        this.size = size;
        this.data = [];
    }

    isFull() {
        return this.data.length >= this.size;
    }

    que(data:number) {
        if (!this.isFull()) {
            this.data.push(data);
        } else {
            throw new Error("que full");
        }
    }

    deQue() {
        if (this.data.length===0) {
            throw new Error("que Empty");
        }
        return this.data.shift();
    }

    reverseDeQue() {
        if (this.data.length===0) {
            throw new Error("que Empty");
        }
        return this.data.pop();
    }

    length() {
        return this.data.length;
    }

    isInitialOrder() {
        var initial = true;
        for (var i=0; i<this.size; i++) {
            if (this.data[i] !== (i+1)) {
                initial = false;
                break;
            }
        }
        return initial;
    }
}