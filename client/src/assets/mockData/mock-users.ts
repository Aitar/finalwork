import {User} from '../model/User.model';

export const mockUsers: User[] = [
    new User(
        'user1',
        'Doge',
        'test1@test.com',
        '123456',
        '男',
        '爱我所爱，行我所行',
        'assets/img/avatar.png',
    ),
    new User(
        'user2',
        '我不是小松菜奈',
        'test2@test.com',
        '123456',
        '女',
        '不会娱乐是蠢才',
        'assets/img/avatar3.jpg',
    ),
    new User(
        'user3',
        '之',
        'test3@test.com',
        '123456',
        '男',
        'Winter is coming',
        'assets/img/avatar2.jpg',
    ),
    new User(
        'user4',
        '友人',
        'test4@test.com',
        '123456',
        '保密',
        '八月初九',
        'assets/img/avatar4.jpg',
    ),
    new User(
        'user5',
        '小熊软糖',
        'test5@test.com',
        '123456',
        '女',
        '八月初九',
        'assets/img/avatar5.jpg',
    ),

];
