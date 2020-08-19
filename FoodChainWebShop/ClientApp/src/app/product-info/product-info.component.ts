import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  productId: number = null;
  productName: string = ''

  constructor(private route: ActivatedRoute) { }

  async ngOnInit() {
    let productInfo = await this.getParams();
    this.setProductInfo(productInfo);
  }

  getParams() {
    return new Promise<{}>(resolve => {
      let productInfo = {
        id: null,
        name: null
      };

      productInfo.id = Number(this.route.snapshot.params.productId);
      productInfo.name = this.route.snapshot.params.productName;
      productInfo.name = productInfo.name.split('-').join(' ');
      resolve(productInfo);
    })
  }

  setProductInfo(productInfo: any) {
    this.productId = productInfo.id;
    this.productName = productInfo.name
  }
}


