import { Directive, Input, HostBinding, ElementRef } from '@angular/core'
import { fromEvent, take, tap } from 'rxjs';
import { ImageService } from '../../services/image.service';

@Directive({
  selector: '[appImageError]',
  standalone: true
})

export class ImageErrorDirective {
  @Input('appImageError') errorUrls: string[] = [];
  @Input('imgUrl') imgUrl!: string;

  constructor(private el: ElementRef, private imageErrorService: ImageService) {}

  @HostBinding('hidden')
  get isImageError(): boolean {
    fromEvent(this.el.nativeElement, 'error')
      .pipe(
        take(1),
        tap(() => this.imageErrorService.addErrorUrl(this.imgUrl))
      )
      .subscribe();
    return this.errorUrls.includes(this.imgUrl);
  }
}