import { Component, Input, inject } from '@angular/core';
import { ImageErrorDirective } from '../../directive/imageError.directive';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css'],
  standalone: true,
  imports: [ImageErrorDirective]
})
export class ImagenComponent {

  @Input() imgURL!: string;
  private imageErrorService = inject(ImageService);
  public errorImageUrls: string[] = []


  /**
   *  Maneja los errores por fallo en carga cuando la iamgen
   *  no existe o error similar.
   * */
  public handleImageError(event: any, url: string) {
    this.errorImageUrls.push(url);
    this.imageErrorService.addErrorUrl(url)
  }

  /**
   *  Si el ratio de la imagen es mayor a 1 es valido, caso contrario
   *  se lo considera error
   * */
  public handleImageLoad(event: Event) {
    const imgElement = event.target as HTMLImageElement;
  
    const width = imgElement.naturalWidth;
    const height = imgElement.naturalHeight;
  
    const ratio = width / height;
  
    if (ratio > 1) {
      return;
    } else {
      this.errorImageUrls.push(this.imgURL);
      this.imageErrorService.addErrorUrl(this.imgURL)
    }
  }

}
