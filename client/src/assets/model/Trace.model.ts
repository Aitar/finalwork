export class Trace{
    private id: string;
    private userId: string;
    private psgId: string;
    private time: string;


    allArgs(id: string, userId: string, psgId: string, time: string) {
        this.id = id;
        this.userId = userId;
        this.psgId = psgId;
        this.time = time;
    }
}
