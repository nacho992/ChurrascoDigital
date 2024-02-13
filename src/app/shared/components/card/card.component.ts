import { Component, Input, OnInit, inject } from '@angular/core';
import { Product } from '../../../models/Interface/Product.interface';
import { ImagenComponent } from '../imagen/imagen.component';
import { NgIf } from '@angular/common';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [ImagenComponent,NgIf]
})
export class CardComponent {

  @Input() product!: Product;
  private imageErrorService = inject(ImageService);

  isImageError(imgUrl: string): boolean {
    return this.imageErrorService.isImageError(imgUrl);
  }
}
