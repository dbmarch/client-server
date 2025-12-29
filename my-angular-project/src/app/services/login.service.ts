import { DestroyRef, Injectable, inject } from "@angular/core";
import { Login } from "../models/login.model";
import { customError, CustomValidationError, FieldTree } from "@angular/forms/signals";
import { HttpClient } from "@angular/common/http";
import { throwError, map, catchError, Subscription } from "rxjs";
import { Token } from '../models/token.model'

@Injectable({providedIn: 'root'})
export class LoginService {
    private http = inject (HttpClient);
    private destroyRef = inject (DestroyRef);
    private baseUrl='http://localhost:3000/api/auth';

    async login(loginForm: FieldTree<Login>) {
        const res: CustomValidationError[] = [];
        const login = loginForm().value();

        console.log ('login ', login)
        const subscription = this.http.post<Login>(this.baseUrl + '/login', login)
            .pipe((
                map((resData) => (resData as Token).token),
                catchError((error) => {
                    console.log(error);
                    return throwError( () => new Error("unable to log in"));
                })
            ))
            .subscribe({
                next: (token) => {
                    console.log ('next', token);
                    // Save the token.
                },
                error: (error: Error) => {
                    console.error('error', error);
                },
                complete: () => {
                    console.log ('post complete')
                }

            });
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
        return res.length ? res : undefined;
    }


    async register(registerForm: FieldTree<Login>) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const res: CustomValidationError[] = [];

        const register = registerForm().value();

        return res.length ? res : undefined;
    }
}