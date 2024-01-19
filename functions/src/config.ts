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

/**
 * This file is so a user can set their desired constants for their account.
 */

// service account credentials
export const serviceAccountEmail =
  'firebase-adminsdk-7e4fh@ghost-city-408703.iam.gserviceaccount.com';
export const serviceAccountPrivateKey = '63cb8b30b95343c1f603c7d90262c63da51360e9';

// app package name
export const packageName = 'com.ghostcity.rgs';

// RTDN pub/sub topic ID
// export const topicID = '<RTDN_TOPIC_ID>';

// needed scopes
export const scopes: string[] = ['https://www.googleapis.com/auth/androidpublisher'];
