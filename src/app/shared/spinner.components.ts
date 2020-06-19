import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  `,
  styles: [
    `
    .text-primary{
      color: slateblue!important;
    }
    .spinner-border{
      width: 5rem;
      height: 5rem;
      border-width: 0.5rem;
    }
    `
  ]
})
export class SpinnerComponent {

}
