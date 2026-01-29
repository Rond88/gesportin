import { Injectable } from '@angular/core';
import { IEquipo } from '../model/equipo';
import { Observable } from 'rxjs';
import { IPage } from '../model/plist';
import { HttpClient } from '@angular/common/http';
import { serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  constructor(private oHttp: HttpClient) { }

  /**
   * Get a paged list of equipos. If `search` is provided it will be added as a query
   * parameter to let the backend filter results server-side (recommended for global search).
   */
  getPage(page: number, rpp: number, order: string = 'id', direction: string = 'asc', search?: string): Observable<IPage<IEquipo>> {
    let url = serverURL + `/equipo?page=${page}&size=${rpp}&sort=${order},${direction}`;
    if (search != null && String(search).trim() !== '') {
      // assume backend supports a `search` query param that filters across fields
      url += `&search=${encodeURIComponent(String(search).trim())}`;
    }
    return this.oHttp.get<IPage<IEquipo>>(url);
  }
}
