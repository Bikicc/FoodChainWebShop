import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/Category';
import { Product } from 'src/app/interfaces/Product';
import { Restaurant } from 'src/app/interfaces/Restaurant';
import { ProductService } from 'src/app/services/ProductService';
import { ToastMessagesComponent } from 'src/app/toast-messages/toast-messages.component';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;
  @ViewChild('name', { static: false })
  formName: NgModel;
  @ViewChild('price', { static: false })
  formPrice: NgModel;
  @ViewChild('fileUploader', { static: false })
  fileUploader: any;

  productModel: Product = null;

  subscription: Subscription[] = [];

  categories: Category[] = [];
  categoriesDropdown: MenuItem[] = [];

  restaurantInfo: Restaurant = null;
  readonly formData: FormData = new FormData();

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { categories: Category[], restaurantInfo: any }) => {
      this.restaurantInfo = data.restaurantInfo.result;
      this.categories = data.categories;

      this.setProductModelDefault();
      this.setDropDownCategories(data.categories);
    }, err => {
      console.log(err);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  private setProductModelDefault() {
    this.productModel = {
      productId: null,
      name: null,
      price: null,
      description_En: null,
      description_Hr: null,
      calories: null,
      proteins: null,
      carbs: null,
      sugar: null,
      fat: null,
      categoryId: this.categories[0].categoryId,
      restaurantId: this.restaurantInfo.restaurantId,
    };
  }

  private setDropDownCategories(categories: Category[]) {
    this.categoriesDropdown = categories.map(cat => {
      return {
        label: this.translate.currentLang === 'hr' ? cat.name_Hr : cat.name_En,
        value: cat.categoryId
      }
    })
  }

  public myUploader(event: any) {
    this.formData.delete("imageFile");
    this.formData.append("imageFile", event.files[0]);
  }

  public insertProduct() {
    if (this.isFormValid()) {
      for (var key in this.productModel) {
        if (this.productModel[key] !== null) {
          this.formData.append(key, this.productModel[key]);
        }
      }

      this.productService.postProduct(this.formData).subscribe(() => {
        this.setProductModelDefault();
        this.resetFormFields();
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Produkt uspješno dodan!') : this.toastMessages.saveChangesSuccess('Product has been successfully added!');
      }, err => {
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Molimo pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
      })
    }
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

  private resetFormFields() {
    this.formName.reset();
    this.formPrice.reset();
    this.fileUploader.clear();
  }

}
