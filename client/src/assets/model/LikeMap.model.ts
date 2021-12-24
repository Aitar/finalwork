export class LikeMap {
    id: string;
    uid: string;
    pid: string;

    allArgs(id: string, uid: string, pid: string) {
        this.id = id;
        this.uid = uid;
        this.pid = pid;
    }
}
