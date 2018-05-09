import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AppGlobals } from '../../../config-pages/app.global';
import { RouterModule, Routes, Router, RouterLink } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { UserApiService } from '../../../config-pages/user.api.service';
import { BillingProperty } from '../../../config-pages/riskie-all-interface';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from '../../../../../node_modules/ngx-paypal';

declare let paypal: any;
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html'
})
export class PlansComponent implements OnInit  {
  id: number;
  updateResponse: any;
  modalReferenceBillingOrder: NgbModalRef;
  orderSummary: BillingProperty;
  public payPalConfig?: PayPalConfig;
  plan = [
    // {
    //   'planId' : 100,
    //   'planName': 'Try For Free',
    //   'amt' : 0
    // },
    {
      'planId' : 2,
      'planName': 'ESSENTIAL USER',
      'amt' : 1
    },
    {
      'planId' : 3,
      'planName': 'EXPERT USER',
      'amt' : 89
    },
    {
      'planId' : 4,
      'planName': 'ENTERPRISE USER',
      'amt' : 386
    }];
  constructor(private modalService: NgbModal, private router: Router, private _global: AppGlobals, private userSerivce: UserApiService) { }


  ngOnInit(): void {

    if (this._global.g_userId < '0' &&  this._global.g_userId === '') {
      this.router.navigate(['home']);
    }
    this.orderSummary = {planId: 0, month: 1, orderAmt: 0 , planRate: 0, userid: '0', planName: '', amt: 0};
  }


  planPurchase (planId, billingOrder) {
    this.orderSummary.userid = this._global.g_userId;
    this.orderSummary.planId = this.plan[planId].planId;
    this.orderSummary.planRate = this.plan[planId].amt;
    this.orderSummary.planName = this.plan[planId].planName;
    this.orderSummary.month = 1;
    this.orderSummary.orderAmt = this.orderSummary.planRate * this.orderSummary.month;
    this.modalReferenceBillingOrder = this.modalService.open(billingOrder, { centered: true });
    this.initConfig();
  }
  selctMonth (monthValue) {
    this.orderSummary.month = monthValue;
    this.orderSummary.orderAmt = this.orderSummary.month * this.orderSummary.planRate;
  }
  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {

      commit: true,
      client: {
        sandbox: 'AUcKea8ar0135sfDqgi25qV_S2pXZ4bUVuCmbxW5jOkqIVusP5GdHnvdJNnIcxLjUB0pbzv5awsl2624'
      },
      button: {
        label: 'buynow',
        color: 'gold',
        shape: 'rect',
        size: 'medium',
        branding: true
      },
      onPaymentComplete: (data, actions) => {
        this.modalReferenceBillingOrder.close();
        console.log('OnPaymentComplete');
        alert('OnPaymentComplete');
        this.addPaymentDetails(status = '1');
        this.router.navigate(['payment', 'success']);
      },
      onCancel: (data, actions) => {
        this.modalReferenceBillingOrder.close();
        this.addPaymentDetails(status = '2');
        this.router.navigate(['payment', 'cancel']);
      },
      onError: (err) => {
        this.modalReferenceBillingOrder.close();
        console.log('OnError');
        alert('OnError');
        this.addPaymentDetails(status = '3');
        this.router.navigate(['payment', 'error']);
      },
      transactions: [{
        amount: {
          currency: 'INR',
          total: this.orderSummary.orderAmt
        }
      }]
    });
  }
  addPaymentDetails (status) {
     const formData: FormData = new FormData();
     formData.append('planId', this.orderSummary.planId);
     formData.append('planRate', this.orderSummary.planRate);
     formData.append('month', this.orderSummary.month);
     formData.append('orderAmt', this.orderSummary.orderAmt);
     formData.append('userid', this._global.g_userId);
     formData.append('status', status);
     console.log(this.orderSummary);
  this.userSerivce.url_postBillingDetailAPI(formData).
     subscribe(
      resultArray => {this.updateResponse = resultArray;
        if (this.updateResponse.status === 200) {
         // this.router.navigate(['welcome']);
         // window.location.reload();
        } else {
          alert(this.updateResponse.message);
        }
      },
      error => console.log('Error :: ' + error ));
  }

}
