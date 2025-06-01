import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit, OnDestroy, OnChanges {
  product = input<Product>();
  added = output<Product>();

  constructor(destroyRef: DestroyRef) {
    console.log('Product:', this.product());

    destroyRef.onDestroy(() => {
      console.log('built-in Angular service DestroyRef, same as ngOnDestroy');
    });
  }

  ngOnInit(): void {
    console.log('Product:', this.product());
  }

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const product = changes['product'];
    if (!product.isFirstChange()) {
      const oldValue = product.previousValue;
      const newValue = product.currentValue;
      console.log('Old value', oldValue);
      console.log('New value', newValue);
    }
  }

  addToCart() {
    this.added.emit(this.product()!);
  }

  get productTitle() {
    return this.product()!.title;
  }
}
