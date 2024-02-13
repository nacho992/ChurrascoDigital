import { Component, Input, OnInit, inject } from '@angular/core';
import { Product } from '../../../models/Interface/Product.interface';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {GalleriaModule} from 'primeng/galleria';
import { responsiveOptions } from '../../../Config/conifg.global';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  imports: [GalleriaModule],
  standalone: true
})
export class ViewProductComponent implements OnInit {

  public ref = inject(DynamicDialogRef)
  public config = inject(DynamicDialogConfig)
  public product!: Product;

  public responsiveOptions = responsiveOptions;

  ngOnInit() {
    this.product = this.config.data.product;
  }

}
