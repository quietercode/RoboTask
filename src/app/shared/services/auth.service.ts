import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { UserModel } from '../../interfaces/user-model';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  public async login(emailAddress: string, password: string) : Promise<boolean> {
    const pb = new PocketBase(environment.baseUrl);
    const authData = await pb.collection('users').authWithPassword(emailAddress, password);

    this.userSubject.next( { isValid: pb.authStore.isValid, authModel: pb.authStore.model, token: pb.authStore.token });

    return pb.authStore.isValid;
  }
}
