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

import { writable } from 'svelte/store';

// User profile information.
export const authenticated = writable(false);
export const profile = writable({});

// SKU information.
export const availableItems = writable([]);

// Purchases and purchase history information.
export const coins = writable({});
export const purchases = writable([]);
export const purchaseHistory = writable([]);
