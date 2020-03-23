import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../service/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLogin: boolean = true;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {

    }

    login() {
        console.log("login!");
    }

    register() {
        console.log("register!");
    }

    submit(form: NgForm) {

        console.log(form.value);
        if (this.isLogin)
            this.login();
        else
            this.register();
    }
}
