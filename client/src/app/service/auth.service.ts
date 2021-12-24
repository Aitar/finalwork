import {Injectable} from '@angular/core';
import {User} from '../../assets/model/User.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {serverUrl} from '../../assets/config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUrl: string = serverUrl + '/user/auth';
    curUser: User;
    userIsAuth: boolean = false;

    constructor(private http: HttpClient,
                private router: Router) {}


    varify(email: string, password: string, time: string){
       return this.http.post<{massage: string}>(this.authUrl, {email, password, time});
    }


    logout(){
        this.userIsAuth = false;
        this.curUser = null;
        this.router.navigate(['/', 'auth']);
    }
}
