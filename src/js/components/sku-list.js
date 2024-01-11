/*
 *  Copyright 2021 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { LitElement, html } from 'lit';
import { BASIC_SUB, PREMIUM_SUB } from '../lib/utils';

/**
 * SkuList holds a list of skus.
 *
 * @class SkuList
 * @extends {LitElement}
 */
class SkuList extends LitElement {
  /**
   * @readonly
   * @static
   */
  static get properties() {
    return {
      skus: { type: Array },
      purchases: { type: Array },
      service: { type: Object }, // Instance of PlayBillingService, see 'src/js/lib/play-billing.js'
      locale: { type: String },
      type: { type: String }, // Either photo, sku, or coin
      addcoins: {type: Function},
    };
  }

  /**
   * Constructor
   */
  constructor() {
    super();
    this.skus = [];
    this.purchases = [];
    this.service = {};
    this.locale = 'en-US';
    this.type = 'sku';
    this.addcoins = () => {
      console.log('nah fungsi nya bisa nih');
    }
  }

  /**
   *
   * @param {PurchaseDetails} basicSubPurchase
   * @param {PurchaseDetails} premiumSubPurchase
   * @param {string} itemId
   * @return {string}
   */
  skuType(basicSubPurchase, premiumSubPurchase, itemId) {
    if (itemId === BASIC_SUB && premiumSubPurchase) {
      return 'downgrade';
    } else if (itemId === PREMIUM_SUB && basicSubPurchase) {
      return 'upgrade';
    } else {
      return this.type;
    }
  }

  /**
   * @return {TemplateResult}
   */
  render() {
    const basicSubPurchase = this.purchases.find((purchase) => purchase.itemId === BASIC_SUB);
    const premiumSubPurchase = this.purchases.find((purchase) => purchase.itemId === PREMIUM_SUB);
    return html`${this.skus.map((sku) => {
      // Find if there's a purchase with the same itemId as the SKU
      const purchase = this.purchases.find((purchase) => purchase.itemId === sku.itemId);
      const skuType = this.skuType(basicSubPurchase, premiumSubPurchase, sku.itemId);

      // price="${this.service.getSkuPrice(sku, this.locale)}"
      return html` <sku-holder
        .type="${skuType}"
        .details=${sku}
        price="${sku.price}"
        .purchase=${purchase
          ? null
          : async function () {
              const e = new CustomEvent('sku-purchase', {
                detail: {
                  sku: sku.sku,
                  valid: true,
                  title: sku.title,
                  coins: sku.coins,
                },
                bubbles: true,
                composed: true,
              });
              this.dispatchEvent(e);
            }.bind(this)}
        .consume=${purchase
          ? async function () {
              await this.service.consume(purchase.purchaseToken);
              const e = new CustomEvent('sku-consume', {
                detail: {
                  purchase,
                },
                bubbles: true,
                composed: true,
              });
              this.dispatchEvent(e);
            }.bind(this)
          : null}
      ></sku-holder>`;
    })}`;
  }
}

customElements.define('sku-list', SkuList);
