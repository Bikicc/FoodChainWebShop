import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/Category';
import { Product } from 'src/app/interfaces/Product';
import { GeneralService } from 'src/app/services/GeneralService';
import { ProductService } from 'src/app/services/ProductService';
import { ToastMessagesComponent } from 'src/app/toast-messages/toast-messages.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;

  productModel: Product = null;
  productInfo: Product = null;

  subscription: Subscription[] = [];

  categories: Category[] = [];
  categoriesDropdown: MenuItem[] = [];

  readonly formData: FormData = new FormData();

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private productService: ProductService,
    private generalService: GeneralService,
    private location: Location
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { categories: Category[], product: Product }) => {
      this.productInfo = Object.assign({}, data.product);
      this.categories = data.categories;
      this.productModel = this.setProductImageToShow(data.product);
      this.productModel.image && this.formData.append("imageFile", this.generalService.convertBase64ToBlob(this.productModel.image as string));

      this.setDropDownCategories(data.categories);
    }, err => {
      console.log(err);
    }));
  }


  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  private setDropDownCategories(categories: Category[]) {
    this.categoriesDropdown = categories.map(cat => {
      return {
        label: this.translate.currentLang === 'hr' ? cat.name_Hr : cat.name_En,
        value: cat.categoryId
      }
    })
  }

  private setProductImageToShow(prod: Product): Product {
    prod.imageToShow = this.generalService.setBase64ImageToShow(prod.image as string);
    return prod;
  }

  public myUploader(event: any) {
    this.formData.delete("imageFile");
    this.formData.append("imageFile", event.files[0]);
  }


  public isFormValid(): boolean {
    return !(
      !this.productModel.name ||
      !this.productModel.price ||
      isNaN(this.productModel.price) ||
      !this.productModel.restaurantId,
      !this.productModel.categoryId
    );
  }

  editProduct() {
    if (this.isFormValid()) {
      for (var key in this.productModel) {
        if (this.productModel[key] !== null) {
          this.formData.append(key, this.productModel[key]);
        }
      }

      this.productService.editProduct(this.formData).subscribe(() => {
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Proizvod uspješno uređen!') : this.toastMessages.saveChangesSuccess('Product has been successfully edited!');
        this.location.back();
      }, err => {
        this.toastMessages.saveChangesFailed(this.translate.instant("DOSLO_DO_POGRESKE"));
      })
    }
  }

}
