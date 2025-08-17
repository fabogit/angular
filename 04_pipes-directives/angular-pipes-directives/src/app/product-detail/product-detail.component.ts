import { Component, input, output } from '@angular/core';
import { CurrencyPipe, KeyValuePipe, LowerCasePipe } from '@angular/common';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, KeyValuePipe, LowerCasePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product = input<Product>();
  added = output();

  addToCart() {
    this.added.emit();
  }
}
