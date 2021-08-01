import { MyGuardGuard } from './my-guard.guard';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

import { LoginComponent } from './main/page/authentifaction/login/login.component';
import { LoginModule } from './main/page/authentifaction/login/login.module';



  
import { AddStoreComponent } from './kama_comp/add-store/add-store.component';
import { AllStoreComponent } from './kama_comp/all-store/all-store.component';
import { DetailStoreComponent } from './kama_comp/detail-store/detail-store.component';
import { ItemStoreComponent } from './kama_comp/item-store/item-store.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbAlertModule, NgbModal, NgbModalConfig, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from './safe.pipe';
import {AdsenseModule} from 'ng2-adsense';

import {DatePipe} from '@angular/common';
import { ChatComponent } from './kama_comp/chat/chat/chat.component';
import {SampleComponent} from './main/sample/sample.component';
import {MDBRootModule} from 'angular-bootstrap-md';
import {
    MatCheckboxModule, MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTabsModule
} from '@angular/material';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {UploadFilmComponent} from './kama_comp/upload-film/upload-film.component';
import {FilmItemComponent} from './kama_comp/film-item/film-item.component';
import {EditFilmComponent} from './kama_comp/edit-film/edit-film.component';
import {AllFilmsComponent} from './kama_comp/all-films/all-films.component';
import {ShowDetailComponent} from './kama_comp/show-detail/show-detail.component';
import { AnalyticsComponent } from './kama_comp/analytics/analytics.component';
import {Chart} from 'chart.js';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { GeneralStructureFilmsComponent } from './kama_comp/general-structure-films/general-structure-films.component';
import { ItemCategoryComponent } from './kama_comp/item-category/item-category.component';
import { AllCategoriesComponent } from './kama_comp/all-categories/all-categories.component';
import { ShowUsersComponent } from './users/show-users/show-users.component';
import { ModifyUserComponent } from './users/modify-user/modify-user.component';

import { ItemCommentComponent } from './kama_comp/item-comment/item-comment.component';
import { AllCommentComponent } from './kama_comp/all-comment/all-comment.component';
import {GooglePayButtonModule} from '@google-pay/button-angular';

import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import { ItemOtherComponent } from './kama_comp/item-other/item-other.component';
import { AllOthersComponent } from './kama_comp/all-others/all-others.component';

import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { CreateSupplierComponent } from './fournisseur/create-supplier/create-supplier.component';
import { ShowSupplierComponent } from './fournisseur/show-supplier/show-supplier.component';
import { ModifySupplierComponent } from './fournisseur/modify-supplier/modify-supplier.component';
import { ProfileComponent } from './profile/profile.component';



// import {MovieComponent} from './kama_comp/movie/movie.component';





const appRoutes: Routes = [
  {
        path        : 'pages',
        loadChildren: './main/page/page.module#PageModule'
    },
   

    {path : '', component : SampleComponent , canActivate : [MyGuardGuard]},
    {path : 'movie', component : UploadFilmComponent , canActivate : [MyGuardGuard]},
    {path: 'films', component: AllFilmsComponent , canActivate : [MyGuardGuard]},
    {path: 'movies', component: GeneralStructureFilmsComponent, canActivate : [MyGuardGuard]},
    {path: 'analytics', component: AnalyticsComponent, canActivate : [MyGuardGuard]},
    {path: 'edit/:id', component: EditFilmComponent, canActivate : [MyGuardGuard]},
    {path: 'films/:id', component: ShowDetailComponent, canActivate : [MyGuardGuard]},
    {path : 'stores', component : AllStoreComponent, canActivate : [MyGuardGuard]},
    {path : 'addSore', component : AddStoreComponent, canActivate : [MyGuardGuard]},
    {path :'addUser' , component : CreateUserComponent, canActivate : [MyGuardGuard]},

    {path :  'getUsers' , component : ShowUsersComponent, canActivate : [MyGuardGuard]},
    {path : 'user/:id' , component : ModifyUserComponent , canActivate : [MyGuardGuard]},
    {path : 'chat', component : ChatComponent, canActivate : [MyGuardGuard]},
    {path: 'editStore/:id', component: DetailStoreComponent, canActivate : [MyGuardGuard]},
    {path :  'profile' ,  component:ProfileComponent, canActivate : [MyGuardGuard]},
    {path : 'editProfile' , component:ShowProfileComponent, canActivate : [MyGuardGuard]},
    {path :  'addsupplier' ,  component:CreateSupplierComponent, canActivate : [MyGuardGuard]},
    {path :  'getsupplier' ,  component:ShowSupplierComponent, canActivate : [MyGuardGuard]},
    {path :  'supplier/:id' ,  component:ModifySupplierComponent, canActivate : [MyGuardGuard]},
    {path : '', redirectTo : '/login', pathMatch: 'full'},
    {
        path      : '**',
        redirectTo: 'pages/login'
    }
];

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyBT3KepJwbwl8dLdt53F8CqDumXlDxB9mk',
        authDomain: 'digixchat-8cd0f.firebaseapp.com',
        databaseURL: 'https://digixchat-8cd0f-default-rtdb.firebaseio.com',
        projectId: 'digixchat-8cd0f',
        storageBucket: 'digixchat-8cd0f.appspot.com',
        messagingSenderId: '79671828610',
        appId: '1:79671828610:web:bea5ad7cdd916ba276149b'
    }
};
@NgModule({
    declarations: [
        AppComponent,
        AddStoreComponent,
        AllStoreComponent,
        DetailStoreComponent,
        ItemStoreComponent,
        SafePipe,
        ChatComponent,
        UploadFilmComponent,
        FilmItemComponent,
        EditFilmComponent,
        AllFilmsComponent,
        ShowDetailComponent,
        AnalyticsComponent,

        GeneralStructureFilmsComponent,
        ItemCategoryComponent,
        AllCategoriesComponent,


    
        CreateUserComponent,
             ShowUsersComponent,
             ModifyUserComponent,
             ItemCommentComponent,
             AllCommentComponent,

             ItemOtherComponent,
             AllOthersComponent,



     
             ShowProfileComponent,
                        FournisseurComponent,
                        CreateSupplierComponent,
                        ShowSupplierComponent,
                        ModifySupplierComponent,
                        ProfileComponent



     //   MovieComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,


        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,


        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        // kamatcho
        AdsenseModule.forRoot({
            adClient: 'pub-1919355092052389',
            adSlot: 6259519706,
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        HttpClientModule,
        NgbPaginationModule,
        NgbAlertModule,
        HttpClientModule,
        MdbCheckboxModule,
        NgxChartsModule,
        AngularFireDatabaseModule,
        GooglePayButtonModule,


        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatSnackBarModule,
        MatSidenavModule,


        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,

        LoginModule,

        MDBRootModule,
        NgbModule,
        MatStepperModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatProgressBarModule,

    ],
    providers: [
        DatePipe,
        AngularFirestore,
        NgbModalConfig,
        NgbModal,
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
