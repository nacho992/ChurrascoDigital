import { Product } from './../../../models/Interface/Product.interface';
import { AsyncPipe, DOCUMENT, NgFor, NgIf } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { take } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonModule } from 'primeng/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { NewProductComponent } from '../new-product/new-product.component';
import { ViewProductComponent } from '../view-product/view-product.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    ToolbarModule,
    CardComponent,
    ButtonModule,
    InfiniteScrollModule,
    DynamicDialogModule,
    NewProductComponent,
    ViewProductComponent,
    ToastModule
  ],
  providers: [DialogService, MessageService],
})

export class ProductListComponent implements OnInit {
  private document: Document = inject(DOCUMENT);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private offset: number = 0;
  private elementPage: number = 15;
  ref: DynamicDialogRef | undefined;

  public isLastPage = false;
  public showButton = false;
  public productList: WritableSignal<Product[]> = signal<Product[]>([]);
  public MathObject: Math = Math;
  public dialogService = inject(DialogService);

  ngOnInit() {
    this.productService.getAllProducts().pipe(take(1)).subscribe();
    this.offset = this.productService.offsetSubject.value;
    this.getPage();
  }

  private getPage() {
    if (!this.isLastPage) {
      this.productService.productList$.subscribe((list: Product[]) => {
        if (list.length === 0) {
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }
        if (!this.isLastPage) {
          const listActual = this.productList();
          const segmento = list.slice(
            this.offset,
            this.offset + this.elementPage
          );
          this.productList.set([...listActual, ...segmento]);
        }
      });
    }
  }

  public newProduct() {
    this.ref = this.dialogService.open(NewProductComponent, {
      header: 'Nuevo Producto',
      width: '85%',
    });

    this.ref.onClose.subscribe((product: Product) => {
      if (product) {
        this.messageService.add({
          severity: 'info',
          summary: 'Producto agregado',
          detail: product.name,
        });
        this.productService.addProdct(product);
      }
    });
  }

  public viewProduct(data: Product) {
    const ref = this.dialogService.open(ViewProductComponent, {
      header: 'Producto',
      width: '70%',
      data: {
        product: data,
      },
    });
  }

  public search(inputSearch: string) {
    if(inputSearch.length >= 3){
      var list = this.productService.productList$.getValue();
      list = list.filter(p => p.name.toLowerCase().includes(inputSearch.toLowerCase()))
      this.productList.set(list)
    }else{
      this.productList.set([])
      this.getPage()
    }
  }

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    if (
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) > 20
    ) {
      this.showButton = true;
    } else if (
      this.showButton &&
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) < 20
    ) {
      this.showButton = false;
    }
  }

  public onScrollDown() {
    if (!this.isLastPage) {
      this.offset += this.elementPage;
      this.productService.offsetSubject.next(this.offset);
      this.getPage();
    }
  }

  public onScrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
