(()=>{"use strict";const t={name:"none",level:5},e={name:"error",level:4},i={name:"warn",level:3},s={name:"info",level:2},n={name:"debug",level:1},o={name:"trace",level:0},r=t=>t instanceof Error?JSON.parse(JSON.stringify(t,Object.getOwnPropertyNames(t))):t;class a{constructor(e,i=t){this.sinkPost=e,this.logLevel=i,this.post=(t,e,i,s,...n)=>{this.sinkPost(t,e,i,s,...n)}}trace(t,e,i,...s){this.shouldReportThisLogLevel(o)&&this.post(o,t,e,i,...s)}debug(t,e,i,...s){this.shouldReportThisLogLevel(n)&&this.post(n,t,e,i,...s)}info(t,e,i,...n){this.shouldReportThisLogLevel(s)&&this.post(s,t,e,i,...n)}warn(t,e,s,...n){this.shouldReportThisLogLevel(i)&&this.post(i,t,e,s,...n)}error(t,i,s,...n){this.shouldReportThisLogLevel(e)&&this.post(e,t,i,s,...n)}shouldReportThisLogLevel(t){return this.logLevel.level<=t.level}}var h;!function(t){t[t.Console=0]="Console",t[t.Sentry=1]="Sentry",t[t.BsmLoggerForwarder=2]="BsmLoggerForwarder",t[t.BackgroundLoggerForwarder=3]="BackgroundLoggerForwarder"}(h||(h={}));class l{static addSink(t,e){l.loggerSinkManager.addSink(t,e)}static getSinkManager(){return l.loggerSinkManager}}l.loggerSinkManager=new class{constructor(){this.sinks=new Map}addSink(t,e){this.sinks.has(t)||this.sinks.set(t,e)}getSink(t){return this.sinks.get(t)}clearSinks(){this.sinks.clear()}executeSinks(t,r,a,h,...l){this.sinks.forEach((c=>{var g,d,m,u,v;switch(t){case o:null===(g=c.trace)||void 0===g||g.call(c,r,a,h,...l);break;case n:null===(d=c.debug)||void 0===d||d.call(c,r,a,h,...l);break;case s:null===(m=c.info)||void 0===m||m.call(c,r,a,h,...l);break;case i:null===(u=c.warn)||void 0===u||u.call(c,r,a,h,...l);break;case e:null===(v=c.error)||void 0===v||v.call(c,r,a,h,...l)}}))}};class c{constructor(t,e,i){this.sinkManager=t,this.loggerName=e,this.correlationId=i}executeSinks(t,e,...i){this.sinkManager.executeSinks(t,this.correlationId,this.loggerName,e,...i)}trace(t,...e){this.executeSinks(o,t,...e)}debug(t,...e){this.executeSinks(n,t,...e)}warn(t,...e){this.executeSinks(i,t,...e)}info(t,...e){this.executeSinks(s,t,...e)}error(t,...i){this.executeSinks(e,t,...i)}toJSON(){return`${this.loggerName}Logger`}}function g(t,e){return new c(l.getSinkManager(),t,e)}class d{constructor(t,e,i=g("BackgroundCommunicator","NXTK")){this.browser=t,this.enveloper=e,this.logger=i,this.onMessageListeners=[],this.onStatusListeners=[],this.connect=()=>{this.receivingPort=this.browser.runtime.connect({name:"content"}),this.receivingPort.onDisconnect.addListener((()=>{this.dispose(),this.logger.info("Disconnected.")})),this.receivingPort.onMessage.addListener(this.messageHandler)},this.messageHandler=(t,e)=>{const i=!this.isConnected()&&e;this.sendingPort=e,i&&this.notifyStatusChanged();const s=this.enveloper.unwrap(t);this.onMessageListeners.forEach((t=>t(s)))},this.dispose=()=>{var t,e,i;null===(t=this.receivingPort)||void 0===t||t.onDisconnect.removeListener(this.dispose),null===(e=this.receivingPort)||void 0===e||e.onMessage.removeListener(this.messageHandler);try{null===(i=this.receivingPort)||void 0===i||i.disconnect()}catch{}delete this.receivingPort,delete this.sendingPort}}onMessage(t){this.onMessageListeners.push(t)}onStatusChanged(t){this.onStatusListeners.push(t)}isConnected(){return void 0!==this.sendingPort}send(t){var e;try{null===(e=this.sendingPort)||void 0===e||e.postMessage(this.enveloper.wrap(t))}catch(e){this.dispose(),this.logger.error("Failed to send message",t)}}notifyStatusChanged(){this.onStatusListeners.forEach((t=>t(this.isConnected())))}}const m=new class{constructor(t=g("Time","NXTK")){this.logger=t,this.origin=performance.timeOrigin,this.offset=0,this.measureDrift=()=>{const t=performance.now(),e=Date.now(),i=performance.now();return e-(this.origin+(t+i)/2)}}now(){return this.origin+this.offset+performance.now()}abs(t){return this.origin+this.offset+t}};class u{constructor(t=g("PerformanceNavigationMonitor","NXTK")){this.logger=t,this.navigationTimingSent=!1,this.unloadHandler=()=>{this.navigationTimingSent||this.logger.warn("performance navigation timings was not received")}}start(t){this.performanceObserver=new PerformanceObserver((e=>{var i;const s=null===(i=e.getEntries())||void 0===i?void 0:i[0];(null==s?void 0:s.duration)&&(null==t||t({entryType:"navigation",timing:s,navigationUrl:s.name,timestamp:m.now()}),this.navigationTimingSent=!0)})),this.performanceObserver.observe({type:"navigation",buffered:!0}),window.addEventListener("unload",this.unloadHandler,!1)}stop(){var t;null===(t=this.performanceObserver)||void 0===t||t.disconnect(),window.removeEventListener("unload",this.unloadHandler)}}class v{constructor(t=g("PerformanceResourcesMonitor","NXTK")){this.logger=t}start(t){this.timingObserver=new PerformanceObserver((e=>{e.getEntries().forEach((e=>{null==t||t({entryType:"resource",timestamp:m.now(),timing:e,resourceUrl:e.name})}))})),this.timingObserver.observe({type:"resource",buffered:!0})}stop(){this.timingObserver&&(this.timingObserver.disconnect(),delete this.timingObserver)}}var p,f,y,b;!function(t){let e;!function(t){t.Visibilitychange="visibilitychange",t.Mousedown="mousedown",t.Focus="focus",t.Blur="blur",t.Submit="submit"}(e=t.Type||(t.Type={}))}(p||(p={}));class w{static getSerializableHTMLElement(t,e){const i={classList:Array.from(t.classList),tagName:t.tagName,dataset:Object.assign({},t.dataset)};if(t.textContent&&t.textContent.length>0&&(i.textContent=t.textContent.substring(0,64)),t.id&&t.id.length>0&&(i.id=t.id),(t instanceof HTMLLinkElement||t instanceof HTMLAnchorElement)&&(i.href=null==t?void 0:t.href),e){const s=Array.from(e.children).indexOf(t);s>=0&&(i.index=s)}return i}static getSerializableElement(t){return t instanceof HTMLElement?w.getSerializableHTMLElement(t,t.parentElement):null==t?void 0:t.nodeName}static getSerializableEvent(t){const e={type:t.type};return t.target instanceof Node&&(e.target=w.getSerializableElement(t.target)),e}}!function(t){t.ClickEvent=class{constructor(t,e,i){this.extensionTime=t,this.timestamp=e,this.navigationRef=i,this.entryType="click"}},t.MouseDownEvent=class{constructor(t,e,i){this.extensionTime=t,this.timestamp=e,this.navigationRef=i,this.entryType="mousedown"}},t.MouseUpEvent=class{constructor(t,e,i){this.extensionTime=t,this.timestamp=e,this.navigationRef=i,this.entryType="mouseup"}}}(f||(f={})),function(t){t[t.click=0]="click",t[t.submit=1]="submit",t[t.input=4]="input",t[t.touch=8]="touch",t[t.scroll=16]="scroll",t[t.mouseMove=32]="mouseMove",t[t.visible=64]="visible",t[t.rage=65536]="rage",t[t.all=4294967295]="all"}(y||(y={}));class T{constructor(){this.onMouseDown=t=>{var e;null===(e=this.onEvent)||void 0===e||e.call(this,{entryType:"interaction",timestamp:m.now(),type:y.click,event:t?w.getSerializableEvent(t):void 0,count:1})},this.onSubmit=t=>{var e;null===(e=this.onEvent)||void 0===e||e.call(this,{entryType:"interaction",timestamp:m.now(),type:y.submit,event:t?w.getSerializableEvent(t):void 0,count:1})},this.monitorsOptions=[{eventName:p.Type.Mousedown,callback:this.onMouseDown,eventListenerOption:{passive:!0,capture:!0}},{eventName:p.Type.Submit,callback:this.onSubmit,eventListenerOption:{passive:!0,capture:!0}}]}start(t){this.onEvent=t,this.monitorsOptions.forEach((t=>{window.addEventListener(t.eventName,t.callback,t.eventListenerOption)}))}stop(){var t;null===(t=this.monitorsOptions)||void 0===t||t.forEach((t=>window.removeEventListener(t.eventName,t.callback,t.eventListenerOption)))}}class M{constructor(){this.onVisibilityChange=()=>{var t;const e={entryType:document.visibilityState,timestamp:m.now(),url:window.location.href};null===(t=this.onEvent)||void 0===t||t.call(this,e)}}start(t){this.onEvent=t,this.onVisibilityChange(),window.addEventListener(p.Type.Visibilitychange,this.onVisibilityChange,{capture:!0,passive:!0})}stop(){window.removeEventListener(p.Type.Visibilitychange,this.onVisibilityChange,{capture:!0})}}class E{constructor(t=10,e=g("MutationMonitor","NXTK")){this.debounceMs=t,this.logger=e,this.mutationOptions={attributes:!0,characterData:!0,childList:!0,subtree:!0},this.mutationHandler=(t,e)=>{var i;const s={entryType:"mutation",timestamp:m.now(),navigationRef:{navigationUrl:window.location.href,sanitized:!1}};null===(i=this.onEvent)||void 0===i||i.call(this,s)}}start(t){this.onEvent=t;const e=function(t,e){let i;return function(...s){clearTimeout(i),i=setTimeout((()=>t.apply(this,s)),e)}}(this.mutationHandler,this.debounceMs);this.observer=new MutationObserver(e),this.observer.observe(document,this.mutationOptions)}stop(){var t;null===(t=this.observer)||void 0===t||t.disconnect()}}!function(t){let e;t.CompleteEvent=class{constructor(t,e,i,s,n){this.timestamp=t,this.transactionDetails=e,this.openTabCount=i,this.navigationRef=s,this.networkInformation=n,this.entryType="transaction-complete",this.extensionTime=t-m.origin,this.transactionDetails.startTimestamp=e.startTimestamp-m.origin}},function(t){let e;!function(t){t.Setup="transaction-trigger-configuration-setup",t.Clear="transaction-trigger-configuration-clear"}(e=t.Type||(t.Type={}))}(e=t.TriggerConfiguration||(t.TriggerConfiguration={}))}(b||(b={}));class S extends Map{constructor(t,e){super(e),this.factory=t}getOrCreate(t,e){let i=super.get(t);if(!i){if(e)e(t);else{if(!this.factory)throw new Error("Invalid operation: missing value factory.");this.factory(t)}super.set(t,i)}return i}static Object(t){return new S((()=>({})),t)}static Array(t){return new S((()=>new Array),t)}static Set(t){return new S((()=>new Set),t)}static Map(t){return new S((()=>new Map),t)}static DefaultMap(t,e){return new S((()=>new S(t)),e)}}const C={capture:!0,passive:!0};class I{constructor(t){this.postEvents=t}get nameStyle(){return"background: rgba(224, 229, 245, 0.8); border-radius: 5px; padding: 1px 4px;border: 1px solid #aabfcf; font-size: 0.95em; color: #111;"}}class k{constructor(t){if(!t.expression)throw new Error("The match pattern expression is missing.");this.pattern=t.expression,t.isRegex||(this.pattern=this.pattern.replace(/[.+?^${}()|[\]\\]/g,"\\$&"),this.pattern=this.pattern.replace(/\*/g,".*"));let e="";t.caseInsensitive&&(e+="i"),t.multiline&&(e+="m"),this.regex=new RegExp(this.pattern,e)}matches(t){return this.regex.test(t)}}const O={childList:!0,subtree:!0};class L extends I{get monitoring(){return this._monitoring}constructor(t,e,i,s,n,o,r=!1,a=!1,h=[],l=document.body,c=g("ElementAdditionMonitor","NXTK")){super(t),this.monitorId=e,this.transactionMonitorId=i,this.name=s,this.appId=n,this.cssSelector=o,this.waitForNew=r,this.selectAll=a,this.container=l,this.logger=c,this.textPatterns=new Array,this._monitoring=!1,this.onMutation=(t,e)=>{if(!this._monitoring)return;const i=m.now();for(let e=0;e<t.length;e++){const s=t[e];if("childList"===s.type){const t=s.addedNodes;for(let e=0;e<t.length;e++){const s=t[e];if(s.nodeType===s.ELEMENT_NODE){const t=s;let e;try{e=t.matches(this.cssSelector)}catch(t){return this.logger.error(t),void this.stop()}if(e){if(this.checkCandidateElement(t,i))return}else if(this.findInDescendants(t,i))return}}}}},this.textPatterns.push(...h.map((t=>new k(t)))),this.hasTextPatterns=this.textPatterns.length>0}start(){this._monitoring||(this._monitoring=!0,!this.waitForNew&&this.tryDetectElement()||!this._monitoring||(this.mutationObserver=new MutationObserver(this.onMutation),this.mutationObserver.observe(this.container,O),this.logger.debug(`waiting for ${this.selectAll?"multiple elements":"one element"} to be added: %c${this.name}%c ${this.cssSelector}`,this.nameStyle,"")))}stop(){this._monitoring=!1,this.mutationObserver&&(this.mutationObserver.disconnect(),this.mutationObserver=void 0)}tryDetectElement(){const t=m.now();let e;try{e=this.container.querySelectorAll(this.cssSelector)}catch(t){return this.logger.error(t),this.stop(),!1}if(this.hasTextPatterns&&e.length>50){this.logger.error(`%c${this.name}%c inner text pattern matching cannot be used with selectors that yield more than 50 elements`,this.nameStyle,"");const e={timestamp:t,appId:this.appId,entryType:"monitor-failure",reason:"CSS selector matches too many elements",monitorId:this.monitorId,transactionMonitorId:this.transactionMonitorId,url:window.location.href};return this.postEvents([e]),this.stop(),!1}for(let i=0;i<e.length;i++){const s=e[i];if(s.nodeType===s.ELEMENT_NODE){const e=s;if(this.checkInnerText(e)&&(this.onElementFound(e,t),!this.selectAll))return!0}}return!1}findInDescendants(t,e){let i;try{i=t.querySelectorAll(this.cssSelector)}catch(t){return this.logger.error(t),this.stop(),!1}for(let t=0;t<i.length;t++){const s=i[t];if(s.nodeType===s.ELEMENT_NODE){const t=s;if(this.checkCandidateElement(t,e))return!0}}return!1}checkCandidateElement(t,e){return!!this.checkInnerText(t)&&(this.onElementAdded(t,e),!this.selectAll)}checkInnerText(t){if(this.hasTextPatterns){const e=t.textContent;return!!e&&this.textPatterns.some((t=>t.matches(e)))}return!0}onElementFound(t,e){const i={entryType:"element-found",timestamp:e,target:t,monitorId:this.monitorId};this.postEvents([i])}onElementAdded(t,e){const i={entryType:"element-added",timestamp:e,target:t,monitorId:this.monitorId};this.postEvents([i])}}class x extends I{constructor(t,e,i,s,n=g("ElementRemovalMonitor","NXTK")){super(t),this.target=e,this.monitorId=i,this.name=s,this.logger=n,this.onMutation=t=>{if(!this.monitoring)return;const e=m.now();for(let i=0;i<t.length;i++){const s=t[i];if("childList"===s.type){const t=s.removedNodes;for(let i=0;i<t.length;i++){const s=t[i];if(s===this.target||s.contains(this.target))return void this.onElementRemoved(e)}}}}}get monitoring(){return!!this.mutationObserver}start(){this.monitoring||(this.mutationObserver=new MutationObserver(this.onMutation),this.mutationObserver.observe(this.target.ownerDocument.body,{childList:!0,subtree:!0}),this.logger.debug(`waiting for %c${this.name}%c to be removed`,this.nameStyle,""))}stop(){this.mutationObserver&&(this.mutationObserver.disconnect(),this.mutationObserver=void 0)}onElementRemoved(t){const e={entryType:"element-removed",timestamp:t,target:this.target,monitorId:this.monitorId};this.logger.info(`element was removed %c${this.name}`,this.nameStyle),this.stop(),this.postEvents([e])}}class N extends I{constructor(t,e,i,s,n,o,r=!1,a=!1,h=[],l=document.body,c=g("ElementPresenceMonitor","NXTK")){super(t),this.triggerMonitorId=e,this.transactionMonitorId=i,this.appId=s,this.name=n,this.cssSelector=o,this.waitForNew=r,this.selectAll=a,this.innerTextPatterns=h,this.container=l,this.logger=c,this.removalMonitors=new Map,this.elementDetected=t=>{var e;if(!this.monitoring||this.removalMonitors.size>=50)return;const i=t[0];if("monitor-failure"===i.entryType)return this.postEvents(t),void this.stop();if(!this.removalMonitors.has(i.target)){if(this.detectNesting(i.target))return;this.logger.info(`trigger element ${"element-found"===i.entryType?"found":"added"} %c${this.name}`,this.nameStyle,i.target);const t=new x(this.elementRemoved,i.target,this.triggerMonitorId,this.name);this.removalMonitors.set(i.target,t),t.start(),this.postEvents([i]),50===this.removalMonitors.size&&this.logger.warn(`trigger element %c${this.name}%c has reached the limit of 50 tracked elements`,this.nameStyle,"")}this.monitoring&&!this.selectAll&&(null===(e=this.additionMonitor)||void 0===e||e.stop())},this.elementRemoved=t=>{var e;if(!this.monitoring)return;const i=t[0];this.removalMonitors.delete(i.target)||this.logger.error("Element removal monitor not found:",this.name,i.target,this.removalMonitors),this.postEvents([i]),this.monitoring&&!this.selectAll&&(null===(e=this.additionMonitor)||void 0===e||e.start())}}get monitoring(){return!!this.additionMonitor}*trackedElements(){for(const t of this.removalMonitors.values())yield t.target}get trackedElementsCount(){return this.removalMonitors.size}start(){this.monitoring||(this.additionMonitor=new L(this.elementDetected,this.triggerMonitorId,this.transactionMonitorId,this.name,this.appId,this.cssSelector,this.waitForNew,this.selectAll,this.innerTextPatterns,this.container),this.additionMonitor.start())}stop(){if(this.additionMonitor){this.additionMonitor.stop(),this.additionMonitor=void 0;for(const t of this.removalMonitors.values())t.stop();this.removalMonitors.clear()}}detectNesting(t){if(this.selectAll&&this.tracksRelatedElement(t)){this.logger.error(`%c${this.name}%c cannot use a CSS sector that yields to nested trigger elements`,this.nameStyle,"",this.cssSelector);const t={timestamp:m.now(),appId:this.appId,url:window.location.href,entryType:"monitor-failure",reason:"nested trigger elements",monitorId:this.triggerMonitorId,transactionMonitorId:this.transactionMonitorId};return this.postEvents([t]),this.stop(),!0}return!1}tracksRelatedElement(t){let e=t.parentElement;for(;e;){if(this.removalMonitors.has(e))return!0;e=e.parentElement}for(const e of this.removalMonitors.keys())if(t.contains(e.parentElement))return!0;return!1}}class R extends I{constructor(t,e,i,s,n,o){var r,a;if(super(t),this.transactionMonitorId=e,this.triggerConfig=i,this.appId=s,this.container=n,this.logger=o,this._monitoring=!1,this.elementPresenceChanged=t=>{if(!this.monitoring)return;const e=t[0];switch(e.entryType){case"element-added":case"element-found":this.onElementAdded(e);break;case"element-removed":this.onElementRemoved(e);break;case"monitor-failure":this.postEvents(t),this.stop()}},!i.monitorId)throw new Error(`The monitor id must be specified: ${i.name}`);if(!(null===(r=i.element)||void 0===r?void 0:r.cssSelector))throw new Error("The CSS selector must have a value.");this.monitorId=i.monitorId,this.name=null!==(a=i.name)&&void 0!==a?a:"(unnamed)",this.cssSelector=i.element.cssSelector,this.selectAll=!!i.element.selectAll}get monitoring(){return this._monitoring}*trackedElements(){this.elementMonitor&&(yield*this.elementMonitor.trackedElements())}get trackedElementsCount(){var t,e;return null!==(e=null===(t=this.elementMonitor)||void 0===t?void 0:t.trackedElementsCount)&&void 0!==e?e:0}start(){var t,e,i;this._monitoring||(this._monitoring=!0,this.elementMonitor=new N(this.elementPresenceChanged,this.monitorId,this.transactionMonitorId,this.name,this.appId,this.cssSelector,!!(null===(t=this.triggerConfig.element)||void 0===t?void 0:t.waitForNew),this.selectAll,null!==(i=null===(e=this.triggerConfig.element)||void 0===e?void 0:e.innerTextPatterns)&&void 0!==i?i:void 0,this.container),this.elementMonitor.start(),this.onStart())}stop(){var t;this._monitoring&&(this._monitoring=!1,null===(t=this.elementMonitor)||void 0===t||t.stop(),this.elementMonitor=void 0,this.onStop())}}class P extends I{constructor(t,e,i,s,n,o=!1,r=!0,a=g("ElementClassMonitor","NXTK")){super(t),this.target=e,this.monitorId=i,this.name=s,this.className=n,this.waitForChange=o,this.startRemoved=r,this.logger=a,this.monitoring=!1,this.hasClass=!1,this.onMutation=(t,e)=>{if(!this.monitoring)return;const i=m.now(),s=this.target.classList.contains(this.className);this.hasClass!==s&&(this.hasClass=s,this.onClassChanged(i))}}start(){this.monitoring||(this.monitoring=!0,this.checkStartState()&&(this.logger.debug("waiting for target element",this.name,"class change:",this.className),this.mutationObserver=new MutationObserver(this.onMutation),this.mutationObserver.observe(this.target,{attributes:!0,attributeFilter:["class"]})))}stop(){var t;this.monitoring&&(this.monitoring=!1,null===(t=this.mutationObserver)||void 0===t||t.disconnect(),this.mutationObserver=void 0)}checkStartState(){const t=m.now();return this.hasClass=this.target.classList.contains(this.className),!(!this.waitForChange&&this.hasClass===this.startRemoved)||(this.onClassChanged(t),this.monitoring)}onClassChanged(t){this.hasClass?this.onClassAdded(t):this.onClassRemoved(t)}onClassAdded(t){const e={entryType:"element-class-added",timestamp:t,target:this.target,monitorId:this.monitorId};this.logger.info(`Class %c${this.className}%c was added to %c${this.name}`,"font-weight: bold;","",this.nameStyle),this.postEvents([e])}onClassRemoved(t){const e={entryType:"element-class-removed",timestamp:t,target:this.target,monitorId:this.monitorId};this.logger.info(`Class %c${this.className}%c was removed from %c${this.name}`,"font-weight: bold;","",this.nameStyle),this.postEvents([e])}}class A extends R{constructor(t,e,i,s,n,o=g("ClassTriggerMonitor","NXTK")){var r,a,h;if(super(t,e,i,s,n,o),this.classMonitors=new Map,this.onClassToggled=t=>{if(!this.monitoring)return;const e=t[0],i={entryType:e.entryType===(this.triggerOnRemoved?"element-class-removed":"element-class-added")?"trigger-set":"trigger-reset",appId:this.appId,timestamp:e.timestamp,name:this.name,monitorId:this.monitorId,transactionMonitorId:this.transactionMonitorId,url:window.location.href,sourceEntryType:e.entryType};this.postEvents([i])},!(null===(r=i.class)||void 0===r?void 0:r.name))throw new Error(`The class name must be specified: ${i.name}`);this.className=i.class.name,this.triggerOnRemoved=!!(null===(a=i.class)||void 0===a?void 0:a.triggerOnRemoved),this.waitForChange=!!(null===(h=i.class)||void 0===h?void 0:h.waitForChange)}onStart(){}onStop(){for(const t of this.classMonitors.values())t.stop();this.classMonitors.clear()}onElementAdded(t){const e=new P(this.onClassToggled,t.target,this.monitorId,this.name,this.className,this.waitForChange,!this.triggerOnRemoved);this.classMonitors.set(t.target,e),e.start()}onElementRemoved(t){const e=this.classMonitors.get(t.target);e?(e.stop(),this.classMonitors.delete(t.target)):this.logger.error("Element class monitor not found:",this.name,t.target,this.classMonitors)}}class D{constructor(t){if(this.expression=t,this.ctrl=!1,this.alt=!1,this.shift=!1,this.meta=!1,0===t.length)throw new Error("Shortcut expression cannot be empty.");if("+"===t)this.key="+";else{const e=t.split("+");let i=e.pop();if(t.endsWith("++"))e.pop(),i="+";else if(!i)throw new Error("Invalid key in shortcut expression.");this.key=i;for(let i=0;i<e.length;i++){const s=e[i];switch(s.toLowerCase()){case"ctrl":this.ctrl=!0;break;case"alt":this.alt=!0;break;case"shift":this.shift=!0;break;case"meta":case"win":case"command":this.meta=!0;break;default:throw new Error(`Invalid key modifier: '${s}' in expression ${t}`)}}1===this.key.length&&(this.shift?this.key=this.key.toUpperCase():this.key=this.key.toLowerCase())}}matches(t){return t.key===this.key&&t.ctrlKey===this.ctrl&&t.altKey===this.alt&&t.shiftKey===this.shift&&t.metaKey===this.meta}toString(){return this.expression}}const $="keydown";class K extends I{constructor(t,e,i,s,n,o=g("KeyboardShortcutMonitor","NXTK")){super(t),this.monitorId=e,this.name=i,this.target=n,this.logger=o,this.monitoring=!1,this.onKeyboardEvent=t=>{this.monitoring&&this.shortcut.matches(t)&&this.onKeyboardShortcut()},this.shortcut=new D(s)}start(){this.monitoring||(this.monitoring=!0,this.target?(this.logger.debug(`listening for keyboard shortcut %c${this.shortcut.toString()}%c on element %c${this.name}`,this.nameStyle,"",this.nameStyle),this.target.addEventListener($,this.onKeyboardEvent,C)):(this.logger.debug(`listening for keyboard shortcut %c${this.shortcut.toString()}`,this.nameStyle),window.addEventListener($,this.onKeyboardEvent,C)))}stop(){this.monitoring&&(this.monitoring=!1,this.target?this.target.removeEventListener($,this.onKeyboardEvent,C):window.removeEventListener($,this.onKeyboardEvent,C))}onKeyboardShortcut(){const t=m.now(),e=this.shortcut.toString(),i={entryType:"keyboard-shortcut",timestamp:t,name:e,monitorId:this.monitorId};this.target?this.logger.info(`%c${this.shortcut.toString()}%c pressed on element %c${this.name}`,this.nameStyle,"",this.nameStyle):this.logger.info(`%c${e}`,this.nameStyle,"pressed"),this.postEvents([i])}}class F extends R{constructor(t,e,i,s,n,o=g("EventTriggerMonitor","NXTK")){var r,a;if(super(t,e,i,s,n,o),this.elementShortcutMonitors=new Map,this.onTriggerEvent=t=>{var e,i;if(!this.monitoring)return;const s=m.now(),n={entryType:"trigger-set",appId:this.appId,transactionMonitorId:this.transactionMonitorId,timestamp:s,name:null===(e=this.triggerConfig.event)||void 0===e?void 0:e.name,url:window.location.href,monitorId:this.monitorId};this.logger.info(`%c${null===(i=this.triggerConfig.event)||void 0===i?void 0:i.name}%c event fired on %c${this.name}`,this.nameStyle,"",this.nameStyle),this.postEvents([n])},this.onKeyboardShortcut=t=>{var e,i;if(!this.monitoring)return;const s=t[0],n={entryType:"trigger-set",appId:this.appId,timestamp:s.timestamp,name:null===(i=null===(e=this.triggerConfig.event)||void 0===e?void 0:e.keyboardShortcut)||void 0===i?void 0:i.expression,url:window.location.href,monitorId:this.monitorId,transactionMonitorId:this.transactionMonitorId,sourceEntryType:s.entryType};this.postEvents([n])},!(null===(r=i.event)||void 0===r?void 0:r.name)&&!(null===(a=i.event)||void 0===a?void 0:a.keyboardShortcut))throw new Error(`At least the event name or the keyboard shortcut must be specified: ${i.name}`)}onStart(){}onStop(){var t,e;if(null===(t=this.triggerConfig.event)||void 0===t?void 0:t.name)for(const t of this.trackedElements())t.removeEventListener(this.triggerConfig.event.name,this.onTriggerEvent,C);for(const t of this.elementShortcutMonitors.values())t.stop();this.elementShortcutMonitors.clear(),null===(e=this.globalShortcutMonitor)||void 0===e||e.stop(),this.globalShortcutMonitor=void 0}onElementAdded(t){var e,i,s;if((null===(e=this.triggerConfig.event)||void 0===e?void 0:e.name)&&(t.target.addEventListener(this.triggerConfig.event.name,this.onTriggerEvent,C),this.logger.debug(`listening for %c${this.triggerConfig.event.name}%c event on %c${this.name}`,this.nameStyle,"",this.nameStyle)),(null===(s=null===(i=this.triggerConfig.event)||void 0===i?void 0:i.keyboardShortcut)||void 0===s?void 0:s.expression)&&(this.triggerConfig.event.keyboardShortcut.listenOnTargetElement||!this.globalShortcutMonitor)){const e=new K(this.onKeyboardShortcut,this.monitorId,this.name,this.triggerConfig.event.keyboardShortcut.expression,this.triggerConfig.event.keyboardShortcut.listenOnTargetElement?t.target:void 0);this.triggerConfig.event.keyboardShortcut.listenOnTargetElement?this.elementShortcutMonitors.set(t.target,e):this.globalShortcutMonitor=e,e.start()}}onElementRemoved(t){var e;(null===(e=this.triggerConfig.event)||void 0===e?void 0:e.name)&&t.target.removeEventListener(this.triggerConfig.event.name,this.onTriggerEvent,C);const i=this.elementShortcutMonitors.get(t.target);i?(i.stop(),this.elementShortcutMonitors.delete(t.target)):this.globalShortcutMonitor&&0===this.trackedElementsCount&&(this.globalShortcutMonitor.stop(),this.globalShortcutMonitor=void 0)}}class B extends R{constructor(t,e,i,s,n,o=g("PresenceTriggerMonitor","NXTK")){var r;super(t,e,i,s,n,o),this.onPresenceChanged=t=>{if(!this.monitoring)return;const e={entryType:t.entryType===(this.triggerOnRemoved?"element-removed":"element-added")?"trigger-set":"trigger-reset",appId:this.appId,timestamp:t.timestamp,transactionMonitorId:this.transactionMonitorId,name:this.name,url:window.location.href,monitorId:this.monitorId,sourceEntryType:t.entryType};this.postEvents([e])},this.triggerOnRemoved=!!(null===(r=i.presence)||void 0===r?void 0:r.triggerOnRemoved)}onStart(){}onStop(){}onElementAdded(t){this.onPresenceChanged(t)}onElementRemoved(t){this.onPresenceChanged(t)}}const H=t=>"0"!==t.style.opacity&&!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length),X={attributes:!0,attributeFilter:["style"]};class V extends I{constructor(t,e,i,s,n=!1,o=!0,r=g("ElementVisibilityMonitor","NXTK")){super(t),this.target=e,this.monitorId=i,this.name=s,this.waitForChange=n,this.startHidden=o,this.logger=r,this.monitoring=!1,this.visible=!1,this.onIntersectionOrStyleChanged=()=>{if(!this.monitoring)return;const t=m.now(),e=H(this.target);this.visible!==e&&(this.visible=e,this.onVisibilityChanged(t))}}start(){if(!this.monitoring&&(this.monitoring=!0,this.checkStartVisibility())){this.logger.debug(`waiting for visibility of %c${this.name}`,this.nameStyle," to change");const t={root:this.target.ownerDocument.documentElement};this.intersectionObserver=new IntersectionObserver(this.onIntersectionOrStyleChanged,t),this.intersectionObserver.observe(this.target),this.styleObserver=new MutationObserver(this.onIntersectionOrStyleChanged),this.styleObserver.observe(this.target,X)}}stop(){var t,e;this.monitoring&&(this.monitoring=!1,null===(t=this.intersectionObserver)||void 0===t||t.disconnect(),this.intersectionObserver=void 0,null===(e=this.styleObserver)||void 0===e||e.disconnect(),this.styleObserver=void 0)}checkStartVisibility(){const t=m.now();return this.visible=H(this.target),!(!this.waitForChange&&this.visible===this.startHidden)||(this.onVisibilityChanged(t),this.monitoring)}onVisibilityChanged(t){this.monitoring&&(this.visible?this.onElementVisible(t):this.onElementHidden(t))}onElementVisible(t){const e={entryType:"element-visible",timestamp:t,target:this.target,monitorId:this.monitorId};this.logger.info(`element became visible: %c${this.name}`,this.nameStyle),this.postEvents([e])}onElementHidden(t){const e={entryType:"element-hidden",timestamp:t,target:this.target,monitorId:this.monitorId};this.logger.info(`element became hidden: %c${this.name}`,this.nameStyle),this.postEvents([e])}}class Q extends R{constructor(t,e,i,s,n,o=g("VisibilityTriggerMonitor","NXTK")){var r,a;super(t,e,i,s,n,o),this.visibilityMonitors=new Map,this.onVisibilityChanged=t=>{if(!this.monitoring)return;const e=t[0],i={entryType:(this.triggerOnHidden?"element-hidden"===e.entryType||"element-removed"===e.entryType:"element-visible"===e.entryType)?"trigger-set":"trigger-reset",appId:this.appId,timestamp:e.timestamp,transactionMonitorId:this.transactionMonitorId,name:this.name,url:window.location.href,monitorId:this.monitorId,sourceEntryType:e.entryType};this.postEvents([i])},this.triggerOnHidden=!!(null===(r=i.visibility)||void 0===r?void 0:r.triggerOnHidden),this.waitForChange=!!(null===(a=i.visibility)||void 0===a?void 0:a.waitForChange)}onStart(){}onStop(){for(const t of this.visibilityMonitors.values())t.stop();this.visibilityMonitors.clear()}onElementAdded(t){const e=new V(this.onVisibilityChanged,t.target,this.monitorId,this.name,this.waitForChange,!this.triggerOnHidden);this.visibilityMonitors.set(t.target,e),e.start()}onElementRemoved(t){const e=this.visibilityMonitors.get(t.target);e?(e.stop(),this.visibilityMonitors.delete(t.target)):this.logger.error("Element visibility monitor not found:",this.name,this.monitoring,t,this.visibilityMonitors),this.onVisibilityChanged([t])}}class _{static getType(t){return t.event?F:t.class?A:t.presence?B:Q}static create(t,e,i,s){return new(this.getType(i))(t,e,i,s,document.body)}}class z{constructor(t=g("TransactionMonitorManager","NXTK")){this.logger=t,this.triggers=new Map}start(t){this.onEvent=t}stop(){this.triggers.forEach((t=>t.stop())),this.triggers.clear()}configure(t){var e;switch(t.type){case b.TriggerConfiguration.Type.Setup:t.triggerConfig.forEach((e=>{if(!e.monitorId)return void this.logger.error("Can't set trigger. Invalid monitor id",t);if(this.triggers.has(e.monitorId))return void this.logger.debug("Trigger already setup",e);this.logger.info("Setting up trigger",e);const i=_.create((t=>this.onTrigger(t)),t.transactionId,e,t.appId);i.start(),this.triggers.set(e.monitorId,i)}));break;case b.TriggerConfiguration.Type.Clear:if("*"===t.monitorId){this.logger.info("Clearing all triggers",t),this.clearAllTriggers();break}if(!this.triggers.has(t.monitorId)){this.logger.warn("Can't reset trigger. Not set.",t);break}this.logger.info("Clearing trigger",t),null===(e=this.triggers.get(t.monitorId))||void 0===e||e.stop(),this.triggers.delete(t.monitorId)}}clearAllTriggers(){this.triggers.forEach((t=>{t.stop()})),this.triggers.clear()}onTrigger(t){var e;if(this.logger.info("Trigger activated",t),t.length){const i=t[0];null===(e=this.onEvent)||void 0===e||e.call(this,i)}}}class j{constructor(t,e=g("MonitorsManager","NXTK")){this.eventCollector=t,this.logger=e,this.registeredMonitors=[],this.transactionsMonitorManager=new z,this.isMainFrame=window.parent.location===window.location}registerMonitors(){this.registeredMonitors.push(new v,new E,new T,this.transactionsMonitorManager),this.isMainFrame&&this.registeredMonitors.push(new u,new M),this.registeredMonitors.forEach((t=>(t.start((t=>this.handleEvent(t))),t)))}updateTransactionsTriggers(t){this.transactionsMonitorManager.configure(t)}handleEvent(t){this.eventCollector.collect([t])}}var J,U,q;!function(t){let e;!function(t){t.Navigation="Navigation",t.Resource="Resource",t.PageCommand="PageCommand",t.Window="Window",t.Document="Document",t.PageMutation="PageMutation",t.Transaction="Transaction",t.TimeSync="TimeSync"}(e=t.MessageType||(t.MessageType={}))}(J||(J={})),function(t){t[t.Events=0]="Events",t[t.Log=1]="Log"}(U||(U={})),function(t){let e;!function(t){t[t.Cleanup=0]="Cleanup",t[t.Start=1]="Start",t[t.SetupLog=2]="SetupLog",t[t.TransactionTriggersSetup=3]="TransactionTriggersSetup",t[t.TransactionTriggersClear=4]="TransactionTriggersClear"}(e=t.Type||(t.Type={}))}(q||(q={}));class W extends a{constructor(e,i){super(((e,i,s,n,...o)=>{e.name!==t.name&&this.forwardLog(e,i,s,n,...o)}),i),this.postMessage=e,this.forwardLog=(t,e,i,s,...n)=>{const o={type:U.Log,level:t.name,logInfo:{correlationId:e,loggerName:i,message:r(s),additional:n.map(r)}};this.postMessage(o)}}}class G{constructor(t,e,i=g("ContentConfigurator","NXTK")){this.monitorsManager=t,this.communicator=e,this.logger=i,this.communicator.onMessage((t=>this.handleBackgroundMessage(t))),this.monitorsManager.registerMonitors()}handleBackgroundMessage(t){const e=JSON.parse(t.jsonData);switch(this.logger.info("Page Command",t),e.command){case q.Type.Start:break;case q.Type.TransactionTriggersSetup:{const t=e.triggerConfig;this.monitorsManager.updateTransactionsTriggers({type:b.TriggerConfiguration.Type.Setup,appId:e.appId,transactionId:e.transactionId,triggerConfig:t});break}case q.Type.TransactionTriggersClear:this.monitorsManager.updateTransactionsTriggers({type:b.TriggerConfiguration.Type.Clear,appId:e.appId});break;case q.Type.SetupLog:l.addSink(h.BackgroundLoggerForwarder,new W((t=>{this.communicator.send({type:J.MessageType.PageCommand,jsonData:JSON.stringify(t)})}),e.logLevel))}}}class Y{constructor(t,e=g("EventCollector","NXTK")){this.communicator=t,this.logger=e,this.eventsQueue=[],this.maxQueueExceededReported=!1,this.communicator.onStatusChanged((t=>{this.handleStatusChanged(t)}))}collect(t){if(t.length){if(this.communicator.isConnected())return this.logger.debug("Generated events",t),void this.postToBackground(t);this.logger.info("Not connected to the background script. Queueing events.",t),this.queueEvents(t)}}handleStatusChanged(t){if(!t)return;const e=m.now();this.logger.info("Connection established",e),this.sendQueueEventsAfterConnectionEstablish(e)}sendQueueEventsAfterConnectionEstablish(t){this.lastMutationEvent&&(this.eventsQueue.push(this.lastMutationEvent),delete this.lastMutationEvent),this.eventsQueue.length&&(this.eventsQueue.forEach((e=>e.timestampOffsetToContentConnected=t-e.timestamp)),this.eventsQueue.length&&this.postToBackground(this.eventsQueue))}queueEvents(t){var e;if(this.eventsQueue.length<500){this.maxQueueExceededReported=!1,this.lastMutationEvent=null!==(e=t.find((t=>"mutation"===t.entryType)))&&void 0!==e?e:this.lastMutationEvent;const i=t.filter((t=>"mutation"!==t.entryType));this.eventsQueue.push(...i)}else this.maxQueueExceededReported||(this.logger.error("Events queue is full. Ignoring events.",500,this.eventsQueue.map((t=>t.entryType)),t),this.maxQueueExceededReported=!0)}postToBackground(t){this.communicator.send({type:J.MessageType.PageCommand,jsonData:JSON.stringify({type:U.Events,serializedEvents:JSON.stringify(t)})})}}class Z{decode(t){return t.plainString?t.plainString:this.convertArrayBufferToString(t)}convertArrayBufferToString(t){const e="object"==typeof t.transferBuffer?this.reconstructBuffer(t):t.transferBuffer;return new TextDecoder("utf-8").decode(e)}reconstructBuffer(t){if(!t.transferBuffer)throw new Error("Invalid transfer buffer");return new Uint8Array(Object.values(t.transferBuffer))}}class tt{encode(t,e){return e?{transferBuffer:this.convertDataToArrayBuffer(t)}:{plainString:t}}convertDataToArrayBuffer(t){return(new TextEncoder).encode(t)}}class et{constructor(){this.decoder=new Z,this.encoder=new tt}wrap(t,e=!1){return{type:this.encoder.encode(t.type,e),jsonData:this.encoder.encode(t.jsonData,e)}}unwrap(t){return{type:this.decoder.decode(t.type),jsonData:this.decoder.decode(t.jsonData)}}}try{const t=new d(chrome,new et);t.connect();new G(new j(new Y(t)),t)}catch(t){console.error("NXTK: Failed to start content",t)}})();
//# sourceMappingURL=content.js.map