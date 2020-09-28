import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from '../models/imessage';
import { IParserProfile } from '../models/iparser-profile';


@Injectable({
  providedIn: 'root'
})
export class ParserProfileService {
  result: IMessage;
  url = 'http://localhost:3000/api/csvConfigs'

  constructor(private http: HttpClient) { }

  saveParsingProfile(profile: IParserProfile): Observable<IMessage> {
    return this.http.post<IMessage>(this.url, profile);
  }

  getParsingProfiles(): Observable<IParserProfile[]> {
    //todo: user authentication
    return this.http.get<IParserProfile[]>(this.url + '/mrayson');
  }
}
