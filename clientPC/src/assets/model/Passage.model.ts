import {User} from './User.model';

export class Passage{
  id:string;
  title: string;
  author: string;
  headerImgUrl: string;
  liked: number;
  comments: number;
  content: string;
  viewedTime: number;
  updatedTime: number;
  authorUser: User;

  psgAllArgsCst(id: string, title: string, author: string, headerImgUrl: string, liked: number, comments: number, content: string, viewedTime: number, updatedTime: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.headerImgUrl = headerImgUrl;
    this.liked = liked;
    this.comments = comments;
    this.content = content;
    this.viewedTime = viewedTime;
    this.updatedTime = updatedTime;
  }

  psgNomCst(id: string, title: string, author: string, headerImgUrl: string, content: string){
    this.id = id;
    this.title = title;
    this.author = author;
    this.headerImgUrl = headerImgUrl;
    this.content = content;
  }
}
