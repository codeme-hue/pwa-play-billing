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

interface CoinValue {
  [key: string]: number;
}

/**
 * coin_values determines the value of coin skus.  If there were
 * to be a bonus applied to the value, we could change it here.
 * This simulates what a database value may look like.
 */
export const coinValues: CoinValue = {
  product_coins1: 75,
  product_coins2: 225,
  product_coins3: 500,
  product_coins4: 1000,
  product_coins5: 5000,
  product_coins6: 7500,
};

interface InAppCoinCost {
  [key: string]: number;
}

export const IN_APP_COIN_COST: InAppCoinCost = {
  theme_change: 25,
};

export const VALID_THEME_NAMES: string[] = [
  'orange_you_glad_I_didnt_say_banana_orange',
  'one_eyed_one_horned_flyin_purple_people_eater',
  'gross_green',
  'specific_blue',
  'retro_red',
];

export const SKU_BASIC_SUB = 'basic_sub';
export const SKU_PREMIUM_SUB = 'premium_sub';
interface SkuDB {
  sku: string;
  type: string;
}

export const EXAMPLE_SKUS: SkuDB[] = [
  { sku: 'product_coins1', type: 'repeatable' },
  { sku: 'product_coins2', type: 'repeatable' },
  { sku: 'product_coins3', type: 'repeatable' },
  { sku: 'product_coins4', type: 'repeatable' },
  { sku: 'product_coins5', type: 'repeatable' },
  { sku: 'product_coins6', type: 'repeatable' },
  // { sku: 'basic_sub', type: 'subscription' },
];
