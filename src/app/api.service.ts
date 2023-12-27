import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  

  constructor(private http: HttpClient) { }



  GetTagsOnly(pageNumber:any, count:any, word:any) {
    let params = new HttpParams()
    params = params.append('UserId', 7)
    params = params.append('GroupId',1016 )
    params = params.append('Keyword', word)
    params = params.append('PageNum', 1)
    params = params.append('RecordCount',100)
    return this.http.get("http://122.165.186.71:1220/api/" + 'GetTagsOnly', {params: params})
  }
}
