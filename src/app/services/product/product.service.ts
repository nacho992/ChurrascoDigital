import { Product } from './../../models/Interface/Product.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  public offsetSubject = new BehaviorSubject<number>(0);
  public productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http:HttpClient)
  { 
    super(http)
  }

  public getAllProducts(): Observable<Product[]>{
    return this.get<Product[]>(`${this._api_url}products`).pipe(
      map(products => {
        // Filtrar los productos que tienen un arreglo de imágenes no vacío
        const result = products.filter(product => product.pictures && product.pictures.length > 0)
        this.productList$.next(result)
        return result;
      }),
    );
  }

  public createProduct(prod: Product): Observable<Product>{
    prod.SKU = '2342232'
    prod.code = 1203
    prod.currency = ".s/"
    return this.post<Product>(`${this._api_url}addproduct`,prod)
  }

  public addProdct(product: Product){
    var list = this.productList$.getValue()
    list.push(product);
    this.productList$.next(list);
  }


}
