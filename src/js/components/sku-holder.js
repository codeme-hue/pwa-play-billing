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

import { LitElement, html, css } from 'lit';

import '@material/mwc-button';

/**
 * SkuHolder holds a sku and purchasing options for that sku. This is a class that was useful when doing generic testing with the app.
 *
 * @class SkuHolder
 * @extends {LitElement}
 */
class SkuHolder extends LitElement {
  static get properties() {
    return {
      details: { type: Object, reflect: true },
      price: { type: String },
      purchase: { type: Function },
      consume: { type: Function },
      type: { type: String },
    };
  }

  constructor() {
    super();
    this.details = {
      itemId: 'testId',
      purchaseType: 'onetime',
      title: 'testTitle',
      price: {
        currency: 'USD',
        value: '0.99000',
      },
      description: 'Worlds best pizza',
    };
    this.price = '$0.99';
    this.purchase = () => {
      console.log('Purchase function not set');
    };

    this.consume = () => {
      console.log('Consume function not set.');
    };
    this.type = 'sku';
  }

  renderStyles() {
    return css`
      #purchase_box__ {
        border: 1px solid #ddd;
        padding: 20px;
        margin: 10px;
        border-radius: 8px;
        transition: box-shadow 0.3s ease-in-out;
        flex-grow: 1;
        color: #ffffff;
      }

      #purchase_box__:hover {
        box-shadow: 0 4px 8px #ffffff;
      }

      h1 {
        font-family: 'Arial', sans-serif;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
      }

      p {
        margin-bottom: 10px;
      }

      .coin-animation {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        animation: floatCoin 2s ease-in-out infinite;
      }

      @keyframes floatCoin {
        0%,
        100% {
          transform: translateY(-50%);
        }
        50% {
          transform: translateY(-70%);
        }
      }

      mwc-button {
        margin-left: 0px;
        background-color: #000000 !important;
        transition: background-color 0.3s ease-in-out;
      }

      mwc-button:hover {
        background-color: #555;
      }
    `;
  }

  hasConsumeBtn(purchaseType) {
    if (purchaseType == 'onetime') {
      return html`<mwc-button
        ?disabled="${this.consume === null}"
        raised
        label="Consume ${this.details.itemId}"
        style="background-color: #4CAF50; color: white;"
        @click="${this.consume}"
      ></mwc-button>`;
    }
    return html``;
  }

  purchaseBtn() {
    let purchaseVerb;
    switch (this.type) {
      case 'upgrade':
        purchaseVerb = 'Upgrade';
        break;
      case 'downgrade':
        purchaseVerb = 'Downgrade';
        break;
      default:
        purchaseVerb = 'Purchase';
    }
    return html`<mwc-button
      ?disabled="${this.purchase === null}"
      raised
      label="${purchaseVerb} for ${this.price}"
      style="background-color: #2196F3; color: white;"
      @click="${this.purchase}"
    ></mwc-button>`;
  }

  render() {
    return html`
      <style>
        ${this.renderStyles()}
      </style>

      <div id="purchase_box__">
        ${this.type === 'coin'
          ? html`<p style="font-weight: bold;">${this.details.title}</p>`
          : html`<h1>${this.details.title}</h1>`}
        <p>${this.details.description}</p>
        ${this.purchaseBtn()} ${this.hasConsumeBtn(this.details.purchaseType)}
      </div>
    `;
  }
}

customElements.define('sku-holder', SkuHolder);
