import {Component, HostListener, Injectable, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


declare var FB: any;


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})


export class ChatComponent implements OnInit {

    username: string;
    // tslint:disable-next-line:ban-types
    messages: Object = [];
    message = '';
    photoUrl: string;
    validatingForm: FormGroup;
    closeResult = '';
    setHiden = true;
    setHidenModal = false;


    constructor(private http: HttpClient) {
        /*      Observable.interval(10000).subscribe(x => { // will execute every 30 seconds
                  this.getData();
              });*/


        interval(1000).subscribe(x => {
            this.getData();
        });
    }

    /*    userInfo = this.fb.group({
            userName:['',Validators.compose([Validators.required])]
        });*/

    ngOnInit(): void {


        Pusher.logToConsole = true;
        this.validatingForm = new FormGroup({
            modalFormDarkEmail: new FormControl('', Validators.email),
            modalFormDarkPassword: new FormControl('', Validators.required)
        });

        const pusher = new Pusher('392514e5a52428060e75', {
            cluster: 'mt1'
        });

        (window as any).fbAsyncInit = () => {
            FB.init({
                appId: '308403507650130',
                cookie: true,
                xfbml: true,
                version: 'v3.1'
            });


            FB.AppEvents.logPageView();
        };


        // tslint:disable-next-line:only-arrow-functions typedef
        (function(d, s, id) {

            // tslint:disable-next-line:prefer-const one-variable-per-declaration
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        /*        const channel = pusher.subscribe('digix-developers');
                channel.bind('pusher_internal:subscription_succeeded', data => {
                    this.messages.push(data);
                    console.log('testChat', data);
                });

                channel.bind('pusher:subscription_succeeded', (data) => {
                    this.messages.push({username: this.username, message: this.message});
                   // console.log('testChat', data);
                });*/

        setTimeout(() => {
            this.getData();
        }, 1000);

        /*        const objDiv = document.getElementById('parentDiv');
                objDiv.scrollTop = objDiv.scrollHeight;*/

    }

    submit(): void {
        this.http.post('http://localhost:8000/api/messages', {
            username: this.username,
            message: this.message,
            photo: this.photoUrl
        }).subscribe(() => {
            /* this.messages.push({username: this.username, message: this.message});
             console.log('tt ==> ', this.messages);*/
            this.message = '';

        });
    }

    getData(): void {
        this.http.get('http://localhost:8000/api/messages').subscribe((data) => {
            // this.messages.push({username: this.username, message: this.message});
            // console.log('tt ==> ', data[0]);
            this.messages = data;
            this.message = '';
        });
    }

    submitLogin(): void {
        console.log('submit login to facebook');
        // FB.login();
        FB.login((response) => {
            console.log('submitLogin', response);
            if (response.authResponse) {
                console.log('userInfo', response);
                FB.api('/me/photos', (info) => {
                    console.log('result 1 => ', info);
                    this.setHiden = false;
                    this.setHidenModal = true;
                });

                FB.api(
                    '/me',
                    'GET',
                    {fields: 'id,name,picture'},
                    (info2) => {
                        console.log('result 2 => ', info2['name']);
                        console.log('result 3 => ', info2.picture.data.url);
                        console.log('result 3 => ', info2.picture.data.url);
                        this.username = info2.name;
                        this.photoUrl = info2.picture.data.url;

                    }
                );
            } else {
                console.log('userInfo', 'erreur');
            }
        });
    }






}
