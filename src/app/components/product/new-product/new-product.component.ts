import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { responsiveOptions } from '../../../Config/conifg.global';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationHelper } from '../../../helpers/NotificationHelper';
import { zeroOrMoreValidator } from '../../../shared/validators/CustomValidators';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    GalleriaModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DialogModule
  ],
  standalone: true,
  providers: [DialogService]
})

export class NewProductComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  public ref = inject(DynamicDialogRef)

  public noImage: string[] = ['https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=996']
  public form!: FormGroup;
  public showInputUrl: boolean = false;
  public responsiveOptions = responsiveOptions;
  public activeIndex: number = 0;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      price: ['', [Validators.required, zeroOrMoreValidator()]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      name: ['', [Validators.required, Validators.minLength(8)]],
      pictures: [[], [Validators.required]],
    });
  }

  public addImage(){
    this.showInputUrl = true;
  }

  public onCreateProduct() {
    if(this.form.invalid) NotificationHelper.showErrorMessage('Algunos datos son inválidos');
    if (this.form.valid) this.productService.createProduct(this.form.value).subscribe(res => {
      this.ref.close(res)
    })
  }

  public saveImage(event: string){
    var imagenes = this.form.get('pictures')?.value
    imagenes.push(event)
    this.form.get('pictures')?.setValue(imagenes);
    this.showInputUrl = false;
  }

  public onDelete(){
    var imagenes = this.form.get('pictures')?.value as string[];
    console.log('antes', imagenes);

    // Usar splice() para eliminar el elemento en la posición this.activeIndex
    imagenes.splice(this.activeIndex, 1);
    
    console.log('después', imagenes);

    // Establecer el valor actualizado en el formulario
    this.form.get('pictures')?.setValue(imagenes);
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
