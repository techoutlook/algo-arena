import{c as H,y as gt,z as Y,_ as bt,A as xt,B as yt,C as _t,D as wt,E as Nt,G as kt,H as Ae,S as vt,t as Rt,u as Tt,r as p,m as jt,j as i,X as Et,U as Ct,M as At,d as B,a as F,I as Oe,J as Ot,q as Pe,K as Ue,L as Pt,N as Ut,O as ue,Q as St}from"./index-_y5Inmo1.js";import{C as It}from"./circle-check-big-BeneLFLg.js";import{M as Se}from"./mail-bpSQi1gT.js";/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Ie=H("CircleAlert",Dt);/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],Mt=H("Clock",Lt);/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Ft=H("RefreshCw",Bt);/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],$t=H("Shield",Vt);/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],Ht=H("Trash2",zt);/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]],Wt=H("Upload",qt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e="firebasestorage.googleapis.com",ze="storageBucket",Gt=2*60*1e3,Xt=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g extends wt{constructor(t,n,s=0){super(de(t),`Firebase Storage: ${n} (${de(t)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,g.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return de(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var m;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(m||(m={}));function de(e){return"storage/"+e}function pe(){const e="An unknown error occurred, please check the error payload for server response.";return new g(m.UNKNOWN,e)}function Kt(e){return new g(m.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function Zt(e){return new g(m.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Jt(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new g(m.UNAUTHENTICATED,e)}function Yt(){return new g(m.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Qt(e){return new g(m.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function en(){return new g(m.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function tn(){return new g(m.CANCELED,"User canceled the upload/download.")}function nn(e){return new g(m.INVALID_URL,"Invalid URL '"+e+"'.")}function sn(e){return new g(m.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function rn(){return new g(m.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+ze+"' property when initializing the app?")}function on(){return new g(m.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function an(){return new g(m.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function ln(e){return new g(m.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function fe(e){return new g(m.INVALID_ARGUMENT,e)}function He(){return new g(m.APP_DELETED,"The Firebase app was deleted.")}function cn(e){return new g(m.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function J(e,t){return new g(m.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function Z(e){throw new g(m.INTERNAL_ERROR,"Internal error: "+e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let s;try{s=j.makeFromUrl(t,n)}catch{return new j(t,"")}if(s.path==="")return s;throw sn(t)}static makeFromUrl(t,n){let s=null;const r="([A-Za-z0-9.\\-_]+)";function a(y){y.path.charAt(y.path.length-1)==="/"&&(y.path_=y.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+r+o,"i"),u={bucket:1,path:3};function d(y){y.path_=decodeURIComponent(y.path)}const f="v[A-Za-z0-9_]+",x=n.replace(/[.]/g,"\\."),w="(/([^?#]*).*)?$",k=new RegExp(`^https?://${x}/${f}/b/${r}/o${w}`,"i"),E={bucket:1,path:3},A=n===$e?"(?:storage.googleapis.com|storage.cloud.google.com)":n,b="([^?#]*)",O=new RegExp(`^https?://${A}/${r}/${b}`,"i"),v=[{regex:c,indices:u,postModify:a},{regex:k,indices:E,postModify:d},{regex:O,indices:{bucket:1,path:2},postModify:d}];for(let y=0;y<v.length;y++){const P=v[y],I=P.regex.exec(t);if(I){const q=I[P.indices.bucket];let z=I[P.indices.path];z||(z=""),s=new j(q,z),P.postModify(s);break}}if(s==null)throw nn(t);return s}}class un{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(e,t,n){let s=1,r=null,a=null,o=!1,c=0;function u(){return c===2}let d=!1;function f(...b){d||(d=!0,t.apply(null,b))}function x(b){r=setTimeout(()=>{r=null,e(k,u())},b)}function w(){a&&clearTimeout(a)}function k(b,...O){if(d){w();return}if(b){w(),f.call(null,b,...O);return}if(u()||o){w(),f.call(null,b,...O);return}s<64&&(s*=2);let v;c===1?(c=2,v=0):v=(s+Math.random())*1e3,x(v)}let E=!1;function A(b){E||(E=!0,w(),!d&&(r!==null?(b||(c=2),clearTimeout(r),x(0)):b||(c=1)))}return x(0),a=setTimeout(()=>{o=!0,A(!0)},n),A}function hn(e){e(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(e){return e!==void 0}function pn(e){return typeof e=="object"&&!Array.isArray(e)}function me(e){return typeof e=="string"||e instanceof String}function De(e){return ge()&&e instanceof Blob}function ge(){return typeof Blob<"u"}function Le(e,t,n,s){if(s<t)throw fe(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw fe(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(e,t,n){let s=t;return n==null&&(s=`https://${t}`),`${n}://${s}/v0${e}`}function qe(e){const t=encodeURIComponent;let n="?";for(const s in e)if(e.hasOwnProperty(s)){const r=t(s)+"="+t(e[s]);n=n+r+"&"}return n=n.slice(0,-1),n}var V;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(V||(V={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mn(e,t){const n=e>=500&&e<600,r=[408,429].indexOf(e)!==-1,a=t.indexOf(e)!==-1;return n||r||a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(t,n,s,r,a,o,c,u,d,f,x,w=!0){this.url_=t,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=a,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=x,this.retry=w,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((k,E)=>{this.resolve_=k,this.reject_=E,this.start_()})}start_(){const t=(s,r)=>{if(r){s(!1,new re(!1,null,!0));return}const a=this.connectionFactory_();this.pendingConnection_=a;const o=c=>{const u=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&a.addUploadProgressListener(o),a.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&a.removeUploadProgressListener(o),this.pendingConnection_=null;const c=a.getErrorCode()===V.NO_ERROR,u=a.getStatus();if(!c||mn(u,this.additionalRetryCodes_)&&this.retry){const f=a.getErrorCode()===V.ABORT;s(!1,new re(!1,null,f));return}const d=this.successCodes_.indexOf(u)!==-1;s(!0,new re(d,a))})},n=(s,r)=>{const a=this.resolve_,o=this.reject_,c=r.connection;if(r.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());fn(u)?a(u):a()}catch(u){o(u)}else if(c!==null){const u=pe();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(r.canceled){const u=this.appDelete_?He():tn();o(u)}else{const u=en();o(u)}};this.canceled_?n(!1,new re(!1,null,!0)):this.backoffId_=dn(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&hn(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class re{constructor(t,n,s){this.wasSuccessCode=t,this.connection=n,this.canceled=!!s}}function bn(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function xn(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function yn(e,t){t&&(e["X-Firebase-GMPID"]=t)}function _n(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function wn(e,t,n,s,r,a,o=!0){const c=qe(e.urlParams),u=e.url+c,d=Object.assign({},e.headers);return yn(d,t),bn(d,n),xn(d,a),_n(d,s),new gn(u,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nn(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function kn(...e){const t=Nn();if(t!==void 0){const n=new t;for(let s=0;s<e.length;s++)n.append(e[s]);return n.getBlob()}else{if(ge())return new Blob(e);throw new g(m.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function vn(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(e){if(typeof atob>"u")throw ln("base-64");return atob(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class he{constructor(t,n){this.data=t,this.contentType=n||null}}function Tn(e,t){switch(e){case S.RAW:return new he(We(t));case S.BASE64:case S.BASE64URL:return new he(Ge(e,t));case S.DATA_URL:return new he(En(t),Cn(t))}throw pe()}function We(e){const t=[];for(let n=0;n<e.length;n++){let s=e.charCodeAt(n);if(s<=127)t.push(s);else if(s<=2047)t.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const a=s,o=e.charCodeAt(++n);s=65536|(a&1023)<<10|o&1023,t.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?t.push(239,191,189):t.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(t)}function jn(e){let t;try{t=decodeURIComponent(e)}catch{throw J(S.DATA_URL,"Malformed data URL.")}return We(t)}function Ge(e,t){switch(e){case S.BASE64:{const r=t.indexOf("-")!==-1,a=t.indexOf("_")!==-1;if(r||a)throw J(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case S.BASE64URL:{const r=t.indexOf("+")!==-1,a=t.indexOf("/")!==-1;if(r||a)throw J(e,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Rn(t)}catch(r){throw r.message.includes("polyfill")?r:J(e,"Invalid character found")}const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}class Xe{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw J(S.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=n[1]||null;s!=null&&(this.base64=An(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=t.substring(t.indexOf(",")+1)}}function En(e){const t=new Xe(e);return t.base64?Ge(S.BASE64,t.rest):jn(t.rest)}function Cn(e){return new Xe(e).contentType}function An(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(t,n){let s=0,r="";De(t)?(this.data_=t,s=t.size,r=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),s=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),s=t.length),this.size_=s,this.type_=r}size(){return this.size_}type(){return this.type_}slice(t,n){if(De(this.data_)){const s=this.data_,r=vn(s,t,n);return r===null?null:new L(r)}else{const s=new Uint8Array(this.data_.buffer,t,n-t);return new L(s,!0)}}static getBlob(...t){if(ge()){const n=t.map(s=>s instanceof L?s.data_:s);return new L(kn.apply(null,n))}else{const n=t.map(o=>me(o)?Tn(S.RAW,o).data:o.data_);let s=0;n.forEach(o=>{s+=o.byteLength});const r=new Uint8Array(s);let a=0;return n.forEach(o=>{for(let c=0;c<o.length;c++)r[a++]=o[c]}),new L(r,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(e){let t;try{t=JSON.parse(e)}catch{return null}return pn(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function Pn(e,t){const n=t.split("/").filter(s=>s.length>0).join("/");return e.length===0?n:e+"/"+n}function Ze(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(e,t){return t}class N{constructor(t,n,s,r){this.server=t,this.local=n||t,this.writable=!!s,this.xform=r||Un}}let ie=null;function Sn(e){return!me(e)||e.length<2?e:Ze(e)}function Je(){if(ie)return ie;const e=[];e.push(new N("bucket")),e.push(new N("generation")),e.push(new N("metageneration")),e.push(new N("name","fullPath",!0));function t(a,o){return Sn(o)}const n=new N("name");n.xform=t,e.push(n);function s(a,o){return o!==void 0?Number(o):o}const r=new N("size");return r.xform=s,e.push(r),e.push(new N("timeCreated")),e.push(new N("updated")),e.push(new N("md5Hash",null,!0)),e.push(new N("cacheControl",null,!0)),e.push(new N("contentDisposition",null,!0)),e.push(new N("contentEncoding",null,!0)),e.push(new N("contentLanguage",null,!0)),e.push(new N("contentType",null,!0)),e.push(new N("metadata","customMetadata",!0)),ie=e,ie}function In(e,t){function n(){const s=e.bucket,r=e.fullPath,a=new j(s,r);return t._makeStorageReference(a)}Object.defineProperty(e,"ref",{get:n})}function Dn(e,t,n){const s={};s.type="file";const r=n.length;for(let a=0;a<r;a++){const o=n[a];s[o.local]=o.xform(s,t[o.server])}return In(s,e),s}function Ye(e,t,n){const s=Ke(t);return s===null?null:Dn(e,s,n)}function Ln(e,t,n,s){const r=Ke(t);if(r===null||!me(r.downloadTokens))return null;const a=r.downloadTokens;if(a.length===0)return null;const o=encodeURIComponent;return a.split(",").map(d=>{const f=e.bucket,x=e.fullPath,w="/b/"+o(f)+"/o/"+o(x),k=oe(w,n,s),E=qe({alt:"media",token:d});return k+E})[0]}function Mn(e,t){const n={},s=t.length;for(let r=0;r<s;r++){const a=t[r];a.writable&&(n[a.server]=e[a.local])}return JSON.stringify(n)}class be{constructor(t,n,s,r){this.url=t,this.method=n,this.handler=s,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(e){if(!e)throw pe()}function Bn(e,t){function n(s,r){const a=Ye(e,r,t);return Qe(a!==null),a}return n}function Fn(e,t){function n(s,r){const a=Ye(e,r,t);return Qe(a!==null),Ln(a,r,e.host,e._protocol)}return n}function et(e){function t(n,s){let r;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?r=Yt():r=Jt():n.getStatus()===402?r=Zt(e.bucket):n.getStatus()===403?r=Qt(e.path):r=s,r.status=n.getStatus(),r.serverResponse=s.serverResponse,r}return t}function tt(e){const t=et(e);function n(s,r){let a=t(s,r);return s.getStatus()===404&&(a=Kt(e.path)),a.serverResponse=r.serverResponse,a}return n}function Vn(e,t,n){const s=t.fullServerUrl(),r=oe(s,e.host,e._protocol),a="GET",o=e.maxOperationRetryTime,c=new be(r,a,Fn(e,n),o);return c.errorHandler=tt(t),c}function $n(e,t){const n=t.fullServerUrl(),s=oe(n,e.host,e._protocol),r="DELETE",a=e.maxOperationRetryTime;function o(u,d){}const c=new be(s,r,o,a);return c.successCodes=[200,204],c.errorHandler=tt(t),c}function zn(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function Hn(e,t,n){const s=Object.assign({},n);return s.fullPath=e.path,s.size=t.size(),s.contentType||(s.contentType=zn(null,t)),s}function qn(e,t,n,s,r){const a=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let v="";for(let y=0;y<2;y++)v=v+Math.random().toString().slice(2);return v}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const d=Hn(t,s,r),f=Mn(d,n),x="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+d.contentType+`\r
\r
`,w=`\r
--`+u+"--",k=L.getBlob(x,s,w);if(k===null)throw on();const E={name:d.fullPath},A=oe(a,e.host,e._protocol),b="POST",O=e.maxUploadRetryTime,C=new be(A,b,Bn(e,n),O);return C.urlParams=E,C.headers=o,C.body=k.uploadData(),C.errorHandler=et(t),C}class Wn{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=V.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=V.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=V.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,s,r){if(this.sent_)throw Z("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,t,!0),r!==void 0)for(const a in r)r.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,r[a].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Z("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Z("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Z("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Z("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class Gn extends Wn{initXhr(){this.xhr_.responseType="text"}}function xe(){return new Gn}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(t,n){this._service=t,n instanceof j?this._location=n:this._location=j.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new $(t,n)}get root(){const t=new j(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Ze(this._location.path)}get storage(){return this._service}get parent(){const t=On(this._location.path);if(t===null)return null;const n=new j(this._location.bucket,t);return new $(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw cn(t)}}function Xn(e,t,n){e._throwIfRoot("uploadBytes");const s=qn(e.storage,e._location,Je(),new L(t,!0),n);return e.storage.makeRequestWithTokens(s,xe).then(r=>({metadata:r,ref:e}))}function Kn(e){e._throwIfRoot("getDownloadURL");const t=Vn(e.storage,e._location,Je());return e.storage.makeRequestWithTokens(t,xe).then(n=>{if(n===null)throw an();return n})}function Zn(e){e._throwIfRoot("deleteObject");const t=$n(e.storage,e._location);return e.storage.makeRequestWithTokens(t,xe)}function Jn(e,t){const n=Pn(e._location.path,t),s=new j(e._location.bucket,n);return new $(e.storage,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yn(e){return/^[A-Za-z]+:\/\//.test(e)}function Qn(e,t){return new $(e,t)}function nt(e,t){if(e instanceof ye){const n=e;if(n._bucket==null)throw rn();const s=new $(n,n._bucket);return t!=null?nt(s,t):s}else return t!==void 0?Jn(e,t):e}function es(e,t){if(t&&Yn(t)){if(e instanceof ye)return Qn(e,t);throw fe("To use ref(service, url), the first argument must be a Storage instance.")}else return nt(e,t)}function Me(e,t){const n=t==null?void 0:t[ze];return n==null?null:j.makeFromBucketSpec(n,e)}function ts(e,t,n,s={}){e.host=`${t}:${n}`,e._protocol="http";const{mockUserToken:r}=s;r&&(e._overrideAuthToken=typeof r=="string"?r:yt(r,e.app.options.projectId))}class ye{constructor(t,n,s,r,a){this.app=t,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=a,this._bucket=null,this._host=$e,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Gt,this._maxUploadRetryTime=Xt,this._requests=new Set,r!=null?this._bucket=j.makeFromBucketSpec(r,this._host):this._bucket=Me(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=j.makeFromBucketSpec(this._url,t):this._bucket=Me(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Le("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Le("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(_t(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new $(this,t)}_makeRequest(t,n,s,r,a=!0){if(this._deleted)return new un(He());{const o=wn(t,this._appId,s,r,n,this._firebaseVersion,a);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(t,n){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,s,r).getPromise()}}const Be="@firebase/storage",Fe="0.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st="storage";function ns(e,t,n){return e=Y(e),Xn(e,t,n)}function ss(e){return e=Y(e),Kn(e)}function rs(e){return e=Y(e),Zn(e)}function Ve(e,t){return e=Y(e),es(e,t)}function is(e=gt(),t){e=Y(e);const s=bt(e,st).getImmediate({identifier:t}),r=xt("storage");return r&&os(s,...r),s}function os(e,t,n,s={}){ts(e,t,n,s)}function as(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return new ye(n,s,r,t,vt)}function ls(){Nt(new kt(st,as,"PUBLIC").setMultipleInstances(!0)),Ae(Be,Fe,""),Ae(Be,Fe,"esm2017")}ls();function hs(){const e=Rt(),t=is(),n=Tt(),s=p.useRef(null),[r,a]=p.useState(null),[o,c]=p.useState({displayName:"",email:"",bio:"",location:"",profession:"",githubLink:""}),[u,d]=p.useState(!0),[f,x]=p.useState(!1),[w,k]=p.useState(""),[E,A]=p.useState(!1),[b,O]=p.useState({show:!1,message:"",type:""}),[C,v]=p.useState(!1),[y,P]=p.useState(!1),[I,q]=p.useState(""),[z,M]=p.useState(""),[_e,Q]=p.useState(!1),[W,ee]=p.useState(!1),[rt,te]=p.useState(!1),[ae,we]=p.useState(!1),[G,ne]=p.useState(!1),[Ne,U]=p.useState(""),[X,ke]=p.useState(""),[le,it]=p.useState(null),[ve,ot]=p.useState(0),[at,ce]=p.useState(!1),se=p.useRef(null);p.useEffect(()=>{const l=jt(e,async h=>{if(h){a(h),k(h.photoURL||"");try{const _=B(F,"users",h.uid),D=await Oe(_);if(D.exists()){const T=D.data();c({displayName:h.displayName||"",email:h.email||"",bio:T.bio||"",location:T.location||"",profession:T.profession||"",githubLink:T.githubLink||""})}else await Ot(_,{displayName:h.displayName||"",email:h.email||"",bio:"",location:"",profession:"",githubLink:""}),c({displayName:h.displayName||"",email:h.email||"",bio:"",location:"",profession:"",githubLink:""})}catch(_){console.error("Error fetching user data:",_),R("Error loading profile data","error")}}else n("/auth");d(!1)});return()=>l()},[e,n]);const lt=async()=>{try{await r.reload();const l=e.currentUser;return a(l),l.emailVerified}catch(l){return console.error("Error reloading user:",l),R("Error checking verification status","error"),!1}};p.useEffect(()=>{if(le&&ae){const l=()=>{const h=new Date().getTime(),_=Math.max(0,Math.floor((le-h)/1e3));ot(_),ce(_>0),_<=0&&(clearInterval(se.current),ce(!1))};return l(),se.current=setInterval(l,1e3),()=>{se.current&&clearInterval(se.current)}}},[le,ae]),p.useEffect(()=>{C&&v(!1)},[f,C]);const R=(l,h)=>{O({show:!0,message:l,type:h}),setTimeout(()=>O({show:!1,message:"",type:""}),5e3)},Re=()=>{Pt(e).then(()=>{n("/auth")}).catch(l=>{console.error("Error signing out:",l),R("Error signing out","error")})},ct=l=>{const h=l.target.files[0];if(!h)return;if(!["image/jpeg","image/png","image/gif"].includes(h.type)){R("Only JPEG, PNG, and GIF images are allowed","error");return}if(h.size>2*1024*1024){R("Image size should be less than 2MB","error");return}A(!0);const D=Ve(t,`profile_photos/${r.uid}`);ns(D,h).then(T=>ss(T.ref)).then(T=>(k(T),Pe(r,{photoURL:T}))).then(()=>{R("Profile photo updated successfully","success"),A(!1)}).catch(T=>{console.error("Error uploading photo:",T),A(!1),R("Error uploading photo","error")})},K=l=>{const{name:h,value:_}=l.target;c({...o,[h]:_})},Te=()=>{if(f){ut();return}r.emailVerified?x(!0):(q("edit"),P(!0),M(""),Q(!1))},ut=()=>{c({displayName:r.displayName||"",email:r.email||"",bio:o.bio||"",location:o.location||"",profession:o.profession||"",githubLink:o.githubLink||""}),x(!1)},dt=()=>{r.emailVerified?(te(!0),U(""),we(!1),ke("")):(q("delete"),P(!0),M(""),Q(!1))},je=async()=>{try{ne(!0),U("");const l=Math.floor(1e5+Math.random()*9e5).toString();console.log("Generated OTP (for demo):",l);const h=new Date().getTime()+5*60*1e3;it(h);const _=B(F,"users",r.uid);await Ue(_,{deleteAccountOTP:{code:l,expiresAt:h}}),we(!0),R("OTP has been sent to your email","success"),ce(!0)}catch(l){console.error("Error sending OTP:",l),U("Failed to send verification code. Please try again.")}finally{ne(!1)}},ht=async()=>{if(!X||X.length!==6){U("Please enter a valid 6-digit code");return}try{ne(!0);const l=B(F,"users",r.uid),h=await Oe(l);if(!h.exists()){U("User data not found");return}const D=h.data().deleteAccountOTP;if(!D){U("No OTP found. Please request a new code");return}const T=new Date().getTime();if(D.expiresAt<T){U("Verification code has expired. Please request a new code");return}if(D.code!==X){U("Invalid verification code");return}await mt()}catch(l){console.error("Error verifying OTP:",l),U("Failed to verify code. Please try again.")}finally{ne(!1)}},ft=l=>{const h=Math.floor(l/60),_=l%60;return`${h.toString().padStart(2,"0")}:${_.toString().padStart(2,"0")}`},Ee=async()=>{try{ee(!0),await Ut(r,{url:window.location.origin+"/profile",handleCodeInApp:!1}),Q(!0),R(`Verification email sent to ${r.email}`,"success")}catch(l){console.error("Error sending verification email:",l),l.code==="auth/too-many-requests"?M("Too many requests. Please try again later."):M("Failed to send verification email. Please try again.")}finally{ee(!1)}},pt=async()=>{try{ee(!0),await lt()?(P(!1),R("Email verification successful","success"),I==="edit"?x(!0):I==="delete"&&te(!0)):M("Email not yet verified. Please check your inbox and click the verification link.")}catch(l){console.error("Error checking verification status:",l),M("Failed to verify email status. Please try again.")}finally{ee(!1)}},Ce=async()=>{try{d(!0),await Pe(r,{displayName:o.displayName});const l=B(F,"users",r.uid);await Ue(l,{displayName:o.displayName,bio:o.bio,location:o.location,profession:o.profession,githubLink:o.githubLink}),a({...r,displayName:o.displayName}),x(!1),R("Profile updated successfully","success")}catch(l){console.error("Error updating profile:",l),R("Error updating profile","error")}finally{d(!1)}},mt=async()=>{try{if(d(!0),r.photoURL&&r.photoURL.includes("firebase"))try{const l=Ve(t,`profile_photos/${r.uid}`);await rs(l)}catch(l){console.error("Error deleting profile photo:",l)}await ue(B(F,"users",r.uid));try{const l=B(F,"posts",r.uid);await ue(l);const h=B(F,"comments",r.uid);await ue(h)}catch(l){console.error("Error deleting user-related data:",l)}await St(r),R("Account deleted successfully","success"),n("/auth")}catch(l){console.error("Error deleting account:",l),U("Error deleting account: "+l.message)}finally{d(!1)}};return u?i.jsx("div",{className:"min-h-screen bg-gray-900 flex items-center justify-center",children:i.jsx("div",{className:"animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"})}):i.jsxs("div",{className:"min-h-screen bg-gray-900 text-white pt-16 px-4 pb-10",children:[b.show&&i.jsxs("div",{className:`fixed top-5 right-5 p-4 rounded-lg shadow-lg z-50 flex items-center justify-between max-w-xs sm:max-w-sm ${b.type==="success"?"bg-green-500":"bg-red-500"}`,children:[i.jsxs("div",{className:"flex items-center",children:[b.type==="success"?i.jsx(It,{className:"mr-2 flex-shrink-0",size:20}):i.jsx(Ie,{className:"mr-2 flex-shrink-0",size:20}),i.jsx("p",{className:"text-sm",children:b.message})]}),i.jsx("button",{onClick:()=>O({show:!1,message:"",type:""}),className:"ml-3 text-white flex-shrink-0",children:i.jsx(Et,{size:16})})]}),i.jsxs("div",{className:"max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden",children:[i.jsx("div",{className:"relative bg-gradient-to-r from-green-600 to-green-400 h-28 sm:h-40 flex items-center justify-center",children:i.jsxs("div",{className:"absolute -bottom-12 sm:-bottom-16 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-800 overflow-hidden bg-gray-700",children:[E?i.jsx("div",{className:"w-full h-full flex items-center justify-center",children:i.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"})}):w?i.jsx("img",{src:w,alt:"Profile",className:"w-full h-full object-cover"}):i.jsx("div",{className:"w-full h-full flex items-center justify-center bg-gray-600",children:i.jsx(Ct,{size:32,className:"text-gray-300"})}),i.jsx("input",{type:"file",ref:s,onChange:ct,className:"hidden",accept:"image/jpeg,image/png,image/gif"}),i.jsx("button",{onClick:()=>s.current.click(),className:"absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 p-1 rounded-full transition",title:"Upload profile photo",children:i.jsx(Wt,{size:14})})]})}),i.jsxs("div",{className:"pt-16 sm:pt-20 px-4 sm:px-6 pb-6",children:[i.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6",children:[i.jsx("h1",{className:"text-2xl font-bold text-white mb-4 sm:mb-0",children:"Profile"}),i.jsx("div",{className:"mb-4 sm:mb-0 sm:mr-4 flex items-center",children:r.emailVerified?i.jsxs("div",{className:"flex items-center text-green-400 text-sm",children:[i.jsx($t,{className:"mr-1",size:16}),i.jsx("span",{children:"Email verified"})]}):i.jsxs("div",{className:"flex items-center text-yellow-400 text-sm cursor-pointer",onClick:()=>{q("verify"),P(!0),M(""),Q(!1)},children:[i.jsx(Ie,{className:"mr-1",size:16}),i.jsx("span",{children:"Email not verified - Click to verify"})]})}),i.jsxs("div",{className:"hidden sm:flex sm:space-x-2",children:[i.jsx("button",{onClick:Te,className:`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${f?"bg-gray-600 hover:bg-gray-700":"bg-green-500 hover:bg-green-600"}`,children:f?"Cancel":"Edit Profile"}),f&&i.jsx("button",{onClick:Ce,className:"px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-500 hover:bg-green-600 transition",children:"Save"}),i.jsx("button",{onClick:Re,className:"px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-700 hover:bg-gray-600 transition",children:"Sign Out"})]}),i.jsxs("div",{className:"sm:hidden",children:[i.jsx("button",{onClick:()=>v(!C),className:"p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition",children:i.jsx(At,{size:20})}),C&&i.jsx("div",{className:"absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-10",children:i.jsxs("div",{className:"py-1",role:"menu","aria-orientation":"vertical",children:[i.jsx("button",{onClick:Te,className:`block w-full text-left px-4 py-2 text-sm ${f?"text-gray-300 hover:bg-gray-600":"text-white hover:bg-green-600 bg-green-500"}`,children:f?"Cancel":"Edit Profile"}),f&&i.jsx("button",{onClick:Ce,className:"block w-full text-left px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600",children:"Save"}),i.jsx("button",{onClick:Re,className:"block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600",children:"Sign Out"})]})})]})]}),i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-gray-400 mb-1",children:"Name"}),f?i.jsx("input",{type:"text",name:"displayName",value:o.displayName,onChange:K,className:"w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"}):i.jsx("p",{className:"text-white",children:o.displayName||"Not set"})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-gray-400 mb-1",children:"Email"}),i.jsx("p",{className:"text-white break-words",children:o.email}),i.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Email cannot be changed"})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-gray-400 mb-1",children:"Location"}),f?i.jsx("input",{type:"text",name:"location",value:o.location,onChange:K,className:"w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"City, Country"}):i.jsx("p",{className:"text-white",children:o.location||"Not set"})]})]}),i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-gray-400 mb-1",children:"Profession"}),f?i.jsx("input",{type:"text",name:"profession",value:o.profession,onChange:K,className:"w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"Software Engineer, Student, etc."}):i.jsx("p",{className:"text-white",children:o.profession||"Not set"})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-gray-400 mb-1",children:"GitHub Profile"}),f?i.jsx("input",{type:"text",name:"githubLink",value:o.githubLink,onChange:K,className:"w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500",placeholder:"https://github.com/username"}):i.jsx("p",{className:"text-white break-words",children:o.githubLink?i.jsx("a",{href:o.githubLink,target:"_blank",rel:"noopener noreferrer",className:"text-green-400 hover:text-green-300",children:o.githubLink}):"Not set"})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-gray-400 mb-1",children:"Bio"}),f?i.jsx("textarea",{name:"bio",value:o.bio,onChange:K,className:"w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-24",placeholder:"Tell us a bit about yourself..."}):i.jsx("p",{className:"text-white",children:o.bio||"Not set"})]})]})]}),i.jsxs("div",{className:"mt-10 border border-red-800 rounded-lg p-4",children:[i.jsx("h3",{className:"text-lg font-medium text-red-500 mb-2",children:"Danger Zone"}),i.jsx("p",{className:"text-gray-400 text-sm mb-4",children:"Permanently delete your account and all associated data. This action cannot be undone."}),i.jsxs("button",{onClick:dt,className:"flex items-center px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition",children:[i.jsx(Ht,{size:16,className:"mr-2"}),"Delete Account"]})]})]})]}),y&&i.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4",children:i.jsxs("div",{className:"bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4",children:[i.jsx("h3",{className:"text-xl font-bold text-white mb-4",children:"Email Verification Required"}),i.jsx("p",{className:"text-gray-300 mb-4",children:I==="edit"?"To edit your profile, you need to verify your email address.":I==="delete"?"To delete your account, you need to verify your email address.":"Please verify your email address to access all features."}),i.jsxs("div",{className:"mb-6",children:[i.jsx("p",{className:"text-gray-400 mb-4",children:_e?"A verification email has been sent. Please check your inbox and click the verification link. If you don't see it, check your spam folder.":`Click the button below to send a verification email to: ${o.email}`}),z&&i.jsx("div",{className:"bg-red-900 bg-opacity-50 border border-red-800 rounded-lg p-3 mb-4",children:i.jsx("p",{className:"text-red-300 text-sm",children:z})})]}),i.jsxs("div",{className:"flex justify-between",children:[i.jsx("button",{onClick:()=>P(!1),className:"px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition",children:"Close"}),i.jsx("div",{className:"flex space-x-2",children:_e?i.jsxs(i.Fragment,{children:[i.jsx("button",{onClick:pt,disabled:W,className:"px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center",children:W?i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"}),"Checking..."]}):i.jsxs(i.Fragment,{children:[i.jsx(Ft,{size:16,className:"mr-2"}),"I have Verified"]})}),i.jsx("button",{onClick:Ee,disabled:W,className:"px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed",children:"Resend"})]}):i.jsx("button",{onClick:Ee,disabled:W,className:"px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center",children:W?i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"}),"Sending..."]}):i.jsxs(i.Fragment,{children:[i.jsx(Se,{size:16,className:"mr-2"}),"Send Verification"]})})})]})]})}),rt&&i.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4",children:i.jsxs("div",{className:"bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4",children:[i.jsx("h3",{className:"text-xl font-bold text-white mb-4",children:"Verify Account Deletion"}),i.jsx("p",{className:"text-gray-300 mb-4",children:"For security purposes, we need to verify its you before deleting your account."}),ae?i.jsxs("div",{children:[i.jsx("p",{className:"text-gray-400 mb-4",children:"Enter the 6-digit verification code sent to your email:"}),ve>0&&i.jsxs("div",{className:"flex items-center mb-4 text-gray-400",children:[i.jsx(Mt,{size:16,className:"mr-2"}),i.jsxs("span",{children:["Code expires in: ",ft(ve)]})]}),i.jsx("input",{type:"text",maxLength:"6",value:X,onChange:l=>ke(l.target.value.replace(/[^0-9]/g,"")),className:"w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-center tracking-widest text-xl",placeholder:"000000"}),Ne&&i.jsx("div",{className:"bg-red-900 bg-opacity-50 border border-red-800 rounded-lg p-3 mb-4",children:i.jsx("p",{className:"text-red-300 text-sm",children:Ne})}),i.jsxs("div",{className:"flex justify-between",children:[i.jsx("div",{children:i.jsx("button",{onClick:()=>te(!1),className:"px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition",children:"Cancel"})}),i.jsxs("div",{className:"flex space-x-2",children:[i.jsx("button",{onClick:je,disabled:G||at,className:"px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed text-sm",children:"Resend Code"}),i.jsx("button",{onClick:ht,disabled:G||X.length!==6,className:"px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center",children:G?i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"}),"Verifying..."]}):"Delete Account"})]})]})]}):i.jsxs("div",{children:[i.jsxs("p",{className:"text-gray-400 mb-4",children:["Click the button below to send a verification code to your email: ",o.email]}),i.jsxs("div",{className:"flex justify-between mt-6",children:[i.jsx("button",{onClick:()=>te(!1),className:"px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition",children:"Cancel"}),i.jsx("button",{onClick:je,disabled:G,className:"px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center",children:G?i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"}),"Sending..."]}):i.jsxs(i.Fragment,{children:[i.jsx(Se,{size:16,className:"mr-2"}),"Send Verification Code"]})})]})]})]})})]})}export{hs as default};
