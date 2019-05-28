/**
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

import prefetch from './prefetch.mjs';
import requestIdleCallback from './request-idle-callback.mjs';


/**
 * Prefetch an array of URLs if the user's effective
 * connection type and data-saver preferences suggests
 * it would be useful. By default, looks at in-viewport
 * links for `document`. Can also work off a supplied
 * DOM element or static array of URLs.
 * @param {Object} options - Configuration options for quicklink
 * @param {Array} options.urls - Array of URLs to prefetch (override)
 * @param {Boolean} options.priority - Attempt higher priority fetch (low or high)
 * @param {Number} options.timeout - Timeout after which prefetching will occur
 * @param {Function} options.timeoutFn - Custom timeout function
 */
export default function (options) {
  if (!options) options = {};

  const timeout = options.timeout || 2e3; // 2s 
  // 多久后开始加载资源 在支持`requestIdleCallback`的环境使用requestIdleCallback，否则使用setTimeout
  const timeoutFn = options.timeoutFn || requestIdleCallback;

  timeoutFn(() => {
    options.urls.forEach(url => prefetch(new URL(url, location.href).toString(),  options.priority || false));
  }, {timeout});
}
