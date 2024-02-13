import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private errorUrls: string[] = [];

  addErrorUrl(url: string) {
    this.errorUrls.push(url);
  }

  isImageError(url: string): boolean {
    return this.errorUrls.includes(url);
  }

}
