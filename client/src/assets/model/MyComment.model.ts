export class MyComment{
    cid: string;
    owner: string;
    targetPsg: string;
    content: string;
    time: string;
    followNum: number;
    likedNum: number;
    hotIdx: number;


    constructor(cid: string, owner: string, targetPsg: string, content: string, time: string, followNum: number, likedNum: number,hotIdx: number) {
        this.cid = cid;
        this.owner = owner;
        this.targetPsg = targetPsg;
        this.content = content;
        this.time = time;
        this.followNum = followNum;
        this.hotIdx = hotIdx;
        this.likedNum = likedNum;
    }
}
