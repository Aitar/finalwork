export class MyComment {
    id: string;
    owner: string;
    tarPsg: string;
    content: string;
    time: string;
    followNum: number;
    likeNum: number;
    hotIdx: number;


    allArgs(id: string, owner: string, tarPsg: string, content: string, time: string, followNum: number, likeNum: number, hotIdx: number) {
        this.id = id;
        this.owner = owner;
        this.tarPsg = tarPsg;
        this.content = content;
        this.time = time;
        this.followNum = followNum;
        this.hotIdx = hotIdx;
        this.likeNum = likeNum;
    }
}
