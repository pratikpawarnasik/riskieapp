
import { Component, AfterViewChecked } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
// import { constants } from 'os';

declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements AfterViewChecked {
  constructor(private router: Router) {}
  addScript = false;
  paypalLoad = true;

  finalAmount = 1;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AUcKea8ar0135sfDqgi25qV_S2pXZ4bUVuCmbxW5jOkqIVusP5GdHnvdJNnIcxLjUB0pbzv5awsl2624',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'INR' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.router.navigate(['welcome']);
      });
    }
  };

  ngAfterViewChecked(): void {

    if (!this.addScript) {
        this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
          this.paypalLoad = false;
      });
    }

  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

}
