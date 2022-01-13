import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
    description: '',
    imageURL: '',
  };

  edit: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activetedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activetedRoute.snapshot.params;
    if (params) {
      this.productService.getProduct(params.id).subscribe((res) => {
        console.log(res);
        this.product = res;
        this.edit = true;
      });
    }
  }

  submitProduct() {
    this.productService.createProduct(this.product).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      (err) => console.log(err)
    );
  }

  updateProduct() {
    delete this.product.createdAt;
    this.productService.updateProduct(this.product._id, this.product).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      (err) => console.log(err)
    );
  }
}
