import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Film} from '../../kamaModel/Film';
import {FilmService} from '../../service/kamatcho/film.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

@Component({
    selector: 'app-show-detail',
    templateUrl: './show-detail.component.html',
    styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {
    filmItem: Film;
    filmsList: Film[];
    data: Film[];
    url: any;
    urlimg: any;
    downUrl: AngularFireStorageReference;
    urlShare = 'test';
    rate = 0;
    sumReview = [];
    paymentRequest: google.payments.api.PaymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
            {
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
                },
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                        gateway: 'example',
                        gatewayMerchantId: 'exampleGatewayMerchantId'
                    }
                }
            }
        ],
        merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Ahmed khalil'
        },
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '0.10',
            currencyCode: 'EUR',
            countryCode: 'TN'
        },
        callbackIntents: ['PAYMENT_AUTHORIZATION']
    };

    constructor(private fs: AngularFirestore, private fst: AngularFireStorage, private route: ActivatedRoute,
                private filmService: FilmService, private sanitizer: DomSanitizer, private router: Router) {
    }

    async ngOnInit() {

        this.filmService.getFilmById(this.route.snapshot.params.id).subscribe(
            data => {
                // console.log('fiiiiii', data);
                this.filmItem = data;
                this.filmMethod(data);
                this.urlMethod(data.url);
                this.urlMethodImg(data.img);
                this.getSumReview(this.filmItem.id);
                // this.getByCategory(this.filmItem.MovieCategories);


                this.urlShare = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.youtube.com%2Fembed%2F'
                    + this.filmService.getVideoId(data.url) + '&amp;src=sdkpreparse';

                this.downUrl = this.fst.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
            }
        );


    }

    onLoadPaymentData = (
        event: Event
    ): void => {
        const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
        console.log('load payment data', eventDetail.detail);
    };

    onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
        paymentData
    ) => {
        console.log('payment authorized', paymentData);
        return {
            transactionState: 'SUCCESS'
        };
    };

    onError = (event: ErrorEvent): void => {
        console.error('error', event.error);
    };


    urlMethod(fromdata: string) {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(fromdata);
    }

    urlMethodImg(fromdata: string): SafeUrl {
        return this.urlimg = this.sanitizer.bypassSecurityTrustUrl(fromdata);
    }

    filmMethod(fromdata: Film) {
        this.filmItem = fromdata;
    }

    getfinalUrl(): string {

        return this.filmService.getVideoId(this.url);
    }

    /*    readUrl(event:any) {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();


                reader.onload = (event: ProgressEvent) => {
                    this.url = (<FileReader>event.target).result;
                }
                console.log('kamatcho', this.url)
                reader.readAsDataURL(event.target.files[0]);
            }
        }*/

    editFilm(film: Film): void {
        this.router.navigate(['/edit', film.id]);
    }

    deleteFilm(film): void {
        const r = confirm('Voulez-vous supprimer ce film ?');
        if (r === true) {
            this.filmService.deleteFilm(this.filmItem.id).subscribe(
                (data) => {
                    console.log('from delete film', data);
                    this.router.navigate(['/films']);
                    window.location.href = 'http://localhost:4200/films';
                }
            );
        }
    }

    addReview(comment) {
        this.filmService.checkReview(1, this.filmItem.id).subscribe(
            (datacheck) => {
                console.log('all', datacheck.length);
                if (datacheck.length > 0) {
                    console.log('exist yesss', datacheck);
                    this.filmService.updateReviw(1, this.filmItem.id, comment, this.rate).subscribe(
                        (dataUpdateReview) => {
                            console.log('updated :)', dataUpdateReview);
                            window.location.href = 'http://localhost:4200/films/' + this.filmItem.id;
                        },
                        (errorUpdateReview) => {
                            console.log('failed :(', errorUpdateReview);
                        }
                    );
                } else {
                    console.log('exist noooo', datacheck);
                    this.filmService.addReview(1, this.filmItem.id, comment, this.rate).subscribe(
                        (data) => {
                            console.log('review', data);
                            window.location.href = 'http://localhost:4200/films/' + this.filmItem.id;
                        },
                        (error) => {
                            console.log('review', error);
                        }
                    );
                }
            },
            (errorcheck) => {
                console.log('error add review', errorcheck);
            }
        );

    }

    getSumReview(movieId): void {
        this.filmService.getSumRate(movieId).subscribe(
            (data) => {
                this.sumReview = data[0];
            },
            (error) => {
                console.log('sum', error);
            }
        );
    }

/*    getByCategory(categoryId) {
        this.filmService.getFilmByCategoryId(categoryId.replace('/api/movie_categories/', '')).subscribe(
            (data) => {
                this.filmsList = data.movies;
                console.log('category', data.movies[0]);
            },
            (error) => {
                console.log('category', error);
            },
        );

    }*/


}
