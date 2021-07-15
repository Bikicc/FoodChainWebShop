import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/Product';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.scss']
})
export class NewComponentComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    console.log(decodedJWT)
  }

  playVideo() {
    const video = document.getElementById("myVideo");
  }

  myUploader(event: any) {
    var product: Product = {
      productId: 200,
      name: 'test',
      price: 3000,
      description_En: 'dobar je ki kruva',
      description_Hr: 'ki kruv',
      calories: 300,
      proteins: 120,
      carbs: 560,
      sugar: 30,
      fat: 12,
      categoryId: 1,
      quantity: 1,
      restaurantId: 1
    } as Product;

    const formData = new FormData();
    for (var key in product) {
      formData.append(key, product[key]);
    }
    formData.append("imageFile", event.files[0])
    
    this.productService.postProduct(formData).subscribe(() => {
      console.log("ima srice");
    }, err => console.log(err))

    // new Response(event.files[0])
    //   .arrayBuffer()
    //   .then((buffer) => {
    //     console.log(buffer)
    //     product.image = new Int32Array(buffer);
    //     this.productService.postProduct(product).subscribe(() => {
    //       console.log("ima srice");
    //     }, err => console.log(err))
    //   }
    //   )

    // let reader = new FileReader();

    // reader.onloadend = () => {
    //   // base64 example
    //   var b64 = (reader.result as string).replace(/^data:.+;base64,/, '');
    //   // product.image = b64;

    //   //arrayBuffer example 

    //   this.productService.postProduct(product).subscribe(() => {
    //     console.log("ima srice");
    //   }, err => console.log(err));
    // };

    // reader.readAsDataURL(event.files[0]);
  }

}
