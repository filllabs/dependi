#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/vscode-languageserver/lib/common/utils/is.js
var require_is = __commonJS({
  "node_modules/vscode-languageserver/lib/common/utils/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.thenable = exports2.typedArray = exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    exports2.typedArray = typedArray;
    function thenable(value) {
      return value && func(value.then);
    }
    exports2.thenable = thenable;
  }
});

// node_modules/vscode-jsonrpc/lib/common/is.js
var require_is2 = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messages.js
var require_messages = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messages.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Message = exports2.NotificationType9 = exports2.NotificationType8 = exports2.NotificationType7 = exports2.NotificationType6 = exports2.NotificationType5 = exports2.NotificationType4 = exports2.NotificationType3 = exports2.NotificationType2 = exports2.NotificationType1 = exports2.NotificationType0 = exports2.NotificationType = exports2.RequestType9 = exports2.RequestType8 = exports2.RequestType7 = exports2.RequestType6 = exports2.RequestType5 = exports2.RequestType4 = exports2.RequestType3 = exports2.RequestType2 = exports2.RequestType1 = exports2.RequestType = exports2.RequestType0 = exports2.AbstractMessageSignature = exports2.ParameterStructures = exports2.ResponseError = exports2.ErrorCodes = void 0;
    var is = require_is2();
    var ErrorCodes;
    (function(ErrorCodes2) {
      ErrorCodes2.ParseError = -32700;
      ErrorCodes2.InvalidRequest = -32600;
      ErrorCodes2.MethodNotFound = -32601;
      ErrorCodes2.InvalidParams = -32602;
      ErrorCodes2.InternalError = -32603;
      ErrorCodes2.jsonrpcReservedErrorRangeStart = -32099;
      ErrorCodes2.serverErrorStart = -32099;
      ErrorCodes2.MessageWriteError = -32099;
      ErrorCodes2.MessageReadError = -32098;
      ErrorCodes2.PendingResponseRejected = -32097;
      ErrorCodes2.ConnectionInactive = -32096;
      ErrorCodes2.ServerNotInitialized = -32002;
      ErrorCodes2.UnknownErrorCode = -32001;
      ErrorCodes2.jsonrpcReservedErrorRangeEnd = -32e3;
      ErrorCodes2.serverErrorEnd = -32e3;
    })(ErrorCodes || (exports2.ErrorCodes = ErrorCodes = {}));
    var ResponseError2 = class _ResponseError extends Error {
      constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, _ResponseError.prototype);
      }
      toJson() {
        const result = {
          code: this.code,
          message: this.message
        };
        if (this.data !== void 0) {
          result.data = this.data;
        }
        return result;
      }
    };
    exports2.ResponseError = ResponseError2;
    var ParameterStructures = class _ParameterStructures {
      constructor(kind) {
        this.kind = kind;
      }
      static is(value) {
        return value === _ParameterStructures.auto || value === _ParameterStructures.byName || value === _ParameterStructures.byPosition;
      }
      toString() {
        return this.kind;
      }
    };
    exports2.ParameterStructures = ParameterStructures;
    ParameterStructures.auto = new ParameterStructures("auto");
    ParameterStructures.byPosition = new ParameterStructures("byPosition");
    ParameterStructures.byName = new ParameterStructures("byName");
    var AbstractMessageSignature = class {
      constructor(method, numberOfParams) {
        this.method = method;
        this.numberOfParams = numberOfParams;
      }
      get parameterStructures() {
        return ParameterStructures.auto;
      }
    };
    exports2.AbstractMessageSignature = AbstractMessageSignature;
    var RequestType0 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.RequestType0 = RequestType0;
    var RequestType = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.RequestType = RequestType;
    var RequestType1 = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.RequestType1 = RequestType1;
    var RequestType2 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.RequestType2 = RequestType2;
    var RequestType3 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.RequestType3 = RequestType3;
    var RequestType4 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.RequestType4 = RequestType4;
    var RequestType5 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.RequestType5 = RequestType5;
    var RequestType6 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.RequestType6 = RequestType6;
    var RequestType7 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.RequestType7 = RequestType7;
    var RequestType8 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.RequestType8 = RequestType8;
    var RequestType9 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.RequestType9 = RequestType9;
    var NotificationType = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.NotificationType = NotificationType;
    var NotificationType0 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.NotificationType0 = NotificationType0;
    var NotificationType1 = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.NotificationType1 = NotificationType1;
    var NotificationType2 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.NotificationType2 = NotificationType2;
    var NotificationType3 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.NotificationType3 = NotificationType3;
    var NotificationType4 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.NotificationType4 = NotificationType4;
    var NotificationType5 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.NotificationType5 = NotificationType5;
    var NotificationType6 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.NotificationType6 = NotificationType6;
    var NotificationType7 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.NotificationType7 = NotificationType7;
    var NotificationType8 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.NotificationType8 = NotificationType8;
    var NotificationType9 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.NotificationType9 = NotificationType9;
    var Message;
    (function(Message2) {
      function isRequest(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
      }
      Message2.isRequest = isRequest;
      function isNotification(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && message.id === void 0;
      }
      Message2.isNotification = isNotification;
      function isResponse(message) {
        const candidate = message;
        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
      }
      Message2.isResponse = isResponse;
    })(Message || (exports2.Message = Message = {}));
  }
});

// node_modules/vscode-jsonrpc/lib/common/linkedMap.js
var require_linkedMap = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/linkedMap.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LRUCache = exports2.LinkedMap = exports2.Touch = void 0;
    var Touch;
    (function(Touch2) {
      Touch2.None = 0;
      Touch2.First = 1;
      Touch2.AsOld = Touch2.First;
      Touch2.Last = 2;
      Touch2.AsNew = Touch2.Last;
    })(Touch || (exports2.Touch = Touch = {}));
    var LinkedMap = class {
      constructor() {
        this[_a] = "LinkedMap";
        this._map = /* @__PURE__ */ new Map();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state = 0;
      }
      clear() {
        this._map.clear();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state++;
      }
      isEmpty() {
        return !this._head && !this._tail;
      }
      get size() {
        return this._size;
      }
      get first() {
        return this._head?.value;
      }
      get last() {
        return this._tail?.value;
      }
      has(key) {
        return this._map.has(key);
      }
      get(key, touch = Touch.None) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        if (touch !== Touch.None) {
          this.touch(item, touch);
        }
        return item.value;
      }
      set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
          item.value = value;
          if (touch !== Touch.None) {
            this.touch(item, touch);
          }
        } else {
          item = { key, value, next: void 0, previous: void 0 };
          switch (touch) {
            case Touch.None:
              this.addItemLast(item);
              break;
            case Touch.First:
              this.addItemFirst(item);
              break;
            case Touch.Last:
              this.addItemLast(item);
              break;
            default:
              this.addItemLast(item);
              break;
          }
          this._map.set(key, item);
          this._size++;
        }
        return this;
      }
      delete(key) {
        return !!this.remove(key);
      }
      remove(key) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      shift() {
        if (!this._head && !this._tail) {
          return void 0;
        }
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
          if (thisArg) {
            callbackfn.bind(thisArg)(current.value, current.key, this);
          } else {
            callbackfn(current.value, current.key, this);
          }
          if (this._state !== state) {
            throw new Error(`LinkedMap got modified during iteration.`);
          }
          current = current.next;
        }
      }
      keys() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.key, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      values() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.value, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      entries() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: [current.key, current.value], done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      [(_a = Symbol.toStringTag, Symbol.iterator)]() {
        return this.entries();
      }
      trimOld(newSize) {
        if (newSize >= this.size) {
          return;
        }
        if (newSize === 0) {
          this.clear();
          return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
          this._map.delete(current.key);
          current = current.next;
          currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
          current.previous = void 0;
        }
        this._state++;
      }
      addItemFirst(item) {
        if (!this._head && !this._tail) {
          this._tail = item;
        } else if (!this._head) {
          throw new Error("Invalid list");
        } else {
          item.next = this._head;
          this._head.previous = item;
        }
        this._head = item;
        this._state++;
      }
      addItemLast(item) {
        if (!this._head && !this._tail) {
          this._head = item;
        } else if (!this._tail) {
          throw new Error("Invalid list");
        } else {
          item.previous = this._tail;
          this._tail.next = item;
        }
        this._tail = item;
        this._state++;
      }
      removeItem(item) {
        if (item === this._head && item === this._tail) {
          this._head = void 0;
          this._tail = void 0;
        } else if (item === this._head) {
          if (!item.next) {
            throw new Error("Invalid list");
          }
          item.next.previous = void 0;
          this._head = item.next;
        } else if (item === this._tail) {
          if (!item.previous) {
            throw new Error("Invalid list");
          }
          item.previous.next = void 0;
          this._tail = item.previous;
        } else {
          const next = item.next;
          const previous = item.previous;
          if (!next || !previous) {
            throw new Error("Invalid list");
          }
          next.previous = previous;
          previous.next = next;
        }
        item.next = void 0;
        item.previous = void 0;
        this._state++;
      }
      touch(item, touch) {
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        if (touch !== Touch.First && touch !== Touch.Last) {
          return;
        }
        if (touch === Touch.First) {
          if (item === this._head) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._tail) {
            previous.next = void 0;
            this._tail = previous;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.previous = void 0;
          item.next = this._head;
          this._head.previous = item;
          this._head = item;
          this._state++;
        } else if (touch === Touch.Last) {
          if (item === this._tail) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._head) {
            next.previous = void 0;
            this._head = next;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.next = void 0;
          item.previous = this._tail;
          this._tail.next = item;
          this._tail = item;
          this._state++;
        }
      }
      toJSON() {
        const data = [];
        this.forEach((value, key) => {
          data.push([key, value]);
        });
        return data;
      }
      fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
          this.set(key, value);
        }
      }
    };
    exports2.LinkedMap = LinkedMap;
    var LRUCache = class extends LinkedMap {
      constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
      }
      get limit() {
        return this._limit;
      }
      set limit(limit) {
        this._limit = limit;
        this.checkTrim();
      }
      get ratio() {
        return this._ratio;
      }
      set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
      }
      get(key, touch = Touch.AsNew) {
        return super.get(key, touch);
      }
      peek(key) {
        return super.get(key, Touch.None);
      }
      set(key, value) {
        super.set(key, value, Touch.Last);
        this.checkTrim();
        return this;
      }
      checkTrim() {
        if (this.size > this._limit) {
          this.trimOld(Math.round(this._limit * this._ratio));
        }
      }
    };
    exports2.LRUCache = LRUCache;
  }
});

// node_modules/vscode-jsonrpc/lib/common/disposable.js
var require_disposable = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/disposable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Disposable = void 0;
    var Disposable2;
    (function(Disposable3) {
      function create(func) {
        return {
          dispose: func
        };
      }
      Disposable3.create = create;
    })(Disposable2 || (exports2.Disposable = Disposable2 = {}));
  }
});

// node_modules/vscode-jsonrpc/lib/common/ral.js
var require_ral = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/ral.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var _ral;
    function RAL() {
      if (_ral === void 0) {
        throw new Error(`No runtime abstraction layer installed`);
      }
      return _ral;
    }
    (function(RAL2) {
      function install(ral) {
        if (ral === void 0) {
          throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral;
      }
      RAL2.install = install;
    })(RAL || (RAL = {}));
    exports2.default = RAL;
  }
});

// node_modules/vscode-jsonrpc/lib/common/events.js
var require_events = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Emitter = exports2.Event = void 0;
    var ral_1 = require_ral();
    var Event;
    (function(Event2) {
      const _disposable = { dispose() {
      } };
      Event2.None = function() {
        return _disposable;
      };
    })(Event || (exports2.Event = Event = {}));
    var CallbackList = class {
      add(callback, context = null, bucket) {
        if (!this._callbacks) {
          this._callbacks = [];
          this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
          bucket.push({ dispose: () => this.remove(callback, context) });
        }
      }
      remove(callback, context = null) {
        if (!this._callbacks) {
          return;
        }
        let foundCallbackWithDifferentContext = false;
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
          if (this._callbacks[i] === callback) {
            if (this._contexts[i] === context) {
              this._callbacks.splice(i, 1);
              this._contexts.splice(i, 1);
              return;
            } else {
              foundCallbackWithDifferentContext = true;
            }
          }
        }
        if (foundCallbackWithDifferentContext) {
          throw new Error("When adding a listener with a context, you should remove it with the same context");
        }
      }
      invoke(...args) {
        if (!this._callbacks) {
          return [];
        }
        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (let i = 0, len = callbacks.length; i < len; i++) {
          try {
            ret.push(callbacks[i].apply(contexts[i], args));
          } catch (e) {
            (0, ral_1.default)().console.error(e);
          }
        }
        return ret;
      }
      isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
      }
      dispose() {
        this._callbacks = void 0;
        this._contexts = void 0;
      }
    };
    var Emitter = class _Emitter {
      constructor(_options) {
        this._options = _options;
      }
      /**
       * For the public to allow to subscribe
       * to events from this Emitter
       */
      get event() {
        if (!this._event) {
          this._event = (listener, thisArgs, disposables) => {
            if (!this._callbacks) {
              this._callbacks = new CallbackList();
            }
            if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
              this._options.onFirstListenerAdd(this);
            }
            this._callbacks.add(listener, thisArgs);
            const result = {
              dispose: () => {
                if (!this._callbacks) {
                  return;
                }
                this._callbacks.remove(listener, thisArgs);
                result.dispose = _Emitter._noop;
                if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                  this._options.onLastListenerRemove(this);
                }
              }
            };
            if (Array.isArray(disposables)) {
              disposables.push(result);
            }
            return result;
          };
        }
        return this._event;
      }
      /**
       * To be kept private to fire an event to
       * subscribers
       */
      fire(event) {
        if (this._callbacks) {
          this._callbacks.invoke.call(this._callbacks, event);
        }
      }
      dispose() {
        if (this._callbacks) {
          this._callbacks.dispose();
          this._callbacks = void 0;
        }
      }
    };
    exports2.Emitter = Emitter;
    Emitter._noop = function() {
    };
  }
});

// node_modules/vscode-jsonrpc/lib/common/cancellation.js
var require_cancellation = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/cancellation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CancellationTokenSource = exports2.CancellationToken = void 0;
    var ral_1 = require_ral();
    var Is = require_is2();
    var events_1 = require_events();
    var CancellationToken;
    (function(CancellationToken2) {
      CancellationToken2.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
      });
      CancellationToken2.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
      });
      function is(value) {
        const candidate = value;
        return candidate && (candidate === CancellationToken2.None || candidate === CancellationToken2.Cancelled || Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
      }
      CancellationToken2.is = is;
    })(CancellationToken || (exports2.CancellationToken = CancellationToken = {}));
    var shortcutEvent = Object.freeze(function(callback, context) {
      const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
      return { dispose() {
        handle.dispose();
      } };
    });
    var MutableToken = class {
      constructor() {
        this._isCancelled = false;
      }
      cancel() {
        if (!this._isCancelled) {
          this._isCancelled = true;
          if (this._emitter) {
            this._emitter.fire(void 0);
            this.dispose();
          }
        }
      }
      get isCancellationRequested() {
        return this._isCancelled;
      }
      get onCancellationRequested() {
        if (this._isCancelled) {
          return shortcutEvent;
        }
        if (!this._emitter) {
          this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
      }
      dispose() {
        if (this._emitter) {
          this._emitter.dispose();
          this._emitter = void 0;
        }
      }
    };
    var CancellationTokenSource = class {
      get token() {
        if (!this._token) {
          this._token = new MutableToken();
        }
        return this._token;
      }
      cancel() {
        if (!this._token) {
          this._token = CancellationToken.Cancelled;
        } else {
          this._token.cancel();
        }
      }
      dispose() {
        if (!this._token) {
          this._token = CancellationToken.None;
        } else if (this._token instanceof MutableToken) {
          this._token.dispose();
        }
      }
    };
    exports2.CancellationTokenSource = CancellationTokenSource;
  }
});

// node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js
var require_sharedArrayCancellation = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SharedArrayReceiverStrategy = exports2.SharedArraySenderStrategy = void 0;
    var cancellation_1 = require_cancellation();
    var CancellationState;
    (function(CancellationState2) {
      CancellationState2.Continue = 0;
      CancellationState2.Cancelled = 1;
    })(CancellationState || (CancellationState = {}));
    var SharedArraySenderStrategy = class {
      constructor() {
        this.buffers = /* @__PURE__ */ new Map();
      }
      enableCancellation(request3) {
        if (request3.id === null) {
          return;
        }
        const buffer = new SharedArrayBuffer(4);
        const data = new Int32Array(buffer, 0, 1);
        data[0] = CancellationState.Continue;
        this.buffers.set(request3.id, buffer);
        request3.$cancellationData = buffer;
      }
      async sendCancellation(_conn, id) {
        const buffer = this.buffers.get(id);
        if (buffer === void 0) {
          return;
        }
        const data = new Int32Array(buffer, 0, 1);
        Atomics.store(data, 0, CancellationState.Cancelled);
      }
      cleanup(id) {
        this.buffers.delete(id);
      }
      dispose() {
        this.buffers.clear();
      }
    };
    exports2.SharedArraySenderStrategy = SharedArraySenderStrategy;
    var SharedArrayBufferCancellationToken = class {
      constructor(buffer) {
        this.data = new Int32Array(buffer, 0, 1);
      }
      get isCancellationRequested() {
        return Atomics.load(this.data, 0) === CancellationState.Cancelled;
      }
      get onCancellationRequested() {
        throw new Error(`Cancellation over SharedArrayBuffer doesn't support cancellation events`);
      }
    };
    var SharedArrayBufferCancellationTokenSource = class {
      constructor(buffer) {
        this.token = new SharedArrayBufferCancellationToken(buffer);
      }
      cancel() {
      }
      dispose() {
      }
    };
    var SharedArrayReceiverStrategy = class {
      constructor() {
        this.kind = "request";
      }
      createCancellationTokenSource(request3) {
        const buffer = request3.$cancellationData;
        if (buffer === void 0) {
          return new cancellation_1.CancellationTokenSource();
        }
        return new SharedArrayBufferCancellationTokenSource(buffer);
      }
    };
    exports2.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
  }
});

// node_modules/vscode-jsonrpc/lib/common/semaphore.js
var require_semaphore = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/semaphore.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Semaphore = void 0;
    var ral_1 = require_ral();
    var Semaphore = class {
      constructor(capacity = 1) {
        if (capacity <= 0) {
          throw new Error("Capacity must be greater than 0");
        }
        this._capacity = capacity;
        this._active = 0;
        this._waiting = [];
      }
      lock(thunk) {
        return new Promise((resolve, reject) => {
          this._waiting.push({ thunk, resolve, reject });
          this.runNext();
        });
      }
      get active() {
        return this._active;
      }
      runNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        (0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
      }
      doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        const next = this._waiting.shift();
        this._active++;
        if (this._active > this._capacity) {
          throw new Error(`To many thunks active`);
        }
        try {
          const result = next.thunk();
          if (result instanceof Promise) {
            result.then((value) => {
              this._active--;
              next.resolve(value);
              this.runNext();
            }, (err) => {
              this._active--;
              next.reject(err);
              this.runNext();
            });
          } else {
            this._active--;
            next.resolve(result);
            this.runNext();
          }
        } catch (err) {
          this._active--;
          next.reject(err);
          this.runNext();
        }
      }
    };
    exports2.Semaphore = Semaphore;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messageReader.js
var require_messageReader = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messageReader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadableStreamMessageReader = exports2.AbstractMessageReader = exports2.MessageReader = void 0;
    var ral_1 = require_ral();
    var Is = require_is2();
    var events_1 = require_events();
    var semaphore_1 = require_semaphore();
    var MessageReader;
    (function(MessageReader2) {
      function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) && Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
      }
      MessageReader2.is = is;
    })(MessageReader || (exports2.MessageReader = MessageReader = {}));
    var AbstractMessageReader = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error) {
        this.errorEmitter.fire(this.asError(error));
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      get onPartialMessage() {
        return this.partialMessageEmitter.event;
      }
      firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageReader = AbstractMessageReader;
    var ResolvedMessageReaderOptions;
    (function(ResolvedMessageReaderOptions2) {
      function fromOptions(options) {
        let charset;
        let result;
        let contentDecoder;
        const contentDecoders = /* @__PURE__ */ new Map();
        let contentTypeDecoder;
        const contentTypeDecoders = /* @__PURE__ */ new Map();
        if (options === void 0 || typeof options === "string") {
          charset = options ?? "utf-8";
        } else {
          charset = options.charset ?? "utf-8";
          if (options.contentDecoder !== void 0) {
            contentDecoder = options.contentDecoder;
            contentDecoders.set(contentDecoder.name, contentDecoder);
          }
          if (options.contentDecoders !== void 0) {
            for (const decoder of options.contentDecoders) {
              contentDecoders.set(decoder.name, decoder);
            }
          }
          if (options.contentTypeDecoder !== void 0) {
            contentTypeDecoder = options.contentTypeDecoder;
            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
          }
          if (options.contentTypeDecoders !== void 0) {
            for (const decoder of options.contentTypeDecoders) {
              contentTypeDecoders.set(decoder.name, decoder);
            }
          }
        }
        if (contentTypeDecoder === void 0) {
          contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
          contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
      }
      ResolvedMessageReaderOptions2.fromOptions = fromOptions;
    })(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
    var ReadableStreamMessageReader = class extends AbstractMessageReader {
      constructor(readable, options) {
        super();
        this.readable = readable;
        this.options = ResolvedMessageReaderOptions.fromOptions(options);
        this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
        this._partialMessageTimeout = 1e4;
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.readSemaphore = new semaphore_1.Semaphore(1);
      }
      set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
      }
      get partialMessageTimeout() {
        return this._partialMessageTimeout;
      }
      listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = void 0;
        this.callback = callback;
        const result = this.readable.onData((data) => {
          this.onData(data);
        });
        this.readable.onError((error) => this.fireError(error));
        this.readable.onClose(() => this.fireClose());
        return result;
      }
      onData(data) {
        try {
          this.buffer.append(data);
          while (true) {
            if (this.nextMessageLength === -1) {
              const headers = this.buffer.tryReadHeaders(true);
              if (!headers) {
                return;
              }
              const contentLength = headers.get("content-length");
              if (!contentLength) {
                this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(headers))}`));
                return;
              }
              const length = parseInt(contentLength);
              if (isNaN(length)) {
                this.fireError(new Error(`Content-Length value must be a number. Got ${contentLength}`));
                return;
              }
              this.nextMessageLength = length;
            }
            const body = this.buffer.tryReadBody(this.nextMessageLength);
            if (body === void 0) {
              this.setPartialMessageTimer();
              return;
            }
            this.clearPartialMessageTimer();
            this.nextMessageLength = -1;
            this.readSemaphore.lock(async () => {
              const bytes = this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(body) : body;
              const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
              this.callback(message);
            }).catch((error) => {
              this.fireError(error);
            });
          }
        } catch (error) {
          this.fireError(error);
        }
      }
      clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
          this.partialMessageTimer.dispose();
          this.partialMessageTimer = void 0;
        }
      }
      setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
          return;
        }
        this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout) => {
          this.partialMessageTimer = void 0;
          if (token === this.messageToken) {
            this.firePartialMessage({ messageToken: token, waitingTime: timeout });
            this.setPartialMessageTimer();
          }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
      }
    };
    exports2.ReadableStreamMessageReader = ReadableStreamMessageReader;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messageWriter.js
var require_messageWriter = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messageWriter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WriteableStreamMessageWriter = exports2.AbstractMessageWriter = exports2.MessageWriter = void 0;
    var ral_1 = require_ral();
    var Is = require_is2();
    var semaphore_1 = require_semaphore();
    var events_1 = require_events();
    var ContentLength = "Content-Length: ";
    var CRLF = "\r\n";
    var MessageWriter;
    (function(MessageWriter2) {
      function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) && Is.func(candidate.onError) && Is.func(candidate.write);
      }
      MessageWriter2.is = is;
    })(MessageWriter || (exports2.MessageWriter = MessageWriter = {}));
    var AbstractMessageWriter = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageWriter = AbstractMessageWriter;
    var ResolvedMessageWriterOptions;
    (function(ResolvedMessageWriterOptions2) {
      function fromOptions(options) {
        if (options === void 0 || typeof options === "string") {
          return { charset: options ?? "utf-8", contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder };
        } else {
          return { charset: options.charset ?? "utf-8", contentEncoder: options.contentEncoder, contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder };
        }
      }
      ResolvedMessageWriterOptions2.fromOptions = fromOptions;
    })(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
    var WriteableStreamMessageWriter = class extends AbstractMessageWriter {
      constructor(writable, options) {
        super();
        this.writable = writable;
        this.options = ResolvedMessageWriterOptions.fromOptions(options);
        this.errorCount = 0;
        this.writeSemaphore = new semaphore_1.Semaphore(1);
        this.writable.onError((error) => this.fireError(error));
        this.writable.onClose(() => this.fireClose());
      }
      async write(msg) {
        return this.writeSemaphore.lock(async () => {
          const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
            if (this.options.contentEncoder !== void 0) {
              return this.options.contentEncoder.encode(buffer);
            } else {
              return buffer;
            }
          });
          return payload.then((buffer) => {
            const headers = [];
            headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
            headers.push(CRLF);
            return this.doWrite(msg, headers, buffer);
          }, (error) => {
            this.fireError(error);
            throw error;
          });
        });
      }
      async doWrite(msg, headers, data) {
        try {
          await this.writable.write(headers.join(""), "ascii");
          return this.writable.write(data);
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
        this.writable.end();
      }
    };
    exports2.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messageBuffer.js
var require_messageBuffer = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messageBuffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AbstractMessageBuffer = void 0;
    var CR = 13;
    var LF = 10;
    var CRLF = "\r\n";
    var AbstractMessageBuffer = class {
      constructor(encoding = "utf-8") {
        this._encoding = encoding;
        this._chunks = [];
        this._totalLength = 0;
      }
      get encoding() {
        return this._encoding;
      }
      append(chunk) {
        const toAppend = typeof chunk === "string" ? this.fromString(chunk, this._encoding) : chunk;
        this._chunks.push(toAppend);
        this._totalLength += toAppend.byteLength;
      }
      tryReadHeaders(lowerCaseKeys = false) {
        if (this._chunks.length === 0) {
          return void 0;
        }
        let state = 0;
        let chunkIndex = 0;
        let offset = 0;
        let chunkBytesRead = 0;
        row: while (chunkIndex < this._chunks.length) {
          const chunk = this._chunks[chunkIndex];
          offset = 0;
          column: while (offset < chunk.length) {
            const value = chunk[offset];
            switch (value) {
              case CR:
                switch (state) {
                  case 0:
                    state = 1;
                    break;
                  case 2:
                    state = 3;
                    break;
                  default:
                    state = 0;
                }
                break;
              case LF:
                switch (state) {
                  case 1:
                    state = 2;
                    break;
                  case 3:
                    state = 4;
                    offset++;
                    break row;
                  default:
                    state = 0;
                }
                break;
              default:
                state = 0;
            }
            offset++;
          }
          chunkBytesRead += chunk.byteLength;
          chunkIndex++;
        }
        if (state !== 4) {
          return void 0;
        }
        const buffer = this._read(chunkBytesRead + offset);
        const result = /* @__PURE__ */ new Map();
        const headers = this.toString(buffer, "ascii").split(CRLF);
        if (headers.length < 2) {
          return result;
        }
        for (let i = 0; i < headers.length - 2; i++) {
          const header = headers[i];
          const index = header.indexOf(":");
          if (index === -1) {
            throw new Error(`Message header must separate key and value using ':'
${header}`);
          }
          const key = header.substr(0, index);
          const value = header.substr(index + 1).trim();
          result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
        }
        return result;
      }
      tryReadBody(length) {
        if (this._totalLength < length) {
          return void 0;
        }
        return this._read(length);
      }
      get numberOfBytes() {
        return this._totalLength;
      }
      _read(byteCount) {
        if (byteCount === 0) {
          return this.emptyBuffer();
        }
        if (byteCount > this._totalLength) {
          throw new Error(`Cannot read so many bytes!`);
        }
        if (this._chunks[0].byteLength === byteCount) {
          const chunk = this._chunks[0];
          this._chunks.shift();
          this._totalLength -= byteCount;
          return this.asNative(chunk);
        }
        if (this._chunks[0].byteLength > byteCount) {
          const chunk = this._chunks[0];
          const result2 = this.asNative(chunk, byteCount);
          this._chunks[0] = chunk.slice(byteCount);
          this._totalLength -= byteCount;
          return result2;
        }
        const result = this.allocNative(byteCount);
        let resultOffset = 0;
        let chunkIndex = 0;
        while (byteCount > 0) {
          const chunk = this._chunks[chunkIndex];
          if (chunk.byteLength > byteCount) {
            const chunkPart = chunk.slice(0, byteCount);
            result.set(chunkPart, resultOffset);
            resultOffset += byteCount;
            this._chunks[chunkIndex] = chunk.slice(byteCount);
            this._totalLength -= byteCount;
            byteCount -= byteCount;
          } else {
            result.set(chunk, resultOffset);
            resultOffset += chunk.byteLength;
            this._chunks.shift();
            this._totalLength -= chunk.byteLength;
            byteCount -= chunk.byteLength;
          }
        }
        return result;
      }
    };
    exports2.AbstractMessageBuffer = AbstractMessageBuffer;
  }
});

// node_modules/vscode-jsonrpc/lib/common/connection.js
var require_connection = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/connection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createMessageConnection = exports2.ConnectionOptions = exports2.MessageStrategy = exports2.CancellationStrategy = exports2.CancellationSenderStrategy = exports2.CancellationReceiverStrategy = exports2.RequestCancellationReceiverStrategy = exports2.IdCancellationReceiverStrategy = exports2.ConnectionStrategy = exports2.ConnectionError = exports2.ConnectionErrors = exports2.LogTraceNotification = exports2.SetTraceNotification = exports2.TraceFormat = exports2.TraceValues = exports2.Trace = exports2.NullLogger = exports2.ProgressType = exports2.ProgressToken = void 0;
    var ral_1 = require_ral();
    var Is = require_is2();
    var messages_1 = require_messages();
    var linkedMap_1 = require_linkedMap();
    var events_1 = require_events();
    var cancellation_1 = require_cancellation();
    var CancelNotification;
    (function(CancelNotification2) {
      CancelNotification2.type = new messages_1.NotificationType("$/cancelRequest");
    })(CancelNotification || (CancelNotification = {}));
    var ProgressToken;
    (function(ProgressToken2) {
      function is(value) {
        return typeof value === "string" || typeof value === "number";
      }
      ProgressToken2.is = is;
    })(ProgressToken || (exports2.ProgressToken = ProgressToken = {}));
    var ProgressNotification;
    (function(ProgressNotification2) {
      ProgressNotification2.type = new messages_1.NotificationType("$/progress");
    })(ProgressNotification || (ProgressNotification = {}));
    var ProgressType = class {
      constructor() {
      }
    };
    exports2.ProgressType = ProgressType;
    var StarRequestHandler;
    (function(StarRequestHandler2) {
      function is(value) {
        return Is.func(value);
      }
      StarRequestHandler2.is = is;
    })(StarRequestHandler || (StarRequestHandler = {}));
    exports2.NullLogger = Object.freeze({
      error: () => {
      },
      warn: () => {
      },
      info: () => {
      },
      log: () => {
      }
    });
    var Trace;
    (function(Trace2) {
      Trace2[Trace2["Off"] = 0] = "Off";
      Trace2[Trace2["Messages"] = 1] = "Messages";
      Trace2[Trace2["Compact"] = 2] = "Compact";
      Trace2[Trace2["Verbose"] = 3] = "Verbose";
    })(Trace || (exports2.Trace = Trace = {}));
    var TraceValues;
    (function(TraceValues2) {
      TraceValues2.Off = "off";
      TraceValues2.Messages = "messages";
      TraceValues2.Compact = "compact";
      TraceValues2.Verbose = "verbose";
    })(TraceValues || (exports2.TraceValues = TraceValues = {}));
    (function(Trace2) {
      function fromString(value) {
        if (!Is.string(value)) {
          return Trace2.Off;
        }
        value = value.toLowerCase();
        switch (value) {
          case "off":
            return Trace2.Off;
          case "messages":
            return Trace2.Messages;
          case "compact":
            return Trace2.Compact;
          case "verbose":
            return Trace2.Verbose;
          default:
            return Trace2.Off;
        }
      }
      Trace2.fromString = fromString;
      function toString(value) {
        switch (value) {
          case Trace2.Off:
            return "off";
          case Trace2.Messages:
            return "messages";
          case Trace2.Compact:
            return "compact";
          case Trace2.Verbose:
            return "verbose";
          default:
            return "off";
        }
      }
      Trace2.toString = toString;
    })(Trace || (exports2.Trace = Trace = {}));
    var TraceFormat;
    (function(TraceFormat2) {
      TraceFormat2["Text"] = "text";
      TraceFormat2["JSON"] = "json";
    })(TraceFormat || (exports2.TraceFormat = TraceFormat = {}));
    (function(TraceFormat2) {
      function fromString(value) {
        if (!Is.string(value)) {
          return TraceFormat2.Text;
        }
        value = value.toLowerCase();
        if (value === "json") {
          return TraceFormat2.JSON;
        } else {
          return TraceFormat2.Text;
        }
      }
      TraceFormat2.fromString = fromString;
    })(TraceFormat || (exports2.TraceFormat = TraceFormat = {}));
    var SetTraceNotification;
    (function(SetTraceNotification2) {
      SetTraceNotification2.type = new messages_1.NotificationType("$/setTrace");
    })(SetTraceNotification || (exports2.SetTraceNotification = SetTraceNotification = {}));
    var LogTraceNotification;
    (function(LogTraceNotification2) {
      LogTraceNotification2.type = new messages_1.NotificationType("$/logTrace");
    })(LogTraceNotification || (exports2.LogTraceNotification = LogTraceNotification = {}));
    var ConnectionErrors;
    (function(ConnectionErrors2) {
      ConnectionErrors2[ConnectionErrors2["Closed"] = 1] = "Closed";
      ConnectionErrors2[ConnectionErrors2["Disposed"] = 2] = "Disposed";
      ConnectionErrors2[ConnectionErrors2["AlreadyListening"] = 3] = "AlreadyListening";
    })(ConnectionErrors || (exports2.ConnectionErrors = ConnectionErrors = {}));
    var ConnectionError = class _ConnectionError extends Error {
      constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, _ConnectionError.prototype);
      }
    };
    exports2.ConnectionError = ConnectionError;
    var ConnectionStrategy;
    (function(ConnectionStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.cancelUndispatched);
      }
      ConnectionStrategy2.is = is;
    })(ConnectionStrategy || (exports2.ConnectionStrategy = ConnectionStrategy = {}));
    var IdCancellationReceiverStrategy;
    (function(IdCancellationReceiverStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.kind === void 0 || candidate.kind === "id") && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
      }
      IdCancellationReceiverStrategy2.is = is;
    })(IdCancellationReceiverStrategy || (exports2.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
    var RequestCancellationReceiverStrategy;
    (function(RequestCancellationReceiverStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && candidate.kind === "request" && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
      }
      RequestCancellationReceiverStrategy2.is = is;
    })(RequestCancellationReceiverStrategy || (exports2.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}));
    var CancellationReceiverStrategy;
    (function(CancellationReceiverStrategy2) {
      CancellationReceiverStrategy2.Message = Object.freeze({
        createCancellationTokenSource(_) {
          return new cancellation_1.CancellationTokenSource();
        }
      });
      function is(value) {
        return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
      }
      CancellationReceiverStrategy2.is = is;
    })(CancellationReceiverStrategy || (exports2.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
    var CancellationSenderStrategy;
    (function(CancellationSenderStrategy2) {
      CancellationSenderStrategy2.Message = Object.freeze({
        sendCancellation(conn, id) {
          return conn.sendNotification(CancelNotification.type, { id });
        },
        cleanup(_) {
        }
      });
      function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
      }
      CancellationSenderStrategy2.is = is;
    })(CancellationSenderStrategy || (exports2.CancellationSenderStrategy = CancellationSenderStrategy = {}));
    var CancellationStrategy;
    (function(CancellationStrategy2) {
      CancellationStrategy2.Message = Object.freeze({
        receiver: CancellationReceiverStrategy.Message,
        sender: CancellationSenderStrategy.Message
      });
      function is(value) {
        const candidate = value;
        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
      }
      CancellationStrategy2.is = is;
    })(CancellationStrategy || (exports2.CancellationStrategy = CancellationStrategy = {}));
    var MessageStrategy;
    (function(MessageStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.handleMessage);
      }
      MessageStrategy2.is = is;
    })(MessageStrategy || (exports2.MessageStrategy = MessageStrategy = {}));
    var ConnectionOptions;
    (function(ConnectionOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
      }
      ConnectionOptions2.is = is;
    })(ConnectionOptions || (exports2.ConnectionOptions = ConnectionOptions = {}));
    var ConnectionState;
    (function(ConnectionState2) {
      ConnectionState2[ConnectionState2["New"] = 1] = "New";
      ConnectionState2[ConnectionState2["Listening"] = 2] = "Listening";
      ConnectionState2[ConnectionState2["Closed"] = 3] = "Closed";
      ConnectionState2[ConnectionState2["Disposed"] = 4] = "Disposed";
    })(ConnectionState || (ConnectionState = {}));
    function createMessageConnection(messageReader, messageWriter, _logger, options) {
      const logger = _logger !== void 0 ? _logger : exports2.NullLogger;
      let sequenceNumber = 0;
      let notificationSequenceNumber = 0;
      let unknownResponseSequenceNumber = 0;
      const version = "2.0";
      let starRequestHandler = void 0;
      const requestHandlers = /* @__PURE__ */ new Map();
      let starNotificationHandler = void 0;
      const notificationHandlers = /* @__PURE__ */ new Map();
      const progressHandlers = /* @__PURE__ */ new Map();
      let timer;
      let messageQueue = new linkedMap_1.LinkedMap();
      let responsePromises = /* @__PURE__ */ new Map();
      let knownCanceledRequests = /* @__PURE__ */ new Set();
      let requestTokens = /* @__PURE__ */ new Map();
      let trace = Trace.Off;
      let traceFormat = TraceFormat.Text;
      let tracer;
      let state = ConnectionState.New;
      const errorEmitter = new events_1.Emitter();
      const closeEmitter = new events_1.Emitter();
      const unhandledNotificationEmitter = new events_1.Emitter();
      const unhandledProgressEmitter = new events_1.Emitter();
      const disposeEmitter = new events_1.Emitter();
      const cancellationStrategy = options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
      function createRequestQueueKey(id) {
        if (id === null) {
          throw new Error(`Can't send requests with id null since the response can't be correlated.`);
        }
        return "req-" + id.toString();
      }
      function createResponseQueueKey(id) {
        if (id === null) {
          return "res-unknown-" + (++unknownResponseSequenceNumber).toString();
        } else {
          return "res-" + id.toString();
        }
      }
      function createNotificationQueueKey() {
        return "not-" + (++notificationSequenceNumber).toString();
      }
      function addMessageToQueue(queue, message) {
        if (messages_1.Message.isRequest(message)) {
          queue.set(createRequestQueueKey(message.id), message);
        } else if (messages_1.Message.isResponse(message)) {
          queue.set(createResponseQueueKey(message.id), message);
        } else {
          queue.set(createNotificationQueueKey(), message);
        }
      }
      function cancelUndispatched(_message) {
        return void 0;
      }
      function isListening() {
        return state === ConnectionState.Listening;
      }
      function isClosed() {
        return state === ConnectionState.Closed;
      }
      function isDisposed() {
        return state === ConnectionState.Disposed;
      }
      function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
          state = ConnectionState.Closed;
          closeEmitter.fire(void 0);
        }
      }
      function readErrorHandler(error) {
        errorEmitter.fire([error, void 0, void 0]);
      }
      function writeErrorHandler(data) {
        errorEmitter.fire(data);
      }
      messageReader.onClose(closeHandler);
      messageReader.onError(readErrorHandler);
      messageWriter.onClose(closeHandler);
      messageWriter.onError(writeErrorHandler);
      function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
          return;
        }
        timer = (0, ral_1.default)().timer.setImmediate(() => {
          timer = void 0;
          processMessageQueue();
        });
      }
      function handleMessage(message) {
        if (messages_1.Message.isRequest(message)) {
          handleRequest(message);
        } else if (messages_1.Message.isNotification(message)) {
          handleNotification(message);
        } else if (messages_1.Message.isResponse(message)) {
          handleResponse(message);
        } else {
          handleInvalidMessage(message);
        }
      }
      function processMessageQueue() {
        if (messageQueue.size === 0) {
          return;
        }
        const message = messageQueue.shift();
        try {
          const messageStrategy = options?.messageStrategy;
          if (MessageStrategy.is(messageStrategy)) {
            messageStrategy.handleMessage(message, handleMessage);
          } else {
            handleMessage(message);
          }
        } finally {
          triggerMessageQueue();
        }
      }
      const callback = (message) => {
        try {
          if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
            const cancelId = message.params.id;
            const key = createRequestQueueKey(cancelId);
            const toCancel = messageQueue.get(key);
            if (messages_1.Message.isRequest(toCancel)) {
              const strategy = options?.connectionStrategy;
              const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
              if (response && (response.error !== void 0 || response.result !== void 0)) {
                messageQueue.delete(key);
                requestTokens.delete(cancelId);
                response.id = toCancel.id;
                traceSendingResponse(response, message.method, Date.now());
                messageWriter.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
                return;
              }
            }
            const cancellationToken = requestTokens.get(cancelId);
            if (cancellationToken !== void 0) {
              cancellationToken.cancel();
              traceReceivedNotification(message);
              return;
            } else {
              knownCanceledRequests.add(cancelId);
            }
          }
          addMessageToQueue(messageQueue, message);
        } finally {
          triggerMessageQueue();
        }
      };
      function handleRequest(requestMessage) {
        if (isDisposed()) {
          return;
        }
        function reply(resultOrError, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id
          };
          if (resultOrError instanceof messages_1.ResponseError) {
            message.error = resultOrError.toJson();
          } else {
            message.result = resultOrError === void 0 ? null : resultOrError;
          }
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replyError(error, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id,
            error: error.toJson()
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replySuccess(result, method, startTime2) {
          if (result === void 0) {
            result = null;
          }
          const message = {
            jsonrpc: version,
            id: requestMessage.id,
            result
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        traceReceivedRequest(requestMessage);
        const element = requestHandlers.get(requestMessage.method);
        let type;
        let requestHandler;
        if (element) {
          type = element.type;
          requestHandler = element.handler;
        }
        const startTime = Date.now();
        if (requestHandler || starRequestHandler) {
          const tokenKey = requestMessage.id ?? String(Date.now());
          const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver) ? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey) : cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
          if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
            cancellationSource.cancel();
          }
          if (requestMessage.id !== null) {
            requestTokens.set(tokenKey, cancellationSource);
          }
          try {
            let handlerResult;
            if (requestHandler) {
              if (requestMessage.params === void 0) {
                if (type !== void 0 && type.numberOfParams !== 0) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(cancellationSource.token);
              } else if (Array.isArray(requestMessage.params)) {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byName) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
              }
            } else if (starRequestHandler) {
              handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
            }
            const promise = handlerResult;
            if (!handlerResult) {
              requestTokens.delete(tokenKey);
              replySuccess(handlerResult, requestMessage.method, startTime);
            } else if (promise.then) {
              promise.then((resultOrError) => {
                requestTokens.delete(tokenKey);
                reply(resultOrError, requestMessage.method, startTime);
              }, (error) => {
                requestTokens.delete(tokenKey);
                if (error instanceof messages_1.ResponseError) {
                  replyError(error, requestMessage.method, startTime);
                } else if (error && Is.string(error.message)) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                } else {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
              });
            } else {
              requestTokens.delete(tokenKey);
              reply(handlerResult, requestMessage.method, startTime);
            }
          } catch (error) {
            requestTokens.delete(tokenKey);
            if (error instanceof messages_1.ResponseError) {
              reply(error, requestMessage.method, startTime);
            } else if (error && Is.string(error.message)) {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
            } else {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
            }
          }
        } else {
          replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
      }
      function handleResponse(responseMessage) {
        if (isDisposed()) {
          return;
        }
        if (responseMessage.id === null) {
          if (responseMessage.error) {
            logger.error(`Received response message without id: Error is: 
${JSON.stringify(responseMessage.error, void 0, 4)}`);
          } else {
            logger.error(`Received response message without id. No further error information provided.`);
          }
        } else {
          const key = responseMessage.id;
          const responsePromise = responsePromises.get(key);
          traceReceivedResponse(responseMessage, responsePromise);
          if (responsePromise !== void 0) {
            responsePromises.delete(key);
            try {
              if (responseMessage.error) {
                const error = responseMessage.error;
                responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
              } else if (responseMessage.result !== void 0) {
                responsePromise.resolve(responseMessage.result);
              } else {
                throw new Error("Should never happen.");
              }
            } catch (error) {
              if (error.message) {
                logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
              } else {
                logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
              }
            }
          }
        }
      }
      function handleNotification(message) {
        if (isDisposed()) {
          return;
        }
        let type = void 0;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
          const cancelId = message.params.id;
          knownCanceledRequests.delete(cancelId);
          traceReceivedNotification(message);
          return;
        } else {
          const element = notificationHandlers.get(message.method);
          if (element) {
            notificationHandler = element.handler;
            type = element.type;
          }
        }
        if (notificationHandler || starNotificationHandler) {
          try {
            traceReceivedNotification(message);
            if (notificationHandler) {
              if (message.params === void 0) {
                if (type !== void 0) {
                  if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                  }
                }
                notificationHandler();
              } else if (Array.isArray(message.params)) {
                const params = message.params;
                if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                  notificationHandler({ token: params[0], value: params[1] });
                } else {
                  if (type !== void 0) {
                    if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                      logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                    }
                    if (type.numberOfParams !== message.params.length) {
                      logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                    }
                  }
                  notificationHandler(...params);
                }
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                }
                notificationHandler(message.params);
              }
            } else if (starNotificationHandler) {
              starNotificationHandler(message.method, message.params);
            }
          } catch (error) {
            if (error.message) {
              logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
            } else {
              logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
            }
          }
        } else {
          unhandledNotificationEmitter.fire(message);
        }
      }
      function handleInvalidMessage(message) {
        if (!message) {
          logger.error("Received empty message.");
          return;
        }
        logger.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(message, null, 4)}`);
        const responseMessage = message;
        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
          const key = responseMessage.id;
          const responseHandler = responsePromises.get(key);
          if (responseHandler) {
            responseHandler.reject(new Error("The received response has neither a result nor an error property."));
          }
        }
      }
      function stringifyTrace(params) {
        if (params === void 0 || params === null) {
          return void 0;
        }
        switch (trace) {
          case Trace.Verbose:
            return JSON.stringify(params, null, 4);
          case Trace.Compact:
            return JSON.stringify(params);
          default:
            return void 0;
        }
      }
      function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
            data = `Params: ${stringifyTrace(message.params)}

`;
          }
          tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("send-request", message);
        }
      }
      function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.params) {
              data = `Params: ${stringifyTrace(message.params)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Sending notification '${message.method}'.`, data);
        } else {
          logLSPMessage("send-notification", message);
        }
      }
      function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.error && message.error.data) {
              data = `Error data: ${stringifyTrace(message.error.data)}

`;
            } else {
              if (message.result) {
                data = `Result: ${stringifyTrace(message.result)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        } else {
          logLSPMessage("send-response", message);
        }
      }
      function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
            data = `Params: ${stringifyTrace(message.params)}

`;
          }
          tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("receive-request", message);
        }
      }
      function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.params) {
              data = `Params: ${stringifyTrace(message.params)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Received notification '${message.method}'.`, data);
        } else {
          logLSPMessage("receive-notification", message);
        }
      }
      function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.error && message.error.data) {
              data = `Error data: ${stringifyTrace(message.error.data)}

`;
            } else {
              if (message.result) {
                data = `Result: ${stringifyTrace(message.result)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          if (responsePromise) {
            const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
            tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
          } else {
            tracer.log(`Received response ${message.id} without active response promise.`, data);
          }
        } else {
          logLSPMessage("receive-response", message);
        }
      }
      function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
          return;
        }
        const lspMessage = {
          isLSPMessage: true,
          type,
          message,
          timestamp: Date.now()
        };
        tracer.log(lspMessage);
      }
      function throwIfClosedOrDisposed() {
        if (isClosed()) {
          throw new ConnectionError(ConnectionErrors.Closed, "Connection is closed.");
        }
        if (isDisposed()) {
          throw new ConnectionError(ConnectionErrors.Disposed, "Connection is disposed.");
        }
      }
      function throwIfListening() {
        if (isListening()) {
          throw new ConnectionError(ConnectionErrors.AlreadyListening, "Connection is already listening");
        }
      }
      function throwIfNotListening() {
        if (!isListening()) {
          throw new Error("Call listen() first.");
        }
      }
      function undefinedToNull(param) {
        if (param === void 0) {
          return null;
        } else {
          return param;
        }
      }
      function nullToUndefined(param) {
        if (param === null) {
          return void 0;
        } else {
          return param;
        }
      }
      function isNamedParam(param) {
        return param !== void 0 && param !== null && !Array.isArray(param) && typeof param === "object";
      }
      function computeSingleParam(parameterStructures, param) {
        switch (parameterStructures) {
          case messages_1.ParameterStructures.auto:
            if (isNamedParam(param)) {
              return nullToUndefined(param);
            } else {
              return [undefinedToNull(param)];
            }
          case messages_1.ParameterStructures.byName:
            if (!isNamedParam(param)) {
              throw new Error(`Received parameters by name but param is not an object literal.`);
            }
            return nullToUndefined(param);
          case messages_1.ParameterStructures.byPosition:
            return [undefinedToNull(param)];
          default:
            throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
        }
      }
      function computeMessageParams(type, params) {
        let result;
        const numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
          case 0:
            result = void 0;
            break;
          case 1:
            result = computeSingleParam(type.parameterStructures, params[0]);
            break;
          default:
            result = [];
            for (let i = 0; i < params.length && i < numberOfParams; i++) {
              result.push(undefinedToNull(params[i]));
            }
            if (params.length < numberOfParams) {
              for (let i = params.length; i < numberOfParams; i++) {
                result.push(null);
              }
            }
            break;
        }
        return result;
      }
      const connection2 = {
        sendNotification: (type, ...args) => {
          throwIfClosedOrDisposed();
          let method;
          let messageParams;
          if (Is.string(type)) {
            method = type;
            const first = args[0];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            let paramEnd = args.length;
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
          }
          const notificationMessage = {
            jsonrpc: version,
            method,
            params: messageParams
          };
          traceSendingNotification(notificationMessage);
          return messageWriter.write(notificationMessage).catch((error) => {
            logger.error(`Sending notification failed.`);
            throw error;
          });
        },
        onNotification: (type, handler) => {
          throwIfClosedOrDisposed();
          let method;
          if (Is.func(type)) {
            starNotificationHandler = type;
          } else if (handler) {
            if (Is.string(type)) {
              method = type;
              notificationHandlers.set(type, { type: void 0, handler });
            } else {
              method = type.method;
              notificationHandlers.set(type.method, { type, handler });
            }
          }
          return {
            dispose: () => {
              if (method !== void 0) {
                notificationHandlers.delete(method);
              } else {
                starNotificationHandler = void 0;
              }
            }
          };
        },
        onProgress: (_type, token, handler) => {
          if (progressHandlers.has(token)) {
            throw new Error(`Progress handler for token ${token} already registered`);
          }
          progressHandlers.set(token, handler);
          return {
            dispose: () => {
              progressHandlers.delete(token);
            }
          };
        },
        sendProgress: (_type, token, value) => {
          return connection2.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...args) => {
          throwIfClosedOrDisposed();
          throwIfNotListening();
          let method;
          let messageParams;
          let token = void 0;
          if (Is.string(type)) {
            method = type;
            const first = args[0];
            const last = args[args.length - 1];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            let paramEnd = args.length;
            if (cancellation_1.CancellationToken.is(last)) {
              paramEnd = paramEnd - 1;
              token = last;
            }
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
            const numberOfParams = type.numberOfParams;
            token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : void 0;
          }
          const id = sequenceNumber++;
          let disposable;
          if (token) {
            disposable = token.onCancellationRequested(() => {
              const p = cancellationStrategy.sender.sendCancellation(connection2, id);
              if (p === void 0) {
                logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
                return Promise.resolve();
              } else {
                return p.catch(() => {
                  logger.log(`Sending cancellation messages for id ${id} failed`);
                });
              }
            });
          }
          const requestMessage = {
            jsonrpc: version,
            id,
            method,
            params: messageParams
          };
          traceSendingRequest(requestMessage);
          if (typeof cancellationStrategy.sender.enableCancellation === "function") {
            cancellationStrategy.sender.enableCancellation(requestMessage);
          }
          return new Promise(async (resolve, reject) => {
            const resolveWithCleanup = (r) => {
              resolve(r);
              cancellationStrategy.sender.cleanup(id);
              disposable?.dispose();
            };
            const rejectWithCleanup = (r) => {
              reject(r);
              cancellationStrategy.sender.cleanup(id);
              disposable?.dispose();
            };
            const responsePromise = { method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
            try {
              await messageWriter.write(requestMessage);
              responsePromises.set(id, responsePromise);
            } catch (error) {
              logger.error(`Sending request failed.`);
              responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, error.message ? error.message : "Unknown reason"));
              throw error;
            }
          });
        },
        onRequest: (type, handler) => {
          throwIfClosedOrDisposed();
          let method = null;
          if (StarRequestHandler.is(type)) {
            method = void 0;
            starRequestHandler = type;
          } else if (Is.string(type)) {
            method = null;
            if (handler !== void 0) {
              method = type;
              requestHandlers.set(type, { handler, type: void 0 });
            }
          } else {
            if (handler !== void 0) {
              method = type.method;
              requestHandlers.set(type.method, { type, handler });
            }
          }
          return {
            dispose: () => {
              if (method === null) {
                return;
              }
              if (method !== void 0) {
                requestHandlers.delete(method);
              } else {
                starRequestHandler = void 0;
              }
            }
          };
        },
        hasPendingResponse: () => {
          return responsePromises.size > 0;
        },
        trace: async (_value, _tracer, sendNotificationOrTraceOptions) => {
          let _sendNotification = false;
          let _traceFormat = TraceFormat.Text;
          if (sendNotificationOrTraceOptions !== void 0) {
            if (Is.boolean(sendNotificationOrTraceOptions)) {
              _sendNotification = sendNotificationOrTraceOptions;
            } else {
              _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
              _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
            }
          }
          trace = _value;
          traceFormat = _traceFormat;
          if (trace === Trace.Off) {
            tracer = void 0;
          } else {
            tracer = _tracer;
          }
          if (_sendNotification && !isClosed() && !isDisposed()) {
            await connection2.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
          }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        end: () => {
          messageWriter.end();
        },
        dispose: () => {
          if (isDisposed()) {
            return;
          }
          state = ConnectionState.Disposed;
          disposeEmitter.fire(void 0);
          const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
          for (const promise of responsePromises.values()) {
            promise.reject(error);
          }
          responsePromises = /* @__PURE__ */ new Map();
          requestTokens = /* @__PURE__ */ new Map();
          knownCanceledRequests = /* @__PURE__ */ new Set();
          messageQueue = new linkedMap_1.LinkedMap();
          if (Is.func(messageWriter.dispose)) {
            messageWriter.dispose();
          }
          if (Is.func(messageReader.dispose)) {
            messageReader.dispose();
          }
        },
        listen: () => {
          throwIfClosedOrDisposed();
          throwIfListening();
          state = ConnectionState.Listening;
          messageReader.listen(callback);
        },
        inspect: () => {
          (0, ral_1.default)().console.log("inspect");
        }
      };
      connection2.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        const verbose = trace === Trace.Verbose || trace === Trace.Compact;
        tracer.log(params.message, verbose ? params.verbose : void 0);
      });
      connection2.onNotification(ProgressNotification.type, (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
          handler(params.value);
        } else {
          unhandledProgressEmitter.fire(params);
        }
      });
      return connection2;
    }
    exports2.createMessageConnection = createMessageConnection;
  }
});

// node_modules/vscode-jsonrpc/lib/common/api.js
var require_api = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProgressType = exports2.ProgressToken = exports2.createMessageConnection = exports2.NullLogger = exports2.ConnectionOptions = exports2.ConnectionStrategy = exports2.AbstractMessageBuffer = exports2.WriteableStreamMessageWriter = exports2.AbstractMessageWriter = exports2.MessageWriter = exports2.ReadableStreamMessageReader = exports2.AbstractMessageReader = exports2.MessageReader = exports2.SharedArrayReceiverStrategy = exports2.SharedArraySenderStrategy = exports2.CancellationToken = exports2.CancellationTokenSource = exports2.Emitter = exports2.Event = exports2.Disposable = exports2.LRUCache = exports2.Touch = exports2.LinkedMap = exports2.ParameterStructures = exports2.NotificationType9 = exports2.NotificationType8 = exports2.NotificationType7 = exports2.NotificationType6 = exports2.NotificationType5 = exports2.NotificationType4 = exports2.NotificationType3 = exports2.NotificationType2 = exports2.NotificationType1 = exports2.NotificationType0 = exports2.NotificationType = exports2.ErrorCodes = exports2.ResponseError = exports2.RequestType9 = exports2.RequestType8 = exports2.RequestType7 = exports2.RequestType6 = exports2.RequestType5 = exports2.RequestType4 = exports2.RequestType3 = exports2.RequestType2 = exports2.RequestType1 = exports2.RequestType0 = exports2.RequestType = exports2.Message = exports2.RAL = void 0;
    exports2.MessageStrategy = exports2.CancellationStrategy = exports2.CancellationSenderStrategy = exports2.CancellationReceiverStrategy = exports2.ConnectionError = exports2.ConnectionErrors = exports2.LogTraceNotification = exports2.SetTraceNotification = exports2.TraceFormat = exports2.TraceValues = exports2.Trace = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports2, "Message", { enumerable: true, get: function() {
      return messages_1.Message;
    } });
    Object.defineProperty(exports2, "RequestType", { enumerable: true, get: function() {
      return messages_1.RequestType;
    } });
    Object.defineProperty(exports2, "RequestType0", { enumerable: true, get: function() {
      return messages_1.RequestType0;
    } });
    Object.defineProperty(exports2, "RequestType1", { enumerable: true, get: function() {
      return messages_1.RequestType1;
    } });
    Object.defineProperty(exports2, "RequestType2", { enumerable: true, get: function() {
      return messages_1.RequestType2;
    } });
    Object.defineProperty(exports2, "RequestType3", { enumerable: true, get: function() {
      return messages_1.RequestType3;
    } });
    Object.defineProperty(exports2, "RequestType4", { enumerable: true, get: function() {
      return messages_1.RequestType4;
    } });
    Object.defineProperty(exports2, "RequestType5", { enumerable: true, get: function() {
      return messages_1.RequestType5;
    } });
    Object.defineProperty(exports2, "RequestType6", { enumerable: true, get: function() {
      return messages_1.RequestType6;
    } });
    Object.defineProperty(exports2, "RequestType7", { enumerable: true, get: function() {
      return messages_1.RequestType7;
    } });
    Object.defineProperty(exports2, "RequestType8", { enumerable: true, get: function() {
      return messages_1.RequestType8;
    } });
    Object.defineProperty(exports2, "RequestType9", { enumerable: true, get: function() {
      return messages_1.RequestType9;
    } });
    Object.defineProperty(exports2, "ResponseError", { enumerable: true, get: function() {
      return messages_1.ResponseError;
    } });
    Object.defineProperty(exports2, "ErrorCodes", { enumerable: true, get: function() {
      return messages_1.ErrorCodes;
    } });
    Object.defineProperty(exports2, "NotificationType", { enumerable: true, get: function() {
      return messages_1.NotificationType;
    } });
    Object.defineProperty(exports2, "NotificationType0", { enumerable: true, get: function() {
      return messages_1.NotificationType0;
    } });
    Object.defineProperty(exports2, "NotificationType1", { enumerable: true, get: function() {
      return messages_1.NotificationType1;
    } });
    Object.defineProperty(exports2, "NotificationType2", { enumerable: true, get: function() {
      return messages_1.NotificationType2;
    } });
    Object.defineProperty(exports2, "NotificationType3", { enumerable: true, get: function() {
      return messages_1.NotificationType3;
    } });
    Object.defineProperty(exports2, "NotificationType4", { enumerable: true, get: function() {
      return messages_1.NotificationType4;
    } });
    Object.defineProperty(exports2, "NotificationType5", { enumerable: true, get: function() {
      return messages_1.NotificationType5;
    } });
    Object.defineProperty(exports2, "NotificationType6", { enumerable: true, get: function() {
      return messages_1.NotificationType6;
    } });
    Object.defineProperty(exports2, "NotificationType7", { enumerable: true, get: function() {
      return messages_1.NotificationType7;
    } });
    Object.defineProperty(exports2, "NotificationType8", { enumerable: true, get: function() {
      return messages_1.NotificationType8;
    } });
    Object.defineProperty(exports2, "NotificationType9", { enumerable: true, get: function() {
      return messages_1.NotificationType9;
    } });
    Object.defineProperty(exports2, "ParameterStructures", { enumerable: true, get: function() {
      return messages_1.ParameterStructures;
    } });
    var linkedMap_1 = require_linkedMap();
    Object.defineProperty(exports2, "LinkedMap", { enumerable: true, get: function() {
      return linkedMap_1.LinkedMap;
    } });
    Object.defineProperty(exports2, "LRUCache", { enumerable: true, get: function() {
      return linkedMap_1.LRUCache;
    } });
    Object.defineProperty(exports2, "Touch", { enumerable: true, get: function() {
      return linkedMap_1.Touch;
    } });
    var disposable_1 = require_disposable();
    Object.defineProperty(exports2, "Disposable", { enumerable: true, get: function() {
      return disposable_1.Disposable;
    } });
    var events_1 = require_events();
    Object.defineProperty(exports2, "Event", { enumerable: true, get: function() {
      return events_1.Event;
    } });
    Object.defineProperty(exports2, "Emitter", { enumerable: true, get: function() {
      return events_1.Emitter;
    } });
    var cancellation_1 = require_cancellation();
    Object.defineProperty(exports2, "CancellationTokenSource", { enumerable: true, get: function() {
      return cancellation_1.CancellationTokenSource;
    } });
    Object.defineProperty(exports2, "CancellationToken", { enumerable: true, get: function() {
      return cancellation_1.CancellationToken;
    } });
    var sharedArrayCancellation_1 = require_sharedArrayCancellation();
    Object.defineProperty(exports2, "SharedArraySenderStrategy", { enumerable: true, get: function() {
      return sharedArrayCancellation_1.SharedArraySenderStrategy;
    } });
    Object.defineProperty(exports2, "SharedArrayReceiverStrategy", { enumerable: true, get: function() {
      return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
    } });
    var messageReader_1 = require_messageReader();
    Object.defineProperty(exports2, "MessageReader", { enumerable: true, get: function() {
      return messageReader_1.MessageReader;
    } });
    Object.defineProperty(exports2, "AbstractMessageReader", { enumerable: true, get: function() {
      return messageReader_1.AbstractMessageReader;
    } });
    Object.defineProperty(exports2, "ReadableStreamMessageReader", { enumerable: true, get: function() {
      return messageReader_1.ReadableStreamMessageReader;
    } });
    var messageWriter_1 = require_messageWriter();
    Object.defineProperty(exports2, "MessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.MessageWriter;
    } });
    Object.defineProperty(exports2, "AbstractMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.AbstractMessageWriter;
    } });
    Object.defineProperty(exports2, "WriteableStreamMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.WriteableStreamMessageWriter;
    } });
    var messageBuffer_1 = require_messageBuffer();
    Object.defineProperty(exports2, "AbstractMessageBuffer", { enumerable: true, get: function() {
      return messageBuffer_1.AbstractMessageBuffer;
    } });
    var connection_1 = require_connection();
    Object.defineProperty(exports2, "ConnectionStrategy", { enumerable: true, get: function() {
      return connection_1.ConnectionStrategy;
    } });
    Object.defineProperty(exports2, "ConnectionOptions", { enumerable: true, get: function() {
      return connection_1.ConnectionOptions;
    } });
    Object.defineProperty(exports2, "NullLogger", { enumerable: true, get: function() {
      return connection_1.NullLogger;
    } });
    Object.defineProperty(exports2, "createMessageConnection", { enumerable: true, get: function() {
      return connection_1.createMessageConnection;
    } });
    Object.defineProperty(exports2, "ProgressToken", { enumerable: true, get: function() {
      return connection_1.ProgressToken;
    } });
    Object.defineProperty(exports2, "ProgressType", { enumerable: true, get: function() {
      return connection_1.ProgressType;
    } });
    Object.defineProperty(exports2, "Trace", { enumerable: true, get: function() {
      return connection_1.Trace;
    } });
    Object.defineProperty(exports2, "TraceValues", { enumerable: true, get: function() {
      return connection_1.TraceValues;
    } });
    Object.defineProperty(exports2, "TraceFormat", { enumerable: true, get: function() {
      return connection_1.TraceFormat;
    } });
    Object.defineProperty(exports2, "SetTraceNotification", { enumerable: true, get: function() {
      return connection_1.SetTraceNotification;
    } });
    Object.defineProperty(exports2, "LogTraceNotification", { enumerable: true, get: function() {
      return connection_1.LogTraceNotification;
    } });
    Object.defineProperty(exports2, "ConnectionErrors", { enumerable: true, get: function() {
      return connection_1.ConnectionErrors;
    } });
    Object.defineProperty(exports2, "ConnectionError", { enumerable: true, get: function() {
      return connection_1.ConnectionError;
    } });
    Object.defineProperty(exports2, "CancellationReceiverStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationReceiverStrategy;
    } });
    Object.defineProperty(exports2, "CancellationSenderStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationSenderStrategy;
    } });
    Object.defineProperty(exports2, "CancellationStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationStrategy;
    } });
    Object.defineProperty(exports2, "MessageStrategy", { enumerable: true, get: function() {
      return connection_1.MessageStrategy;
    } });
    var ral_1 = require_ral();
    exports2.RAL = ral_1.default;
  }
});

// node_modules/vscode-jsonrpc/lib/node/ril.js
var require_ril = __commonJS({
  "node_modules/vscode-jsonrpc/lib/node/ril.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require("util");
    var api_1 = require_api();
    var MessageBuffer = class _MessageBuffer extends api_1.AbstractMessageBuffer {
      constructor(encoding = "utf-8") {
        super(encoding);
      }
      emptyBuffer() {
        return _MessageBuffer.emptyBuffer;
      }
      fromString(value, encoding) {
        return Buffer.from(value, encoding);
      }
      toString(value, encoding) {
        if (value instanceof Buffer) {
          return value.toString(encoding);
        } else {
          return new util_1.TextDecoder(encoding).decode(value);
        }
      }
      asNative(buffer, length) {
        if (length === void 0) {
          return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
        } else {
          return buffer instanceof Buffer ? buffer.slice(0, length) : Buffer.from(buffer, 0, length);
        }
      }
      allocNative(length) {
        return Buffer.allocUnsafe(length);
      }
    };
    MessageBuffer.emptyBuffer = Buffer.allocUnsafe(0);
    var ReadableStreamWrapper = class {
      constructor(stream) {
        this.stream = stream;
      }
      onClose(listener) {
        this.stream.on("close", listener);
        return api_1.Disposable.create(() => this.stream.off("close", listener));
      }
      onError(listener) {
        this.stream.on("error", listener);
        return api_1.Disposable.create(() => this.stream.off("error", listener));
      }
      onEnd(listener) {
        this.stream.on("end", listener);
        return api_1.Disposable.create(() => this.stream.off("end", listener));
      }
      onData(listener) {
        this.stream.on("data", listener);
        return api_1.Disposable.create(() => this.stream.off("data", listener));
      }
    };
    var WritableStreamWrapper = class {
      constructor(stream) {
        this.stream = stream;
      }
      onClose(listener) {
        this.stream.on("close", listener);
        return api_1.Disposable.create(() => this.stream.off("close", listener));
      }
      onError(listener) {
        this.stream.on("error", listener);
        return api_1.Disposable.create(() => this.stream.off("error", listener));
      }
      onEnd(listener) {
        this.stream.on("end", listener);
        return api_1.Disposable.create(() => this.stream.off("end", listener));
      }
      write(data, encoding) {
        return new Promise((resolve, reject) => {
          const callback = (error) => {
            if (error === void 0 || error === null) {
              resolve();
            } else {
              reject(error);
            }
          };
          if (typeof data === "string") {
            this.stream.write(data, encoding, callback);
          } else {
            this.stream.write(data, callback);
          }
        });
      }
      end() {
        this.stream.end();
      }
    };
    var _ril = Object.freeze({
      messageBuffer: Object.freeze({
        create: (encoding) => new MessageBuffer(encoding)
      }),
      applicationJson: Object.freeze({
        encoder: Object.freeze({
          name: "application/json",
          encode: (msg, options) => {
            try {
              return Promise.resolve(Buffer.from(JSON.stringify(msg, void 0, 0), options.charset));
            } catch (err) {
              return Promise.reject(err);
            }
          }
        }),
        decoder: Object.freeze({
          name: "application/json",
          decode: (buffer, options) => {
            try {
              if (buffer instanceof Buffer) {
                return Promise.resolve(JSON.parse(buffer.toString(options.charset)));
              } else {
                return Promise.resolve(JSON.parse(new util_1.TextDecoder(options.charset).decode(buffer)));
              }
            } catch (err) {
              return Promise.reject(err);
            }
          }
        })
      }),
      stream: Object.freeze({
        asReadableStream: (stream) => new ReadableStreamWrapper(stream),
        asWritableStream: (stream) => new WritableStreamWrapper(stream)
      }),
      console,
      timer: Object.freeze({
        setTimeout(callback, ms, ...args) {
          const handle = setTimeout(callback, ms, ...args);
          return { dispose: () => clearTimeout(handle) };
        },
        setImmediate(callback, ...args) {
          const handle = setImmediate(callback, ...args);
          return { dispose: () => clearImmediate(handle) };
        },
        setInterval(callback, ms, ...args) {
          const handle = setInterval(callback, ms, ...args);
          return { dispose: () => clearInterval(handle) };
        }
      })
    });
    function RIL() {
      return _ril;
    }
    (function(RIL2) {
      function install() {
        api_1.RAL.install(_ril);
      }
      RIL2.install = install;
    })(RIL || (RIL = {}));
    exports2.default = RIL;
  }
});

// node_modules/vscode-jsonrpc/lib/node/main.js
var require_main = __commonJS({
  "node_modules/vscode-jsonrpc/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createMessageConnection = exports2.createServerSocketTransport = exports2.createClientSocketTransport = exports2.createServerPipeTransport = exports2.createClientPipeTransport = exports2.generateRandomPipeName = exports2.StreamMessageWriter = exports2.StreamMessageReader = exports2.SocketMessageWriter = exports2.SocketMessageReader = exports2.PortMessageWriter = exports2.PortMessageReader = exports2.IPCMessageWriter = exports2.IPCMessageReader = void 0;
    var ril_1 = require_ril();
    ril_1.default.install();
    var path12 = require("path");
    var os3 = require("os");
    var crypto_1 = require("crypto");
    var net_1 = require("net");
    var api_1 = require_api();
    __exportStar(require_api(), exports2);
    var IPCMessageReader = class extends api_1.AbstractMessageReader {
      constructor(process2) {
        super();
        this.process = process2;
        let eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose());
      }
      listen(callback) {
        this.process.on("message", callback);
        return api_1.Disposable.create(() => this.process.off("message", callback));
      }
    };
    exports2.IPCMessageReader = IPCMessageReader;
    var IPCMessageWriter = class extends api_1.AbstractMessageWriter {
      constructor(process2) {
        super();
        this.process = process2;
        this.errorCount = 0;
        const eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose);
      }
      write(msg) {
        try {
          if (typeof this.process.send === "function") {
            this.process.send(msg, void 0, void 0, (error) => {
              if (error) {
                this.errorCount++;
                this.handleError(error, msg);
              } else {
                this.errorCount = 0;
              }
            });
          }
          return Promise.resolve();
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
      }
    };
    exports2.IPCMessageWriter = IPCMessageWriter;
    var PortMessageReader = class extends api_1.AbstractMessageReader {
      constructor(port) {
        super();
        this.onData = new api_1.Emitter();
        port.on("close", () => this.fireClose);
        port.on("error", (error) => this.fireError(error));
        port.on("message", (message) => {
          this.onData.fire(message);
        });
      }
      listen(callback) {
        return this.onData.event(callback);
      }
    };
    exports2.PortMessageReader = PortMessageReader;
    var PortMessageWriter = class extends api_1.AbstractMessageWriter {
      constructor(port) {
        super();
        this.port = port;
        this.errorCount = 0;
        port.on("close", () => this.fireClose());
        port.on("error", (error) => this.fireError(error));
      }
      write(msg) {
        try {
          this.port.postMessage(msg);
          return Promise.resolve();
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
      }
    };
    exports2.PortMessageWriter = PortMessageWriter;
    var SocketMessageReader = class extends api_1.ReadableStreamMessageReader {
      constructor(socket, encoding = "utf-8") {
        super((0, ril_1.default)().stream.asReadableStream(socket), encoding);
      }
    };
    exports2.SocketMessageReader = SocketMessageReader;
    var SocketMessageWriter = class extends api_1.WriteableStreamMessageWriter {
      constructor(socket, options) {
        super((0, ril_1.default)().stream.asWritableStream(socket), options);
        this.socket = socket;
      }
      dispose() {
        super.dispose();
        this.socket.destroy();
      }
    };
    exports2.SocketMessageWriter = SocketMessageWriter;
    var StreamMessageReader = class extends api_1.ReadableStreamMessageReader {
      constructor(readable, encoding) {
        super((0, ril_1.default)().stream.asReadableStream(readable), encoding);
      }
    };
    exports2.StreamMessageReader = StreamMessageReader;
    var StreamMessageWriter = class extends api_1.WriteableStreamMessageWriter {
      constructor(writable, options) {
        super((0, ril_1.default)().stream.asWritableStream(writable), options);
      }
    };
    exports2.StreamMessageWriter = StreamMessageWriter;
    var XDG_RUNTIME_DIR = process.env["XDG_RUNTIME_DIR"];
    var safeIpcPathLengths = /* @__PURE__ */ new Map([
      ["linux", 107],
      ["darwin", 103]
    ]);
    function generateRandomPipeName() {
      const randomSuffix = (0, crypto_1.randomBytes)(21).toString("hex");
      if (process.platform === "win32") {
        return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
      }
      let result;
      if (XDG_RUNTIME_DIR) {
        result = path12.join(XDG_RUNTIME_DIR, `vscode-ipc-${randomSuffix}.sock`);
      } else {
        result = path12.join(os3.tmpdir(), `vscode-${randomSuffix}.sock`);
      }
      const limit = safeIpcPathLengths.get(process.platform);
      if (limit !== void 0 && result.length > limit) {
        (0, ril_1.default)().console.warn(`WARNING: IPC handle "${result}" is longer than ${limit} characters.`);
      }
      return result;
    }
    exports2.generateRandomPipeName = generateRandomPipeName;
    function createClientPipeTransport(pipeName, encoding = "utf-8") {
      let connectResolve;
      const connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
      });
      return new Promise((resolve, reject) => {
        let server = (0, net_1.createServer)((socket) => {
          server.close();
          connectResolve([
            new SocketMessageReader(socket, encoding),
            new SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(pipeName, () => {
          server.removeListener("error", reject);
          resolve({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientPipeTransport = createClientPipeTransport;
    function createServerPipeTransport(pipeName, encoding = "utf-8") {
      const socket = (0, net_1.createConnection)(pipeName);
      return [
        new SocketMessageReader(socket, encoding),
        new SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerPipeTransport = createServerPipeTransport;
    function createClientSocketTransport(port, encoding = "utf-8") {
      let connectResolve;
      const connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
      });
      return new Promise((resolve, reject) => {
        const server = (0, net_1.createServer)((socket) => {
          server.close();
          connectResolve([
            new SocketMessageReader(socket, encoding),
            new SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(port, "127.0.0.1", () => {
          server.removeListener("error", reject);
          resolve({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientSocketTransport = createClientSocketTransport;
    function createServerSocketTransport(port, encoding = "utf-8") {
      const socket = (0, net_1.createConnection)(port, "127.0.0.1");
      return [
        new SocketMessageReader(socket, encoding),
        new SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerSocketTransport = createServerSocketTransport;
    function isReadableStream(value) {
      const candidate = value;
      return candidate.read !== void 0 && candidate.addListener !== void 0;
    }
    function isWritableStream(value) {
      const candidate = value;
      return candidate.write !== void 0 && candidate.addListener !== void 0;
    }
    function createMessageConnection(input, output, logger, options) {
      if (!logger) {
        logger = api_1.NullLogger;
      }
      const reader = isReadableStream(input) ? new StreamMessageReader(input) : input;
      const writer = isWritableStream(output) ? new StreamMessageWriter(output) : output;
      if (api_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
      }
      return (0, api_1.createMessageConnection)(reader, writer, logger, options);
    }
    exports2.createMessageConnection = createMessageConnection;
  }
});

// node_modules/vscode-jsonrpc/node.js
var require_node = __commonJS({
  "node_modules/vscode-jsonrpc/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main();
  }
});

// node_modules/vscode-languageserver-types/lib/umd/main.js
var require_main2 = __commonJS({
  "node_modules/vscode-languageserver-types/lib/umd/main.js"(exports2, module2) {
    (function(factory) {
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        var v = factory(require, exports2);
        if (v !== void 0) module2.exports = v;
      } else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
      }
    })(function(require2, exports3) {
      "use strict";
      Object.defineProperty(exports3, "__esModule", { value: true });
      exports3.TextDocument = exports3.EOL = exports3.WorkspaceFolder = exports3.InlineCompletionContext = exports3.SelectedCompletionInfo = exports3.InlineCompletionTriggerKind = exports3.InlineCompletionList = exports3.InlineCompletionItem = exports3.StringValue = exports3.InlayHint = exports3.InlayHintLabelPart = exports3.InlayHintKind = exports3.InlineValueContext = exports3.InlineValueEvaluatableExpression = exports3.InlineValueVariableLookup = exports3.InlineValueText = exports3.SemanticTokens = exports3.SemanticTokenModifiers = exports3.SemanticTokenTypes = exports3.SelectionRange = exports3.DocumentLink = exports3.FormattingOptions = exports3.CodeLens = exports3.CodeAction = exports3.CodeActionContext = exports3.CodeActionTriggerKind = exports3.CodeActionKind = exports3.DocumentSymbol = exports3.WorkspaceSymbol = exports3.SymbolInformation = exports3.SymbolTag = exports3.SymbolKind = exports3.DocumentHighlight = exports3.DocumentHighlightKind = exports3.SignatureInformation = exports3.ParameterInformation = exports3.Hover = exports3.MarkedString = exports3.CompletionList = exports3.CompletionItem = exports3.CompletionItemLabelDetails = exports3.InsertTextMode = exports3.InsertReplaceEdit = exports3.CompletionItemTag = exports3.InsertTextFormat = exports3.CompletionItemKind = exports3.MarkupContent = exports3.MarkupKind = exports3.TextDocumentItem = exports3.OptionalVersionedTextDocumentIdentifier = exports3.VersionedTextDocumentIdentifier = exports3.TextDocumentIdentifier = exports3.WorkspaceChange = exports3.WorkspaceEdit = exports3.DeleteFile = exports3.RenameFile = exports3.CreateFile = exports3.TextDocumentEdit = exports3.AnnotatedTextEdit = exports3.ChangeAnnotationIdentifier = exports3.ChangeAnnotation = exports3.TextEdit = exports3.Command = exports3.Diagnostic = exports3.CodeDescription = exports3.DiagnosticTag = exports3.DiagnosticSeverity = exports3.DiagnosticRelatedInformation = exports3.FoldingRange = exports3.FoldingRangeKind = exports3.ColorPresentation = exports3.ColorInformation = exports3.Color = exports3.LocationLink = exports3.Location = exports3.Range = exports3.Position = exports3.uinteger = exports3.integer = exports3.URI = exports3.DocumentUri = void 0;
      var DocumentUri;
      (function(DocumentUri2) {
        function is(value) {
          return typeof value === "string";
        }
        DocumentUri2.is = is;
      })(DocumentUri || (exports3.DocumentUri = DocumentUri = {}));
      var URI;
      (function(URI2) {
        function is(value) {
          return typeof value === "string";
        }
        URI2.is = is;
      })(URI || (exports3.URI = URI = {}));
      var integer;
      (function(integer2) {
        integer2.MIN_VALUE = -2147483648;
        integer2.MAX_VALUE = 2147483647;
        function is(value) {
          return typeof value === "number" && integer2.MIN_VALUE <= value && value <= integer2.MAX_VALUE;
        }
        integer2.is = is;
      })(integer || (exports3.integer = integer = {}));
      var uinteger;
      (function(uinteger2) {
        uinteger2.MIN_VALUE = 0;
        uinteger2.MAX_VALUE = 2147483647;
        function is(value) {
          return typeof value === "number" && uinteger2.MIN_VALUE <= value && value <= uinteger2.MAX_VALUE;
        }
        uinteger2.is = is;
      })(uinteger || (exports3.uinteger = uinteger = {}));
      var Position2;
      (function(Position3) {
        function create(line, character) {
          if (line === Number.MAX_VALUE) {
            line = uinteger.MAX_VALUE;
          }
          if (character === Number.MAX_VALUE) {
            character = uinteger.MAX_VALUE;
          }
          return { line, character };
        }
        Position3.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
        }
        Position3.is = is;
      })(Position2 || (exports3.Position = Position2 = {}));
      var Range2;
      (function(Range3) {
        function create(one, two, three, four) {
          if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
            return { start: Position2.create(one, two), end: Position2.create(three, four) };
          } else if (Position2.is(one) && Position2.is(two)) {
            return { start: one, end: two };
          } else {
            throw new Error("Range#create called with invalid arguments[".concat(one, ", ").concat(two, ", ").concat(three, ", ").concat(four, "]"));
          }
        }
        Range3.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Position2.is(candidate.start) && Position2.is(candidate.end);
        }
        Range3.is = is;
      })(Range2 || (exports3.Range = Range2 = {}));
      var Location;
      (function(Location2) {
        function create(uri, range) {
          return { uri, range };
        }
        Location2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Range2.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
        }
        Location2.is = is;
      })(Location || (exports3.Location = Location = {}));
      var LocationLink;
      (function(LocationLink2) {
        function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
          return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
        }
        LocationLink2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Range2.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range2.is(candidate.targetSelectionRange) && (Range2.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
        }
        LocationLink2.is = is;
      })(LocationLink || (exports3.LocationLink = LocationLink = {}));
      var Color;
      (function(Color2) {
        function create(red, green, blue, alpha) {
          return {
            red,
            green,
            blue,
            alpha
          };
        }
        Color2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
        }
        Color2.is = is;
      })(Color || (exports3.Color = Color = {}));
      var ColorInformation;
      (function(ColorInformation2) {
        function create(range, color) {
          return {
            range,
            color
          };
        }
        ColorInformation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Range2.is(candidate.range) && Color.is(candidate.color);
        }
        ColorInformation2.is = is;
      })(ColorInformation || (exports3.ColorInformation = ColorInformation = {}));
      var ColorPresentation;
      (function(ColorPresentation2) {
        function create(label, textEdit, additionalTextEdits) {
          return {
            label,
            textEdit,
            additionalTextEdits
          };
        }
        ColorPresentation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit3.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit3.is));
        }
        ColorPresentation2.is = is;
      })(ColorPresentation || (exports3.ColorPresentation = ColorPresentation = {}));
      var FoldingRangeKind;
      (function(FoldingRangeKind2) {
        FoldingRangeKind2.Comment = "comment";
        FoldingRangeKind2.Imports = "imports";
        FoldingRangeKind2.Region = "region";
      })(FoldingRangeKind || (exports3.FoldingRangeKind = FoldingRangeKind = {}));
      var FoldingRange;
      (function(FoldingRange2) {
        function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
          var result = {
            startLine,
            endLine
          };
          if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
          }
          if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
          }
          if (Is.defined(kind)) {
            result.kind = kind;
          }
          if (Is.defined(collapsedText)) {
            result.collapsedText = collapsedText;
          }
          return result;
        }
        FoldingRange2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
        }
        FoldingRange2.is = is;
      })(FoldingRange || (exports3.FoldingRange = FoldingRange = {}));
      var DiagnosticRelatedInformation;
      (function(DiagnosticRelatedInformation2) {
        function create(location, message) {
          return {
            location,
            message
          };
        }
        DiagnosticRelatedInformation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
        }
        DiagnosticRelatedInformation2.is = is;
      })(DiagnosticRelatedInformation || (exports3.DiagnosticRelatedInformation = DiagnosticRelatedInformation = {}));
      var DiagnosticSeverity2;
      (function(DiagnosticSeverity3) {
        DiagnosticSeverity3.Error = 1;
        DiagnosticSeverity3.Warning = 2;
        DiagnosticSeverity3.Information = 3;
        DiagnosticSeverity3.Hint = 4;
      })(DiagnosticSeverity2 || (exports3.DiagnosticSeverity = DiagnosticSeverity2 = {}));
      var DiagnosticTag;
      (function(DiagnosticTag2) {
        DiagnosticTag2.Unnecessary = 1;
        DiagnosticTag2.Deprecated = 2;
      })(DiagnosticTag || (exports3.DiagnosticTag = DiagnosticTag = {}));
      var CodeDescription;
      (function(CodeDescription2) {
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.string(candidate.href);
        }
        CodeDescription2.is = is;
      })(CodeDescription || (exports3.CodeDescription = CodeDescription = {}));
      var Diagnostic2;
      (function(Diagnostic3) {
        function create(range, message, severity, code, source, relatedInformation) {
          var result = { range, message };
          if (Is.defined(severity)) {
            result.severity = severity;
          }
          if (Is.defined(code)) {
            result.code = code;
          }
          if (Is.defined(source)) {
            result.source = source;
          }
          if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
          }
          return result;
        }
        Diagnostic3.create = create;
        function is(value) {
          var _a;
          var candidate = value;
          return Is.defined(candidate) && Range2.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
        }
        Diagnostic3.is = is;
      })(Diagnostic2 || (exports3.Diagnostic = Diagnostic2 = {}));
      var Command2;
      (function(Command3) {
        function create(title, command2) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
          }
          var result = { title, command: command2 };
          if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
          }
          return result;
        }
        Command3.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
        }
        Command3.is = is;
      })(Command2 || (exports3.Command = Command2 = {}));
      var TextEdit3;
      (function(TextEdit4) {
        function replace(range, newText) {
          return { range, newText };
        }
        TextEdit4.replace = replace;
        function insert(position, newText) {
          return { range: { start: position, end: position }, newText };
        }
        TextEdit4.insert = insert;
        function del(range) {
          return { range, newText: "" };
        }
        TextEdit4.del = del;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range2.is(candidate.range);
        }
        TextEdit4.is = is;
      })(TextEdit3 || (exports3.TextEdit = TextEdit3 = {}));
      var ChangeAnnotation;
      (function(ChangeAnnotation2) {
        function create(label, needsConfirmation, description) {
          var result = { label };
          if (needsConfirmation !== void 0) {
            result.needsConfirmation = needsConfirmation;
          }
          if (description !== void 0) {
            result.description = description;
          }
          return result;
        }
        ChangeAnnotation2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
        }
        ChangeAnnotation2.is = is;
      })(ChangeAnnotation || (exports3.ChangeAnnotation = ChangeAnnotation = {}));
      var ChangeAnnotationIdentifier;
      (function(ChangeAnnotationIdentifier2) {
        function is(value) {
          var candidate = value;
          return Is.string(candidate);
        }
        ChangeAnnotationIdentifier2.is = is;
      })(ChangeAnnotationIdentifier || (exports3.ChangeAnnotationIdentifier = ChangeAnnotationIdentifier = {}));
      var AnnotatedTextEdit;
      (function(AnnotatedTextEdit2) {
        function replace(range, newText, annotation) {
          return { range, newText, annotationId: annotation };
        }
        AnnotatedTextEdit2.replace = replace;
        function insert(position, newText, annotation) {
          return { range: { start: position, end: position }, newText, annotationId: annotation };
        }
        AnnotatedTextEdit2.insert = insert;
        function del(range, annotation) {
          return { range, newText: "", annotationId: annotation };
        }
        AnnotatedTextEdit2.del = del;
        function is(value) {
          var candidate = value;
          return TextEdit3.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
        }
        AnnotatedTextEdit2.is = is;
      })(AnnotatedTextEdit || (exports3.AnnotatedTextEdit = AnnotatedTextEdit = {}));
      var TextDocumentEdit;
      (function(TextDocumentEdit2) {
        function create(textDocument, edits) {
          return { textDocument, edits };
        }
        TextDocumentEdit2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
        }
        TextDocumentEdit2.is = is;
      })(TextDocumentEdit || (exports3.TextDocumentEdit = TextDocumentEdit = {}));
      var CreateFile;
      (function(CreateFile2) {
        function create(uri, options, annotation) {
          var result = {
            kind: "create",
            uri
          };
          if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
          }
          if (annotation !== void 0) {
            result.annotationId = annotation;
          }
          return result;
        }
        CreateFile2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
        }
        CreateFile2.is = is;
      })(CreateFile || (exports3.CreateFile = CreateFile = {}));
      var RenameFile;
      (function(RenameFile2) {
        function create(oldUri, newUri, options, annotation) {
          var result = {
            kind: "rename",
            oldUri,
            newUri
          };
          if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
          }
          if (annotation !== void 0) {
            result.annotationId = annotation;
          }
          return result;
        }
        RenameFile2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
        }
        RenameFile2.is = is;
      })(RenameFile || (exports3.RenameFile = RenameFile = {}));
      var DeleteFile;
      (function(DeleteFile2) {
        function create(uri, options, annotation) {
          var result = {
            kind: "delete",
            uri
          };
          if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
            result.options = options;
          }
          if (annotation !== void 0) {
            result.annotationId = annotation;
          }
          return result;
        }
        DeleteFile2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
        }
        DeleteFile2.is = is;
      })(DeleteFile || (exports3.DeleteFile = DeleteFile = {}));
      var WorkspaceEdit;
      (function(WorkspaceEdit2) {
        function is(value) {
          var candidate = value;
          return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every(function(change) {
            if (Is.string(change.kind)) {
              return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
            } else {
              return TextDocumentEdit.is(change);
            }
          }));
        }
        WorkspaceEdit2.is = is;
      })(WorkspaceEdit || (exports3.WorkspaceEdit = WorkspaceEdit = {}));
      var TextEditChangeImpl = (
        /** @class */
        (function() {
          function TextEditChangeImpl2(edits, changeAnnotations) {
            this.edits = edits;
            this.changeAnnotations = changeAnnotations;
          }
          TextEditChangeImpl2.prototype.insert = function(position, newText, annotation) {
            var edit;
            var id;
            if (annotation === void 0) {
              edit = TextEdit3.insert(position, newText);
            } else if (ChangeAnnotationIdentifier.is(annotation)) {
              id = annotation;
              edit = AnnotatedTextEdit.insert(position, newText, annotation);
            } else {
              this.assertChangeAnnotations(this.changeAnnotations);
              id = this.changeAnnotations.manage(annotation);
              edit = AnnotatedTextEdit.insert(position, newText, id);
            }
            this.edits.push(edit);
            if (id !== void 0) {
              return id;
            }
          };
          TextEditChangeImpl2.prototype.replace = function(range, newText, annotation) {
            var edit;
            var id;
            if (annotation === void 0) {
              edit = TextEdit3.replace(range, newText);
            } else if (ChangeAnnotationIdentifier.is(annotation)) {
              id = annotation;
              edit = AnnotatedTextEdit.replace(range, newText, annotation);
            } else {
              this.assertChangeAnnotations(this.changeAnnotations);
              id = this.changeAnnotations.manage(annotation);
              edit = AnnotatedTextEdit.replace(range, newText, id);
            }
            this.edits.push(edit);
            if (id !== void 0) {
              return id;
            }
          };
          TextEditChangeImpl2.prototype.delete = function(range, annotation) {
            var edit;
            var id;
            if (annotation === void 0) {
              edit = TextEdit3.del(range);
            } else if (ChangeAnnotationIdentifier.is(annotation)) {
              id = annotation;
              edit = AnnotatedTextEdit.del(range, annotation);
            } else {
              this.assertChangeAnnotations(this.changeAnnotations);
              id = this.changeAnnotations.manage(annotation);
              edit = AnnotatedTextEdit.del(range, id);
            }
            this.edits.push(edit);
            if (id !== void 0) {
              return id;
            }
          };
          TextEditChangeImpl2.prototype.add = function(edit) {
            this.edits.push(edit);
          };
          TextEditChangeImpl2.prototype.all = function() {
            return this.edits;
          };
          TextEditChangeImpl2.prototype.clear = function() {
            this.edits.splice(0, this.edits.length);
          };
          TextEditChangeImpl2.prototype.assertChangeAnnotations = function(value) {
            if (value === void 0) {
              throw new Error("Text edit change is not configured to manage change annotations.");
            }
          };
          return TextEditChangeImpl2;
        })()
      );
      var ChangeAnnotations = (
        /** @class */
        (function() {
          function ChangeAnnotations2(annotations) {
            this._annotations = annotations === void 0 ? /* @__PURE__ */ Object.create(null) : annotations;
            this._counter = 0;
            this._size = 0;
          }
          ChangeAnnotations2.prototype.all = function() {
            return this._annotations;
          };
          Object.defineProperty(ChangeAnnotations2.prototype, "size", {
            get: function() {
              return this._size;
            },
            enumerable: false,
            configurable: true
          });
          ChangeAnnotations2.prototype.manage = function(idOrAnnotation, annotation) {
            var id;
            if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
              id = idOrAnnotation;
            } else {
              id = this.nextId();
              annotation = idOrAnnotation;
            }
            if (this._annotations[id] !== void 0) {
              throw new Error("Id ".concat(id, " is already in use."));
            }
            if (annotation === void 0) {
              throw new Error("No annotation provided for id ".concat(id));
            }
            this._annotations[id] = annotation;
            this._size++;
            return id;
          };
          ChangeAnnotations2.prototype.nextId = function() {
            this._counter++;
            return this._counter.toString();
          };
          return ChangeAnnotations2;
        })()
      );
      var WorkspaceChange = (
        /** @class */
        (function() {
          function WorkspaceChange2(workspaceEdit) {
            var _this = this;
            this._textEditChanges = /* @__PURE__ */ Object.create(null);
            if (workspaceEdit !== void 0) {
              this._workspaceEdit = workspaceEdit;
              if (workspaceEdit.documentChanges) {
                this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
                workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                workspaceEdit.documentChanges.forEach(function(change) {
                  if (TextDocumentEdit.is(change)) {
                    var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
                    _this._textEditChanges[change.textDocument.uri] = textEditChange;
                  }
                });
              } else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function(key) {
                  var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                  _this._textEditChanges[key] = textEditChange;
                });
              }
            } else {
              this._workspaceEdit = {};
            }
          }
          Object.defineProperty(WorkspaceChange2.prototype, "edit", {
            /**
             * Returns the underlying {@link WorkspaceEdit} literal
             * use to be returned from a workspace edit operation like rename.
             */
            get: function() {
              this.initDocumentChanges();
              if (this._changeAnnotations !== void 0) {
                if (this._changeAnnotations.size === 0) {
                  this._workspaceEdit.changeAnnotations = void 0;
                } else {
                  this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                }
              }
              return this._workspaceEdit;
            },
            enumerable: false,
            configurable: true
          });
          WorkspaceChange2.prototype.getTextEditChange = function(key) {
            if (OptionalVersionedTextDocumentIdentifier.is(key)) {
              this.initDocumentChanges();
              if (this._workspaceEdit.documentChanges === void 0) {
                throw new Error("Workspace edit is not configured for document changes.");
              }
              var textDocument = { uri: key.uri, version: key.version };
              var result = this._textEditChanges[textDocument.uri];
              if (!result) {
                var edits = [];
                var textDocumentEdit = {
                  textDocument,
                  edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits, this._changeAnnotations);
                this._textEditChanges[textDocument.uri] = result;
              }
              return result;
            } else {
              this.initChanges();
              if (this._workspaceEdit.changes === void 0) {
                throw new Error("Workspace edit is not configured for normal text edit changes.");
              }
              var result = this._textEditChanges[key];
              if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
              }
              return result;
            }
          };
          WorkspaceChange2.prototype.initDocumentChanges = function() {
            if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
              this._changeAnnotations = new ChangeAnnotations();
              this._workspaceEdit.documentChanges = [];
              this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
            }
          };
          WorkspaceChange2.prototype.initChanges = function() {
            if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
              this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null);
            }
          };
          WorkspaceChange2.prototype.createFile = function(uri, optionsOrAnnotation, options) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === void 0) {
              throw new Error("Workspace edit is not configured for document changes.");
            }
            var annotation;
            if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
              annotation = optionsOrAnnotation;
            } else {
              options = optionsOrAnnotation;
            }
            var operation;
            var id;
            if (annotation === void 0) {
              operation = CreateFile.create(uri, options);
            } else {
              id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
              operation = CreateFile.create(uri, options, id);
            }
            this._workspaceEdit.documentChanges.push(operation);
            if (id !== void 0) {
              return id;
            }
          };
          WorkspaceChange2.prototype.renameFile = function(oldUri, newUri, optionsOrAnnotation, options) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === void 0) {
              throw new Error("Workspace edit is not configured for document changes.");
            }
            var annotation;
            if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
              annotation = optionsOrAnnotation;
            } else {
              options = optionsOrAnnotation;
            }
            var operation;
            var id;
            if (annotation === void 0) {
              operation = RenameFile.create(oldUri, newUri, options);
            } else {
              id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
              operation = RenameFile.create(oldUri, newUri, options, id);
            }
            this._workspaceEdit.documentChanges.push(operation);
            if (id !== void 0) {
              return id;
            }
          };
          WorkspaceChange2.prototype.deleteFile = function(uri, optionsOrAnnotation, options) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === void 0) {
              throw new Error("Workspace edit is not configured for document changes.");
            }
            var annotation;
            if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
              annotation = optionsOrAnnotation;
            } else {
              options = optionsOrAnnotation;
            }
            var operation;
            var id;
            if (annotation === void 0) {
              operation = DeleteFile.create(uri, options);
            } else {
              id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
              operation = DeleteFile.create(uri, options, id);
            }
            this._workspaceEdit.documentChanges.push(operation);
            if (id !== void 0) {
              return id;
            }
          };
          return WorkspaceChange2;
        })()
      );
      exports3.WorkspaceChange = WorkspaceChange;
      var TextDocumentIdentifier;
      (function(TextDocumentIdentifier2) {
        function create(uri) {
          return { uri };
        }
        TextDocumentIdentifier2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri);
        }
        TextDocumentIdentifier2.is = is;
      })(TextDocumentIdentifier || (exports3.TextDocumentIdentifier = TextDocumentIdentifier = {}));
      var VersionedTextDocumentIdentifier;
      (function(VersionedTextDocumentIdentifier2) {
        function create(uri, version) {
          return { uri, version };
        }
        VersionedTextDocumentIdentifier2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
        }
        VersionedTextDocumentIdentifier2.is = is;
      })(VersionedTextDocumentIdentifier || (exports3.VersionedTextDocumentIdentifier = VersionedTextDocumentIdentifier = {}));
      var OptionalVersionedTextDocumentIdentifier;
      (function(OptionalVersionedTextDocumentIdentifier2) {
        function create(uri, version) {
          return { uri, version };
        }
        OptionalVersionedTextDocumentIdentifier2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
        }
        OptionalVersionedTextDocumentIdentifier2.is = is;
      })(OptionalVersionedTextDocumentIdentifier || (exports3.OptionalVersionedTextDocumentIdentifier = OptionalVersionedTextDocumentIdentifier = {}));
      var TextDocumentItem;
      (function(TextDocumentItem2) {
        function create(uri, languageId, version, text) {
          return { uri, languageId, version, text };
        }
        TextDocumentItem2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
        }
        TextDocumentItem2.is = is;
      })(TextDocumentItem || (exports3.TextDocumentItem = TextDocumentItem = {}));
      var MarkupKind2;
      (function(MarkupKind3) {
        MarkupKind3.PlainText = "plaintext";
        MarkupKind3.Markdown = "markdown";
        function is(value) {
          var candidate = value;
          return candidate === MarkupKind3.PlainText || candidate === MarkupKind3.Markdown;
        }
        MarkupKind3.is = is;
      })(MarkupKind2 || (exports3.MarkupKind = MarkupKind2 = {}));
      var MarkupContent;
      (function(MarkupContent2) {
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(value) && MarkupKind2.is(candidate.kind) && Is.string(candidate.value);
        }
        MarkupContent2.is = is;
      })(MarkupContent || (exports3.MarkupContent = MarkupContent = {}));
      var CompletionItemKind2;
      (function(CompletionItemKind3) {
        CompletionItemKind3.Text = 1;
        CompletionItemKind3.Method = 2;
        CompletionItemKind3.Function = 3;
        CompletionItemKind3.Constructor = 4;
        CompletionItemKind3.Field = 5;
        CompletionItemKind3.Variable = 6;
        CompletionItemKind3.Class = 7;
        CompletionItemKind3.Interface = 8;
        CompletionItemKind3.Module = 9;
        CompletionItemKind3.Property = 10;
        CompletionItemKind3.Unit = 11;
        CompletionItemKind3.Value = 12;
        CompletionItemKind3.Enum = 13;
        CompletionItemKind3.Keyword = 14;
        CompletionItemKind3.Snippet = 15;
        CompletionItemKind3.Color = 16;
        CompletionItemKind3.File = 17;
        CompletionItemKind3.Reference = 18;
        CompletionItemKind3.Folder = 19;
        CompletionItemKind3.EnumMember = 20;
        CompletionItemKind3.Constant = 21;
        CompletionItemKind3.Struct = 22;
        CompletionItemKind3.Event = 23;
        CompletionItemKind3.Operator = 24;
        CompletionItemKind3.TypeParameter = 25;
      })(CompletionItemKind2 || (exports3.CompletionItemKind = CompletionItemKind2 = {}));
      var InsertTextFormat;
      (function(InsertTextFormat2) {
        InsertTextFormat2.PlainText = 1;
        InsertTextFormat2.Snippet = 2;
      })(InsertTextFormat || (exports3.InsertTextFormat = InsertTextFormat = {}));
      var CompletionItemTag;
      (function(CompletionItemTag2) {
        CompletionItemTag2.Deprecated = 1;
      })(CompletionItemTag || (exports3.CompletionItemTag = CompletionItemTag = {}));
      var InsertReplaceEdit;
      (function(InsertReplaceEdit2) {
        function create(newText, insert, replace) {
          return { newText, insert, replace };
        }
        InsertReplaceEdit2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && Is.string(candidate.newText) && Range2.is(candidate.insert) && Range2.is(candidate.replace);
        }
        InsertReplaceEdit2.is = is;
      })(InsertReplaceEdit || (exports3.InsertReplaceEdit = InsertReplaceEdit = {}));
      var InsertTextMode;
      (function(InsertTextMode2) {
        InsertTextMode2.asIs = 1;
        InsertTextMode2.adjustIndentation = 2;
      })(InsertTextMode || (exports3.InsertTextMode = InsertTextMode = {}));
      var CompletionItemLabelDetails;
      (function(CompletionItemLabelDetails2) {
        function is(value) {
          var candidate = value;
          return candidate && (Is.string(candidate.detail) || candidate.detail === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
        }
        CompletionItemLabelDetails2.is = is;
      })(CompletionItemLabelDetails || (exports3.CompletionItemLabelDetails = CompletionItemLabelDetails = {}));
      var CompletionItem2;
      (function(CompletionItem3) {
        function create(label) {
          return { label };
        }
        CompletionItem3.create = create;
      })(CompletionItem2 || (exports3.CompletionItem = CompletionItem2 = {}));
      var CompletionList;
      (function(CompletionList2) {
        function create(items, isIncomplete) {
          return { items: items ? items : [], isIncomplete: !!isIncomplete };
        }
        CompletionList2.create = create;
      })(CompletionList || (exports3.CompletionList = CompletionList = {}));
      var MarkedString;
      (function(MarkedString2) {
        function fromPlainText(plainText) {
          return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
        }
        MarkedString2.fromPlainText = fromPlainText;
        function is(value) {
          var candidate = value;
          return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
        }
        MarkedString2.is = is;
      })(MarkedString || (exports3.MarkedString = MarkedString = {}));
      var Hover2;
      (function(Hover3) {
        function is(value) {
          var candidate = value;
          return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range2.is(value.range));
        }
        Hover3.is = is;
      })(Hover2 || (exports3.Hover = Hover2 = {}));
      var ParameterInformation;
      (function(ParameterInformation2) {
        function create(label, documentation) {
          return documentation ? { label, documentation } : { label };
        }
        ParameterInformation2.create = create;
      })(ParameterInformation || (exports3.ParameterInformation = ParameterInformation = {}));
      var SignatureInformation;
      (function(SignatureInformation2) {
        function create(label, documentation) {
          var parameters = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
          }
          var result = { label };
          if (Is.defined(documentation)) {
            result.documentation = documentation;
          }
          if (Is.defined(parameters)) {
            result.parameters = parameters;
          } else {
            result.parameters = [];
          }
          return result;
        }
        SignatureInformation2.create = create;
      })(SignatureInformation || (exports3.SignatureInformation = SignatureInformation = {}));
      var DocumentHighlightKind;
      (function(DocumentHighlightKind2) {
        DocumentHighlightKind2.Text = 1;
        DocumentHighlightKind2.Read = 2;
        DocumentHighlightKind2.Write = 3;
      })(DocumentHighlightKind || (exports3.DocumentHighlightKind = DocumentHighlightKind = {}));
      var DocumentHighlight;
      (function(DocumentHighlight2) {
        function create(range, kind) {
          var result = { range };
          if (Is.number(kind)) {
            result.kind = kind;
          }
          return result;
        }
        DocumentHighlight2.create = create;
      })(DocumentHighlight || (exports3.DocumentHighlight = DocumentHighlight = {}));
      var SymbolKind;
      (function(SymbolKind2) {
        SymbolKind2.File = 1;
        SymbolKind2.Module = 2;
        SymbolKind2.Namespace = 3;
        SymbolKind2.Package = 4;
        SymbolKind2.Class = 5;
        SymbolKind2.Method = 6;
        SymbolKind2.Property = 7;
        SymbolKind2.Field = 8;
        SymbolKind2.Constructor = 9;
        SymbolKind2.Enum = 10;
        SymbolKind2.Interface = 11;
        SymbolKind2.Function = 12;
        SymbolKind2.Variable = 13;
        SymbolKind2.Constant = 14;
        SymbolKind2.String = 15;
        SymbolKind2.Number = 16;
        SymbolKind2.Boolean = 17;
        SymbolKind2.Array = 18;
        SymbolKind2.Object = 19;
        SymbolKind2.Key = 20;
        SymbolKind2.Null = 21;
        SymbolKind2.EnumMember = 22;
        SymbolKind2.Struct = 23;
        SymbolKind2.Event = 24;
        SymbolKind2.Operator = 25;
        SymbolKind2.TypeParameter = 26;
      })(SymbolKind || (exports3.SymbolKind = SymbolKind = {}));
      var SymbolTag;
      (function(SymbolTag2) {
        SymbolTag2.Deprecated = 1;
      })(SymbolTag || (exports3.SymbolTag = SymbolTag = {}));
      var SymbolInformation;
      (function(SymbolInformation2) {
        function create(name, kind, range, uri, containerName) {
          var result = {
            name,
            kind,
            location: { uri, range }
          };
          if (containerName) {
            result.containerName = containerName;
          }
          return result;
        }
        SymbolInformation2.create = create;
      })(SymbolInformation || (exports3.SymbolInformation = SymbolInformation = {}));
      var WorkspaceSymbol;
      (function(WorkspaceSymbol2) {
        function create(name, kind, uri, range) {
          return range !== void 0 ? { name, kind, location: { uri, range } } : { name, kind, location: { uri } };
        }
        WorkspaceSymbol2.create = create;
      })(WorkspaceSymbol || (exports3.WorkspaceSymbol = WorkspaceSymbol = {}));
      var DocumentSymbol;
      (function(DocumentSymbol2) {
        function create(name, detail, kind, range, selectionRange, children) {
          var result = {
            name,
            detail,
            kind,
            range,
            selectionRange
          };
          if (children !== void 0) {
            result.children = children;
          }
          return result;
        }
        DocumentSymbol2.create = create;
        function is(value) {
          var candidate = value;
          return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range2.is(candidate.range) && Range2.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
        }
        DocumentSymbol2.is = is;
      })(DocumentSymbol || (exports3.DocumentSymbol = DocumentSymbol = {}));
      var CodeActionKind2;
      (function(CodeActionKind3) {
        CodeActionKind3.Empty = "";
        CodeActionKind3.QuickFix = "quickfix";
        CodeActionKind3.Refactor = "refactor";
        CodeActionKind3.RefactorExtract = "refactor.extract";
        CodeActionKind3.RefactorInline = "refactor.inline";
        CodeActionKind3.RefactorRewrite = "refactor.rewrite";
        CodeActionKind3.Source = "source";
        CodeActionKind3.SourceOrganizeImports = "source.organizeImports";
        CodeActionKind3.SourceFixAll = "source.fixAll";
      })(CodeActionKind2 || (exports3.CodeActionKind = CodeActionKind2 = {}));
      var CodeActionTriggerKind;
      (function(CodeActionTriggerKind2) {
        CodeActionTriggerKind2.Invoked = 1;
        CodeActionTriggerKind2.Automatic = 2;
      })(CodeActionTriggerKind || (exports3.CodeActionTriggerKind = CodeActionTriggerKind = {}));
      var CodeActionContext;
      (function(CodeActionContext2) {
        function create(diagnostics, only, triggerKind) {
          var result = { diagnostics };
          if (only !== void 0 && only !== null) {
            result.only = only;
          }
          if (triggerKind !== void 0 && triggerKind !== null) {
            result.triggerKind = triggerKind;
          }
          return result;
        }
        CodeActionContext2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic2.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
        }
        CodeActionContext2.is = is;
      })(CodeActionContext || (exports3.CodeActionContext = CodeActionContext = {}));
      var CodeAction2;
      (function(CodeAction3) {
        function create(title, kindOrCommandOrEdit, kind) {
          var result = { title };
          var checkKind = true;
          if (typeof kindOrCommandOrEdit === "string") {
            checkKind = false;
            result.kind = kindOrCommandOrEdit;
          } else if (Command2.is(kindOrCommandOrEdit)) {
            result.command = kindOrCommandOrEdit;
          } else {
            result.edit = kindOrCommandOrEdit;
          }
          if (checkKind && kind !== void 0) {
            result.kind = kind;
          }
          return result;
        }
        CodeAction3.create = create;
        function is(value) {
          var candidate = value;
          return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic2.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command2.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
        }
        CodeAction3.is = is;
      })(CodeAction2 || (exports3.CodeAction = CodeAction2 = {}));
      var CodeLens2;
      (function(CodeLens3) {
        function create(range, data) {
          var result = { range };
          if (Is.defined(data)) {
            result.data = data;
          }
          return result;
        }
        CodeLens3.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range2.is(candidate.range) && (Is.undefined(candidate.command) || Command2.is(candidate.command));
        }
        CodeLens3.is = is;
      })(CodeLens2 || (exports3.CodeLens = CodeLens2 = {}));
      var FormattingOptions;
      (function(FormattingOptions2) {
        function create(tabSize, insertSpaces) {
          return { tabSize, insertSpaces };
        }
        FormattingOptions2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
        }
        FormattingOptions2.is = is;
      })(FormattingOptions || (exports3.FormattingOptions = FormattingOptions = {}));
      var DocumentLink;
      (function(DocumentLink2) {
        function create(range, target, data) {
          return { range, target, data };
        }
        DocumentLink2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range2.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
        }
        DocumentLink2.is = is;
      })(DocumentLink || (exports3.DocumentLink = DocumentLink = {}));
      var SelectionRange;
      (function(SelectionRange2) {
        function create(range, parent) {
          return { range, parent };
        }
        SelectionRange2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Range2.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
        }
        SelectionRange2.is = is;
      })(SelectionRange || (exports3.SelectionRange = SelectionRange = {}));
      var SemanticTokenTypes;
      (function(SemanticTokenTypes2) {
        SemanticTokenTypes2["namespace"] = "namespace";
        SemanticTokenTypes2["type"] = "type";
        SemanticTokenTypes2["class"] = "class";
        SemanticTokenTypes2["enum"] = "enum";
        SemanticTokenTypes2["interface"] = "interface";
        SemanticTokenTypes2["struct"] = "struct";
        SemanticTokenTypes2["typeParameter"] = "typeParameter";
        SemanticTokenTypes2["parameter"] = "parameter";
        SemanticTokenTypes2["variable"] = "variable";
        SemanticTokenTypes2["property"] = "property";
        SemanticTokenTypes2["enumMember"] = "enumMember";
        SemanticTokenTypes2["event"] = "event";
        SemanticTokenTypes2["function"] = "function";
        SemanticTokenTypes2["method"] = "method";
        SemanticTokenTypes2["macro"] = "macro";
        SemanticTokenTypes2["keyword"] = "keyword";
        SemanticTokenTypes2["modifier"] = "modifier";
        SemanticTokenTypes2["comment"] = "comment";
        SemanticTokenTypes2["string"] = "string";
        SemanticTokenTypes2["number"] = "number";
        SemanticTokenTypes2["regexp"] = "regexp";
        SemanticTokenTypes2["operator"] = "operator";
        SemanticTokenTypes2["decorator"] = "decorator";
      })(SemanticTokenTypes || (exports3.SemanticTokenTypes = SemanticTokenTypes = {}));
      var SemanticTokenModifiers;
      (function(SemanticTokenModifiers2) {
        SemanticTokenModifiers2["declaration"] = "declaration";
        SemanticTokenModifiers2["definition"] = "definition";
        SemanticTokenModifiers2["readonly"] = "readonly";
        SemanticTokenModifiers2["static"] = "static";
        SemanticTokenModifiers2["deprecated"] = "deprecated";
        SemanticTokenModifiers2["abstract"] = "abstract";
        SemanticTokenModifiers2["async"] = "async";
        SemanticTokenModifiers2["modification"] = "modification";
        SemanticTokenModifiers2["documentation"] = "documentation";
        SemanticTokenModifiers2["defaultLibrary"] = "defaultLibrary";
      })(SemanticTokenModifiers || (exports3.SemanticTokenModifiers = SemanticTokenModifiers = {}));
      var SemanticTokens;
      (function(SemanticTokens2) {
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
        }
        SemanticTokens2.is = is;
      })(SemanticTokens || (exports3.SemanticTokens = SemanticTokens = {}));
      var InlineValueText;
      (function(InlineValueText2) {
        function create(range, text) {
          return { range, text };
        }
        InlineValueText2.create = create;
        function is(value) {
          var candidate = value;
          return candidate !== void 0 && candidate !== null && Range2.is(candidate.range) && Is.string(candidate.text);
        }
        InlineValueText2.is = is;
      })(InlineValueText || (exports3.InlineValueText = InlineValueText = {}));
      var InlineValueVariableLookup;
      (function(InlineValueVariableLookup2) {
        function create(range, variableName, caseSensitiveLookup) {
          return { range, variableName, caseSensitiveLookup };
        }
        InlineValueVariableLookup2.create = create;
        function is(value) {
          var candidate = value;
          return candidate !== void 0 && candidate !== null && Range2.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === void 0);
        }
        InlineValueVariableLookup2.is = is;
      })(InlineValueVariableLookup || (exports3.InlineValueVariableLookup = InlineValueVariableLookup = {}));
      var InlineValueEvaluatableExpression;
      (function(InlineValueEvaluatableExpression2) {
        function create(range, expression) {
          return { range, expression };
        }
        InlineValueEvaluatableExpression2.create = create;
        function is(value) {
          var candidate = value;
          return candidate !== void 0 && candidate !== null && Range2.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === void 0);
        }
        InlineValueEvaluatableExpression2.is = is;
      })(InlineValueEvaluatableExpression || (exports3.InlineValueEvaluatableExpression = InlineValueEvaluatableExpression = {}));
      var InlineValueContext;
      (function(InlineValueContext2) {
        function create(frameId, stoppedLocation) {
          return { frameId, stoppedLocation };
        }
        InlineValueContext2.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Range2.is(value.stoppedLocation);
        }
        InlineValueContext2.is = is;
      })(InlineValueContext || (exports3.InlineValueContext = InlineValueContext = {}));
      var InlayHintKind;
      (function(InlayHintKind2) {
        InlayHintKind2.Type = 1;
        InlayHintKind2.Parameter = 2;
        function is(value) {
          return value === 1 || value === 2;
        }
        InlayHintKind2.is = is;
      })(InlayHintKind || (exports3.InlayHintKind = InlayHintKind = {}));
      var InlayHintLabelPart;
      (function(InlayHintLabelPart2) {
        function create(value) {
          return { value };
        }
        InlayHintLabelPart2.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command2.is(candidate.command));
        }
        InlayHintLabelPart2.is = is;
      })(InlayHintLabelPart || (exports3.InlayHintLabelPart = InlayHintLabelPart = {}));
      var InlayHint2;
      (function(InlayHint3) {
        function create(position, label, kind) {
          var result = { position, label };
          if (kind !== void 0) {
            result.kind = kind;
          }
          return result;
        }
        InlayHint3.create = create;
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && Position2.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is.typedArray(candidate.textEdits, TextEdit3.is) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight));
        }
        InlayHint3.is = is;
      })(InlayHint2 || (exports3.InlayHint = InlayHint2 = {}));
      var StringValue;
      (function(StringValue2) {
        function createSnippet(value) {
          return { kind: "snippet", value };
        }
        StringValue2.createSnippet = createSnippet;
      })(StringValue || (exports3.StringValue = StringValue = {}));
      var InlineCompletionItem;
      (function(InlineCompletionItem2) {
        function create(insertText, filterText, range, command2) {
          return { insertText, filterText, range, command: command2 };
        }
        InlineCompletionItem2.create = create;
      })(InlineCompletionItem || (exports3.InlineCompletionItem = InlineCompletionItem = {}));
      var InlineCompletionList;
      (function(InlineCompletionList2) {
        function create(items) {
          return { items };
        }
        InlineCompletionList2.create = create;
      })(InlineCompletionList || (exports3.InlineCompletionList = InlineCompletionList = {}));
      var InlineCompletionTriggerKind;
      (function(InlineCompletionTriggerKind2) {
        InlineCompletionTriggerKind2.Invoked = 0;
        InlineCompletionTriggerKind2.Automatic = 1;
      })(InlineCompletionTriggerKind || (exports3.InlineCompletionTriggerKind = InlineCompletionTriggerKind = {}));
      var SelectedCompletionInfo;
      (function(SelectedCompletionInfo2) {
        function create(range, text) {
          return { range, text };
        }
        SelectedCompletionInfo2.create = create;
      })(SelectedCompletionInfo || (exports3.SelectedCompletionInfo = SelectedCompletionInfo = {}));
      var InlineCompletionContext;
      (function(InlineCompletionContext2) {
        function create(triggerKind, selectedCompletionInfo) {
          return { triggerKind, selectedCompletionInfo };
        }
        InlineCompletionContext2.create = create;
      })(InlineCompletionContext || (exports3.InlineCompletionContext = InlineCompletionContext = {}));
      var WorkspaceFolder;
      (function(WorkspaceFolder2) {
        function is(value) {
          var candidate = value;
          return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
        }
        WorkspaceFolder2.is = is;
      })(WorkspaceFolder || (exports3.WorkspaceFolder = WorkspaceFolder = {}));
      exports3.EOL = ["\n", "\r\n", "\r"];
      var TextDocument6;
      (function(TextDocument7) {
        function create(uri, languageId, version, content) {
          return new FullTextDocument2(uri, languageId, version, content);
        }
        TextDocument7.create = create;
        function is(value) {
          var candidate = value;
          return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
        }
        TextDocument7.is = is;
        function applyEdits2(document, edits) {
          var text = document.getText();
          var sortedEdits = mergeSort2(edits, function(a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
              return a.range.start.character - b.range.start.character;
            }
            return diff;
          });
          var lastModifiedOffset = text.length;
          for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
              text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            } else {
              throw new Error("Overlapping edit");
            }
            lastModifiedOffset = startOffset;
          }
          return text;
        }
        TextDocument7.applyEdits = applyEdits2;
        function mergeSort2(data, compare2) {
          if (data.length <= 1) {
            return data;
          }
          var p = data.length / 2 | 0;
          var left = data.slice(0, p);
          var right = data.slice(p);
          mergeSort2(left, compare2);
          mergeSort2(right, compare2);
          var leftIdx = 0;
          var rightIdx = 0;
          var i = 0;
          while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare2(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
              data[i++] = left[leftIdx++];
            } else {
              data[i++] = right[rightIdx++];
            }
          }
          while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
          }
          while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
          }
          return data;
        }
      })(TextDocument6 || (exports3.TextDocument = TextDocument6 = {}));
      var FullTextDocument2 = (
        /** @class */
        (function() {
          function FullTextDocument3(uri, languageId, version, content) {
            this._uri = uri;
            this._languageId = languageId;
            this._version = version;
            this._content = content;
            this._lineOffsets = void 0;
          }
          Object.defineProperty(FullTextDocument3.prototype, "uri", {
            get: function() {
              return this._uri;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(FullTextDocument3.prototype, "languageId", {
            get: function() {
              return this._languageId;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(FullTextDocument3.prototype, "version", {
            get: function() {
              return this._version;
            },
            enumerable: false,
            configurable: true
          });
          FullTextDocument3.prototype.getText = function(range) {
            if (range) {
              var start = this.offsetAt(range.start);
              var end = this.offsetAt(range.end);
              return this._content.substring(start, end);
            }
            return this._content;
          };
          FullTextDocument3.prototype.update = function(event, version) {
            this._content = event.text;
            this._version = version;
            this._lineOffsets = void 0;
          };
          FullTextDocument3.prototype.getLineOffsets = function() {
            if (this._lineOffsets === void 0) {
              var lineOffsets = [];
              var text = this._content;
              var isLineStart = true;
              for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                  lineOffsets.push(i);
                  isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = ch === "\r" || ch === "\n";
                if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
                  i++;
                }
              }
              if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
              }
              this._lineOffsets = lineOffsets;
            }
            return this._lineOffsets;
          };
          FullTextDocument3.prototype.positionAt = function(offset) {
            offset = Math.max(Math.min(offset, this._content.length), 0);
            var lineOffsets = this.getLineOffsets();
            var low = 0, high = lineOffsets.length;
            if (high === 0) {
              return Position2.create(0, offset);
            }
            while (low < high) {
              var mid = Math.floor((low + high) / 2);
              if (lineOffsets[mid] > offset) {
                high = mid;
              } else {
                low = mid + 1;
              }
            }
            var line = low - 1;
            return Position2.create(line, offset - lineOffsets[line]);
          };
          FullTextDocument3.prototype.offsetAt = function(position) {
            var lineOffsets = this.getLineOffsets();
            if (position.line >= lineOffsets.length) {
              return this._content.length;
            } else if (position.line < 0) {
              return 0;
            }
            var lineOffset = lineOffsets[position.line];
            var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
            return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
          };
          Object.defineProperty(FullTextDocument3.prototype, "lineCount", {
            get: function() {
              return this.getLineOffsets().length;
            },
            enumerable: false,
            configurable: true
          });
          return FullTextDocument3;
        })()
      );
      var Is;
      (function(Is2) {
        var toString = Object.prototype.toString;
        function defined(value) {
          return typeof value !== "undefined";
        }
        Is2.defined = defined;
        function undefined2(value) {
          return typeof value === "undefined";
        }
        Is2.undefined = undefined2;
        function boolean(value) {
          return value === true || value === false;
        }
        Is2.boolean = boolean;
        function string(value) {
          return toString.call(value) === "[object String]";
        }
        Is2.string = string;
        function number(value) {
          return toString.call(value) === "[object Number]";
        }
        Is2.number = number;
        function numberRange(value, min, max) {
          return toString.call(value) === "[object Number]" && min <= value && value <= max;
        }
        Is2.numberRange = numberRange;
        function integer2(value) {
          return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
        }
        Is2.integer = integer2;
        function uinteger2(value) {
          return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
        }
        Is2.uinteger = uinteger2;
        function func(value) {
          return toString.call(value) === "[object Function]";
        }
        Is2.func = func;
        function objectLiteral(value) {
          return value !== null && typeof value === "object";
        }
        Is2.objectLiteral = objectLiteral;
        function typedArray(value, check) {
          return Array.isArray(value) && value.every(check);
        }
        Is2.typedArray = typedArray;
      })(Is || (Is = {}));
    });
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/messages.js
var require_messages2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/messages.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProtocolNotificationType = exports2.ProtocolNotificationType0 = exports2.ProtocolRequestType = exports2.ProtocolRequestType0 = exports2.RegistrationType = exports2.MessageDirection = void 0;
    var vscode_jsonrpc_1 = require_main();
    var MessageDirection;
    (function(MessageDirection2) {
      MessageDirection2["clientToServer"] = "clientToServer";
      MessageDirection2["serverToClient"] = "serverToClient";
      MessageDirection2["both"] = "both";
    })(MessageDirection || (exports2.MessageDirection = MessageDirection = {}));
    var RegistrationType = class {
      constructor(method) {
        this.method = method;
      }
    };
    exports2.RegistrationType = RegistrationType;
    var ProtocolRequestType0 = class extends vscode_jsonrpc_1.RequestType0 {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolRequestType0 = ProtocolRequestType0;
    var ProtocolRequestType = class extends vscode_jsonrpc_1.RequestType {
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    };
    exports2.ProtocolRequestType = ProtocolRequestType;
    var ProtocolNotificationType0 = class extends vscode_jsonrpc_1.NotificationType0 {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolNotificationType0 = ProtocolNotificationType0;
    var ProtocolNotificationType = class extends vscode_jsonrpc_1.NotificationType {
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    };
    exports2.ProtocolNotificationType = ProtocolNotificationType;
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/utils/is.js
var require_is3 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/utils/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.objectLiteral = exports2.typedArray = exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    exports2.typedArray = typedArray;
    function objectLiteral(value) {
      return value !== null && typeof value === "object";
    }
    exports2.objectLiteral = objectLiteral;
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js
var require_protocol_implementation = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ImplementationRequest = void 0;
    var messages_1 = require_messages2();
    var ImplementationRequest;
    (function(ImplementationRequest2) {
      ImplementationRequest2.method = "textDocument/implementation";
      ImplementationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ImplementationRequest2.type = new messages_1.ProtocolRequestType(ImplementationRequest2.method);
    })(ImplementationRequest || (exports2.ImplementationRequest = ImplementationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js
var require_protocol_typeDefinition = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TypeDefinitionRequest = void 0;
    var messages_1 = require_messages2();
    var TypeDefinitionRequest;
    (function(TypeDefinitionRequest2) {
      TypeDefinitionRequest2.method = "textDocument/typeDefinition";
      TypeDefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeDefinitionRequest2.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest2.method);
    })(TypeDefinitionRequest || (exports2.TypeDefinitionRequest = TypeDefinitionRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js
var require_protocol_workspaceFolder = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DidChangeWorkspaceFoldersNotification = exports2.WorkspaceFoldersRequest = void 0;
    var messages_1 = require_messages2();
    var WorkspaceFoldersRequest;
    (function(WorkspaceFoldersRequest2) {
      WorkspaceFoldersRequest2.method = "workspace/workspaceFolders";
      WorkspaceFoldersRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      WorkspaceFoldersRequest2.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest2.method);
    })(WorkspaceFoldersRequest || (exports2.WorkspaceFoldersRequest = WorkspaceFoldersRequest = {}));
    var DidChangeWorkspaceFoldersNotification;
    (function(DidChangeWorkspaceFoldersNotification2) {
      DidChangeWorkspaceFoldersNotification2.method = "workspace/didChangeWorkspaceFolders";
      DidChangeWorkspaceFoldersNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeWorkspaceFoldersNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification2.method);
    })(DidChangeWorkspaceFoldersNotification || (exports2.DidChangeWorkspaceFoldersNotification = DidChangeWorkspaceFoldersNotification = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js
var require_protocol_configuration = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfigurationRequest = void 0;
    var messages_1 = require_messages2();
    var ConfigurationRequest;
    (function(ConfigurationRequest2) {
      ConfigurationRequest2.method = "workspace/configuration";
      ConfigurationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ConfigurationRequest2.type = new messages_1.ProtocolRequestType(ConfigurationRequest2.method);
    })(ConfigurationRequest || (exports2.ConfigurationRequest = ConfigurationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js
var require_protocol_colorProvider = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ColorPresentationRequest = exports2.DocumentColorRequest = void 0;
    var messages_1 = require_messages2();
    var DocumentColorRequest;
    (function(DocumentColorRequest2) {
      DocumentColorRequest2.method = "textDocument/documentColor";
      DocumentColorRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentColorRequest2.type = new messages_1.ProtocolRequestType(DocumentColorRequest2.method);
    })(DocumentColorRequest || (exports2.DocumentColorRequest = DocumentColorRequest = {}));
    var ColorPresentationRequest;
    (function(ColorPresentationRequest2) {
      ColorPresentationRequest2.method = "textDocument/colorPresentation";
      ColorPresentationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ColorPresentationRequest2.type = new messages_1.ProtocolRequestType(ColorPresentationRequest2.method);
    })(ColorPresentationRequest || (exports2.ColorPresentationRequest = ColorPresentationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js
var require_protocol_foldingRange = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FoldingRangeRefreshRequest = exports2.FoldingRangeRequest = void 0;
    var messages_1 = require_messages2();
    var FoldingRangeRequest;
    (function(FoldingRangeRequest2) {
      FoldingRangeRequest2.method = "textDocument/foldingRange";
      FoldingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      FoldingRangeRequest2.type = new messages_1.ProtocolRequestType(FoldingRangeRequest2.method);
    })(FoldingRangeRequest || (exports2.FoldingRangeRequest = FoldingRangeRequest = {}));
    var FoldingRangeRefreshRequest;
    (function(FoldingRangeRefreshRequest2) {
      FoldingRangeRefreshRequest2.method = `workspace/foldingRange/refresh`;
      FoldingRangeRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      FoldingRangeRefreshRequest2.type = new messages_1.ProtocolRequestType0(FoldingRangeRefreshRequest2.method);
    })(FoldingRangeRefreshRequest || (exports2.FoldingRangeRefreshRequest = FoldingRangeRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js
var require_protocol_declaration = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DeclarationRequest = void 0;
    var messages_1 = require_messages2();
    var DeclarationRequest;
    (function(DeclarationRequest2) {
      DeclarationRequest2.method = "textDocument/declaration";
      DeclarationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DeclarationRequest2.type = new messages_1.ProtocolRequestType(DeclarationRequest2.method);
    })(DeclarationRequest || (exports2.DeclarationRequest = DeclarationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js
var require_protocol_selectionRange = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SelectionRangeRequest = void 0;
    var messages_1 = require_messages2();
    var SelectionRangeRequest;
    (function(SelectionRangeRequest2) {
      SelectionRangeRequest2.method = "textDocument/selectionRange";
      SelectionRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SelectionRangeRequest2.type = new messages_1.ProtocolRequestType(SelectionRangeRequest2.method);
    })(SelectionRangeRequest || (exports2.SelectionRangeRequest = SelectionRangeRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js
var require_protocol_progress = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WorkDoneProgressCancelNotification = exports2.WorkDoneProgressCreateRequest = exports2.WorkDoneProgress = void 0;
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var WorkDoneProgress;
    (function(WorkDoneProgress2) {
      WorkDoneProgress2.type = new vscode_jsonrpc_1.ProgressType();
      function is(value) {
        return value === WorkDoneProgress2.type;
      }
      WorkDoneProgress2.is = is;
    })(WorkDoneProgress || (exports2.WorkDoneProgress = WorkDoneProgress = {}));
    var WorkDoneProgressCreateRequest;
    (function(WorkDoneProgressCreateRequest2) {
      WorkDoneProgressCreateRequest2.method = "window/workDoneProgress/create";
      WorkDoneProgressCreateRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      WorkDoneProgressCreateRequest2.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest2.method);
    })(WorkDoneProgressCreateRequest || (exports2.WorkDoneProgressCreateRequest = WorkDoneProgressCreateRequest = {}));
    var WorkDoneProgressCancelNotification;
    (function(WorkDoneProgressCancelNotification2) {
      WorkDoneProgressCancelNotification2.method = "window/workDoneProgress/cancel";
      WorkDoneProgressCancelNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkDoneProgressCancelNotification2.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification2.method);
    })(WorkDoneProgressCancelNotification || (exports2.WorkDoneProgressCancelNotification = WorkDoneProgressCancelNotification = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js
var require_protocol_callHierarchy = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CallHierarchyOutgoingCallsRequest = exports2.CallHierarchyIncomingCallsRequest = exports2.CallHierarchyPrepareRequest = void 0;
    var messages_1 = require_messages2();
    var CallHierarchyPrepareRequest;
    (function(CallHierarchyPrepareRequest2) {
      CallHierarchyPrepareRequest2.method = "textDocument/prepareCallHierarchy";
      CallHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest2.method);
    })(CallHierarchyPrepareRequest || (exports2.CallHierarchyPrepareRequest = CallHierarchyPrepareRequest = {}));
    var CallHierarchyIncomingCallsRequest;
    (function(CallHierarchyIncomingCallsRequest2) {
      CallHierarchyIncomingCallsRequest2.method = "callHierarchy/incomingCalls";
      CallHierarchyIncomingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyIncomingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest2.method);
    })(CallHierarchyIncomingCallsRequest || (exports2.CallHierarchyIncomingCallsRequest = CallHierarchyIncomingCallsRequest = {}));
    var CallHierarchyOutgoingCallsRequest;
    (function(CallHierarchyOutgoingCallsRequest2) {
      CallHierarchyOutgoingCallsRequest2.method = "callHierarchy/outgoingCalls";
      CallHierarchyOutgoingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyOutgoingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest2.method);
    })(CallHierarchyOutgoingCallsRequest || (exports2.CallHierarchyOutgoingCallsRequest = CallHierarchyOutgoingCallsRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js
var require_protocol_semanticTokens = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SemanticTokensRefreshRequest = exports2.SemanticTokensRangeRequest = exports2.SemanticTokensDeltaRequest = exports2.SemanticTokensRequest = exports2.SemanticTokensRegistrationType = exports2.TokenFormat = void 0;
    var messages_1 = require_messages2();
    var TokenFormat;
    (function(TokenFormat2) {
      TokenFormat2.Relative = "relative";
    })(TokenFormat || (exports2.TokenFormat = TokenFormat = {}));
    var SemanticTokensRegistrationType;
    (function(SemanticTokensRegistrationType2) {
      SemanticTokensRegistrationType2.method = "textDocument/semanticTokens";
      SemanticTokensRegistrationType2.type = new messages_1.RegistrationType(SemanticTokensRegistrationType2.method);
    })(SemanticTokensRegistrationType || (exports2.SemanticTokensRegistrationType = SemanticTokensRegistrationType = {}));
    var SemanticTokensRequest;
    (function(SemanticTokensRequest2) {
      SemanticTokensRequest2.method = "textDocument/semanticTokens/full";
      SemanticTokensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRequest2.method);
      SemanticTokensRequest2.registrationMethod = SemanticTokensRegistrationType.method;
    })(SemanticTokensRequest || (exports2.SemanticTokensRequest = SemanticTokensRequest = {}));
    var SemanticTokensDeltaRequest;
    (function(SemanticTokensDeltaRequest2) {
      SemanticTokensDeltaRequest2.method = "textDocument/semanticTokens/full/delta";
      SemanticTokensDeltaRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensDeltaRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest2.method);
      SemanticTokensDeltaRequest2.registrationMethod = SemanticTokensRegistrationType.method;
    })(SemanticTokensDeltaRequest || (exports2.SemanticTokensDeltaRequest = SemanticTokensDeltaRequest = {}));
    var SemanticTokensRangeRequest;
    (function(SemanticTokensRangeRequest2) {
      SemanticTokensRangeRequest2.method = "textDocument/semanticTokens/range";
      SemanticTokensRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensRangeRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest2.method);
      SemanticTokensRangeRequest2.registrationMethod = SemanticTokensRegistrationType.method;
    })(SemanticTokensRangeRequest || (exports2.SemanticTokensRangeRequest = SemanticTokensRangeRequest = {}));
    var SemanticTokensRefreshRequest;
    (function(SemanticTokensRefreshRequest2) {
      SemanticTokensRefreshRequest2.method = `workspace/semanticTokens/refresh`;
      SemanticTokensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      SemanticTokensRefreshRequest2.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest2.method);
    })(SemanticTokensRefreshRequest || (exports2.SemanticTokensRefreshRequest = SemanticTokensRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js
var require_protocol_showDocument = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ShowDocumentRequest = void 0;
    var messages_1 = require_messages2();
    var ShowDocumentRequest;
    (function(ShowDocumentRequest2) {
      ShowDocumentRequest2.method = "window/showDocument";
      ShowDocumentRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowDocumentRequest2.type = new messages_1.ProtocolRequestType(ShowDocumentRequest2.method);
    })(ShowDocumentRequest || (exports2.ShowDocumentRequest = ShowDocumentRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js
var require_protocol_linkedEditingRange = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LinkedEditingRangeRequest = void 0;
    var messages_1 = require_messages2();
    var LinkedEditingRangeRequest;
    (function(LinkedEditingRangeRequest2) {
      LinkedEditingRangeRequest2.method = "textDocument/linkedEditingRange";
      LinkedEditingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      LinkedEditingRangeRequest2.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest2.method);
    })(LinkedEditingRangeRequest || (exports2.LinkedEditingRangeRequest = LinkedEditingRangeRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js
var require_protocol_fileOperations = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WillDeleteFilesRequest = exports2.DidDeleteFilesNotification = exports2.DidRenameFilesNotification = exports2.WillRenameFilesRequest = exports2.DidCreateFilesNotification = exports2.WillCreateFilesRequest = exports2.FileOperationPatternKind = void 0;
    var messages_1 = require_messages2();
    var FileOperationPatternKind;
    (function(FileOperationPatternKind2) {
      FileOperationPatternKind2.file = "file";
      FileOperationPatternKind2.folder = "folder";
    })(FileOperationPatternKind || (exports2.FileOperationPatternKind = FileOperationPatternKind = {}));
    var WillCreateFilesRequest;
    (function(WillCreateFilesRequest2) {
      WillCreateFilesRequest2.method = "workspace/willCreateFiles";
      WillCreateFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillCreateFilesRequest2.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest2.method);
    })(WillCreateFilesRequest || (exports2.WillCreateFilesRequest = WillCreateFilesRequest = {}));
    var DidCreateFilesNotification;
    (function(DidCreateFilesNotification2) {
      DidCreateFilesNotification2.method = "workspace/didCreateFiles";
      DidCreateFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCreateFilesNotification2.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification2.method);
    })(DidCreateFilesNotification || (exports2.DidCreateFilesNotification = DidCreateFilesNotification = {}));
    var WillRenameFilesRequest;
    (function(WillRenameFilesRequest2) {
      WillRenameFilesRequest2.method = "workspace/willRenameFiles";
      WillRenameFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillRenameFilesRequest2.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest2.method);
    })(WillRenameFilesRequest || (exports2.WillRenameFilesRequest = WillRenameFilesRequest = {}));
    var DidRenameFilesNotification;
    (function(DidRenameFilesNotification2) {
      DidRenameFilesNotification2.method = "workspace/didRenameFiles";
      DidRenameFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidRenameFilesNotification2.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification2.method);
    })(DidRenameFilesNotification || (exports2.DidRenameFilesNotification = DidRenameFilesNotification = {}));
    var DidDeleteFilesNotification;
    (function(DidDeleteFilesNotification2) {
      DidDeleteFilesNotification2.method = "workspace/didDeleteFiles";
      DidDeleteFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidDeleteFilesNotification2.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification2.method);
    })(DidDeleteFilesNotification || (exports2.DidDeleteFilesNotification = DidDeleteFilesNotification = {}));
    var WillDeleteFilesRequest;
    (function(WillDeleteFilesRequest2) {
      WillDeleteFilesRequest2.method = "workspace/willDeleteFiles";
      WillDeleteFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillDeleteFilesRequest2.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest2.method);
    })(WillDeleteFilesRequest || (exports2.WillDeleteFilesRequest = WillDeleteFilesRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js
var require_protocol_moniker = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MonikerRequest = exports2.MonikerKind = exports2.UniquenessLevel = void 0;
    var messages_1 = require_messages2();
    var UniquenessLevel;
    (function(UniquenessLevel2) {
      UniquenessLevel2.document = "document";
      UniquenessLevel2.project = "project";
      UniquenessLevel2.group = "group";
      UniquenessLevel2.scheme = "scheme";
      UniquenessLevel2.global = "global";
    })(UniquenessLevel || (exports2.UniquenessLevel = UniquenessLevel = {}));
    var MonikerKind;
    (function(MonikerKind2) {
      MonikerKind2.$import = "import";
      MonikerKind2.$export = "export";
      MonikerKind2.local = "local";
    })(MonikerKind || (exports2.MonikerKind = MonikerKind = {}));
    var MonikerRequest;
    (function(MonikerRequest2) {
      MonikerRequest2.method = "textDocument/moniker";
      MonikerRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      MonikerRequest2.type = new messages_1.ProtocolRequestType(MonikerRequest2.method);
    })(MonikerRequest || (exports2.MonikerRequest = MonikerRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js
var require_protocol_typeHierarchy = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TypeHierarchySubtypesRequest = exports2.TypeHierarchySupertypesRequest = exports2.TypeHierarchyPrepareRequest = void 0;
    var messages_1 = require_messages2();
    var TypeHierarchyPrepareRequest;
    (function(TypeHierarchyPrepareRequest2) {
      TypeHierarchyPrepareRequest2.method = "textDocument/prepareTypeHierarchy";
      TypeHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest2.method);
    })(TypeHierarchyPrepareRequest || (exports2.TypeHierarchyPrepareRequest = TypeHierarchyPrepareRequest = {}));
    var TypeHierarchySupertypesRequest;
    (function(TypeHierarchySupertypesRequest2) {
      TypeHierarchySupertypesRequest2.method = "typeHierarchy/supertypes";
      TypeHierarchySupertypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchySupertypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest2.method);
    })(TypeHierarchySupertypesRequest || (exports2.TypeHierarchySupertypesRequest = TypeHierarchySupertypesRequest = {}));
    var TypeHierarchySubtypesRequest;
    (function(TypeHierarchySubtypesRequest2) {
      TypeHierarchySubtypesRequest2.method = "typeHierarchy/subtypes";
      TypeHierarchySubtypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchySubtypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest2.method);
    })(TypeHierarchySubtypesRequest || (exports2.TypeHierarchySubtypesRequest = TypeHierarchySubtypesRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js
var require_protocol_inlineValue = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlineValueRefreshRequest = exports2.InlineValueRequest = void 0;
    var messages_1 = require_messages2();
    var InlineValueRequest;
    (function(InlineValueRequest2) {
      InlineValueRequest2.method = "textDocument/inlineValue";
      InlineValueRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlineValueRequest2.type = new messages_1.ProtocolRequestType(InlineValueRequest2.method);
    })(InlineValueRequest || (exports2.InlineValueRequest = InlineValueRequest = {}));
    var InlineValueRefreshRequest;
    (function(InlineValueRefreshRequest2) {
      InlineValueRefreshRequest2.method = `workspace/inlineValue/refresh`;
      InlineValueRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      InlineValueRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest2.method);
    })(InlineValueRefreshRequest || (exports2.InlineValueRefreshRequest = InlineValueRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js
var require_protocol_inlayHint = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlayHintRefreshRequest = exports2.InlayHintResolveRequest = exports2.InlayHintRequest = void 0;
    var messages_1 = require_messages2();
    var InlayHintRequest;
    (function(InlayHintRequest2) {
      InlayHintRequest2.method = "textDocument/inlayHint";
      InlayHintRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlayHintRequest2.type = new messages_1.ProtocolRequestType(InlayHintRequest2.method);
    })(InlayHintRequest || (exports2.InlayHintRequest = InlayHintRequest = {}));
    var InlayHintResolveRequest;
    (function(InlayHintResolveRequest2) {
      InlayHintResolveRequest2.method = "inlayHint/resolve";
      InlayHintResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlayHintResolveRequest2.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest2.method);
    })(InlayHintResolveRequest || (exports2.InlayHintResolveRequest = InlayHintResolveRequest = {}));
    var InlayHintRefreshRequest;
    (function(InlayHintRefreshRequest2) {
      InlayHintRefreshRequest2.method = `workspace/inlayHint/refresh`;
      InlayHintRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      InlayHintRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest2.method);
    })(InlayHintRefreshRequest || (exports2.InlayHintRefreshRequest = InlayHintRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js
var require_protocol_diagnostic = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiagnosticRefreshRequest = exports2.WorkspaceDiagnosticRequest = exports2.DocumentDiagnosticRequest = exports2.DocumentDiagnosticReportKind = exports2.DiagnosticServerCancellationData = void 0;
    var vscode_jsonrpc_1 = require_main();
    var Is = require_is3();
    var messages_1 = require_messages2();
    var DiagnosticServerCancellationData;
    (function(DiagnosticServerCancellationData2) {
      function is(value) {
        const candidate = value;
        return candidate && Is.boolean(candidate.retriggerRequest);
      }
      DiagnosticServerCancellationData2.is = is;
    })(DiagnosticServerCancellationData || (exports2.DiagnosticServerCancellationData = DiagnosticServerCancellationData = {}));
    var DocumentDiagnosticReportKind;
    (function(DocumentDiagnosticReportKind2) {
      DocumentDiagnosticReportKind2.Full = "full";
      DocumentDiagnosticReportKind2.Unchanged = "unchanged";
    })(DocumentDiagnosticReportKind || (exports2.DocumentDiagnosticReportKind = DocumentDiagnosticReportKind = {}));
    var DocumentDiagnosticRequest;
    (function(DocumentDiagnosticRequest2) {
      DocumentDiagnosticRequest2.method = "textDocument/diagnostic";
      DocumentDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentDiagnosticRequest2.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest2.method);
      DocumentDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
    })(DocumentDiagnosticRequest || (exports2.DocumentDiagnosticRequest = DocumentDiagnosticRequest = {}));
    var WorkspaceDiagnosticRequest;
    (function(WorkspaceDiagnosticRequest2) {
      WorkspaceDiagnosticRequest2.method = "workspace/diagnostic";
      WorkspaceDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceDiagnosticRequest2.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest2.method);
      WorkspaceDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
    })(WorkspaceDiagnosticRequest || (exports2.WorkspaceDiagnosticRequest = WorkspaceDiagnosticRequest = {}));
    var DiagnosticRefreshRequest;
    (function(DiagnosticRefreshRequest2) {
      DiagnosticRefreshRequest2.method = `workspace/diagnostic/refresh`;
      DiagnosticRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      DiagnosticRefreshRequest2.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest2.method);
    })(DiagnosticRefreshRequest || (exports2.DiagnosticRefreshRequest = DiagnosticRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js
var require_protocol_notebook = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DidCloseNotebookDocumentNotification = exports2.DidSaveNotebookDocumentNotification = exports2.DidChangeNotebookDocumentNotification = exports2.NotebookCellArrayChange = exports2.DidOpenNotebookDocumentNotification = exports2.NotebookDocumentSyncRegistrationType = exports2.NotebookDocument = exports2.NotebookCell = exports2.ExecutionSummary = exports2.NotebookCellKind = void 0;
    var vscode_languageserver_types_1 = require_main2();
    var Is = require_is3();
    var messages_1 = require_messages2();
    var NotebookCellKind;
    (function(NotebookCellKind2) {
      NotebookCellKind2.Markup = 1;
      NotebookCellKind2.Code = 2;
      function is(value) {
        return value === 1 || value === 2;
      }
      NotebookCellKind2.is = is;
    })(NotebookCellKind || (exports2.NotebookCellKind = NotebookCellKind = {}));
    var ExecutionSummary;
    (function(ExecutionSummary2) {
      function create(executionOrder, success) {
        const result = { executionOrder };
        if (success === true || success === false) {
          result.success = success;
        }
        return result;
      }
      ExecutionSummary2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) && (candidate.success === void 0 || Is.boolean(candidate.success));
      }
      ExecutionSummary2.is = is;
      function equals(one, other) {
        if (one === other) {
          return true;
        }
        if (one === null || one === void 0 || other === null || other === void 0) {
          return false;
        }
        return one.executionOrder === other.executionOrder && one.success === other.success;
      }
      ExecutionSummary2.equals = equals;
    })(ExecutionSummary || (exports2.ExecutionSummary = ExecutionSummary = {}));
    var NotebookCell;
    (function(NotebookCell2) {
      function create(kind, document) {
        return { kind, document };
      }
      NotebookCell2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1.DocumentUri.is(candidate.document) && (candidate.metadata === void 0 || Is.objectLiteral(candidate.metadata));
      }
      NotebookCell2.is = is;
      function diff(one, two) {
        const result = /* @__PURE__ */ new Set();
        if (one.document !== two.document) {
          result.add("document");
        }
        if (one.kind !== two.kind) {
          result.add("kind");
        }
        if (one.executionSummary !== two.executionSummary) {
          result.add("executionSummary");
        }
        if ((one.metadata !== void 0 || two.metadata !== void 0) && !equalsMetadata(one.metadata, two.metadata)) {
          result.add("metadata");
        }
        if ((one.executionSummary !== void 0 || two.executionSummary !== void 0) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) {
          result.add("executionSummary");
        }
        return result;
      }
      NotebookCell2.diff = diff;
      function equalsMetadata(one, other) {
        if (one === other) {
          return true;
        }
        if (one === null || one === void 0 || other === null || other === void 0) {
          return false;
        }
        if (typeof one !== typeof other) {
          return false;
        }
        if (typeof one !== "object") {
          return false;
        }
        const oneArray = Array.isArray(one);
        const otherArray = Array.isArray(other);
        if (oneArray !== otherArray) {
          return false;
        }
        if (oneArray && otherArray) {
          if (one.length !== other.length) {
            return false;
          }
          for (let i = 0; i < one.length; i++) {
            if (!equalsMetadata(one[i], other[i])) {
              return false;
            }
          }
        }
        if (Is.objectLiteral(one) && Is.objectLiteral(other)) {
          const oneKeys = Object.keys(one);
          const otherKeys = Object.keys(other);
          if (oneKeys.length !== otherKeys.length) {
            return false;
          }
          oneKeys.sort();
          otherKeys.sort();
          if (!equalsMetadata(oneKeys, otherKeys)) {
            return false;
          }
          for (let i = 0; i < oneKeys.length; i++) {
            const prop = oneKeys[i];
            if (!equalsMetadata(one[prop], other[prop])) {
              return false;
            }
          }
        }
        return true;
      }
    })(NotebookCell || (exports2.NotebookCell = NotebookCell = {}));
    var NotebookDocument;
    (function(NotebookDocument2) {
      function create(uri, notebookType, version, cells) {
        return { uri, notebookType, version, cells };
      }
      NotebookDocument2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.uri) && vscode_languageserver_types_1.integer.is(candidate.version) && Is.typedArray(candidate.cells, NotebookCell.is);
      }
      NotebookDocument2.is = is;
    })(NotebookDocument || (exports2.NotebookDocument = NotebookDocument = {}));
    var NotebookDocumentSyncRegistrationType;
    (function(NotebookDocumentSyncRegistrationType2) {
      NotebookDocumentSyncRegistrationType2.method = "notebookDocument/sync";
      NotebookDocumentSyncRegistrationType2.messageDirection = messages_1.MessageDirection.clientToServer;
      NotebookDocumentSyncRegistrationType2.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType2.method);
    })(NotebookDocumentSyncRegistrationType || (exports2.NotebookDocumentSyncRegistrationType = NotebookDocumentSyncRegistrationType = {}));
    var DidOpenNotebookDocumentNotification;
    (function(DidOpenNotebookDocumentNotification2) {
      DidOpenNotebookDocumentNotification2.method = "notebookDocument/didOpen";
      DidOpenNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidOpenNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenNotebookDocumentNotification2.method);
      DidOpenNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidOpenNotebookDocumentNotification || (exports2.DidOpenNotebookDocumentNotification = DidOpenNotebookDocumentNotification = {}));
    var NotebookCellArrayChange;
    (function(NotebookCellArrayChange2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.start) && vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) && (candidate.cells === void 0 || Is.typedArray(candidate.cells, NotebookCell.is));
      }
      NotebookCellArrayChange2.is = is;
      function create(start, deleteCount, cells) {
        const result = { start, deleteCount };
        if (cells !== void 0) {
          result.cells = cells;
        }
        return result;
      }
      NotebookCellArrayChange2.create = create;
    })(NotebookCellArrayChange || (exports2.NotebookCellArrayChange = NotebookCellArrayChange = {}));
    var DidChangeNotebookDocumentNotification;
    (function(DidChangeNotebookDocumentNotification2) {
      DidChangeNotebookDocumentNotification2.method = "notebookDocument/didChange";
      DidChangeNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification2.method);
      DidChangeNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidChangeNotebookDocumentNotification || (exports2.DidChangeNotebookDocumentNotification = DidChangeNotebookDocumentNotification = {}));
    var DidSaveNotebookDocumentNotification;
    (function(DidSaveNotebookDocumentNotification2) {
      DidSaveNotebookDocumentNotification2.method = "notebookDocument/didSave";
      DidSaveNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidSaveNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveNotebookDocumentNotification2.method);
      DidSaveNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidSaveNotebookDocumentNotification || (exports2.DidSaveNotebookDocumentNotification = DidSaveNotebookDocumentNotification = {}));
    var DidCloseNotebookDocumentNotification;
    (function(DidCloseNotebookDocumentNotification2) {
      DidCloseNotebookDocumentNotification2.method = "notebookDocument/didClose";
      DidCloseNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCloseNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseNotebookDocumentNotification2.method);
      DidCloseNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidCloseNotebookDocumentNotification || (exports2.DidCloseNotebookDocumentNotification = DidCloseNotebookDocumentNotification = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js
var require_protocol_inlineCompletion = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlineCompletionRequest = void 0;
    var messages_1 = require_messages2();
    var InlineCompletionRequest;
    (function(InlineCompletionRequest2) {
      InlineCompletionRequest2.method = "textDocument/inlineCompletion";
      InlineCompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlineCompletionRequest2.type = new messages_1.ProtocolRequestType(InlineCompletionRequest2.method);
    })(InlineCompletionRequest || (exports2.InlineCompletionRequest = InlineCompletionRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.js
var require_protocol = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WorkspaceSymbolRequest = exports2.CodeActionResolveRequest = exports2.CodeActionRequest = exports2.DocumentSymbolRequest = exports2.DocumentHighlightRequest = exports2.ReferencesRequest = exports2.DefinitionRequest = exports2.SignatureHelpRequest = exports2.SignatureHelpTriggerKind = exports2.HoverRequest = exports2.CompletionResolveRequest = exports2.CompletionRequest = exports2.CompletionTriggerKind = exports2.PublishDiagnosticsNotification = exports2.WatchKind = exports2.RelativePattern = exports2.FileChangeType = exports2.DidChangeWatchedFilesNotification = exports2.WillSaveTextDocumentWaitUntilRequest = exports2.WillSaveTextDocumentNotification = exports2.TextDocumentSaveReason = exports2.DidSaveTextDocumentNotification = exports2.DidCloseTextDocumentNotification = exports2.DidChangeTextDocumentNotification = exports2.TextDocumentContentChangeEvent = exports2.DidOpenTextDocumentNotification = exports2.TextDocumentSyncKind = exports2.TelemetryEventNotification = exports2.LogMessageNotification = exports2.ShowMessageRequest = exports2.ShowMessageNotification = exports2.MessageType = exports2.DidChangeConfigurationNotification = exports2.ExitNotification = exports2.ShutdownRequest = exports2.InitializedNotification = exports2.InitializeErrorCodes = exports2.InitializeRequest = exports2.WorkDoneProgressOptions = exports2.TextDocumentRegistrationOptions = exports2.StaticRegistrationOptions = exports2.PositionEncodingKind = exports2.FailureHandlingKind = exports2.ResourceOperationKind = exports2.UnregistrationRequest = exports2.RegistrationRequest = exports2.DocumentSelector = exports2.NotebookCellTextDocumentFilter = exports2.NotebookDocumentFilter = exports2.TextDocumentFilter = void 0;
    exports2.MonikerRequest = exports2.MonikerKind = exports2.UniquenessLevel = exports2.WillDeleteFilesRequest = exports2.DidDeleteFilesNotification = exports2.WillRenameFilesRequest = exports2.DidRenameFilesNotification = exports2.WillCreateFilesRequest = exports2.DidCreateFilesNotification = exports2.FileOperationPatternKind = exports2.LinkedEditingRangeRequest = exports2.ShowDocumentRequest = exports2.SemanticTokensRegistrationType = exports2.SemanticTokensRefreshRequest = exports2.SemanticTokensRangeRequest = exports2.SemanticTokensDeltaRequest = exports2.SemanticTokensRequest = exports2.TokenFormat = exports2.CallHierarchyPrepareRequest = exports2.CallHierarchyOutgoingCallsRequest = exports2.CallHierarchyIncomingCallsRequest = exports2.WorkDoneProgressCancelNotification = exports2.WorkDoneProgressCreateRequest = exports2.WorkDoneProgress = exports2.SelectionRangeRequest = exports2.DeclarationRequest = exports2.FoldingRangeRefreshRequest = exports2.FoldingRangeRequest = exports2.ColorPresentationRequest = exports2.DocumentColorRequest = exports2.ConfigurationRequest = exports2.DidChangeWorkspaceFoldersNotification = exports2.WorkspaceFoldersRequest = exports2.TypeDefinitionRequest = exports2.ImplementationRequest = exports2.ApplyWorkspaceEditRequest = exports2.ExecuteCommandRequest = exports2.PrepareRenameRequest = exports2.RenameRequest = exports2.PrepareSupportDefaultBehavior = exports2.DocumentOnTypeFormattingRequest = exports2.DocumentRangesFormattingRequest = exports2.DocumentRangeFormattingRequest = exports2.DocumentFormattingRequest = exports2.DocumentLinkResolveRequest = exports2.DocumentLinkRequest = exports2.CodeLensRefreshRequest = exports2.CodeLensResolveRequest = exports2.CodeLensRequest = exports2.WorkspaceSymbolResolveRequest = void 0;
    exports2.InlineCompletionRequest = exports2.DidCloseNotebookDocumentNotification = exports2.DidSaveNotebookDocumentNotification = exports2.DidChangeNotebookDocumentNotification = exports2.NotebookCellArrayChange = exports2.DidOpenNotebookDocumentNotification = exports2.NotebookDocumentSyncRegistrationType = exports2.NotebookDocument = exports2.NotebookCell = exports2.ExecutionSummary = exports2.NotebookCellKind = exports2.DiagnosticRefreshRequest = exports2.WorkspaceDiagnosticRequest = exports2.DocumentDiagnosticRequest = exports2.DocumentDiagnosticReportKind = exports2.DiagnosticServerCancellationData = exports2.InlayHintRefreshRequest = exports2.InlayHintResolveRequest = exports2.InlayHintRequest = exports2.InlineValueRefreshRequest = exports2.InlineValueRequest = exports2.TypeHierarchySupertypesRequest = exports2.TypeHierarchySubtypesRequest = exports2.TypeHierarchyPrepareRequest = void 0;
    var messages_1 = require_messages2();
    var vscode_languageserver_types_1 = require_main2();
    var Is = require_is3();
    var protocol_implementation_1 = require_protocol_implementation();
    Object.defineProperty(exports2, "ImplementationRequest", { enumerable: true, get: function() {
      return protocol_implementation_1.ImplementationRequest;
    } });
    var protocol_typeDefinition_1 = require_protocol_typeDefinition();
    Object.defineProperty(exports2, "TypeDefinitionRequest", { enumerable: true, get: function() {
      return protocol_typeDefinition_1.TypeDefinitionRequest;
    } });
    var protocol_workspaceFolder_1 = require_protocol_workspaceFolder();
    Object.defineProperty(exports2, "WorkspaceFoldersRequest", { enumerable: true, get: function() {
      return protocol_workspaceFolder_1.WorkspaceFoldersRequest;
    } });
    Object.defineProperty(exports2, "DidChangeWorkspaceFoldersNotification", { enumerable: true, get: function() {
      return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification;
    } });
    var protocol_configuration_1 = require_protocol_configuration();
    Object.defineProperty(exports2, "ConfigurationRequest", { enumerable: true, get: function() {
      return protocol_configuration_1.ConfigurationRequest;
    } });
    var protocol_colorProvider_1 = require_protocol_colorProvider();
    Object.defineProperty(exports2, "DocumentColorRequest", { enumerable: true, get: function() {
      return protocol_colorProvider_1.DocumentColorRequest;
    } });
    Object.defineProperty(exports2, "ColorPresentationRequest", { enumerable: true, get: function() {
      return protocol_colorProvider_1.ColorPresentationRequest;
    } });
    var protocol_foldingRange_1 = require_protocol_foldingRange();
    Object.defineProperty(exports2, "FoldingRangeRequest", { enumerable: true, get: function() {
      return protocol_foldingRange_1.FoldingRangeRequest;
    } });
    Object.defineProperty(exports2, "FoldingRangeRefreshRequest", { enumerable: true, get: function() {
      return protocol_foldingRange_1.FoldingRangeRefreshRequest;
    } });
    var protocol_declaration_1 = require_protocol_declaration();
    Object.defineProperty(exports2, "DeclarationRequest", { enumerable: true, get: function() {
      return protocol_declaration_1.DeclarationRequest;
    } });
    var protocol_selectionRange_1 = require_protocol_selectionRange();
    Object.defineProperty(exports2, "SelectionRangeRequest", { enumerable: true, get: function() {
      return protocol_selectionRange_1.SelectionRangeRequest;
    } });
    var protocol_progress_1 = require_protocol_progress();
    Object.defineProperty(exports2, "WorkDoneProgress", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgress;
    } });
    Object.defineProperty(exports2, "WorkDoneProgressCreateRequest", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgressCreateRequest;
    } });
    Object.defineProperty(exports2, "WorkDoneProgressCancelNotification", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgressCancelNotification;
    } });
    var protocol_callHierarchy_1 = require_protocol_callHierarchy();
    Object.defineProperty(exports2, "CallHierarchyIncomingCallsRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
    } });
    Object.defineProperty(exports2, "CallHierarchyOutgoingCallsRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
    } });
    Object.defineProperty(exports2, "CallHierarchyPrepareRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
    } });
    var protocol_semanticTokens_1 = require_protocol_semanticTokens();
    Object.defineProperty(exports2, "TokenFormat", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.TokenFormat;
    } });
    Object.defineProperty(exports2, "SemanticTokensRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensDeltaRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensRangeRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRangeRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensRefreshRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensRegistrationType", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRegistrationType;
    } });
    var protocol_showDocument_1 = require_protocol_showDocument();
    Object.defineProperty(exports2, "ShowDocumentRequest", { enumerable: true, get: function() {
      return protocol_showDocument_1.ShowDocumentRequest;
    } });
    var protocol_linkedEditingRange_1 = require_protocol_linkedEditingRange();
    Object.defineProperty(exports2, "LinkedEditingRangeRequest", { enumerable: true, get: function() {
      return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
    } });
    var protocol_fileOperations_1 = require_protocol_fileOperations();
    Object.defineProperty(exports2, "FileOperationPatternKind", { enumerable: true, get: function() {
      return protocol_fileOperations_1.FileOperationPatternKind;
    } });
    Object.defineProperty(exports2, "DidCreateFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidCreateFilesNotification;
    } });
    Object.defineProperty(exports2, "WillCreateFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillCreateFilesRequest;
    } });
    Object.defineProperty(exports2, "DidRenameFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidRenameFilesNotification;
    } });
    Object.defineProperty(exports2, "WillRenameFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillRenameFilesRequest;
    } });
    Object.defineProperty(exports2, "DidDeleteFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidDeleteFilesNotification;
    } });
    Object.defineProperty(exports2, "WillDeleteFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillDeleteFilesRequest;
    } });
    var protocol_moniker_1 = require_protocol_moniker();
    Object.defineProperty(exports2, "UniquenessLevel", { enumerable: true, get: function() {
      return protocol_moniker_1.UniquenessLevel;
    } });
    Object.defineProperty(exports2, "MonikerKind", { enumerable: true, get: function() {
      return protocol_moniker_1.MonikerKind;
    } });
    Object.defineProperty(exports2, "MonikerRequest", { enumerable: true, get: function() {
      return protocol_moniker_1.MonikerRequest;
    } });
    var protocol_typeHierarchy_1 = require_protocol_typeHierarchy();
    Object.defineProperty(exports2, "TypeHierarchyPrepareRequest", { enumerable: true, get: function() {
      return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest;
    } });
    Object.defineProperty(exports2, "TypeHierarchySubtypesRequest", { enumerable: true, get: function() {
      return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest;
    } });
    Object.defineProperty(exports2, "TypeHierarchySupertypesRequest", { enumerable: true, get: function() {
      return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest;
    } });
    var protocol_inlineValue_1 = require_protocol_inlineValue();
    Object.defineProperty(exports2, "InlineValueRequest", { enumerable: true, get: function() {
      return protocol_inlineValue_1.InlineValueRequest;
    } });
    Object.defineProperty(exports2, "InlineValueRefreshRequest", { enumerable: true, get: function() {
      return protocol_inlineValue_1.InlineValueRefreshRequest;
    } });
    var protocol_inlayHint_1 = require_protocol_inlayHint();
    Object.defineProperty(exports2, "InlayHintRequest", { enumerable: true, get: function() {
      return protocol_inlayHint_1.InlayHintRequest;
    } });
    Object.defineProperty(exports2, "InlayHintResolveRequest", { enumerable: true, get: function() {
      return protocol_inlayHint_1.InlayHintResolveRequest;
    } });
    Object.defineProperty(exports2, "InlayHintRefreshRequest", { enumerable: true, get: function() {
      return protocol_inlayHint_1.InlayHintRefreshRequest;
    } });
    var protocol_diagnostic_1 = require_protocol_diagnostic();
    Object.defineProperty(exports2, "DiagnosticServerCancellationData", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DiagnosticServerCancellationData;
    } });
    Object.defineProperty(exports2, "DocumentDiagnosticReportKind", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DocumentDiagnosticReportKind;
    } });
    Object.defineProperty(exports2, "DocumentDiagnosticRequest", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DocumentDiagnosticRequest;
    } });
    Object.defineProperty(exports2, "WorkspaceDiagnosticRequest", { enumerable: true, get: function() {
      return protocol_diagnostic_1.WorkspaceDiagnosticRequest;
    } });
    Object.defineProperty(exports2, "DiagnosticRefreshRequest", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DiagnosticRefreshRequest;
    } });
    var protocol_notebook_1 = require_protocol_notebook();
    Object.defineProperty(exports2, "NotebookCellKind", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookCellKind;
    } });
    Object.defineProperty(exports2, "ExecutionSummary", { enumerable: true, get: function() {
      return protocol_notebook_1.ExecutionSummary;
    } });
    Object.defineProperty(exports2, "NotebookCell", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookCell;
    } });
    Object.defineProperty(exports2, "NotebookDocument", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookDocument;
    } });
    Object.defineProperty(exports2, "NotebookDocumentSyncRegistrationType", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookDocumentSyncRegistrationType;
    } });
    Object.defineProperty(exports2, "DidOpenNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidOpenNotebookDocumentNotification;
    } });
    Object.defineProperty(exports2, "NotebookCellArrayChange", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookCellArrayChange;
    } });
    Object.defineProperty(exports2, "DidChangeNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidChangeNotebookDocumentNotification;
    } });
    Object.defineProperty(exports2, "DidSaveNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidSaveNotebookDocumentNotification;
    } });
    Object.defineProperty(exports2, "DidCloseNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidCloseNotebookDocumentNotification;
    } });
    var protocol_inlineCompletion_1 = require_protocol_inlineCompletion();
    Object.defineProperty(exports2, "InlineCompletionRequest", { enumerable: true, get: function() {
      return protocol_inlineCompletion_1.InlineCompletionRequest;
    } });
    var TextDocumentFilter;
    (function(TextDocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is.string(candidate) || (Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
      }
      TextDocumentFilter2.is = is;
    })(TextDocumentFilter || (exports2.TextDocumentFilter = TextDocumentFilter = {}));
    var NotebookDocumentFilter;
    (function(NotebookDocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (Is.string(candidate.notebookType) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
      }
      NotebookDocumentFilter2.is = is;
    })(NotebookDocumentFilter || (exports2.NotebookDocumentFilter = NotebookDocumentFilter = {}));
    var NotebookCellTextDocumentFilter;
    (function(NotebookCellTextDocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (Is.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook)) && (candidate.language === void 0 || Is.string(candidate.language));
      }
      NotebookCellTextDocumentFilter2.is = is;
    })(NotebookCellTextDocumentFilter || (exports2.NotebookCellTextDocumentFilter = NotebookCellTextDocumentFilter = {}));
    var DocumentSelector;
    (function(DocumentSelector2) {
      function is(value) {
        if (!Array.isArray(value)) {
          return false;
        }
        for (let elem of value) {
          if (!Is.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) {
            return false;
          }
        }
        return true;
      }
      DocumentSelector2.is = is;
    })(DocumentSelector || (exports2.DocumentSelector = DocumentSelector = {}));
    var RegistrationRequest;
    (function(RegistrationRequest2) {
      RegistrationRequest2.method = "client/registerCapability";
      RegistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      RegistrationRequest2.type = new messages_1.ProtocolRequestType(RegistrationRequest2.method);
    })(RegistrationRequest || (exports2.RegistrationRequest = RegistrationRequest = {}));
    var UnregistrationRequest;
    (function(UnregistrationRequest2) {
      UnregistrationRequest2.method = "client/unregisterCapability";
      UnregistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      UnregistrationRequest2.type = new messages_1.ProtocolRequestType(UnregistrationRequest2.method);
    })(UnregistrationRequest || (exports2.UnregistrationRequest = UnregistrationRequest = {}));
    var ResourceOperationKind;
    (function(ResourceOperationKind2) {
      ResourceOperationKind2.Create = "create";
      ResourceOperationKind2.Rename = "rename";
      ResourceOperationKind2.Delete = "delete";
    })(ResourceOperationKind || (exports2.ResourceOperationKind = ResourceOperationKind = {}));
    var FailureHandlingKind;
    (function(FailureHandlingKind2) {
      FailureHandlingKind2.Abort = "abort";
      FailureHandlingKind2.Transactional = "transactional";
      FailureHandlingKind2.TextOnlyTransactional = "textOnlyTransactional";
      FailureHandlingKind2.Undo = "undo";
    })(FailureHandlingKind || (exports2.FailureHandlingKind = FailureHandlingKind = {}));
    var PositionEncodingKind;
    (function(PositionEncodingKind2) {
      PositionEncodingKind2.UTF8 = "utf-8";
      PositionEncodingKind2.UTF16 = "utf-16";
      PositionEncodingKind2.UTF32 = "utf-32";
    })(PositionEncodingKind || (exports2.PositionEncodingKind = PositionEncodingKind = {}));
    var StaticRegistrationOptions;
    (function(StaticRegistrationOptions2) {
      function hasId(value) {
        const candidate = value;
        return candidate && Is.string(candidate.id) && candidate.id.length > 0;
      }
      StaticRegistrationOptions2.hasId = hasId;
    })(StaticRegistrationOptions || (exports2.StaticRegistrationOptions = StaticRegistrationOptions = {}));
    var TextDocumentRegistrationOptions;
    (function(TextDocumentRegistrationOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
      }
      TextDocumentRegistrationOptions2.is = is;
    })(TextDocumentRegistrationOptions || (exports2.TextDocumentRegistrationOptions = TextDocumentRegistrationOptions = {}));
    var WorkDoneProgressOptions;
    (function(WorkDoneProgressOptions2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (candidate.workDoneProgress === void 0 || Is.boolean(candidate.workDoneProgress));
      }
      WorkDoneProgressOptions2.is = is;
      function hasWorkDoneProgress(value) {
        const candidate = value;
        return candidate && Is.boolean(candidate.workDoneProgress);
      }
      WorkDoneProgressOptions2.hasWorkDoneProgress = hasWorkDoneProgress;
    })(WorkDoneProgressOptions || (exports2.WorkDoneProgressOptions = WorkDoneProgressOptions = {}));
    var InitializeRequest;
    (function(InitializeRequest2) {
      InitializeRequest2.method = "initialize";
      InitializeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InitializeRequest2.type = new messages_1.ProtocolRequestType(InitializeRequest2.method);
    })(InitializeRequest || (exports2.InitializeRequest = InitializeRequest = {}));
    var InitializeErrorCodes;
    (function(InitializeErrorCodes2) {
      InitializeErrorCodes2.unknownProtocolVersion = 1;
    })(InitializeErrorCodes || (exports2.InitializeErrorCodes = InitializeErrorCodes = {}));
    var InitializedNotification;
    (function(InitializedNotification2) {
      InitializedNotification2.method = "initialized";
      InitializedNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      InitializedNotification2.type = new messages_1.ProtocolNotificationType(InitializedNotification2.method);
    })(InitializedNotification || (exports2.InitializedNotification = InitializedNotification = {}));
    var ShutdownRequest;
    (function(ShutdownRequest2) {
      ShutdownRequest2.method = "shutdown";
      ShutdownRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ShutdownRequest2.type = new messages_1.ProtocolRequestType0(ShutdownRequest2.method);
    })(ShutdownRequest || (exports2.ShutdownRequest = ShutdownRequest = {}));
    var ExitNotification;
    (function(ExitNotification2) {
      ExitNotification2.method = "exit";
      ExitNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      ExitNotification2.type = new messages_1.ProtocolNotificationType0(ExitNotification2.method);
    })(ExitNotification || (exports2.ExitNotification = ExitNotification = {}));
    var DidChangeConfigurationNotification;
    (function(DidChangeConfigurationNotification2) {
      DidChangeConfigurationNotification2.method = "workspace/didChangeConfiguration";
      DidChangeConfigurationNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeConfigurationNotification2.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification2.method);
    })(DidChangeConfigurationNotification || (exports2.DidChangeConfigurationNotification = DidChangeConfigurationNotification = {}));
    var MessageType;
    (function(MessageType2) {
      MessageType2.Error = 1;
      MessageType2.Warning = 2;
      MessageType2.Info = 3;
      MessageType2.Log = 4;
      MessageType2.Debug = 5;
    })(MessageType || (exports2.MessageType = MessageType = {}));
    var ShowMessageNotification;
    (function(ShowMessageNotification2) {
      ShowMessageNotification2.method = "window/showMessage";
      ShowMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowMessageNotification2.type = new messages_1.ProtocolNotificationType(ShowMessageNotification2.method);
    })(ShowMessageNotification || (exports2.ShowMessageNotification = ShowMessageNotification = {}));
    var ShowMessageRequest;
    (function(ShowMessageRequest2) {
      ShowMessageRequest2.method = "window/showMessageRequest";
      ShowMessageRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowMessageRequest2.type = new messages_1.ProtocolRequestType(ShowMessageRequest2.method);
    })(ShowMessageRequest || (exports2.ShowMessageRequest = ShowMessageRequest = {}));
    var LogMessageNotification;
    (function(LogMessageNotification2) {
      LogMessageNotification2.method = "window/logMessage";
      LogMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      LogMessageNotification2.type = new messages_1.ProtocolNotificationType(LogMessageNotification2.method);
    })(LogMessageNotification || (exports2.LogMessageNotification = LogMessageNotification = {}));
    var TelemetryEventNotification;
    (function(TelemetryEventNotification2) {
      TelemetryEventNotification2.method = "telemetry/event";
      TelemetryEventNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      TelemetryEventNotification2.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification2.method);
    })(TelemetryEventNotification || (exports2.TelemetryEventNotification = TelemetryEventNotification = {}));
    var TextDocumentSyncKind2;
    (function(TextDocumentSyncKind3) {
      TextDocumentSyncKind3.None = 0;
      TextDocumentSyncKind3.Full = 1;
      TextDocumentSyncKind3.Incremental = 2;
    })(TextDocumentSyncKind2 || (exports2.TextDocumentSyncKind = TextDocumentSyncKind2 = {}));
    var DidOpenTextDocumentNotification;
    (function(DidOpenTextDocumentNotification2) {
      DidOpenTextDocumentNotification2.method = "textDocument/didOpen";
      DidOpenTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidOpenTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification2.method);
    })(DidOpenTextDocumentNotification || (exports2.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification = {}));
    var TextDocumentContentChangeEvent;
    (function(TextDocumentContentChangeEvent2) {
      function isIncremental(event) {
        let candidate = event;
        return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
      }
      TextDocumentContentChangeEvent2.isIncremental = isIncremental;
      function isFull(event) {
        let candidate = event;
        return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
      }
      TextDocumentContentChangeEvent2.isFull = isFull;
    })(TextDocumentContentChangeEvent || (exports2.TextDocumentContentChangeEvent = TextDocumentContentChangeEvent = {}));
    var DidChangeTextDocumentNotification;
    (function(DidChangeTextDocumentNotification2) {
      DidChangeTextDocumentNotification2.method = "textDocument/didChange";
      DidChangeTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification2.method);
    })(DidChangeTextDocumentNotification || (exports2.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification = {}));
    var DidCloseTextDocumentNotification;
    (function(DidCloseTextDocumentNotification2) {
      DidCloseTextDocumentNotification2.method = "textDocument/didClose";
      DidCloseTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCloseTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification2.method);
    })(DidCloseTextDocumentNotification || (exports2.DidCloseTextDocumentNotification = DidCloseTextDocumentNotification = {}));
    var DidSaveTextDocumentNotification;
    (function(DidSaveTextDocumentNotification2) {
      DidSaveTextDocumentNotification2.method = "textDocument/didSave";
      DidSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification2.method);
    })(DidSaveTextDocumentNotification || (exports2.DidSaveTextDocumentNotification = DidSaveTextDocumentNotification = {}));
    var TextDocumentSaveReason;
    (function(TextDocumentSaveReason2) {
      TextDocumentSaveReason2.Manual = 1;
      TextDocumentSaveReason2.AfterDelay = 2;
      TextDocumentSaveReason2.FocusOut = 3;
    })(TextDocumentSaveReason || (exports2.TextDocumentSaveReason = TextDocumentSaveReason = {}));
    var WillSaveTextDocumentNotification;
    (function(WillSaveTextDocumentNotification2) {
      WillSaveTextDocumentNotification2.method = "textDocument/willSave";
      WillSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification2.method);
    })(WillSaveTextDocumentNotification || (exports2.WillSaveTextDocumentNotification = WillSaveTextDocumentNotification = {}));
    var WillSaveTextDocumentWaitUntilRequest;
    (function(WillSaveTextDocumentWaitUntilRequest2) {
      WillSaveTextDocumentWaitUntilRequest2.method = "textDocument/willSaveWaitUntil";
      WillSaveTextDocumentWaitUntilRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillSaveTextDocumentWaitUntilRequest2.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest2.method);
    })(WillSaveTextDocumentWaitUntilRequest || (exports2.WillSaveTextDocumentWaitUntilRequest = WillSaveTextDocumentWaitUntilRequest = {}));
    var DidChangeWatchedFilesNotification;
    (function(DidChangeWatchedFilesNotification2) {
      DidChangeWatchedFilesNotification2.method = "workspace/didChangeWatchedFiles";
      DidChangeWatchedFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeWatchedFilesNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification2.method);
    })(DidChangeWatchedFilesNotification || (exports2.DidChangeWatchedFilesNotification = DidChangeWatchedFilesNotification = {}));
    var FileChangeType;
    (function(FileChangeType2) {
      FileChangeType2.Created = 1;
      FileChangeType2.Changed = 2;
      FileChangeType2.Deleted = 3;
    })(FileChangeType || (exports2.FileChangeType = FileChangeType = {}));
    var RelativePattern;
    (function(RelativePattern2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is.string(candidate.pattern);
      }
      RelativePattern2.is = is;
    })(RelativePattern || (exports2.RelativePattern = RelativePattern = {}));
    var WatchKind;
    (function(WatchKind2) {
      WatchKind2.Create = 1;
      WatchKind2.Change = 2;
      WatchKind2.Delete = 4;
    })(WatchKind || (exports2.WatchKind = WatchKind = {}));
    var PublishDiagnosticsNotification;
    (function(PublishDiagnosticsNotification2) {
      PublishDiagnosticsNotification2.method = "textDocument/publishDiagnostics";
      PublishDiagnosticsNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      PublishDiagnosticsNotification2.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification2.method);
    })(PublishDiagnosticsNotification || (exports2.PublishDiagnosticsNotification = PublishDiagnosticsNotification = {}));
    var CompletionTriggerKind;
    (function(CompletionTriggerKind2) {
      CompletionTriggerKind2.Invoked = 1;
      CompletionTriggerKind2.TriggerCharacter = 2;
      CompletionTriggerKind2.TriggerForIncompleteCompletions = 3;
    })(CompletionTriggerKind || (exports2.CompletionTriggerKind = CompletionTriggerKind = {}));
    var CompletionRequest;
    (function(CompletionRequest2) {
      CompletionRequest2.method = "textDocument/completion";
      CompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CompletionRequest2.type = new messages_1.ProtocolRequestType(CompletionRequest2.method);
    })(CompletionRequest || (exports2.CompletionRequest = CompletionRequest = {}));
    var CompletionResolveRequest;
    (function(CompletionResolveRequest2) {
      CompletionResolveRequest2.method = "completionItem/resolve";
      CompletionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CompletionResolveRequest2.type = new messages_1.ProtocolRequestType(CompletionResolveRequest2.method);
    })(CompletionResolveRequest || (exports2.CompletionResolveRequest = CompletionResolveRequest = {}));
    var HoverRequest;
    (function(HoverRequest2) {
      HoverRequest2.method = "textDocument/hover";
      HoverRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      HoverRequest2.type = new messages_1.ProtocolRequestType(HoverRequest2.method);
    })(HoverRequest || (exports2.HoverRequest = HoverRequest = {}));
    var SignatureHelpTriggerKind;
    (function(SignatureHelpTriggerKind2) {
      SignatureHelpTriggerKind2.Invoked = 1;
      SignatureHelpTriggerKind2.TriggerCharacter = 2;
      SignatureHelpTriggerKind2.ContentChange = 3;
    })(SignatureHelpTriggerKind || (exports2.SignatureHelpTriggerKind = SignatureHelpTriggerKind = {}));
    var SignatureHelpRequest;
    (function(SignatureHelpRequest2) {
      SignatureHelpRequest2.method = "textDocument/signatureHelp";
      SignatureHelpRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SignatureHelpRequest2.type = new messages_1.ProtocolRequestType(SignatureHelpRequest2.method);
    })(SignatureHelpRequest || (exports2.SignatureHelpRequest = SignatureHelpRequest = {}));
    var DefinitionRequest;
    (function(DefinitionRequest2) {
      DefinitionRequest2.method = "textDocument/definition";
      DefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DefinitionRequest2.type = new messages_1.ProtocolRequestType(DefinitionRequest2.method);
    })(DefinitionRequest || (exports2.DefinitionRequest = DefinitionRequest = {}));
    var ReferencesRequest;
    (function(ReferencesRequest2) {
      ReferencesRequest2.method = "textDocument/references";
      ReferencesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ReferencesRequest2.type = new messages_1.ProtocolRequestType(ReferencesRequest2.method);
    })(ReferencesRequest || (exports2.ReferencesRequest = ReferencesRequest = {}));
    var DocumentHighlightRequest;
    (function(DocumentHighlightRequest2) {
      DocumentHighlightRequest2.method = "textDocument/documentHighlight";
      DocumentHighlightRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentHighlightRequest2.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest2.method);
    })(DocumentHighlightRequest || (exports2.DocumentHighlightRequest = DocumentHighlightRequest = {}));
    var DocumentSymbolRequest;
    (function(DocumentSymbolRequest2) {
      DocumentSymbolRequest2.method = "textDocument/documentSymbol";
      DocumentSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentSymbolRequest2.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest2.method);
    })(DocumentSymbolRequest || (exports2.DocumentSymbolRequest = DocumentSymbolRequest = {}));
    var CodeActionRequest;
    (function(CodeActionRequest2) {
      CodeActionRequest2.method = "textDocument/codeAction";
      CodeActionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeActionRequest2.type = new messages_1.ProtocolRequestType(CodeActionRequest2.method);
    })(CodeActionRequest || (exports2.CodeActionRequest = CodeActionRequest = {}));
    var CodeActionResolveRequest;
    (function(CodeActionResolveRequest2) {
      CodeActionResolveRequest2.method = "codeAction/resolve";
      CodeActionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeActionResolveRequest2.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest2.method);
    })(CodeActionResolveRequest || (exports2.CodeActionResolveRequest = CodeActionResolveRequest = {}));
    var WorkspaceSymbolRequest;
    (function(WorkspaceSymbolRequest2) {
      WorkspaceSymbolRequest2.method = "workspace/symbol";
      WorkspaceSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceSymbolRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest2.method);
    })(WorkspaceSymbolRequest || (exports2.WorkspaceSymbolRequest = WorkspaceSymbolRequest = {}));
    var WorkspaceSymbolResolveRequest;
    (function(WorkspaceSymbolResolveRequest2) {
      WorkspaceSymbolResolveRequest2.method = "workspaceSymbol/resolve";
      WorkspaceSymbolResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceSymbolResolveRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest2.method);
    })(WorkspaceSymbolResolveRequest || (exports2.WorkspaceSymbolResolveRequest = WorkspaceSymbolResolveRequest = {}));
    var CodeLensRequest;
    (function(CodeLensRequest2) {
      CodeLensRequest2.method = "textDocument/codeLens";
      CodeLensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeLensRequest2.type = new messages_1.ProtocolRequestType(CodeLensRequest2.method);
    })(CodeLensRequest || (exports2.CodeLensRequest = CodeLensRequest = {}));
    var CodeLensResolveRequest;
    (function(CodeLensResolveRequest2) {
      CodeLensResolveRequest2.method = "codeLens/resolve";
      CodeLensResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeLensResolveRequest2.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest2.method);
    })(CodeLensResolveRequest || (exports2.CodeLensResolveRequest = CodeLensResolveRequest = {}));
    var CodeLensRefreshRequest;
    (function(CodeLensRefreshRequest2) {
      CodeLensRefreshRequest2.method = `workspace/codeLens/refresh`;
      CodeLensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      CodeLensRefreshRequest2.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest2.method);
    })(CodeLensRefreshRequest || (exports2.CodeLensRefreshRequest = CodeLensRefreshRequest = {}));
    var DocumentLinkRequest;
    (function(DocumentLinkRequest2) {
      DocumentLinkRequest2.method = "textDocument/documentLink";
      DocumentLinkRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentLinkRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkRequest2.method);
    })(DocumentLinkRequest || (exports2.DocumentLinkRequest = DocumentLinkRequest = {}));
    var DocumentLinkResolveRequest;
    (function(DocumentLinkResolveRequest2) {
      DocumentLinkResolveRequest2.method = "documentLink/resolve";
      DocumentLinkResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentLinkResolveRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest2.method);
    })(DocumentLinkResolveRequest || (exports2.DocumentLinkResolveRequest = DocumentLinkResolveRequest = {}));
    var DocumentFormattingRequest;
    (function(DocumentFormattingRequest2) {
      DocumentFormattingRequest2.method = "textDocument/formatting";
      DocumentFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest2.method);
    })(DocumentFormattingRequest || (exports2.DocumentFormattingRequest = DocumentFormattingRequest = {}));
    var DocumentRangeFormattingRequest;
    (function(DocumentRangeFormattingRequest2) {
      DocumentRangeFormattingRequest2.method = "textDocument/rangeFormatting";
      DocumentRangeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentRangeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest2.method);
    })(DocumentRangeFormattingRequest || (exports2.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest = {}));
    var DocumentRangesFormattingRequest;
    (function(DocumentRangesFormattingRequest2) {
      DocumentRangesFormattingRequest2.method = "textDocument/rangesFormatting";
      DocumentRangesFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentRangesFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangesFormattingRequest2.method);
    })(DocumentRangesFormattingRequest || (exports2.DocumentRangesFormattingRequest = DocumentRangesFormattingRequest = {}));
    var DocumentOnTypeFormattingRequest;
    (function(DocumentOnTypeFormattingRequest2) {
      DocumentOnTypeFormattingRequest2.method = "textDocument/onTypeFormatting";
      DocumentOnTypeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentOnTypeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest2.method);
    })(DocumentOnTypeFormattingRequest || (exports2.DocumentOnTypeFormattingRequest = DocumentOnTypeFormattingRequest = {}));
    var PrepareSupportDefaultBehavior;
    (function(PrepareSupportDefaultBehavior2) {
      PrepareSupportDefaultBehavior2.Identifier = 1;
    })(PrepareSupportDefaultBehavior || (exports2.PrepareSupportDefaultBehavior = PrepareSupportDefaultBehavior = {}));
    var RenameRequest;
    (function(RenameRequest2) {
      RenameRequest2.method = "textDocument/rename";
      RenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      RenameRequest2.type = new messages_1.ProtocolRequestType(RenameRequest2.method);
    })(RenameRequest || (exports2.RenameRequest = RenameRequest = {}));
    var PrepareRenameRequest;
    (function(PrepareRenameRequest2) {
      PrepareRenameRequest2.method = "textDocument/prepareRename";
      PrepareRenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      PrepareRenameRequest2.type = new messages_1.ProtocolRequestType(PrepareRenameRequest2.method);
    })(PrepareRenameRequest || (exports2.PrepareRenameRequest = PrepareRenameRequest = {}));
    var ExecuteCommandRequest;
    (function(ExecuteCommandRequest2) {
      ExecuteCommandRequest2.method = "workspace/executeCommand";
      ExecuteCommandRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ExecuteCommandRequest2.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest2.method);
    })(ExecuteCommandRequest || (exports2.ExecuteCommandRequest = ExecuteCommandRequest = {}));
    var ApplyWorkspaceEditRequest;
    (function(ApplyWorkspaceEditRequest2) {
      ApplyWorkspaceEditRequest2.method = "workspace/applyEdit";
      ApplyWorkspaceEditRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ApplyWorkspaceEditRequest2.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
    })(ApplyWorkspaceEditRequest || (exports2.ApplyWorkspaceEditRequest = ApplyWorkspaceEditRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/connection.js
var require_connection2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/connection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createProtocolConnection = void 0;
    var vscode_jsonrpc_1 = require_main();
    function createProtocolConnection(input, output, logger, options) {
      if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
      }
      return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
    }
    exports2.createProtocolConnection = createProtocolConnection;
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/api.js
var require_api2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/api.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LSPErrorCodes = exports2.createProtocolConnection = void 0;
    __exportStar(require_main(), exports2);
    __exportStar(require_main2(), exports2);
    __exportStar(require_messages2(), exports2);
    __exportStar(require_protocol(), exports2);
    var connection_1 = require_connection2();
    Object.defineProperty(exports2, "createProtocolConnection", { enumerable: true, get: function() {
      return connection_1.createProtocolConnection;
    } });
    var LSPErrorCodes;
    (function(LSPErrorCodes2) {
      LSPErrorCodes2.lspReservedErrorRangeStart = -32899;
      LSPErrorCodes2.RequestFailed = -32803;
      LSPErrorCodes2.ServerCancelled = -32802;
      LSPErrorCodes2.ContentModified = -32801;
      LSPErrorCodes2.RequestCancelled = -32800;
      LSPErrorCodes2.lspReservedErrorRangeEnd = -32800;
    })(LSPErrorCodes || (exports2.LSPErrorCodes = LSPErrorCodes = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/node/main.js
var require_main3 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createProtocolConnection = void 0;
    var node_1 = require_node();
    __exportStar(require_node(), exports2);
    __exportStar(require_api2(), exports2);
    function createProtocolConnection(input, output, logger, options) {
      return (0, node_1.createMessageConnection)(input, output, logger, options);
    }
    exports2.createProtocolConnection = createProtocolConnection;
  }
});

// node_modules/vscode-languageserver/lib/common/utils/uuid.js
var require_uuid = __commonJS({
  "node_modules/vscode-languageserver/lib/common/utils/uuid.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateUuid = exports2.parse = exports2.isUUID = exports2.v4 = exports2.empty = void 0;
    var ValueUUID = class {
      constructor(_value) {
        this._value = _value;
      }
      asHex() {
        return this._value;
      }
      equals(other) {
        return this.asHex() === other.asHex();
      }
    };
    var V4UUID = class _V4UUID extends ValueUUID {
      static _oneOf(array) {
        return array[Math.floor(array.length * Math.random())];
      }
      static _randomHex() {
        return _V4UUID._oneOf(_V4UUID._chars);
      }
      constructor() {
        super([
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          "4",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._oneOf(_V4UUID._timeHighBits),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex()
        ].join(""));
      }
    };
    V4UUID._chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    V4UUID._timeHighBits = ["8", "9", "a", "b"];
    exports2.empty = new ValueUUID("00000000-0000-0000-0000-000000000000");
    function v4() {
      return new V4UUID();
    }
    exports2.v4 = v4;
    var _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    function isUUID(value) {
      return _UUIDPattern.test(value);
    }
    exports2.isUUID = isUUID;
    function parse(value) {
      if (!isUUID(value)) {
        throw new Error("invalid uuid");
      }
      return new ValueUUID(value);
    }
    exports2.parse = parse;
    function generateUuid() {
      return v4().asHex();
    }
    exports2.generateUuid = generateUuid;
  }
});

// node_modules/vscode-languageserver/lib/common/progress.js
var require_progress = __commonJS({
  "node_modules/vscode-languageserver/lib/common/progress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.attachPartialResult = exports2.ProgressFeature = exports2.attachWorkDone = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var uuid_1 = require_uuid();
    var WorkDoneProgressReporterImpl = class _WorkDoneProgressReporterImpl {
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
        _WorkDoneProgressReporterImpl.Instances.set(this._token, this);
      }
      begin(title, percentage, message, cancellable) {
        let param = {
          kind: "begin",
          title,
          percentage,
          message,
          cancellable
        };
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      report(arg0, arg1) {
        let param = {
          kind: "report"
        };
        if (typeof arg0 === "number") {
          param.percentage = arg0;
          if (arg1 !== void 0) {
            param.message = arg1;
          }
        } else {
          param.message = arg0;
        }
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      done() {
        _WorkDoneProgressReporterImpl.Instances.delete(this._token);
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, { kind: "end" });
      }
    };
    WorkDoneProgressReporterImpl.Instances = /* @__PURE__ */ new Map();
    var WorkDoneProgressServerReporterImpl = class extends WorkDoneProgressReporterImpl {
      constructor(connection2, token) {
        super(connection2, token);
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      done() {
        this._source.dispose();
        super.done();
      }
      cancel() {
        this._source.cancel();
      }
    };
    var NullProgressReporter = class {
      constructor() {
      }
      begin() {
      }
      report() {
      }
      done() {
      }
    };
    var NullProgressServerReporter = class extends NullProgressReporter {
      constructor() {
        super();
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      done() {
        this._source.dispose();
      }
      cancel() {
        this._source.cancel();
      }
    };
    function attachWorkDone(connection2, params) {
      if (params === void 0 || params.workDoneToken === void 0) {
        return new NullProgressReporter();
      }
      const token = params.workDoneToken;
      delete params.workDoneToken;
      return new WorkDoneProgressReporterImpl(connection2, token);
    }
    exports2.attachWorkDone = attachWorkDone;
    var ProgressFeature = (Base) => {
      return class extends Base {
        constructor() {
          super();
          this._progressSupported = false;
        }
        initialize(capabilities) {
          super.initialize(capabilities);
          if (capabilities?.window?.workDoneProgress === true) {
            this._progressSupported = true;
            this.connection.onNotification(vscode_languageserver_protocol_1.WorkDoneProgressCancelNotification.type, (params) => {
              let progress = WorkDoneProgressReporterImpl.Instances.get(params.token);
              if (progress instanceof WorkDoneProgressServerReporterImpl || progress instanceof NullProgressServerReporter) {
                progress.cancel();
              }
            });
          }
        }
        attachWorkDoneProgress(token) {
          if (token === void 0) {
            return new NullProgressReporter();
          } else {
            return new WorkDoneProgressReporterImpl(this.connection, token);
          }
        }
        createWorkDoneProgress() {
          if (this._progressSupported) {
            const token = (0, uuid_1.generateUuid)();
            return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkDoneProgressCreateRequest.type, { token }).then(() => {
              const result = new WorkDoneProgressServerReporterImpl(this.connection, token);
              return result;
            });
          } else {
            return Promise.resolve(new NullProgressServerReporter());
          }
        }
      };
    };
    exports2.ProgressFeature = ProgressFeature;
    var ResultProgress;
    (function(ResultProgress2) {
      ResultProgress2.type = new vscode_languageserver_protocol_1.ProgressType();
    })(ResultProgress || (ResultProgress = {}));
    var ResultProgressReporterImpl = class {
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
      }
      report(data) {
        this._connection.sendProgress(ResultProgress.type, this._token, data);
      }
    };
    function attachPartialResult(connection2, params) {
      if (params === void 0 || params.partialResultToken === void 0) {
        return void 0;
      }
      const token = params.partialResultToken;
      delete params.partialResultToken;
      return new ResultProgressReporterImpl(connection2, token);
    }
    exports2.attachPartialResult = attachPartialResult;
  }
});

// node_modules/vscode-languageserver/lib/common/configuration.js
var require_configuration = __commonJS({
  "node_modules/vscode-languageserver/lib/common/configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfigurationFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var Is = require_is();
    var ConfigurationFeature = (Base) => {
      return class extends Base {
        getConfiguration(arg) {
          if (!arg) {
            return this._getConfiguration({});
          } else if (Is.string(arg)) {
            return this._getConfiguration({ section: arg });
          } else {
            return this._getConfiguration(arg);
          }
        }
        _getConfiguration(arg) {
          let params = {
            items: Array.isArray(arg) ? arg : [arg]
          };
          return this.connection.sendRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, params).then((result) => {
            if (Array.isArray(result)) {
              return Array.isArray(arg) ? result : result[0];
            } else {
              return Array.isArray(arg) ? [] : null;
            }
          });
        }
      };
    };
    exports2.ConfigurationFeature = ConfigurationFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/workspaceFolder.js
var require_workspaceFolder = __commonJS({
  "node_modules/vscode-languageserver/lib/common/workspaceFolder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WorkspaceFoldersFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var WorkspaceFoldersFeature = (Base) => {
      return class extends Base {
        constructor() {
          super();
          this._notificationIsAutoRegistered = false;
        }
        initialize(capabilities) {
          super.initialize(capabilities);
          let workspaceCapabilities = capabilities.workspace;
          if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
            this._onDidChangeWorkspaceFolders = new vscode_languageserver_protocol_1.Emitter();
            this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type, (params) => {
              this._onDidChangeWorkspaceFolders.fire(params.event);
            });
          }
        }
        fillServerCapabilities(capabilities) {
          super.fillServerCapabilities(capabilities);
          const changeNotifications = capabilities.workspace?.workspaceFolders?.changeNotifications;
          this._notificationIsAutoRegistered = changeNotifications === true || typeof changeNotifications === "string";
        }
        getWorkspaceFolders() {
          return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type);
        }
        get onDidChangeWorkspaceFolders() {
          if (!this._onDidChangeWorkspaceFolders) {
            throw new Error("Client doesn't support sending workspace folder change events.");
          }
          if (!this._notificationIsAutoRegistered && !this._unregistration) {
            this._unregistration = this.connection.client.register(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type);
          }
          return this._onDidChangeWorkspaceFolders.event;
        }
      };
    };
    exports2.WorkspaceFoldersFeature = WorkspaceFoldersFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/callHierarchy.js
var require_callHierarchy = __commonJS({
  "node_modules/vscode-languageserver/lib/common/callHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CallHierarchyFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var CallHierarchyFeature = (Base) => {
      return class extends Base {
        get callHierarchy() {
          return {
            onPrepare: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.CallHierarchyPrepareRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
              });
            },
            onIncomingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.CallHierarchyIncomingCallsRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onOutgoingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.CallHierarchyOutgoingCallsRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.CallHierarchyFeature = CallHierarchyFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/semanticTokens.js
var require_semanticTokens = __commonJS({
  "node_modules/vscode-languageserver/lib/common/semanticTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SemanticTokensBuilder = exports2.SemanticTokensDiff = exports2.SemanticTokensFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var SemanticTokensFeature = (Base) => {
      return class extends Base {
        get semanticTokens() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.SemanticTokensRefreshRequest.type);
            },
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onDelta: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensDeltaRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onRange: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensRangeRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.SemanticTokensFeature = SemanticTokensFeature;
    var SemanticTokensDiff = class {
      constructor(originalSequence, modifiedSequence) {
        this.originalSequence = originalSequence;
        this.modifiedSequence = modifiedSequence;
      }
      computeDiff() {
        const originalLength = this.originalSequence.length;
        const modifiedLength = this.modifiedSequence.length;
        let startIndex = 0;
        while (startIndex < modifiedLength && startIndex < originalLength && this.originalSequence[startIndex] === this.modifiedSequence[startIndex]) {
          startIndex++;
        }
        if (startIndex < modifiedLength && startIndex < originalLength) {
          let originalEndIndex = originalLength - 1;
          let modifiedEndIndex = modifiedLength - 1;
          while (originalEndIndex >= startIndex && modifiedEndIndex >= startIndex && this.originalSequence[originalEndIndex] === this.modifiedSequence[modifiedEndIndex]) {
            originalEndIndex--;
            modifiedEndIndex--;
          }
          if (originalEndIndex < startIndex || modifiedEndIndex < startIndex) {
            originalEndIndex++;
            modifiedEndIndex++;
          }
          const deleteCount = originalEndIndex - startIndex + 1;
          const newData = this.modifiedSequence.slice(startIndex, modifiedEndIndex + 1);
          if (newData.length === 1 && newData[0] === this.originalSequence[originalEndIndex]) {
            return [
              { start: startIndex, deleteCount: deleteCount - 1 }
            ];
          } else {
            return [
              { start: startIndex, deleteCount, data: newData }
            ];
          }
        } else if (startIndex < modifiedLength) {
          return [
            { start: startIndex, deleteCount: 0, data: this.modifiedSequence.slice(startIndex) }
          ];
        } else if (startIndex < originalLength) {
          return [
            { start: startIndex, deleteCount: originalLength - startIndex }
          ];
        } else {
          return [];
        }
      }
    };
    exports2.SemanticTokensDiff = SemanticTokensDiff;
    var SemanticTokensBuilder = class {
      constructor() {
        this._prevData = void 0;
        this.initialize();
      }
      initialize() {
        this._id = Date.now();
        this._prevLine = 0;
        this._prevChar = 0;
        this._data = [];
        this._dataLen = 0;
      }
      push(line, char, length, tokenType, tokenModifiers) {
        let pushLine = line;
        let pushChar = char;
        if (this._dataLen > 0) {
          pushLine -= this._prevLine;
          if (pushLine === 0) {
            pushChar -= this._prevChar;
          }
        }
        this._data[this._dataLen++] = pushLine;
        this._data[this._dataLen++] = pushChar;
        this._data[this._dataLen++] = length;
        this._data[this._dataLen++] = tokenType;
        this._data[this._dataLen++] = tokenModifiers;
        this._prevLine = line;
        this._prevChar = char;
      }
      get id() {
        return this._id.toString();
      }
      previousResult(id) {
        if (this.id === id) {
          this._prevData = this._data;
        }
        this.initialize();
      }
      build() {
        this._prevData = void 0;
        return {
          resultId: this.id,
          data: this._data
        };
      }
      canBuildEdits() {
        return this._prevData !== void 0;
      }
      buildEdits() {
        if (this._prevData !== void 0) {
          return {
            resultId: this.id,
            edits: new SemanticTokensDiff(this._prevData, this._data).computeDiff()
          };
        } else {
          return this.build();
        }
      }
    };
    exports2.SemanticTokensBuilder = SemanticTokensBuilder;
  }
});

// node_modules/vscode-languageserver/lib/common/showDocument.js
var require_showDocument = __commonJS({
  "node_modules/vscode-languageserver/lib/common/showDocument.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ShowDocumentFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var ShowDocumentFeature = (Base) => {
      return class extends Base {
        showDocument(params) {
          return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowDocumentRequest.type, params);
        }
      };
    };
    exports2.ShowDocumentFeature = ShowDocumentFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/fileOperations.js
var require_fileOperations = __commonJS({
  "node_modules/vscode-languageserver/lib/common/fileOperations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FileOperationsFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var FileOperationsFeature = (Base) => {
      return class extends Base {
        onDidCreateFiles(handler) {
          return this.connection.onNotification(vscode_languageserver_protocol_1.DidCreateFilesNotification.type, (params) => {
            handler(params);
          });
        }
        onDidRenameFiles(handler) {
          return this.connection.onNotification(vscode_languageserver_protocol_1.DidRenameFilesNotification.type, (params) => {
            handler(params);
          });
        }
        onDidDeleteFiles(handler) {
          return this.connection.onNotification(vscode_languageserver_protocol_1.DidDeleteFilesNotification.type, (params) => {
            handler(params);
          });
        }
        onWillCreateFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillCreateFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
        onWillRenameFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillRenameFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
        onWillDeleteFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillDeleteFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
      };
    };
    exports2.FileOperationsFeature = FileOperationsFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/linkedEditingRange.js
var require_linkedEditingRange = __commonJS({
  "node_modules/vscode-languageserver/lib/common/linkedEditingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LinkedEditingRangeFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var LinkedEditingRangeFeature = (Base) => {
      return class extends Base {
        onLinkedEditingRange(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.LinkedEditingRangeRequest.type, (params, cancel) => {
            return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
          });
        }
      };
    };
    exports2.LinkedEditingRangeFeature = LinkedEditingRangeFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/typeHierarchy.js
var require_typeHierarchy = __commonJS({
  "node_modules/vscode-languageserver/lib/common/typeHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TypeHierarchyFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var TypeHierarchyFeature = (Base) => {
      return class extends Base {
        get typeHierarchy() {
          return {
            onPrepare: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.TypeHierarchyPrepareRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
              });
            },
            onSupertypes: (handler) => {
              const type = vscode_languageserver_protocol_1.TypeHierarchySupertypesRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onSubtypes: (handler) => {
              const type = vscode_languageserver_protocol_1.TypeHierarchySubtypesRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.TypeHierarchyFeature = TypeHierarchyFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/inlineValue.js
var require_inlineValue = __commonJS({
  "node_modules/vscode-languageserver/lib/common/inlineValue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlineValueFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var InlineValueFeature = (Base) => {
      return class extends Base {
        get inlineValue() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.InlineValueRefreshRequest.type);
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlineValueRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params));
              });
            }
          };
        }
      };
    };
    exports2.InlineValueFeature = InlineValueFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/foldingRange.js
var require_foldingRange = __commonJS({
  "node_modules/vscode-languageserver/lib/common/foldingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FoldingRangeFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var FoldingRangeFeature = (Base) => {
      return class extends Base {
        get foldingRange() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.FoldingRangeRefreshRequest.type);
            },
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.FoldingRangeRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.FoldingRangeFeature = FoldingRangeFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/inlayHint.js
var require_inlayHint = __commonJS({
  "node_modules/vscode-languageserver/lib/common/inlayHint.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlayHintFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var InlayHintFeature = (Base) => {
      return class extends Base {
        get inlayHint() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.InlayHintRefreshRequest.type);
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params));
              });
            },
            resolve: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintResolveRequest.type, (params, cancel) => {
                return handler(params, cancel);
              });
            }
          };
        }
      };
    };
    exports2.InlayHintFeature = InlayHintFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/diagnostic.js
var require_diagnostic = __commonJS({
  "node_modules/vscode-languageserver/lib/common/diagnostic.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiagnosticFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var DiagnosticFeature = (Base) => {
      return class extends Base {
        get diagnostics() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.DiagnosticRefreshRequest.type);
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.partialResult, params));
              });
            },
            onWorkspace: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.partialResult, params));
              });
            }
          };
        }
      };
    };
    exports2.DiagnosticFeature = DiagnosticFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/textDocuments.js
var require_textDocuments = __commonJS({
  "node_modules/vscode-languageserver/lib/common/textDocuments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TextDocuments = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var TextDocuments2 = class {
      /**
       * Create a new text document manager.
       */
      constructor(configuration) {
        this._configuration = configuration;
        this._syncedDocuments = /* @__PURE__ */ new Map();
        this._onDidChangeContent = new vscode_languageserver_protocol_1.Emitter();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onWillSave = new vscode_languageserver_protocol_1.Emitter();
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been opened.
       */
      get onDidOpen() {
        return this._onDidOpen.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been opened or the content changes.
       */
      get onDidChangeContent() {
        return this._onDidChangeContent.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * will be saved.
       */
      get onWillSave() {
        return this._onWillSave.event;
      }
      /**
       * Sets a handler that will be called if a participant wants to provide
       * edits during a text document save.
       */
      onWillSaveWaitUntil(handler) {
        this._willSaveWaitUntil = handler;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been saved.
       */
      get onDidSave() {
        return this._onDidSave.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been closed.
       */
      get onDidClose() {
        return this._onDidClose.event;
      }
      /**
       * Returns the document for the given URI. Returns undefined if
       * the document is not managed by this instance.
       *
       * @param uri The text document's URI to retrieve.
       * @return the text document or `undefined`.
       */
      get(uri) {
        return this._syncedDocuments.get(uri);
      }
      /**
       * Returns all text documents managed by this instance.
       *
       * @return all text documents.
       */
      all() {
        return Array.from(this._syncedDocuments.values());
      }
      /**
       * Returns the URIs of all text documents managed by this instance.
       *
       * @return the URI's of all text documents.
       */
      keys() {
        return Array.from(this._syncedDocuments.keys());
      }
      /**
       * Listens for `low level` notification on the given connection to
       * update the text documents managed by this instance.
       *
       * Please note that the connection only provides handlers not an event model. Therefore
       * listening on a connection will overwrite the following handlers on a connection:
       * `onDidOpenTextDocument`, `onDidChangeTextDocument`, `onDidCloseTextDocument`,
       * `onWillSaveTextDocument`, `onWillSaveTextDocumentWaitUntil` and `onDidSaveTextDocument`.
       *
       * Use the corresponding events on the TextDocuments instance instead.
       *
       * @param connection The connection to listen on.
       */
      listen(connection2) {
        connection2.__textDocumentSync = vscode_languageserver_protocol_1.TextDocumentSyncKind.Incremental;
        const disposables = [];
        disposables.push(connection2.onDidOpenTextDocument((event) => {
          const td = event.textDocument;
          const document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
          this._syncedDocuments.set(td.uri, document);
          const toFire = Object.freeze({ document });
          this._onDidOpen.fire(toFire);
          this._onDidChangeContent.fire(toFire);
        }));
        disposables.push(connection2.onDidChangeTextDocument((event) => {
          const td = event.textDocument;
          const changes = event.contentChanges;
          if (changes.length === 0) {
            return;
          }
          const { version } = td;
          if (version === null || version === void 0) {
            throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
          }
          let syncedDocument = this._syncedDocuments.get(td.uri);
          if (syncedDocument !== void 0) {
            syncedDocument = this._configuration.update(syncedDocument, changes, version);
            this._syncedDocuments.set(td.uri, syncedDocument);
            this._onDidChangeContent.fire(Object.freeze({ document: syncedDocument }));
          }
        }));
        disposables.push(connection2.onDidCloseTextDocument((event) => {
          let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0) {
            this._syncedDocuments.delete(event.textDocument.uri);
            this._onDidClose.fire(Object.freeze({ document: syncedDocument }));
          }
        }));
        disposables.push(connection2.onWillSaveTextDocument((event) => {
          let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0) {
            this._onWillSave.fire(Object.freeze({ document: syncedDocument, reason: event.reason }));
          }
        }));
        disposables.push(connection2.onWillSaveTextDocumentWaitUntil((event, token) => {
          let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0 && this._willSaveWaitUntil) {
            return this._willSaveWaitUntil(Object.freeze({ document: syncedDocument, reason: event.reason }), token);
          } else {
            return [];
          }
        }));
        disposables.push(connection2.onDidSaveTextDocument((event) => {
          let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0) {
            this._onDidSave.fire(Object.freeze({ document: syncedDocument }));
          }
        }));
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          disposables.forEach((disposable) => disposable.dispose());
        });
      }
    };
    exports2.TextDocuments = TextDocuments2;
  }
});

// node_modules/vscode-languageserver/lib/common/notebook.js
var require_notebook = __commonJS({
  "node_modules/vscode-languageserver/lib/common/notebook.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NotebookDocuments = exports2.NotebookSyncFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var textDocuments_1 = require_textDocuments();
    var NotebookSyncFeature = (Base) => {
      return class extends Base {
        get synchronization() {
          return {
            onDidOpenNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidOpenNotebookDocumentNotification.type, (params) => {
                handler(params);
              });
            },
            onDidChangeNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeNotebookDocumentNotification.type, (params) => {
                handler(params);
              });
            },
            onDidSaveNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidSaveNotebookDocumentNotification.type, (params) => {
                handler(params);
              });
            },
            onDidCloseNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidCloseNotebookDocumentNotification.type, (params) => {
                handler(params);
              });
            }
          };
        }
      };
    };
    exports2.NotebookSyncFeature = NotebookSyncFeature;
    var CellTextDocumentConnection = class _CellTextDocumentConnection {
      onDidOpenTextDocument(handler) {
        this.openHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.openHandler = void 0;
        });
      }
      openTextDocument(params) {
        this.openHandler && this.openHandler(params);
      }
      onDidChangeTextDocument(handler) {
        this.changeHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.changeHandler = handler;
        });
      }
      changeTextDocument(params) {
        this.changeHandler && this.changeHandler(params);
      }
      onDidCloseTextDocument(handler) {
        this.closeHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.closeHandler = void 0;
        });
      }
      closeTextDocument(params) {
        this.closeHandler && this.closeHandler(params);
      }
      onWillSaveTextDocument() {
        return _CellTextDocumentConnection.NULL_DISPOSE;
      }
      onWillSaveTextDocumentWaitUntil() {
        return _CellTextDocumentConnection.NULL_DISPOSE;
      }
      onDidSaveTextDocument() {
        return _CellTextDocumentConnection.NULL_DISPOSE;
      }
    };
    CellTextDocumentConnection.NULL_DISPOSE = Object.freeze({ dispose: () => {
    } });
    var NotebookDocuments = class {
      constructor(configurationOrTextDocuments) {
        if (configurationOrTextDocuments instanceof textDocuments_1.TextDocuments) {
          this._cellTextDocuments = configurationOrTextDocuments;
        } else {
          this._cellTextDocuments = new textDocuments_1.TextDocuments(configurationOrTextDocuments);
        }
        this.notebookDocuments = /* @__PURE__ */ new Map();
        this.notebookCellMap = /* @__PURE__ */ new Map();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidChange = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
      }
      get cellTextDocuments() {
        return this._cellTextDocuments;
      }
      getCellTextDocument(cell) {
        return this._cellTextDocuments.get(cell.document);
      }
      getNotebookDocument(uri) {
        return this.notebookDocuments.get(uri);
      }
      getNotebookCell(uri) {
        const value = this.notebookCellMap.get(uri);
        return value && value[0];
      }
      findNotebookDocumentForCell(cell) {
        const key = typeof cell === "string" ? cell : cell.document;
        const value = this.notebookCellMap.get(key);
        return value && value[1];
      }
      get onDidOpen() {
        return this._onDidOpen.event;
      }
      get onDidSave() {
        return this._onDidSave.event;
      }
      get onDidChange() {
        return this._onDidChange.event;
      }
      get onDidClose() {
        return this._onDidClose.event;
      }
      /**
       * Listens for `low level` notification on the given connection to
       * update the notebook documents managed by this instance.
       *
       * Please note that the connection only provides handlers not an event model. Therefore
       * listening on a connection will overwrite the following handlers on a connection:
       * `onDidOpenNotebookDocument`, `onDidChangeNotebookDocument`, `onDidSaveNotebookDocument`,
       *  and `onDidCloseNotebookDocument`.
       *
       * @param connection The connection to listen on.
       */
      listen(connection2) {
        const cellTextDocumentConnection = new CellTextDocumentConnection();
        const disposables = [];
        disposables.push(this.cellTextDocuments.listen(cellTextDocumentConnection));
        disposables.push(connection2.notebooks.synchronization.onDidOpenNotebookDocument((params) => {
          this.notebookDocuments.set(params.notebookDocument.uri, params.notebookDocument);
          for (const cellTextDocument of params.cellTextDocuments) {
            cellTextDocumentConnection.openTextDocument({ textDocument: cellTextDocument });
          }
          this.updateCellMap(params.notebookDocument);
          this._onDidOpen.fire(params.notebookDocument);
        }));
        disposables.push(connection2.notebooks.synchronization.onDidChangeNotebookDocument((params) => {
          const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
          if (notebookDocument === void 0) {
            return;
          }
          notebookDocument.version = params.notebookDocument.version;
          const oldMetadata = notebookDocument.metadata;
          let metadataChanged = false;
          const change = params.change;
          if (change.metadata !== void 0) {
            metadataChanged = true;
            notebookDocument.metadata = change.metadata;
          }
          const opened = [];
          const closed = [];
          const data = [];
          const text = [];
          if (change.cells !== void 0) {
            const changedCells = change.cells;
            if (changedCells.structure !== void 0) {
              const array = changedCells.structure.array;
              notebookDocument.cells.splice(array.start, array.deleteCount, ...array.cells !== void 0 ? array.cells : []);
              if (changedCells.structure.didOpen !== void 0) {
                for (const open of changedCells.structure.didOpen) {
                  cellTextDocumentConnection.openTextDocument({ textDocument: open });
                  opened.push(open.uri);
                }
              }
              if (changedCells.structure.didClose) {
                for (const close of changedCells.structure.didClose) {
                  cellTextDocumentConnection.closeTextDocument({ textDocument: close });
                  closed.push(close.uri);
                }
              }
            }
            if (changedCells.data !== void 0) {
              const cellUpdates = new Map(changedCells.data.map((cell) => [cell.document, cell]));
              for (let i = 0; i <= notebookDocument.cells.length; i++) {
                const change2 = cellUpdates.get(notebookDocument.cells[i].document);
                if (change2 !== void 0) {
                  const old = notebookDocument.cells.splice(i, 1, change2);
                  data.push({ old: old[0], new: change2 });
                  cellUpdates.delete(change2.document);
                  if (cellUpdates.size === 0) {
                    break;
                  }
                }
              }
            }
            if (changedCells.textContent !== void 0) {
              for (const cellTextDocument of changedCells.textContent) {
                cellTextDocumentConnection.changeTextDocument({ textDocument: cellTextDocument.document, contentChanges: cellTextDocument.changes });
                text.push(cellTextDocument.document.uri);
              }
            }
          }
          this.updateCellMap(notebookDocument);
          const changeEvent = { notebookDocument };
          if (metadataChanged) {
            changeEvent.metadata = { old: oldMetadata, new: notebookDocument.metadata };
          }
          const added = [];
          for (const open of opened) {
            added.push(this.getNotebookCell(open));
          }
          const removed = [];
          for (const close of closed) {
            removed.push(this.getNotebookCell(close));
          }
          const textContent = [];
          for (const change2 of text) {
            textContent.push(this.getNotebookCell(change2));
          }
          if (added.length > 0 || removed.length > 0 || data.length > 0 || textContent.length > 0) {
            changeEvent.cells = { added, removed, changed: { data, textContent } };
          }
          if (changeEvent.metadata !== void 0 || changeEvent.cells !== void 0) {
            this._onDidChange.fire(changeEvent);
          }
        }));
        disposables.push(connection2.notebooks.synchronization.onDidSaveNotebookDocument((params) => {
          const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
          if (notebookDocument === void 0) {
            return;
          }
          this._onDidSave.fire(notebookDocument);
        }));
        disposables.push(connection2.notebooks.synchronization.onDidCloseNotebookDocument((params) => {
          const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
          if (notebookDocument === void 0) {
            return;
          }
          this._onDidClose.fire(notebookDocument);
          for (const cellTextDocument of params.cellTextDocuments) {
            cellTextDocumentConnection.closeTextDocument({ textDocument: cellTextDocument });
          }
          this.notebookDocuments.delete(params.notebookDocument.uri);
          for (const cell of notebookDocument.cells) {
            this.notebookCellMap.delete(cell.document);
          }
        }));
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          disposables.forEach((disposable) => disposable.dispose());
        });
      }
      updateCellMap(notebookDocument) {
        for (const cell of notebookDocument.cells) {
          this.notebookCellMap.set(cell.document, [cell, notebookDocument]);
        }
      }
    };
    exports2.NotebookDocuments = NotebookDocuments;
  }
});

// node_modules/vscode-languageserver/lib/common/moniker.js
var require_moniker = __commonJS({
  "node_modules/vscode-languageserver/lib/common/moniker.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MonikerFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var MonikerFeature = (Base) => {
      return class extends Base {
        get moniker() {
          return {
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.MonikerRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.MonikerFeature = MonikerFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/server.js
var require_server = __commonJS({
  "node_modules/vscode-languageserver/lib/common/server.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createConnection = exports2.combineFeatures = exports2.combineNotebooksFeatures = exports2.combineLanguagesFeatures = exports2.combineWorkspaceFeatures = exports2.combineWindowFeatures = exports2.combineClientFeatures = exports2.combineTracerFeatures = exports2.combineTelemetryFeatures = exports2.combineConsoleFeatures = exports2._NotebooksImpl = exports2._LanguagesImpl = exports2.BulkUnregistration = exports2.BulkRegistration = exports2.ErrorMessageTracker = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var Is = require_is();
    var UUID = require_uuid();
    var progress_1 = require_progress();
    var configuration_1 = require_configuration();
    var workspaceFolder_1 = require_workspaceFolder();
    var callHierarchy_1 = require_callHierarchy();
    var semanticTokens_1 = require_semanticTokens();
    var showDocument_1 = require_showDocument();
    var fileOperations_1 = require_fileOperations();
    var linkedEditingRange_1 = require_linkedEditingRange();
    var typeHierarchy_1 = require_typeHierarchy();
    var inlineValue_1 = require_inlineValue();
    var foldingRange_1 = require_foldingRange();
    var inlayHint_1 = require_inlayHint();
    var diagnostic_1 = require_diagnostic();
    var notebook_1 = require_notebook();
    var moniker_1 = require_moniker();
    function null2Undefined(value) {
      if (value === null) {
        return void 0;
      }
      return value;
    }
    var ErrorMessageTracker = class {
      constructor() {
        this._messages = /* @__PURE__ */ Object.create(null);
      }
      /**
       * Add a message to the tracker.
       *
       * @param message The message to add.
       */
      add(message) {
        let count = this._messages[message];
        if (!count) {
          count = 0;
        }
        count++;
        this._messages[message] = count;
      }
      /**
       * Send all tracked messages to the connection's window.
       *
       * @param connection The connection established between client and server.
       */
      sendErrors(connection2) {
        Object.keys(this._messages).forEach((message) => {
          connection2.window.showErrorMessage(message);
        });
      }
    };
    exports2.ErrorMessageTracker = ErrorMessageTracker;
    var RemoteConsoleImpl = class {
      constructor() {
      }
      rawAttach(connection2) {
        this._rawConnection = connection2;
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      fillServerCapabilities(_capabilities) {
      }
      initialize(_capabilities) {
      }
      error(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Error, message);
      }
      warn(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Warning, message);
      }
      info(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Info, message);
      }
      log(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Log, message);
      }
      debug(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Debug, message);
      }
      send(type, message) {
        if (this._rawConnection) {
          this._rawConnection.sendNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, { type, message }).catch(() => {
            (0, vscode_languageserver_protocol_1.RAL)().console.error(`Sending log message failed`);
          });
        }
      }
    };
    var _RemoteWindowImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      showErrorMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Error, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showWarningMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Warning, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showInformationMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Info, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
    };
    var RemoteWindowImpl = (0, showDocument_1.ShowDocumentFeature)((0, progress_1.ProgressFeature)(_RemoteWindowImpl));
    var BulkRegistration;
    (function(BulkRegistration2) {
      function create() {
        return new BulkRegistrationImpl();
      }
      BulkRegistration2.create = create;
    })(BulkRegistration || (exports2.BulkRegistration = BulkRegistration = {}));
    var BulkRegistrationImpl = class {
      constructor() {
        this._registrations = [];
        this._registered = /* @__PURE__ */ new Set();
      }
      add(type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        if (this._registered.has(method)) {
          throw new Error(`${method} is already added to this registration`);
        }
        const id = UUID.generateUuid();
        this._registrations.push({
          id,
          method,
          registerOptions: registerOptions || {}
        });
        this._registered.add(method);
      }
      asRegistrationParams() {
        return {
          registrations: this._registrations
        };
      }
    };
    var BulkUnregistration;
    (function(BulkUnregistration2) {
      function create() {
        return new BulkUnregistrationImpl(void 0, []);
      }
      BulkUnregistration2.create = create;
    })(BulkUnregistration || (exports2.BulkUnregistration = BulkUnregistration = {}));
    var BulkUnregistrationImpl = class {
      constructor(_connection, unregistrations) {
        this._connection = _connection;
        this._unregistrations = /* @__PURE__ */ new Map();
        unregistrations.forEach((unregistration) => {
          this._unregistrations.set(unregistration.method, unregistration);
        });
      }
      get isAttached() {
        return !!this._connection;
      }
      attach(connection2) {
        this._connection = connection2;
      }
      add(unregistration) {
        this._unregistrations.set(unregistration.method, unregistration);
      }
      dispose() {
        let unregistrations = [];
        for (let unregistration of this._unregistrations.values()) {
          unregistrations.push(unregistration);
        }
        let params = {
          unregisterations: unregistrations
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
          this._connection.console.info(`Bulk unregistration failed.`);
        });
      }
      disposeSingle(arg) {
        const method = Is.string(arg) ? arg : arg.method;
        const unregistration = this._unregistrations.get(method);
        if (!unregistration) {
          return false;
        }
        let params = {
          unregisterations: [unregistration]
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(() => {
          this._unregistrations.delete(method);
        }, (_error) => {
          this._connection.console.info(`Un-registering request handler for ${unregistration.id} failed.`);
        });
        return true;
      }
    };
    var RemoteClientImpl = class {
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
        if (typeOrRegistrations instanceof BulkRegistrationImpl) {
          return this.registerMany(typeOrRegistrations);
        } else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
          return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
        } else {
          return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
        }
      }
      registerSingle1(unregistration, type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        let params = {
          registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        if (!unregistration.isAttached) {
          unregistration.attach(this.connection);
        }
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          unregistration.add({ id, method });
          return unregistration;
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      registerSingle2(type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        let params = {
          registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          return vscode_languageserver_protocol_1.Disposable.create(() => {
            this.unregisterSingle(id, method).catch(() => {
              this.connection.console.info(`Un-registering capability with id ${id} failed.`);
            });
          });
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      unregisterSingle(id, method) {
        let params = {
          unregisterations: [{ id, method }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
          this.connection.console.info(`Un-registering request handler for ${id} failed.`);
        });
      }
      registerMany(registrations) {
        let params = registrations.asRegistrationParams();
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(() => {
          return new BulkUnregistrationImpl(this._connection, params.registrations.map((registration) => {
            return { id: registration.id, method: registration.method };
          }));
        }, (_error) => {
          this.connection.console.info(`Bulk registration failed.`);
          return Promise.reject(_error);
        });
      }
    };
    var _RemoteWorkspaceImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      applyEdit(paramOrEdit) {
        function isApplyWorkspaceEditParams(value) {
          return value && !!value.edit;
        }
        let params = isApplyWorkspaceEditParams(paramOrEdit) ? paramOrEdit : { edit: paramOrEdit };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params);
      }
    };
    var RemoteWorkspaceImpl = (0, fileOperations_1.FileOperationsFeature)((0, workspaceFolder_1.WorkspaceFoldersFeature)((0, configuration_1.ConfigurationFeature)(_RemoteWorkspaceImpl)));
    var TracerImpl = class {
      constructor() {
        this._trace = vscode_languageserver_protocol_1.Trace.Off;
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      set trace(value) {
        this._trace = value;
      }
      log(message, verbose) {
        if (this._trace === vscode_languageserver_protocol_1.Trace.Off) {
          return;
        }
        this.connection.sendNotification(vscode_languageserver_protocol_1.LogTraceNotification.type, {
          message,
          verbose: this._trace === vscode_languageserver_protocol_1.Trace.Verbose ? verbose : void 0
        }).catch(() => {
        });
      }
    };
    var TelemetryImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      logEvent(data) {
        this.connection.sendNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, data).catch(() => {
          this.connection.console.log(`Sending TelemetryEventNotification failed`);
        });
      }
    };
    var _LanguagesImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      attachWorkDoneProgress(params) {
        return (0, progress_1.attachWorkDone)(this.connection, params);
      }
      attachPartialResultProgress(_type, params) {
        return (0, progress_1.attachPartialResult)(this.connection, params);
      }
    };
    exports2._LanguagesImpl = _LanguagesImpl;
    var LanguagesImpl = (0, foldingRange_1.FoldingRangeFeature)((0, moniker_1.MonikerFeature)((0, diagnostic_1.DiagnosticFeature)((0, inlayHint_1.InlayHintFeature)((0, inlineValue_1.InlineValueFeature)((0, typeHierarchy_1.TypeHierarchyFeature)((0, linkedEditingRange_1.LinkedEditingRangeFeature)((0, semanticTokens_1.SemanticTokensFeature)((0, callHierarchy_1.CallHierarchyFeature)(_LanguagesImpl)))))))));
    var _NotebooksImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      attachWorkDoneProgress(params) {
        return (0, progress_1.attachWorkDone)(this.connection, params);
      }
      attachPartialResultProgress(_type, params) {
        return (0, progress_1.attachPartialResult)(this.connection, params);
      }
    };
    exports2._NotebooksImpl = _NotebooksImpl;
    var NotebooksImpl = (0, notebook_1.NotebookSyncFeature)(_NotebooksImpl);
    function combineConsoleFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineConsoleFeatures = combineConsoleFeatures;
    function combineTelemetryFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineTelemetryFeatures = combineTelemetryFeatures;
    function combineTracerFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineTracerFeatures = combineTracerFeatures;
    function combineClientFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineClientFeatures = combineClientFeatures;
    function combineWindowFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineWindowFeatures = combineWindowFeatures;
    function combineWorkspaceFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineWorkspaceFeatures = combineWorkspaceFeatures;
    function combineLanguagesFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineLanguagesFeatures = combineLanguagesFeatures;
    function combineNotebooksFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineNotebooksFeatures = combineNotebooksFeatures;
    function combineFeatures(one, two) {
      function combine(one2, two2, func) {
        if (one2 && two2) {
          return func(one2, two2);
        } else if (one2) {
          return one2;
        } else {
          return two2;
        }
      }
      let result = {
        __brand: "features",
        console: combine(one.console, two.console, combineConsoleFeatures),
        tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
        telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
        client: combine(one.client, two.client, combineClientFeatures),
        window: combine(one.window, two.window, combineWindowFeatures),
        workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures),
        languages: combine(one.languages, two.languages, combineLanguagesFeatures),
        notebooks: combine(one.notebooks, two.notebooks, combineNotebooksFeatures)
      };
      return result;
    }
    exports2.combineFeatures = combineFeatures;
    function createConnection2(connectionFactory, watchDog, factories) {
      const logger = factories && factories.console ? new (factories.console(RemoteConsoleImpl))() : new RemoteConsoleImpl();
      const connection2 = connectionFactory(logger);
      logger.rawAttach(connection2);
      const tracer = factories && factories.tracer ? new (factories.tracer(TracerImpl))() : new TracerImpl();
      const telemetry = factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl))() : new TelemetryImpl();
      const client = factories && factories.client ? new (factories.client(RemoteClientImpl))() : new RemoteClientImpl();
      const remoteWindow = factories && factories.window ? new (factories.window(RemoteWindowImpl))() : new RemoteWindowImpl();
      const workspace2 = factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl))() : new RemoteWorkspaceImpl();
      const languages = factories && factories.languages ? new (factories.languages(LanguagesImpl))() : new LanguagesImpl();
      const notebooks = factories && factories.notebooks ? new (factories.notebooks(NotebooksImpl))() : new NotebooksImpl();
      const allRemotes = [logger, tracer, telemetry, client, remoteWindow, workspace2, languages, notebooks];
      function asPromise(value) {
        if (value instanceof Promise) {
          return value;
        } else if (Is.thenable(value)) {
          return new Promise((resolve, reject) => {
            value.then((resolved) => resolve(resolved), (error) => reject(error));
          });
        } else {
          return Promise.resolve(value);
        }
      }
      let shutdownHandler = void 0;
      let initializeHandler = void 0;
      let exitHandler = void 0;
      let protocolConnection = {
        listen: () => connection2.listen(),
        sendRequest: (type, ...params) => connection2.sendRequest(Is.string(type) ? type : type.method, ...params),
        onRequest: (type, handler) => connection2.onRequest(type, handler),
        sendNotification: (type, param) => {
          const method = Is.string(type) ? type : type.method;
          return connection2.sendNotification(method, param);
        },
        onNotification: (type, handler) => connection2.onNotification(type, handler),
        onProgress: connection2.onProgress,
        sendProgress: connection2.sendProgress,
        onInitialize: (handler) => {
          initializeHandler = handler;
          return {
            dispose: () => {
              initializeHandler = void 0;
            }
          };
        },
        onInitialized: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.InitializedNotification.type, handler),
        onShutdown: (handler) => {
          shutdownHandler = handler;
          return {
            dispose: () => {
              shutdownHandler = void 0;
            }
          };
        },
        onExit: (handler) => {
          exitHandler = handler;
          return {
            dispose: () => {
              exitHandler = void 0;
            }
          };
        },
        get console() {
          return logger;
        },
        get telemetry() {
          return telemetry;
        },
        get tracer() {
          return tracer;
        },
        get client() {
          return client;
        },
        get window() {
          return remoteWindow;
        },
        get workspace() {
          return workspace2;
        },
        get languages() {
          return languages;
        },
        get notebooks() {
          return notebooks;
        },
        onDidChangeConfiguration: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, handler),
        onDidChangeWatchedFiles: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, handler),
        __textDocumentSync: void 0,
        onDidOpenTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, handler),
        onDidChangeTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, handler),
        onDidCloseTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, handler),
        onWillSaveTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, handler),
        onWillSaveTextDocumentWaitUntil: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, handler),
        onDidSaveTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, handler),
        sendDiagnostics: (params) => connection2.sendNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, params),
        onHover: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.HoverRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
        }),
        onCompletion: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CompletionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onCompletionResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, handler),
        onSignatureHelp: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
        }),
        onDeclaration: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onDefinition: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onTypeDefinition: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onImplementation: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onReferences: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onDocumentHighlight: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onDocumentSymbol: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onWorkspaceSymbol: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onWorkspaceSymbolResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolResolveRequest.type, handler),
        onCodeAction: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onCodeActionResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeActionResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onCodeLens: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onCodeLensResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentFormatting: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
        }),
        onDocumentRangeFormatting: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
        }),
        onDocumentOnTypeFormatting: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onRenameRequest: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.RenameRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
        }),
        onPrepareRename: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentLinks: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onDocumentLinkResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentColor: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onColorPresentation: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onFoldingRanges: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onSelectionRanges: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.SelectionRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), (0, progress_1.attachPartialResult)(connection2, params));
        }),
        onExecuteCommand: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
        }),
        dispose: () => connection2.dispose()
      };
      for (let remote of allRemotes) {
        remote.attach(protocolConnection);
      }
      connection2.onRequest(vscode_languageserver_protocol_1.InitializeRequest.type, (params) => {
        watchDog.initialize(params);
        if (Is.string(params.trace)) {
          tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.trace);
        }
        for (let remote of allRemotes) {
          remote.initialize(params.capabilities);
        }
        if (initializeHandler) {
          let result = initializeHandler(params, new vscode_languageserver_protocol_1.CancellationTokenSource().token, (0, progress_1.attachWorkDone)(connection2, params), void 0);
          return asPromise(result).then((value) => {
            if (value instanceof vscode_languageserver_protocol_1.ResponseError) {
              return value;
            }
            let result2 = value;
            if (!result2) {
              result2 = { capabilities: {} };
            }
            let capabilities = result2.capabilities;
            if (!capabilities) {
              capabilities = {};
              result2.capabilities = capabilities;
            }
            if (capabilities.textDocumentSync === void 0 || capabilities.textDocumentSync === null) {
              capabilities.textDocumentSync = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            } else if (!Is.number(capabilities.textDocumentSync) && !Is.number(capabilities.textDocumentSync.change)) {
              capabilities.textDocumentSync.change = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            }
            for (let remote of allRemotes) {
              remote.fillServerCapabilities(capabilities);
            }
            return result2;
          });
        } else {
          let result = { capabilities: { textDocumentSync: vscode_languageserver_protocol_1.TextDocumentSyncKind.None } };
          for (let remote of allRemotes) {
            remote.fillServerCapabilities(result.capabilities);
          }
          return result;
        }
      });
      connection2.onRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, () => {
        watchDog.shutdownReceived = true;
        if (shutdownHandler) {
          return shutdownHandler(new vscode_languageserver_protocol_1.CancellationTokenSource().token);
        } else {
          return void 0;
        }
      });
      connection2.onNotification(vscode_languageserver_protocol_1.ExitNotification.type, () => {
        try {
          if (exitHandler) {
            exitHandler();
          }
        } finally {
          if (watchDog.shutdownReceived) {
            watchDog.exit(0);
          } else {
            watchDog.exit(1);
          }
        }
      });
      connection2.onNotification(vscode_languageserver_protocol_1.SetTraceNotification.type, (params) => {
        tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.value);
      });
      return protocolConnection;
    }
    exports2.createConnection = createConnection2;
  }
});

// node_modules/vscode-languageserver/lib/node/files.js
var require_files = __commonJS({
  "node_modules/vscode-languageserver/lib/node/files.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveModulePath = exports2.FileSystem = exports2.resolveGlobalYarnPath = exports2.resolveGlobalNodePath = exports2.resolve = exports2.uriToFilePath = void 0;
    var url = require("url");
    var path12 = require("path");
    var fs6 = require("fs");
    var child_process_1 = require("child_process");
    function uriToFilePath(uri) {
      let parsed = url.parse(uri);
      if (parsed.protocol !== "file:" || !parsed.path) {
        return void 0;
      }
      let segments = parsed.path.split("/");
      for (var i = 0, len = segments.length; i < len; i++) {
        segments[i] = decodeURIComponent(segments[i]);
      }
      if (process.platform === "win32" && segments.length > 1) {
        let first = segments[0];
        let second = segments[1];
        if (first.length === 0 && second.length > 1 && second[1] === ":") {
          segments.shift();
        }
      }
      return path12.normalize(segments.join("/"));
    }
    exports2.uriToFilePath = uriToFilePath;
    function isWindows() {
      return process.platform === "win32";
    }
    function resolve(moduleName, nodePath, cwd, tracer) {
      const nodePathKey = "NODE_PATH";
      const app = [
        "var p = process;",
        "p.on('message',function(m){",
        "if(m.c==='e'){",
        "p.exit(0);",
        "}",
        "else if(m.c==='rs'){",
        "try{",
        "var r=require.resolve(m.a);",
        "p.send({c:'r',s:true,r:r});",
        "}",
        "catch(err){",
        "p.send({c:'r',s:false});",
        "}",
        "}",
        "});"
      ].join("");
      return new Promise((resolve2, reject) => {
        let env3 = process.env;
        let newEnv = /* @__PURE__ */ Object.create(null);
        Object.keys(env3).forEach((key) => newEnv[key] = env3[key]);
        if (nodePath && fs6.existsSync(nodePath)) {
          if (newEnv[nodePathKey]) {
            newEnv[nodePathKey] = nodePath + path12.delimiter + newEnv[nodePathKey];
          } else {
            newEnv[nodePathKey] = nodePath;
          }
          if (tracer) {
            tracer(`NODE_PATH value is: ${newEnv[nodePathKey]}`);
          }
        }
        newEnv["ELECTRON_RUN_AS_NODE"] = "1";
        try {
          let cp = (0, child_process_1.fork)("", [], {
            cwd,
            env: newEnv,
            execArgv: ["-e", app]
          });
          if (cp.pid === void 0) {
            reject(new Error(`Starting process to resolve node module  ${moduleName} failed`));
            return;
          }
          cp.on("error", (error) => {
            reject(error);
          });
          cp.on("message", (message2) => {
            if (message2.c === "r") {
              cp.send({ c: "e" });
              if (message2.s) {
                resolve2(message2.r);
              } else {
                reject(new Error(`Failed to resolve module: ${moduleName}`));
              }
            }
          });
          let message = {
            c: "rs",
            a: moduleName
          };
          cp.send(message);
        } catch (error) {
          reject(error);
        }
      });
    }
    exports2.resolve = resolve;
    function resolveGlobalNodePath(tracer) {
      let npmCommand = "npm";
      const env3 = /* @__PURE__ */ Object.create(null);
      Object.keys(process.env).forEach((key) => env3[key] = process.env[key]);
      env3["NO_UPDATE_NOTIFIER"] = "true";
      const options = {
        encoding: "utf8",
        env: env3
      };
      if (isWindows()) {
        npmCommand = "npm.cmd";
        options.shell = true;
      }
      let handler = () => {
      };
      try {
        process.on("SIGPIPE", handler);
        let stdout = (0, child_process_1.spawnSync)(npmCommand, ["config", "get", "prefix"], options).stdout;
        if (!stdout) {
          if (tracer) {
            tracer(`'npm config get prefix' didn't return a value.`);
          }
          return void 0;
        }
        let prefix = stdout.trim();
        if (tracer) {
          tracer(`'npm config get prefix' value is: ${prefix}`);
        }
        if (prefix.length > 0) {
          if (isWindows()) {
            return path12.join(prefix, "node_modules");
          } else {
            return path12.join(prefix, "lib", "node_modules");
          }
        }
        return void 0;
      } catch (err) {
        return void 0;
      } finally {
        process.removeListener("SIGPIPE", handler);
      }
    }
    exports2.resolveGlobalNodePath = resolveGlobalNodePath;
    function resolveGlobalYarnPath(tracer) {
      let yarnCommand = "yarn";
      let options = {
        encoding: "utf8"
      };
      if (isWindows()) {
        yarnCommand = "yarn.cmd";
        options.shell = true;
      }
      let handler = () => {
      };
      try {
        process.on("SIGPIPE", handler);
        let results = (0, child_process_1.spawnSync)(yarnCommand, ["global", "dir", "--json"], options);
        let stdout = results.stdout;
        if (!stdout) {
          if (tracer) {
            tracer(`'yarn global dir' didn't return a value.`);
            if (results.stderr) {
              tracer(results.stderr);
            }
          }
          return void 0;
        }
        let lines = stdout.trim().split(/\r?\n/);
        for (let line of lines) {
          try {
            let yarn = JSON.parse(line);
            if (yarn.type === "log") {
              return path12.join(yarn.data, "node_modules");
            }
          } catch (e) {
          }
        }
        return void 0;
      } catch (err) {
        return void 0;
      } finally {
        process.removeListener("SIGPIPE", handler);
      }
    }
    exports2.resolveGlobalYarnPath = resolveGlobalYarnPath;
    var FileSystem;
    (function(FileSystem2) {
      let _isCaseSensitive = void 0;
      function isCaseSensitive() {
        if (_isCaseSensitive !== void 0) {
          return _isCaseSensitive;
        }
        if (process.platform === "win32") {
          _isCaseSensitive = false;
        } else {
          _isCaseSensitive = !fs6.existsSync(__filename.toUpperCase()) || !fs6.existsSync(__filename.toLowerCase());
        }
        return _isCaseSensitive;
      }
      FileSystem2.isCaseSensitive = isCaseSensitive;
      function isParent(parent, child) {
        if (isCaseSensitive()) {
          return path12.normalize(child).indexOf(path12.normalize(parent)) === 0;
        } else {
          return path12.normalize(child).toLowerCase().indexOf(path12.normalize(parent).toLowerCase()) === 0;
        }
      }
      FileSystem2.isParent = isParent;
    })(FileSystem || (exports2.FileSystem = FileSystem = {}));
    function resolveModulePath(workspaceRoot, moduleName, nodePath, tracer) {
      if (nodePath) {
        if (!path12.isAbsolute(nodePath)) {
          nodePath = path12.join(workspaceRoot, nodePath);
        }
        return resolve(moduleName, nodePath, nodePath, tracer).then((value) => {
          if (FileSystem.isParent(nodePath, value)) {
            return value;
          } else {
            return Promise.reject(new Error(`Failed to load ${moduleName} from node path location.`));
          }
        }).then(void 0, (_error) => {
          return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
        });
      } else {
        return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
      }
    }
    exports2.resolveModulePath = resolveModulePath;
  }
});

// node_modules/vscode-languageserver-protocol/node.js
var require_node2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main3();
  }
});

// node_modules/vscode-languageserver/lib/common/inlineCompletion.proposed.js
var require_inlineCompletion_proposed = __commonJS({
  "node_modules/vscode-languageserver/lib/common/inlineCompletion.proposed.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InlineCompletionFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main3();
    var InlineCompletionFeature = (Base) => {
      return class extends Base {
        get inlineCompletion() {
          return {
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlineCompletionRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params));
              });
            }
          };
        }
      };
    };
    exports2.InlineCompletionFeature = InlineCompletionFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/api.js
var require_api3 = __commonJS({
  "node_modules/vscode-languageserver/lib/common/api.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProposedFeatures = exports2.NotebookDocuments = exports2.TextDocuments = exports2.SemanticTokensBuilder = void 0;
    var semanticTokens_1 = require_semanticTokens();
    Object.defineProperty(exports2, "SemanticTokensBuilder", { enumerable: true, get: function() {
      return semanticTokens_1.SemanticTokensBuilder;
    } });
    var ic = require_inlineCompletion_proposed();
    __exportStar(require_main3(), exports2);
    var textDocuments_1 = require_textDocuments();
    Object.defineProperty(exports2, "TextDocuments", { enumerable: true, get: function() {
      return textDocuments_1.TextDocuments;
    } });
    var notebook_1 = require_notebook();
    Object.defineProperty(exports2, "NotebookDocuments", { enumerable: true, get: function() {
      return notebook_1.NotebookDocuments;
    } });
    __exportStar(require_server(), exports2);
    var ProposedFeatures2;
    (function(ProposedFeatures3) {
      ProposedFeatures3.all = {
        __brand: "features",
        languages: ic.InlineCompletionFeature
      };
    })(ProposedFeatures2 || (exports2.ProposedFeatures = ProposedFeatures2 = {}));
  }
});

// node_modules/vscode-languageserver/lib/node/main.js
var require_main4 = __commonJS({
  "node_modules/vscode-languageserver/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createConnection = exports2.Files = void 0;
    var node_util_1 = require("node:util");
    var Is = require_is();
    var server_1 = require_server();
    var fm = require_files();
    var node_1 = require_node2();
    __exportStar(require_node2(), exports2);
    __exportStar(require_api3(), exports2);
    var Files;
    (function(Files2) {
      Files2.uriToFilePath = fm.uriToFilePath;
      Files2.resolveGlobalNodePath = fm.resolveGlobalNodePath;
      Files2.resolveGlobalYarnPath = fm.resolveGlobalYarnPath;
      Files2.resolve = fm.resolve;
      Files2.resolveModulePath = fm.resolveModulePath;
    })(Files || (exports2.Files = Files = {}));
    var _protocolConnection;
    function endProtocolConnection() {
      if (_protocolConnection === void 0) {
        return;
      }
      try {
        _protocolConnection.end();
      } catch (_err) {
      }
    }
    var _shutdownReceived = false;
    var exitTimer = void 0;
    function setupExitTimer() {
      const argName = "--clientProcessId";
      function runTimer(value) {
        try {
          let processId = parseInt(value);
          if (!isNaN(processId)) {
            exitTimer = setInterval(() => {
              try {
                process.kill(processId, 0);
              } catch (ex) {
                endProtocolConnection();
                process.exit(_shutdownReceived ? 0 : 1);
              }
            }, 3e3);
          }
        } catch (e) {
        }
      }
      for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if (arg === argName && i + 1 < process.argv.length) {
          runTimer(process.argv[i + 1]);
          return;
        } else {
          let args = arg.split("=");
          if (args[0] === argName) {
            runTimer(args[1]);
          }
        }
      }
    }
    setupExitTimer();
    var watchDog = {
      initialize: (params) => {
        const processId = params.processId;
        if (Is.number(processId) && exitTimer === void 0) {
          setInterval(() => {
            try {
              process.kill(processId, 0);
            } catch (ex) {
              process.exit(_shutdownReceived ? 0 : 1);
            }
          }, 3e3);
        }
      },
      get shutdownReceived() {
        return _shutdownReceived;
      },
      set shutdownReceived(value) {
        _shutdownReceived = value;
      },
      exit: (code) => {
        endProtocolConnection();
        process.exit(code);
      }
    };
    function createConnection2(arg1, arg2, arg3, arg4) {
      let factories;
      let input;
      let output;
      let options;
      if (arg1 !== void 0 && arg1.__brand === "features") {
        factories = arg1;
        arg1 = arg2;
        arg2 = arg3;
        arg3 = arg4;
      }
      if (node_1.ConnectionStrategy.is(arg1) || node_1.ConnectionOptions.is(arg1)) {
        options = arg1;
      } else {
        input = arg1;
        output = arg2;
        options = arg3;
      }
      return _createConnection(input, output, options, factories);
    }
    exports2.createConnection = createConnection2;
    function _createConnection(input, output, options, factories) {
      let stdio = false;
      if (!input && !output && process.argv.length > 2) {
        let port = void 0;
        let pipeName = void 0;
        let argv = process.argv.slice(2);
        for (let i = 0; i < argv.length; i++) {
          let arg = argv[i];
          if (arg === "--node-ipc") {
            input = new node_1.IPCMessageReader(process);
            output = new node_1.IPCMessageWriter(process);
            break;
          } else if (arg === "--stdio") {
            stdio = true;
            input = process.stdin;
            output = process.stdout;
            break;
          } else if (arg === "--socket") {
            port = parseInt(argv[i + 1]);
            break;
          } else if (arg === "--pipe") {
            pipeName = argv[i + 1];
            break;
          } else {
            var args = arg.split("=");
            if (args[0] === "--socket") {
              port = parseInt(args[1]);
              break;
            } else if (args[0] === "--pipe") {
              pipeName = args[1];
              break;
            }
          }
        }
        if (port) {
          let transport = (0, node_1.createServerSocketTransport)(port);
          input = transport[0];
          output = transport[1];
        } else if (pipeName) {
          let transport = (0, node_1.createServerPipeTransport)(pipeName);
          input = transport[0];
          output = transport[1];
        }
      }
      var commandLineMessage = "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
      if (!input) {
        throw new Error("Connection input stream is not set. " + commandLineMessage);
      }
      if (!output) {
        throw new Error("Connection output stream is not set. " + commandLineMessage);
      }
      if (Is.func(input.read) && Is.func(input.on)) {
        let inputStream = input;
        inputStream.on("end", () => {
          endProtocolConnection();
          process.exit(_shutdownReceived ? 0 : 1);
        });
        inputStream.on("close", () => {
          endProtocolConnection();
          process.exit(_shutdownReceived ? 0 : 1);
        });
      }
      const connectionFactory = (logger) => {
        const result = (0, node_1.createProtocolConnection)(input, output, logger, options);
        if (stdio) {
          patchConsole(logger);
        }
        return result;
      };
      return (0, server_1.createConnection)(connectionFactory, watchDog, factories);
    }
    function patchConsole(logger) {
      function serialize(args) {
        return args.map((arg) => typeof arg === "string" ? arg : (0, node_util_1.inspect)(arg)).join(" ");
      }
      const counters = /* @__PURE__ */ new Map();
      console.assert = function assert(assertion, ...args) {
        if (assertion) {
          return;
        }
        if (args.length === 0) {
          logger.error("Assertion failed");
        } else {
          const [message, ...rest] = args;
          logger.error(`Assertion failed: ${message} ${serialize(rest)}`);
        }
      };
      console.count = function count(label = "default") {
        const message = String(label);
        let counter = counters.get(message) ?? 0;
        counter += 1;
        counters.set(message, counter);
        logger.log(`${message}: ${message}`);
      };
      console.countReset = function countReset(label) {
        if (label === void 0) {
          counters.clear();
        } else {
          counters.delete(String(label));
        }
      };
      console.debug = function debug(...args) {
        logger.log(serialize(args));
      };
      console.dir = function dir(arg, options) {
        logger.log((0, node_util_1.inspect)(arg, options));
      };
      console.log = function log(...args) {
        logger.log(serialize(args));
      };
      console.error = function error(...args) {
        logger.error(serialize(args));
      };
      console.trace = function trace(...args) {
        const stack = new Error().stack.replace(/(.+\n){2}/, "");
        let message = "Trace";
        if (args.length !== 0) {
          message += `: ${serialize(args)}`;
        }
        logger.log(`${message}
${stack}`);
      };
      console.warn = function warn(...args) {
        logger.warn(serialize(args));
      };
    }
  }
});

// node_modules/vscode-languageserver/node.js
var require_node3 = __commonJS({
  "node_modules/vscode-languageserver/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main4();
  }
});

// ../../vscode/node_modules/clone/clone.js
var require_clone = __commonJS({
  "../../vscode/node_modules/clone/clone.js"(exports2, module2) {
    var clone = (function() {
      "use strict";
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = function() {
        };
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = function() {
        };
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = function() {
        };
      }
      function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === "object") {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != "undefined";
        if (typeof circular == "undefined")
          circular = true;
        if (typeof depth == "undefined")
          depth = Infinity;
        function _clone(parent2, depth2) {
          if (parent2 === null)
            return null;
          if (depth2 === 0)
            return parent2;
          var child;
          var proto;
          if (typeof parent2 != "object") {
            return parent2;
          }
          if (_instanceof(parent2, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent2, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent2, nativePromise)) {
            child = new nativePromise(function(resolve, reject) {
              parent2.then(function(value) {
                resolve(_clone(value, depth2 - 1));
              }, function(err) {
                reject(_clone(err, depth2 - 1));
              });
            });
          } else if (clone2.__isArray(parent2)) {
            child = [];
          } else if (clone2.__isRegExp(parent2)) {
            child = new RegExp(parent2.source, __getRegExpFlags(parent2));
            if (parent2.lastIndex) child.lastIndex = parent2.lastIndex;
          } else if (clone2.__isDate(parent2)) {
            child = new Date(parent2.getTime());
          } else if (useBuffer && Buffer.isBuffer(parent2)) {
            if (Buffer.allocUnsafe) {
              child = Buffer.allocUnsafe(parent2.length);
            } else {
              child = new Buffer(parent2.length);
            }
            parent2.copy(child);
            return child;
          } else if (_instanceof(parent2, Error)) {
            child = Object.create(parent2);
          } else {
            if (typeof prototype == "undefined") {
              proto = Object.getPrototypeOf(parent2);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }
          if (circular) {
            var index = allParents.indexOf(parent2);
            if (index != -1) {
              return allChildren[index];
            }
            allParents.push(parent2);
            allChildren.push(child);
          }
          if (_instanceof(parent2, nativeMap)) {
            parent2.forEach(function(value, key) {
              var keyChild = _clone(key, depth2 - 1);
              var valueChild = _clone(value, depth2 - 1);
              child.set(keyChild, valueChild);
            });
          }
          if (_instanceof(parent2, nativeSet)) {
            parent2.forEach(function(value) {
              var entryChild = _clone(value, depth2 - 1);
              child.add(entryChild);
            });
          }
          for (var i in parent2) {
            var attrs;
            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }
            if (attrs && attrs.set == null) {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent2);
            for (var i = 0; i < symbols.length; i++) {
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }
              child[symbol] = _clone(parent2[symbol], depth2 - 1);
              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }
          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent2);
            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
              if (descriptor && descriptor.enumerable) {
                continue;
              }
              child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }
          return child;
        }
        return _clone(parent, depth);
      }
      clone2.clonePrototype = function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = function() {
        };
        c.prototype = parent;
        return new c();
      };
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      clone2.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      clone2.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      clone2.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      clone2.__isRegExp = __isRegExp;
      function __getRegExpFlags(re) {
        var flags = "";
        if (re.global) flags += "g";
        if (re.ignoreCase) flags += "i";
        if (re.multiline) flags += "m";
        return flags;
      }
      clone2.__getRegExpFlags = __getRegExpFlags;
      return clone2;
    })();
    if (typeof module2 === "object" && module2.exports) {
      module2.exports = clone;
    }
  }
});

// ../../vscode/node_modules/node-cache/lib/node_cache.js
var require_node_cache = __commonJS({
  "../../vscode/node_modules/node-cache/lib/node_cache.js"(exports2, module2) {
    (function() {
      var EventEmitter, NodeCache3, clone, splice = [].splice, boundMethodCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new Error("Bound instance method accessed before binding");
        }
      }, indexOf = [].indexOf;
      clone = require_clone();
      EventEmitter = require("events").EventEmitter;
      module2.exports = NodeCache3 = (function() {
        class NodeCache4 extends EventEmitter {
          constructor(options = {}) {
            super();
            this.get = this.get.bind(this);
            this.mget = this.mget.bind(this);
            this.set = this.set.bind(this);
            this.mset = this.mset.bind(this);
            this.del = this.del.bind(this);
            this.take = this.take.bind(this);
            this.ttl = this.ttl.bind(this);
            this.getTtl = this.getTtl.bind(this);
            this.keys = this.keys.bind(this);
            this.has = this.has.bind(this);
            this.getStats = this.getStats.bind(this);
            this.flushAll = this.flushAll.bind(this);
            this.flushStats = this.flushStats.bind(this);
            this.close = this.close.bind(this);
            this._checkData = this._checkData.bind(this);
            this._check = this._check.bind(this);
            this._isInvalidKey = this._isInvalidKey.bind(this);
            this._wrap = this._wrap.bind(this);
            this._getValLength = this._getValLength.bind(this);
            this._error = this._error.bind(this);
            this._initErrors = this._initErrors.bind(this);
            this.options = options;
            this._initErrors();
            this.data = {};
            this.options = Object.assign({
              // convert all elements to string
              forceString: false,
              // used standard size for calculating value size
              objectValueSize: 80,
              promiseValueSize: 80,
              arrayValueSize: 40,
              // standard time to live in seconds. 0 = infinity;
              stdTTL: 0,
              // time in seconds to check all data and delete expired keys
              checkperiod: 600,
              // en/disable cloning of variables. If `true` you'll get a copy of the cached variable. If `false` you'll save and get just the reference
              useClones: true,
              // whether values should be deleted automatically at expiration
              deleteOnExpire: true,
              // enable legacy callbacks
              enableLegacyCallbacks: false,
              // max amount of keys that are being stored
              maxKeys: -1
            }, this.options);
            if (this.options.enableLegacyCallbacks) {
              console.warn("WARNING! node-cache legacy callback support will drop in v6.x");
              ["get", "mget", "set", "del", "ttl", "getTtl", "keys", "has"].forEach((methodKey) => {
                var oldMethod;
                oldMethod = this[methodKey];
                this[methodKey] = function(...args) {
                  var cb, err, ref, res;
                  ref = args, [...args] = ref, [cb] = splice.call(args, -1);
                  if (typeof cb === "function") {
                    try {
                      res = oldMethod(...args);
                      cb(null, res);
                    } catch (error1) {
                      err = error1;
                      cb(err);
                    }
                  } else {
                    return oldMethod(...args, cb);
                  }
                };
              });
            }
            this.stats = {
              hits: 0,
              misses: 0,
              keys: 0,
              ksize: 0,
              vsize: 0
            };
            this.validKeyTypes = ["string", "number"];
            this._checkData();
            return;
          }
          get(key) {
            var _ret, err;
            boundMethodCheck(this, NodeCache4);
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            if (this.data[key] != null && this._check(key, this.data[key])) {
              this.stats.hits++;
              _ret = this._unwrap(this.data[key]);
              return _ret;
            } else {
              this.stats.misses++;
              return void 0;
            }
          }
          mget(keys) {
            var _err, err, i, key, len, oRet;
            boundMethodCheck(this, NodeCache4);
            if (!Array.isArray(keys)) {
              _err = this._error("EKEYSTYPE");
              throw _err;
            }
            oRet = {};
            for (i = 0, len = keys.length; i < len; i++) {
              key = keys[i];
              if ((err = this._isInvalidKey(key)) != null) {
                throw err;
              }
              if (this.data[key] != null && this._check(key, this.data[key])) {
                this.stats.hits++;
                oRet[key] = this._unwrap(this.data[key]);
              } else {
                this.stats.misses++;
              }
            }
            return oRet;
          }
          set(key, value, ttl) {
            var _err, err, existent;
            boundMethodCheck(this, NodeCache4);
            if (this.options.maxKeys > -1 && this.stats.keys >= this.options.maxKeys) {
              _err = this._error("ECACHEFULL");
              throw _err;
            }
            if (this.options.forceString && false) {
              value = JSON.stringify(value);
            }
            if (ttl == null) {
              ttl = this.options.stdTTL;
            }
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            existent = false;
            if (this.data[key]) {
              existent = true;
              this.stats.vsize -= this._getValLength(this._unwrap(this.data[key], false));
            }
            this.data[key] = this._wrap(value, ttl);
            this.stats.vsize += this._getValLength(value);
            if (!existent) {
              this.stats.ksize += this._getKeyLength(key);
              this.stats.keys++;
            }
            this.emit("set", key, value);
            return true;
          }
          mset(keyValueSet) {
            var _err, err, i, j, key, keyValuePair, len, len1, ttl, val;
            boundMethodCheck(this, NodeCache4);
            if (this.options.maxKeys > -1 && this.stats.keys + keyValueSet.length >= this.options.maxKeys) {
              _err = this._error("ECACHEFULL");
              throw _err;
            }
            for (i = 0, len = keyValueSet.length; i < len; i++) {
              keyValuePair = keyValueSet[i];
              ({ key, val, ttl } = keyValuePair);
              if (ttl && typeof ttl !== "number") {
                _err = this._error("ETTLTYPE");
                throw _err;
              }
              if ((err = this._isInvalidKey(key)) != null) {
                throw err;
              }
            }
            for (j = 0, len1 = keyValueSet.length; j < len1; j++) {
              keyValuePair = keyValueSet[j];
              ({ key, val, ttl } = keyValuePair);
              this.set(key, val, ttl);
            }
            return true;
          }
          del(keys) {
            var delCount, err, i, key, len, oldVal;
            boundMethodCheck(this, NodeCache4);
            if (!Array.isArray(keys)) {
              keys = [keys];
            }
            delCount = 0;
            for (i = 0, len = keys.length; i < len; i++) {
              key = keys[i];
              if ((err = this._isInvalidKey(key)) != null) {
                throw err;
              }
              if (this.data[key] != null) {
                this.stats.vsize -= this._getValLength(this._unwrap(this.data[key], false));
                this.stats.ksize -= this._getKeyLength(key);
                this.stats.keys--;
                delCount++;
                oldVal = this.data[key];
                delete this.data[key];
                this.emit("del", key, oldVal.v);
              }
            }
            return delCount;
          }
          take(key) {
            var _ret;
            boundMethodCheck(this, NodeCache4);
            _ret = this.get(key);
            if (_ret != null) {
              this.del(key);
            }
            return _ret;
          }
          ttl(key, ttl) {
            var err;
            boundMethodCheck(this, NodeCache4);
            ttl || (ttl = this.options.stdTTL);
            if (!key) {
              return false;
            }
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            if (this.data[key] != null && this._check(key, this.data[key])) {
              if (ttl >= 0) {
                this.data[key] = this._wrap(this.data[key].v, ttl, false);
              } else {
                this.del(key);
              }
              return true;
            } else {
              return false;
            }
          }
          getTtl(key) {
            var _ttl, err;
            boundMethodCheck(this, NodeCache4);
            if (!key) {
              return void 0;
            }
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            if (this.data[key] != null && this._check(key, this.data[key])) {
              _ttl = this.data[key].t;
              return _ttl;
            } else {
              return void 0;
            }
          }
          keys() {
            var _keys;
            boundMethodCheck(this, NodeCache4);
            _keys = Object.keys(this.data);
            return _keys;
          }
          has(key) {
            var _exists;
            boundMethodCheck(this, NodeCache4);
            _exists = this.data[key] != null && this._check(key, this.data[key]);
            return _exists;
          }
          getStats() {
            boundMethodCheck(this, NodeCache4);
            return this.stats;
          }
          flushAll(_startPeriod = true) {
            boundMethodCheck(this, NodeCache4);
            this.data = {};
            this.stats = {
              hits: 0,
              misses: 0,
              keys: 0,
              ksize: 0,
              vsize: 0
            };
            this._killCheckPeriod();
            this._checkData(_startPeriod);
            this.emit("flush");
          }
          flushStats() {
            boundMethodCheck(this, NodeCache4);
            this.stats = {
              hits: 0,
              misses: 0,
              keys: 0,
              ksize: 0,
              vsize: 0
            };
            this.emit("flush_stats");
          }
          close() {
            boundMethodCheck(this, NodeCache4);
            this._killCheckPeriod();
          }
          _checkData(startPeriod = true) {
            var key, ref, value;
            boundMethodCheck(this, NodeCache4);
            ref = this.data;
            for (key in ref) {
              value = ref[key];
              this._check(key, value);
            }
            if (startPeriod && this.options.checkperiod > 0) {
              this.checkTimeout = setTimeout(this._checkData, this.options.checkperiod * 1e3, startPeriod);
              if (this.checkTimeout != null && this.checkTimeout.unref != null) {
                this.checkTimeout.unref();
              }
            }
          }
          // ## _killCheckPeriod
          // stop the checkdata period. Only needed to abort the script in testing mode.
          _killCheckPeriod() {
            if (this.checkTimeout != null) {
              return clearTimeout(this.checkTimeout);
            }
          }
          _check(key, data) {
            var _retval;
            boundMethodCheck(this, NodeCache4);
            _retval = true;
            if (data.t !== 0 && data.t < Date.now()) {
              if (this.options.deleteOnExpire) {
                _retval = false;
                this.del(key);
              }
              this.emit("expired", key, this._unwrap(data));
            }
            return _retval;
          }
          _isInvalidKey(key) {
            var ref;
            boundMethodCheck(this, NodeCache4);
            if (ref = typeof key, indexOf.call(this.validKeyTypes, ref) < 0) {
              return this._error("EKEYTYPE", {
                type: typeof key
              });
            }
          }
          _wrap(value, ttl, asClone = true) {
            var livetime, now, oReturn, ttlMultiplicator;
            boundMethodCheck(this, NodeCache4);
            if (!this.options.useClones) {
              asClone = false;
            }
            now = Date.now();
            livetime = 0;
            ttlMultiplicator = 1e3;
            if (ttl === 0) {
              livetime = 0;
            } else if (ttl) {
              livetime = now + ttl * ttlMultiplicator;
            } else {
              if (this.options.stdTTL === 0) {
                livetime = this.options.stdTTL;
              } else {
                livetime = now + this.options.stdTTL * ttlMultiplicator;
              }
            }
            return oReturn = {
              t: livetime,
              v: asClone ? clone(value) : value
            };
          }
          // ## _unwrap
          // internal method to extract get the value out of the wrapped value
          _unwrap(value, asClone = true) {
            if (!this.options.useClones) {
              asClone = false;
            }
            if (value.v != null) {
              if (asClone) {
                return clone(value.v);
              } else {
                return value.v;
              }
            }
            return null;
          }
          // ## _getKeyLength
          // internal method the calculate the key length
          _getKeyLength(key) {
            return key.toString().length;
          }
          _getValLength(value) {
            boundMethodCheck(this, NodeCache4);
            if (typeof value === "string") {
              return value.length;
            } else if (this.options.forceString) {
              return JSON.stringify(value).length;
            } else if (Array.isArray(value)) {
              return this.options.arrayValueSize * value.length;
            } else if (typeof value === "number") {
              return 8;
            } else if (typeof (value != null ? value.then : void 0) === "function") {
              return this.options.promiseValueSize;
            } else if (typeof Buffer !== "undefined" && Buffer !== null ? Buffer.isBuffer(value) : void 0) {
              return value.length;
            } else if (value != null && typeof value === "object") {
              return this.options.objectValueSize * Object.keys(value).length;
            } else if (typeof value === "boolean") {
              return 8;
            } else {
              return 0;
            }
          }
          _error(type, data = {}) {
            var error;
            boundMethodCheck(this, NodeCache4);
            error = new Error();
            error.name = type;
            error.errorcode = type;
            error.message = this.ERRORS[type] != null ? this.ERRORS[type](data) : "-";
            error.data = data;
            return error;
          }
          _initErrors() {
            var _errMsg, _errT, ref;
            boundMethodCheck(this, NodeCache4);
            this.ERRORS = {};
            ref = this._ERRORS;
            for (_errT in ref) {
              _errMsg = ref[_errT];
              this.ERRORS[_errT] = this.createErrorMessage(_errMsg);
            }
          }
          createErrorMessage(errMsg) {
            return function(args) {
              return errMsg.replace("__key", args.type);
            };
          }
        }
        ;
        NodeCache4.prototype._ERRORS = {
          "ENOTFOUND": "Key `__key` not found",
          "ECACHEFULL": "Cache max keys amount exceeded",
          "EKEYTYPE": "The key argument has to be of type `string` or `number`. Found: `__key`",
          "EKEYSTYPE": "The keys argument has to be an array.",
          "ETTLTYPE": "The ttl argument has to be a number."
        };
        return NodeCache4;
      }).call(this);
    }).call(exports2);
  }
});

// ../../vscode/node_modules/node-cache/index.js
var require_node_cache2 = __commonJS({
  "../../vscode/node_modules/node-cache/index.js"(exports2, module2) {
    (function() {
      var exports3;
      exports3 = module2.exports = require_node_cache();
      exports3.version = "5.1.2";
    }).call(exports2);
  }
});

// ../../vscode/node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "../../vscode/node_modules/semver/internal/constants.js"(exports2, module2) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// ../../vscode/node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "../../vscode/node_modules/semver/internal/debug.js"(exports2, module2) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// ../../vscode/node_modules/semver/internal/re.js
var require_re = __commonJS({
  "../../vscode/node_modules/semver/internal/re.js"(exports2, module2) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var safeSrc = exports2.safeSrc = [];
    var t = exports2.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// ../../vscode/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "../../vscode/node_modules/semver/internal/parse-options.js"(exports2, module2) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// ../../vscode/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "../../vscode/node_modules/semver/internal/identifiers.js"(exports2, module2) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// ../../vscode/node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "../../vscode/node_modules/semver/classes/semver.js"(exports2, module2) {
    "use strict";
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var isPrereleaseIdentifier = (prerelease, identifier) => {
      const identifiers = identifier.split(".");
      if (identifiers.length > prerelease.length) {
        return false;
      }
      for (let i = 0; i < identifiers.length; i++) {
        if (compareIdentifiers(prerelease[i], identifiers[i]) !== 0) {
          return false;
        }
      }
      return true;
    };
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (isPrereleaseIdentifier(this.prerelease, identifier)) {
                const prereleaseBase = this.prerelease[identifier.split(".").length];
                if (isNaN(prereleaseBase)) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// ../../vscode/node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "../../vscode/node_modules/semver/functions/parse.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = (version, options, throwErrors = false) => {
      if (version instanceof SemVer) {
        return version;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module2.exports = parse;
  }
});

// ../../vscode/node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "../../vscode/node_modules/semver/functions/valid.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// ../../vscode/node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "../../vscode/node_modules/semver/functions/clean.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var clean = (version, options) => {
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module2.exports = clean;
  }
});

// ../../vscode/node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "../../vscode/node_modules/semver/functions/inc.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var inc = (version, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// ../../vscode/node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "../../vscode/node_modules/semver/functions/diff.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var diff = (version1, version2) => {
      const v1 = parse(version1, null, true);
      const v2 = parse(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module2.exports = diff;
  }
});

// ../../vscode/node_modules/semver/functions/major.js
var require_major = __commonJS({
  "../../vscode/node_modules/semver/functions/major.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

// ../../vscode/node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "../../vscode/node_modules/semver/functions/minor.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module2.exports = minor;
  }
});

// ../../vscode/node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "../../vscode/node_modules/semver/functions/patch.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module2.exports = patch;
  }
});

// ../../vscode/node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "../../vscode/node_modules/semver/functions/prerelease.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// ../../vscode/node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "../../vscode/node_modules/semver/functions/compare.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compare2 = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare2;
  }
});

// ../../vscode/node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "../../vscode/node_modules/semver/functions/rcompare.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var rcompare = (a, b, loose) => compare2(b, a, loose);
    module2.exports = rcompare;
  }
});

// ../../vscode/node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "../../vscode/node_modules/semver/functions/compare-loose.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var compareLoose = (a, b) => compare2(a, b, true);
    module2.exports = compareLoose;
  }
});

// ../../vscode/node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "../../vscode/node_modules/semver/functions/compare-build.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// ../../vscode/node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "../../vscode/node_modules/semver/functions/sort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module2.exports = sort;
  }
});

// ../../vscode/node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "../../vscode/node_modules/semver/functions/rsort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module2.exports = rsort;
  }
});

// ../../vscode/node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "../../vscode/node_modules/semver/functions/gt.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var gt2 = (a, b, loose) => compare2(a, b, loose) > 0;
    module2.exports = gt2;
  }
});

// ../../vscode/node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "../../vscode/node_modules/semver/functions/lt.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var lt = (a, b, loose) => compare2(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// ../../vscode/node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "../../vscode/node_modules/semver/functions/eq.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var eq = (a, b, loose) => compare2(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// ../../vscode/node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "../../vscode/node_modules/semver/functions/neq.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var neq = (a, b, loose) => compare2(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// ../../vscode/node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "../../vscode/node_modules/semver/functions/gte.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var gte = (a, b, loose) => compare2(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// ../../vscode/node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "../../vscode/node_modules/semver/functions/lte.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare();
    var lte = (a, b, loose) => compare2(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// ../../vscode/node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "../../vscode/node_modules/semver/functions/cmp.js"(exports2, module2) {
    "use strict";
    var eq = require_eq();
    var neq = require_neq();
    var gt2 = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt2(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// ../../vscode/node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "../../vscode/node_modules/semver/functions/coerce.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module2.exports = coerce;
  }
});

// ../../vscode/node_modules/semver/functions/truncate.js
var require_truncate = __commonJS({
  "../../vscode/node_modules/semver/functions/truncate.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var constants = require_constants();
    var SemVer = require_semver();
    var truncate = (version, truncation, options) => {
      if (!constants.RELEASE_TYPES.includes(truncation)) {
        return null;
      }
      const clonedVersion = cloneInputVersion(version, options);
      return clonedVersion && doTruncation(clonedVersion, truncation);
    };
    var cloneInputVersion = (version, options) => {
      const versionStringToParse = version instanceof SemVer ? version.version : version;
      return parse(versionStringToParse, options);
    };
    var doTruncation = (version, truncation) => {
      if (isPrerelease(truncation)) {
        return version.version;
      }
      version.prerelease = [];
      switch (truncation) {
        case "major":
          version.minor = 0;
          version.patch = 0;
          break;
        case "minor":
          version.patch = 0;
          break;
      }
      return version.format();
    };
    var isPrerelease = (type) => {
      return type.startsWith("pre");
    };
    module2.exports = truncate;
  }
});

// ../../vscode/node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "../../vscode/node_modules/semver/internal/lrucache.js"(exports2, module2) {
    "use strict";
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module2.exports = LRUCache;
  }
});

// ../../vscode/node_modules/semver/classes/range.js
var require_range = __commonJS({
  "../../vscode/node_modules/semver/classes/range.js"(exports2, module2) {
    "use strict";
    var SPACE_CHARACTERS = /\s+/g;
    var Range2 = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.replace(BUILDSTRIPRE, "");
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached2 = cache3.get(memoKey);
        if (cached2) {
          return cached2;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache3.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range2;
    var LRU = require_lrucache();
    var cache3 = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      src,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var BUILDSTRIPRE = new RegExp(src[t.BUILD], "g");
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      comp = comp.replace(re[t.BUILD], "");
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var invalidXRangeOrder = (M, m, p) => isX(M) && !isX(m) || isX(m) && p && !isX(p);
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        if (invalidXRangeOrder(M, m, p)) {
          return comp;
        }
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// ../../vscode/node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "../../vscode/node_modules/semver/classes/comparator.js"(exports2, module2) {
    "use strict";
    var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range2(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range2(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range2 = require_range();
  }
});

// ../../vscode/node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "../../vscode/node_modules/semver/functions/satisfies.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var satisfies3 = (version, range, options) => {
      try {
        range = new Range2(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module2.exports = satisfies3;
  }
});

// ../../vscode/node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "../../vscode/node_modules/semver/ranges/to-comparators.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var toComparators = (range, options) => new Range2(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// ../../vscode/node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "../../vscode/node_modules/semver/ranges/max-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range2 = require_range();
    var maxSatisfying2 = (versions12, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range2(range, options);
      } catch (er) {
        return null;
      }
      versions12.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying2;
  }
});

// ../../vscode/node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "../../vscode/node_modules/semver/ranges/min-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range2 = require_range();
    var minSatisfying = (versions12, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range2(range, options);
      } catch (er) {
        return null;
      }
      versions12.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// ../../vscode/node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "../../vscode/node_modules/semver/ranges/min-version.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range2 = require_range();
    var gt2 = require_gt();
    var minVersion2 = (range, loose) => {
      range = new Range2(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt2(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt2(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion2;
  }
});

// ../../vscode/node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "../../vscode/node_modules/semver/ranges/valid.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var validRange3 = (range, options) => {
      try {
        return new Range2(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange3;
  }
});

// ../../vscode/node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "../../vscode/node_modules/semver/ranges/outside.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range2 = require_range();
    var satisfies3 = require_satisfies();
    var gt2 = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range2(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt2;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt2;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies3(version, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// ../../vscode/node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "../../vscode/node_modules/semver/ranges/gtr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module2.exports = gtr;
  }
});

// ../../vscode/node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "../../vscode/node_modules/semver/ranges/ltr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module2.exports = ltr;
  }
});

// ../../vscode/node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "../../vscode/node_modules/semver/ranges/intersects.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range2(r1, options);
      r2 = new Range2(r2, options);
      return r1.intersects(r2, options);
    };
    module2.exports = intersects;
  }
});

// ../../vscode/node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "../../vscode/node_modules/semver/ranges/simplify.js"(exports2, module2) {
    "use strict";
    var satisfies3 = require_satisfies();
    var compare2 = require_compare();
    module2.exports = (versions12, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions12.sort((a, b) => compare2(a, b, options));
      for (const version of v) {
        const included = satisfies3(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// ../../vscode/node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "../../vscode/node_modules/semver/ranges/subset.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies3 = require_satisfies();
    var compare2 = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range2(sub, options);
      dom = new Range2(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt2, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt2 = higherGT(gt2, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt2 && lt) {
        gtltComp = compare2(gt2.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt2.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt2 && !satisfies3(eq, String(gt2), options)) {
          return null;
        }
        if (lt && !satisfies3(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies3(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt2) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt2, c, options);
            if (higher === c && higher !== gt2) {
              return false;
            }
          } else if (gt2.operator === ">=" && !c.test(gt2.semver)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !c.test(lt.semver)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt2) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt2 && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt2 && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare2(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare2(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module2.exports = subset;
  }
});

// ../../vscode/node_modules/semver/index.js
var require_semver2 = __commonJS({
  "../../vscode/node_modules/semver/index.js"(exports2, module2) {
    "use strict";
    var internalRe = require_re();
    var constants = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare2 = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt2 = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var truncate = require_truncate();
    var Comparator = require_comparator();
    var Range2 = require_range();
    var satisfies3 = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying2 = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion2 = require_min_version();
    var validRange3 = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module2.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare: compare2,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt: gt2,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      truncate,
      Comparator,
      Range: Range2,
      satisfies: satisfies3,
      toComparators,
      maxSatisfying: maxSatisfying2,
      minSatisfying,
      minVersion: minVersion2,
      validRange: validRange3,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// node_modules/semver/internal/constants.js
var require_constants2 = __commonJS({
  "node_modules/semver/internal/constants.js"(exports2, module2) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/semver/internal/debug.js
var require_debug2 = __commonJS({
  "node_modules/semver/internal/debug.js"(exports2, module2) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// node_modules/semver/internal/re.js
var require_re2 = __commonJS({
  "node_modules/semver/internal/re.js"(exports2, module2) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants2();
    var debug = require_debug2();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var safeSrc = exports2.safeSrc = [];
    var t = exports2.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options2 = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports2, module2) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers2 = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports2, module2) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver3 = __commonJS({
  "node_modules/semver/classes/semver.js"(exports2, module2) {
    "use strict";
    var debug = require_debug2();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants2();
    var { safeRe: re, t } = require_re2();
    var parseOptions = require_parse_options2();
    var { compareIdentifiers } = require_identifiers2();
    var isPrereleaseIdentifier = (prerelease, identifier) => {
      const identifiers = identifier.split(".");
      if (identifiers.length > prerelease.length) {
        return false;
      }
      for (let i = 0; i < identifiers.length; i++) {
        if (compareIdentifiers(prerelease[i], identifiers[i]) !== 0) {
          return false;
        }
      }
      return true;
    };
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (isPrereleaseIdentifier(this.prerelease, identifier)) {
                const prereleaseBase = this.prerelease[identifier.split(".").length];
                if (isNaN(prereleaseBase)) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/semver/functions/parse.js
var require_parse2 = __commonJS({
  "node_modules/semver/functions/parse.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var parse = (version, options, throwErrors = false) => {
      if (version instanceof SemVer) {
        return version;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module2.exports = parse;
  }
});

// node_modules/semver/functions/valid.js
var require_valid3 = __commonJS({
  "node_modules/semver/functions/valid.js"(exports2, module2) {
    "use strict";
    var parse = require_parse2();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// node_modules/semver/functions/clean.js
var require_clean2 = __commonJS({
  "node_modules/semver/functions/clean.js"(exports2, module2) {
    "use strict";
    var parse = require_parse2();
    var clean = (version, options) => {
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module2.exports = clean;
  }
});

// node_modules/semver/functions/inc.js
var require_inc2 = __commonJS({
  "node_modules/semver/functions/inc.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var inc = (version, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// node_modules/semver/functions/diff.js
var require_diff2 = __commonJS({
  "node_modules/semver/functions/diff.js"(exports2, module2) {
    "use strict";
    var parse = require_parse2();
    var diff = (version1, version2) => {
      const v1 = parse(version1, null, true);
      const v2 = parse(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module2.exports = diff;
  }
});

// node_modules/semver/functions/major.js
var require_major2 = __commonJS({
  "node_modules/semver/functions/major.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

// node_modules/semver/functions/minor.js
var require_minor2 = __commonJS({
  "node_modules/semver/functions/minor.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module2.exports = minor;
  }
});

// node_modules/semver/functions/patch.js
var require_patch2 = __commonJS({
  "node_modules/semver/functions/patch.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module2.exports = patch;
  }
});

// node_modules/semver/functions/prerelease.js
var require_prerelease2 = __commonJS({
  "node_modules/semver/functions/prerelease.js"(exports2, module2) {
    "use strict";
    var parse = require_parse2();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// node_modules/semver/functions/compare.js
var require_compare2 = __commonJS({
  "node_modules/semver/functions/compare.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var compare2 = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare2;
  }
});

// node_modules/semver/functions/rcompare.js
var require_rcompare2 = __commonJS({
  "node_modules/semver/functions/rcompare.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare2();
    var rcompare = (a, b, loose) => compare2(b, a, loose);
    module2.exports = rcompare;
  }
});

// node_modules/semver/functions/compare-loose.js
var require_compare_loose2 = __commonJS({
  "node_modules/semver/functions/compare-loose.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare2();
    var compareLoose = (a, b) => compare2(a, b, true);
    module2.exports = compareLoose;
  }
});

// node_modules/semver/functions/compare-build.js
var require_compare_build2 = __commonJS({
  "node_modules/semver/functions/compare-build.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// node_modules/semver/functions/sort.js
var require_sort2 = __commonJS({
  "node_modules/semver/functions/sort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build2();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module2.exports = sort;
  }
});

// node_modules/semver/functions/rsort.js
var require_rsort2 = __commonJS({
  "node_modules/semver/functions/rsort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build2();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module2.exports = rsort;
  }
});

// node_modules/semver/functions/gt.js
var require_gt2 = __commonJS({
  "node_modules/semver/functions/gt.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare2();
    var gt2 = (a, b, loose) => compare2(a, b, loose) > 0;
    module2.exports = gt2;
  }
});

// node_modules/semver/functions/lt.js
var require_lt2 = __commonJS({
  "node_modules/semver/functions/lt.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare2();
    var lt = (a, b, loose) => compare2(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// node_modules/semver/functions/eq.js
var require_eq2 = __commonJS({
  "node_modules/semver/functions/eq.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare2();
    var eq = (a, b, loose) => compare2(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// node_modules/semver/functions/neq.js
var require_neq2 = __commonJS({
  "node_modules/semver/functions/neq.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare2();
    var neq = (a, b, loose) => compare2(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// node_modules/semver/functions/gte.js
var require_gte2 = __commonJS({
  "node_modules/semver/functions/gte.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare2();
    var gte = (a, b, loose) => compare2(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// node_modules/semver/functions/lte.js
var require_lte2 = __commonJS({
  "node_modules/semver/functions/lte.js"(exports2, module2) {
    "use strict";
    var compare2 = require_compare2();
    var lte = (a, b, loose) => compare2(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// node_modules/semver/functions/cmp.js
var require_cmp2 = __commonJS({
  "node_modules/semver/functions/cmp.js"(exports2, module2) {
    "use strict";
    var eq = require_eq2();
    var neq = require_neq2();
    var gt2 = require_gt2();
    var gte = require_gte2();
    var lt = require_lt2();
    var lte = require_lte2();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt2(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// node_modules/semver/functions/coerce.js
var require_coerce2 = __commonJS({
  "node_modules/semver/functions/coerce.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var parse = require_parse2();
    var { safeRe: re, t } = require_re2();
    var coerce = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module2.exports = coerce;
  }
});

// node_modules/semver/functions/truncate.js
var require_truncate2 = __commonJS({
  "node_modules/semver/functions/truncate.js"(exports2, module2) {
    "use strict";
    var parse = require_parse2();
    var constants = require_constants2();
    var SemVer = require_semver3();
    var truncate = (version, truncation, options) => {
      if (!constants.RELEASE_TYPES.includes(truncation)) {
        return null;
      }
      const clonedVersion = cloneInputVersion(version, options);
      return clonedVersion && doTruncation(clonedVersion, truncation);
    };
    var cloneInputVersion = (version, options) => {
      const versionStringToParse = version instanceof SemVer ? version.version : version;
      return parse(versionStringToParse, options);
    };
    var doTruncation = (version, truncation) => {
      if (isPrerelease(truncation)) {
        return version.version;
      }
      version.prerelease = [];
      switch (truncation) {
        case "major":
          version.minor = 0;
          version.patch = 0;
          break;
        case "minor":
          version.patch = 0;
          break;
      }
      return version.format();
    };
    var isPrerelease = (type) => {
      return type.startsWith("pre");
    };
    module2.exports = truncate;
  }
});

// node_modules/semver/internal/lrucache.js
var require_lrucache2 = __commonJS({
  "node_modules/semver/internal/lrucache.js"(exports2, module2) {
    "use strict";
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module2.exports = LRUCache;
  }
});

// node_modules/semver/classes/range.js
var require_range2 = __commonJS({
  "node_modules/semver/classes/range.js"(exports2, module2) {
    "use strict";
    var SPACE_CHARACTERS = /\s+/g;
    var Range2 = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.replace(BUILDSTRIPRE, "");
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached2 = cache3.get(memoKey);
        if (cached2) {
          return cached2;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache3.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range2;
    var LRU = require_lrucache2();
    var cache3 = new LRU();
    var parseOptions = require_parse_options2();
    var Comparator = require_comparator2();
    var debug = require_debug2();
    var SemVer = require_semver3();
    var {
      safeRe: re,
      src,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re2();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants2();
    var BUILDSTRIPRE = new RegExp(src[t.BUILD], "g");
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      comp = comp.replace(re[t.BUILD], "");
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var invalidXRangeOrder = (M, m, p) => isX(M) && !isX(m) || isX(m) && p && !isX(p);
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        if (invalidXRangeOrder(M, m, p)) {
          return comp;
        }
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/semver/classes/comparator.js
var require_comparator2 = __commonJS({
  "node_modules/semver/classes/comparator.js"(exports2, module2) {
    "use strict";
    var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range2(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range2(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options2();
    var { safeRe: re, t } = require_re2();
    var cmp = require_cmp2();
    var debug = require_debug2();
    var SemVer = require_semver3();
    var Range2 = require_range2();
  }
});

// node_modules/semver/functions/satisfies.js
var require_satisfies2 = __commonJS({
  "node_modules/semver/functions/satisfies.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range2();
    var satisfies3 = (version, range, options) => {
      try {
        range = new Range2(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module2.exports = satisfies3;
  }
});

// node_modules/semver/ranges/to-comparators.js
var require_to_comparators2 = __commonJS({
  "node_modules/semver/ranges/to-comparators.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range2();
    var toComparators = (range, options) => new Range2(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying2 = __commonJS({
  "node_modules/semver/ranges/max-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var Range2 = require_range2();
    var maxSatisfying2 = (versions12, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range2(range, options);
      } catch (er) {
        return null;
      }
      versions12.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying2;
  }
});

// node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying2 = __commonJS({
  "node_modules/semver/ranges/min-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var Range2 = require_range2();
    var minSatisfying = (versions12, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range2(range, options);
      } catch (er) {
        return null;
      }
      versions12.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// node_modules/semver/ranges/min-version.js
var require_min_version2 = __commonJS({
  "node_modules/semver/ranges/min-version.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var Range2 = require_range2();
    var gt2 = require_gt2();
    var minVersion2 = (range, loose) => {
      range = new Range2(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt2(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt2(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion2;
  }
});

// node_modules/semver/ranges/valid.js
var require_valid4 = __commonJS({
  "node_modules/semver/ranges/valid.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range2();
    var validRange3 = (range, options) => {
      try {
        return new Range2(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange3;
  }
});

// node_modules/semver/ranges/outside.js
var require_outside2 = __commonJS({
  "node_modules/semver/ranges/outside.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver3();
    var Comparator = require_comparator2();
    var { ANY } = Comparator;
    var Range2 = require_range2();
    var satisfies3 = require_satisfies2();
    var gt2 = require_gt2();
    var lt = require_lt2();
    var lte = require_lte2();
    var gte = require_gte2();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range2(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt2;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt2;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies3(version, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// node_modules/semver/ranges/gtr.js
var require_gtr2 = __commonJS({
  "node_modules/semver/ranges/gtr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside2();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module2.exports = gtr;
  }
});

// node_modules/semver/ranges/ltr.js
var require_ltr2 = __commonJS({
  "node_modules/semver/ranges/ltr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside2();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module2.exports = ltr;
  }
});

// node_modules/semver/ranges/intersects.js
var require_intersects2 = __commonJS({
  "node_modules/semver/ranges/intersects.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range2();
    var intersects = (r1, r2, options) => {
      r1 = new Range2(r1, options);
      r2 = new Range2(r2, options);
      return r1.intersects(r2, options);
    };
    module2.exports = intersects;
  }
});

// node_modules/semver/ranges/simplify.js
var require_simplify2 = __commonJS({
  "node_modules/semver/ranges/simplify.js"(exports2, module2) {
    "use strict";
    var satisfies3 = require_satisfies2();
    var compare2 = require_compare2();
    module2.exports = (versions12, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions12.sort((a, b) => compare2(a, b, options));
      for (const version of v) {
        const included = satisfies3(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/semver/ranges/subset.js
var require_subset2 = __commonJS({
  "node_modules/semver/ranges/subset.js"(exports2, module2) {
    "use strict";
    var Range2 = require_range2();
    var Comparator = require_comparator2();
    var { ANY } = Comparator;
    var satisfies3 = require_satisfies2();
    var compare2 = require_compare2();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range2(sub, options);
      dom = new Range2(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt2, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt2 = higherGT(gt2, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt2 && lt) {
        gtltComp = compare2(gt2.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt2.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt2 && !satisfies3(eq, String(gt2), options)) {
          return null;
        }
        if (lt && !satisfies3(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies3(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt2) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt2, c, options);
            if (higher === c && higher !== gt2) {
              return false;
            }
          } else if (gt2.operator === ">=" && !c.test(gt2.semver)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !c.test(lt.semver)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt2) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt2 && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt2 && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare2(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare2(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module2.exports = subset;
  }
});

// node_modules/semver/index.js
var require_semver4 = __commonJS({
  "node_modules/semver/index.js"(exports2, module2) {
    "use strict";
    var internalRe = require_re2();
    var constants = require_constants2();
    var SemVer = require_semver3();
    var identifiers = require_identifiers2();
    var parse = require_parse2();
    var valid = require_valid3();
    var clean = require_clean2();
    var inc = require_inc2();
    var diff = require_diff2();
    var major = require_major2();
    var minor = require_minor2();
    var patch = require_patch2();
    var prerelease = require_prerelease2();
    var compare2 = require_compare2();
    var rcompare = require_rcompare2();
    var compareLoose = require_compare_loose2();
    var compareBuild = require_compare_build2();
    var sort = require_sort2();
    var rsort = require_rsort2();
    var gt2 = require_gt2();
    var lt = require_lt2();
    var eq = require_eq2();
    var neq = require_neq2();
    var gte = require_gte2();
    var lte = require_lte2();
    var cmp = require_cmp2();
    var coerce = require_coerce2();
    var truncate = require_truncate2();
    var Comparator = require_comparator2();
    var Range2 = require_range2();
    var satisfies3 = require_satisfies2();
    var toComparators = require_to_comparators2();
    var maxSatisfying2 = require_max_satisfying2();
    var minSatisfying = require_min_satisfying2();
    var minVersion2 = require_min_version2();
    var validRange3 = require_valid4();
    var outside = require_outside2();
    var gtr = require_gtr2();
    var ltr = require_ltr2();
    var intersects = require_intersects2();
    var simplifyRange = require_simplify2();
    var subset = require_subset2();
    module2.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare: compare2,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt: gt2,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      truncate,
      Comparator,
      Range: Range2,
      satisfies: satisfies3,
      toComparators,
      maxSatisfying: maxSatisfying2,
      minSatisfying,
      minVersion: minVersion2,
      validRange: validRange3,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// src/index.ts
var import_node2 = __toESM(require_node3());

// node_modules/vscode-languageserver-textdocument/lib/esm/main.js
var FullTextDocument = class _FullTextDocument {
  constructor(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(range) {
    if (range) {
      const start = this.offsetAt(range.start);
      const end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  }
  update(changes, version) {
    for (const change of changes) {
      if (_FullTextDocument.isIncremental(change)) {
        const range = getWellformedRange(change.range);
        const startOffset = this.offsetAt(range.start);
        const endOffset = this.offsetAt(range.end);
        this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
        const startLine = Math.max(range.start.line, 0);
        const endLine = Math.max(range.end.line, 0);
        let lineOffsets = this._lineOffsets;
        const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
        if (endLine - startLine === addedLineOffsets.length) {
          for (let i = 0, len = addedLineOffsets.length; i < len; i++) {
            lineOffsets[i + startLine + 1] = addedLineOffsets[i];
          }
        } else {
          if (addedLineOffsets.length < 1e4) {
            lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
          } else {
            this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
          }
        }
        const diff = change.text.length - (endOffset - startOffset);
        if (diff !== 0) {
          for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
            lineOffsets[i] = lineOffsets[i] + diff;
          }
        }
      } else if (_FullTextDocument.isFull(change)) {
        this._content = change.text;
        this._lineOffsets = void 0;
      } else {
        throw new Error("Unknown change event received");
      }
    }
    this._version = version;
  }
  getLineOffsets() {
    if (this._lineOffsets === void 0) {
      this._lineOffsets = computeLineOffsets(this._content, true);
    }
    return this._lineOffsets;
  }
  positionAt(offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    const lineOffsets = this.getLineOffsets();
    let low = 0, high = lineOffsets.length;
    if (high === 0) {
      return { line: 0, character: offset };
    }
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    const line = low - 1;
    offset = this.ensureBeforeEOL(offset, lineOffsets[line]);
    return { line, character: offset - lineOffsets[line] };
  }
  offsetAt(position) {
    const lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    const lineOffset = lineOffsets[position.line];
    if (position.character <= 0) {
      return lineOffset;
    }
    const nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    const offset = Math.min(lineOffset + position.character, nextLineOffset);
    return this.ensureBeforeEOL(offset, lineOffset);
  }
  ensureBeforeEOL(offset, lineOffset) {
    while (offset > lineOffset && isEOL(this._content.charCodeAt(offset - 1))) {
      offset--;
    }
    return offset;
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(event) {
    const candidate = event;
    return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
  }
  static isFull(event) {
    const candidate = event;
    return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
  }
};
var TextDocument;
(function(TextDocument6) {
  function create(uri, languageId, version, content) {
    return new FullTextDocument(uri, languageId, version, content);
  }
  TextDocument6.create = create;
  function update(document, changes, version) {
    if (document instanceof FullTextDocument) {
      document.update(changes, version);
      return document;
    } else {
      throw new Error("TextDocument.update: document must be created by TextDocument.create");
    }
  }
  TextDocument6.update = update;
  function applyEdits2(document, edits) {
    const text = document.getText();
    const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
      const diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    let lastModifiedOffset = 0;
    const spans = [];
    for (const e of sortedEdits) {
      const startOffset = document.offsetAt(e.range.start);
      if (startOffset < lastModifiedOffset) {
        throw new Error("Overlapping edit");
      } else if (startOffset > lastModifiedOffset) {
        spans.push(text.substring(lastModifiedOffset, startOffset));
      }
      if (e.newText.length) {
        spans.push(e.newText);
      }
      lastModifiedOffset = document.offsetAt(e.range.end);
    }
    spans.push(text.substr(lastModifiedOffset));
    return spans.join("");
  }
  TextDocument6.applyEdits = applyEdits2;
})(TextDocument || (TextDocument = {}));
function mergeSort(data, compare2) {
  if (data.length <= 1) {
    return data;
  }
  const p = data.length / 2 | 0;
  const left = data.slice(0, p);
  const right = data.slice(p);
  mergeSort(left, compare2);
  mergeSort(right, compare2);
  let leftIdx = 0;
  let rightIdx = 0;
  let i = 0;
  while (leftIdx < left.length && rightIdx < right.length) {
    const ret = compare2(left[leftIdx], right[rightIdx]);
    if (ret <= 0) {
      data[i++] = left[leftIdx++];
    } else {
      data[i++] = right[rightIdx++];
    }
  }
  while (leftIdx < left.length) {
    data[i++] = left[leftIdx++];
  }
  while (rightIdx < right.length) {
    data[i++] = right[rightIdx++];
  }
  return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
  const result = isAtLineStart ? [textOffset] : [];
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    if (isEOL(ch)) {
      if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
        i++;
      }
      result.push(textOffset + i + 1);
    }
  }
  return result;
}
function isEOL(char) {
  return char === 13 || char === 10;
}
function getWellformedRange(range) {
  const start = range.start;
  const end = range.end;
  if (start.line > end.line || start.line === end.line && start.character > end.character) {
    return { start: end, end: start };
  }
  return range;
}
function getWellformedEdit(textEdit) {
  const range = getWellformedRange(textEdit.range);
  if (range !== textEdit.range) {
    return { newText: textEdit.newText, range };
  }
  return textEdit;
}

// src/shims/vscode.ts
var import_node_url = require("node:url");
var Position = class _Position {
  constructor(line, character) {
    this.line = line;
    this.character = character;
  }
  line;
  character;
  isEqual(other) {
    return this.line === other.line && this.character === other.character;
  }
  compareTo(other) {
    if (this.line < other.line) return -1;
    if (this.line > other.line) return 1;
    return this.character - other.character;
  }
  translate(lineDelta = 0, characterDelta = 0) {
    return new _Position(this.line + lineDelta, this.character + characterDelta);
  }
  with(line, character) {
    return new _Position(line ?? this.line, character ?? this.character);
  }
};
var Range = class _Range {
  start;
  end;
  constructor(startLineOrPosition, startCharOrEnd, endLine, endCharacter) {
    if (typeof startLineOrPosition === "number") {
      this.start = new Position(startLineOrPosition, startCharOrEnd);
      this.end = new Position(endLine ?? startLineOrPosition, endCharacter ?? startCharOrEnd);
    } else {
      this.start = startLineOrPosition;
      this.end = startCharOrEnd;
    }
  }
  get isEmpty() {
    return this.start.isEqual(this.end);
  }
  get isSingleLine() {
    return this.start.line === this.end.line;
  }
  contains(positionOrRange) {
    if (positionOrRange instanceof _Range) {
      return this.contains(positionOrRange.start) && this.contains(positionOrRange.end);
    }
    const pos = positionOrRange;
    const afterStart = pos.line > this.start.line || pos.line === this.start.line && pos.character >= this.start.character;
    const beforeEnd = pos.line < this.end.line || pos.line === this.end.line && pos.character <= this.end.character;
    return afterStart && beforeEnd;
  }
  isEqual(other) {
    return this.start.isEqual(other.start) && this.end.isEqual(other.end);
  }
  with(start, end) {
    return new _Range(start ?? this.start, end ?? this.end);
  }
};
var Uri = class _Uri {
  scheme;
  fsPath;
  raw;
  constructor(fsPath, scheme = "file", raw) {
    this.fsPath = fsPath;
    this.scheme = scheme;
    this.raw = raw;
  }
  get path() {
    return this.fsPath;
  }
  toString() {
    if (this.raw) {
      return this.raw;
    }
    try {
      return (0, import_node_url.pathToFileURL)(this.fsPath).toString();
    } catch {
      return this.fsPath;
    }
  }
  with(change) {
    return new _Uri(change.path ?? this.fsPath, change.scheme ?? this.scheme);
  }
  static file(path12) {
    return new _Uri(path12, "file");
  }
  static parse(value) {
    if (value.startsWith("file:")) {
      try {
        return new _Uri((0, import_node_url.fileURLToPath)(value), "file", value);
      } catch {
        return new _Uri(decodeURIComponent(value.replace(/^file:\/\//, "")), "file", value);
      }
    }
    return new _Uri(value, "file", value);
  }
};
var MarkdownString = class {
  value;
  isTrusted = true;
  supportThemeIcons = true;
  constructor(value = "") {
    this.value = value;
  }
  appendMarkdown(value) {
    this.value += value;
    return this;
  }
  appendText(value) {
    this.value += value.replace(/([\\`*_[\]{}<>|])/g, "\\$1");
    return this;
  }
  appendCodeblock(value, language = "") {
    this.value += `
\`\`\`${language}
${value}
\`\`\`
`;
    return this;
  }
};
var Disposable = class _Disposable {
  constructor(callOnDispose) {
    this.callOnDispose = callOnDispose;
  }
  callOnDispose;
  dispose() {
    this.callOnDispose?.();
  }
  static from(...disposables) {
    return new _Disposable(() => disposables.forEach((d) => d.dispose()));
  }
};
var StatusBarAlignment = { Left: 1, Right: 2 };
var configStore = {};
function flattenSettings(values, prefix = "") {
  const out = {};
  for (const [key, value] of Object.entries(values ?? {})) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flattenSettings(value, full));
    } else {
      out[full] = value;
    }
  }
  return out;
}
function setWorkspaceConfig(values) {
  for (const key of Object.keys(configStore)) {
    delete configStore[key];
  }
  Object.assign(configStore, flattenSettings(values));
}
var activeDocument;
function setActiveDocument(doc) {
  activeDocument = doc;
}
function getActiveFileName() {
  return activeDocument?.fileName;
}
var editorContext = {};
var notifyError = (message) => console.error(message);
var notifyInfo = (message) => console.info(message);
function setMessageHandlers(handlers) {
  notifyError = handlers.error;
  notifyInfo = handlers.info;
}
var InMemoryDocument = class {
  uri;
  languageId;
  version = 1;
  text;
  constructor(uri, text, languageId = "plaintext") {
    this.uri = uri;
    this.text = text;
    this.languageId = languageId;
  }
  get fileName() {
    return this.uri.fsPath;
  }
  get lineCount() {
    return this.text.length === 0 ? 1 : this.text.split(/\r?\n/).length;
  }
  getText(range) {
    if (!range) {
      return this.text;
    }
    const lines = this.text.split(/\r?\n/);
    const startLine = lines[range.start.line] ?? "";
    if (range.start.line === range.end.line) {
      return startLine.slice(range.start.character, range.end.character);
    }
    const parts = [startLine.slice(range.start.character)];
    for (let line = range.start.line + 1; line < range.end.line; line++) {
      parts.push(lines[line] ?? "");
    }
    parts.push((lines[range.end.line] ?? "").slice(0, range.end.character));
    return parts.join("\n");
  }
  lineAt(lineOrPosition) {
    const line = typeof lineOrPosition === "number" ? lineOrPosition : lineOrPosition.line;
    const text = this.text.split(/\r?\n/)[line] ?? "";
    const indent = text.match(/^\s*/)?.[0].length ?? 0;
    return {
      lineNumber: line,
      text,
      range: new Range(line, 0, line, text.length),
      rangeIncludingLineBreak: new Range(line, 0, line + 1, 0),
      firstNonWhitespaceCharacterIndex: indent,
      isEmptyOrWhitespace: indent === text.length
    };
  }
};
function createOutputChannel(name) {
  return {
    name,
    append: (value) => process.stderr.write(value),
    appendLine: (value) => process.stderr.write(value + "\n"),
    clear: () => {
    },
    show: () => {
    },
    hide: () => {
    },
    dispose: () => {
    },
    replace: () => {
    }
  };
}
var window2 = {
  get activeTextEditor() {
    if (!activeDocument) {
      return void 0;
    }
    const document = activeDocument;
    return {
      document,
      selection: { active: new Position(0, 0), start: new Position(0, 0), end: new Position(0, 0) },
      setDecorations: () => {
      },
      edit: async () => true
    };
  },
  createOutputChannel,
  createStatusBarItem: () => ({
    alignment: StatusBarAlignment.Right,
    priority: 0,
    text: "",
    tooltip: "",
    color: void 0,
    backgroundColor: void 0,
    command: void 0,
    name: "Dependi",
    accessibilityInformation: void 0,
    show: () => {
    },
    hide: () => {
    },
    dispose: () => {
    }
  }),
  createTextEditorDecorationType: () => ({
    key: "dependi",
    dispose: () => {
    }
  }),
  showErrorMessage: async (message, ..._actions) => {
    notifyError(message);
    return void 0;
  },
  showWarningMessage: async (message) => {
    console.warn(message);
    return void 0;
  },
  showInformationMessage: async (message) => {
    notifyInfo(message);
    return void 0;
  },
  showTextDocument: async (_document) => {
    return window2.activeTextEditor;
  },
  withProgress: async (_options, task) => task({ report: () => {
  } }),
  setStatusBarMessage: (_text, _hideAfterTimeout) => new Disposable(),
  onDidChangeActiveTextEditor: () => new Disposable()
};
var workspace = {
  getConfiguration(section) {
    return {
      get(key, defaultValue) {
        const lookup = section === "dependi" || !section ? key : `${section}.${key}`;
        return configStore[lookup] ?? defaultValue;
      },
      has(key) {
        const lookup = section === "dependi" || !section ? key : `${section}.${key}`;
        return lookup in configStore;
      },
      update: async (key, value) => {
        const lookup = section === "dependi" || !section ? key : `${section}.${key}`;
        configStore[lookup] = value;
      },
      inspect: () => void 0
    };
  },
  onDidChangeConfiguration: () => new Disposable(),
  save: async () => true,
  workspaceFolders: [],
  openTextDocument: async (options) => {
    if (options instanceof Uri) {
      return new InMemoryDocument(options, "", "plaintext");
    }
    if ("content" in options) {
      return new InMemoryDocument(Uri.parse("untitled:dependi"), options.content, options.language);
    }
    return new InMemoryDocument(Uri.parse("untitled:dependi"), "", "plaintext");
  },
  fs: {
    readFile: async () => new Uint8Array(),
    stat: async () => ({ type: 1, ctime: 0, mtime: 0, size: 0 })
  }
};
function setWorkspaceFolders(folders, rootUri) {
  const list = folders && folders.length > 0 ? folders : rootUri ? [{ uri: rootUri, name: "" }] : [];
  workspace.workspaceFolders = list.map((folder, index) => ({
    uri: Uri.parse(folder.uri),
    name: folder.name || "root",
    index
  }));
}
var commands = {
  executeCommand: async (command2, ...args) => {
    if (command2 === "setContext" && typeof args[0] === "string") {
      editorContext[args[0]] = args[1];
      return void 0;
    }
    if (command2 === "vscode.open" && args[0]) {
      notifyInfo(String(args[0]));
      return void 0;
    }
    if (command2 === "workbench.action.openSettingsJson") {
      notifyInfo("Set lsp.dependi.settings.apiKey in Zed settings.json");
      return void 0;
    }
    return void 0;
  },
  registerCommand: () => new Disposable(),
  registerTextEditorCommand: () => new Disposable()
};
var env = {
  isTelemetryEnabled: false,
  language: "en",
  appName: "Zed",
  uriScheme: "zed",
  clipboard: {
    readText: async () => "",
    writeText: async () => {
    }
  }
};
var gitExtensionFactory;
function registerGitExtension(factory) {
  gitExtensionFactory = factory;
}
var extensions = {
  getExtension: (id) => {
    if (id === "vscode.git" && gitExtensionFactory) {
      return { exports: gitExtensionFactory() };
    }
    return void 0;
  },
  all: []
};

// ../../vscode/src/config.ts
var DEPENDI = "dependi.";
var UnstableFilter = /* @__PURE__ */ ((UnstableFilter3) => {
  UnstableFilter3[UnstableFilter3["Exclude"] = 0] = "Exclude";
  UnstableFilter3[UnstableFilter3["IncludeAlways"] = 1] = "IncludeAlways";
  UnstableFilter3[UnstableFilter3["IncludeIfUnstable"] = 2] = "IncludeIfUnstable";
  return UnstableFilter3;
})(UnstableFilter || {});
var Configs = ((Configs2) => {
  Configs2["RUST_ENABLED"] = `rust.enabled`;
  Configs2["RUST_INDEX_SERVER_URL"] = `rust.indexServerURL`;
  Configs2["RUST_UNSTABLE_FILTER"] = `rust.unstableFilter`;
  Configs2["RUST_IGNORE_LINE_PATTERN"] = `rust.ignoreLinePattern`;
  Configs2["RUST_INFORM_PATCH_UPDATES"] = `rust.informPatchUpdates`;
  Configs2["RUST_ENABLED_LOCK_FILE"] = `rust.lockFileEnabled`;
  Configs2["RUST_SILENCE_VERSION_OVERFLOWS"] = `rust.silenceVersionOverflows`;
  Configs2["NPM_ENABLED"] = `npm.enabled`;
  Configs2["NPM_INDEX_SERVER_URL"] = `npm.indexServerURL`;
  Configs2["NPM_UNSTABLE_FILTER"] = `npm.unstableFilter`;
  Configs2["NPM_IGNORE_LINE_PATTERN"] = `npm.ignoreLinePattern`;
  Configs2["NPM_INFORM_PATCH_UPDATES"] = `npm.informPatchUpdates`;
  Configs2["NPM_ENABLED_LOCK_FILE"] = `npm.lockFileEnabled`;
  Configs2["NPM_SILENCE_VERSION_OVERFLOWS"] = `npm.silenceVersionOverflows`;
  Configs2["NPM_JSR_ENABLED"] = `npm.jsrEnabled`;
  Configs2["NPM_JSR_INDEX_SERVER_URL"] = `npm.jsrIndexServerURL`;
  Configs2["PHP_ENABLED"] = `php.enabled`;
  Configs2["PHP_INDEX_SERVER_URL"] = `php.indexServerURL`;
  Configs2["PHP_UNSTABLE_FILTER"] = `php.unstableFilter`;
  Configs2["PHP_IGNORE_LINE_PATTERN"] = `php.ignoreLinePattern`;
  Configs2["PHP_INFORM_PATCH_UPDATES"] = `php.informPatchUpdates`;
  Configs2["PHP_ENABLED_LOCK_FILE"] = `php.lockFileEnabled`;
  Configs2["PHP_SILENCE_VERSION_OVERFLOWS"] = `php.silenceVersionOverflows`;
  Configs2["GO_ENABLED"] = `go.enabled`;
  Configs2["GO_INDEX_SERVER_URL"] = `go.indexServerURL`;
  Configs2["GO_UNSTABLE_FILTER"] = `go.unstableFilter`;
  Configs2["GO_IGNORE_LINE_PATTERN"] = `go.ignoreLinePattern`;
  Configs2["GO_INFORM_PATCH_UPDATES"] = `go.informPatchUpdates`;
  Configs2["GO_SILENCE_VERSION_OVERFLOWS"] = `go.silenceVersionOverflows`;
  Configs2["PYTHON_ENABLED"] = `python.enabled`;
  Configs2["PYTHON_INDEX_SERVER_URL"] = `python.indexServerURL`;
  Configs2["PYTHON_UNSTABLE_FILTER"] = `python.unstableFilter`;
  Configs2["PYTHON_IGNORE_LINE_PATTERN"] = `python.ignoreLinePattern`;
  Configs2["PYTHON_INFORM_PATCH_UPDATES"] = `python.informPatchUpdates`;
  Configs2["PYTHON_ENABLED_LOCK_FILE"] = `python.lockFileEnabled`;
  Configs2["PYTHON_SILENCE_VERSION_OVERFLOWS"] = `python.silenceVersionOverflows`;
  Configs2["DART_ENABLED"] = `dart.enabled`;
  Configs2["DART_INDEX_SERVER_URL"] = `dart.indexServerURL`;
  Configs2["DART_UNSTABLE_FILTER"] = `dart.unstableFilter`;
  Configs2["DART_IGNORE_LINE_PATTERN"] = `dart.ignoreLinePattern`;
  Configs2["DART_INFORM_PATCH_UPDATES"] = `dart.informPatchUpdates`;
  Configs2["DART_ENABLED_LOCK_FILE"] = `dart.lockFileEnabled`;
  Configs2["DART_SILENCE_VERSION_OVERFLOWS"] = `dart.silenceVersionOverflows`;
  Configs2["CSHARP_ENABLED"] = `csharp.enabled`;
  Configs2["CSHARP_INDEX_SERVER_URL"] = `csharp.indexServerURL`;
  Configs2["CSHARP_UNSTABLE_FILTER"] = `csharp.unstableFilter`;
  Configs2["CSHARP_IGNORE_LINE_PATTERN"] = `csharp.ignoreLinePattern`;
  Configs2["CSHARP_INFORM_PATCH_UPDATES"] = `csharp.informPatchUpdates`;
  Configs2["CSHARP_ENABLED_LOCK_FILE"] = `csharp.lockFileEnabled`;
  Configs2["CSHARP_SILENCE_VERSION_OVERFLOWS"] = `csharp.silenceVersionOverflows`;
  Configs2["ELIXIR_ENABLED"] = `elixir.enabled`;
  Configs2["ELIXIR_INDEX_SERVER_URL"] = `elixir.indexServerURL`;
  Configs2["ELIXIR_UNSTABLE_FILTER"] = `elixir.unstableFilter`;
  Configs2["ELIXIR_IGNORE_LINE_PATTERN"] = `elixir.ignoreLinePattern`;
  Configs2["ELIXIR_INFORM_PATCH_UPDATES"] = `elixir.informPatchUpdates`;
  Configs2["ELIXIR_ENABLED_LOCK_FILE"] = `elixir.lockFileEnabled`;
  Configs2["ELIXIR_SILENCE_VERSION_OVERFLOWS"] = `elixir.silenceVersionOverflows`;
  Configs2["GRADLE_ENABLED"] = `gradle.enabled`;
  Configs2["GRADLE_INDEX_SERVER_URL"] = `gradle.indexServerURL`;
  Configs2["GRADLE_UNSTABLE_FILTER"] = `gradle.unstableFilter`;
  Configs2["GRADLE_IGNORE_LINE_PATTERN"] = `gradle.ignoreLinePattern`;
  Configs2["GRADLE_INFORM_PATCH_UPDATES"] = `gradle.informPatchUpdates`;
  Configs2["GRADLE_SILENCE_VERSION_OVERFLOWS"] = `gradle.silenceVersionOverflows`;
  Configs2["TERRAFORM_ENABLED"] = `terraform.enabled`;
  Configs2["TERRAFORM_INDEX_SERVER_URL"] = `terraform.indexServerURL`;
  Configs2["TERRAFORM_UNSTABLE_FILTER"] = `terraform.unstableFilter`;
  Configs2["TERRAFORM_IGNORE_LINE_PATTERN"] = `terraform.ignoreLinePattern`;
  Configs2["TERRAFORM_INFORM_PATCH_UPDATES"] = `terraform.informPatchUpdates`;
  Configs2["TERRAFORM_SILENCE_VERSION_OVERFLOWS"] = `terraform.silenceVersionOverflows`;
  Configs2["VULS_ENABLED"] = `vulnerability.enabled`;
  Configs2["VULS_GHSA_ENABLED"] = `vulnerability.ghsa.enabled`;
  Configs2["VULS_OSV_BATCH_URL"] = `vulnerability.osvQueryURL.batch`;
  Configs2["VULS_OSV_URL"] = `vulnerability.osvQueryURL.single`;
  Configs2["INDEX_SERVER_API_KEY"] = `apiKey`;
  Configs2["INDEX_SERVER_URL"] = `apiURL`;
  Configs2["DECORATOR_POSITION"] = `decoration.position`;
  Configs2["ERROR_DECORATOR"] = `decoration.error.template`;
  Configs2["ERROR_DECORATOR_CSS"] = `decoration.error.style`;
  Configs2["INCOMPATIBLE_DECORATOR"] = `decoration.incompatible.template`;
  Configs2["INCOMPATIBLE_DECORATOR_CSS"] = `decoration.incompatible.style`;
  Configs2["PATCH_UPDATE_DECORATOR"] = `decoration.patchUpdate.template`;
  Configs2["PATCH_UPDATE_DECORATOR_CSS"] = `decoration.patchUpdate.style`;
  Configs2["COMPATIBLE_DECORATOR"] = `decoration.compatible.template`;
  Configs2["COMPATIBLE_DECORATOR_CSS"] = `decoration.compatible.style`;
  Configs2["VULNERABILITY_DECORATOR"] = `decoration.vulnerability.template`;
  Configs2["REPLACE_VERSIONS"] = `${DEPENDI}commands.replaceVersion`;
  Configs2["GENERATE_VULNERABILITY_REPORT"] = `${DEPENDI}commands.vulnerability.report`;
  Configs2["GENERATE_VULNERABILITY_CURRENT_REPORT"] = `${DEPENDI}commands.vulnerability.currentReport`;
  Configs2["UPDATE_ALL"] = `${DEPENDI}commands.updateAll`;
  Configs2["RETRY"] = `${DEPENDI}commands.retry`;
  Configs2["ENABLE_LOCK_FILE_PARSING"] = `${DEPENDI}commands.enableLockFileParsing`;
  Configs2["DISABLE_LOCK_FILE_PARSING"] = `${DEPENDI}commands.disableLockFileParsing`;
  Configs2["LOCK_FILE_PARSED"] = `${DEPENDI}commands.lockFileParsed`;
  Configs2["SILENCE_UPDATE_MESSAGES"] = `extras.silenceUpdateMessages`;
  Configs2["DEVICE_ID"] = `${DEPENDI}deviceID`;
  Configs2["SHOWN_VERSION"] = `${DEPENDI}shownVersion`;
  Configs2["RUST_UNSTABLE_OLD"] = `rust.excludeUnstableVersions`;
  Configs2["NPM_UNSTABLE_OLD"] = `npm.excludeUnstableVersions`;
  Configs2["PHP_UNSTABLE_OLD"] = `php.excludeUnstableVersions`;
  Configs2["GO_UNSTABLE_OLD"] = `go.excludeUnstableVersions`;
  Configs2["PYTHON_UNSTABLE_OLD"] = `python.excludeUnstableVersions`;
  return Configs2;
})(Configs || {});
var Settings = {
  version: "0.0.1",
  rust: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  npm: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false,
    jsrEnabled: true,
    jsrIndex: ""
  },
  php: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  go: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: true,
    silenceVersionOverflows: false
  },
  python: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  dart: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  csharp: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  elixir: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    lockFileEnabled: true,
    silenceVersionOverflows: false
  },
  gradle: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    silenceVersionOverflows: false
  },
  terraform: {
    enabled: true,
    index: "",
    unstableFilter: 0 /* Exclude */,
    ignoreLinePattern: "",
    informPatchUpdates: false,
    silenceVersionOverflows: false
  },
  vulnerability: {
    enabled: false,
    ghsa: false,
    osvBatch: "",
    osvSingle: ""
  },
  api: {
    key: "",
    url: "",
    proPanelURL: "https://www.dependi.io/pro",
    deviceID: ""
  },
  decorator: {
    position: "",
    error: {
      template: "",
      css: {}
    },
    incompatible: {
      template: "",
      css: {}
    },
    patchUpdate: {
      template: "",
      css: {}
    },
    compatible: {
      template: "",
      css: {}
    },
    vulnerability: {
      template: ""
    }
  },
  extras: {
    silenceUpdateMessages: false
  },
  load: function() {
    const config = workspace.getConfiguration("dependi");
    console.log(this.version);
    this.rust.enabled = config.get("rust.enabled" /* RUST_ENABLED */) ?? true;
    this.rust.index = config.get("rust.indexServerURL" /* RUST_INDEX_SERVER_URL */) || "https://index.crates.io";
    this.rust.unstableFilter = migrateUnstableSettings("rust.unstableFilter" /* RUST_UNSTABLE_FILTER */, "rust.excludeUnstableVersions" /* RUST_UNSTABLE_OLD */);
    this.rust.ignoreLinePattern = config.get("rust.ignoreLinePattern" /* RUST_IGNORE_LINE_PATTERN */) || "";
    this.rust.informPatchUpdates = config.get("rust.informPatchUpdates" /* RUST_INFORM_PATCH_UPDATES */) ?? false;
    this.rust.lockFileEnabled = config.get("rust.lockFileEnabled" /* RUST_ENABLED_LOCK_FILE */) ?? true;
    this.rust.silenceVersionOverflows = config.get("rust.silenceVersionOverflows" /* RUST_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.npm.enabled = config.get("npm.enabled" /* NPM_ENABLED */) ?? true;
    this.npm.index = config.get("npm.indexServerURL" /* NPM_INDEX_SERVER_URL */) || "https://registry.npmjs.org";
    this.npm.unstableFilter = migrateUnstableSettings("npm.unstableFilter" /* NPM_UNSTABLE_FILTER */, "npm.excludeUnstableVersions" /* NPM_UNSTABLE_OLD */);
    this.npm.ignoreLinePattern = config.get("npm.ignoreLinePattern" /* NPM_IGNORE_LINE_PATTERN */) || "";
    this.npm.informPatchUpdates = config.get("npm.informPatchUpdates" /* NPM_INFORM_PATCH_UPDATES */) ?? false;
    this.npm.lockFileEnabled = config.get("npm.lockFileEnabled" /* NPM_ENABLED_LOCK_FILE */) ?? true;
    this.npm.silenceVersionOverflows = config.get("npm.silenceVersionOverflows" /* NPM_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.npm.jsrEnabled = config.get("npm.jsrEnabled" /* NPM_JSR_ENABLED */) ?? true;
    this.npm.jsrIndex = config.get("npm.jsrIndexServerURL" /* NPM_JSR_INDEX_SERVER_URL */) || "https://jsr.io";
    this.php.enabled = config.get("php.enabled" /* PHP_ENABLED */) ?? true;
    this.php.index = config.get("php.indexServerURL" /* PHP_INDEX_SERVER_URL */) || "https://repo.packagist.org";
    this.php.unstableFilter = migrateUnstableSettings("php.unstableFilter" /* PHP_UNSTABLE_FILTER */, "php.excludeUnstableVersions" /* PHP_UNSTABLE_OLD */);
    this.php.ignoreLinePattern = config.get("php.ignoreLinePattern" /* PHP_IGNORE_LINE_PATTERN */) || "";
    this.php.informPatchUpdates = config.get("php.informPatchUpdates" /* PHP_INFORM_PATCH_UPDATES */) ?? false;
    this.php.lockFileEnabled = config.get("php.lockFileEnabled" /* PHP_ENABLED_LOCK_FILE */) ?? true;
    this.php.silenceVersionOverflows = config.get("php.silenceVersionOverflows" /* PHP_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.go.enabled = config.get("go.enabled" /* GO_ENABLED */) ?? true;
    this.go.index = config.get("go.indexServerURL" /* GO_INDEX_SERVER_URL */) || "https://proxy.golang.org";
    this.go.unstableFilter = migrateUnstableSettings("go.unstableFilter" /* GO_UNSTABLE_FILTER */, "go.excludeUnstableVersions" /* GO_UNSTABLE_OLD */);
    this.go.ignoreLinePattern = config.get("go.ignoreLinePattern" /* GO_IGNORE_LINE_PATTERN */) || "";
    this.go.informPatchUpdates = config.get("go.informPatchUpdates" /* GO_INFORM_PATCH_UPDATES */) ?? false;
    this.go.silenceVersionOverflows = config.get("go.silenceVersionOverflows" /* GO_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.python.enabled = config.get("python.enabled" /* PYTHON_ENABLED */) ?? true;
    this.python.index = config.get("python.indexServerURL" /* PYTHON_INDEX_SERVER_URL */) || "https://pypi.org/pypi";
    this.python.unstableFilter = migrateUnstableSettings("python.unstableFilter" /* PYTHON_UNSTABLE_FILTER */, "python.excludeUnstableVersions" /* PYTHON_UNSTABLE_OLD */);
    this.python.ignoreLinePattern = config.get("python.ignoreLinePattern" /* PYTHON_IGNORE_LINE_PATTERN */) || "";
    this.python.informPatchUpdates = config.get("python.informPatchUpdates" /* PYTHON_INFORM_PATCH_UPDATES */) ?? false;
    this.python.lockFileEnabled = config.get("python.lockFileEnabled" /* PYTHON_ENABLED_LOCK_FILE */) ?? true;
    this.python.silenceVersionOverflows = config.get("python.silenceVersionOverflows" /* PYTHON_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.dart.enabled = config.get("dart.enabled" /* DART_ENABLED */) ?? true;
    this.dart.index = config.get("dart.indexServerURL" /* DART_INDEX_SERVER_URL */) || "https://pub.dev";
    this.dart.unstableFilter = UnstableFilter[config.get("dart.unstableFilter" /* DART_UNSTABLE_FILTER */)] || 0 /* Exclude */;
    this.dart.ignoreLinePattern = config.get("dart.ignoreLinePattern" /* DART_IGNORE_LINE_PATTERN */) || "";
    this.dart.informPatchUpdates = config.get("dart.informPatchUpdates" /* DART_INFORM_PATCH_UPDATES */) ?? false;
    this.dart.lockFileEnabled = config.get("dart.lockFileEnabled" /* DART_ENABLED_LOCK_FILE */) ?? true;
    this.dart.silenceVersionOverflows = config.get("dart.silenceVersionOverflows" /* DART_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.csharp.enabled = config.get("csharp.enabled" /* CSHARP_ENABLED */) ?? true;
    this.csharp.index = config.get("csharp.indexServerURL" /* CSHARP_INDEX_SERVER_URL */) || "https://api.nuget.org";
    this.csharp.unstableFilter = UnstableFilter[config.get("csharp.unstableFilter" /* CSHARP_UNSTABLE_FILTER */)] || 0 /* Exclude */;
    this.csharp.ignoreLinePattern = config.get("csharp.ignoreLinePattern" /* CSHARP_IGNORE_LINE_PATTERN */) || "";
    this.csharp.informPatchUpdates = config.get("csharp.informPatchUpdates" /* CSHARP_INFORM_PATCH_UPDATES */) ?? false;
    this.csharp.lockFileEnabled = config.get("csharp.lockFileEnabled" /* CSHARP_ENABLED_LOCK_FILE */) ?? true;
    this.csharp.silenceVersionOverflows = config.get("csharp.silenceVersionOverflows" /* CSHARP_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.elixir.enabled = config.get("elixir.enabled" /* ELIXIR_ENABLED */) ?? true;
    this.elixir.index = config.get("elixir.indexServerURL" /* ELIXIR_INDEX_SERVER_URL */) || "https://hex.pm";
    this.elixir.unstableFilter = UnstableFilter[config.get("elixir.unstableFilter" /* ELIXIR_UNSTABLE_FILTER */)] || 0 /* Exclude */;
    this.elixir.ignoreLinePattern = config.get("elixir.ignoreLinePattern" /* ELIXIR_IGNORE_LINE_PATTERN */) || "";
    this.elixir.informPatchUpdates = config.get("elixir.informPatchUpdates" /* ELIXIR_INFORM_PATCH_UPDATES */) ?? false;
    this.elixir.lockFileEnabled = config.get("elixir.lockFileEnabled" /* ELIXIR_ENABLED_LOCK_FILE */) ?? true;
    this.elixir.silenceVersionOverflows = config.get("elixir.silenceVersionOverflows" /* ELIXIR_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.gradle.enabled = config.get("gradle.enabled" /* GRADLE_ENABLED */) ?? true;
    this.gradle.index = config.get("gradle.indexServerURL" /* GRADLE_INDEX_SERVER_URL */) || "https://repo1.maven.org/maven2";
    this.gradle.unstableFilter = UnstableFilter[config.get("gradle.unstableFilter" /* GRADLE_UNSTABLE_FILTER */)] || 0 /* Exclude */;
    this.gradle.ignoreLinePattern = config.get("gradle.ignoreLinePattern" /* GRADLE_IGNORE_LINE_PATTERN */) || "";
    this.gradle.informPatchUpdates = config.get("gradle.informPatchUpdates" /* GRADLE_INFORM_PATCH_UPDATES */) ?? false;
    this.gradle.silenceVersionOverflows = config.get("gradle.silenceVersionOverflows" /* GRADLE_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.terraform.enabled = config.get("terraform.enabled" /* TERRAFORM_ENABLED */) ?? true;
    this.terraform.index = config.get("terraform.indexServerURL" /* TERRAFORM_INDEX_SERVER_URL */) || "https://registry.terraform.io";
    this.terraform.unstableFilter = UnstableFilter[config.get("terraform.unstableFilter" /* TERRAFORM_UNSTABLE_FILTER */)] || 0 /* Exclude */;
    this.terraform.ignoreLinePattern = config.get("terraform.ignoreLinePattern" /* TERRAFORM_IGNORE_LINE_PATTERN */) || "";
    this.terraform.informPatchUpdates = config.get("terraform.informPatchUpdates" /* TERRAFORM_INFORM_PATCH_UPDATES */) ?? false;
    this.terraform.silenceVersionOverflows = config.get("terraform.silenceVersionOverflows" /* TERRAFORM_SILENCE_VERSION_OVERFLOWS */) ?? false;
    this.vulnerability.enabled = config.get("vulnerability.enabled" /* VULS_ENABLED */) ?? true;
    this.vulnerability.ghsa = config.get("vulnerability.ghsa.enabled" /* VULS_GHSA_ENABLED */) ?? false;
    this.vulnerability.osvBatch = config.get("vulnerability.osvQueryURL.batch" /* VULS_OSV_BATCH_URL */) || "https://api.osv.dev/v1/querybatch";
    this.vulnerability.osvSingle = config.get("vulnerability.osvQueryURL.single" /* VULS_OSV_URL */) || "https://api.osv.dev/v1/query";
    this.api.key = config.get("apiKey" /* INDEX_SERVER_API_KEY */) || "";
    this.api.url = config.get("apiURL" /* INDEX_SERVER_URL */) || "https://index.dependi.io";
    this.decorator.position = config.get("decoration.position" /* DECORATOR_POSITION */) || "after";
    this.decorator.error.template = config.get("decoration.error.template" /* ERROR_DECORATOR */) ?? "\u2757\uFE0F\u2757\uFE0F\u2757\uFE0F";
    this.decorator.error.css = config.get("decoration.error.style" /* ERROR_DECORATOR_CSS */) || {};
    this.decorator.incompatible.template = config.get("decoration.incompatible.template" /* INCOMPATIBLE_DECORATOR */) ?? "\u274C ${version}";
    this.decorator.incompatible.css = config.get("decoration.incompatible.style" /* INCOMPATIBLE_DECORATOR_CSS */) || {};
    this.decorator.patchUpdate.template = config.get("decoration.patchUpdate.template" /* PATCH_UPDATE_DECORATOR */) ?? "\u26A0\uFE0F ${version}";
    this.decorator.patchUpdate.css = config.get("decoration.patchUpdate.style" /* PATCH_UPDATE_DECORATOR_CSS */) || {};
    this.decorator.compatible.template = config.get("decoration.compatible.template" /* COMPATIBLE_DECORATOR */) ?? "\u2705";
    this.decorator.compatible.css = config.get("decoration.compatible.style" /* COMPATIBLE_DECORATOR_CSS */) || {};
    this.decorator.vulnerability.template = config.get("decoration.vulnerability.template" /* VULNERABILITY_DECORATOR */) ?? "\u{1F6A8} ${count}";
    this.extras.silenceUpdateMessages = config.get("extras.silenceUpdateMessages" /* SILENCE_UPDATE_MESSAGES */) ?? false;
    console.debug("Settings loaded", this);
  },
  onChange: function(e) {
    if (e.affectsConfiguration("dependi")) {
      console.debug("Config changed");
      this.load();
    }
  }
};
function migrateUnstableSettings(newSettingKey, oldSettingKey) {
  const config = workspace.getConfiguration("dependi");
  const filter = config.get(newSettingKey);
  if (Settings.version > "0.7.9") {
    const oldSetting = config.get(oldSettingKey);
    if (oldSetting !== void 0) {
      config.update(oldSettingKey, void 0, true);
      config.update(newSettingKey, oldSetting ? "Exclude" : "IncludeAlways", true);
      return oldSetting ? 0 /* Exclude */ : 1 /* IncludeAlways */;
    }
  }
  return UnstableFilter[filter] || 0 /* Exclude */;
}

// src/analyze.ts
var import_node_path = __toESM(require("node:path"));

// ../../vscode/src/core/Language.ts
var import_path = __toESM(require("path"));

// src/shims/logger.ts
var Logger = {
  name: "Dependi",
  append: (value) => process.stderr.write(value),
  appendLine: (value) => process.stderr.write(value + "\n"),
  clear: () => {
  },
  show: () => {
  },
  hide: () => {
  },
  dispose: () => {
  },
  replace: () => {
  }
};

// ../../vscode/src/api/utils.ts
var import_os = __toESM(require("os"));
function getOSInfo() {
  const platform = import_os.default.platform();
  const release = import_os.default.release();
  let osInfo = "Unknown OS";
  switch (platform) {
    case "win32":
      osInfo = "Windows";
      if (release.startsWith("10")) osInfo += " 10";
      else if (release.startsWith("6.3")) osInfo += " 8.1";
      else if (release.startsWith("6.2")) osInfo += " 8";
      else if (release.startsWith("6.1")) osInfo += " 7";
      break;
    case "darwin":
      osInfo = "Mac OS X";
      const macVersion = release.split(".").slice(0, 2).join(".");
      osInfo += ` ${macVersion}`;
      break;
    case "linux":
      osInfo = "Linux";
      break;
    default:
      osInfo = platform;
  }
  return osInfo;
}
function customUserAgent() {
  return `Dependi (https://www.dependi.io) (${Settings.version}) - ${getOSInfo()}`;
}
var UserAgent = customUserAgent();
function getReqOptions(url) {
  const u = new URL(url);
  const options = {
    protocol: u.protocol,
    hostname: u.hostname,
    port: u.port,
    path: u.pathname + u.search,
    headers: {
      "User-Agent": UserAgent
    },
    timeout: 1e3
  };
  return options;
}

// ../../vscode/src/api/indexes/utils.ts
var zlib = __toESM(require("zlib"));
function ResponseError(res) {
  return new Error(`statusCode=${res.statusCode}: ${res.url}`);
}
function isStatusInvalid(res) {
  if (!res.statusCode) {
    return true;
  }
  if (res.statusCode < 200 || res.statusCode >= 300) {
    return true;
  }
  return false;
}
function isStatusRedirect(res) {
  if (!res.statusCode) {
    return false;
  }
  return res.statusCode >= 300 && res.statusCode < 400;
}
function addResponseHandlers(name, res, req, reject) {
  let body = [];
  res.on("data", function(chunk) {
    body.push(chunk);
  });
  req.on("error", function(err) {
    reject(err);
  });
  req.on("timeout", function() {
    req.destroy();
    reject(new Error(`Request to ${name} timed out`));
  });
  return body;
}
function addResponseHandlersWithGzip(name, res, req, reject) {
  let body = [];
  req.on("error", function(err) {
    reject(err);
  });
  req.on("timeout", function() {
    req.destroy();
    reject(new Error(`Request to ${name} timed out`));
  });
  let responseStream;
  const contentEncoding = res.headers["content-encoding"];
  if (contentEncoding === "gzip") {
    responseStream = res.pipe(zlib.createGunzip());
  } else {
    responseStream = res;
  }
  responseStream.on("error", (err) => {
    reject(err);
  });
  responseStream.on("data", function(chunk) {
    body.push(chunk);
  });
  return { body, stream: responseStream };
}
function cleanURL(url) {
  let clean = url.replace("///", "");
  if (clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

// ../../vscode/src/api/indexes/dependi/index.ts
async function request(path12, init) {
  try {
    const response = await fetch(getURL(path12), {
      method: "GET",
      credentials: "include",
      cache: "default",
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": UserAgent,
        ...init?.headers
      }
    });
    let error;
    let body;
    const contentType = response.headers.get("Content-Type");
    if (response.status > 0 && response.status < 300) {
      if (response.status !== 204) {
        try {
          if (contentType && contentType.includes("application/json")) {
            body = await response.json();
          } else if (contentType && contentType.includes("text/html")) {
            body = await response.text();
          } else if (contentType && contentType.includes("application/pdf")) {
            body = await response.blob();
          } else {
            body = await response.text();
          }
        } catch (e) {
          error = await response.text();
        }
      } else {
        Logger.appendLine(`${path12}:${init?.method || "GET"} ${response.status}-${response.statusText}`);
      }
    } else {
      error = await response.text();
      if (error) {
        try {
          error = JSON.parse(error);
          error = error.message || error.error || error;
        } catch (e) {
          Logger.appendLine(`${path12}:${init?.method || "GET"} ${response.status}-${response.statusText}, ${e}, ${error}`);
        }
      }
      console.error(path12, init?.method || "GET", error, response.status, response.statusText);
      Logger.appendLine(`${path12}:${init?.method || "GET"} ${response.status}-${response.statusText}, ${error}`);
    }
    return {
      status: response.status,
      statusText: response.statusText,
      body,
      headers: response.headers,
      error,
      isLoading: false
    };
  } catch (e) {
    console.error(path12, init?.method || "GET", e);
    Logger.appendLine(`${path12}:${init?.method || "GET"} ${e}`);
    return {
      status: 0,
      statusText: "",
      body: void 0,
      headers: void 0,
      error: e.message || e + "",
      isLoading: false
    };
  }
}
function getURL(path12) {
  return cleanURL(`${Settings.api.url}/${path12}`);
}

// ../../vscode/src/api/telemetry/telemetry.ts
async function sendTelemetry(req) {
  req.DeviceID = Settings.api.deviceID;
  req.FileName = req.FileName.toLowerCase();
  const response = await request(`v1/public/telemetries`, {
    method: "POST",
    headers: {
      "X-Device-ID": Settings.api.deviceID,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  });
  if (response.error) {
    Logger.appendLine(`Error sending telemetry: ${response.error}`);
  }
  return response;
}

// ../../vscode/src/core/Language.ts
var CurrentLanguage = 0 /* None */;
var CurrentLanguageConfig = "";
var CurrentEnvironment = "crates.io" /* Cratesio */;
function setLanguage(file) {
  if (!file) {
    CurrentLanguage = 0 /* None */;
    return;
  }
  const filename = import_path.default.basename(file);
  const fileExtension = import_path.default.extname(filename);
  switch (filename.toLowerCase()) {
    case "cargo.toml":
      return setLanguageConfig(1 /* Rust */, "rust", filename, "crates.io" /* Cratesio */, Settings.rust.lockFileEnabled);
    case "go.mod":
      return setLanguageConfig(2 /* Golang */, "go", filename, "Go" /* Go */);
    case "package.json":
      return setLanguageConfig(3 /* JS */, "npm", filename, "npm" /* Npm */, Settings.npm.lockFileEnabled);
    case "deno.json":
    case "deno.jsonc":
      return setLanguageConfig(3 /* JS */, "npm", filename, "npm" /* Npm */);
    case "pnpm-workspace.yaml":
      return setLanguageConfig(8 /* PnpmWorkspace */, "npm", filename, "npm" /* Npm */);
    case "composer.json":
      return setLanguageConfig(5 /* PHP */, "php", filename, "Packagist" /* Packagist */, Settings.php.lockFileEnabled);
    case "pyproject.toml":
      return setLanguageConfig(4 /* Python */, "python", filename, "PyPI" /* Pypi */, Settings.python.lockFileEnabled);
    case "pixi.toml":
      return setLanguageConfig(4 /* Python */, "python", filename, "PyPI" /* Pypi */, Settings.python.lockFileEnabled);
    case "pubspec.yaml":
      return setLanguageConfig(6 /* Dart */, "dart", filename, "Pub" /* Dart */);
    case "mix.exs":
      return setLanguageConfig(9 /* Elixir */, "elixir", filename, "Hex" /* Hex */, Settings.elixir.lockFileEnabled);
    case "build.gradle":
    case "build.gradle.kts":
    case "libs.versions.toml":
    case "gradle-wrapper.properties":
      return setLanguageConfig(10 /* Gradle */, "gradle", filename, "Maven" /* Maven */);
    case "directory.build.props":
    case "directory.packages.props":
      return setLanguageConfig(7 /* CSharp */, "csharp", filename, "NuGet" /* Nuget */);
    default:
      if (fileExtension === ".tf") {
        return setLanguageConfig(11 /* Terraform */, "terraform", filename, "Terraform" /* Terraform */);
      }
      if (fileExtension === ".csproj" || fileExtension === ".fsproj") {
        return setLanguageConfig(7 /* CSharp */, "csharp", filename, "NuGet" /* Nuget */);
      }
      if ((fileExtension === ".txt" || fileExtension === ".in") && filename.toLowerCase().startsWith("requirement")) {
        return setLanguageConfig(4 /* Python */, "python", filename, "PyPI" /* Pypi */, Settings.python.lockFileEnabled);
      }
  }
}
function setLanguageConfig(language, config, filename, OCVenv, isLockFileEnabled) {
  CurrentLanguage = language;
  CurrentLanguageConfig = config;
  CurrentEnvironment = OCVenv;
  commands.executeCommand("setContext", "dependi.supportedFiles", [filename]);
  if (env.isTelemetryEnabled)
    sendTelemetry({ FileName: filename });
  if (isLockFileEnabled !== void 0) {
    commands.executeCommand("setContext", "dependi.hasLockFile", false);
    commands.executeCommand("setContext", "dependi.isEnableLockParsing", isLockFileEnabled);
  }
  return language;
}

// ../../vscode/src/api/indexes/request.ts
var https = __toESM(require("https"));
var import_http = __toESM(require("http"));
var makeRequest = (requestOptions, handleResponse, reject, headersAccept) => {
  let protocol = requestOptions.protocol === "http:" ? import_http.default : https;
  const req = protocol.get(requestOptions, (res) => {
    if (isStatusRedirect(res) && res.headers.location) {
      const newUrl = cleanURL(res.headers.location);
      const newOptions = getReqOptions(newUrl);
      if (headersAccept) {
        newOptions.headers = {
          Accept: headersAccept
        };
      }
      protocol = newOptions.protocol === "http:" ? import_http.default : https;
      const redirectReq = protocol.get(newOptions, (redirectRes) => {
        handleResponse(redirectRes, redirectReq);
      }).on("error", reject);
      redirectReq.end();
    } else {
      handleResponse(res, req);
    }
  }).on("error", reject);
  req.end();
};

// ../../vscode/src/api/indexes/crates.ts
var import_url = require("url");
var versions = (name, indexServerURL, registryToken) => {
  return new Promise(function(resolve, reject) {
    if (!indexServerURL) {
      indexServerURL = Settings.rust.index;
    }
    const urlStr = getURL2(name, indexServerURL);
    const url = new import_url.URL(urlStr);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      protocol: url.protocol,
      headers: {},
      method: "GET"
    };
    if (registryToken) {
      options.headers["Authorization"] = registryToken;
    }
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      let body = addResponseHandlers(name, res, req, reject);
      let info;
      res.on("end", () => {
        try {
          const bodyString = Buffer.concat(body).toString();
          const bodyArray = bodyString.split("\n").filter((n) => n).map((line) => JSON.parse(line));
          info = {
            name,
            versions: bodyArray.filter((e) => e.yanked === false).map((e) => e.vers),
            features: Object.keys(bodyArray.at(-1).features).filter((feature) => feature !== "default")
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};
function getURL2(name, indexServerURL) {
  const lc = name.replace(/"/g, "").toLowerCase();
  let prefix;
  if (lc.length <= 2) {
    prefix = lc.length.toFixed(0);
  } else if (lc.length == 3) {
    prefix = `3/${lc.substring(0, 1)}`;
  } else {
    prefix = `${lc.substring(0, 2)}/${lc.substring(2, 4)}`;
  }
  const baseUrl = indexServerURL.endsWith("/") ? indexServerURL : indexServerURL + "/";
  return cleanURL(`${baseUrl}${prefix}/${lc}`);
}

// ../../vscode/src/utils/errors.ts
function fetcherCatch(dep) {
  return (error) => {
    console.error(error);
    Logger.appendLine("Error fetching versions for " + dep.item.key + ": " + error);
    return {
      item: dep,
      error: dep.item.key + ": " + error
    };
  };
}

// ../../vscode/src/api/osv/vulnerability-service.ts
var https2 = __toESM(require("https"));
var import_node_cache = __toESM(require_node_cache2());

// ../../vscode/src/ui/status-bar.ts
var StatusBar = window2.createStatusBarItem(
  StatusBarAlignment.Right,
  -1e3
);
StatusBar.setText = (t, text, noDialog = false) => {
  switch (t) {
    case "Error":
      StatusBar.color = "statusBarItem.errorForeground";
      StatusBar.text = "$(error) Dependi";
      if (noDialog) {
        StatusBar.tooltip = text || "Error";
        return;
      } else {
        StatusBar.tooltip = "";
        window2.showErrorMessage(text || "Error");
        return;
      }
    case "Warning":
      StatusBar.text = "$(warning) Dependi";
      StatusBar.color = "statusBarItem.warningForeground";
      break;
    case "Info":
      StatusBar.color = "statusBarItem.foreground";
      StatusBar.text = "$(check-all) Dependi";
      break;
    case "Loading":
      StatusBar.color = "statusBarItem.activeForeground";
      StatusBar.text = "$(sync~spin) Dependi";
  }
  if (text) {
    window2.setStatusBarMessage(`Dependi: ${text}`, 2e3);
  }
  StatusBar.tooltip = text;
  StatusBar.command = Configs.RETRY;
};
StatusBar.fetching = (indexServerURL) => {
  StatusBar.color = "statusBarItem.activeForeground";
  StatusBar.text = "$(sync~spin) Dependi";
  StatusBar.tooltip = "\u{1F440} Fetching " + indexServerURL.replace(/^https?:\/\//, "");
  StatusBar.command = Configs.RETRY;
};

// ../../vscode/src/api/osv/vulnerability-service.ts
var cache = new import_node_cache.default({ stdTTL: 60 * 10 });
function fetchDataFromOSV(request3) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  return new Promise((resolve, reject) => {
    const req = https2.request(Settings.vulnerability.osvBatch, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const responseData = JSON.parse(data);
          for (let i = 0; i < responseData.results?.length; i++) {
            responseData.results[i].packageName = request3.queries[i].package.name;
            responseData.results[i].version = request3.queries[i].version;
            if (responseData.results[i].vulns) {
              responseData.results[i].vulns = responseData.results[i].vulns.filter((vuln) => {
                if (!Settings.vulnerability.ghsa) {
                  return !vuln.id.startsWith("GHSA");
                } else {
                  return true;
                }
              });
            }
          }
          resolve(responseData);
        } catch (error) {
          reject(error);
        }
      });
    });
    req.on("error", (error) => {
      reject(error);
    });
    req.write(JSON.stringify(request3));
    req.end();
  });
}
var queryOSVAPI = async (request3) => {
  try {
    const cacheKey = JSON.stringify({ request: request3, ghsaCheck: Settings.vulnerability.ghsa });
    if (cache.has(cacheKey)) {
      const cachedResponse = cache.get(cacheKey);
      if (cachedResponse === void 0) {
        throw new Error("Cached response is undefined");
      }
      return cachedResponse;
    } else {
      const response = await fetchDataFromOSV(request3);
      cache.set(cacheKey, response);
      return response;
    }
  } catch (error) {
    console.error("Error fetching data from OSV API:", error);
    Logger.appendLine("Error fetching data from OSV API: " + error);
    throw error;
  }
};
var queryMultiplePackageVulns = async (dependencies, environment) => {
  try {
    const queryArray = {
      queries: []
    };
    for (let i = 0; i < dependencies.length; i++) {
      const packageName = dependencies[i].item.key;
      const currentVersionIndex = dependencies[i].versions?.findIndex((version) => version === dependencies[i]?.item?.value) ?? (dependencies[i].versions?.length ?? 0) - 1;
      for (let j = 0; j <= currentVersionIndex; j++) {
        if (!dependencies[i].versions || !dependencies[i]?.versions?.[j]) {
          continue;
        }
        queryArray.queries.push({
          version: dependencies[i].versions?.[j],
          package: {
            name: packageName,
            ecosystem: environment
          }
        });
      }
    }
    StatusBar.setText("Info", "Fetching vulnerabilities from OSV");
    const response = await queryOSVAPI(queryArray);
    const packageWithVulnArray = groupByPackages(response, dependencies);
    StatusBar.setText("Info", "Vulnerabilities fetched from OSV");
    return packageWithVulnArray;
  } catch (error) {
    console.error("Error querying multiple package vulnerabilities:", error);
    Logger.appendLine("Error querying multiple package vulnerabilities: " + error);
    return [];
  }
};
function groupByPackages(response, dependencies) {
  const packagesMap = /* @__PURE__ */ new Map();
  for (let i = 0; i < response.results?.length; i++) {
    const key = response.results[i].packageName;
    if (packagesMap.has(key)) {
      const value = packagesMap.get(key);
      value?.versionVulnerabilities.push({
        version: response.results[i].version,
        vulnerabilities: response.results[i].vulns
      });
      packagesMap.set(key, value);
    } else {
      packagesMap.set(key, {
        packageName: key,
        versionVulnerabilities: [{
          version: response.results[i].version,
          vulnerabilities: response.results[i].vulns
        }]
      });
    }
  }
  for (let i = 0; i < dependencies?.length; i++) {
    const vulnerabilities = packagesMap.get(dependencies[i].item.key);
    const vulnsMap = /* @__PURE__ */ new Map();
    if (vulnerabilities?.versionVulnerabilities) {
      for (let j = 0; j < vulnerabilities?.versionVulnerabilities.length; j++) {
        const vulnerabilityArray = vulnerabilities?.versionVulnerabilities[j];
        const idArray = [];
        if (vulnerabilityArray?.vulnerabilities) {
          vulnerabilityArray?.vulnerabilities.forEach((v) => {
            idArray.push(v.id);
          });
        }
        vulnsMap.set(vulnerabilityArray.version, idArray);
      }
    }
    dependencies[i].vulns = vulnsMap;
  }
  return dependencies;
}

// ../../vscode/src/semver/compareVersions.ts
var semver = /^(?:\^|~)?v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
function indexOrEnd(str, q) {
  return str.indexOf(q) === -1 ? str.length : str.indexOf(q);
}
function lastIndexOrEnd(str, q) {
  return str.lastIndexOf(q) === -1 ? str.length : str.lastIndexOf(q);
}
function split(v) {
  const c = v.replace(/^v/, "").replace(/\+.*$/, "");
  const patchIndex = CurrentLanguage === 4 /* Python */ ? lastIndexOrEnd(c, ".") : indexOrEnd(c, "-");
  const arr = c.substring(0, patchIndex).split(".");
  arr.push(c.substring(patchIndex + 1));
  return arr;
}
function validate(version) {
  if (!semver.test(version)) {
    throw new Error(
      "Invalid argument not valid semver ('" + version + "' received)"
    );
  }
}
function compareVersions(v1, v2) {
  if (CurrentLanguage !== 4 /* Python */) {
    [v1, v2].forEach(validate);
  }
  const s1 = split(v1);
  const s2 = split(v2);
  const limit = Math.max(s1.length - 1, s2.length - 1);
  for (let i = 0; i < limit; i++) {
    var n1 = parseInt(s1[i] || "0", 10);
    var n2 = parseInt(s2[i] || "0", 10);
    if (n1 > n2) return 1;
    if (n2 > n1) return -1;
  }
  if (s1.length !== s2.length) {
    if (s1.length > s2.length) return 1;
    return -1;
  }
  var sp1 = s1[s1.length - 1];
  var sp2 = s2[s2.length - 1];
  if (sp1 && sp2) {
    const p1 = sp1.split(".").map((str) => /^\d+$/.test(str) ? parseInt(str, 10) : str);
    const p2 = sp2.split(".").map((str) => /^\d+$/.test(str) ? parseInt(str, 10) : str);
    const maxLimit = Math.max(p1.length, p2.length);
    for (let i = 0; i < maxLimit; i++) {
      if (p1[i] === void 0) return -1;
      if (p2[i] === void 0) return 1;
      if (typeof p1[i] === "string" && typeof p2[i] === "number") {
        if (parseInt(p1[i].toString()) >= parseInt(p2[i].toString())) {
          return 1;
        }
        return -1;
      } else if (typeof p2[i] === "string" && typeof p1[i] === "number") {
        if (parseInt(p2[i].toString()) >= parseInt(p1[i].toString())) {
          return -1;
        }
        return 1;
      }
      if (p1[i] > p2[i]) return 1;
      if (p2[i] > p1[i]) return -1;
    }
  } else if (sp1 || sp2) {
    return sp1 ? -1 : 1;
  }
  return 0;
}
var allowedOperators = [">", ">=", "=", "<", "<="];
var operatorResMap = {
  ">": [1],
  ">=": [0, 1],
  "=": [0],
  "<=": [-1, 0],
  "<": [-1]
};
function validateOperator(op) {
  if (typeof op !== "string") {
    throw new TypeError(
      "Invalid operator type, expected string but got " + typeof op
    );
  }
  if (allowedOperators.indexOf(op) === -1) {
    throw new TypeError(
      "Invalid operator, expected one of " + allowedOperators.join("|")
    );
  }
}
compareVersions.validate = function(version) {
  return typeof version === "string" && semver.test(version);
};
compareVersions.compare = function(v1, v2, operator) {
  validateOperator(operator);
  var res = compareVersions(v1, v2);
  return operatorResMap[operator].indexOf(res) > -1;
};
var compareVersions_default = compareVersions;

// ../../vscode/src/ui/dialogs.ts
var buttons = {
  settings: "Open settings",
  dashboard: "Go to Dashboard"
};
async function openDialog(message, actions) {
  return window2.showErrorMessage(message, ...Object.keys(actions)).then(async (value) => {
    await actions[value ?? ""]?.();
  });
}
function openDeviceLimitDialog() {
  openDialog("Device Limit reached. You can edit your api key or visit dependi.io dashboard to manage devices.", {
    [buttons.settings]: () => commands.executeCommand("workbench.action.openSettingsJson", { revealSetting: { key: DEPENDI + "apiKey" /* INDEX_SERVER_API_KEY */, edit: true } }),
    [buttons.dashboard]: () => commands.executeCommand("vscode.open", `${Settings.api.proPanelURL}/api-key-management`)
  });
}
function openPaymentRequiredDialog() {
  openDialog("Payment required. Please visit dependi.io dashboard to update your payment method.", {
    [buttons.dashboard]: () => commands.executeCommand("vscode.open", `${Settings.api.proPanelURL}/payments`)
  });
}
function openSettingsDialog(key, message) {
  openDialog(message, {
    "Open settings": () => commands.executeCommand("workbench.action.openSettingsJson", { revealSetting: { key: DEPENDI + key, edit: true } })
  });
}

// ../../vscode/src/core/listeners/listener.ts
var import_node_cache2 = __toESM(require_node_cache2());

// ../../vscode/src/commands/replacers/index.ts
var status = {
  inProgress: false,
  updateAllData: []
};

// ../../vscode/src/ui/decoration.ts
var import_semver2 = __toESM(require_semver2());

// ../../vscode/src/core/cargoUtils.ts
function isPinnedCargoVersion(version) {
  return !!version?.trimStart().startsWith("=");
}

// ../../vscode/src/semver/semverUtils.ts
var import_semver = __toESM(require_semver2());
function checkVersion(version = "0.0.0", versions12, lockedAt) {
  let v = versionToSemver(version, true);
  const semverVersions = versions12.map((v2) => versionToSemver(v2));
  const versionMap = mapVersions(versions12, semverVersions);
  v = ensureCaretPrefix(v);
  const max = semverVersions[0];
  if (lockedAt) {
    const result = checkLockedVersion(lockedAt, v, semverVersions);
    if (result) return result;
  }
  if (treatAsUpToDate()) {
    if (max) {
      const minV = (0, import_semver.minVersion)(v)?.toString() ?? "0.0.0";
      if ((0, import_semver.gt)(minV, max)) {
        return [true, false, version];
      }
    }
  }
  let shouldPatchBeChecked = false;
  switch (CurrentLanguage) {
    case 1 /* Rust */:
      shouldPatchBeChecked = Settings.rust.informPatchUpdates;
      break;
    case 3 /* JS */:
      shouldPatchBeChecked = Settings.npm.informPatchUpdates;
      break;
    case 5 /* PHP */:
      shouldPatchBeChecked = Settings.php.informPatchUpdates;
      break;
    case 2 /* Golang */:
      shouldPatchBeChecked = Settings.go.informPatchUpdates;
      break;
    case 4 /* Python */:
      shouldPatchBeChecked = Settings.python.informPatchUpdates;
      break;
    case 6 /* Dart */:
      shouldPatchBeChecked = Settings.dart.informPatchUpdates;
      break;
    case 7 /* CSharp */:
      shouldPatchBeChecked = Settings.csharp.informPatchUpdates;
      break;
    case 9 /* Elixir */:
      shouldPatchBeChecked = Settings.elixir.informPatchUpdates;
      break;
    case 10 /* Gradle */:
      shouldPatchBeChecked = Settings.gradle.informPatchUpdates;
      break;
  }
  const pathUpdated = shouldPatchBeChecked ? (0, import_semver.compare)(max, (0, import_semver.minVersion)(v) ?? "0.0.0") === 1 : false;
  const maxSatisfyingVersion = (0, import_semver.maxSatisfying)(semverVersions, v);
  if (maxSatisfyingVersion && CurrentLanguage === 4 /* Python */) {
    return [(0, import_semver.satisfies)(max, v), pathUpdated, versionMap[maxSatisfyingVersion]];
  }
  return [(0, import_semver.satisfies)(max, v), pathUpdated, maxSatisfyingVersion];
}
function mapVersions(versions12, semverVersions) {
  if (CurrentLanguage !== 4 /* Python */) return {};
  return versions12.reduce((acc, version, index) => {
    acc[semverVersions[index]] = version;
    return acc;
  }, {});
}
function ensureCaretPrefix(version) {
  const prefix = version.charCodeAt(0);
  return prefix > 47 && prefix < 58 ? `^${version}` : version;
}
function checkLockedVersion(lockedAt, version, semverVersions) {
  const semverLockedAt = versionToSemver(lockedAt);
  if (!(0, import_semver.satisfies)(semverLockedAt, version, { includePrerelease: true })) {
    return [false, false, lockedAt];
  }
  return [semverLockedAt === semverVersions[0], false, lockedAt];
}
function versionToSemver(version, isCurrentVersion) {
  if (CurrentLanguage === 4 /* Python */) {
    return convertPythonVersionToSemver(version);
  }
  if (CurrentLanguage === 9 /* Elixir */) {
    return convertElixirVersionToSemver(version);
  }
  return normalizeVersion(version, isCurrentVersion);
}
function normalizeVersion(version, isCurrentVersion) {
  let operator = "";
  let vPrefix = "";
  let versionPart = version;
  const operatorMatch = version.match(/^(\^|~|>=?|<=?|=)?(v|V)?/);
  if (operatorMatch && operatorMatch[0]) {
    operator = operatorMatch[1] || "";
    vPrefix = operatorMatch[2] || "";
    versionPart = version.slice(operatorMatch[0].length).trim();
  } else if (isCurrentVersion) {
    const prefix = version.charCodeAt(0);
    if (prefix < 47 || prefix > 58) {
      return version;
    }
  }
  let dotCount = 0;
  for (let i = 0; i < versionPart.length; i++) {
    if (versionPart[i] === ".") {
      dotCount++;
      if (dotCount > 1) {
        return operator + vPrefix + versionPart;
      }
    }
  }
  let normalized = versionPart;
  if (!versionPart.includes(".")) {
    normalized = `${versionPart}.0.0`;
  } else if (versionPart.split(".").length === 2) {
    normalized = `${versionPart}.0`;
  }
  return operator + vPrefix + normalized;
}
function convertPythonVersion(version) {
  return version.replace(/\.dev(\d+)/, "-dev.$1").replace(/\.post(\d+)/, "-post.$1").replace(/\.a(\d+)/, "-alpha.$1").replace(/\.b(\d+)/, "-beta.$1").replace(/\.rc(\d+)/, "-rc.$1").replace(/a(\d+)/, "-alpha.$1").replace(/b(\d+)/, "-beta.$1").replace(/rc(\d+)/, "-rc.$1").replace(/c(\d+)/, "-c.$1");
}
function convertPythonVersionToSemver(version) {
  let operator = "";
  let vPrefix = "";
  let versionPart = version;
  const operatorMatch = version.match(/^(==|>=|<=|~=|!=|\^|~|>|<|=)?(v|V)?/);
  if (operatorMatch && operatorMatch[0]) {
    operator = operatorMatch[1] || "";
    vPrefix = operatorMatch[2] || "";
    versionPart = version.slice(operatorMatch[0].length).trim();
  }
  if (operator === "==") {
    operator = "=";
  }
  const v = convertPythonVersion(versionPart);
  const pattern = /^(\d+)\.(\d+)(?:\.(\d+))?([-a-zA-Z0-9.]+)?$/;
  const match = v.match(pattern);
  if (match) {
    const major = match[1];
    const minor = match[2];
    const patch = match[3] || 0;
    const preRelease = match[4] ? `-${match[4].slice(1)}` : "";
    const normalizedVersion = `${major}.${minor}.${patch}${preRelease}`;
    return operator + vPrefix + normalizedVersion;
  } else {
    return operator + vPrefix + v;
  }
}
function treatAsUpToDate() {
  switch (CurrentLanguage) {
    case 1 /* Rust */:
      return Settings.rust.silenceVersionOverflows;
    case 3 /* JS */:
      return Settings.npm.silenceVersionOverflows;
    case 5 /* PHP */:
      return Settings.php.silenceVersionOverflows;
    case 2 /* Golang */:
      return Settings.go.silenceVersionOverflows;
    case 4 /* Python */:
      return Settings.python.silenceVersionOverflows;
    case 6 /* Dart */:
      return Settings.dart.silenceVersionOverflows;
    case 7 /* CSharp */:
      return Settings.csharp.silenceVersionOverflows;
    case 9 /* Elixir */:
      return Settings.elixir.silenceVersionOverflows;
    case 10 /* Gradle */:
      return Settings.gradle.silenceVersionOverflows;
  }
  return false;
}
function convertElixirVersionToSemver(version) {
  const constraints = version.split(/\s+or\s+/i).map((part) => part.trim());
  if (constraints.length > 1) {
    return constraints.map((constraint) => convertSingleElixirVersion(constraint)).join(" || ");
  }
  return convertSingleElixirVersion(version);
}
function convertSingleElixirVersion(version) {
  const trimmed = normalizeElixirRequirement(version);
  const tildeMatch = trimmed.match(/^~>\s*(\d+(?:\.\d+)*)/);
  if (tildeMatch) {
    const parts = tildeMatch[1].split(".").map((part) => parseInt(part, 10) || 0);
    const lowerParts = [...parts];
    while (lowerParts.length < 3) {
      lowerParts.push(0);
    }
    const upperParts = [...parts];
    const incrementIndex = parts.length >= 3 ? 1 : 0;
    upperParts[incrementIndex] = (upperParts[incrementIndex] || 0) + 1;
    for (let i = incrementIndex + 1; i < upperParts.length; i++) {
      upperParts[i] = 0;
    }
    while (upperParts.length < 3) {
      upperParts.push(0);
    }
    return `>=${lowerParts.slice(0, 3).join(".")} <${upperParts.slice(0, 3).join(".")}`;
  }
  const gteMatch = trimmed.match(/^>=\s*(.+)/);
  if (gteMatch) {
    return `>=${normalizeVersion(gteMatch[1].trim())}`;
  }
  const gtMatch = trimmed.match(/^>\s*(.+)/);
  if (gtMatch) {
    return `>${normalizeVersion(gtMatch[1].trim())}`;
  }
  const eqMatch = trimmed.match(/^==?\s*(.+)/);
  if (eqMatch) {
    return normalizeVersion(eqMatch[1].trim());
  }
  if (/^\d/.test(trimmed)) {
    return normalizeVersion(trimmed);
  }
  return trimmed;
}
function normalizeElixirRequirement(version) {
  return version.trim().replace(/^~(?=\d)/, "~> ");
}

// ../../vscode/src/ui/decoration.ts
function decoration(editor, item, versions12, decorationPreferences, lang, vuln, error) {
  let version = item.value?.replace(",", "");
  const pinnedCargoVersion = lang === 1 /* Rust */ && isPinnedCargoVersion(version);
  let [satisfies3, hasPatchUpdate, maxSatisfying2] = checkVersion(
    version,
    versions12,
    item.lockedAt
  );
  const formatError = (error2) => {
    const error_parts = error2.split("\n");
    const markdown = new MarkdownString("#### Errors ");
    markdown.appendMarkdown("\n");
    error_parts.filter((s) => s).forEach((part) => {
      markdown.appendMarkdown("* ");
      markdown.appendText(part.trim());
      markdown.appendMarkdown("\n");
    });
    return markdown;
  };
  let hoverMessage = new MarkdownString();
  const position = decorationPreferences.position;
  const renderOptions = {
    [position]: {
      contentText: ""
    }
  };
  let type = "COMP";
  if (error) {
    hoverMessage = formatError(error);
    type = "ERROR";
  } else {
    appendVulnerabilities(hoverMessage, vuln, version);
    hoverMessage.appendMarkdown("#### Versions");
    hoverMessage.appendMarkdown(getLinks(lang, item.key, item));
    hoverMessage.isTrusted = true;
    appendVersions(
      hoverMessage,
      versions12,
      item,
      maxSatisfying2 ?? "",
      vuln,
      decorationPreferences,
      lang,
      !pinnedCargoVersion
    );
    if (version == "?") {
      const version2 = versions12[0];
      editor.edit((edit) => {
        edit.replace(item.range, version2.slice(1, version2.length - 2));
      });
      editor.document.save();
    }
    if (!(0, import_semver2.validRange)(
      CurrentLanguage === 4 /* Python */ ? convertPythonVersionToSemver(version) : CurrentLanguage === 9 /* Elixir */ ? convertElixirVersionToSemver(version) : version
    )) {
      type = "ERROR";
    } else if (versions12[0] !== maxSatisfying2) {
      type = satisfies3 ? "COMP" : "INCOMP";
    }
    if (hasPatchUpdate && type === "COMP") {
      type = "PATCH";
    }
  }
  const contentText = getContentText(decorationPreferences, type);
  renderOptions[position].contentText = contentText.replace(
    "${version}",
    versions12[0]
  );
  const vulnerabilities = vuln?.get(item.lockedAt ?? version);
  if (vulnerabilities && vulnerabilities.length > 0) {
    const vulnText = decorationPreferences.vulnText.replace(
      "${count}",
      `${vulnerabilities?.length}`
    );
    renderOptions[position].contentText = renderOptions[position].contentText + "	" + vulnText;
  }
  if (isLocal(version)) {
    renderOptions[position].contentText = "";
  }
  const deco = {
    range: position == "after" ? item.decoRange : new Range(item.line, 0, item.line, item.endOfLine),
    hoverMessage,
    renderOptions
  };
  return [deco, type];
}
function isLocal(version) {
  if (!version) return false;
  return version.startsWith("file:") || version.startsWith("path:") || version.startsWith("link:") || version.startsWith("git:") || version.startsWith("git+") || version.startsWith("github:") || version.startsWith("workspace:") || version.startsWith("ssh:") || version.startsWith("http:") || version.startsWith("https:");
}
function getContentText(decorationPreferences, type) {
  let contentText = decorationPreferences.compatibleText;
  switch (type) {
    case "PATCH":
      contentText = decorationPreferences.patchUpdateText;
      break;
    case "INCOMP":
      contentText = decorationPreferences.incompatibleText;
      break;
    case "ERROR":
      contentText = decorationPreferences.errorText;
      break;
  }
  return contentText;
}
function getLinks(lang, key, item) {
  const cleanKey = key.replace(/"/g, "");
  switch (lang) {
    case 1 /* Rust */:
      return ` _([View crate](https://crates.io/crates/${cleanKey}) | [Check reviews](https://web.crev.dev/rust-reviews/crate/${cleanKey}))_`;
    case 2 /* Golang */:
      return ` _([View module](https://pkg.go.dev/${cleanKey}) | [Check docs](https://pkg.go.dev/${cleanKey}#section-documentation))_`;
    case 3 /* JS */:
      if (item?.source === "jsr") {
        return ` _([View package](https://jsr.io/${cleanKey}))_`;
      }
      return ` _([View package](https://npmjs.com/package/${cleanKey}))_`;
    case 5 /* PHP */:
      return ` _([View package](https://packagist.org/packages/${cleanKey}))_`;
    case 4 /* Python */:
      return ` _([View package](https://pypi.org/project/${cleanKey}))_`;
    case 6 /* Dart */:
      return ` _([View package](https://pub.dev/packages/${cleanKey}))_`;
    case 7 /* CSharp */:
      return ` _([View package](https://www.nuget.org/packages/${cleanKey}))_`;
    case 9 /* Elixir */:
      return ` _([View package](https://hex.pm/packages/${cleanKey}))_`;
    case 10 /* Gradle */:
      if (item?.source === "gradle-wrapper" || cleanKey === "gradle") {
        return ` _([View releases](https://gradle.org/releases/))_`;
      }
      {
        const [group, artifact] = cleanKey.split(":");
        if (group && artifact) {
          return ` _([View artifact](https://central.sonatype.com/artifact/${group}/${artifact}))_`;
        }
      }
      return "";
    default:
      return "";
  }
}
function getDocsLink(lang, key, version, item) {
  switch (lang) {
    case 1 /* Rust */:
      return `[(docs)](https://docs.rs/crate/${key}/${version})`;
    case 2 /* Golang */:
      return `[(docs)](https://pkg.go.dev/${key}@${version}#section-documentation)`;
    case 3 /* JS */:
      if (item?.source === "jsr") {
        return `[(docs)](https://jsr.io/${key}/${version})`;
      }
      return `[(docs)](https://npmjs.com/package/${key}/v/${version})`;
    case 5 /* PHP */:
      return `[(docs)](https://packagist.org/packages/${key}#${version})`;
    case 4 /* Python */:
      return `[(docs)](https://pypi.org/project/${key}/${version})`;
    case 6 /* Dart */:
      return `[(docs)](https://pub.dev/packages/${key}/versions/${version})`;
    case 7 /* CSharp */:
      return `[(docs)](https://www.nuget.org/packages/${key}/${version})`;
    case 9 /* Elixir */:
      return `[(docs)](https://hexdocs.pm/${key}/${version})`;
    case 10 /* Gradle */:
      if (item?.source === "gradle-wrapper" || key === "gradle") {
        return `[(release notes)](https://docs.gradle.org/${version}/release-notes.html)`;
      }
      {
        const [group, artifact] = key.split(":");
        if (group && artifact) {
          return `[(docs)](https://central.sonatype.com/artifact/${group}/${artifact}/${version})`;
        }
      }
      return "";
    default:
      return "";
  }
}
function appendVulnerabilities(hoverMessage, vuln, version) {
  const v = vuln?.get(version);
  if (v?.length) {
    hoverMessage.appendMarkdown("#### Vulnerabilities (Current)");
    const vulnTexts = [];
    v?.forEach((v2) => {
      const tmp = ` - [${v2}](https://osv.dev/vulnerability/${v2}) 
`;
      vulnTexts.push(tmp);
    });
    hoverMessage.appendMarkdown("\n" + vulnTexts.join(""));
  }
}
function appendVersions(hoverMessage, versions12, item, maxSatisfying2, vuln, decorationPreferences, lang, allowVersionUpdates = true) {
  for (let i = 0; i < versions12.length; i++) {
    const version = versions12[i];
    const v = vuln?.get(version);
    const data = {
      key: item.key,
      version,
      startLine: item.range.start.line
    };
    const isCurrent = version === maxSatisfying2;
    const encoded = encodeURI(JSON.stringify(data));
    const docs = i === 0 || isCurrent ? " " + getDocsLink(lang, item.key, version, item) : "";
    const vulnText = v?.length ? decorationPreferences.vulnText.replace("${count}", `${v?.length}`) : "";
    const command2 = allowVersionUpdates ? `${isCurrent ? "**" : ""}[${version}](command:${Configs.REPLACE_VERSIONS}?${encoded})${docs}${isCurrent ? "**" : ""}  ${vulnText}` : `${isCurrent ? "**" : ""}${version}${docs}${isCurrent ? "**" : ""}  ${vulnText}`;
    hoverMessage.appendMarkdown("\n * ");
    hoverMessage.appendMarkdown(command2);
  }
}

// ../../vscode/src/ui/pref.ts
var cachedPref;
function getPref() {
  if (!cachedPref) {
    cachedPref = loadPref();
  }
  return cachedPref;
}
function loadPref() {
  const compText = Settings.decorator.compatible.template;
  const compCss = { ...Settings.decorator.compatible.css };
  const patchText = Settings.decorator.patchUpdate.template;
  const patchCss = { ...Settings.decorator.patchUpdate.css };
  const incompText = Settings.decorator.incompatible.template;
  const incompCss = { ...Settings.decorator.incompatible.css };
  const errorText = Settings.decorator.error.template;
  const errorCss = { ...Settings.decorator.error.css };
  const vulnText = Settings.decorator.vulnerability.template;
  const position = Settings.decorator.position;
  initializeCSS(compCss, position, compText);
  initializeCSS(incompCss, position, incompText);
  initializeCSS(errorCss, position, errorText);
  return {
    compatibleType: createType(compCss),
    patchUpdateType: createType(patchCss),
    incompatibleType: createType(incompCss),
    errorType: createType(errorCss),
    compatibleText: compText,
    patchUpdateText: patchText,
    incompatibleText: incompText,
    errorText,
    vulnText,
    position
  };
}
function initializeCSS(css, position, text) {
  if (css[position] == void 0 || css[position] == null) {
    css[position] = {
      margin: "0.5em"
    };
  }
  css[position].contentText = text;
}
function createType(options) {
  return window2.createTextEditorDecorationType(options);
}

// ../../vscode/src/ui/decorator.ts
function decorate(editor, dependencies, lang) {
  console.debug("Decorating", editor.document.fileName);
  const pref = getPref();
  const errors = [];
  const filtered = dependencies.filter((dep) => {
    if (dep.item.registry && dep.item.registry !== "crates-io" && (!dep.versions || dep.versions.length === 0)) {
      return false;
    }
    if (dep && !dep.error && dep.versions && dep.versions.length) {
      return dep;
    } else if (!dep.error) {
      dep.error = dep.item.key + ": No versions found";
    }
    errors.push(`${dep.error}`);
    return dep;
  });
  const compOptions = [];
  const inCompOptions = [];
  const errOptions = [];
  for (let i = filtered.length - 1; i > -1; i--) {
    const dependency = filtered[i];
    try {
      let deco = decoration(
        editor,
        dependency.item,
        dependency.versions || [],
        pref,
        lang,
        dependency.vulns,
        dependency.error
      );
      if (deco) {
        switch (deco[1]) {
          case "COMP":
            compOptions.push(deco[0]);
            break;
          case "PATCH":
            compOptions.push(deco[0]);
            break;
          case "INCOMP":
            inCompOptions.push(deco[0]);
            break;
          case "ERROR":
            errOptions.push(deco[0]);
            break;
        }
      }
    } catch (e) {
      console.error(e);
      Logger.appendLine(`Failed to build decorator (${dependency.item.value})`);
      errors.push(`Failed to build decorator (${dependency.item.value})`);
    }
  }
  editor.setDecorations(pref.compatibleType, compOptions);
  editor.setDecorations(pref.incompatibleType, inCompOptions);
  editor.setDecorations(pref.errorType, errOptions);
  if (errors.length) {
    StatusBar.setText(
      "Error",
      `Completed with errors ${errors.join("\n")}`,
      true
    );
  } else {
    StatusBar.setText("Info");
  }
}

// ../../vscode/src/core/Dependency.ts
var Dependency = class {
  constructor(item) {
    this.item = item;
  }
};

// ../../vscode/src/core/listeners/listener.ts
var DependencyCache = /* @__PURE__ */ new Map();
var Listener = class {
  constructor(fetcher, parser) {
    this.fetcher = fetcher;
    this.parser = parser;
  }
  parse(editor) {
    let items = this.parser.parse(editor.document);
    let dependencies = items.map((i) => new Dependency(i));
    let cache3 = DependencyCache.get(CurrentLanguage);
    if (!cache3) {
      cache3 = new import_node_cache2.default({
        stdTTL: 5 * 60,
        checkperiod: 5 * 30,
        useClones: false
      });
      DependencyCache.set(CurrentLanguage, cache3);
    }
    dependencies = dependencies.map((dep) => {
      let cached2 = cache3.get(
        dep.item.key + dep.item.range.start.line
      );
      if (cached2) {
        if (dep.item.value === "latest") {
          dep.item.value = cached2.item.latestVersion;
        }
        dep.item.latestVersion = cached2.item.latestVersion;
        cached2.item = dep.item;
      } else {
        cache3.set(dep.item.key + dep.item.range.start.line, dep);
      }
      return cached2 || dep;
    });
    dependencies.forEach((dep) => {
      dep.versions ? this.modifyDependecy(dep) : dep;
    });
    return dependencies;
  }
  async parseAndDecorate(editor) {
    try {
      let dependencies = this.parse(editor);
      const promises = [
        this.fetcher.versions(dependencies)
      ];
      if (Settings.vulnerability.enabled) {
        promises.push(this.fetcher.vulns(dependencies));
      }
      await Promise.all(promises);
      status.updateAllData = dependencies.map((d) => ({
        key: d.item.key,
        version: this.buildVersionWithPrefix(d),
        startLine: d.item.range.start.line
      }));
      decorate(editor, dependencies, CurrentLanguage);
      if (Settings.vulnerability.enabled) {
        this.fetcher.vulns(dependencies).then(() => {
          decorate(editor, dependencies, CurrentLanguage);
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  modifyDependecy(dep) {
  }
  buildVersionWithPrefix(dependency) {
    const latestVersion2 = dependency.versions?.[0] ?? "";
    const currentValue = dependency.item.value || "";
    if (currentValue === "*") {
      return "*";
    }
    const prefixMatch = currentValue.match(/^(\^|~|>=|<=|>|<|=)?(.+)$/);
    const prefix = prefixMatch ? prefixMatch[1] : "";
    let version = prefix;
    if (!version) {
      version = latestVersion2;
    } else {
      version = prefix + latestVersion2;
    }
    return version;
  }
};

// ../../vscode/src/core/fetchers/fetcher.ts
var Fetcher = class {
  constructor(url, urlKey) {
    this.vulnsEnvironment = "";
    if (!url) {
      openSettingsDialog(urlKey, "Please set the URL for the fetcher");
      return;
    }
  }
  async vulns(dependencies) {
    StatusBar.setText("Loading", "\u{1F440} Fetching vulnerabilities");
    const missingVulns = dependencies.filter(
      (dep) => !dep.vulns || dep.vulns?.size === 0
    );
    const chunkedArrays = chunkDataArray(missingVulns, 500);
    const promises = chunkedArrays.map(async (chunk) => {
      return queryMultiplePackageVulns(chunk, CurrentEnvironment);
    });
    const chunkPromise = await Promise.all(promises);
    const resp = chunkPromise.reduce((acc, curr) => acc.concat(curr), []);
    resp.forEach((dep) => {
      let cached2 = DependencyCache.get(CurrentLanguage)?.get(
        dep.item.key + dep.item.range.start.line
      );
      if (cached2) {
        console.log("cached vulns", dep.item.key, dep.vulns);
        cached2.vulns = dep.vulns;
      } else {
        console.log("new vulns", dep.item.key);
        DependencyCache.get(CurrentLanguage)?.set(dep.item.key + dep.item.range.start.line, dep);
      }
    });
    return resp;
  }
  async versions(dependencies) {
    const isFullFetch = dependencies.some(
      (dep) => dep.versions && dep.versions.length >= 0
    );
    let transformer = this.fetch(isFullFetch);
    const responses = dependencies.map((dep) => {
      let resp = DependencyCache.get(CurrentLanguage)?.get(
        dep.item.key + dep.item.range.start.line
      );
      if (!resp || !resp.versions) {
        if (resp && resp.error) {
          console.log("cached", dep.item.key);
          return Promise.resolve(resp);
        }
        console.log("fetching", dep.item.key, resp?.error);
        return transformer(dep);
      }
      console.log("cached", dep.item.key);
      return Promise.resolve(resp);
    });
    return Promise.all(responses);
  }
  isPreRelease(version) {
    return checkPreRelease(version);
  }
  checkUnstables(unstableFilter, version, currentVersion) {
    if (unstableFilter === 1 /* IncludeAlways */) return false;
    if (unstableFilter === 2 /* IncludeIfUnstable */ && this.isPreRelease(currentVersion)) return false;
    return this.isPreRelease(version);
  }
  /**
   * Apply the unstable-version setting, with two extra rules:
   * - If a package only publishes pre-releases, keep them (Issue #282).
   * - If the current version is already unstable, keep only pre-releases
   *   newer than the latest stable (older betas are noise).
   */
  filterVersions(versions12, currentVersion, unstableFilter) {
    const valid = versions12.filter((v) => v !== "" && v !== void 0);
    const filtered = valid.filter(
      (v) => !this.checkUnstables(unstableFilter, v, currentVersion ?? "")
    );
    if (filtered.length === 0) {
      return valid;
    }
    const isUnstable = (v) => this.checkUnstables(0 /* Exclude */, v, "");
    if (unstableFilter === 2 /* IncludeIfUnstable */ && currentVersion && isUnstable(currentVersion)) {
      const stables = filtered.filter((v) => !isUnstable(v));
      if (stables.length === 0) {
        return filtered;
      }
      const latestStable = [...stables].sort(compareVersions_default).pop();
      return filtered.filter((v) => {
        if (!isUnstable(v)) {
          return true;
        }
        try {
          return compareVersions_default(v, latestStable) > 0;
        } catch {
          return false;
        }
      });
    }
    return filtered;
  }
  filterAndSortVersions(versions12, currentVersion, unstableFilter) {
    return this.filterVersions(versions12, currentVersion, unstableFilter).sort(compareVersions_default).reverse();
  }
};
function chunkDataArray(data, chunkSize) {
  const chunkedData = [];
  let currentChunk = [];
  let currentChunkSize = 0;
  data.forEach((obj) => {
    const objSize = obj.versions?.length ?? 0;
    if (currentChunkSize + objSize <= chunkSize) {
      currentChunk.push(obj);
      currentChunkSize += objSize;
    } else {
      chunkedData.push(currentChunk);
      if (obj.versions && obj.versions.length > chunkSize) {
        obj.versions = obj.versions.slice(0, 1e3);
      }
      currentChunk = [obj];
      currentChunkSize = objSize;
    }
  });
  if (currentChunk.length > 0) {
    chunkedData.push(currentChunk);
  }
  return chunkedData;
}
function checkPreRelease(version) {
  version = version.toLowerCase();
  return version.indexOf("-alpha") !== -1 || version.indexOf("-beta") !== -1 || version.indexOf("-rc") !== -1 || version.indexOf("-snapshot") !== -1 || version.indexOf("-dev") !== -1 || version.indexOf("-preview") !== -1 || version.indexOf("-experimental") !== -1 || version.indexOf("-canary") !== -1 || version.indexOf("-pre") !== -1 || version.indexOf("-next") !== -1 || version.indexOf("-nightly") !== -1 || version.indexOf("-nullsafety") !== -1 || version.indexOf("-nnbd") !== -1;
}

// ../../vscode/src/core/fetchers/CratesFetcher.ts
var CratesFetcher = class extends Fetcher {
  fetch() {
    return this.fetchWithRegistries([]);
  }
  fetchWithRegistries(alternateRegistries) {
    const base = this;
    return function(dep) {
      const alternateRegistry = alternateRegistries.find((registry) => dep.item.registry == registry.name);
      const thisCrateRegistry = dep.item.registry !== void 0 ? alternateRegistry?.index : Settings.rust.index;
      const thisCrateToken = dep.item.registry !== void 0 ? alternateRegistry?.token : void 0;
      if (dep.item.registry && dep.item.registry !== "crates-io" && !alternateRegistry?.index) {
        return Promise.resolve(dep);
      }
      if (dep.versions && dep.versions.length > 0) {
        return Promise.resolve(dep);
      }
      return versions(dep.item.key, thisCrateRegistry, thisCrateToken).then((crate) => {
        dep.versions = base.filterAndSortVersions(
          crate.versions,
          dep.item.value,
          Settings.rust.unstableFilter
        );
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
  async versions(dependencies) {
    return super.versions(dependencies);
  }
  async fetchVersionsWithRegistries(dependencies, alternateRegistries) {
    const transformer = this.fetchWithRegistries(alternateRegistries);
    const responses = dependencies.map((dep) => {
      let resp = DependencyCache.get(CurrentLanguage)?.get(
        dep.item.key + dep.item.range.start.line
      );
      if (!resp || !resp.versions) {
        if (resp && resp.error) {
          return Promise.resolve(resp);
        }
        return transformer(dep);
      }
      return Promise.resolve(resp);
    });
    return Promise.all(responses);
  }
};

// ../../vscode/src/api/indexes/dependi/errors.ts
var Errors = /* @__PURE__ */ ((Errors2) => {
  Errors2["NULL"] = "Null";
  Errors2["UNDEFINED"] = "Undefined";
  Errors2["DLR"] = "Device Limit reached. You can edit your api key or visit dependi.io dashboard to manage devices.";
  Errors2["IVDID"] = "Invalid device ID";
  Errors2["PAYRQ"] = "Payment required. Please visit dependi.io dashboard to update your payment method.";
  Errors2["UNAUTH"] = "Unauthorized, please check your api key.";
  Errors2["IVAK"] = "Invalid api key or api key not found. Please check your api key.";
  Errors2["UINA"] = "User is not active. Please check emails from us or visit dependi.io dashboard.";
  return Errors2;
})(Errors || {});
function getError(error) {
  if (!error) {
    return "Null" /* NULL */;
  }
  const code = error.split(" - ")[0];
  return Errors[code] || error;
}

// ../../vscode/src/api/indexes/dependi/indexes.ts
async function getVersions(value, options) {
  const mappedVal = {
    Language: value.Language,
    Packages: value.Packages,
    IgnoreUnstables: value.IgnoreUnstables,
    VulnerabilityCheck: value.VulnerabilityCheck,
    GhsaCheck: value.GhsaCheck
  };
  return await request(`v1/indexes`, {
    method: "POST",
    body: JSON.stringify(mappedVal),
    ...options
  }).then((resp) => {
    if (resp.status !== 200) {
      switch (getError(resp.error)) {
        case "Device Limit reached. You can edit your api key or visit dependi.io dashboard to manage devices." /* DLR */:
          openDeviceLimitDialog();
          return [];
        case "Payment required. Please visit dependi.io dashboard to update your payment method." /* PAYRQ */:
          openPaymentRequiredDialog();
          return [];
        case "Unauthorized, please check your api key." /* UNAUTH */:
          openSettingsDialog("apiKey" /* INDEX_SERVER_API_KEY */, "Unauthorized, please check your api key.");
          return [];
        case "Invalid api key or api key not found. Please check your api key." /* IVAK */:
          openSettingsDialog("apiKey" /* INDEX_SERVER_API_KEY */, "Invalid api key or api key not found. Please check your api key.");
          return [];
        case "User is not active. Please check emails from us or visit dependi.io dashboard." /* UINA */:
          openSettingsDialog("apiKey" /* INDEX_SERVER_API_KEY */, "User is not active. Please check emails from us or visit dependi.io dashboard.");
        default:
          window2.showErrorMessage(getError(resp.error));
          return [];
      }
    }
    const versions12 = resp.body?.filter((o) => o?.Name);
    const versionsMap = new Map(
      versions12?.map((version) => [version.Name, version])
    );
    const deps = value.Dependencies.map(
      (dep) => {
        const matchingVersion = versionsMap.get(dep.item.key);
        dep.error = matchingVersion?.Error;
        if (matchingVersion && matchingVersion.Versions) {
          dep.versions = matchingVersion.Versions;
          dep.item.latestVersion = matchingVersion.LatestVersion;
          if (dep.item.value === "latest") {
            dep.item.value = dep.item.latestVersion;
          }
          if (matchingVersion.Vulns) {
            const vulnEntries = Object.entries(matchingVersion.Vulns);
            dep.vulns = new Map(vulnEntries);
          }
        }
        return dep;
      }
    );
    return deps;
  }).catch((err) => {
    console.error("Catch get versions", err);
    Logger.appendLine("Catch get versions: " + err);
    return [];
  });
}
var Indexes = {
  getVersions
};

// ../../vscode/src/core/Item.ts
var Item = class {
  constructor(item) {
    this.key = "";
    this.value = "";
    this.source = "";
    this.start = -1;
    this.end = -1;
    this.line = -1;
    this.endOfLine = -1;
    this.range = new Range(0, 0, 0, 0);
    this.decoRange = new Range(0, 0, 0, 0);
    if (item) {
      this.key = item.key;
      this.value = item.value;
      this.registry = item.registry;
      this.start = item.start;
      this.end = item.end;
      this.line = item.line;
      this.decoRange = item.decoRange;
    }
  }
  /**
   * Copy value, start,end ,line from
   */
  copyFrom(key, value, start, end, line, endOfLine, lockedAt, registry) {
    if (key) this.key = key;
    if (value) this.value = value;
    if (start) this.start = start;
    if (end) this.end = end;
    if (line) this.line = line;
    if (endOfLine) this.endOfLine = endOfLine;
    if (lockedAt) this.lockedAt = lockedAt;
    if (registry) this.registry = registry;
  }
  /**Create Range */
  createRange() {
    this.range = new Range(this.line, this.start, this.line, this.end);
  }
  /**Create Decoration Range */
  createDecoRange() {
    this.decoRange = new Range(
      this.line,
      this.start,
      this.line,
      this.endOfLine
    );
  }
  isValid() {
    return this.key.length > 0 && this.value?.length && this.start > -1 && this.end > -1 && (/\d/.test(this.value) || this.value === "*");
  }
};

// ../../vscode/src/core/parsers/utils.ts
function isGitConflictLine(line) {
  switch (line[0]) {
    case "<":
      return line.startsWith("<<<<<<<");
    case "=":
      return line.startsWith("=======");
    case ">":
      return line.startsWith(">>>>>>>");
    default:
      return false;
  }
}
function isQuote(ch) {
  return ch === '"' || ch === "'";
}
function isDisabledLine(line) {
  return line.includes("dependi:") && line.includes("disable-check");
}
function shouldIgnoreLine(line, pattern, commandChar) {
  if (line.isEmptyOrWhitespace) {
    return true;
  }
  let column = line.firstNonWhitespaceCharacterIndex;
  const firstChar = line.text[column];
  if (commandChar && commandChar.includes(firstChar)) {
    return true;
  }
  if (isDisabledLine(line.text)) {
    return true;
  }
  if (isGitConflictLine(line.text)) {
    return true;
  }
  if (isDisablePatternLine(line.text, pattern)) {
    return true;
  }
  return false;
}
function isDisablePatternLine(line, pattern) {
  if (!pattern || pattern.trim() === "") {
    return false;
  }
  line = line.trim();
  const patterns = pattern.split(",").map((p) => p.trim());
  for (const p of patterns) {
    if (p.startsWith("*") && p.endsWith("*")) {
      const trimmedPattern = p.slice(1, -1);
      if (line.includes(trimmedPattern)) {
        return true;
      }
    } else if (p.startsWith("*")) {
      const trimmedPattern = p.slice(1);
      if (line.endsWith(trimmedPattern)) {
        return true;
      }
    } else if (p.endsWith("*")) {
      const trimmedPattern = p.slice(0, -1);
      if (line.startsWith(trimmedPattern)) {
        return true;
      }
    }
  }
  return false;
}

// ../../vscode/src/core/parsers/PypiParser.ts
var State = class {
  constructor() {
    this.items = [];
    this.bypass = false;
  }
};
var PypiParser = class {
  parse(doc) {
    let state = new State();
    for (let row = 0; row < doc.lineCount; row++) {
      let line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.python.ignoreLinePattern, ["#", "-", "."])) {
        continue;
      }
      if (state.bypass || !line.text.includes("=")) {
        continue;
      }
      let item = parseDependencyLine(line);
      item.line = line.lineNumber;
      item.createRange();
      item.createDecoRange();
      state.items.push(item);
    }
    return state.items;
  }
};
function getEndOfName(line) {
  const specialCharacters = [">", "<", "~", "!", "="];
  for (let i = 0; i < line.text.length; i++) {
    if (specialCharacters.includes(line.text[i])) {
      return i;
    }
  }
  return -1;
}
function parseDependencyLine(line) {
  let endOfName = getEndOfName(line);
  let startOfVersion = endOfName;
  let endOfVersion = line.text.length;
  let name = line.text.substring(
    line.firstNonWhitespaceCharacterIndex,
    endOfName
  );
  let version = line.text.substring(startOfVersion, endOfVersion);
  if (version.startsWith("==") || version.startsWith(">=") || version.startsWith("<=") || version.startsWith("~=")) {
    startOfVersion += 2;
  } else if (version.startsWith(">") || version.startsWith("<") || version.startsWith("!")) {
    startOfVersion += 1;
  }
  version = version.trim().replace(/^(==|>=|<=|~=|>|<|!)\s+/, "$1");
  if (isQuote(name[0]) && isQuote(name[name.length - 1])) {
    name = name.substring(1, name.length - 1);
  }
  if (isQuote(version[0]) && isQuote(version[version.length - 1])) {
    version = version.substring(1, version.length - 1);
    startOfVersion++;
    endOfVersion--;
  }
  if (name.includes("[")) {
    name = name.split("[")[0];
  }
  const item = new Item();
  item.copyFrom(
    name.trim(),
    version,
    startOfVersion,
    endOfVersion,
    line.lineNumber,
    line.range.end.character
  );
  return item;
}
function isValid(version, constraint) {
  constraint = constraint.trim();
  if (constraint.startsWith("==")) {
    return version === constraint.slice(2).trim();
  } else if (constraint.startsWith("!")) {
    return version !== constraint.slice(1).trim();
  } else if (constraint.startsWith(">=")) {
    return compareVersions2(version, constraint.slice(2).trim()) >= 0;
  } else if (constraint.startsWith("<=")) {
    return compareVersions2(version, constraint.slice(2).trim()) <= 0;
  } else if (constraint.startsWith(">")) {
    return compareVersions2(version, constraint.slice(1).trim()) > 0;
  } else if (constraint.startsWith("<")) {
    return compareVersions2(version, constraint.slice(1).trim()) < 0;
  } else {
    return false;
  }
}
function compareVersions2(versionA, versionB) {
  const [vA, sA] = versionA.split(/[^\d.]/, 2);
  const [vB, sB] = versionB.split(/[^\d.]/, 2);
  const partsA = vA.split(".").map(Number);
  const partsB = vB.split(".").map(Number);
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const partA = partsA[i] || 0;
    const partB = partsB[i] || 0;
    if (partA < partB) return -1;
    if (partA > partB) return 1;
  }
  if (sA && sB) {
    return sA.localeCompare(sB);
  } else if (sA) {
    return 1;
  } else if (sB) {
    return -1;
  } else {
    return 0;
  }
}
function splitByComma(str) {
  let splitString;
  if (str.includes(";")) {
    splitString = str.split(";")[0].split(",").map((substr) => substr.trim());
  } else {
    splitString = str.split(",").map((substr) => substr.trim());
  }
  return splitString;
}
function possibleLatestVersion(constraints, versions12) {
  const exactVersionConstraint = constraints.find(
    (constraint) => constraint.trim().startsWith("==")
  );
  if (exactVersionConstraint) {
    if (constraints.some((constraint) => constraint.includes("*"))) {
      const majorVersion = constraints.find((constraint) => constraint.trim().startsWith("=="))?.slice(2).trim().split(".")[0];
      const filteredVersions = versions12.filter(
        (version) => version.startsWith(majorVersion || "")
      );
      return filteredVersions.length > 0 ? filteredVersions.reduce(
        (prev, curr) => compareVersions2(prev, curr) >= 0 ? prev : curr
      ) : null;
    }
    return `=${exactVersionConstraint.replace(/^==?\s*/, "").trim()}`;
  } else if (constraints.some((constraint) => constraint.includes("*"))) {
    let majorVersion = constraints.find((constraint) => constraint.trim().startsWith("=="))?.slice(2).trim().split(".")[0];
    if (majorVersion === void 0) {
      majorVersion = constraints.find((constraint) => constraint.includes("*"))?.split(".")[0]?.replace(/[^0-9*]/g, "");
    }
    const filteredVersions = versions12.filter(
      (version) => version.startsWith(majorVersion || "")
    );
    return filteredVersions.length > 0 ? filteredVersions.reduce(
      (prev, curr) => compareVersions2(prev, curr) >= 0 ? prev : curr
    ) : null;
  } else {
    const possibleVersions = versions12.filter(
      (version) => constraints.every((constraint) => isValid(version, constraint))
    );
    return possibleVersions.length > 0 ? possibleVersions.reduce(
      (prev, curr) => compareVersions2(prev, curr) >= 0 ? prev : curr
    ) : null;
  }
}

// ../../vscode/src/api/indexes/pypi.ts
var versions2 = (name) => {
  return new Promise(function(resolve, reject) {
    const url = getURL3(name);
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info;
      res.on("end", () => {
        try {
          const response = JSON.parse(Buffer.concat(body).toString());
          const filteredVersions = Object.keys(response.releases).filter(
            (version) => {
              const releaseInfo = response.releases[version];
              return releaseInfo.every(
                (entry) => !entry.yanked
              );
            }
          );
          info = {
            name,
            versions: filteredVersions
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};
function getURL3(name) {
  return cleanURL(`${Settings.python.index}/${name}/json`);
}

// ../../vscode/src/core/fetchers/PypiFetcher.ts
var PypiFetcher = class extends Fetcher {
  fetch() {
    const base = this;
    return async function(dep) {
      return versions2(dep.item.key).then((di) => {
        return base.mapVersions(di, dep);
      }).catch(fetcherCatch(dep));
    };
  }
  isPreRelease(version) {
    return isPythonPreRelease(version);
  }
  mapVersions(di, dep) {
    const versions12 = this.filterAndSortVersions(
      di.versions,
      dep.item.value,
      Settings.python.unstableFilter
    );
    if (!dep.item.lockedAt) {
      const constrains = splitByComma(dep.item.value ?? "");
      const currVersion = possibleLatestVersion(constrains, versions12);
      dep.item.value = currVersion ? currVersion : dep.item.value;
    }
    dep.versions = versions12;
    return dep;
  }
};
function isPythonPreRelease(version) {
  const aORb = /\..*a|b.*/;
  return version.indexOf(".alpha") !== -1 || version.indexOf(".beta") !== -1 || version.indexOf(".rc") !== -1 || version.indexOf(".SNAPSHOT") !== -1 || version.indexOf(".dev") !== -1 || version.indexOf(".preview") !== -1 || version.indexOf(".experimental") !== -1 || version.indexOf(".canary") !== -1 || version.indexOf(".pre") !== -1 || version.indexOf("rc") !== -1 || aORb.test(version);
}

// ../../vscode/src/core/fetchers/DependiFetcher.ts
var DependiFetcher = class extends Fetcher {
  isPreRelease(version) {
    if (CurrentLanguage === 4 /* Python */) {
      return isPythonPreRelease(version);
    }
    return super.isPreRelease(version);
  }
  async versions(dependencies) {
    let unstableFilter = 0 /* Exclude */;
    switch (CurrentLanguage) {
      case 4 /* Python */:
        unstableFilter = Settings.python.unstableFilter;
        break;
      case 3 /* JS */:
        unstableFilter = Settings.npm.unstableFilter;
        break;
      case 2 /* Golang */:
        unstableFilter = Settings.go.unstableFilter;
        break;
      case 5 /* PHP */:
        unstableFilter = Settings.php.unstableFilter;
        break;
      case 1 /* Rust */:
        unstableFilter = Settings.rust.unstableFilter;
        break;
      case 6 /* Dart */:
        unstableFilter = Settings.dart.unstableFilter;
        break;
      case 7 /* CSharp */:
        unstableFilter = Settings.csharp.unstableFilter;
        break;
      case 9 /* Elixir */:
        unstableFilter = Settings.elixir.unstableFilter;
        break;
      case 10 /* Gradle */:
        unstableFilter = Settings.gradle.unstableFilter;
        break;
      case 11 /* Terraform */:
        unstableFilter = Settings.terraform.unstableFilter;
        break;
    }
    const req = {
      Language: CurrentLanguage,
      Packages: dependencies.map((d) => d.item),
      Dependencies: dependencies,
      IgnoreUnstables: unstableFilter,
      VulnerabilityCheck: Settings.vulnerability.enabled,
      GhsaCheck: Settings.vulnerability.ghsa
    };
    if (Settings.api.deviceID === "") {
      console.error("DeviceID is empty");
      Logger.appendLine("DeviceID is empty");
    }
    const headers = {
      Authorization: Settings.api.key,
      "X-Device-ID": Settings.api.deviceID,
      "Content-Type": "application/json"
    };
    let versions12 = await Indexes.getVersions(req, { headers });
    if (unstableFilter === 0 /* Exclude */) {
      const missing = versions12.filter(
        (d) => !d.error && (!d.versions || d.versions.length === 0)
      );
      if (missing.length > 0) {
        const retry = await Indexes.getVersions(
          {
            ...req,
            IgnoreUnstables: 1 /* IncludeAlways */,
            Packages: missing.map((d) => d.item),
            Dependencies: missing
          },
          { headers }
        );
        const retryByKey = new Map(retry.map((d) => [d.item.key, d]));
        versions12 = versions12.map((d) => retryByKey.get(d.item.key) ?? d);
      }
    }
    versions12 = versions12.map((dep) => {
      if (dep.versions) {
        dep.versions = this.filterAndSortVersions(
          dep.versions,
          dep.item.value,
          unstableFilter
        );
        if (CurrentLanguage === 3 /* JS */ && dep.item.latestVersion && !dep.versions.includes(dep.item.latestVersion)) {
          dep.versions = [dep.item.latestVersion, ...dep.versions].sort(compareVersions_default).reverse();
        }
      }
      return dep;
    });
    if (CurrentLanguage === 4 /* Python */) {
      const mappedVersions = versions12.map((v) => {
        return this.mapVersions(v);
      });
      versions12 = mappedVersions;
    }
    return Promise.all(versions12);
  }
  async vulns(dependencies) {
    throw new Error("Method not implemented.");
  }
  mapVersions(dep, item) {
    if (!dep.versions) {
      return dep;
    }
    const versions12 = dep.versions.filter((i) => i !== "" && i !== void 0).sort(compareVersions_default).reverse();
    if (item) {
      if (!item.lockedAt) {
        const constrains = splitByComma(item.value ?? "");
        const currVersion = possibleLatestVersion(constrains, versions12);
        item.value = currVersion ? currVersion : item.value;
      }
      return {
        item,
        versions: versions12
      };
    }
    if (!dep.item.lockedAt) {
      const constrains = splitByComma(dep.item.value ?? "");
      const currVersion = possibleLatestVersion(constrains, versions12);
      dep.item.value = currVersion ? currVersion : dep.item.value;
    }
    dep.versions = versions12;
    return dep;
  }
  fetch(isLatest) {
    throw new Error("Method not implemented.");
  }
};

// ../../vscode/src/api/indexes/goproxy.ts
var versions3 = (name) => {
  return new Promise(function(resolve, reject) {
    const url = getURL4(name);
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info;
      res.on("end", () => {
        try {
          const bodyString = Buffer.concat(body).toString();
          const bodyArray = bodyString.split("\n");
          if (bodyArray.length === 1 && bodyArray[0] === "") {
            return latestVersion(name).then(resolve).catch(reject);
          }
          info = {
            name,
            versions: bodyArray
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};
var latestVersion = (name) => {
  return new Promise(function(resolve, reject) {
    const url = getLatestVersionURL(name);
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info;
      res.on("end", () => {
        try {
          const raw = body.toString();
          const json = JSON.parse(raw);
          if (json.Version === void 0) {
            return reject(
              new Error(`Invalid response from goproxy: ${raw} for ${url}`)
            );
          }
          info = {
            name,
            versions: [json.Version]
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};
function getURL4(name) {
  const lower_name = name.toLowerCase();
  const url = `${Settings.go.index}/${lower_name}/@v/list`;
  return cleanURL(url);
}
function getLatestVersionURL(name) {
  const lower_name = name.toLowerCase();
  const url = `${Settings.go.index}/${lower_name}/@latest`;
  return cleanURL(url);
}

// ../../vscode/src/core/fetchers/GoProxyFetcher.ts
var GoProxyFetcher = class extends Fetcher {
  fetch() {
    const base = this;
    return async function(dep) {
      return versions3(dep.item.key).then((mod) => {
        const versions12 = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.go.unstableFilter
        );
        dep.versions = versions12;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
};

// ../../vscode/src/api/indexes/hex.ts
var versions4 = (name) => {
  return new Promise(function(resolve, reject) {
    const url = getURL5(name);
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info;
      res.on("end", () => {
        try {
          const response = JSON.parse(Buffer.concat(body).toString());
          const releases = response.releases ?? [];
          const filteredVersions = releases.map((release) => release.version).filter((version) => version !== "" && version !== void 0);
          info = {
            name,
            versions: filteredVersions
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};
function getURL5(name) {
  return cleanURL(`${Settings.elixir.index}/api/packages/${name}`);
}

// ../../vscode/src/core/fetchers/HexFetcher.ts
var HexFetcher = class extends Fetcher {
  fetch() {
    const base = this;
    return async function(dep) {
      return versions4(dep.item.key).then((mod) => {
        const versions12 = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.elixir.unstableFilter
        );
        dep.versions = versions12;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
};

// ../../vscode/src/api/indexes/jsr.ts
var versions5 = (name, currentVersion) => {
  return new Promise(function(resolve, reject) {
    const url = getURL6(name);
    const options = getReqOptions(url);
    options.headers = {
      ...options.headers,
      "Accept": "application/json"
    };
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      var info;
      let body = addResponseHandlers(name, res, req, reject);
      res.on("end", () => {
        try {
          const response = JSON.parse(Buffer.concat(body).toString());
          let versions12 = [];
          let err = "";
          if (response.versions) {
            versions12 = Object.keys(response.versions).filter(
              (version) => !response.versions[version].yanked
            );
          }
          info = {
            name,
            versions: versions12,
            latestVersion: response.latest,
            error: err
          };
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};
function getURL6(name) {
  return `${Settings.npm.jsrIndex}/${name}/meta.json`;
}

// ../../vscode/src/core/fetchers/JsrFetcher.ts
var JsrFetcher = class extends Fetcher {
  fetch(isLatest) {
    const base = this;
    return async function(dep) {
      const checkVersion2 = versions5(dep.item.key, dep.item.value);
      return checkVersion2.then((mod) => {
        const versions12 = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.npm.unstableFilter
        );
        dep.versions = versions12;
        dep.item.latestVersion = mod.latestVersion;
        dep.item.value = dep.item.value === "latest" ? mod.latestVersion : dep.item.value;
        dep.error = mod.error;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
};

// ../../vscode/node_modules/fast-xml-parser/src/util.js
var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
var regexName = new RegExp("^" + nameRegexp + "$");
function getAllMatches(string, regex) {
  const matches = [];
  let match = regex.exec(string);
  while (match) {
    const allmatches = [];
    allmatches.startIndex = regex.lastIndex - match[0].length;
    const len = match.length;
    for (let index = 0; index < len; index++) {
      allmatches.push(match[index]);
    }
    matches.push(allmatches);
    match = regex.exec(string);
  }
  return matches;
}
var isName = function(string) {
  const match = regexName.exec(string);
  return !(match === null || typeof match === "undefined");
};
function isExist(v) {
  return typeof v !== "undefined";
}
var DANGEROUS_PROPERTY_NAMES = [
  // '__proto__',
  // 'constructor',
  // 'prototype',
  "hasOwnProperty",
  "toString",
  "valueOf",
  "__defineGetter__",
  "__defineSetter__",
  "__lookupGetter__",
  "__lookupSetter__"
];
var criticalProperties = ["__proto__", "constructor", "prototype"];

// ../../vscode/node_modules/fast-xml-parser/src/validator.js
var defaultOptions = {
  allowBooleanAttributes: false,
  //A tag can have attributes without any value
  unpairedTags: []
};
function validate2(xmlData, options) {
  options = Object.assign({}, defaultOptions, options);
  const tags = [];
  let tagFound = false;
  let reachedRoot = false;
  if (xmlData[0] === "\uFEFF") {
    xmlData = xmlData.substr(1);
  }
  for (let i = 0; i < xmlData.length; i++) {
    if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
      i += 2;
      i = readPI(xmlData, i);
      if (i.err) return i;
    } else if (xmlData[i] === "<") {
      let tagStartPos = i;
      i++;
      if (xmlData[i] === "!") {
        i = readCommentAndCDATA(xmlData, i);
        continue;
      } else {
        let closingTag = false;
        if (xmlData[i] === "/") {
          closingTag = true;
          i++;
        }
        let tagName = "";
        for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
          tagName += xmlData[i];
        }
        tagName = tagName.trim();
        if (tagName[tagName.length - 1] === "/") {
          tagName = tagName.substring(0, tagName.length - 1);
          i--;
        }
        if (!validateTagName(tagName)) {
          let msg;
          if (tagName.trim().length === 0) {
            msg = "Invalid space after '<'.";
          } else {
            msg = "Tag '" + tagName + "' is an invalid name.";
          }
          return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
        }
        const result = readAttributeStr(xmlData, i);
        if (result === false) {
          return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
        }
        let attrStr = result.value;
        i = result.index;
        if (attrStr[attrStr.length - 1] === "/") {
          const attrStrStart = i - attrStr.length;
          attrStr = attrStr.substring(0, attrStr.length - 1);
          const isValid2 = validateAttributeString(attrStr, options);
          if (isValid2 === true) {
            tagFound = true;
          } else {
            return getErrorObject(isValid2.err.code, isValid2.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid2.err.line));
          }
        } else if (closingTag) {
          if (!result.tagClosed) {
            return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
          } else if (attrStr.trim().length > 0) {
            return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
          } else if (tags.length === 0) {
            return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
          } else {
            const otg = tags.pop();
            if (tagName !== otg.tagName) {
              let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
              return getErrorObject(
                "InvalidTag",
                "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.",
                getLineNumberForPosition(xmlData, tagStartPos)
              );
            }
            if (tags.length == 0) {
              reachedRoot = true;
            }
          }
        } else {
          const isValid2 = validateAttributeString(attrStr, options);
          if (isValid2 !== true) {
            return getErrorObject(isValid2.err.code, isValid2.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid2.err.line));
          }
          if (reachedRoot === true) {
            return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
          } else if (options.unpairedTags.indexOf(tagName) !== -1) {
          } else {
            tags.push({ tagName, tagStartPos });
          }
          tagFound = true;
        }
        for (i++; i < xmlData.length; i++) {
          if (xmlData[i] === "<") {
            if (xmlData[i + 1] === "!") {
              i++;
              i = readCommentAndCDATA(xmlData, i);
              continue;
            } else if (xmlData[i + 1] === "?") {
              i = readPI(xmlData, ++i);
              if (i.err) return i;
            } else {
              break;
            }
          } else if (xmlData[i] === "&") {
            const afterAmp = validateAmpersand(xmlData, i);
            if (afterAmp == -1)
              return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
            i = afterAmp;
          } else {
            if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
              return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
            }
          }
        }
        if (xmlData[i] === "<") {
          i--;
        }
      }
    } else {
      if (isWhiteSpace(xmlData[i])) {
        continue;
      }
      return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
    }
  }
  if (!tagFound) {
    return getErrorObject("InvalidXml", "Start tag expected.", 1);
  } else if (tags.length == 1) {
    return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
  } else if (tags.length > 0) {
    return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
  }
  return true;
}
function isWhiteSpace(char) {
  return char === " " || char === "	" || char === "\n" || char === "\r";
}
function readPI(xmlData, i) {
  const start = i;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] == "?" || xmlData[i] == " ") {
      const tagname = xmlData.substr(start, i - start);
      if (i > 5 && tagname === "xml") {
        return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
      } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
        i++;
        break;
      } else {
        continue;
      }
    }
  }
  return i;
}
function readCommentAndCDATA(xmlData, i) {
  if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
    for (i += 3; i < xmlData.length; i++) {
      if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
        i += 2;
        break;
      }
    }
  } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
    let angleBracketsCount = 1;
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === "<") {
        angleBracketsCount++;
      } else if (xmlData[i] === ">") {
        angleBracketsCount--;
        if (angleBracketsCount === 0) {
          break;
        }
      }
    }
  } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
        i += 2;
        break;
      }
    }
  }
  return i;
}
var doubleQuote = '"';
var singleQuote = "'";
function readAttributeStr(xmlData, i) {
  let attrStr = "";
  let startChar = "";
  let tagClosed = false;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
      if (startChar === "") {
        startChar = xmlData[i];
      } else if (startChar !== xmlData[i]) {
      } else {
        startChar = "";
      }
    } else if (xmlData[i] === ">") {
      if (startChar === "") {
        tagClosed = true;
        break;
      }
    }
    attrStr += xmlData[i];
  }
  if (startChar !== "") {
    return false;
  }
  return {
    value: attrStr,
    index: i,
    tagClosed
  };
}
var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
function validateAttributeString(attrStr, options) {
  const matches = getAllMatches(attrStr, validAttrStrRegxp);
  const attrNames = {};
  for (let i = 0; i < matches.length; i++) {
    if (matches[i][1].length === 0) {
      return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
    } else if (matches[i][3] !== void 0 && matches[i][4] === void 0) {
      return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
    } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
      return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
    }
    const attrName = matches[i][2];
    if (!validateAttrName(attrName)) {
      return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
    }
    if (!Object.prototype.hasOwnProperty.call(attrNames, attrName)) {
      attrNames[attrName] = 1;
    } else {
      return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
    }
  }
  return true;
}
function validateNumberAmpersand(xmlData, i) {
  let re = /\d/;
  if (xmlData[i] === "x") {
    i++;
    re = /[\da-fA-F]/;
  }
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === ";")
      return i;
    if (!xmlData[i].match(re))
      break;
  }
  return -1;
}
function validateAmpersand(xmlData, i) {
  i++;
  if (xmlData[i] === ";")
    return -1;
  if (xmlData[i] === "#") {
    i++;
    return validateNumberAmpersand(xmlData, i);
  }
  let count = 0;
  for (; i < xmlData.length; i++, count++) {
    if (xmlData[i].match(/\w/) && count < 20)
      continue;
    if (xmlData[i] === ";")
      break;
    return -1;
  }
  return i;
}
function getErrorObject(code, message, lineNumber) {
  return {
    err: {
      code,
      msg: message,
      line: lineNumber.line || lineNumber,
      col: lineNumber.col
    }
  };
}
function validateAttrName(attrName) {
  return isName(attrName);
}
function validateTagName(tagname) {
  return isName(tagname);
}
function getLineNumberForPosition(xmlData, index) {
  const lines = xmlData.substring(0, index).split(/\r?\n/);
  return {
    line: lines.length,
    // column number is last line's length + 1, because column numbering starts at 1:
    col: lines[lines.length - 1].length + 1
  };
}
function getPositionFromMatch(match) {
  return match.startIndex + match[1].length;
}

// ../../vscode/node_modules/@nodable/entities/src/entities.js
var CURRENCY = {
  cent: "\xA2",
  pound: "\xA3",
  curren: "\xA4",
  yen: "\xA5",
  euro: "\u20AC",
  dollar: "$",
  fnof: "\u0192",
  inr: "\u20B9",
  af: "\u060B",
  birr: "\u1265\u122D",
  peso: "\u20B1",
  rub: "\u20BD",
  won: "\u20A9",
  yuan: "\xA5",
  cedil: "\xB8"
};
var XML = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  quot: '"'
};
var COMMON_HTML = {
  nbsp: "\xA0",
  copy: "\xA9",
  reg: "\xAE",
  trade: "\u2122",
  mdash: "\u2014",
  ndash: "\u2013",
  hellip: "\u2026",
  laquo: "\xAB",
  raquo: "\xBB",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bull: "\u2022",
  para: "\xB6",
  sect: "\xA7",
  deg: "\xB0",
  frac12: "\xBD",
  frac14: "\xBC",
  frac34: "\xBE"
};

// ../../vscode/node_modules/@nodable/entities/src/EntityDecoder.js
var ENTITY_ACTION = Object.freeze({
  /** Resolve and expand the entity normally. */
  ALLOW: "allow",
  /** Silently skip this entity — it will not be registered. */
  BLOCK: "block",
  /** Throw an error, aborting entity registration entirely. */
  THROW: "throw"
});
var SPECIAL_CHARS = new Set("!?\\\\/[]$%{}^&*()<>|+");
function validateEntityName(name) {
  if (name[0] === "#") {
    throw new Error(`[EntityReplacer] Invalid character '#' in entity name: "${name}"`);
  }
  for (const ch of name) {
    if (SPECIAL_CHARS.has(ch)) {
      throw new Error(`[EntityReplacer] Invalid character '${ch}' in entity name: "${name}"`);
    }
  }
  return name;
}
function mergeEntityMaps(...maps) {
  const out = /* @__PURE__ */ Object.create(null);
  for (const map of maps) {
    if (!map) continue;
    for (const key of Object.keys(map)) {
      const raw = map[key];
      if (typeof raw === "string") {
        out[key] = raw;
      } else if (raw && typeof raw === "object" && raw.val !== void 0) {
        const val = raw.val;
        if (typeof val === "string") {
          out[key] = val;
        }
      }
    }
  }
  return out;
}
var LIMIT_TIER_EXTERNAL = "external";
var LIMIT_TIER_BASE = "base";
var LIMIT_TIER_ALL = "all";
function parseLimitTiers(raw) {
  if (!raw || raw === LIMIT_TIER_EXTERNAL) return /* @__PURE__ */ new Set([LIMIT_TIER_EXTERNAL]);
  if (raw === LIMIT_TIER_ALL) return /* @__PURE__ */ new Set([LIMIT_TIER_ALL]);
  if (raw === LIMIT_TIER_BASE) return /* @__PURE__ */ new Set([LIMIT_TIER_BASE]);
  if (Array.isArray(raw)) return new Set(raw);
  return /* @__PURE__ */ new Set([LIMIT_TIER_EXTERNAL]);
}
var NCR_LEVEL = Object.freeze({ allow: 0, leave: 1, remove: 2, throw: 3 });
var XML10_ALLOWED_C0 = /* @__PURE__ */ new Set([9, 10, 13]);
function parseNCRConfig(ncr) {
  if (!ncr) {
    return { xmlVersion: 1, onLevel: NCR_LEVEL.allow, nullLevel: NCR_LEVEL.remove };
  }
  const xmlVersion = ncr.xmlVersion === 1.1 ? 1.1 : 1;
  const onLevel = NCR_LEVEL[ncr.onNCR] ?? NCR_LEVEL.allow;
  const nullLevel = NCR_LEVEL[ncr.nullNCR] ?? NCR_LEVEL.remove;
  const clampedNull = Math.max(nullLevel, NCR_LEVEL.remove);
  return { xmlVersion, onLevel, nullLevel: clampedNull };
}
var EntityDecoder = class {
  /**
   * @param {object} [options]
   * @param {object|null}  [options.namedEntities]        — extra named entities merged into base map
   * @param {object}  [options.limit]                 — security limits
   * @param {number}       [options.limit.maxTotalExpansions=0]  — 0 = unlimited
   * @param {number}       [options.limit.maxExpandedLength=0]   — 0 = unlimited
   * @param {'external'|'base'|'all'|string[]} [options.limit.applyLimitsTo='external']
   *   Which entity tiers count against the security limits:
   *   - 'external' (default) — only input/runtime + persistent external entities
   *   - 'base'               — only DEFAULT_XML_ENTITIES + namedEntities
   *   - 'all'                — every entity regardless of tier
   *   - string[]             — explicit combination, e.g. ['external', 'base']
   * @param {((resolved: string, original: string) => string)|null} [options.postCheck=null]
   * @param {string[]} [options.remove=[]] — entity names (e.g. ['nbsp', '#13']) to delete (replace with empty string)
   * @param {string[]} [options.leave=[]]  — entity names to keep as literal (unchanged in output)
   * @param {object}   [options.ncr]       — Numeric Character Reference controls
   * @param {1.0|1.1}  [options.ncr.xmlVersion=1.0]
   *   XML version governing which codepoint ranges are restricted:
   *   - 1.0 — C0 controls U+0001–U+001F (except U+0009/000A/000D) are prohibited
   *   - 1.1 — C0 controls are allowed when written as NCRs; C1 (U+007F–U+009F) decoded as-is
   * @param {'allow'|'leave'|'remove'|'throw'} [options.ncr.onNCR='allow']
   *   Base action for numeric references. Severity order: allow < leave < remove < throw.
   *   For codepoint ranges that carry a minimum level (surrogates → remove, XML 1.0 C0 → remove),
   *   the effective action is max(onNCR, rangeMinimum).
   * @param {'remove'|'throw'} [options.ncr.nullNCR='remove']
   *   Action for U+0000 (null). 'allow' and 'leave' are clamped to 'remove' since null is never safe.
   * @param {((name: string, value: string) => 'allow'|'block'|'throw')|null} [options.onExternalEntity=null]
   *   Hook called when an external entity is registered via `setExternalEntities()` or
   *   `addExternalEntity()`. Return `ENTITY_ACTION.ALLOW` to accept the entity,
   *   `ENTITY_ACTION.BLOCK` to silently skip it, or `ENTITY_ACTION.THROW` to abort with an error.
   * @param {((name: string, value: string) => 'allow'|'block'|'throw')|null} [options.onInputEntity=null]
   *   Hook called when an input entity is registered via `addInputEntities()`. Return
   *   `ENTITY_ACTION.ALLOW` to accept, `ENTITY_ACTION.BLOCK` to silently skip, or
   *   `ENTITY_ACTION.THROW` to abort with an error.
   */
  constructor(options = {}) {
    this._limit = options.limit || {};
    this._maxTotalExpansions = this._limit.maxTotalExpansions || 0;
    this._maxExpandedLength = this._limit.maxExpandedLength || 0;
    this._postCheck = typeof options.postCheck === "function" ? options.postCheck : (r) => r;
    this._limitTiers = parseLimitTiers(this._limit.applyLimitsTo ?? LIMIT_TIER_EXTERNAL);
    this._numericAllowed = options.numericAllowed ?? true;
    this._baseMap = mergeEntityMaps(XML, options.namedEntities || null);
    this._externalMap = /* @__PURE__ */ Object.create(null);
    this._inputMap = /* @__PURE__ */ Object.create(null);
    this._totalExpansions = 0;
    this._expandedLength = 0;
    this._removeSet = new Set(options.remove && Array.isArray(options.remove) ? options.remove : []);
    this._leaveSet = new Set(options.leave && Array.isArray(options.leave) ? options.leave : []);
    const ncrCfg = parseNCRConfig(options.ncr);
    this._ncrXmlVersion = ncrCfg.xmlVersion;
    this._ncrOnLevel = ncrCfg.onLevel;
    this._ncrNullLevel = ncrCfg.nullLevel;
    this._onExternalEntity = typeof options.onExternalEntity === "function" ? options.onExternalEntity : null;
    this._onInputEntity = typeof options.onInputEntity === "function" ? options.onInputEntity : null;
  }
  // -------------------------------------------------------------------------
  // Private: registration hook dispatch
  // -------------------------------------------------------------------------
  /**
   * Invoke a registration hook for a single entity name/value pair.
   * Returns true when the entity should be accepted, false when it should be
   * silently skipped (BLOCK), and throws when the hook returns THROW.
   *
   * @param {((name: string, value: string) => 'allow'|'block'|'throw')|null} hook
   * @param {string} name
   * @param {string} value
   * @param {string} context  — used in error messages ('external' | 'input')
   * @returns {boolean}  true = accept, false = skip
   */
  _applyRegistrationHook(hook, name, value, context) {
    if (!hook) return true;
    const action = hook(name, value);
    if (action === ENTITY_ACTION.BLOCK) return false;
    if (action === ENTITY_ACTION.THROW) {
      throw new Error(
        `[EntityDecoder] Registration of ${context} entity "&${name};" was rejected by hook`
      );
    }
    return true;
  }
  // -------------------------------------------------------------------------
  // Persistent external entity registration
  // -------------------------------------------------------------------------
  /**
   * Replace the full set of persistent external entities.
   * All keys are validated — throws on invalid characters.
   * If `onExternalEntity` is set, it is called once per entry; entries that
   * return `ENTITY_ACTION.BLOCK` are silently omitted, `ENTITY_ACTION.THROW`
   * aborts the whole call.
   * @param {Record<string, string | { regex?: RegExp, val: string }>} map
   */
  setExternalEntities(map) {
    if (map) {
      for (const key of Object.keys(map)) {
        validateEntityName(key);
      }
    }
    if (!this._onExternalEntity) {
      this._externalMap = mergeEntityMaps(map);
      return;
    }
    const flat = mergeEntityMaps(map);
    const filtered = /* @__PURE__ */ Object.create(null);
    for (const [name, value] of Object.entries(flat)) {
      if (this._applyRegistrationHook(this._onExternalEntity, name, value, "external")) {
        filtered[name] = value;
      }
    }
    this._externalMap = filtered;
  }
  /**
   * Add a single persistent external entity.
   * If `onExternalEntity` is set it is called before the entity is stored;
   * `ENTITY_ACTION.BLOCK` silently skips storage, `ENTITY_ACTION.THROW` raises.
   * @param {string} key
   * @param {string} value
   */
  addExternalEntity(key, value) {
    validateEntityName(key);
    if (typeof value === "string" && value.indexOf("&") === -1) {
      if (this._applyRegistrationHook(this._onExternalEntity, key, value, "external")) {
        this._externalMap[key] = value;
      }
    }
  }
  // -------------------------------------------------------------------------
  // Input / runtime entity registration (per document)
  // -------------------------------------------------------------------------
  /**
   * Inject DOCTYPE entities for the current document.
   * Also resets per-document expansion counters.
   * If `onInputEntity` is set it is called once per entry; entries returning
   * `ENTITY_ACTION.BLOCK` are silently omitted, `ENTITY_ACTION.THROW` aborts.
   * @param {Record<string, string | { regx?: RegExp, regex?: RegExp, val: string }>} map
   */
  addInputEntities(map) {
    this._totalExpansions = 0;
    this._expandedLength = 0;
    if (!this._onInputEntity) {
      this._inputMap = mergeEntityMaps(map);
      return;
    }
    const flat = mergeEntityMaps(map);
    const filtered = /* @__PURE__ */ Object.create(null);
    for (const [name, value] of Object.entries(flat)) {
      if (this._applyRegistrationHook(this._onInputEntity, name, value, "input")) {
        filtered[name] = value;
      }
    }
    this._inputMap = filtered;
  }
  // -------------------------------------------------------------------------
  // Per-document reset
  // -------------------------------------------------------------------------
  /**
   * Wipe input/runtime entities and reset counters.
   * Call this before processing each new document.
   * @returns {this}
   */
  reset() {
    this._inputMap = /* @__PURE__ */ Object.create(null);
    this._totalExpansions = 0;
    this._expandedLength = 0;
    return this;
  }
  // -------------------------------------------------------------------------
  // XML version (can be set after construction, e.g. once parser reads <?xml?>)
  // -------------------------------------------------------------------------
  /**
   * Update the XML version used for NCR classification.
   * Call this as soon as the document's `<?xml version="...">` declaration is parsed.
   * @param {1.0|1.1|number} version
   */
  setXmlVersion(version) {
    this._ncrXmlVersion = version === 1.1 ? 1.1 : 1;
  }
  // -------------------------------------------------------------------------
  // Primary API
  // -------------------------------------------------------------------------
  /**
   * Replace all entity references in `str` in a single pass.
   *
   * @param {string} str
   * @returns {string}
   */
  decode(str) {
    if (typeof str !== "string" || str.length === 0) return str;
    if (str.indexOf("&") === -1) return str;
    const original = str;
    const chunks = [];
    const len = str.length;
    let last = 0;
    let i = 0;
    const limitExpansions = this._maxTotalExpansions > 0;
    const limitLength = this._maxExpandedLength > 0;
    const checkLimits = limitExpansions || limitLength;
    while (i < len) {
      if (str.charCodeAt(i) !== 38) {
        i++;
        continue;
      }
      let j = i + 1;
      while (j < len && str.charCodeAt(j) !== 59 && j - i <= 32) j++;
      if (j >= len || str.charCodeAt(j) !== 59) {
        i++;
        continue;
      }
      const token = str.slice(i + 1, j);
      if (token.length === 0) {
        i++;
        continue;
      }
      let replacement;
      let tier;
      if (this._removeSet.has(token)) {
        replacement = "";
        if (tier === void 0) {
          tier = LIMIT_TIER_EXTERNAL;
        }
      } else if (this._leaveSet.has(token)) {
        i++;
        continue;
      } else if (token.charCodeAt(0) === 35) {
        const ncrResult = this._resolveNCR(token);
        if (ncrResult === void 0) {
          i++;
          continue;
        }
        replacement = ncrResult;
        tier = LIMIT_TIER_BASE;
      } else {
        const resolved = this._resolveName(token);
        replacement = resolved?.value;
        tier = resolved?.tier;
      }
      if (replacement === void 0) {
        i++;
        continue;
      }
      if (i > last) chunks.push(str.slice(last, i));
      chunks.push(replacement);
      last = j + 1;
      i = last;
      if (checkLimits && this._tierCounts(tier)) {
        if (limitExpansions) {
          this._totalExpansions++;
          if (this._totalExpansions > this._maxTotalExpansions) {
            throw new Error(
              `[EntityReplacer] Entity expansion count limit exceeded: ${this._totalExpansions} > ${this._maxTotalExpansions}`
            );
          }
        }
        if (limitLength) {
          const delta = replacement.length - (token.length + 2);
          if (delta > 0) {
            this._expandedLength += delta;
            if (this._expandedLength > this._maxExpandedLength) {
              throw new Error(
                `[EntityReplacer] Expanded content length limit exceeded: ${this._expandedLength} > ${this._maxExpandedLength}`
              );
            }
          }
        }
      }
    }
    if (last < len) chunks.push(str.slice(last));
    const result = chunks.length === 0 ? str : chunks.join("");
    return this._postCheck(result, original);
  }
  // -------------------------------------------------------------------------
  // Private: limit tier check
  // -------------------------------------------------------------------------
  /**
   * Returns true if a resolved entity of the given tier should count
   * against the expansion/length limits.
   * @param {string} tier  — LIMIT_TIER_EXTERNAL | LIMIT_TIER_BASE
   * @returns {boolean}
   */
  _tierCounts(tier) {
    if (this._limitTiers.has(LIMIT_TIER_ALL)) return true;
    return this._limitTiers.has(tier);
  }
  // -------------------------------------------------------------------------
  // Private: entity resolution
  // -------------------------------------------------------------------------
  /**
   * Resolve a named entity token (without & and ;).
   * Priority: inputMap > externalMap > baseMap
   * Returns the resolved value tagged with its limit tier.
   *
   * @param {string} name
   * @returns {{ value: string, tier: string }|undefined}
   */
  _resolveName(name) {
    if (name in this._inputMap) return { value: this._inputMap[name], tier: LIMIT_TIER_EXTERNAL };
    if (name in this._externalMap) return { value: this._externalMap[name], tier: LIMIT_TIER_EXTERNAL };
    if (name in this._baseMap) return { value: this._baseMap[name], tier: LIMIT_TIER_BASE };
    return void 0;
  }
  /**
   * Classify a codepoint and return the minimum action level that must be applied.
   * Returns -1 when no minimum is imposed (normal allow path).
   *
   * Ranges checked (in priority order):
   *   1. U+0000            — null, governed by nullNCR (always ≥ remove)
   *   2. U+D800–U+DFFF     — surrogates, always prohibited (min: remove)
   *   3. U+0001–U+001F \ {0x09,0x0A,0x0D}  — XML 1.0 restricted C0 (min: remove)
   *      (skipped in XML 1.1 — C0 controls are allowed when written as NCRs)
   *
   * @param {number} cp  — codepoint
   * @returns {number}   — minimum NCR_LEVEL value, or -1 for no restriction
   */
  _classifyNCR(cp) {
    if (cp === 0) return this._ncrNullLevel;
    if (cp >= 55296 && cp <= 57343) return NCR_LEVEL.remove;
    if (this._ncrXmlVersion === 1) {
      if (cp >= 1 && cp <= 31 && !XML10_ALLOWED_C0.has(cp)) return NCR_LEVEL.remove;
    }
    return -1;
  }
  /**
   * Execute a resolved NCR action.
   *
   * @param {number} action   — NCR_LEVEL value
   * @param {string} token    — raw token (e.g. '#38') for error messages
   * @param {number} cp       — codepoint, used only for error messages
   * @returns {string|undefined}
   *   - decoded character string  → 'allow'
   *   - ''                        → 'remove'
   *   - undefined                 → 'leave' (caller must skip past '&' only)
   *   - throws Error              → 'throw'
   */
  _applyNCRAction(action, token, cp) {
    switch (action) {
      case NCR_LEVEL.allow:
        return String.fromCodePoint(cp);
      case NCR_LEVEL.remove:
        return "";
      case NCR_LEVEL.leave:
        return void 0;
      // signal: keep literal
      case NCR_LEVEL.throw:
        throw new Error(
          `[EntityDecoder] Prohibited numeric character reference &${token}; (U+${cp.toString(16).toUpperCase().padStart(4, "0")})`
        );
      default:
        return String.fromCodePoint(cp);
    }
  }
  /**
   * Full NCR resolution pipeline for a numeric token.
   *
   * Steps:
   *   1. Parse the codepoint (decimal or hex).
   *   2. Validate the raw codepoint range (NaN, <0, >0x10FFFF).
   *   3. If numericAllowed is false and no minimum restriction applies → leave as-is.
   *   4. Classify the codepoint to find the minimum required action level.
   *   5. Resolve effective action = max(onNCR, minimum).
   *   6. Apply and return.
   *
   * @param {string} token  — e.g. '#38', '#x26', '#X26'
   * @returns {string|undefined}
   *   - string (incl. '')  — replacement ('' = remove)
   *   - undefined          — leave original &token; as-is
   */
  _resolveNCR(token) {
    const second = token.charCodeAt(1);
    let cp;
    if (second === 120 || second === 88) {
      cp = parseInt(token.slice(2), 16);
    } else {
      cp = parseInt(token.slice(1), 10);
    }
    if (Number.isNaN(cp) || cp < 0 || cp > 1114111) return void 0;
    const minimum = this._classifyNCR(cp);
    if (!this._numericAllowed && minimum < NCR_LEVEL.remove) return void 0;
    const effective = minimum === -1 ? this._ncrOnLevel : Math.max(this._ncrOnLevel, minimum);
    return this._applyNCRAction(effective, token, cp);
  }
};

// ../../vscode/node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
var defaultOnDangerousProperty = (name) => {
  if (DANGEROUS_PROPERTY_NAMES.includes(name)) {
    return "__" + name;
  }
  return name;
};
var defaultOptions2 = {
  preserveOrder: false,
  attributeNamePrefix: "@_",
  attributesGroupName: false,
  textNodeName: "#text",
  ignoreAttributes: true,
  removeNSPrefix: false,
  // remove NS from tag name or attribute name if true
  allowBooleanAttributes: false,
  //a tag can have attributes without any value
  //ignoreRootElement : false,
  parseTagValue: true,
  parseAttributeValue: false,
  trimValues: true,
  //Trim string values of tag and attributes
  cdataPropName: false,
  numberParseOptions: {
    hex: true,
    leadingZeros: true,
    eNotation: true,
    unicode: false
  },
  tagValueProcessor: function(tagName, val) {
    return val;
  },
  attributeValueProcessor: function(attrName, val) {
    return val;
  },
  stopNodes: [],
  //nested tags will not be parsed even for errors
  alwaysCreateTextNode: false,
  isArray: () => false,
  commentPropName: false,
  unpairedTags: [],
  processEntities: true,
  htmlEntities: false,
  entityDecoder: null,
  ignoreDeclaration: false,
  ignorePiTags: false,
  transformTagName: false,
  transformAttributeName: false,
  updateTag: function(tagName, jPath, attrs) {
    return tagName;
  },
  // skipEmptyListItem: false
  captureMetaData: false,
  maxNestedTags: 100,
  strictReservedNames: true,
  jPath: true,
  // if true, pass jPath string to callbacks; if false, pass matcher instance
  onDangerousProperty: defaultOnDangerousProperty
};
function validatePropertyName(propertyName, optionName) {
  if (typeof propertyName !== "string") {
    return;
  }
  const normalized = propertyName.toLowerCase();
  if (DANGEROUS_PROPERTY_NAMES.some((dangerous) => normalized === dangerous.toLowerCase())) {
    throw new Error(
      `[SECURITY] Invalid ${optionName}: "${propertyName}" is a reserved JavaScript keyword that could cause prototype pollution`
    );
  }
  if (criticalProperties.some((dangerous) => normalized === dangerous.toLowerCase())) {
    throw new Error(
      `[SECURITY] Invalid ${optionName}: "${propertyName}" is a reserved JavaScript keyword that could cause prototype pollution`
    );
  }
}
function normalizeProcessEntities(value, htmlEntities) {
  if (typeof value === "boolean") {
    return {
      enabled: value,
      // true or false
      maxEntitySize: 1e4,
      maxExpansionDepth: 1e4,
      maxTotalExpansions: Infinity,
      maxExpandedLength: 1e5,
      maxEntityCount: 1e3,
      allowedTags: null,
      tagFilter: null,
      appliesTo: "all"
    };
  }
  if (typeof value === "object" && value !== null) {
    return {
      enabled: value.enabled !== false,
      maxEntitySize: Math.max(1, value.maxEntitySize ?? 1e4),
      maxExpansionDepth: Math.max(1, value.maxExpansionDepth ?? 1e4),
      maxTotalExpansions: Math.max(1, value.maxTotalExpansions ?? Infinity),
      maxExpandedLength: Math.max(1, value.maxExpandedLength ?? 1e5),
      maxEntityCount: Math.max(1, value.maxEntityCount ?? 1e3),
      allowedTags: value.allowedTags ?? null,
      tagFilter: value.tagFilter ?? null,
      appliesTo: value.appliesTo ?? "all"
    };
  }
  return normalizeProcessEntities(true);
}
var buildOptions = function(options) {
  const built = Object.assign({}, defaultOptions2, options);
  const propertyNameOptions = [
    { value: built.attributeNamePrefix, name: "attributeNamePrefix" },
    { value: built.attributesGroupName, name: "attributesGroupName" },
    { value: built.textNodeName, name: "textNodeName" },
    { value: built.cdataPropName, name: "cdataPropName" },
    { value: built.commentPropName, name: "commentPropName" }
  ];
  for (const { value, name } of propertyNameOptions) {
    if (value) {
      validatePropertyName(value, name);
    }
  }
  if (built.onDangerousProperty === null) {
    built.onDangerousProperty = defaultOnDangerousProperty;
  }
  built.processEntities = normalizeProcessEntities(built.processEntities, built.htmlEntities);
  built.unpairedTagsSet = new Set(built.unpairedTags);
  if (built.stopNodes && Array.isArray(built.stopNodes)) {
    built.stopNodes = built.stopNodes.map((node) => {
      if (typeof node === "string" && node.startsWith("*.")) {
        return ".." + node.substring(2);
      }
      return node;
    });
  }
  return built;
};

// ../../vscode/node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
var METADATA_SYMBOL;
if (typeof Symbol !== "function") {
  METADATA_SYMBOL = "@@xmlMetadata";
} else {
  METADATA_SYMBOL = /* @__PURE__ */ Symbol("XML Node Metadata");
}
var XmlNode = class {
  constructor(tagname) {
    this.tagname = tagname;
    this.child = [];
    this[":@"] = /* @__PURE__ */ Object.create(null);
  }
  add(key, val) {
    if (key === "__proto__") key = "#__proto__";
    this.child.push({ [key]: val });
  }
  addChild(node, startIndex) {
    if (node.tagname === "__proto__") node.tagname = "#__proto__";
    if (node[":@"] && Object.keys(node[":@"]).length > 0) {
      this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
    } else {
      this.child.push({ [node.tagname]: node.child });
    }
    if (startIndex !== void 0) {
      this.child[this.child.length - 1][METADATA_SYMBOL] = { startIndex };
    }
  }
  /** symbol used for metadata */
  static getMetaDataSymbol() {
    return METADATA_SYMBOL;
  }
};

// ../../vscode/node_modules/xml-naming/src/index.js
var nameStartChar10 = ":A-Za-z_\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u0486\u0488-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
var nameChar10 = nameStartChar10 + "\\-\\.\\d\xB7\u0300-\u036F\u203F-\u2040";
var nameStartChar11 = ":A-Za-z_\xC0-\u02FF\u0370-\u037D\u037F-\u0486\u0488-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}";
var nameChar11 = nameStartChar11 + "\\-\\.\\d\xB7\u0300-\u036F\u0487\u203F-\u2040";
var buildRegexes = (startChar, char, flags = "") => {
  const ncStart = startChar.replace(":", "");
  const ncChar = char.replace(":", "");
  const ncNamePat = `[${ncStart}][${ncChar}]*`;
  return {
    name: new RegExp(`^[${startChar}][${char}]*$`, flags),
    ncName: new RegExp(`^${ncNamePat}$`, flags),
    qName: new RegExp(`^${ncNamePat}(?::${ncNamePat})?$`, flags),
    nmToken: new RegExp(`^[${char}]+$`, flags),
    nmTokens: new RegExp(`^[${char}]+(?:\\s+[${char}]+)*$`, flags)
  };
};
var regexes10 = buildRegexes(nameStartChar10, nameChar10);
var regexes11 = buildRegexes(nameStartChar11, nameChar11, "u");
var nameStartCharAscii = ":A-Za-z_";
var nameCharAscii = nameStartCharAscii + "\\-\\.\\d";
var regexesAscii = buildRegexes(nameStartCharAscii, nameCharAscii);
var getRegexes = (xmlVersion = "1.0", asciiOnly = false) => {
  if (asciiOnly) return regexesAscii;
  return xmlVersion === "1.1" ? regexes11 : regexes10;
};
var qName = (str, { xmlVersion = "1.0", asciiOnly = false } = {}) => getRegexes(xmlVersion, asciiOnly).qName.test(str);

// ../../vscode/node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
var DocTypeReader = class {
  constructor(options, xmlVersion) {
    this.suppressValidationErr = !options;
    this.options = options;
    this.xmlVersion = xmlVersion || 1;
  }
  setXmlVersion(xmlVersion = 1) {
    this.xmlVersion = xmlVersion;
  }
  readDocType(xmlData, i) {
    const entities = /* @__PURE__ */ Object.create(null);
    let entityCount = 0;
    if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
      i = i + 9;
      let angleBracketsCount = 1;
      let hasBody = false, comment = false;
      let exp = "";
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === "<" && !comment) {
          if (hasBody && hasSeq(xmlData, "!ENTITY", i)) {
            i += 7;
            let entityName, val;
            [entityName, val, i] = this.readEntityExp(xmlData, i + 1, this.suppressValidationErr);
            if (val.indexOf("&") === -1) {
              if (this.options.enabled !== false && this.options.maxEntityCount != null && entityCount >= this.options.maxEntityCount) {
                throw new Error(
                  `Entity count (${entityCount + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`
                );
              }
              entities[entityName] = val;
              entityCount++;
            }
          } else if (hasBody && hasSeq(xmlData, "!ELEMENT", i)) {
            i += 8;
            const { index } = this.readElementExp(xmlData, i + 1);
            i = index;
          } else if (hasBody && hasSeq(xmlData, "!ATTLIST", i)) {
            i += 8;
          } else if (hasBody && hasSeq(xmlData, "!NOTATION", i)) {
            i += 9;
            const { index } = this.readNotationExp(xmlData, i + 1, this.suppressValidationErr);
            i = index;
          } else if (hasSeq(xmlData, "!--", i)) comment = true;
          else throw new Error(`Invalid DOCTYPE`);
          angleBracketsCount++;
          exp = "";
        } else if (xmlData[i] === ">") {
          if (comment) {
            if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
              comment = false;
              angleBracketsCount--;
            }
          } else {
            angleBracketsCount--;
          }
          if (angleBracketsCount === 0) {
            break;
          }
        } else if (xmlData[i] === "[") {
          hasBody = true;
        } else {
          exp += xmlData[i];
        }
      }
      if (angleBracketsCount !== 0) {
        throw new Error(`Unclosed DOCTYPE`);
      }
    } else {
      throw new Error(`Invalid Tag instead of DOCTYPE`);
    }
    return { entities, i };
  }
  readEntityExp(xmlData, i) {
    i = skipWhitespace(xmlData, i);
    const startIndex = i;
    while (i < xmlData.length && !/\s/.test(xmlData[i]) && xmlData[i] !== '"' && xmlData[i] !== "'") {
      i++;
    }
    let entityName = xmlData.substring(startIndex, i);
    validateEntityName2(entityName, { xmlVersion: this.xmlVersion });
    i = skipWhitespace(xmlData, i);
    if (!this.suppressValidationErr) {
      if (xmlData.substring(i, i + 6).toUpperCase() === "SYSTEM") {
        throw new Error("External entities are not supported");
      } else if (xmlData[i] === "%") {
        throw new Error("Parameter entities are not supported");
      }
    }
    let entityValue = "";
    [i, entityValue] = this.readIdentifierVal(xmlData, i, "entity");
    if (this.options.enabled !== false && this.options.maxEntitySize != null && entityValue.length > this.options.maxEntitySize) {
      throw new Error(
        `Entity "${entityName}" size (${entityValue.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`
      );
    }
    i--;
    return [entityName, entityValue, i];
  }
  readNotationExp(xmlData, i) {
    i = skipWhitespace(xmlData, i);
    const startIndex = i;
    while (i < xmlData.length && !/\s/.test(xmlData[i])) {
      i++;
    }
    let notationName = xmlData.substring(startIndex, i);
    !this.suppressValidationErr && validateEntityName2(notationName, { xmlVersion: this.xmlVersion });
    i = skipWhitespace(xmlData, i);
    const identifierType = xmlData.substring(i, i + 6).toUpperCase();
    if (!this.suppressValidationErr && identifierType !== "SYSTEM" && identifierType !== "PUBLIC") {
      throw new Error(`Expected SYSTEM or PUBLIC, found "${identifierType}"`);
    }
    i += identifierType.length;
    i = skipWhitespace(xmlData, i);
    let publicIdentifier = null;
    let systemIdentifier = null;
    if (identifierType === "PUBLIC") {
      [i, publicIdentifier] = this.readIdentifierVal(xmlData, i, "publicIdentifier");
      i = skipWhitespace(xmlData, i);
      if (xmlData[i] === '"' || xmlData[i] === "'") {
        [i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");
      }
    } else if (identifierType === "SYSTEM") {
      [i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");
      if (!this.suppressValidationErr && !systemIdentifier) {
        throw new Error("Missing mandatory system identifier for SYSTEM notation");
      }
    }
    return { notationName, publicIdentifier, systemIdentifier, index: --i };
  }
  readIdentifierVal(xmlData, i, type) {
    let identifierVal = "";
    const startChar = xmlData[i];
    if (startChar !== '"' && startChar !== "'") {
      throw new Error(`Expected quoted string, found "${startChar}"`);
    }
    i++;
    const startIndex = i;
    while (i < xmlData.length && xmlData[i] !== startChar) {
      i++;
    }
    identifierVal = xmlData.substring(startIndex, i);
    if (xmlData[i] !== startChar) {
      throw new Error(`Unterminated ${type} value`);
    }
    i++;
    return [i, identifierVal];
  }
  readElementExp(xmlData, i) {
    i = skipWhitespace(xmlData, i);
    const startIndex = i;
    while (i < xmlData.length && !/\s/.test(xmlData[i])) {
      i++;
    }
    let elementName = xmlData.substring(startIndex, i);
    if (!this.suppressValidationErr && !qName(elementName, { xmlVersion: this.xmlVersion })) {
      throw new Error(`Invalid element name: "${elementName}"`);
    }
    i = skipWhitespace(xmlData, i);
    let contentModel = "";
    if (xmlData[i] === "E" && hasSeq(xmlData, "MPTY", i)) i += 4;
    else if (xmlData[i] === "A" && hasSeq(xmlData, "NY", i)) i += 2;
    else if (xmlData[i] === "(") {
      i++;
      const startIndex2 = i;
      while (i < xmlData.length && xmlData[i] !== ")") {
        i++;
      }
      contentModel = xmlData.substring(startIndex2, i);
      if (xmlData[i] !== ")") {
        throw new Error("Unterminated content model");
      }
    } else if (!this.suppressValidationErr) {
      throw new Error(`Invalid Element Expression, found "${xmlData[i]}"`);
    }
    return {
      elementName,
      contentModel: contentModel.trim(),
      index: i
    };
  }
  readAttlistExp(xmlData, i) {
    i = skipWhitespace(xmlData, i);
    let startIndex = i;
    while (i < xmlData.length && !/\s/.test(xmlData[i])) {
      i++;
    }
    let elementName = xmlData.substring(startIndex, i);
    validateEntityName2(elementName, { xmlVersion: this.xmlVersion });
    i = skipWhitespace(xmlData, i);
    startIndex = i;
    while (i < xmlData.length && !/\s/.test(xmlData[i])) {
      i++;
    }
    let attributeName = xmlData.substring(startIndex, i);
    if (!validateEntityName2(attributeName, { xmlVersion: this.xmlVersion })) {
      throw new Error(`Invalid attribute name: "${attributeName}"`);
    }
    i = skipWhitespace(xmlData, i);
    let attributeType = "";
    if (xmlData.substring(i, i + 8).toUpperCase() === "NOTATION") {
      attributeType = "NOTATION";
      i += 8;
      i = skipWhitespace(xmlData, i);
      if (xmlData[i] !== "(") {
        throw new Error(`Expected '(', found "${xmlData[i]}"`);
      }
      i++;
      let allowedNotations = [];
      while (i < xmlData.length && xmlData[i] !== ")") {
        const startIndex2 = i;
        while (i < xmlData.length && xmlData[i] !== "|" && xmlData[i] !== ")") {
          i++;
        }
        let notation = xmlData.substring(startIndex2, i);
        notation = notation.trim();
        if (!validateEntityName2(notation, { xmlVersion: this.xmlVersion })) {
          throw new Error(`Invalid notation name: "${notation}"`);
        }
        allowedNotations.push(notation);
        if (xmlData[i] === "|") {
          i++;
          i = skipWhitespace(xmlData, i);
        }
      }
      if (xmlData[i] !== ")") {
        throw new Error("Unterminated list of notations");
      }
      i++;
      attributeType += " (" + allowedNotations.join("|") + ")";
    } else {
      const startIndex2 = i;
      while (i < xmlData.length && !/\s/.test(xmlData[i])) {
        i++;
      }
      attributeType += xmlData.substring(startIndex2, i);
      const validTypes = ["CDATA", "ID", "IDREF", "IDREFS", "ENTITY", "ENTITIES", "NMTOKEN", "NMTOKENS"];
      if (!this.suppressValidationErr && !validTypes.includes(attributeType.toUpperCase())) {
        throw new Error(`Invalid attribute type: "${attributeType}"`);
      }
    }
    i = skipWhitespace(xmlData, i);
    let defaultValue = "";
    if (xmlData.substring(i, i + 8).toUpperCase() === "#REQUIRED") {
      defaultValue = "#REQUIRED";
      i += 8;
    } else if (xmlData.substring(i, i + 7).toUpperCase() === "#IMPLIED") {
      defaultValue = "#IMPLIED";
      i += 7;
    } else {
      [i, defaultValue] = this.readIdentifierVal(xmlData, i, "ATTLIST");
    }
    return {
      elementName,
      attributeName,
      attributeType,
      defaultValue,
      index: i
    };
  }
};
var skipWhitespace = (data, index) => {
  while (index < data.length && /\s/.test(data[index])) {
    index++;
  }
  return index;
};
function hasSeq(data, seq, i) {
  for (let j = 0; j < seq.length; j++) {
    if (seq[j] !== data[i + j + 1]) return false;
  }
  return true;
}
function validateEntityName2(name, xmlVersion) {
  if (qName(name, { xmlVersion }))
    return name;
  else
    throw new Error(`Invalid entity name ${name}`);
}

// ../../vscode/node_modules/anynum/digitTable.js
var SCRIPT_ZEROS = [
  // Basic Latin (ASCII) — included for completeness / pass-through
  48,
  // 0-9
  // Arabic scripts
  1632,
  // Arabic-Indic ٠١٢٣٤٥٦٧٨٩
  1776,
  // Extended Arabic-Indic (Urdu/Persian/Sindhi) ۰۱۲۳
  // Indic scripts
  2406,
  // Devanagari ०१२३४५६७८९
  2534,
  // Bengali ০১২৩৪৫৬৭৮৯
  2662,
  // Gurmukhi ੦੧੨੩੪੫੬੭੮੯
  2790,
  // Gujarati ૦૧૨૩૪૫૬૭૮૯
  2918,
  // Odia ୦୧୨୩୪୫୬୭୮୯
  3046,
  // Tamil ௦௧௨௩௪௫௬௭௮௯
  3174,
  // Telugu ౦౧౨౩౪౫౬౭౮౯
  3302,
  // Kannada ೦೧೨೩೪೫೬೭೮೯
  3430,
  // Malayalam ൦൧൨൩൪൫൬൭൮൯
  3558,
  // Sinhala Archaic ෦෧෨෩෪෫෬෭෮෯
  // Southeast Asian scripts
  3664,
  // Thai ๐๑๒๓๔๕๖๗๘๙
  3792,
  // Lao ໐໑໒໓໔໕໖໗໘໙
  3872,
  // Tibetan ༠༡༢༣༤༥༦༧༨༩
  4160,
  // Myanmar ၀၁၂၃၄၅၆၇၈၉
  4240,
  // Myanmar Shan ႐႑႒႓႔႕႖႗႘႙
  6112,
  // Khmer ០១២៣៤៥៦៧៨៩
  6160,
  // Mongolian ᠐᠑᠒᠓᠔᠕᠖᠗᠘᠙
  6470,
  // Limbu ᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏
  6608,
  // New Tai Lue ᧐᧑᧒᧓᧔᧕᧖᧗᧘᧙
  6784,
  // Tai Tham Hora ᪀᪁᪂᪃᪄᪅᪆᪇᪈᪉
  6800,
  // Tai Tham Tham ᪐᪑᪒᪓᪔᪕᪖᪗᪘᪙
  6992,
  // Balinese ᭐᭑᭒᭓᭔᭕᭖᭗᭘᭙
  7088,
  // Sundanese ᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹
  7232,
  // Lepcha ᱀᱁᱂᱃᱄᱅᱆᱇᱈᱉
  7248,
  // Ol Chiki ᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙
  // Fullwidth (CJK context)
  65296,
  // Fullwidth ０１２３４５６７８９
  // Mathematical digit variants (Unicode math block)
  120782,
  // Mathematical Bold
  120792,
  // Mathematical Double-Struck
  120802,
  // Mathematical Sans-Serif
  120812,
  // Mathematical Sans-Serif Bold
  120822,
  // Mathematical Monospace
  // Other scripts
  66720,
  // Osmanya 𐒠𐒡𐒢𐒣𐒤𐒥𐒦𐒧𐒨𐒩
  68912,
  // Hanifi Rohingya 𐴰𐴱𐴲𐴳𐴴𐴵𐴶𐴷𐴸𐴹
  69734,
  // Brahmi 𑁦𑁧𑁨𑁩𑁪𑁫𑁬𑁭𑁮𑁯
  69872,
  // Sora Sompeng 𑃰𑃱𑃲𑃳𑃴𑃵𑃶𑃷𑃸𑃹
  69942,
  // Chakma 𑄶𑄷𑄸𑄹𑄺𑄻𑄼𑄽𑄾𑄿
  70096,
  // Sharada 𑇐𑇑𑇒𑇓𑇔𑇕𑇖𑇗𑇘𑇙
  70384,
  // Khudawadi 𑋰𑋱𑋲𑋳𑋴𑋵𑋶𑋷𑋸𑋹
  70736,
  // Newa 𑑐𑑑𑑒𑑓𑑔𑑕𑑖𑑗𑑘𑑙
  70864,
  // Tirhuta 𑓐𑓑𑓒𑓓𑓔𑓕𑓖𑓗𑓘𑓙
  71248,
  // Modi 𑙐𑙑𑙒𑙓𑙔𑙕𑙖𑙗𑙘𑙙
  71360,
  // Takri 𑛀𑛁𑛂𑛃𑛄𑛅𑛆𑛇𑛈𑛉
  71472,
  // Ahom 𑜰𑜱𑜲𑜳𑜴𑜵𑜶𑜷𑜸𑜹
  71904,
  // Warang Citi 𑣠𑣡𑣢𑣣𑣤𑣥𑣦𑣧𑣨𑣩
  72016,
  // Dives Akuru 𑥐𑥑𑥒𑥓𑥔𑥕𑥖𑥗𑥘𑥙
  72688,
  // Khitan Small Script 𑯰𑯱𑯲𑯳𑯴𑯵𑯶𑯷𑯸𑯹
  72784,
  // Bhaiksuki 𑱐𑱑𑱒𑱓𑱔𑱕𑱖𑱗𑱘𑱙
  73040,
  // Masaram Gondi 𑵐𑵑𑵒𑵓𑵔𑵕𑵖𑵗𑵘𑵙
  73120,
  // Gunjala Gondi 𑶠𑶡𑶢𑶣𑶤𑶥𑶦𑶧𑶨𑶩
  73552,
  // Kawi 𑽐𑽑𑽒𑽓𑽔𑽕𑽖𑽗𑽘𑽙
  92768,
  // Mro 𖩠𖩡𖩢𖩣𖩤𖩥𖩦𖩧𖩨𖩩
  92864,
  // Tangsa 𖫀𖫁𖫂𖫃𖫄𖫅𖫆𖫇𖫈𖫉
  93008,
  // Pahawh Hmong 𖭐𖭑𖭒𖭓𖭔𖭕𖭖𖭗𖭘𖭙
  123200,
  // Nyiakeng Puachue Hmong 𞅀𞅁𞅂𞅃𞅄𞅅𞅆𞅇𞅈𞅉
  123632,
  // Wancho 𞋰𞋱𞋲𞋳𞋴𞋵𞋶𞋷𞋸𞋹
  124144,
  // Nag Mundari 𞓰𞓱𞓲𞓳𞓴𞓵𞓶𞓷𞓸𞓹
  125264,
  // Adlam 𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙
  130032
  // Segmented digit symbols 🯰🯱🯲🯳🯴🯵🯶🯷🯸🯹
];
var NOT_DIGIT = 255;
var HIGH_MAP = /* @__PURE__ */ new Map();
var LOW_MAX = 65535;
var LOW_MIN = 1632;
var TABLE_OFFSET = LOW_MIN;
var TABLE_SIZE = LOW_MAX - LOW_MIN + 1;
var TABLE = new Uint8Array(TABLE_SIZE).fill(NOT_DIGIT);
for (const zero of SCRIPT_ZEROS) {
  for (let d = 0; d < 10; d++) {
    const cp = zero + d;
    if (cp <= LOW_MAX) {
      TABLE[cp - TABLE_OFFSET] = d;
    } else {
      HIGH_MAP.set(cp, d);
    }
  }
}

// ../../vscode/node_modules/anynum/anynum.js
var CHAR_0 = 48;
var CHAR_9 = 57;
var CHAR_MINUS = 45;
var MINUS_SET = /* @__PURE__ */ new Set([8722, 65293, 65123]);
function anynum(str) {
  if (typeof str !== "string") return str;
  const len = str.length;
  if (len === 0) return str;
  let firstHit = -1;
  for (let i = 0; i < len; i++) {
    const cc = str.charCodeAt(i);
    if (cc >= CHAR_0 && cc <= CHAR_9 || cc === CHAR_MINUS) continue;
    if (cc < TABLE_OFFSET) {
      if (MINUS_SET.has(cc)) {
        firstHit = i;
        break;
      }
      continue;
    }
    if (cc >= 55296 && cc <= 56319) {
      if (i + 1 < len) {
        const low = str.charCodeAt(i + 1);
        if (low >= 56320 && low <= 57343) {
          const cp = 65536 + (cc - 55296 << 10) + (low - 56320);
          if (HIGH_MAP.has(cp)) {
            firstHit = i;
            break;
          }
        }
      }
      continue;
    }
    if (TABLE[cc - TABLE_OFFSET] !== NOT_DIGIT || MINUS_SET.has(cc)) {
      firstHit = i;
      break;
    }
  }
  if (firstHit === -1) return str;
  const chars = [];
  if (firstHit > 0) chars.push(str.slice(0, firstHit));
  for (let i = firstHit; i < len; i++) {
    const cc = str.charCodeAt(i);
    if (cc >= CHAR_0 && cc <= CHAR_9 || cc === CHAR_MINUS) {
      chars.push(str[i]);
      continue;
    }
    if (cc < TABLE_OFFSET) {
      chars.push(MINUS_SET.has(cc) ? "-" : str[i]);
      continue;
    }
    if (cc >= 55296 && cc <= 56319) {
      if (i + 1 < len) {
        const low = str.charCodeAt(i + 1);
        if (low >= 56320 && low <= 57343) {
          const cp = 65536 + (cc - 55296 << 10) + (low - 56320);
          const d2 = HIGH_MAP.get(cp);
          if (d2 !== void 0) {
            chars.push(String.fromCharCode(d2 + 48));
            i++;
            continue;
          }
        }
      }
      chars.push(str[i]);
      continue;
    }
    if (MINUS_SET.has(cc)) {
      chars.push("-");
      continue;
    }
    const d = TABLE[cc - TABLE_OFFSET];
    chars.push(d !== NOT_DIGIT ? String.fromCharCode(d + 48) : str[i]);
  }
  return chars.join("");
}
var anynum_default = anynum;

// ../../vscode/node_modules/strnum/strnum.js
var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
var binRegex = /^0b[01]+$/;
var octRegex = /^0o[0-7]+$/;
var numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
var consider = {
  hex: true,
  binary: false,
  octal: false,
  leadingZeros: true,
  decimalPoint: ".",
  eNotation: true,
  //skipLike: /regex/,
  infinity: "original",
  // "null", "infinity" (Infinity type), "string" ("Infinity" (the string literal))
  unicode: false
};
function toNumber(str, options = {}) {
  options = Object.assign({}, consider, options);
  if (!str || typeof str !== "string") return str;
  let trimmedStr = str.trim();
  if (trimmedStr.length === 0) return str;
  else if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr)) return str;
  else if (trimmedStr === "0") return 0;
  if (options.unicode) {
    trimmedStr = anynum_default(trimmedStr);
    if (trimmedStr === "0") return 0;
  }
  if (options.hex && hexRegex.test(trimmedStr)) {
    return parse_int(trimmedStr, 16);
  } else if (options.binary && binRegex.test(trimmedStr)) {
    return parse_int(trimmedStr, 2);
  } else if (options.octal && octRegex.test(trimmedStr)) {
    return parse_int(trimmedStr, 8);
  } else if (!isFinite(trimmedStr)) {
    return handleInfinity(str, Number(trimmedStr), options);
  } else if (trimmedStr.includes("e") || trimmedStr.includes("E")) {
    return resolveEnotation(str, trimmedStr, options);
  } else {
    const match = numRegex.exec(trimmedStr);
    if (match) {
      const sign = match[1] || "";
      const leadingZeros = match[2];
      let numTrimmedByZeros = trimZeros(match[3]);
      const decimalAdjacentToLeadingZeros = sign ? (
        // 0., -00., 000.
        str[leadingZeros.length + 1] === "."
      ) : str[leadingZeros.length] === ".";
      if (!options.leadingZeros && (leadingZeros.length > 1 || leadingZeros.length === 1 && !decimalAdjacentToLeadingZeros)) {
        return str;
      } else {
        const num = Number(trimmedStr);
        const parsedStr = String(num);
        if (num === 0) return num;
        if (parsedStr.search(/[eE]/) !== -1) {
          if (options.eNotation) return num;
          else return str;
        } else if (trimmedStr.indexOf(".") !== -1) {
          if (parsedStr === "0") return num;
          else if (parsedStr === numTrimmedByZeros) return num;
          else if (parsedStr === `${sign}${numTrimmedByZeros}`) return num;
          else return str;
        }
        let n = leadingZeros ? numTrimmedByZeros : trimmedStr;
        if (leadingZeros) {
          return n === parsedStr || sign + n === parsedStr ? num : str;
        } else {
          return n === parsedStr || n === sign + parsedStr ? num : str;
        }
      }
    } else {
      return str;
    }
  }
}
var eNotationRegx = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
function resolveEnotation(str, trimmedStr, options) {
  if (!options.eNotation) return str;
  const notation = trimmedStr.match(eNotationRegx);
  if (notation) {
    let sign = notation[1] || "";
    const eChar = notation[3].indexOf("e") === -1 ? "E" : "e";
    const leadingZeros = notation[2];
    const eAdjacentToLeadingZeros = sign ? (
      // 0E.
      str[leadingZeros.length + 1] === eChar
    ) : str[leadingZeros.length] === eChar;
    if (leadingZeros.length > 1 && eAdjacentToLeadingZeros) return str;
    else if (leadingZeros.length === 1 && (notation[3].startsWith(`.${eChar}`) || notation[3][0] === eChar)) {
      return Number(trimmedStr);
    } else if (leadingZeros.length > 0) {
      if (options.leadingZeros && !eAdjacentToLeadingZeros) {
        trimmedStr = (notation[1] || "") + notation[3];
        return Number(trimmedStr);
      } else return str;
    } else {
      return Number(trimmedStr);
    }
  } else {
    return str;
  }
}
function trimZeros(numStr) {
  if (numStr && numStr.indexOf(".") !== -1) {
    numStr = numStr.replace(/0+$/, "");
    if (numStr === ".") numStr = "0";
    else if (numStr[0] === ".") numStr = "0" + numStr;
    else if (numStr[numStr.length - 1] === ".") numStr = numStr.substring(0, numStr.length - 1);
    return numStr;
  }
  return numStr;
}
function parse_int(numStr, base) {
  const str = numStr.trim();
  if (base === 2 || base === 8) numStr = str.substring(2);
  if (parseInt) return parseInt(numStr, base);
  else if (Number.parseInt) return Number.parseInt(numStr, base);
  else if (window && window.parseInt) return window.parseInt(numStr, base);
  else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
}
function handleInfinity(str, num, options) {
  const isPositive = num === Infinity;
  switch (options.infinity.toLowerCase()) {
    case "null":
      return null;
    case "infinity":
      return num;
    // Return Infinity or -Infinity
    case "string":
      return isPositive ? "Infinity" : "-Infinity";
    case "original":
    default:
      return str;
  }
}

// ../../vscode/node_modules/fast-xml-parser/src/ignoreAttributes.js
function getIgnoreAttributesFn(ignoreAttributes) {
  if (typeof ignoreAttributes === "function") {
    return ignoreAttributes;
  }
  if (Array.isArray(ignoreAttributes)) {
    return (attrName) => {
      for (const pattern of ignoreAttributes) {
        if (typeof pattern === "string" && attrName === pattern) {
          return true;
        }
        if (pattern instanceof RegExp && pattern.test(attrName)) {
          return true;
        }
      }
    };
  }
  return () => false;
}

// ../../vscode/node_modules/path-expression-matcher/src/Expression.js
var Expression = class {
  /**
   * Create a new Expression
   * @param {string} pattern - Pattern string (e.g., "root.users.user", "..user[id]")
   * @param {Object} options - Configuration options
   * @param {string} options.separator - Path separator (default: '.')
   */
  constructor(pattern, options = {}, data) {
    this.pattern = pattern;
    this.separator = options.separator || ".";
    this.segments = this._parse(pattern);
    this.data = data;
    this._hasDeepWildcard = this.segments.some((seg) => seg.type === "deep-wildcard");
    this._hasAttributeCondition = this.segments.some((seg) => seg.attrName !== void 0);
    this._hasPositionSelector = this.segments.some((seg) => seg.position !== void 0);
  }
  /**
   * Parse pattern string into segments
   * @private
   * @param {string} pattern - Pattern to parse
   * @returns {Array} Array of segment objects
   */
  _parse(pattern) {
    const segments = [];
    let i = 0;
    let currentPart = "";
    while (i < pattern.length) {
      if (pattern[i] === this.separator) {
        if (i + 1 < pattern.length && pattern[i + 1] === this.separator) {
          if (currentPart.trim()) {
            segments.push(this._parseSegment(currentPart.trim()));
            currentPart = "";
          }
          segments.push({ type: "deep-wildcard" });
          i += 2;
        } else {
          if (currentPart.trim()) {
            segments.push(this._parseSegment(currentPart.trim()));
          }
          currentPart = "";
          i++;
        }
      } else {
        currentPart += pattern[i];
        i++;
      }
    }
    if (currentPart.trim()) {
      segments.push(this._parseSegment(currentPart.trim()));
    }
    return segments;
  }
  /**
   * Parse a single segment
   * @private
   * @param {string} part - Segment string (e.g., "user", "ns::user", "user[id]", "ns::user:first")
   * @returns {Object} Segment object
   */
  _parseSegment(part) {
    const segment = { type: "tag" };
    let bracketContent = null;
    let withoutBrackets = part;
    const bracketMatch = part.match(/^([^\[]+)(\[[^\]]*\])(.*)$/);
    if (bracketMatch) {
      withoutBrackets = bracketMatch[1] + bracketMatch[3];
      if (bracketMatch[2]) {
        const content = bracketMatch[2].slice(1, -1);
        if (content) {
          bracketContent = content;
        }
      }
    }
    let namespace = void 0;
    let tagAndPosition = withoutBrackets;
    if (withoutBrackets.includes("::")) {
      const nsIndex = withoutBrackets.indexOf("::");
      namespace = withoutBrackets.substring(0, nsIndex).trim();
      tagAndPosition = withoutBrackets.substring(nsIndex + 2).trim();
      if (!namespace) {
        throw new Error(`Invalid namespace in pattern: ${part}`);
      }
    }
    let tag = void 0;
    let positionMatch = null;
    if (tagAndPosition.includes(":")) {
      const colonIndex = tagAndPosition.lastIndexOf(":");
      const tagPart = tagAndPosition.substring(0, colonIndex).trim();
      const posPart = tagAndPosition.substring(colonIndex + 1).trim();
      const isPositionKeyword = ["first", "last", "odd", "even"].includes(posPart) || /^nth\(\d+\)$/.test(posPart);
      if (isPositionKeyword) {
        tag = tagPart;
        positionMatch = posPart;
      } else {
        tag = tagAndPosition;
      }
    } else {
      tag = tagAndPosition;
    }
    if (!tag) {
      throw new Error(`Invalid segment pattern: ${part}`);
    }
    segment.tag = tag;
    if (namespace) {
      segment.namespace = namespace;
    }
    if (bracketContent) {
      if (bracketContent.includes("=")) {
        const eqIndex = bracketContent.indexOf("=");
        segment.attrName = bracketContent.substring(0, eqIndex).trim();
        segment.attrValue = bracketContent.substring(eqIndex + 1).trim();
      } else {
        segment.attrName = bracketContent.trim();
      }
    }
    if (positionMatch) {
      const nthMatch = positionMatch.match(/^nth\((\d+)\)$/);
      if (nthMatch) {
        segment.position = "nth";
        segment.positionValue = parseInt(nthMatch[1], 10);
      } else {
        segment.position = positionMatch;
      }
    }
    return segment;
  }
  /**
   * Get the number of segments
   * @returns {number}
   */
  get length() {
    return this.segments.length;
  }
  /**
   * Check if expression contains deep wildcard
   * @returns {boolean}
   */
  hasDeepWildcard() {
    return this._hasDeepWildcard;
  }
  /**
   * Check if expression has attribute conditions
   * @returns {boolean}
   */
  hasAttributeCondition() {
    return this._hasAttributeCondition;
  }
  /**
   * Check if expression has position selectors
   * @returns {boolean}
   */
  hasPositionSelector() {
    return this._hasPositionSelector;
  }
  /**
   * Get string representation
   * @returns {string}
   */
  toString() {
    return this.pattern;
  }
};

// ../../vscode/node_modules/path-expression-matcher/src/ExpressionSet.js
var ExpressionSet = class {
  constructor() {
    this._byDepthAndTag = /* @__PURE__ */ new Map();
    this._wildcardByDepth = /* @__PURE__ */ new Map();
    this._deepWildcards = [];
    this._deepByTerminalTag = /* @__PURE__ */ new Map();
    this._patterns = /* @__PURE__ */ new Set();
    this._sealed = false;
  }
  /**
   * Add an Expression to the set.
   * Duplicate patterns (same pattern string) are silently ignored.
   *
   * @param {import('./Expression.js').default} expression - A pre-constructed Expression instance
   * @returns {this} for chaining
   * @throws {TypeError} if called after seal()
   *
   * @example
   * set.add(new Expression('root.users.user'));
   * set.add(new Expression('..script'));
   */
  add(expression) {
    if (this._sealed) {
      throw new TypeError(
        "ExpressionSet is sealed. Create a new ExpressionSet to add more expressions."
      );
    }
    if (this._patterns.has(expression.pattern)) return this;
    this._patterns.add(expression.pattern);
    if (expression.hasDeepWildcard()) {
      const lastSeg2 = expression.segments[expression.segments.length - 1];
      if (lastSeg2 && lastSeg2.type !== "deep-wildcard" && lastSeg2.tag !== "*") {
        const tag2 = lastSeg2.tag;
        if (!this._deepByTerminalTag.has(tag2)) this._deepByTerminalTag.set(tag2, []);
        this._deepByTerminalTag.get(tag2).push(expression);
      } else {
        this._deepWildcards.push(expression);
      }
      return this;
    }
    const depth = expression.length;
    const lastSeg = expression.segments[expression.segments.length - 1];
    const tag = lastSeg?.tag;
    if (!tag || tag === "*") {
      if (!this._wildcardByDepth.has(depth)) this._wildcardByDepth.set(depth, []);
      this._wildcardByDepth.get(depth).push(expression);
    } else {
      const key = `${depth}:${tag}`;
      if (!this._byDepthAndTag.has(key)) this._byDepthAndTag.set(key, []);
      this._byDepthAndTag.get(key).push(expression);
    }
    return this;
  }
  /**
   * Add multiple expressions at once.
   *
   * @param {import('./Expression.js').default[]} expressions - Array of Expression instances
   * @returns {this} for chaining
   *
   * @example
   * set.addAll([
   *   new Expression('root.users.user'),
   *   new Expression('root.config.setting'),
   * ]);
   */
  addAll(expressions) {
    for (const expr of expressions) this.add(expr);
    return this;
  }
  /**
   * Check whether a pattern string is already present in the set.
   *
   * @param {import('./Expression.js').default} expression
   * @returns {boolean}
   */
  has(expression) {
    return this._patterns.has(expression.pattern);
  }
  /**
   * Number of expressions in the set.
   * @type {number}
   */
  get size() {
    return this._patterns.size;
  }
  /**
   * Seal the set against further modifications.
   * Useful to prevent accidental mutations after config is built.
   * Calling add() or addAll() on a sealed set throws a TypeError.
   *
   * @returns {this}
   */
  seal() {
    this._sealed = true;
    return this;
  }
  /**
   * Whether the set has been sealed.
   * @type {boolean}
   */
  get isSealed() {
    return this._sealed;
  }
  /**
   * Test whether the matcher's current path matches any expression in the set.
   *
   * Evaluation order (cheapest → most expensive):
   *  1. Exact depth + tag bucket  — O(1) lookup, typically 0–2 expressions
   *  2. Depth-only wildcard bucket — O(1) lookup, rare
   *  3. Deep-wildcard list         — always checked, but usually small
   *
   * @param {import('./Matcher.js').default} matcher - Matcher instance (or readOnly view)
   * @returns {boolean} true if any expression matches the current path
   *
   * @example
   * if (stopNodes.matchesAny(matcher)) {
   *   // handle stop node
   * }
   */
  matchesAny(matcher) {
    return this.findMatch(matcher) !== null;
  }
  /**
  * Find and return the first Expression that matches the matcher's current path.
  *
  * Uses the same evaluation order as matchesAny (cheapest → most expensive):
  *  1. Exact depth + tag bucket
  *  2. Depth-only wildcard bucket
  *  3. Deep-wildcard list
  *
  * @param {import('./Matcher.js').default} matcher - Matcher instance (or readOnly view)
  * @returns {import('./Expression.js').default | null} the first matching Expression, or null
  *
  * @example
  * const expr = stopNodes.findMatch(matcher);
  * if (expr) {
  *   // access expr.config, expr.pattern, etc.
  * }
  */
  findMatch(matcher) {
    const depth = matcher.getDepth();
    const tag = matcher.getCurrentTag();
    const exactKey = `${depth}:${tag}`;
    const exactBucket = this._byDepthAndTag.get(exactKey);
    if (exactBucket) {
      for (let i = 0; i < exactBucket.length; i++) {
        if (matcher.matches(exactBucket[i])) return exactBucket[i];
      }
    }
    const wildcardBucket = this._wildcardByDepth.get(depth);
    if (wildcardBucket) {
      for (let i = 0; i < wildcardBucket.length; i++) {
        if (matcher.matches(wildcardBucket[i])) return wildcardBucket[i];
      }
    }
    const deepBucket = this._deepByTerminalTag.get(tag);
    if (deepBucket) {
      for (let i = 0; i < deepBucket.length; i++) {
        if (matcher.matches(deepBucket[i])) return deepBucket[i];
      }
    }
    for (let i = 0; i < this._deepWildcards.length; i++) {
      if (matcher.matches(this._deepWildcards[i])) return this._deepWildcards[i];
    }
    return null;
  }
};

// ../../vscode/node_modules/path-expression-matcher/src/Matcher.js
var MatcherView = class {
  /**
   * @param {Matcher} matcher - The parent Matcher instance to read from.
   */
  constructor(matcher) {
    this._matcher = matcher;
  }
  /**
   * Get the path separator used by the parent matcher.
   * @returns {string}
   */
  get separator() {
    return this._matcher.separator;
  }
  /**
   * Get current tag name.
   * @returns {string|undefined}
   */
  getCurrentTag() {
    const path12 = this._matcher.path;
    return path12.length > 0 ? path12[path12.length - 1].tag : void 0;
  }
  /**
   * Get current namespace.
   * @returns {string|undefined}
   */
  getCurrentNamespace() {
    const path12 = this._matcher.path;
    return path12.length > 0 ? path12[path12.length - 1].namespace : void 0;
  }
  /**
   * Get current node's attribute value.
   * @param {string} attrName
   * @returns {*}
   */
  getAttrValue(attrName) {
    const path12 = this._matcher.path;
    if (path12.length === 0) return void 0;
    return path12[path12.length - 1].values?.[attrName];
  }
  /**
   * Check if current node has an attribute.
   * @param {string} attrName
   * @returns {boolean}
   */
  hasAttr(attrName) {
    const path12 = this._matcher.path;
    if (path12.length === 0) return false;
    const current = path12[path12.length - 1];
    return current.values !== void 0 && attrName in current.values;
  }
  /**
   * Get the value of a "kept" attribute from the nearest ancestor (or
   * current node) that declared it via `push(tag, attrs, ns, { keep: [...] })`.
   * @param {string} attrName
   * @returns {*}
   */
  getAnyParentAttr(attrName) {
    return this._matcher.getAnyParentAttr(attrName);
  }
  /**
   * Check whether any ancestor (or the current node) kept the given
   * attribute via `push(tag, attrs, ns, { keep: [...] })`.
   * @param {string} attrName
   * @returns {boolean}
   */
  hasAnyParentAttr(attrName) {
    return this._matcher.hasAnyParentAttr(attrName);
  }
  /**
   * Get current node's sibling position (child index in parent).
   * @returns {number}
   */
  getPosition() {
    const path12 = this._matcher.path;
    if (path12.length === 0) return -1;
    return path12[path12.length - 1].position ?? 0;
  }
  /**
   * Get current node's repeat counter (occurrence count of this tag name).
   * @returns {number}
   */
  getCounter() {
    const path12 = this._matcher.path;
    if (path12.length === 0) return -1;
    return path12[path12.length - 1].counter ?? 0;
  }
  /**
   * Get current node's sibling index (alias for getPosition).
   * @returns {number}
   * @deprecated Use getPosition() or getCounter() instead
   */
  getIndex() {
    return this.getPosition();
  }
  /**
   * Get current path depth.
   * @returns {number}
   */
  getDepth() {
    return this._matcher.path.length;
  }
  /**
   * Get path as string.
   * @param {string} [separator] - Optional separator (uses default if not provided)
   * @param {boolean} [includeNamespace=true]
   * @returns {string}
   */
  toString(separator, includeNamespace = true) {
    return this._matcher.toString(separator, includeNamespace);
  }
  /**
   * Get path as array of tag names.
   * @returns {string[]}
   */
  toArray() {
    return this._matcher.path.map((n) => n.tag);
  }
  /**
   * Match current path against an Expression.
   * @param {Expression} expression
   * @returns {boolean}
   */
  matches(expression) {
    return this._matcher.matches(expression);
  }
  /**
   * Match any expression in the given set against the current path.
   * @param {ExpressionSet} exprSet
   * @returns {boolean}
   */
  matchesAny(exprSet) {
    return exprSet.matchesAny(this._matcher);
  }
};
var Matcher = class {
  /**
   * Create a new Matcher.
   * @param {Object} [options={}]
   * @param {string} [options.separator='.'] - Default path separator
   */
  constructor(options = {}) {
    this.separator = options.separator || ".";
    this.path = [];
    this.siblingStacks = [];
    this._pathStringCache = null;
    this._view = new MatcherView(this);
    this._keptAttrs = [];
  }
  /**
   * Push a new tag onto the path.
   * @param {string} tagName
   * @param {Object|null} [attrValues=null]
   * @param {string|null} [namespace=null]
   * @param {Object|null} [options=null]
   * @param {string[]} [options.keep] - Names of attributes (from attrValues)
   */
  push(tagName, attrValues = null, namespace = null, options = null) {
    this._pathStringCache = null;
    if (this.path.length > 0) {
      this.path[this.path.length - 1].values = void 0;
    }
    const currentLevel = this.path.length;
    let level = this.siblingStacks[currentLevel];
    if (!level) {
      level = { counts: /* @__PURE__ */ new Map(), total: 0 };
      this.siblingStacks[currentLevel] = level;
    }
    const siblingKey = namespace ? `${namespace}:${tagName}` : tagName;
    const counter = level.counts.get(siblingKey) || 0;
    const position = level.total;
    level.counts.set(siblingKey, counter + 1);
    level.total++;
    const node = {
      tag: tagName,
      position,
      counter
    };
    if (namespace !== null && namespace !== void 0) {
      node.namespace = namespace;
    }
    if (attrValues !== null && attrValues !== void 0) {
      node.values = attrValues;
    }
    this.path.push(node);
    const depth = this.path.length;
    const keep = options !== null ? options.keep : null;
    if (keep !== null && keep !== void 0 && keep.length > 0 && attrValues) {
      for (let i = 0; i < keep.length; i++) {
        const name = keep[i];
        if (attrValues[name] !== void 0) {
          this._keptAttrs.push({ depth, name, value: attrValues[name] });
        }
      }
    }
  }
  /**
   * Pop the last tag from the path.
   * @returns {Object|undefined} The popped node
   */
  pop() {
    if (this.path.length === 0) return void 0;
    this._pathStringCache = null;
    const node = this.path.pop();
    if (this.siblingStacks.length > this.path.length + 1) {
      this.siblingStacks.length = this.path.length + 1;
    }
    const poppedDepth = this.path.length + 1;
    while (this._keptAttrs.length > 0 && this._keptAttrs[this._keptAttrs.length - 1].depth >= poppedDepth) {
      this._keptAttrs.pop();
    }
    return node;
  }
  /**
   * Update current node's attribute values.
   * Useful when attributes are parsed after push.
   * @param {Object} attrValues
   */
  updateCurrent(attrValues) {
    if (this.path.length > 0) {
      const current = this.path[this.path.length - 1];
      if (attrValues !== null && attrValues !== void 0) {
        current.values = attrValues;
      }
    }
  }
  /**
   * Get current tag name.
   * @returns {string|undefined}
   */
  getCurrentTag() {
    return this.path.length > 0 ? this.path[this.path.length - 1].tag : void 0;
  }
  /**
   * Get current namespace.
   * @returns {string|undefined}
   */
  getCurrentNamespace() {
    return this.path.length > 0 ? this.path[this.path.length - 1].namespace : void 0;
  }
  /**
   * Get current node's attribute value.
   * @param {string} attrName
   * @returns {*}
   */
  getAttrValue(attrName) {
    if (this.path.length === 0) return void 0;
    return this.path[this.path.length - 1].values?.[attrName];
  }
  /**
   * Check if current node has an attribute.
   * @param {string} attrName
   * @returns {boolean}
   */
  hasAttr(attrName) {
    if (this.path.length === 0) return false;
    const current = this.path[this.path.length - 1];
    return current.values !== void 0 && attrName in current.values;
  }
  /**
   * Get the value of a "kept" attribute from the nearest ancestor (or
   * current node) that declared it via `push(tag, attrs, ns, { keep: [...] })`.
   * Unlike getAttrValue(), this works regardless of how deep the path has
   * gone since the attribute was pushed — but only for attribute names that
   * were explicitly marked with `keep` at push time. Cost is proportional to
   * the number of currently-kept attributes (typically 0-3), not path depth.
   * @param {string} attrName
   * @returns {*} the value, or undefined if no ancestor kept this attribute
   */
  getAnyParentAttr(attrName) {
    const kept = this._keptAttrs;
    for (let i = kept.length - 1; i >= 0; i--) {
      if (kept[i].name === attrName) return kept[i].value;
    }
    return void 0;
  }
  /**
   * Check whether any ancestor (or the current node) kept the given
   * attribute via `push(tag, attrs, ns, { keep: [...] })`.
   * @param {string} attrName
   * @returns {boolean}
   */
  hasAnyParentAttr(attrName) {
    const kept = this._keptAttrs;
    for (let i = kept.length - 1; i >= 0; i--) {
      if (kept[i].name === attrName) return true;
    }
    return false;
  }
  /**
   * Get current node's sibling position (child index in parent).
   * @returns {number}
   */
  getPosition() {
    if (this.path.length === 0) return -1;
    return this.path[this.path.length - 1].position ?? 0;
  }
  /**
   * Get current node's repeat counter (occurrence count of this tag name).
   * @returns {number}
   */
  getCounter() {
    if (this.path.length === 0) return -1;
    return this.path[this.path.length - 1].counter ?? 0;
  }
  /**
   * Get current node's sibling index (alias for getPosition).
   * @returns {number}
   * @deprecated Use getPosition() or getCounter() instead
   */
  getIndex() {
    return this.getPosition();
  }
  /**
   * Get current path depth.
   * @returns {number}
   */
  getDepth() {
    return this.path.length;
  }
  /**
   * Get path as string.
   * @param {string} [separator] - Optional separator (uses default if not provided)
   * @param {boolean} [includeNamespace=true]
   * @returns {string}
   */
  toString(separator, includeNamespace = true) {
    const sep2 = separator || this.separator;
    const isDefault = sep2 === this.separator && includeNamespace === true;
    if (isDefault) {
      if (this._pathStringCache !== null) {
        return this._pathStringCache;
      }
      const result = this.path.map(
        (n) => n.namespace ? `${n.namespace}:${n.tag}` : n.tag
      ).join(sep2);
      this._pathStringCache = result;
      return result;
    }
    return this.path.map(
      (n) => includeNamespace && n.namespace ? `${n.namespace}:${n.tag}` : n.tag
    ).join(sep2);
  }
  /**
   * Get path as array of tag names.
   * @returns {string[]}
   */
  toArray() {
    return this.path.map((n) => n.tag);
  }
  /**
   * Reset the path to empty.
   */
  reset() {
    this._pathStringCache = null;
    this.path = [];
    this.siblingStacks = [];
    this._keptAttrs = [];
  }
  /**
   * Match current path against an Expression.
   * @param {Expression} expression
   * @returns {boolean}
   */
  matches(expression) {
    const segments = expression.segments;
    if (segments.length === 0) {
      return false;
    }
    if (expression.hasDeepWildcard()) {
      return this._matchWithDeepWildcard(segments);
    }
    return this._matchSimple(segments);
  }
  /**
   * @private
   */
  _matchSimple(segments) {
    if (this.path.length !== segments.length) {
      return false;
    }
    for (let i = 0; i < segments.length; i++) {
      if (!this._matchSegment(segments[i], this.path[i], i === this.path.length - 1)) {
        return false;
      }
    }
    return true;
  }
  /**
   * @private
   */
  _matchWithDeepWildcard(segments) {
    let pathIdx = this.path.length - 1;
    let segIdx = segments.length - 1;
    while (segIdx >= 0 && pathIdx >= 0) {
      const segment = segments[segIdx];
      if (segment.type === "deep-wildcard") {
        segIdx--;
        if (segIdx < 0) {
          return true;
        }
        const nextSeg = segments[segIdx];
        let found = false;
        for (let i = pathIdx; i >= 0; i--) {
          if (this._matchSegment(nextSeg, this.path[i], i === this.path.length - 1)) {
            pathIdx = i - 1;
            segIdx--;
            found = true;
            break;
          }
        }
        if (!found) {
          return false;
        }
      } else {
        if (!this._matchSegment(segment, this.path[pathIdx], pathIdx === this.path.length - 1)) {
          return false;
        }
        pathIdx--;
        segIdx--;
      }
    }
    return segIdx < 0;
  }
  /**
   * @private
   */
  _matchSegment(segment, node, isCurrentNode) {
    if (segment.tag !== "*" && segment.tag !== node.tag) {
      return false;
    }
    if (segment.namespace !== void 0) {
      if (segment.namespace !== "*" && segment.namespace !== node.namespace) {
        return false;
      }
    }
    if (segment.attrName !== void 0) {
      if (!isCurrentNode) {
        return false;
      }
      if (!node.values || !(segment.attrName in node.values)) {
        return false;
      }
      if (segment.attrValue !== void 0) {
        if (String(node.values[segment.attrName]) !== String(segment.attrValue)) {
          return false;
        }
      }
    }
    if (segment.position !== void 0) {
      if (!isCurrentNode) {
        return false;
      }
      const counter = node.counter ?? 0;
      if (segment.position === "first" && counter !== 0) {
        return false;
      } else if (segment.position === "odd" && counter % 2 !== 1) {
        return false;
      } else if (segment.position === "even" && counter % 2 !== 0) {
        return false;
      } else if (segment.position === "nth" && counter !== segment.positionValue) {
        return false;
      }
    }
    return true;
  }
  /**
   * Match any expression in the given set against the current path.
   * @param {ExpressionSet} exprSet
   * @returns {boolean}
   */
  matchesAny(exprSet) {
    return exprSet.matchesAny(this);
  }
  /**
   * Create a snapshot of current state.
   * @returns {Object}
   */
  snapshot() {
    return {
      path: this.path.map((node) => ({ ...node })),
      siblingStacks: this.siblingStacks.map((level) => level ? { counts: new Map(level.counts), total: level.total } : level),
      keptAttrs: this._keptAttrs.map((entry) => ({ ...entry }))
    };
  }
  /**
   * Restore state from snapshot.
   * @param {Object} snapshot
   */
  restore(snapshot) {
    this._pathStringCache = null;
    this.path = snapshot.path.map((node) => ({ ...node }));
    this.siblingStacks = snapshot.siblingStacks.map((level) => level ? { counts: new Map(level.counts), total: level.total } : level);
    this._keptAttrs = (snapshot.keptAttrs || []).map((entry) => ({ ...entry }));
  }
  /**
   * Return the read-only {@link MatcherView} for this matcher.
   *
   * The same instance is returned on every call — no allocation occurs.
   * It always reflects the current parser state and is safe to pass to
   * user callbacks without risk of accidental mutation.
   *
   * @returns {MatcherView}
   *
   * @example
   * const view = matcher.readOnly();
   * // pass view to callbacks — it stays in sync automatically
   * view.matches(expr);       // ✓
   * view.getCurrentTag();     // ✓
   * // view.push(...)         // ✗ method does not exist — caught by TypeScript
   */
  readOnly() {
    return this._view;
  }
};

// ../../vscode/node_modules/is-unsafe/src/contexts/html.js
var HTML_PATTERNS = [
  {
    id: "html-script-open",
    description: "<script opening tag",
    pattern: /<script[\s>/]/i
  },
  {
    id: "html-script-close",
    description: "</script closing tag",
    pattern: /<\/script[\s>]/i
  },
  {
    id: "html-javascript-protocol",
    description: "javascript: URI scheme (with optional whitespace/encoding)",
    // Handles j&#x61;vascript:, j\u0061vascript:, and whitespace variants
    pattern: /j[\t\n\r ]*a[\t\n\r ]*v[\t\n\r ]*a[\t\n\r ]*s[\t\n\r ]*c[\t\n\r ]*r[\t\n\r ]*i[\t\n\r ]*p[\t\n\r ]*t[\t\n\r ]*:/i
  },
  {
    id: "html-vbscript-protocol",
    description: "vbscript: URI scheme",
    pattern: /vbscript[\t\n\r ]*:/i
  },
  {
    id: "html-data-html",
    description: "data:text/html URI \u2014 can execute scripts in browsers",
    pattern: /data[\t\n\r ]*:[\t\n\r ]*text\/html/i
  },
  {
    id: "html-data-xhtml",
    description: "data:application/xhtml+xml URI",
    pattern: /data[\t\n\r ]*:[\t\n\r ]*application\/xhtml/i
  },
  {
    id: "html-data-svg",
    description: "data:image/svg+xml URI \u2014 can execute scripts",
    pattern: /data[\t\n\r ]*:[\t\n\r ]*image\/svg\+xml/i
  },
  {
    id: "html-inline-event-handler",
    description: "Inline event handler attributes: onclick=, onerror=, onload=, etc.",
    // \bon ensures we match a word boundary so "phonetic=" is not caught
    pattern: /\bon\w{1,30}\s*=/i
  },
  {
    id: "html-entity-obfuscated-script",
    description: "HTML-entity-encoded <script (e.g. &#x3C;script or &lt;script)",
    // Entities include optional trailing semicolon: &#x3C; or &#x3C (both valid in HTML5)
    pattern: /(?:&#x0*3[Cc];?|&#0*60;?|&lt;)\s*script/i
  },
  {
    id: "html-entity-obfuscated-javascript",
    description: 'HTML-entity-encoded javascript: (partial \u2014 catches common &#106; or &#x6a; for "j")',
    pattern: /(?:&#x0*6[Aa];?|&#0*106;?)\s*(?:&#x0*61;?|a)[\s\S]{0,80}script\s*:/i
  },
  {
    id: "html-style-expression",
    description: "CSS expression() \u2014 IE-era code execution in style attributes",
    pattern: /style[\s\S]{0,20}expression\s*\(/i
  },
  {
    id: "html-object-embed",
    description: "<object or <embed tags that can load active content",
    pattern: /<(?:object|embed)[\s>/]/i
  },
  {
    id: "html-base-tag",
    description: "<base href= \u2014 can hijack all relative URLs on a page",
    pattern: /<base[\s>]/i
  },
  {
    id: "html-meta-refresh",
    description: '<meta http-equiv="refresh" \u2014 can redirect users',
    pattern: /<meta[\s\S]{0,40}http-equiv[\s\S]{0,20}refresh/i
  },
  {
    id: "html-srcdoc",
    description: "srcdoc= attribute on iframes \u2014 embeds HTML that can run scripts",
    pattern: /srcdoc\s*=/i
  },
  {
    id: "html-iframe",
    description: "<iframe tag",
    pattern: /<iframe[\s>/]/i
  },
  {
    id: "html-form",
    description: "<form tag \u2014 can be used for phishing / credential harvesting injection",
    pattern: /<form[\s>/]/i
  }
];
var html_default = HTML_PATTERNS;

// ../../vscode/node_modules/is-unsafe/src/contexts/xml.js
var XML_PATTERNS = [
  {
    id: "xml-cdata-injection",
    description: "CDATA section injection: <![CDATA[ breaks out of text node context",
    pattern: /<!\[CDATA\[/i
  },
  {
    id: "xml-cdata-close",
    description: "CDATA close sequence: ]]> can terminate an enclosing CDATA section",
    pattern: /\]\]>/
  },
  {
    id: "xml-processing-instruction",
    description: "XML processing instruction: <?xml-stylesheet or <?php etc.",
    pattern: /<\?(?:xml[\- ]|php|asp)/i
  },
  {
    id: "xml-doctype-injection",
    description: "DOCTYPE declaration embedded in content \u2014 can define entities",
    // Match <!DOCTYPE followed by end-of-string, whitespace, or [ (internal subset)
    pattern: /<!DOCTYPE(?:[\s[]|$)/i
  },
  {
    id: "xml-entity-system",
    description: "SYSTEM keyword \u2014 used in external entity declarations (XXE)",
    pattern: /\bSYSTEM\s+["']/i
  },
  {
    id: "xml-entity-public",
    description: "PUBLIC keyword \u2014 used in external entity declarations (XXE)",
    pattern: /\bPUBLIC\s+["']/i
  },
  {
    id: "xml-entity-declaration",
    description: "<!ENTITY declaration \u2014 defines entities, potential XXE or entity expansion",
    pattern: /<!ENTITY[\s%]/i
  },
  {
    id: "xml-billion-laughs",
    description: "Entity reference chaining / billion laughs: repeated &eX; style references",
    // Heuristic: 3+ consecutive entity refs suggests expansion attack
    pattern: /(?:&\w{1,20};){3,}/
  },
  {
    id: "xml-namespace-confusion",
    description: "xmlns: attribute injection \u2014 can redefine namespaces to confuse parsers",
    pattern: /\bxmlns\s*(?::\w{1,40})?\s*=/i
  },
  {
    id: "xml-comment-injection",
    description: "<!-- comment injection \u2014 can hide content from some parsers",
    pattern: /<!--/
  },
  {
    id: "xml-comment-close",
    description: "--> closes an enclosing XML comment",
    pattern: /-->/
  },
  {
    id: "xml-pi-close",
    description: "?> closes an enclosing processing instruction",
    pattern: /\?>/
  }
];
var xml_default = XML_PATTERNS;

// ../../vscode/node_modules/is-unsafe/src/contexts/svg.js
var SVG_PATTERNS = [
  {
    id: "svg-script-element",
    description: "<script element inside SVG executes JavaScript",
    pattern: /<script[\s>/]/i
  },
  {
    id: "svg-xlink-href-javascript",
    description: "xlink:href with javascript: \u2014 classic SVG XSS via <a> or <use>",
    pattern: /xlink\s*:\s*href\s*=\s*["']?\s*javascript\s*:/i
  },
  {
    id: "svg-href-javascript",
    description: "href= with javascript: in SVG context (<a>, <animate>, etc.)",
    pattern: /href\s*=\s*["']?\s*javascript\s*:/i
  },
  {
    id: "svg-foreignobject",
    description: "<foreignObject embeds HTML inside SVG \u2014 can execute scripts",
    pattern: /<foreignObject[\s>/]/i
  },
  {
    id: "svg-use-external",
    description: "<use xlink:href or href pointing to external resource (non-fragment URL)",
    // Match <use with href= where the value starts with a non-# character (external URL)
    // [\"'][^#] catches quoted values not starting with #; [^\"'#\s>] catches unquoted
    pattern: /<use[\s\S]{0,60}(?:xlink\s*:\s*)?href\s*=\s*(?:["'][^#]|[^"'#\s>])/i
  },
  {
    id: "svg-animate-href",
    description: '<animate attributeName="href" \u2014 can dynamically change href to javascript:',
    pattern: /<animate[\s\S]{0,80}attributeName\s*=\s*["'][\s]*href["']/i
  },
  {
    id: "svg-animate-xlinkhref",
    description: '<animate attributeName="xlink:href"',
    pattern: /<animate[\s\S]{0,80}attributeName\s*=\s*["'][\s]*xlink\s*:\s*href["']/i
  },
  {
    id: "svg-set-javascript",
    description: '<set to="javascript:..." \u2014 sets an attribute to a javascript: URI',
    pattern: /<set[\s\S]{0,80}to\s*=\s*["']?\s*javascript\s*:/i
  },
  {
    id: "svg-event-handler",
    description: "SVG-specific event handler attributes: onload=, onerror=, onactivate=, etc.",
    pattern: /\bon(?:load|error|activate|begin|end|repeat|focus|blur|click|mouse\w{1,20}|key\w{1,20})\s*=/i
  },
  {
    id: "svg-handler-generic",
    description: "Generic on* handler catch-all for SVG attributes",
    pattern: /\bon\w{1,30}\s*=/i
  },
  {
    id: "svg-filter-feimage",
    description: "<feImage href= \u2014 filter primitive that can load external resources",
    pattern: /<feImage[\s\S]{0,80}(?:xlink\s*:\s*)?href\s*=/i
  },
  {
    id: "svg-image-external",
    description: "<image xlink:href with http/https or javascript protocol",
    pattern: /<image[\s\S]{0,80}(?:xlink\s*:\s*)?href\s*=\s*["']?\s*(?:https?|javascript)\s*:/i
  },
  {
    id: "svg-style-javascript",
    description: "style= attribute containing javascript: (e.g. background:url(javascript:...))",
    pattern: /style\s*=[\s\S]{0,60}javascript\s*:/i
  }
];
var svg_default = SVG_PATTERNS;

// ../../vscode/node_modules/is-unsafe/src/contexts/sql.js
var SQL_PATTERNS = [
  {
    id: "sql-block-comment-open",
    description: "SQL block comment open: /* ... */ \u2014 unusual in legitimate user text",
    pattern: /\/\*/
  },
  {
    id: "sql-union-select",
    description: "UNION SELECT \u2014 most common SQL injection aggregation attack",
    pattern: /\bUNION\s{1,20}(?:ALL\s{1,20})?SELECT\b/i
  },
  {
    id: "sql-drop-table",
    description: "DROP TABLE \u2014 destructive DDL injection",
    pattern: /\bDROP\s{1,20}TABLE\b/i
  },
  {
    id: "sql-drop-database",
    description: "DROP DATABASE \u2014 destructive DDL injection",
    pattern: /\bDROP\s{1,20}DATABASE\b/i
  },
  {
    id: "sql-insert-into",
    description: "INSERT INTO \u2014 data injection",
    pattern: /\bINSERT\s{1,20}INTO\b/i
  },
  {
    id: "sql-delete-from",
    description: "DELETE FROM \u2014 data deletion injection",
    pattern: /\bDELETE\s{1,20}FROM\b/i
  },
  {
    id: "sql-update-set",
    description: "UPDATE ... SET \u2014 data modification injection",
    // Allows arbitrary content between UPDATE and SET (table name, alias, etc.)
    pattern: /\bUPDATE\b[\s\S]{1,60}\bSET\b/i
  },
  {
    id: "sql-exec-xp",
    description: "EXEC xp_ \u2014 MSSQL extended stored procedure execution",
    pattern: /\bEXEC(?:UTE)?\s{1,20}xp_/i
  },
  {
    id: "sql-tautology-string",
    description: `Classic string tautology: ' OR '1'='1 or " OR "1"="1"`,
    // Last quote is optional — injection may truncate it: ' OR '1'='1--
    pattern: /'\s{0,10}OR\s{0,10}'[^']{0,20}'\s*=\s*'[^']{0,20}/i
  },
  {
    id: "sql-tautology-numeric",
    description: "Numeric tautology: OR 1=1",
    pattern: /\bOR\s{1,10}1\s*=\s*1\b/i
  },
  {
    id: "sql-always-true-zero",
    description: "Numeric tautology: OR 0=0",
    pattern: /\bOR\s{1,10}0\s*=\s*0\b/i
  },
  {
    id: "sql-sleep-benchmark",
    description: "Time-based blind injection: SLEEP() or BENCHMARK()",
    pattern: /\b(?:SLEEP|BENCHMARK)\s*\(/i
  },
  {
    id: "sql-waitfor-delay",
    description: "MSSQL time-based blind injection: WAITFOR DELAY",
    pattern: /\bWAITFOR\s{1,20}DELAY\b/i
  },
  {
    id: "sql-char-function",
    description: "CHAR() function \u2014 used to obfuscate injected strings",
    pattern: /\bCHAR\s*\(\s*\d{1,3}/i
  },
  {
    id: "sql-information-schema",
    description: "INFORMATION_SCHEMA \u2014 reconnaissance query for table/column enumeration",
    pattern: /\bINFORMATION_SCHEMA\b/i
  }
];
var sql_default = SQL_PATTERNS;

// ../../vscode/node_modules/is-unsafe/src/contexts/shell.js
var SHELL_PATTERNS = [
  {
    id: "shell-path-traversal-unix",
    description: "Unix path traversal: ../  \u2014 climbing the directory tree",
    pattern: /\.\.\//
  },
  {
    id: "shell-path-traversal-windows",
    description: "Windows path traversal: ..\\ \u2014 climbing the directory tree",
    pattern: /\.\.\\/
  },
  {
    id: "shell-path-traversal-encoded",
    description: "URL-encoded path traversal: %2e%2e or %2f variants",
    pattern: /%2e%2e|%2f\.\.|\.\.%2f/i
  },
  {
    id: "shell-null-byte",
    description: "Null byte injection: \\x00 or %00 \u2014 truncates strings in C-backed functions",
    pattern: /\x00|%00/
  },
  {
    id: "shell-semicolon",
    description: "Semicolon command separator: cmd1; cmd2",
    pattern: /;/
  },
  {
    id: "shell-pipe",
    description: "Pipe operator: cmd1 | cmd2",
    pattern: /\|/
  },
  {
    id: "shell-and-operator",
    description: "AND operator: cmd1 && cmd2",
    pattern: /&&/
  },
  {
    id: "shell-or-operator",
    description: "OR operator: cmd1 || cmd2",
    pattern: /\|\|/
  },
  {
    id: "shell-backtick",
    description: "Backtick command substitution: `cmd`",
    pattern: /`/
  },
  {
    id: "shell-dollar-paren",
    description: "Dollar-paren command substitution: $(cmd)",
    pattern: /\$\(/
  },
  {
    id: "shell-dollar-brace",
    description: "Dollar-brace variable expansion: ${var} \u2014 can be abused for injection",
    pattern: /\$\{/
  },
  {
    id: "shell-redirect-out",
    description: "Output redirection: cmd > file or cmd >> file",
    pattern: />{1,2}/
  },
  {
    id: "shell-redirect-in",
    description: "Input redirection: cmd < file",
    pattern: /</
  },
  {
    id: "shell-newline-injection",
    description: "Newline injection: \\n or \\r \u2014 can inject new shell commands",
    pattern: /[\n\r]/
  },
  {
    id: "shell-glob-star",
    description: "Glob expansion: * or ? \u2014 can expand to unintended files",
    // Only flag when combined with path separators to reduce false positives
    pattern: /[/\\][*?]/
  },
  {
    id: "shell-absolute-root",
    description: "Absolute root path injection: string starting with / or \\ (Windows UNC)",
    pattern: /^(?:\/|\\\\)/
  },
  {
    id: "shell-windows-drive",
    description: "Windows drive letter path injection: C:\\ or D:/",
    pattern: /^[a-zA-Z]:[/\\]/
  },
  {
    id: "shell-curl-wget",
    description: "curl/wget with URL or flags \u2014 can exfiltrate data or download payloads",
    // Require a URL scheme (http/https/ftp) or a flag (-) to reduce false positives
    // "curl is a tool" won't match; "curl http://..." or "curl -s ..." will
    pattern: /\b(?:curl|wget)\s+(?:https?:\/\/|ftp:\/\/|-)/i
  }
];
var shell_default = SHELL_PATTERNS;

// ../../vscode/node_modules/is-unsafe/src/contexts/redos.js
var REDOS_PATTERNS = [
  {
    id: "redos-nested-quantifier-plus",
    description: "Nested + quantifier inside a group with outer quantifier: (a+)+, (.+b)*, etc.",
    // Matches any group containing a + quantifier, with an outer * or + — catches (a+)+, (.+b)*, etc.
    pattern: /\([^)]*\+[^)]*\)[+*]/
  },
  {
    id: "redos-nested-quantifier-star",
    description: "Nested * quantifier: (a*)* or (a*)+ \u2014 catastrophic backtracking",
    pattern: /\([^)]*\*[^)]*\)[*+]/
  },
  {
    id: "redos-nested-groups",
    description: "Doubly nested quantified groups: ((a+)+) \u2014 guaranteed catastrophic",
    pattern: /\(\([^)]{0,40}\)[+*]\)[+*]/
  },
  {
    id: "redos-alternation-overlap",
    description: "Overlapping alternation under quantifier: (a|a)+ \u2014 ambiguous NFA paths",
    // Detect repeated identical alternatives under a quantifier
    pattern: /\(([^|()]{1,20})\|(?:\1)(?:\|[^|()]{1,20}){0,5}\)[+*?]{1,2}/
  },
  {
    id: "redos-star-plus-concat",
    description: "(x*x)+ pattern \u2014 triggers super-linear backtracking",
    pattern: /\([^)]{0,10}\*[^)]{0,10}\)[+*]/
  },
  {
    id: "redos-dot-star-greedy",
    description: "(.*){n,} or (.+){n,} \u2014 repeated greedy dot quantifiers",
    pattern: /\(\.[*+]\)\{?\d/
  },
  {
    id: "redos-large-repetition",
    description: "Very large fixed or range repetition count {1000,} or {1000,n} \u2014 denial of service via backtracking",
    // Matches { followed by 4+ digits (≥1000), then optional ,digits }
    pattern: /\{\d{4,}(?:,\d*)?\}/
  },
  {
    id: "redos-catastrophic-alternation",
    description: "Long alternation with many similar branches \u2014 polynomial backtracking risk",
    // Heuristic: 10+ pipe-separated alternatives in a single group
    pattern: /\([^)]{0,200}(?:\|[^|)]{0,50}){9,}\)/
  }
];
var redos_default = REDOS_PATTERNS;

// ../../vscode/node_modules/is-unsafe/src/contexts/nosql.js
var sep = `["'\\s]*:`;
var NOSQL_PATTERNS = [
  // ─── MongoDB $ operator injection ────────────────────────────────────────
  {
    id: "nosql-where-operator",
    description: "$where \u2014 executes arbitrary JavaScript server-side in MongoDB",
    pattern: new RegExp(`\\$where${sep}`, "i")
  },
  {
    id: "nosql-ne-operator",
    description: '$ne \u2014 "not equal" operator used to bypass equality checks',
    pattern: new RegExp(`\\$ne${sep}`, "i")
  },
  {
    id: "nosql-gt-operator",
    description: '$gt \u2014 "greater than" used to bypass password/value checks',
    pattern: new RegExp(`\\$gte?${sep}`, "i")
  },
  {
    id: "nosql-lt-operator",
    description: '$lt / $lte \u2014 "less than" bypass variants',
    pattern: new RegExp(`\\$lte?${sep}`, "i")
  },
  {
    id: "nosql-regex-operator",
    description: "$regex \u2014 can be used to extract data character by character (blind injection)",
    pattern: new RegExp(`\\$regex${sep}`, "i")
  },
  {
    id: "nosql-or-operator",
    description: "$or \u2014 logical OR; used to create always-true conditions",
    pattern: new RegExp(`\\$or${sep}\\s*\\[`, "i")
  },
  {
    id: "nosql-and-operator",
    description: "$and \u2014 logical AND operator injection",
    pattern: new RegExp(`\\$and${sep}\\s*\\[`, "i")
  },
  {
    id: "nosql-nor-operator",
    description: "$nor \u2014 logical NOR operator injection",
    pattern: new RegExp(`\\$nor${sep}\\s*\\[`, "i")
  },
  {
    id: "nosql-exists-operator",
    description: "$exists \u2014 can enumerate fields to determine schema",
    pattern: new RegExp(`\\$exists${sep}`, "i")
  },
  {
    id: "nosql-in-operator",
    description: "$in \u2014 matches any value in a list; can enumerate values",
    pattern: new RegExp(`\\$in${sep}\\s*\\[`, "i")
  },
  {
    id: "nosql-expr-operator",
    description: "$expr \u2014 allows aggregation expressions in queries (MongoDB 3.6+)",
    pattern: new RegExp(`\\$expr${sep}`, "i")
  },
  {
    id: "nosql-function-operator",
    description: "$function \u2014 executes arbitrary JavaScript in MongoDB 4.4+",
    pattern: new RegExp(`\\$function${sep}`, "i")
  },
  {
    id: "nosql-accumulator-operator",
    description: "$accumulator \u2014 custom aggregation with arbitrary JS execution",
    pattern: new RegExp(`\\$accumulator${sep}`, "i")
  },
  // ─── Prototype pollution ─────────────────────────────────────────────────
  {
    id: "nosql-proto-pollution",
    description: "__proto__ \u2014 prototype pollution via object key injection",
    pattern: /__proto__/
  },
  {
    id: "nosql-constructor-prototype",
    description: "constructor.prototype \u2014 alternative prototype pollution vector (dot notation or JSON key)",
    // Matches dot-notation (obj.constructor.prototype) and JSON key adjacency
    // ("constructor": {"prototype": ...})
    pattern: /constructor[\s"':.,{\[]*prototype/i
  },
  {
    id: "nosql-proto-bracket",
    description: '["__proto__"] \u2014 bracket-notation prototype pollution',
    pattern: /\[["']__proto__["']\]/
  }
];
var nosql_default = NOSQL_PATTERNS;

// ../../vscode/node_modules/is-unsafe/src/contexts/log.js
var LOG_PATTERNS = [
  // ─── CRLF / newline injection ─────────────────────────────────────────────
  {
    id: "log-crlf-injection",
    description: "CRLF injection: literal \\r or \\n embeds fake log lines",
    pattern: /[\r\n]/
  },
  {
    id: "log-url-encoded-crlf",
    description: "URL-encoded CRLF: %0d, %0a, %0D, %0A \u2014 decoded by some log parsers",
    pattern: /%0[dDaA]/
  },
  {
    id: "log-unicode-newline",
    description: "Unicode newline variants: U+2028 (line separator), U+2029 (paragraph separator)",
    pattern: /[\u2028\u2029]/
  },
  // ─── Log4Shell / JNDI injection (CVE-2021-44228) ─────────────────────────
  {
    id: "log-log4shell-jndi",
    description: "Log4Shell: ${jndi:...} triggers remote code execution in Apache Log4j",
    pattern: /\$\{jndi\s*:/i
  },
  {
    id: "log-log4shell-obfuscated",
    description: "Obfuscated Log4Shell: ${::-j}... lookup-bypass prefix used to evade WAF detection",
    // ${::- is the Log4j lookup-bypass escape sequence; presence alone is suspicious
    pattern: /\$\{::-/
  },
  {
    id: "log-log4j-lookup",
    description: "Log4j lookup syntax: ${env:...}, ${sys:...}, ${ctx:...} \u2014 data exfiltration",
    pattern: /\$\{(?:env|sys|ctx|main|map|sd|web|docker|k8s|spring)\s*:/i
  },
  // ─── Server-Side Template Injection (SSTI) in log messages ───────────────
  {
    id: "log-ssti-double-brace",
    description: "SSTI double-brace: {{expression}} \u2014 Jinja2, Twig, Handlebars, etc.",
    pattern: /\{\{[\s\S]{0,80}\}\}/
  },
  {
    id: "log-ssti-hash-brace",
    description: "SSTI hash-brace: #{expression} \u2014 Thymeleaf, Velocity, Ruby ERB",
    pattern: /#\{[\s\S]{0,80}\}/
  },
  {
    id: "log-ssti-dollar-brace",
    description: "SSTI/EL injection: ${expression with operators or method calls} \u2014 JSP EL, Freemarker, SpEL",
    // Require that the ${...} content looks like an expression, not a plain variable name.
    // Flags if the content contains: . ( * + operators, or known SSTI keywords.
    // This avoids flagging ${PATH}, ${HOME} etc. (plain shell variables).
    pattern: /\$\{[^}]*(?:\.|\(|\*|\+|\bclass\b|\bruntime\b|\bprocess\b|\bexec\b)[^}]{0,80}\}/i
  },
  {
    id: "log-ssti-percent-tag",
    description: "SSTI ERB/ASP tag: <%= expression %> \u2014 Ruby ERB, ASP",
    pattern: /<%=[\s\S]{0,80}%>/
  },
  // ─── Null byte ────────────────────────────────────────────────────────────
  {
    id: "log-null-byte",
    description: "Null byte: \\x00 or %00 \u2014 can truncate log entries in C-backed loggers",
    pattern: /\x00|%00/
  },
  // ─── ANSI escape injection ────────────────────────────────────────────────
  {
    id: "log-ansi-escape",
    description: "ANSI escape sequence: ESC[ \u2014 can manipulate terminal output when logs are tailed",
    pattern: /\x1b\[/
  }
];
var log_default = LOG_PATTERNS;

// ../../vscode/node_modules/is-unsafe/src/contexts/sql-strict.js
var SQL_STRICT_EXTRA = [
  {
    id: "sql-line-comment",
    description: "SQL line comment: -- followed by whitespace or end of string",
    pattern: /--(?:\s|$)/
  },
  {
    id: "sql-stacked-query",
    description: "Stacked queries: semicolon immediately followed by a SQL keyword",
    pattern: /;\s{0,10}(?:SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC)\b/i
  },
  {
    id: "sql-hex-encoding",
    description: "Hex-encoded string injection: 0x41414141 style (MySQL)",
    pattern: /\b0x[0-9a-f]{4,}/i
  }
];
var SQL_STRICT_PATTERNS = [...sql_default, ...SQL_STRICT_EXTRA];
var sql_strict_default = SQL_STRICT_PATTERNS;

// ../../vscode/node_modules/is-unsafe/src/index.js
html_default.label = "HTML";
xml_default.label = "XML";
svg_default.label = "SVG";
sql_default.label = "SQL";
sql_strict_default.label = "SQL-STRICT";
shell_default.label = "SHELL";
redos_default.label = "REDOS";
nosql_default.label = "NOSQL";
log_default.label = "LOG";
var VALID_CONTEXTS = Object.freeze({
  HTML: html_default,
  XML: xml_default,
  SVG: svg_default,
  SQL: sql_default,
  "SQL-STRICT": sql_strict_default,
  SHELL: shell_default,
  REDOS: redos_default,
  NOSQL: nosql_default,
  LOG: log_default
});
function assertString(value) {
  if (typeof value !== "string") {
    throw new TypeError(
      `is-unsafe: first argument must be a string, got ${typeof value}`
    );
  }
}
function assertContext(context) {
  if (context instanceof RegExp) return;
  if (Array.isArray(context)) {
    if (context.length === 0) {
      throw new TypeError("is-unsafe: context must not be an empty array");
    }
    if (Array.isArray(context[0])) {
      for (const list of context) {
        if (!Array.isArray(list) || list.length === 0) {
          throw new TypeError(
            "is-unsafe: each context in the array must be a non-empty pattern array (PatternList)"
          );
        }
      }
    }
    return;
  }
  throw new TypeError(
    `is-unsafe: second argument must be a PatternList (e.g. HTML), an array of PatternLists (e.g. [HTML, XML]), or a RegExp. Got: ${typeof context}`
  );
}
function normalise(context) {
  if (context instanceof RegExp) return { lists: null, regex: context };
  if (Array.isArray(context[0])) return { lists: context, regex: null };
  return { lists: [context], regex: null };
}
function matchList(value, list) {
  const label = list.label ?? "CUSTOM";
  for (const rule of list) {
    if (rule.pattern.test(value)) {
      return { context: label, id: rule.id, description: rule.description, pattern: rule.pattern };
    }
  }
  return null;
}
function isUnsafe(value, context) {
  assertString(value);
  assertContext(context);
  const { lists, regex } = normalise(context);
  if (regex) return regex.test(value);
  for (const list of lists) {
    if (matchList(value, list) !== null) return true;
  }
  return false;
}

// ../../vscode/node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
function extractRawAttributes(prefixedAttrs, options) {
  if (!prefixedAttrs) return {};
  const attrs = options.attributesGroupName ? prefixedAttrs[options.attributesGroupName] : prefixedAttrs;
  if (!attrs) return {};
  const rawAttrs = {};
  for (const key in attrs) {
    if (key.startsWith(options.attributeNamePrefix)) {
      const rawName = key.substring(options.attributeNamePrefix.length);
      rawAttrs[rawName] = attrs[key];
    } else {
      rawAttrs[key] = attrs[key];
    }
  }
  return rawAttrs;
}
function extractNamespace(rawTagName) {
  if (!rawTagName || typeof rawTagName !== "string") return void 0;
  const colonIndex = rawTagName.indexOf(":");
  if (colonIndex !== -1 && colonIndex > 0) {
    const ns = rawTagName.substring(0, colonIndex);
    if (ns !== "xmlns") {
      return ns;
    }
  }
  return void 0;
}
var OrderedObjParser = class {
  constructor(options, externalEntities) {
    this.options = options;
    this.currentNode = null;
    this.tagsNodeStack = [];
    this.parseXml = parseXml;
    this.parseTextData = parseTextData;
    this.resolveNameSpace = resolveNameSpace;
    this.buildAttributesMap = buildAttributesMap;
    this.isItStopNode = isItStopNode;
    this.replaceEntitiesValue = replaceEntitiesValue;
    this.readStopNodeData = readStopNodeData;
    this.saveTextToParentTag = saveTextToParentTag;
    this.addChild = addChild;
    this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
    this.entityExpansionCount = 0;
    this.currentExpandedLength = 0;
    this.doctypefound = false;
    let namedEntities = { ...XML };
    if (this.options.entityDecoder) {
      this.entityDecoder = this.options.entityDecoder;
    } else {
      if (typeof this.options.htmlEntities === "object") namedEntities = this.options.htmlEntities;
      else if (this.options.htmlEntities === true) namedEntities = { ...COMMON_HTML, ...CURRENCY };
      this.entityDecoder = new EntityDecoder({
        namedEntities: { ...namedEntities, ...externalEntities },
        numericAllowed: this.options.htmlEntities,
        limit: {
          maxTotalExpansions: this.options.processEntities.maxTotalExpansions,
          maxExpandedLength: this.options.processEntities.maxExpandedLength,
          applyLimitsTo: this.options.processEntities.appliesTo
        },
        // onExternalEntity: (name, value) => isUnsafe(value) ? 'block' : 'allow',
        onInputEntity: (name, value) => (
          //TODO: VALID_CONTEXTS.HTML should be set only if this.options.htmlEntities
          isUnsafe(value, [html_default, xml_default]) ? ENTITY_ACTION.BLOCK : ENTITY_ACTION.ALLOW
        )
        //postCheck: resolved => resolved
      });
    }
    this.matcher = new Matcher();
    this.readonlyMatcher = this.matcher.readOnly();
    this.isCurrentNodeStopNode = false;
    this.stopNodeExpressionsSet = new ExpressionSet();
    const stopNodesOpts = this.options.stopNodes;
    if (stopNodesOpts && stopNodesOpts.length > 0) {
      for (let i = 0; i < stopNodesOpts.length; i++) {
        const stopNodeExp = stopNodesOpts[i];
        if (typeof stopNodeExp === "string") {
          this.stopNodeExpressionsSet.add(new Expression(stopNodeExp));
        } else if (stopNodeExp instanceof Expression) {
          this.stopNodeExpressionsSet.add(stopNodeExp);
        }
      }
      this.stopNodeExpressionsSet.seal();
    }
  }
};
function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
  const options = this.options;
  if (val !== void 0) {
    if (options.trimValues && !dontTrim) {
      val = val.trim();
    }
    if (val.length > 0) {
      if (!escapeEntities) val = this.replaceEntitiesValue(val, tagName, jPath);
      const jPathOrMatcher = options.jPath ? jPath.toString() : jPath;
      const newval = options.tagValueProcessor(tagName, val, jPathOrMatcher, hasAttributes, isLeafNode);
      if (newval === null || newval === void 0) {
        return val;
      } else if (typeof newval !== typeof val || newval !== val) {
        return newval;
      } else if (options.trimValues) {
        return parseValue(val, options.parseTagValue, options.numberParseOptions);
      } else {
        const trimmedVal = val.trim();
        if (trimmedVal === val) {
          return parseValue(val, options.parseTagValue, options.numberParseOptions);
        } else {
          return val;
        }
      }
    }
  }
}
function resolveNameSpace(tagname) {
  if (this.options.removeNSPrefix) {
    const tags = tagname.split(":");
    const prefix = tagname.charAt(0) === "/" ? "/" : "";
    if (tags[0] === "xmlns") {
      return "";
    }
    if (tags.length === 2) {
      tagname = prefix + tags[1];
    }
  }
  return tagname;
}
var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
function buildAttributesMap(attrStr, jPath, tagName, force = false) {
  const options = this.options;
  if (force === true || options.ignoreAttributes !== true && typeof attrStr === "string") {
    const matches = getAllMatches(attrStr, attrsRegx);
    const len = matches.length;
    const attrs = {};
    const processedVals = new Array(len);
    let hasRawAttrs = false;
    const rawAttrsForMatcher = {};
    for (let i = 0; i < len; i++) {
      const attrName = this.resolveNameSpace(matches[i][1]);
      const oldVal = matches[i][4];
      if (attrName.length && oldVal !== void 0) {
        let val = oldVal;
        if (options.trimValues) val = val.trim();
        val = this.replaceEntitiesValue(val, tagName, this.readonlyMatcher);
        processedVals[i] = val;
        rawAttrsForMatcher[attrName] = val;
        hasRawAttrs = true;
      }
    }
    if (hasRawAttrs && typeof jPath === "object" && jPath.updateCurrent) {
      jPath.updateCurrent(rawAttrsForMatcher);
    }
    const jPathStr = options.jPath ? jPath.toString() : this.readonlyMatcher;
    let hasAttrs = false;
    for (let i = 0; i < len; i++) {
      const attrName = this.resolveNameSpace(matches[i][1]);
      if (this.ignoreAttributesFn(attrName, jPathStr)) continue;
      let aName = options.attributeNamePrefix + attrName;
      if (attrName.length) {
        if (options.transformAttributeName) {
          aName = options.transformAttributeName(aName);
        }
        aName = sanitizeName(aName, options);
        if (matches[i][4] !== void 0) {
          const oldVal = processedVals[i];
          const newVal = options.attributeValueProcessor(attrName, oldVal, jPathStr);
          if (newVal === null || newVal === void 0) {
            attrs[aName] = oldVal;
          } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
            attrs[aName] = newVal;
          } else {
            attrs[aName] = parseValue(oldVal, options.parseAttributeValue, options.numberParseOptions);
          }
          hasAttrs = true;
        } else if (options.allowBooleanAttributes) {
          attrs[aName] = true;
          hasAttrs = true;
        }
      }
    }
    if (!hasAttrs) return;
    if (options.attributesGroupName && !options.preserveOrder) {
      const attrCollection = {};
      attrCollection[options.attributesGroupName] = attrs;
      return attrCollection;
    }
    return attrs;
  }
}
var parseXml = function(xmlData) {
  xmlData = xmlData.replace(/\r\n?/g, "\n");
  const xmlObj = new XmlNode("!xml");
  let currentNode = xmlObj;
  let textData = "";
  this.matcher.reset();
  this.entityDecoder.reset();
  this.entityExpansionCount = 0;
  this.currentExpandedLength = 0;
  this.doctypefound = false;
  const options = this.options;
  const docTypeReader = new DocTypeReader(options.processEntities);
  const xmlLen = xmlData.length;
  for (let i = 0; i < xmlLen; i++) {
    const ch = xmlData[i];
    if (ch === "<") {
      const c1 = xmlData.charCodeAt(i + 1);
      if (c1 === 47) {
        const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
        let tagName = xmlData.substring(i + 2, closeIndex).trim();
        if (options.removeNSPrefix) {
          const colonIndex = tagName.indexOf(":");
          if (colonIndex !== -1) {
            tagName = tagName.substr(colonIndex + 1);
          }
        }
        tagName = transformTagName(options.transformTagName, tagName, "", options).tagName;
        if (currentNode) {
          textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
        }
        const lastTagName = this.matcher.getCurrentTag();
        if (tagName && options.unpairedTagsSet.has(tagName)) {
          throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
        }
        if (lastTagName && options.unpairedTagsSet.has(lastTagName)) {
          this.matcher.pop();
          this.tagsNodeStack.pop();
        }
        this.matcher.pop();
        this.isCurrentNodeStopNode = false;
        currentNode = this.tagsNodeStack.pop();
        textData = "";
        i = closeIndex;
      } else if (c1 === 63) {
        let tagData = readTagExp(xmlData, i, false, "?>");
        if (!tagData) throw new Error("Pi Tag is not closed.");
        textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
        const attsMap = this.buildAttributesMap(tagData.tagExp, this.matcher, tagData.tagName, true);
        if (attsMap) {
          const ver = attsMap[this.options.attributeNamePrefix + "version"];
          this.entityDecoder.setXmlVersion(Number(ver) || 1);
          docTypeReader.setXmlVersion(Number(ver) || 1);
        }
        if (options.ignoreDeclaration && tagData.tagName === "?xml" || options.ignorePiTags) {
        } else {
          const childNode = new XmlNode(tagData.tagName);
          childNode.add(options.textNodeName, "");
          if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent && options.ignoreAttributes !== true) {
            childNode[":@"] = attsMap;
          }
          this.addChild(currentNode, childNode, this.readonlyMatcher, i);
        }
        i = tagData.closeIndex + 1;
      } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 45 && xmlData.charCodeAt(i + 3) === 45) {
        const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
        if (options.commentPropName) {
          const comment = xmlData.substring(i + 4, endIndex - 2);
          textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
          currentNode.add(options.commentPropName, [{ [options.textNodeName]: comment }]);
        }
        i = endIndex;
      } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 68) {
        if (this.doctypefound) throw new Error("Multiple DOCTYPE declarations found.");
        this.doctypefound = true;
        const result = docTypeReader.readDocType(xmlData, i);
        this.entityDecoder.addInputEntities(result.entities);
        i = result.i;
      } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 91) {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
        const tagExp = xmlData.substring(i + 9, closeIndex);
        textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
        let val = this.parseTextData(tagExp, currentNode.tagname, this.readonlyMatcher, true, false, true, true);
        if (val == void 0) val = "";
        if (options.cdataPropName) {
          currentNode.add(options.cdataPropName, [{ [options.textNodeName]: tagExp }]);
        } else {
          currentNode.add(options.textNodeName, val);
        }
        i = closeIndex + 2;
      } else {
        let result = readTagExp(xmlData, i, options.removeNSPrefix);
        if (!result) {
          const context = xmlData.substring(Math.max(0, i - 50), Math.min(xmlLen, i + 50));
          throw new Error(`readTagExp returned undefined at position ${i}. Context: "${context}"`);
        }
        let tagName = result.tagName;
        const rawTagName = result.rawTagName;
        let tagExp = result.tagExp;
        let attrExpPresent = result.attrExpPresent;
        let closeIndex = result.closeIndex;
        ({ tagName, tagExp } = transformTagName(options.transformTagName, tagName, tagExp, options));
        if (options.strictReservedNames && (tagName === options.commentPropName || tagName === options.cdataPropName || tagName === options.textNodeName || tagName === options.attributesGroupName)) {
          throw new Error(`Invalid tag name: ${tagName}`);
        }
        if (currentNode && textData) {
          if (currentNode.tagname !== "!xml") {
            textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher, false);
          }
        }
        const lastTag = currentNode;
        if (lastTag && options.unpairedTagsSet.has(lastTag.tagname)) {
          currentNode = this.tagsNodeStack.pop();
          this.matcher.pop();
        }
        let isSelfClosing = false;
        if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
          isSelfClosing = true;
          if (tagName[tagName.length - 1] === "/") {
            tagName = tagName.substr(0, tagName.length - 1);
            tagExp = tagName;
          } else {
            tagExp = tagExp.substr(0, tagExp.length - 1);
          }
          attrExpPresent = tagName !== tagExp;
        }
        let prefixedAttrs = null;
        let rawAttrs = {};
        let namespace = void 0;
        namespace = extractNamespace(rawTagName);
        if (tagName !== xmlObj.tagname) {
          this.matcher.push(tagName, {}, namespace);
        }
        if (tagName !== tagExp && attrExpPresent) {
          prefixedAttrs = this.buildAttributesMap(tagExp, this.matcher, tagName);
          if (prefixedAttrs) {
            rawAttrs = extractRawAttributes(prefixedAttrs, options);
          }
        }
        if (tagName !== xmlObj.tagname) {
          this.isCurrentNodeStopNode = this.isItStopNode();
        }
        const startIndex = i;
        if (this.isCurrentNodeStopNode) {
          let tagContent = "";
          if (isSelfClosing) {
            i = result.closeIndex;
          } else if (options.unpairedTagsSet.has(tagName)) {
            i = result.closeIndex;
          } else {
            const result2 = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
            if (!result2) throw new Error(`Unexpected end of ${rawTagName}`);
            i = result2.i;
            tagContent = result2.tagContent;
          }
          const childNode = new XmlNode(tagName);
          if (prefixedAttrs) {
            childNode[":@"] = prefixedAttrs;
          }
          childNode.add(options.textNodeName, tagContent);
          this.matcher.pop();
          this.isCurrentNodeStopNode = false;
          this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
        } else {
          if (isSelfClosing) {
            ({ tagName, tagExp } = transformTagName(options.transformTagName, tagName, tagExp, options));
            const childNode = new XmlNode(tagName);
            if (prefixedAttrs) {
              childNode[":@"] = prefixedAttrs;
            }
            this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
            this.matcher.pop();
            this.isCurrentNodeStopNode = false;
          } else if (options.unpairedTagsSet.has(tagName)) {
            const childNode = new XmlNode(tagName);
            if (prefixedAttrs) {
              childNode[":@"] = prefixedAttrs;
            }
            this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
            this.matcher.pop();
            this.isCurrentNodeStopNode = false;
            i = result.closeIndex;
            continue;
          } else {
            const childNode = new XmlNode(tagName);
            if (this.tagsNodeStack.length > options.maxNestedTags) {
              throw new Error("Maximum nested tags exceeded");
            }
            this.tagsNodeStack.push(currentNode);
            if (prefixedAttrs) {
              childNode[":@"] = prefixedAttrs;
            }
            this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
            currentNode = childNode;
          }
          textData = "";
          i = closeIndex;
        }
      }
    } else {
      textData += xmlData[i];
    }
  }
  return xmlObj.child;
};
function addChild(currentNode, childNode, matcher, startIndex) {
  if (!this.options.captureMetaData) startIndex = void 0;
  const jPathOrMatcher = this.options.jPath ? matcher.toString() : matcher;
  const result = this.options.updateTag(childNode.tagname, jPathOrMatcher, childNode[":@"]);
  if (result === false) {
  } else if (typeof result === "string") {
    childNode.tagname = result;
    currentNode.addChild(childNode, startIndex);
  } else {
    currentNode.addChild(childNode, startIndex);
  }
}
function replaceEntitiesValue(val, tagName, jPath) {
  const entityConfig = this.options.processEntities;
  if (!entityConfig || !entityConfig.enabled) {
    return val;
  }
  if (entityConfig.allowedTags) {
    const jPathOrMatcher = this.options.jPath ? jPath.toString() : jPath;
    const allowed = Array.isArray(entityConfig.allowedTags) ? entityConfig.allowedTags.includes(tagName) : entityConfig.allowedTags(tagName, jPathOrMatcher);
    if (!allowed) {
      return val;
    }
  }
  if (entityConfig.tagFilter) {
    const jPathOrMatcher = this.options.jPath ? jPath.toString() : jPath;
    if (!entityConfig.tagFilter(tagName, jPathOrMatcher)) {
      return val;
    }
  }
  return this.entityDecoder.decode(val);
}
function saveTextToParentTag(textData, parentNode, matcher, isLeafNode) {
  if (textData) {
    if (isLeafNode === void 0) isLeafNode = parentNode.child.length === 0;
    textData = this.parseTextData(
      textData,
      parentNode.tagname,
      matcher,
      false,
      parentNode[":@"] ? Object.keys(parentNode[":@"]).length !== 0 : false,
      isLeafNode
    );
    if (textData !== void 0 && textData !== "")
      parentNode.add(this.options.textNodeName, textData);
    textData = "";
  }
  return textData;
}
function isItStopNode() {
  if (this.stopNodeExpressionsSet.size === 0) return false;
  return this.matcher.matchesAny(this.stopNodeExpressionsSet);
}
function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
  let attrBoundary = 0;
  const len = xmlData.length;
  const closeCode0 = closingChar.charCodeAt(0);
  const closeCode1 = closingChar.length > 1 ? closingChar.charCodeAt(1) : -1;
  let result = "";
  let segmentStart = i;
  for (let index = i; index < len; index++) {
    const code = xmlData.charCodeAt(index);
    if (attrBoundary) {
      if (code === attrBoundary) attrBoundary = 0;
    } else if (code === 34 || code === 39) {
      attrBoundary = code;
    } else if (code === closeCode0) {
      if (closeCode1 !== -1) {
        if (xmlData.charCodeAt(index + 1) === closeCode1) {
          result += xmlData.substring(segmentStart, index);
          return { data: result, index };
        }
      } else {
        result += xmlData.substring(segmentStart, index);
        return { data: result, index };
      }
    } else if (code === 9 && !attrBoundary) {
      result += xmlData.substring(segmentStart, index) + " ";
      segmentStart = index + 1;
    }
  }
}
function findClosingIndex(xmlData, str, i, errMsg) {
  const closingIndex = xmlData.indexOf(str, i);
  if (closingIndex === -1) {
    throw new Error(errMsg);
  } else {
    return closingIndex + str.length - 1;
  }
}
function findClosingChar(xmlData, char, i, errMsg) {
  const closingIndex = xmlData.indexOf(char, i);
  if (closingIndex === -1) throw new Error(errMsg);
  return closingIndex;
}
function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
  const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
  if (!result) return;
  let tagExp = result.data;
  const closeIndex = result.index;
  const separatorIndex = tagExp.search(/\s/);
  let tagName = tagExp;
  let attrExpPresent = true;
  if (separatorIndex !== -1) {
    tagName = tagExp.substring(0, separatorIndex);
    tagExp = tagExp.substring(separatorIndex + 1).trimStart();
  }
  const rawTagName = tagName;
  if (removeNSPrefix) {
    const colonIndex = tagName.indexOf(":");
    if (colonIndex !== -1) {
      tagName = tagName.substr(colonIndex + 1);
      attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
    }
  }
  return {
    tagName,
    tagExp,
    closeIndex,
    attrExpPresent,
    rawTagName
  };
}
function readStopNodeData(xmlData, tagName, i) {
  const startIndex = i;
  let openTagCount = 1;
  const xmllen = xmlData.length;
  for (; i < xmllen; i++) {
    if (xmlData[i] === "<") {
      const c1 = xmlData.charCodeAt(i + 1);
      if (c1 === 47) {
        const closeIndex = findClosingChar(xmlData, ">", i, `${tagName} is not closed`);
        let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
        if (closeTagName === tagName) {
          openTagCount--;
          if (openTagCount === 0) {
            return {
              tagContent: xmlData.substring(startIndex, i),
              i: closeIndex
            };
          }
        }
        i = closeIndex;
      } else if (c1 === 63) {
        const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
        i = closeIndex;
      } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 45 && xmlData.charCodeAt(i + 3) === 45) {
        const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
        i = closeIndex;
      } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 91) {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
        i = closeIndex;
      } else {
        const tagData = readTagExp(xmlData, i, false);
        if (tagData) {
          const openTagName = tagData && tagData.tagName;
          if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
            openTagCount++;
          }
          i = tagData.closeIndex;
        }
      }
    }
  }
}
function parseValue(val, shouldParse, options) {
  if (shouldParse && typeof val === "string") {
    const newval = val.trim();
    if (newval === "true") return true;
    else if (newval === "false") return false;
    else return toNumber(val, options);
  } else {
    if (isExist(val)) {
      return val;
    } else {
      return "";
    }
  }
}
function transformTagName(fn, tagName, tagExp, options) {
  if (fn) {
    const newTagName = fn(tagName);
    if (tagExp === tagName) {
      tagExp = newTagName;
    }
    tagName = newTagName;
  }
  tagName = sanitizeName(tagName, options);
  return { tagName, tagExp };
}
function sanitizeName(name, options) {
  if (criticalProperties.includes(name)) {
    throw new Error(`[SECURITY] Invalid name: "${name}" is a reserved JavaScript keyword that could cause prototype pollution`);
  } else if (DANGEROUS_PROPERTY_NAMES.includes(name)) {
    return options.onDangerousProperty(name);
  }
  return name;
}

// ../../vscode/node_modules/fast-xml-parser/src/xmlparser/node2json.js
var METADATA_SYMBOL2 = XmlNode.getMetaDataSymbol();
function stripAttributePrefix(attrs, prefix) {
  if (!attrs || typeof attrs !== "object") return {};
  if (!prefix) return attrs;
  const rawAttrs = {};
  for (const key in attrs) {
    if (key.startsWith(prefix)) {
      const rawName = key.substring(prefix.length);
      rawAttrs[rawName] = attrs[key];
    } else {
      rawAttrs[key] = attrs[key];
    }
  }
  return rawAttrs;
}
function prettify(node, options, matcher, readonlyMatcher) {
  return compress(node, options, matcher, readonlyMatcher);
}
function compress(arr, options, matcher, readonlyMatcher) {
  let text;
  const compressedObj = {};
  for (let i = 0; i < arr.length; i++) {
    const tagObj = arr[i];
    const property = propName(tagObj);
    if (property !== void 0 && property !== options.textNodeName) {
      const rawAttrs = stripAttributePrefix(
        tagObj[":@"] || {},
        options.attributeNamePrefix
      );
      matcher.push(property, rawAttrs);
    }
    if (property === options.textNodeName) {
      if (text === void 0) text = tagObj[property];
      else text += "" + tagObj[property];
    } else if (property === void 0) {
      continue;
    } else if (tagObj[property]) {
      let val = compress(tagObj[property], options, matcher, readonlyMatcher);
      const isLeaf = isLeafTag(val, options);
      if (Object.keys(val).length === 0 && options.alwaysCreateTextNode) {
        val[options.textNodeName] = "";
      }
      if (tagObj[":@"]) {
        assignAttributes(val, tagObj[":@"], readonlyMatcher, options);
      } else if (Object.keys(val).length === 1 && val[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) {
        val = val[options.textNodeName];
      } else if (Object.keys(val).length === 0) {
        if (options.alwaysCreateTextNode) val[options.textNodeName] = "";
        else val = "";
      }
      if (tagObj[METADATA_SYMBOL2] !== void 0 && typeof val === "object" && val !== null) {
        val[METADATA_SYMBOL2] = tagObj[METADATA_SYMBOL2];
      }
      if (compressedObj[property] !== void 0 && Object.prototype.hasOwnProperty.call(compressedObj, property)) {
        if (!Array.isArray(compressedObj[property])) {
          compressedObj[property] = [compressedObj[property]];
        }
        compressedObj[property].push(val);
      } else {
        const jPathOrMatcher = options.jPath ? readonlyMatcher.toString() : readonlyMatcher;
        if (options.isArray(property, jPathOrMatcher, isLeaf)) {
          compressedObj[property] = [val];
        } else {
          compressedObj[property] = val;
        }
      }
      if (property !== void 0 && property !== options.textNodeName) {
        matcher.pop();
      }
    }
  }
  if (typeof text === "string") {
    if (text.length > 0) compressedObj[options.textNodeName] = text;
  } else if (text !== void 0) compressedObj[options.textNodeName] = text;
  return compressedObj;
}
function propName(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key !== ":@") return key;
  }
}
function assignAttributes(obj, attrMap, readonlyMatcher, options) {
  if (attrMap) {
    const keys = Object.keys(attrMap);
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      const atrrName = keys[i];
      const rawAttrName = atrrName.startsWith(options.attributeNamePrefix) ? atrrName.substring(options.attributeNamePrefix.length) : atrrName;
      const jPathOrMatcher = options.jPath ? readonlyMatcher.toString() + "." + rawAttrName : readonlyMatcher;
      if (options.isArray(atrrName, jPathOrMatcher, true, true)) {
        obj[atrrName] = [attrMap[atrrName]];
      } else {
        obj[atrrName] = attrMap[atrrName];
      }
    }
  }
}
function isLeafTag(obj, options) {
  const { textNodeName } = options;
  const propCount = Object.keys(obj).length;
  if (propCount === 0) {
    return true;
  }
  if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
    return true;
  }
  return false;
}

// ../../vscode/node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
var XMLParser = class {
  constructor(options) {
    this.externalEntities = {};
    this.options = buildOptions(options);
  }
  /**
   * Parse XML dats to JS object 
   * @param {string|Uint8Array} xmlData 
   * @param {boolean|Object} validationOption 
   */
  parse(xmlData, validationOption) {
    if (typeof xmlData !== "string" && xmlData.toString) {
      xmlData = xmlData.toString();
    } else if (typeof xmlData !== "string") {
      throw new Error("XML data is accepted in String or Bytes[] form.");
    }
    if (validationOption) {
      if (validationOption === true) validationOption = {};
      const result = validate2(xmlData, validationOption);
      if (result !== true) {
        throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
      }
    }
    const orderedObjParser = new OrderedObjParser(this.options, this.externalEntities);
    const orderedResult = orderedObjParser.parseXml(xmlData);
    if (this.options.preserveOrder || orderedResult === void 0) return orderedResult;
    else return prettify(orderedResult, this.options, orderedObjParser.matcher, orderedObjParser.readonlyMatcher);
  }
  /**
   * Add Entity which is not by default supported by this library
   * @param {string} key 
   * @param {string} value 
   */
  addEntity(key, value) {
    if (value.indexOf("&") !== -1) {
      throw new Error("Entity value can't have '&'");
    } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
      throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
    } else if (value === "&") {
      throw new Error("An entity with value '&' is not permitted");
    } else {
      this.externalEntities[key] = value;
    }
  }
  /**
   * Returns a Symbol that can be used to access the metadata
   * property on a node.
   * 
   * If Symbol is not available in the environment, an ordinary property is used
   * and the name of the property is here returned.
   * 
   * The XMLMetaData property is only present when `captureMetaData`
   * is true in the options.
   */
  static getMetaDataSymbol() {
    return XmlNode.getMetaDataSymbol();
  }
};

// ../../vscode/src/api/indexes/maven.ts
var versions6 = (name) => {
  const [groupId, artifactId] = name.split(":");
  if (!groupId || !artifactId) {
    return Promise.resolve({ name, versions: [] });
  }
  const groupPath = groupId.replace(/\./g, "/");
  const url = cleanURL(
    `${Settings.gradle.index}/${groupPath}/${artifactId}/maven-metadata.xml`
  );
  return fetchXml(url).then((metadata) => {
    const rawVersions = metadata.metadata?.versioning?.versions?.version;
    const packageVersions = rawVersions ? Array.isArray(rawVersions) ? rawVersions : [rawVersions] : [];
    return { name, versions: packageVersions };
  }).catch(() => ({ name, versions: [] }));
};
function fetchXml(url) {
  return new Promise((resolve, reject) => {
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const { body, stream } = addResponseHandlersWithGzip(url, res, req, reject);
      stream.on("end", () => {
        try {
          const parser = new XMLParser({ ignoreAttributes: true });
          resolve(parser.parse(Buffer.concat(body).toString()));
        } catch (e) {
          reject(e);
        }
      });
    };
    makeRequest(options, handleResponse, reject);
  });
}

// ../../vscode/src/api/indexes/gradle.ts
var gradleVersions = () => {
  return fetchJson(
    "https://services.gradle.org/versions/all"
  ).then((entries) => ({
    name: "gradle",
    versions: entries.map((entry) => entry.version).filter(Boolean)
  }));
};
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const { body, stream } = addResponseHandlersWithGzip(url, res, req, reject);
      stream.on("end", () => {
        try {
          resolve(JSON.parse(Buffer.concat(body).toString()));
        } catch (e) {
          reject(e);
        }
      });
    };
    makeRequest(options, handleResponse, reject);
  });
}

// ../../vscode/src/core/fetchers/MavenFetcher.ts
var MavenFetcher = class extends Fetcher {
  fetch() {
    const base = this;
    return function(dep) {
      if (dep.versions && dep.versions.length > 0) {
        return Promise.resolve(dep);
      }
      const fetchPromise = dep.item.source === "gradle-wrapper" || dep.item.key === "gradle" ? gradleVersions() : dep.item.key.includes(":") ? versions6(dep.item.key) : Promise.resolve({ name: dep.item.key, versions: [] });
      return fetchPromise.then((pkg) => {
        dep.versions = base.filterAndSortVersions(
          pkg.versions,
          dep.item.value,
          Settings.gradle.unstableFilter
        );
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
};

// ../../vscode/src/api/indexes/npm.ts
var versions7 = (name, currentVersion) => {
  return new Promise(function(resolve, reject) {
    const url = getURL7(currentVersion, name);
    const options = getReqOptions(url);
    if (!currentVersion) {
      options.headers = {
        Accept: "application/vnd.npm.install-v1+json"
      };
    }
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      var info;
      let body = addResponseHandlers(name, res, req, reject);
      res.on("end", () => {
        try {
          const response = JSON.parse(Buffer.concat(body).toString());
          let versions12 = [];
          let err = "";
          ({ versions: versions12, err } = currentVersion ? setLatestVersion(response, currentVersion) : setVersions(response, versions12));
          info = {
            name,
            versions: versions12,
            latestVersion: currentVersion ? response.latest : response["dist-tags"].latest,
            error: err
          };
        } catch (error) {
          console.error("Error parsing response:", error);
          Logger.appendLine("Error parsing response: " + error);
          reject(error);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject, !currentVersion ? "application/vnd.npm.install-v1+json" : void 0);
  });
};
var setVersions = (response, versions12) => {
  let err = "";
  if (response.versions) {
    const versionData = Object.entries(response.versions);
    if (versionData.length) {
      versionData.forEach(([key, value]) => {
        if (!value.deprecated && (Settings.npm.unstableFilter !== 0 /* Exclude */ || !key.includes("-"))) {
          versions12.push(key);
        } else if (value.deprecated) {
          err = value.deprecated;
        }
      });
      if (versions12.length === 0) {
        versionData.forEach(([key, value]) => {
          if (!value.deprecated) {
            versions12.push(key);
          }
        });
      }
      const latestTag = response["dist-tags"]?.latest;
      if (latestTag && !versions12.includes(latestTag) && response.versions[latestTag] && !response.versions[latestTag].deprecated) {
        versions12.push(latestTag);
      }
    }
  }
  if (versions12.length > 0) {
    err = "";
  }
  return { versions: versions12, err };
};
var setLatestVersion = (response, currentVersion) => {
  let versions12 = [];
  if (currentVersion === response.latest) {
    versions12 = [currentVersion];
  } else {
    versions12 = [currentVersion, response.latest];
  }
  return { versions: versions12, err: "" };
};
function getURL7(currentVersion, name) {
  return cleanURL(`${Settings.npm.index}/${currentVersion ? `-/package/${name}/dist-tags` : `${name}`}`);
}

// ../../vscode/src/core/fetchers/NpmFetcher.ts
var NpmFetcher = class extends Fetcher {
  fetch(isLatest) {
    const base = this;
    return async function(dep) {
      const checkVersion2 = isLatest ? versions7(dep.item.key, dep.item.value) : versions7(dep.item.key);
      return checkVersion2.then((mod) => {
        let versions12 = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.npm.unstableFilter
        );
        if (mod.latestVersion && !versions12.includes(mod.latestVersion)) {
          versions12 = [mod.latestVersion, ...versions12].sort(compareVersions_default).reverse();
        }
        dep.versions = versions12;
        dep.item.latestVersion = mod.latestVersion;
        dep.item.value = dep.item.value === "latest" ? mod.latestVersion : dep.item.value;
        dep.error = mod.error;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
};

// ../../vscode/src/api/indexes/nuget.ts
var versions8 = (name) => {
  return fetchRegistrationVersions(name).then((packageVersions) => ({
    name,
    versions: packageVersions
  }));
};
async function fetchRegistrationVersions(name) {
  const response = await fetchJson2(getApiUrl(name));
  const pageVersions = await Promise.all(
    (response.items ?? []).map(async (item) => {
      if (item.items && item.items.length > 0) {
        return extractVersions(item);
      }
      const page = await fetchJson2(item["@id"]);
      return extractVersions(page);
    })
  );
  return pageVersions.flat();
}
function extractVersions(page) {
  return (page.items ?? []).filter((item) => item?.catalogEntry?.version).map((item) => item.catalogEntry.version);
}
function fetchJson2(url) {
  return new Promise((resolve, reject) => {
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const { body, stream } = addResponseHandlersWithGzip(url, res, req, reject);
      stream.on("end", () => {
        try {
          resolve(JSON.parse(Buffer.concat(body).toString()));
        } catch (e) {
          reject(e);
        }
      });
    };
    makeRequest(options, handleResponse, reject);
  });
}
function getApiUrl(name) {
  return cleanURL(`${Settings.csharp.index}/v3/registration5-gz-semver2/${name.toLowerCase()}/index.json`);
}

// ../../vscode/src/core/fetchers/NuGetFetcher.ts
var NuGetFetcher = class extends Fetcher {
  fetch() {
    const base = this;
    return function(dep) {
      if (dep.versions && dep.versions.length > 0) {
        return Promise.resolve(dep);
      }
      return versions8(dep.item.key).then((nugetPackage) => {
        dep.versions = base.filterAndSortVersions(
          nugetPackage.versions,
          dep.item.value,
          Settings.csharp.unstableFilter
        );
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
};

// ../../vscode/src/api/indexes/packagist.ts
var versions9 = (name) => {
  return new Promise(function(resolve, reject) {
    const url = getURL8(name);
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      var info;
      const body = addResponseHandlers(name, res, req, reject);
      res.on(
        "end",
        () => {
          const response = JSON.parse(Buffer.concat(body).toString());
          try {
            info = {
              name,
              versions: response.packages[name].map((version) => version.version.replace(/^v/, ""))
            };
          } catch (e) {
            reject(e);
          }
          resolve(info);
        }
      );
    };
    makeRequest(options, handleResponse, reject);
  });
};
function getURL8(name) {
  return cleanURL(`${Settings.php.index}/p2/${name}.json`);
}

// ../../vscode/src/core/fetchers/PackagistFetcher.ts
var PackagistFetcher = class extends Fetcher {
  fetch(isLatest) {
    const base = this;
    return async function(dep) {
      const checkVersion2 = isLatest ? versions9(dep.item.key) : versions9(dep.item.key);
      return checkVersion2.then((mod) => {
        const versions12 = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.php.unstableFilter
        );
        dep.versions = versions12;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
};

// ../../vscode/src/api/indexes/pubdev.ts
var versions10 = (name) => {
  return new Promise(function(resolve, reject) {
    const url = getURL9(name);
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info;
      res.on("end", () => {
        try {
          const response = JSON.parse(Buffer.concat(body).toString());
          const versions12 = response.versions;
          const filteredVersions = Object.keys(versions12).map((i) => {
            return versions12[i].version;
          });
          info = {
            name,
            versions: filteredVersions
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};
function getURL9(name) {
  return cleanURL(`${Settings.dart.index}/api/packages/${name}`);
}

// ../../vscode/src/core/fetchers/PubDevFetcher.ts
var PubDevFetcher = class extends Fetcher {
  fetch() {
    const base = this;
    return async function(dep) {
      return versions10(dep.item.key).then((mod) => {
        const versions12 = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.dart.unstableFilter
        );
        dep.versions = versions12;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
};

// ../../vscode/src/api/indexes/terraform.ts
var versions11 = (name) => {
  return new Promise(function(resolve, reject) {
    const parts = name.split("/");
    if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
      return resolve({ name, versions: [] });
    }
    const [namespace, moduleName, provider] = parts;
    const url = getURL10(namespace, moduleName, provider);
    const options = getReqOptions(url);
    const handleResponse = (res, req) => {
      if (isStatusInvalid(res)) {
        return reject(ResponseError(res));
      }
      const body = addResponseHandlers(name, res, req, reject);
      let info;
      res.on("end", () => {
        try {
          const bodyString = Buffer.concat(body).toString();
          const json = JSON.parse(bodyString);
          if (!json.modules || !json.modules[0] || !json.modules[0].versions) {
            return reject(
              new Error(`Invalid response from Terraform Registry: no versions found for ${name}`)
            );
          }
          const versionList = json.modules[0].versions.map((v) => v.version);
          info = {
            name,
            versions: versionList
          };
        } catch (e) {
          reject(e);
        }
        resolve(info);
      });
    };
    makeRequest(options, handleResponse, reject);
  });
};
function getURL10(namespace, name, provider) {
  const baseUrl = Settings.terraform.index || "https://registry.terraform.io";
  const url = `${baseUrl}/v1/modules/${namespace}/${name}/${provider}/versions`;
  return cleanURL(url);
}

// ../../vscode/src/core/fetchers/TerraformFetcher.ts
var TerraformFetcher = class extends Fetcher {
  fetch() {
    const base = this;
    return async function(dep) {
      return versions11(dep.item.key).then((mod) => {
        const versionList = base.filterAndSortVersions(
          mod.versions,
          dep.item.value,
          Settings.terraform.unstableFilter
        );
        dep.versions = versionList;
        return dep;
      }).catch(fetcherCatch(dep));
    };
  }
};

// ../../vscode/src/core/listeners/CargoTomlListener.ts
var import_path3 = __toESM(require("path"));
var import_os2 = require("os");
var import_fs2 = require("fs");
var import_fs3 = __toESM(require("fs"));

// ../../vscode/src/core/parsers/TomlParser.ts
var import_path2 = __toESM(require("path"));
var import_fs = __toESM(require("fs"));

// ../../vscode/src/core/parsers/TomlLockParser.ts
var import_semver3 = __toESM(require_semver2());
var State2 = class {
  constructor() {
    this.lockedValue = "";
    this.dependency = "";
  }
};
var TomlLockFileParser = class {
  constructor() {
  }
  parse(fileContent, items) {
    const doc = fileContent.split(/\r?\n/);
    const state = new State2();
    for (let row = 0; row < doc.length; row++) {
      const line = doc[row].trim();
      if (this.isTableSection(line)) {
        state.dependency = "";
        state.lockedValue = "";
        continue;
      }
      if (line.startsWith("[")) {
        state.dependency = "";
        state.lockedValue = "";
        continue;
      }
      if (/^name\s*=/.test(line)) {
        state.dependency = this.getPackageName(line);
        continue;
      }
      if (/^version\s*=/.test(line) && state.dependency && isPackagePresent(items, state.dependency)) {
        state.lockedValue = this.getParsedVersion(line);
        setLockValue(state, items);
      }
    }
    return items;
  }
  isTableSection(line) {
    const trimmed = line.trim();
    return trimmed.startsWith("[[") && trimmed.endsWith("]]");
  }
  getPackageName(line) {
    return clearText(extractTomlString(line));
  }
  getParsedVersion(line) {
    return clearText(extractTomlString(line));
  }
};
function extractTomlString(line) {
  const eqIndex = line.indexOf("=");
  return eqIndex === -1 ? line : line.substring(eqIndex + 1);
}
function isPackagePresent(items, packageName) {
  return items.some((item) => item.key === packageName);
}
function clearText(text) {
  return text.replace(/[^a-zA-Z0-9-_.*+]/g, "").trim();
}
function setLockValue(state, items) {
  let foundItem = items.find((item) => item.key === state.dependency);
  if (foundItem && shouldApplyLock(foundItem, state.lockedValue)) {
    foundItem.lockedAt = state.lockedValue;
  }
  state.lockedValue = "";
  state.dependency = "";
}
function shouldApplyLock(item, lockedValue) {
  if (!item.lockedAt) {
    return true;
  }
  if (!item.value) {
    return false;
  }
  try {
    const constraint = item.value.replace(/^==/, "=");
    return (0, import_semver3.satisfies)(lockedValue, constraint);
  } catch {
    return false;
  }
}

// ../../vscode/src/core/parsers/TomlParser.ts
var State3 = class {
  constructor() {
    this.inInlineTable = false;
    this.inArray = false;
    this.isMultipleDepTable = false;
    this.isSingle = false;
    this.items = [];
    this.currentItem = new Item();
    this.bypass = false;
    this.isSubTable = false;
    this.skipInlineTable = false;
  }
};
var TomlParser = class {
  constructor(pattern, enableLockFileParsing) {
    this.pattern = pattern;
    this.enableLockFileParsing = enableLockFileParsing;
  }
  parse(doc) {
    let items = [];
    const state = new State3();
    for (let row = 0; row < doc.lineCount; row++) {
      let line = doc.lineAt(row);
      if (shouldIgnoreLine(line, this.pattern, ["#"])) {
        continue;
      }
      if (isTable(line)) {
        state.bypass = false;
        if (state.inInlineTable) {
          this.addItem(state, items);
          state.inInlineTable = false;
          state.skipInlineTable = false;
        }
        if (state.isSingle) {
          this.addItem(state, items);
        }
        if (isDependencyTable(line.text)) {
          state.isMultipleDepTable = true;
          state.isSingle = false;
          state.isSubTable = false;
        } else if (isDependencySingle(line.text)) {
          state.isMultipleDepTable = false;
          state.isSubTable = false;
          state.isSingle = true;
          state.currentItem = new Item();
          let cleanText = line.text;
          if (cleanText.includes("#")) {
            cleanText = cleanText.substring(0, cleanText.indexOf("#")).trim();
          }
          state.currentItem.key = cleanText.substring(
            cleanText.lastIndexOf(".") + 1,
            cleanText.indexOf("]")
          );
        } else {
          state.isMultipleDepTable = false;
          state.isSingle = false;
          state.isSubTable = false;
          state.bypass = true;
        }
        continue;
      } else if (this.isSubTable(line.text, state)) {
        state.bypass = false;
        state.isSubTable = true;
        const inlineItems = this.parseInlineDependencyArray(
          line.text,
          row,
          line.range.end.character
        );
        if (inlineItems.length > 0) {
          for (const item of inlineItems) {
            state.currentItem = item;
            this.addItem(state, items);
          }
          state.isSubTable = false;
        }
        continue;
      }
      if (state.bypass) {
        continue;
      }
      if (state.isMultipleDepTable || state.isSubTable) {
        if (state.inInlineTable) {
          this.consumeInlineTableLine(line.text, row, line.range.end.character, state, items);
          continue;
        }
        if (isUnclosedInlineTable(line.text)) {
          if (containsIgnoredKeywordsInValue(line.text)) {
            state.inInlineTable = true;
            state.skipInlineTable = true;
            continue;
          }
          const inlineStart = this.parseInlineTableStart(line.text, row);
          if (inlineStart) {
            state.inInlineTable = true;
            state.currentItem = inlineStart;
            continue;
          }
        }
        const inlineItems = this.parseInlineDependencyArray(
          line.text,
          row,
          line.range.end.character
        );
        if (inlineItems.length > 0) {
          for (const item of inlineItems) {
            state.currentItem = item;
            this.addItem(state, items);
          }
          continue;
        }
        const pair = this.parsePair(line.text, row);
        if (!pair) {
          const req = this.parseRequirementLine(
            line.text,
            row,
            line.range.end.character
          );
          if (req) {
            state.currentItem = req;
            this.addItem(state, items);
          }
          continue;
        }
        state.currentItem.copyFrom(
          pair.key,
          pair.value,
          pair.start,
          pair.end,
          row,
          line.range.end.character,
          void 0,
          // lockedAt
          pair.registry
          // registry
        );
        this.addItem(state, items);
        continue;
      } else {
        const pair = this.parsePair(line.text, row);
        if (!pair) {
          continue;
        }
        switch (pair.key) {
          case "version":
            state.currentItem.copyFrom(
              void 0,
              pair.value,
              pair.start,
              pair.end,
              row,
              line.range.end.character
            );
            continue;
          case "registry":
            state.currentItem.registry = pair.value;
            continue;
          case "package":
            state.currentItem.copyFrom(pair.value);
            continue;
          case "git":
          case "path":
            state.currentItem = new Item();
            state.bypass = true;
            continue;
          case "features":
          case "default-features":
          case "workspace":
            continue;
          default:
        }
      }
    }
    this.addItem(state, items);
    return this.enableLockFileParsing ? parseLockFile(items) : items;
  }
  addItem(state, items) {
    if (!state.currentItem.isValid()) {
      return;
    }
    state.currentItem.createRange();
    state.currentItem.createDecoRange();
    items.push(state.currentItem);
    state.currentItem = new Item();
  }
  parsePair(line, row) {
    const item = new Item();
    let eqIndex = line.indexOf("=");
    if (eqIndex === -1) {
      return void 0;
    }
    row = eqIndex + 1;
    const commentIndex = line.indexOf("#");
    item.key = clearText2(line.substring(0, eqIndex));
    item.key = item.key.replace(".version", "");
    item.value = line.substring(eqIndex + 1, commentIndex > -1 ? commentIndex : line.length).trim().replace(/^"|"$|'/g, "");
    if (isBoolean(item.value) || containsIgnoredKeywordsInValue(item.value) || containsIgnoredKeywordsInKey(item.key)) {
      return void 0;
    }
    if (line.indexOf("{") > -1) {
      parsePackage(line, item);
      parseVersion(line, item);
      parseRegistry(line, item);
      return item.start > -1 ? item : void 0;
    }
    item.start = line.indexOf(item.value, eqIndex);
    item.end = item.start + item.value.length;
    return item.start > -1 ? item : void 0;
  }
  isSubTable(line, state) {
    return false;
  }
  /**
   * Parse a quoted PEP 508 requirement string line (e.g. `"requests>=2.32.0",`).
   * Default: unsupported. Overridden by PyProjectParser.
   */
  parseRequirementLine(_line, _row, _endOfLine) {
    return void 0;
  }
  /**
   * Parse dependencies from an inline TOML array on one line
   * (e.g. `dependencies = ["requests>=2.32.0", "pydantic>=2.0"]`).
   * Default: unsupported. Overridden by PyProjectParser.
   */
  parseInlineDependencyArray(_line, _row, _endOfLine) {
    return [];
  }
  /**
   * Detect `crate = {` that is not closed on the same line (TOML 1.1 multiline
   * inline tables). Version may be on this line or a following one.
   */
  parseInlineTableStart(line, row) {
    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) {
      return void 0;
    }
    const commentIndex = line.indexOf("#");
    const code = (commentIndex > -1 ? line.substring(0, commentIndex) : line).trimEnd();
    const braceIndex = code.indexOf("{", eqIndex);
    if (braceIndex === -1) {
      return void 0;
    }
    if (code.indexOf("}", braceIndex) !== -1) {
      return void 0;
    }
    const item = new Item();
    item.key = clearText2(line.substring(0, eqIndex));
    if (!item.key) {
      return void 0;
    }
    parseVersion(line, item);
    parseRegistry(line, item);
    if (item.start > -1) {
      item.line = row;
      item.endOfLine = line.length;
    }
    return item;
  }
  consumeInlineTableLine(line, row, endOfLine, state, items) {
    if (state.skipInlineTable || containsIgnoredKeywordsInValue(line)) {
      state.skipInlineTable = true;
      state.currentItem = new Item();
      if (lineClosesInlineTable(line)) {
        state.inInlineTable = false;
        state.skipInlineTable = false;
      }
      return;
    }
    if (state.currentItem.start < 0) {
      parseVersion(line, state.currentItem);
      parseRegistry(line, state.currentItem);
      if (state.currentItem.start > -1) {
        state.currentItem.line = row;
        state.currentItem.endOfLine = endOfLine;
      }
    } else {
      parseRegistry(line, state.currentItem);
    }
    if (lineClosesInlineTable(line)) {
      this.addItem(state, items);
      state.inInlineTable = false;
      state.skipInlineTable = false;
    }
  }
};
function parseVersion(line, item) {
  let i = item.start;
  let eqIndex = line.indexOf("version");
  if (eqIndex === -1) {
    return;
  }
  i = eqIndex + 7;
  while (i < line.length) {
    const ch = line[i];
    if (ch === "=") {
      item.start = i;
      parseVersionValue(line, item);
      return;
    }
    i++;
  }
  return;
}
function isDependencyTable(line) {
  const trimmed = line.trim();
  return trimmed.includes("dependencies]") || trimmed === "[dependency-groups]";
}
function parseVersionValue(line, item) {
  let i = item.start;
  let foundAt = -1;
  let foundQuote = 0;
  while (i++ < line.length) {
    const ch = line[i];
    if (isQuote(ch)) {
      foundQuote++;
      if (foundQuote === 2) {
        i++;
        break;
      }
      continue;
    }
    if (isWhiteSpace2(ch)) {
      if (foundAt > -1) {
        break;
      }
      continue;
    } else if (foundAt > -1) continue;
    foundAt = i;
  }
  i--;
  const found = line.substring(foundAt, i);
  if (isBoolean(found)) {
    return;
  }
  item.value = found;
  item.start = foundAt;
  item.end = item.start + item.value.length;
}
function parsePackage(line, item) {
  let i = item.start;
  let eqIndex = line.indexOf("package");
  if (eqIndex == -1) {
    return;
  }
  i = eqIndex + 7;
  while (i < line.length) {
    const ch = line[i];
    if (ch === "=") {
      parsePackageValue(line, item, i);
      return;
    }
    i++;
  }
}
function parsePackageValue(line, item, start) {
  let i = start;
  let foundAt = -1;
  while (i++ < line.length) {
    const ch = line[i];
    if (isWhiteSpace2(ch) || isQuote(ch)) {
      if (foundAt > -1) {
        break;
      }
      continue;
    } else if (foundAt > -1) continue;
    foundAt = i;
  }
  item.key = line.substring(foundAt, i);
}
function parseRegistry(line, item) {
  let i = item.start;
  let eqIndex = line.indexOf("registry");
  if (eqIndex == -1) {
    return;
  }
  i = eqIndex + 8;
  while (i < line.length) {
    const ch = line[i];
    if (ch === "=") {
      parseRegistryValue(line, item, i);
      return;
    }
    i++;
  }
}
function parseRegistryValue(line, item, start) {
  let i = start;
  let foundAt = -1;
  while (i++ < line.length) {
    const ch = line[i];
    if (isWhiteSpace2(ch) || isQuote(ch)) {
      if (foundAt > -1) {
        break;
      }
      continue;
    } else if (foundAt > -1) continue;
    foundAt = i;
  }
  item.registry = line.substring(foundAt, i);
}
function isWhiteSpace2(ch) {
  return ch === " " || ch === "	";
}
function isDependencySingle(line) {
  return line.includes("dependencies.");
}
function isBoolean(value) {
  return value === "true" || value === "false";
}
function clearText2(text) {
  return text.replace(/[^a-zA-Z0-9-_.*]/g, "").trim();
}
function isTable(line) {
  let column = line.firstNonWhitespaceCharacterIndex;
  const firstChar = line.text[column];
  return firstChar === "[";
}
function lineClosesInlineTable(line) {
  const commentIndex = line.indexOf("#");
  const code = commentIndex > -1 ? line.substring(0, commentIndex) : line;
  return code.includes("}");
}
function isUnclosedInlineTable(line) {
  const commentIndex = line.indexOf("#");
  const code = (commentIndex > -1 ? line.substring(0, commentIndex) : line).trimEnd();
  const eqIndex = code.indexOf("=");
  if (eqIndex === -1) {
    return false;
  }
  const braceIndex = code.indexOf("{", eqIndex);
  return braceIndex !== -1 && code.indexOf("}", braceIndex) === -1;
}
function parseLockFile(item) {
  const filePath = window2.activeTextEditor?.document.uri.fsPath;
  const dirName = import_path2.default.dirname(filePath || "");
  try {
    const files = import_fs.default.readdirSync(dirName);
    const lockFile = files.find((file) => file.endsWith(".lock"));
    if (lockFile) {
      const lockFilePath = import_path2.default.join(dirName, lockFile);
      const fileContent = import_fs.default.readFileSync(lockFilePath, "utf8");
      const LockFileParser = new TomlLockFileParser();
      item = LockFileParser.parse(fileContent, item);
      commands.executeCommand("setContext", "dependi.hasLockFile", true);
    } else {
      commands.executeCommand("setContext", "dependi.hasLockFile", false);
    }
  } catch (err) {
    console.error(err);
  }
  return item;
}
function containsIgnoredKeywordsInValue(value) {
  return /\b(git|path)\s*=/.test(value);
}
function containsIgnoredKeywordsInKey(key) {
  const ignoredKeywords = ["."];
  return ignoredKeywords.some((k) => key.includes(k));
}

// ../../vscode/src/core/AlternateRegistry.ts
var AlternateRegistry = class {
  constructor(name, index, token) {
    this.name = "";
    this.name = name;
    this.index = index;
    this.token = token;
  }
};

// ../../vscode/src/core/parsers/CargoTomlParser.ts
var CargoTomlParser = class extends TomlParser {
  constructor() {
    super(Settings.rust.ignoreLinePattern, Settings.rust.lockFileEnabled);
  }
};
function parseAlternateRegistries(configTomlContent) {
  const registries = [];
  const lines = configTomlContent.split("\n");
  let currentRegistryName = null;
  let currentRegistryIndex = null;
  let currentRegistryToken = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("#") || line === "") continue;
    const sectionMatch = line.match(/^\[registries\.(.+?)\]$/);
    if (sectionMatch) {
      if (currentRegistryName) {
        registries.push(new AlternateRegistry(currentRegistryName, currentRegistryIndex || void 0, currentRegistryToken || void 0));
      }
      currentRegistryName = sectionMatch[1];
      currentRegistryIndex = null;
      currentRegistryToken = null;
      continue;
    }
    if (currentRegistryName) {
      const indexMatch = line.match(/^index\s*=\s*"(.*?)"/);
      if (indexMatch) {
        currentRegistryIndex = indexMatch[1].replace("sparse+", "");
      }
      const tokenMatch = line.match(/^token\s*=\s*"(.*?)"/);
      if (tokenMatch) {
        currentRegistryToken = tokenMatch[1];
      }
    }
  }
  if (currentRegistryName) {
    registries.push(new AlternateRegistry(currentRegistryName, currentRegistryIndex || void 0, currentRegistryToken || void 0));
  }
  return registries;
}

// ../../vscode/src/core/listeners/CargoTomlListener.ts
var import_process = require("process");
var CargoTomlListener = class extends Listener {
  constructor(fetcher, parser) {
    super(fetcher, parser);
    this.fetcher = fetcher;
    this.parser = parser;
    this.alternateRegistries = [];
  }
  async loadAlternateRegistries(editor) {
    const cargo_home = import_process.env.CARGO_HOME ?? import_path3.default.join((0, import_os2.homedir)(), ".cargo");
    let credentialTokens = void 0;
    try {
      const file = import_path3.default.join(cargo_home, "credentials.toml");
      if (import_fs3.default.existsSync(file)) {
        const credentialsTomlContent = await import_fs2.promises.readFile(file, "utf-8");
        credentialTokens = parseAlternateRegistries(credentialsTomlContent);
      }
    } catch (error) {
      console.error(error);
    }
    let alternateRegistries = void 0;
    try {
      let currentDir = import_path3.default.dirname(editor.document.uri.fsPath);
      let foundConfig = null;
      for (let i = 0; i < 5; i++) {
        const candidateConfig = import_path3.default.join(cargo_home, "config.toml");
        const candidateLegacy = import_path3.default.join(cargo_home, "config");
        if (import_fs3.default.existsSync(candidateConfig)) {
          foundConfig = candidateConfig;
          break;
        } else if (import_fs3.default.existsSync(candidateLegacy)) {
          foundConfig = candidateLegacy;
          break;
        }
        const parentDir = import_path3.default.dirname(currentDir);
        if (parentDir === currentDir) {
          break;
        }
        currentDir = parentDir;
      }
      if (!foundConfig) {
        const legacyFile = import_path3.default.join(cargo_home, "config");
        const file = import_path3.default.join(cargo_home, "config.toml");
        if (import_fs3.default.existsSync(file)) {
          foundConfig = file;
        } else if (import_fs3.default.existsSync(legacyFile)) {
          foundConfig = legacyFile;
        }
      }
      if (foundConfig) {
        const configTomlContent = await import_fs2.promises.readFile(foundConfig, "utf-8");
        alternateRegistries = parseAlternateRegistries(configTomlContent);
      }
    } catch (error) {
      console.error(error);
    }
    if (alternateRegistries) {
      alternateRegistries = alternateRegistries.map((registry) => {
        if (registry.token === void 0) {
          const token = credentialTokens?.find((credential) => credential.name == registry.name)?.token;
          if (token) {
            registry.token = token;
          }
          return registry;
        } else {
          return registry;
        }
      });
      this.alternateRegistries = alternateRegistries;
    }
  }
  async parseAndDecorate(editor) {
    try {
      if (this.alternateRegistries.length === 0) {
        await this.loadAlternateRegistries(editor);
      }
      const allDependencies = this.parse(editor);
      const cratesIoDependencies = allDependencies.filter(
        (d) => !d.item.registry || d.item.registry === "crates-io"
      );
      const alternateDependencies = allDependencies.filter(
        (d) => d.item.registry && d.item.registry !== "crates-io"
      );
      const promises = [];
      const isCratesFetcher = this.fetcher instanceof CratesFetcher;
      if (cratesIoDependencies.length > 0) {
        if (isCratesFetcher) {
          promises.push(
            this.fetcher.fetchVersionsWithRegistries(
              cratesIoDependencies,
              this.alternateRegistries
            )
          );
          if (Settings.vulnerability.enabled) {
            promises.push(this.fetcher.vulns(cratesIoDependencies));
          }
        } else {
          promises.push(this.fetcher.versions(cratesIoDependencies));
        }
      }
      if (alternateDependencies.length > 0) {
        const cratesFetcher = isCratesFetcher ? this.fetcher : new CratesFetcher(Settings.rust.index, "");
        promises.push(
          cratesFetcher.fetchVersionsWithRegistries(
            alternateDependencies,
            this.alternateRegistries
          )
        );
        if (Settings.vulnerability.enabled) {
          promises.push(cratesFetcher.vulns(alternateDependencies));
        }
      }
      await Promise.all(promises);
      const dependencies = cratesIoDependencies.concat(alternateDependencies);
      const updatableDependencies = dependencies.filter(
        (d) => !isPinnedCargoVersion(d.item.value)
      );
      status.updateAllData = updatableDependencies.map((d) => ({
        key: d.item.key,
        version: this.buildVersionWithPrefix(d),
        startLine: d.item.range.start.line
      }));
      decorate(editor, dependencies, CurrentLanguage);
      if (Settings.vulnerability.enabled && isCratesFetcher) {
        this.fetcher.vulns(dependencies).then(() => {
          decorate(editor, dependencies, CurrentLanguage);
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
};

// ../../vscode/src/core/listeners/JsonListener.ts
var JsonListener = class extends Listener {
  constructor(fetcher, parser, lang) {
    super(fetcher, parser);
    this.lang = lang;
  }
};

// ../../vscode/src/core/listeners/CSharpListener.ts
var CSharpListener = class extends JsonListener {
  constructor(fetcher, parser) {
    super(fetcher, parser, 7 /* CSharp */);
    this.fetcher = fetcher;
    this.parser = parser;
  }
};

// ../../vscode/src/core/listeners/GoModListener.ts
var GoModListener = class extends Listener {
};

// ../../vscode/src/core/listeners/GradleListener.ts
var GradleListener = class extends JsonListener {
  constructor(fetcher, parser) {
    super(fetcher, parser, 10 /* Gradle */);
    this.fetcher = fetcher;
    this.parser = parser;
  }
};

// ../../vscode/src/core/listeners/MixExsListener.ts
var MixExsListener = class extends JsonListener {
  constructor(fetcher, parser) {
    super(fetcher, parser, 9 /* Elixir */);
    this.fetcher = fetcher;
    this.parser = parser;
  }
};

// ../../vscode/src/core/listeners/NpmListener.ts
var NpmListener = class extends JsonListener {
  constructor(fetcher, parser) {
    super(fetcher, parser, 3 /* JS */);
    this.fetcher = fetcher;
    this.parser = parser;
  }
  async parseAndDecorate(editor) {
    try {
      let allDependencies = this.parse(editor);
      let jsrDependencies = [];
      let npmDependencies = [];
      if (Settings.npm.jsrEnabled) {
        jsrDependencies = allDependencies.filter((d) => d.item.source === "jsr");
        npmDependencies = allDependencies.filter((d) => d.item.source !== "jsr");
      } else {
        npmDependencies = allDependencies.filter((d) => d.item.source !== "jsr");
      }
      const promises = [];
      if (npmDependencies.length > 0) {
        promises.push(this.fetcher.versions(npmDependencies));
        if (Settings.vulnerability.enabled) {
          promises.push(this.fetcher.vulns(npmDependencies));
        }
      }
      if (Settings.npm.jsrEnabled && jsrDependencies.length > 0) {
        const jsrFetcher = new JsrFetcher(Settings.npm.jsrIndex, "dependi.npm.jsrIndexServerURL");
        promises.push(jsrFetcher.versions(jsrDependencies));
      }
      await Promise.all(promises);
      const dependencies = npmDependencies.concat(jsrDependencies);
      status.updateAllData = dependencies.map((d) => ({
        key: d.item.key,
        version: this.buildVersionWithPrefix(d),
        startLine: d.item.range.start.line
      }));
      decorate(editor, dependencies, CurrentLanguage);
      if (Settings.vulnerability.enabled) {
        this.fetcher.vulns(dependencies).then(() => {
          decorate(editor, dependencies, CurrentLanguage);
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
};

// ../../vscode/src/core/listeners/PhpListener.ts
var PhpListener = class extends JsonListener {
  constructor(fetcher, parser) {
    super(fetcher, parser, 5 /* PHP */);
    this.fetcher = fetcher;
    this.parser = parser;
  }
};

// ../../vscode/src/core/listeners/PnpmWorkspaceListener.ts
var PnpmWorkspaceListener = class extends Listener {
  constructor(fetcher, parser) {
    super(fetcher, parser);
  }
};

// ../../vscode/src/core/listeners/PubspecListener.ts
var PubspecListener = class extends JsonListener {
  constructor(fetcher, parser) {
    super(fetcher, parser, 6 /* Dart */);
    this.fetcher = fetcher;
    this.parser = parser;
  }
};

// ../../vscode/src/core/listeners/PypiListener.ts
var PypiListener = class extends Listener {
  modifyDependecy(dep) {
    if (dep.item.lockedAt) {
      return;
    }
    const constrains = splitByComma(dep.item.value ?? "");
    const currVersion = possibleLatestVersion(constrains, dep.versions ?? []);
    dep.item.value = currVersion ? currVersion : dep.item.value;
  }
};

// ../../vscode/src/core/listeners/TerraformListener.ts
var TerraformListener = class extends Listener {
  // Terraform listener uses the base Listener implementation
};

// ../../vscode/src/core/parsers/CsprojParser.ts
var PACKAGE_TAGS = [
  "PackageVersion",
  "PackageReference",
  "GlobalPackageReference"
];
var xmlParserOptions = {
  ignoreAttributes: false,
  isArray: (tagName) => tagName === "Project" || tagName === "ItemGroup" || PACKAGE_TAGS.includes(tagName)
};
function isPackageTagStart(line) {
  return PACKAGE_TAGS.some((tag) => line.includes(`<${tag}`));
}
var CsprojParser = class {
  parse(doc) {
    const parser = new XMLParser(xmlParserOptions);
    const xmlObject = parser.parse(doc.getText());
    const projects = xmlObject["Project"] ?? [];
    const itemGroups = projects.flatMap((p) => p["ItemGroup"] ?? []);
    const detectedPackages = PACKAGE_TAGS.flatMap(
      (tag) => itemGroups.flatMap((g) => g[tag] ?? [])
    ).map((p) => ({ name: p["@_Include"], version: p["@_Version"] })).filter((p) => !!p.version).filter((p) => compareVersions_default.validate(p.version));
    let items = [];
    let packageName = "";
    let packageVersion = "";
    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
      if (isPackageTagStart(line.text)) {
        packageName = "";
        packageVersion = "";
      }
      if (line.text.includes("Include=")) {
        const matches = /Include="([^"]+)"/.exec(line.text);
        packageName = matches && matches[1] || packageName;
      }
      if (line.text.includes("Version=")) {
        const matches = /Version="([^"]+)"/.exec(line.text);
        packageVersion = matches && matches[1] || packageVersion;
      }
      if (packageName && packageVersion) {
        if (!detectedPackages.some(
          (p) => p.name === packageName && p.version === packageVersion
        )) {
          continue;
        }
        const versionAttrIndex = line.text.indexOf('Version="');
        const startOfVersion = versionAttrIndex !== -1 ? versionAttrIndex + 'Version="'.length : line.text.indexOf(packageVersion);
        const endOfVersion = startOfVersion + packageVersion.length;
        const item = new Item();
        item.copyFrom(
          packageName,
          packageVersion,
          startOfVersion,
          endOfVersion,
          line.lineNumber,
          line.range.end.character
        );
        item.createRange();
        item.createDecoRange();
        items.push(item);
        packageName = "";
        packageVersion = "";
      }
    }
    return items;
  }
};

// ../../vscode/src/core/parsers/JsonParser.ts
var import_path4 = __toESM(require("path"));
var fs3 = __toESM(require("fs"));
var State4 = class {
  // Track nested depth for catalogs
  constructor() {
    this.inDependencies = false;
    this.items = [];
    this.bypass = false;
    this.yamlLines = [];
    this.dependencyDepth = 0;
  }
};
var JsonParser = class {
  constructor(keys, enableLockFileParsing, lockFileName, lockParser) {
    this.keys = keys;
    this.enableLockFileParsing = enableLockFileParsing;
    this.lockFileName = lockFileName;
    this.lockParser = lockParser;
    this.state = new State4();
  }
  parse(doc) {
    const pattern = CurrentLanguageConfig === "npm" ? Settings.npm.ignoreLinePattern : Settings.php.ignoreLinePattern;
    for (let row = 0; row < doc.lineCount; row++) {
      let line = doc.lineAt(row);
      if (shouldIgnoreLine(line, pattern, this.commentChars)) {
        continue;
      }
      if (this.state.bypass) {
        continue;
      }
      if (this.isDependencies(line)) {
        this.state.inDependencies = true;
        this.state.dependencyDepth = 0;
        continue;
      }
      if (this.state.inDependencies) {
        if (isNestedObjectStart(line)) {
          this.state.dependencyDepth++;
          continue;
        }
        if (isBlockEnd(line)) {
          if (this.state.dependencyDepth > 0) {
            this.state.dependencyDepth--;
          } else {
            this.state.inDependencies = false;
          }
          continue;
        }
        let item = parseDependencyLine2(line);
        if (item.value === "" && item.start === item.end) {
          continue;
        }
        this.addDependency(item);
      }
    }
    return this.enableLockFileParsing ? this.parseLockedFile(this.state.items) : this.state.items;
  }
  addDependency(item) {
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
  isDependencies(line) {
    const start = line.firstNonWhitespaceCharacterIndex;
    return this.keys.some((key) => {
      return line.text.substring(start, start + key.length + 3) === `"${key}":` && !line.text.includes("}");
    });
  }
  parseLockedFile(item) {
    const filePath = window2.activeTextEditor?.document.uri.fsPath;
    const dirName = import_path4.default.dirname(filePath || "");
    try {
      const files = fs3.readdirSync(dirName);
      const lockFile = files.find((file) => file === this.lockFileName);
      if (lockFile) {
        const lockFilePath = import_path4.default.join(dirName, lockFile);
        const fileContent = fs3.readFileSync(lockFilePath, "utf8");
        const LockFileParser = this.lockParser;
        item = LockFileParser.parse(fileContent, item);
        commands.executeCommand("setContext", "dependi.hasLockFile", true);
      } else {
        commands.executeCommand("setContext", "dependi.hasLockFile", false);
      }
    } catch (err) {
      console.error(err);
    }
    return item;
  }
};
function isBlockEnd(line) {
  return line.text[line.firstNonWhitespaceCharacterIndex] === "}";
}
function isNestedObjectStart(line) {
  const text = line.text.trim();
  return text.includes(": {") || text.endsWith("{");
}
function parseDependencyLine2(line) {
  let endOfName = line.text.indexOf(":", line.firstNonWhitespaceCharacterIndex);
  let startOfVersion = endOfName + 3;
  let endOfVersion = line.text.indexOf('"', startOfVersion);
  if (endOfVersion === -1) {
    endOfVersion = line.text.length;
  }
  let name = line.text.substring(
    line.firstNonWhitespaceCharacterIndex,
    endOfName
  );
  let version = line.text.substring(startOfVersion, endOfVersion);
  if (isQuote(name[0]) && isQuote(name[name.length - 1])) {
    name = name.substring(1, name.length - 1);
  }
  if (isQuote(version[0]) && isQuote(version[version.length - 1])) {
    version = version.substring(1, version.length - 1);
    startOfVersion++;
    endOfVersion--;
  }
  const item = new Item();
  item.copyFrom(
    name,
    version,
    startOfVersion,
    endOfVersion,
    line.lineNumber,
    line.range.end.character
  );
  return item;
}

// ../../vscode/src/core/parsers/JsonLockParser.ts
var State5 = class {
  constructor() {
    this.lockedValue = "";
    this.dependency = "";
  }
};
var JsonLockParser = class {
  constructor() {
  }
  parse(fileContent, items) {
    const doc = JSON.parse(fileContent);
    const state = new State5();
    this.processLockFileDependencies(doc, items, state);
    return items;
  }
  processLockFileDependencies(doc, items, state) {
  }
};
function setLockValue2(state, items) {
  let foundItem = items.find((item) => item.key === state.dependency);
  if (foundItem) {
    foundItem.lockedAt = state.lockedValue;
  }
  state.lockedValue = "";
  state.dependency = "";
}

// ../../vscode/src/core/parsers/PackageLockJsonParser.ts
var PackageLockJsonParser = class extends JsonLockParser {
  constructor() {
    super();
  }
  processLockFileDependencies(doc, items, state) {
    for (let pkg in doc["packages"]) {
      if (pkg.startsWith("node_modules/")) {
        state.dependency = pkg.replace("node_modules/", "");
        if (isPackagePresent(items, state.dependency)) {
          state.lockedValue = doc["packages"][pkg].version;
          setLockValue2(state, items);
        }
      }
    }
  }
};

// ../../vscode/src/core/parsers/PackageJsonParser.ts
var NpmParser = class extends JsonParser {
  constructor() {
    super(
      [
        "catalog",
        "catalogs",
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "optionalDependencies"
      ],
      Settings.npm.lockFileEnabled,
      "package-lock.json",
      new PackageLockJsonParser()
    );
  }
  addDependency(item) {
    const skipPrefixes = ["link:", "catalog:", "workspace:"];
    if (skipPrefixes.some((prefix) => item.value?.startsWith(prefix))) {
      return;
    }
    if (item.value?.startsWith("jsr:") || item.value?.startsWith("npm:@jsr/")) {
      item.source = "jsr";
    }
    item = convertAliasToPackageName(item);
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
};
function convertAliasToPackageName(item) {
  const value = item.value;
  if (!value) {
    return item;
  }
  if (value.startsWith("npm:@jsr/")) {
    const aliasContent = value.substring(4);
    const lastAt = aliasContent.lastIndexOf("@");
    if (lastAt > 0) {
      let pkgName = aliasContent.substring(0, lastAt);
      const pkgVersion = aliasContent.substring(lastAt + 1);
      pkgName = "@" + pkgName.substring(5).replace(/__/g, "/");
      item.key = pkgName;
      item.value = pkgVersion;
      item.start = item.start + value.lastIndexOf(pkgVersion);
      item.end = item.start + pkgVersion.length;
    }
  } else if (value.startsWith("npm:")) {
    const aliasContent = value.substring(4);
    const lastAt = aliasContent.lastIndexOf("@");
    if (lastAt > 0) {
      item.key = aliasContent.substring(0, lastAt);
      item.value = aliasContent.substring(lastAt + 1);
      item.start = item.start + value.lastIndexOf(item.value);
      item.end = item.start + item.value.length;
    }
  } else if (value.startsWith("jsr:@")) {
    const aliasContent = value.substring(4);
    const lastAt = aliasContent.lastIndexOf("@");
    if (lastAt > 0) {
      item.key = aliasContent.substring(0, lastAt);
      item.value = aliasContent.substring(lastAt + 1);
      item.start = item.start + value.lastIndexOf(item.value);
      item.end = item.start + item.value.length;
    }
  } else if (value.startsWith("jsr:")) {
    item.value = value.substring(4);
    item.start = item.start + 4;
  }
  return item;
}

// ../../vscode/src/core/parsers/DenoJsonParser.ts
var DenoJsonParser = class extends JsonParser {
  constructor() {
    super(["imports", "scopes"], false, "", null);
  }
  parse(doc) {
    this.commentChars = doc.fileName.toLowerCase().endsWith(".jsonc") ? ["/"] : void 0;
    return super.parse(doc);
  }
  addDependency(item) {
    const value = item.value?.trim();
    if (!value || value.startsWith("{")) {
      return;
    }
    if (item.key?.startsWith("http://") || item.key?.startsWith("https://")) {
      return;
    }
    const skipPrefixes = [
      "link:",
      "file:",
      "node:",
      "https:",
      "http:",
      "data:"
    ];
    if (skipPrefixes.some((prefix) => value.startsWith(prefix))) {
      return;
    }
    if (item.value?.startsWith("jsr:") || item.value?.startsWith("npm:@jsr/")) {
      item.source = "jsr";
    }
    convertAliasToPackageName(item);
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
};

// ../../vscode/src/core/parsers/GoModParser.ts
var State7 = class {
  constructor() {
    this.inRequire = false;
    this.items = [];
    this.bypass = false;
  }
};
var GoModParser = class {
  parse(doc) {
    let state = new State7();
    for (let row = 0; row < doc.lineCount; row++) {
      let line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.go.ignoreLinePattern, ["/"])) {
        continue;
      }
      if (state.bypass) {
        continue;
      }
      const requireType = isRequireLine(line);
      if (requireType === "block") {
        state.inRequire = true;
        continue;
      }
      if (state.inRequire) {
        if (isBlockEnd2(line)) {
          state.inRequire = false;
          continue;
        }
        let item = parseDependencyLine3(line);
        item.createRange();
        item.createDecoRange();
        state.items.push(item);
      }
      if (requireType === "single" && !state.inRequire) {
        let item = parseDependencyLine3(line);
        item.createRange();
        item.createDecoRange();
        state.items.push(item);
      }
    }
    return state.items;
  }
};
function isRequireLine(line) {
  const start = line.firstNonWhitespaceCharacterIndex;
  const text = line.text.substring(start);
  if (/^require\s*\(/.test(text)) {
    return "block";
  }
  if (/^require\s+\S+/.test(text)) {
    return "single";
  }
  return null;
}
function isBlockEnd2(line) {
  return line.text[line.firstNonWhitespaceCharacterIndex] === ")";
}
function parseDependencyLine3(line) {
  let start = line.firstNonWhitespaceCharacterIndex;
  let text = line.text.substring(start);
  const requirePrefix = text.match(/^require\s+(?!\()/);
  if (requirePrefix) {
    start += requirePrefix[0].length;
    text = line.text.substring(start);
  }
  const commentIdx = text.indexOf("//");
  if (commentIdx !== -1) {
    text = text.substring(0, commentIdx).trimEnd();
  }
  const tokens = text.match(/^(\S+)\s+(\S+)/);
  let name = tokens?.[1] ?? "";
  let version = tokens?.[2] ?? "";
  let startOfVersion = start + (tokens ? text.indexOf(version) : 0);
  let endOfVersion = startOfVersion + version.length;
  if (name && isQuote(name[0]) && isQuote(name[name.length - 1])) {
    name = name.substring(1, name.length - 1);
  }
  if (version && isQuote(version[0]) && isQuote(version[version.length - 1])) {
    version = version.substring(1, version.length - 1);
    startOfVersion++;
    endOfVersion--;
  }
  const item = new Item();
  item.copyFrom(
    name,
    version,
    startOfVersion,
    endOfVersion,
    line.lineNumber,
    line.range.end.character
  );
  return item;
}

// ../../vscode/src/core/parsers/GradleParser.ts
var import_path5 = __toESM(require("path"));

// ../../vscode/src/core/parsers/BuildGradleParser.ts
var CONFIG_NAMES = "implementation|api|compile|compileOnly|runtimeOnly|testImplementation|testCompile|testRuntimeOnly|androidTestImplementation|androidTestCompile|annotationProcessor|kapt|debugImplementation|releaseImplementation|classpath";
var SHORT_COORD_REGEX = new RegExp(
  `(?:${CONFIG_NAMES}|platform)\\s*(?:\\(\\s*)?['"]([^:'"]+):([^:'"]+):([^'"]+)['"]`,
  "i"
);
var MAP_COORD_REGEX = /group\s*:\s*['"]([^'"]+)['"]\s*,\s*name\s*:\s*['"]([^'"]+)['"]\s*,\s*version\s*:\s*['"]([^'"]+)['"]/i;
var BuildGradleParser = class {
  parse(doc) {
    const items = [];
    let inDependencies = false;
    let braceDepth = 0;
    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.gradle.ignoreLinePattern, ["//"])) {
        continue;
      }
      const trimmed = line.text.trim();
      if (/^dependencies\s*\{/.test(trimmed)) {
        inDependencies = true;
        braceDepth = countChar(trimmed, "{") - countChar(trimmed, "}");
        continue;
      }
      if (inDependencies) {
        braceDepth += countChar(trimmed, "{") - countChar(trimmed, "}");
        if (braceDepth <= 0) {
          inDependencies = false;
          continue;
        }
        const item = parseDependencyLine4(line);
        if (item) {
          items.push(item);
        }
      }
    }
    return items;
  }
};
function parseDependencyLine4(line) {
  const text = line.text;
  if (text.includes("project(") || text.includes("files(") || text.includes("fileTree(") || text.includes("libs.") || /\$\{/.test(text)) {
    return void 0;
  }
  let match = SHORT_COORD_REGEX.exec(text);
  if (match) {
    return createItem(match[1], match[2], match[3], match.index, line);
  }
  match = MAP_COORD_REGEX.exec(text);
  if (match) {
    const versionStart = text.indexOf(match[3], match.index);
    return createItem(match[1], match[2], match[3], versionStart, line);
  }
  return void 0;
}
function createItem(group, artifact, version, versionSearchFrom, line) {
  if (!version || version.includes("$") || !/\d/.test(version)) {
    return void 0;
  }
  const versionStart = line.text.indexOf(version, versionSearchFrom);
  if (versionStart === -1) {
    return void 0;
  }
  const item = new Item();
  item.copyFrom(
    `${group}:${artifact}`,
    version,
    versionStart,
    versionStart + version.length,
    line.lineNumber,
    line.range.end.character
  );
  item.createRange();
  item.createDecoRange();
  return item;
}
function countChar(text, ch) {
  return text.split(ch).length - 1;
}

// ../../vscode/src/core/parsers/GradleVersionCatalogParser.ts
var GradleVersionCatalogParser = class {
  parse(doc) {
    const items = [];
    const versionRefs = /* @__PURE__ */ new Map();
    let section = "none";
    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.gradle.ignoreLinePattern, ["#"])) {
        continue;
      }
      const trimmed = line.text.trim();
      if (trimmed.startsWith("[versions]")) {
        section = "versions";
        continue;
      }
      if (trimmed.startsWith("[libraries]")) {
        section = "libraries";
        continue;
      }
      if (trimmed.startsWith("[")) {
        section = "none";
        continue;
      }
      if (section === "versions") {
        const versionItem = parseVersionEntry(line);
        if (versionItem) {
          versionRefs.set(versionItem.key, versionItem.value);
          items.push(versionItem);
        }
      } else if (section === "libraries") {
        const libraryItem = parseLibraryEntry(line, versionRefs);
        if (libraryItem) {
          items.push(libraryItem);
        }
      }
    }
    return items;
  }
};
function parseVersionEntry(line) {
  const eqIndex = line.text.indexOf("=");
  if (eqIndex === -1) {
    return void 0;
  }
  const key = clearText2(line.text.substring(0, eqIndex));
  const value = extractQuotedValue(line.text, eqIndex + 1);
  if (!key || !value || !/\d/.test(value)) {
    return void 0;
  }
  const versionStart = line.text.indexOf(value, eqIndex);
  const item = new Item();
  item.copyFrom(
    key,
    value,
    versionStart,
    versionStart + value.length,
    line.lineNumber,
    line.range.end.character
  );
  item.source = "version-catalog";
  item.createRange();
  item.createDecoRange();
  return item;
}
function parseLibraryEntry(line, _versionRefs) {
  const text = line.text;
  const groupMatch = /group\s*=\s*["']([^"']+)["']/.exec(text);
  const nameMatch = /name\s*=\s*["']([^"']+)["']/.exec(text);
  if (!groupMatch || !nameMatch) {
    return void 0;
  }
  const versionMatch = /version\s*=\s*["']([^"']+)["']/.exec(text);
  const versionRefMatch = /version\.ref\s*=\s*["']([^"']+)["']/.exec(text);
  if (versionRefMatch) {
    return void 0;
  }
  let version;
  let versionStart = -1;
  if (versionMatch) {
    version = versionMatch[1];
    versionStart = text.indexOf(version, versionMatch.index);
  } else {
    return void 0;
  }
  if (!version || !/\d/.test(version)) {
    return void 0;
  }
  const item = new Item();
  item.copyFrom(
    `${groupMatch[1]}:${nameMatch[1]}`,
    version,
    versionStart,
    versionStart + version.length,
    line.lineNumber,
    line.range.end.character
  );
  item.createRange();
  item.createDecoRange();
  return item;
}
function extractQuotedValue(line, start) {
  let i = start;
  while (i < line.length && (line[i] === " " || line[i] === "	")) {
    i++;
  }
  if (i >= line.length) {
    return void 0;
  }
  const quote = line[i];
  if (isQuote(quote)) {
    const end2 = line.indexOf(quote, i + 1);
    if (end2 === -1) {
      return void 0;
    }
    return line.substring(i + 1, end2);
  }
  const commentIndex = line.indexOf("#", i);
  const end = commentIndex > -1 ? commentIndex : line.length;
  const value = line.substring(i, end).trim();
  return isBoolean(value) ? void 0 : value.replace(/^"|"$/g, "");
}

// ../../vscode/src/core/parsers/GradleWrapperParser.ts
var GRADLE_DISTRIBUTION_REGEX = /distributionUrl\s*=\s*(?:https\\:|https:)\/\/services\.gradle\.org\/distributions\/gradle-([\d.]+(?:-[\w.-]+)?)-(?:bin|all)\.zip/;
var GradleWrapperParser = class {
  parse(doc) {
    const text = doc.getText();
    const match = GRADLE_DISTRIBUTION_REGEX.exec(text);
    if (!match) {
      return [];
    }
    const version = match[1];
    const pos = doc.positionAt(match.index + match[0].indexOf(version));
    const line = doc.lineAt(pos.line);
    const item = new Item();
    item.copyFrom(
      "gradle",
      version,
      pos.character,
      pos.character + version.length,
      line.lineNumber,
      line.range.end.character
    );
    item.source = "gradle-wrapper";
    item.createRange();
    item.createDecoRange();
    return [item];
  }
};

// ../../vscode/src/core/parsers/GradleParser.ts
var GradleParser = class {
  parse(doc) {
    const filename = import_path5.default.basename(doc.fileName).toLowerCase();
    switch (filename) {
      case "build.gradle":
      case "build.gradle.kts":
        return new BuildGradleParser().parse(doc);
      case "libs.versions.toml":
        return new GradleVersionCatalogParser().parse(doc);
      case "gradle-wrapper.properties":
        return new GradleWrapperParser().parse(doc);
      default:
        return [];
    }
  }
};

// ../../vscode/src/core/parsers/MixExsParser.ts
var import_path6 = __toESM(require("path"));
var import_fs4 = __toESM(require("fs"));

// ../../vscode/src/core/parsers/MixLockParser.ts
var State8 = class {
  constructor() {
    this.lockedValue = "";
    this.dependency = "";
  }
};
var MixLockParser = class {
  parse(fileContent, items) {
    const doc = fileContent.split("\n");
    const state = new State8();
    for (let row = 0; row < doc.length; row++) {
      let line = doc[row];
      const packageMatch = line.trim().match(/^"([^"]+)":\s*\{/);
      if (packageMatch) {
        state.dependency = packageMatch[1];
        if (isPackagePresent(items, state.dependency)) {
          for (row++; row < doc.length; row++) {
            line = doc[row];
            if (line.trim().startsWith('"version":')) {
              state.lockedValue = this.getParsedVersion(line);
              setLockValue(state, items);
              row++;
              break;
            }
          }
        }
      }
    }
    return items;
  }
  getParsedVersion(line) {
    const packageVersion = line.split('"version":')[1];
    return clearText(packageVersion);
  }
};

// ../../vscode/src/core/parsers/MixExsParser.ts
var NON_HEX_KEYWORDS = ["path:", "git:", "github:", "in_umbrella:"];
var DEPENDENCY_PATTERN = /\{:(\w+),\s*(['"])([^'"]+)\2/;
var MixExsParser = class {
  parse(doc) {
    let items = [];
    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.elixir.ignoreLinePattern, ["#"])) {
        continue;
      }
      const item = parseDependency(line);
      if (item) {
        items.push(item);
      }
    }
    return Settings.elixir.lockFileEnabled ? parseLockFile2(items) : items;
  }
};
function parseDependency(line) {
  const lineText = line.text;
  if (NON_HEX_KEYWORDS.some((keyword) => lineText.includes(keyword))) {
    return void 0;
  }
  const match = lineText.match(DEPENDENCY_PATTERN);
  if (!match) {
    return void 0;
  }
  const version = match[3].trim();
  if (!isValidVersion(version)) {
    return void 0;
  }
  const fullMatch = match[0];
  const matchStart = lineText.indexOf(fullMatch);
  const versionOffset = fullMatch.indexOf(version);
  const item = new Item();
  item.key = match[1];
  item.value = version;
  item.start = matchStart + versionOffset;
  item.end = item.start + version.length;
  item.line = line.lineNumber;
  item.endOfLine = line.range.end.character;
  item.createRange();
  item.createDecoRange();
  return item;
}
function isValidVersion(value) {
  if (!value) {
    return false;
  }
  const singleConstraintPattern = /^(~>\s*|~(?=\d)|>=\s*|>\s*|==?\s*)?\d+(\.\d+)*([\-+]?\w+)*$/;
  const constraints = value.split(/\s+or\s+/i).map((constraint) => constraint.trim());
  return constraints.length > 0 && constraints.every((constraint) => singleConstraintPattern.test(constraint));
}
function parseLockFile2(item) {
  const filePath = window2.activeTextEditor?.document.uri.fsPath;
  const dirName = import_path6.default.dirname(filePath || "");
  try {
    const lockFilePath = import_path6.default.join(dirName, "mix.lock");
    if (import_fs4.default.existsSync(lockFilePath)) {
      const fileContent = import_fs4.default.readFileSync(lockFilePath, "utf8");
      const lockFileParser = new MixLockParser();
      item = lockFileParser.parse(fileContent, item);
      commands.executeCommand("setContext", "dependi.hasLockFile", true);
    } else {
      commands.executeCommand("setContext", "dependi.hasLockFile", false);
    }
  } catch (err) {
    console.error(err);
  }
  return item;
}

// ../../vscode/src/core/parsers/ComposerLockParser.ts
var ComposerLockParser = class extends JsonLockParser {
  constructor() {
    super();
  }
  processLockFileDependencies(doc, items, state) {
    const allPackages = [...doc["packages"], ...doc["packages-dev"]];
    for (let i = 0; i < allPackages.length; i++) {
      let pkg = allPackages[i];
      state.dependency = pkg.name;
      if (isPackagePresent(items, state.dependency)) {
        state.lockedValue = String(pkg.version).replace(/^v/i, "");
        setLockValue2(state, items);
      }
    }
  }
};

// ../../vscode/src/core/parsers/ComposerJsonParser.ts
var PhpParser = class extends JsonParser {
  constructor() {
    super(
      ["require", "require-dev"],
      Settings.php.lockFileEnabled,
      "composer.lock",
      new ComposerLockParser()
    );
  }
  addDependency(item) {
    if (item.key === "php") {
      return;
    }
    item.createRange();
    item.createDecoRange();
    this.state.items.push(item);
  }
};

// ../../vscode/src/core/parsers/PnpmWorkspaceYamlParser.ts
var State10 = class {
  // Track if using "catalog:" (single) vs "catalogs:" (multiple)
  constructor() {
    this.inCatalogs = false;
    this.inCatalogBlock = false;
    this.currentCatalogName = "";
    this.items = [];
    this.catalogDepth = 0;
    this.isSingleCatalog = false;
  }
};
var PnpmWorkspaceYamlParser = class {
  parse(doc) {
    const state = new State10();
    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
      if (shouldIgnoreLine(line, "", ["#"])) {
        continue;
      }
      if (isCatalogsStart(line)) {
        state.inCatalogs = true;
        state.catalogDepth = 0;
        state.isSingleCatalog = line.text.trim() === "catalog:";
        if (state.isSingleCatalog) {
          state.inCatalogBlock = true;
        }
        continue;
      }
      if (state.inCatalogs) {
        const indentLevel = getIndentLevel(line);
        if (indentLevel === 0 && line.text.trim() !== "") {
          state.inCatalogs = false;
          state.inCatalogBlock = false;
          continue;
        }
        if (!state.isSingleCatalog && isCatalogName(line)) {
          state.inCatalogBlock = true;
          state.currentCatalogName = getCatalogName(line);
          continue;
        }
        if (state.inCatalogBlock) {
          const item = parseDependencyLine5(line);
          if (item && item.key && item.value) {
            state.items.push(item);
          }
        }
      }
    }
    return state.items;
  }
};
function isCatalogsStart(line) {
  const text = line.text.trim();
  return text === "catalogs:" || text === "catalog:";
}
function isCatalogName(line) {
  const indentLevel = getIndentLevel(line);
  const text = line.text.trim();
  return indentLevel === 2 && text.endsWith(":") && !text.includes(" ");
}
function getCatalogName(line) {
  const text = line.text.trim();
  return text.slice(0, -1);
}
function getIndentLevel(line) {
  return line.firstNonWhitespaceCharacterIndex;
}
function parseDependencyLine5(line) {
  const text = line.text.trim();
  if (!text || !text.includes(":")) {
    return null;
  }
  const colonIndex = text.indexOf(":");
  const key = text.substring(0, colonIndex).trim().replace(/['"]/g, "");
  let value = text.substring(colonIndex + 1).trim().replace(/['"]/g, "");
  if (value.includes("#")) {
    value = value.substring(0, value.indexOf("#")).trim();
  }
  if (!key || !value) {
    return null;
  }
  const startOfValue = line.text.indexOf(value);
  const endOfValue = startOfValue + value.length;
  const item = new Item();
  item.copyFrom(
    key,
    value,
    startOfValue,
    endOfValue,
    line.lineNumber,
    line.range.end.character
  );
  item.createRange();
  item.createDecoRange();
  return item;
}

// ../../vscode/src/core/parsers/PubspecParser.ts
var import_path7 = __toESM(require("path"));
var import_fs5 = __toESM(require("fs"));

// ../../vscode/src/core/parsers/PubspecLockParser.ts
var State11 = class {
  constructor() {
    this.lockedValue = "";
    this.dependency = "";
  }
};
var PubspecLockParser = class {
  constructor() {
  }
  parse(fileContent, items) {
    const doc = fileContent.split("\n");
    const state = new State11();
    for (let row = 0; row < doc.length; row++) {
      let line = doc[row];
      if (line.trim().startsWith("name:")) {
        state.dependency = this.getPackageName(line);
        if (isPackagePresent(items, state.dependency)) {
          for (row++; row < doc.length; row++) {
            line = doc[row];
            if (line.trim().startsWith("version:")) {
              state.lockedValue = this.getParsedVersion(line);
              setLockValue(state, items);
              row++;
              break;
            }
          }
        }
      }
    }
    return items;
  }
  getPackageName(line) {
    let packageName = line.split("name:")[1];
    return clearText(packageName);
  }
  getParsedVersion(line) {
    let packageVersion = line.split("version:")[1];
    return clearText(packageVersion);
  }
};

// ../../vscode/src/core/parsers/PubspecParser.ts
var PubspecParser = class {
  parse(doc) {
    let items = [];
    let isInDependencySection = false;
    for (let row = 0; row < doc.lineCount; row++) {
      const line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.dart.ignoreLinePattern, ["#"])) {
        continue;
      }
      const firstCharIndex = line.firstNonWhitespaceCharacterIndex;
      if (firstCharIndex === 0) {
        isInDependencySection = isDependencySection(line);
      } else if (isInDependencySection && firstCharIndex === 2) {
        const item = parsePair(line);
        if (item) {
          items.push(item);
        }
      }
    }
    return Settings.dart.lockFileEnabled ? parseLockFile3(items) : items;
  }
};
function isDependencySection(line) {
  const dependencySectionKeys = ["dependencies:", "dev_dependencies:"];
  const trimmedLineText = line.text.trim();
  return dependencySectionKeys.some((key) => trimmedLineText === key);
}
function parsePair(line) {
  const item = new Item();
  const lineText = line.text;
  const colonIndex = lineText.indexOf(":");
  if (colonIndex === -1) {
    return void 0;
  }
  item.key = lineText.substring(0, colonIndex).trim();
  const valueString = lineText.substring(colonIndex + 1).trim();
  const commentIndex = valueString.indexOf("#");
  let cleanValueString = commentIndex !== -1 ? valueString.substring(0, commentIndex).trim() : valueString;
  item.value = cleanValueString;
  item.start = line.text.indexOf(cleanValueString, colonIndex + 1);
  item.end = item.start + cleanValueString.length;
  if (isQuote(cleanValueString[0]) && isQuote(cleanValueString[cleanValueString.length - 1])) {
    item.value = cleanValueString.substring(1, cleanValueString.length - 1);
    item.start += 1;
    item.end -= 1;
  }
  if (!isValidValue(item.value)) {
    return void 0;
  }
  item.line = line.lineNumber;
  item.endOfLine = line.range.end.character;
  item.createRange();
  item.createDecoRange();
  return item;
}
function isValidValue(value) {
  if (!value || value === void 0) {
    return false;
  }
  if (value === "any") {
    return true;
  }
  const constraints = value.split(/\s+/).filter((c) => c.length > 0);
  if (constraints.length === 0) {
    return false;
  }
  const singleConstraintPattern = /^[<>~=^]?=?\s*\d+(\.\d+)*([\-+]?\w+)*$/;
  return constraints.every(
    (constraint) => singleConstraintPattern.test(constraint)
  );
}
function parseLockFile3(item) {
  const filePath = window2.activeTextEditor?.document.uri.fsPath;
  const dirName = import_path7.default.dirname(filePath || "");
  try {
    const files = import_fs5.default.readdirSync(dirName);
    const lockFile = files.find((file) => file.endsWith(".lock"));
    if (lockFile) {
      const lockFilePath = import_path7.default.join(dirName, lockFile);
      const fileContent = import_fs5.default.readFileSync(lockFilePath, "utf8");
      const LockFileParser = new PubspecLockParser();
      item = LockFileParser.parse(fileContent, item);
      commands.executeCommand("setContext", "dependi.hasLockFile", true);
    } else {
      commands.executeCommand("setContext", "dependi.hasLockFile", false);
    }
  } catch (err) {
    console.error(err);
  }
  return item;
}

// ../../vscode/src/core/parsers/PyProjectParser.ts
var PyProjectParser = class extends TomlParser {
  constructor() {
    super(Settings.python.ignoreLinePattern, Settings.python.lockFileEnabled);
  }
  addItem(state, items) {
    if (!state.currentItem.isValid()) {
      return;
    }
    const ingoreKey = ["python", "requires-python"];
    if (ingoreKey.includes(state.currentItem.key)) {
      return;
    }
    state.currentItem.createRange();
    state.currentItem.createDecoRange();
    items.push(state.currentItem);
    state.currentItem = new Item();
  }
  parsePair(line, row) {
    if (/= \[/.test(line)) {
      return void 0;
    }
    const item = new Item();
    let eqIndex = line.indexOf("=");
    if (eqIndex === -1) {
      return void 0;
    }
    const braketIndex = line.substring(0, eqIndex).indexOf("[");
    row = eqIndex + 1;
    const commentIndex = line.indexOf("#");
    item.key = clearText2(line.substring(0, braketIndex > -1 ? braketIndex : eqIndex));
    item.key = item.key.replace(".version", "");
    const valueItem = line.substring(eqIndex + 1, commentIndex > -1 ? commentIndex : line.length);
    const lastIndexOf = valueItem.indexOf(",");
    const rawValue = (lastIndexOf > -1 ? valueItem.substring(0, lastIndexOf) : valueItem).trim();
    item.value = rawValue.replace(/^["']|["']$/g, "").trim();
    if (isBoolean(item.value) || item.value.includes("path") || /\bgit\s*=/.test(line)) {
      return void 0;
    }
    if (line.indexOf("{") > -1) {
      parsePackage(line, item);
      parseVersion(line, item);
      return item.start > -1 ? item : void 0;
    }
    item.start = line.indexOf(item.value);
    item.end = item.start + item.value.length;
    if (line[eqIndex - 1] === "~" || line[eqIndex - 1] === ">") {
      let lastIndexOf2 = item.value.lastIndexOf(".");
      const lastString = item.value.substring(lastIndexOf2 + 1);
      if (isNaN(parseInt(lastString[0]))) {
        lastIndexOf2 = item.value.substring(0, lastIndexOf2).lastIndexOf(".");
      }
      if (lastIndexOf2 > -1) {
        item.value = item.value.substring(0, lastIndexOf2) + ".*";
      }
    }
    return item.start > -1 ? item : void 0;
  }
  isSubTable(line, state) {
    if (line.trim() === "]") {
      state.isSubTable = false;
      state.isSingle = false;
      state.isMultipleDepTable = false;
      state.bypass = true;
      return false;
    }
    const trimmed = line.trimEnd();
    if (!/= \[/.test(trimmed)) {
      return false;
    }
    if (state.bypass) {
      const key = trimmed.substring(0, trimmed.indexOf("=")).trim();
      return key === "dependencies";
    }
    return true;
  }
  parseRequirementLine(line, row, endOfLine) {
    return parsePep508Requirement(line, row, endOfLine);
  }
  parseInlineDependencyArray(line, row, endOfLine) {
    const bracketStart = line.indexOf("[");
    const bracketEnd = line.lastIndexOf("]");
    if (bracketStart < 0 || bracketEnd <= bracketStart) {
      return [];
    }
    const afterEq = line.substring(line.indexOf("=") + 1).trim();
    if (!afterEq.startsWith("[") || !afterEq.includes("]")) {
      return [];
    }
    const items = [];
    const body = line.substring(bracketStart + 1, bracketEnd);
    let i = 0;
    while (i < body.length) {
      while (i < body.length && (body[i] === "," || body[i] === " " || body[i] === "	")) {
        i++;
      }
      if (i >= body.length) {
        break;
      }
      if (!isQuote(body[i])) {
        while (i < body.length && body[i] !== ",") {
          i++;
        }
        continue;
      }
      const quote = body[i];
      const valueStart = bracketStart + 1 + i;
      i++;
      let valueEnd = i;
      while (valueEnd < body.length && body[valueEnd] !== quote) {
        valueEnd++;
      }
      const raw = body.substring(i, valueEnd);
      const absStart = valueStart;
      const absEnd = bracketStart + 1 + valueEnd + 1;
      const item = parsePep508Requirement(
        `"${raw}"`,
        row,
        endOfLine,
        absStart,
        absEnd
      );
      if (item) {
        items.push(item);
      }
      i = valueEnd + 1;
    }
    return items;
  }
};
function parsePep508Requirement(line, row, endOfLine, absoluteStart, absoluteEnd) {
  const commentIndex = line.indexOf("#");
  let text = (commentIndex > -1 ? line.substring(0, commentIndex) : line).trim();
  if (!text || text === "]" || text === ",") {
    return void 0;
  }
  let quoteStart = -1;
  let quoteEnd = -1;
  for (let i = 0; i < text.length; i++) {
    if (isQuote(text[i])) {
      if (quoteStart < 0) {
        quoteStart = i;
      } else {
        quoteEnd = i;
        break;
      }
    }
  }
  let req;
  let start;
  let end;
  if (quoteStart >= 0 && quoteEnd > quoteStart) {
    req = text.substring(quoteStart + 1, quoteEnd);
    start = absoluteStart ?? line.indexOf(text[quoteStart]);
    end = absoluteEnd ?? start + (quoteEnd - quoteStart + 1);
  } else {
    req = text.replace(/,\s*$/, "").trim();
    if (!req) {
      return void 0;
    }
    start = absoluteStart ?? line.indexOf(req);
    end = absoluteEnd ?? start + req.length;
  }
  const markerIndex = req.indexOf(";");
  if (markerIndex > -1) {
    req = req.substring(0, markerIndex).trim();
  }
  if (req.includes("@") || req.includes("://") || req.startsWith(".") || /\spath\s*=/.test(req)) {
    return void 0;
  }
  const versionMatch = req.match(/[{[<>=!~]/);
  let name = versionMatch ? req.substring(0, versionMatch.index) : req;
  let version = versionMatch ? req.substring(versionMatch.index) : "";
  const extrasIndex = name.indexOf("[");
  if (extrasIndex > -1) {
    name = name.substring(0, extrasIndex);
  }
  name = name.trim();
  version = version.trim();
  if (!name) {
    return void 0;
  }
  if (!version || !/\d/.test(version)) {
    return void 0;
  }
  if (quoteStart >= 0 && versionMatch?.index !== void 0) {
    const versionOffsetInQuote = versionMatch.index;
    const versionStart = (absoluteStart ?? line.indexOf(text[quoteStart])) + 1 + versionOffsetInQuote;
    start = versionStart;
    end = versionStart + version.length;
  }
  const item = new Item();
  item.copyFrom(name, version, start, end, row, endOfLine);
  return item.isValid() ? item : void 0;
}

// ../../vscode/src/core/parsers/TerraformParser.ts
var State13 = class {
  constructor() {
    this.inModule = false;
    this.inModuleBlock = false;
    this.moduleSource = "";
    this.pendingVersionLine = null;
    this.items = [];
    this.braceDepth = 0;
  }
};
function isTerraformRegistryModule(source) {
  if (!source || source.includes("://") || source.startsWith(".") || source.startsWith("/")) {
    return false;
  }
  if (source.startsWith("git::") || source.startsWith("hg::") || source.startsWith("s3::") || source.startsWith("gcs::")) {
    return false;
  }
  const parts = source.split("/");
  return parts.length === 3 && parts.every((part) => part.length > 0);
}
var TerraformParser = class {
  parse(doc) {
    let state = new State13();
    for (let row = 0; row < doc.lineCount; row++) {
      let line = doc.lineAt(row);
      if (shouldIgnoreLine(line, Settings.terraform.ignoreLinePattern, ["#", "//"])) {
        continue;
      }
      const text = line.text.trim();
      const moduleMatch = text.match(/^module\s+"([^"]+)"\s*\{/);
      if (moduleMatch) {
        this.resetModuleState(state, true, 1);
        continue;
      }
      const moduleMatchNoBrace = text.match(/^module\s+"([^"]+)"\s*$/);
      if (moduleMatchNoBrace) {
        this.resetModuleState(state, false, 0);
        continue;
      }
      if (state.inModule) {
        if (!state.inModuleBlock && text.includes("{")) {
          state.inModuleBlock = true;
          state.braceDepth = 0;
        }
        if (state.inModuleBlock) {
          state.braceDepth += (text.match(/{/g) || []).length;
          state.braceDepth -= (text.match(/}/g) || []).length;
          if (text.includes("source")) {
            const sourceMatch = text.match(/source\s*=\s*"([^"]+)"/);
            if (sourceMatch) {
              state.moduleSource = sourceMatch[1];
              if (state.pendingVersionLine && isTerraformRegistryModule(state.moduleSource)) {
                const item = this.parseVersionLine(state.pendingVersionLine, state.moduleSource);
                if (item) {
                  state.items.push(item);
                }
                state.pendingVersionLine = null;
              }
            }
          }
          if (text.includes("version")) {
            if (isTerraformRegistryModule(state.moduleSource)) {
              const item = this.parseVersionLine(line, state.moduleSource);
              if (item) {
                state.items.push(item);
              }
            } else {
              state.pendingVersionLine = line;
            }
          }
          if (state.braceDepth <= 0) {
            state.inModule = false;
            state.inModuleBlock = false;
            state.moduleSource = "";
            state.pendingVersionLine = null;
            state.braceDepth = 0;
          }
        }
      }
    }
    return state.items;
  }
  resetModuleState(state, inModuleBlock, braceDepth) {
    state.inModule = true;
    state.inModuleBlock = inModuleBlock;
    state.moduleSource = "";
    state.pendingVersionLine = null;
    state.braceDepth = braceDepth;
  }
  parseVersionLine(line, moduleSource) {
    const text = line.text;
    const versionMatch = text.match(/version\s*=\s*"([^"]+)"/);
    if (!versionMatch) {
      return null;
    }
    const rawVersion = versionMatch[1];
    const versionStart = text.indexOf('"', text.indexOf("version")) + 1;
    const versionEnd = versionStart + rawVersion.length;
    const version = rawVersion.replace(/^[~><=\s]+/, "").trim();
    const item = new Item();
    item.copyFrom(
      moduleSource,
      version,
      versionStart,
      versionEnd,
      line.lineNumber,
      line.range.end.character
    );
    item.createRange();
    item.createDecoRange();
    return item;
  }
};

// src/analyze.ts
var MANIFEST_NAMES = /* @__PURE__ */ new Set([
  "cargo.toml",
  "go.mod",
  "package.json",
  "deno.json",
  "deno.jsonc",
  "pnpm-workspace.yaml",
  "composer.json",
  "pyproject.toml",
  "pixi.toml",
  "pubspec.yaml",
  "mix.exs",
  "build.gradle",
  "build.gradle.kts",
  "libs.versions.toml",
  "gradle-wrapper.properties",
  "directory.build.props",
  "directory.packages.props"
]);
function isManifestFile(filePath) {
  const filename = import_node_path.default.basename(filePath).toLowerCase();
  if (MANIFEST_NAMES.has(filename)) {
    return true;
  }
  const ext = import_node_path.default.extname(filename);
  if (ext === ".tf" || ext === ".csproj" || ext === ".fsproj") {
    return true;
  }
  return (ext === ".txt" || ext === ".in") && filename.startsWith("requirement");
}
function listenerFor(filePath) {
  setLanguage(filePath);
  switch (CurrentLanguage) {
    case 1 /* Rust */:
      if (!Settings.rust.enabled) return void 0;
      return new CargoTomlListener(
        new CratesFetcher(Settings.rust.index, "rust.indexServerURL" /* RUST_INDEX_SERVER_URL */),
        new CargoTomlParser()
      );
    case 2 /* Golang */:
      if (!Settings.go.enabled) return void 0;
      return new GoModListener(
        new GoProxyFetcher(Settings.go.index, "go.indexServerURL" /* GO_INDEX_SERVER_URL */),
        new GoModParser()
      );
    case 3 /* JS */: {
      if (!Settings.npm.enabled) return void 0;
      const fileName = import_node_path.default.basename(filePath).toLowerCase();
      const parser = fileName === "deno.json" || fileName === "deno.jsonc" ? new DenoJsonParser() : new NpmParser();
      return new NpmListener(
        new NpmFetcher(Settings.npm.index, "npm.indexServerURL" /* NPM_INDEX_SERVER_URL */),
        parser
      );
    }
    case 8 /* PnpmWorkspace */:
      if (!Settings.npm.enabled) return void 0;
      return new PnpmWorkspaceListener(
        new NpmFetcher(Settings.npm.index, "npm.indexServerURL" /* NPM_INDEX_SERVER_URL */),
        new PnpmWorkspaceYamlParser()
      );
    case 5 /* PHP */:
      if (!Settings.php.enabled) return void 0;
      return new PhpListener(
        new PackagistFetcher(Settings.php.index, "php.indexServerURL" /* PHP_INDEX_SERVER_URL */),
        new PhpParser()
      );
    case 4 /* Python */: {
      if (!Settings.python.enabled) return void 0;
      const fileName = import_node_path.default.basename(filePath);
      const parser = fileName === "pyproject.toml" || fileName === "pixi.toml" ? new PyProjectParser() : new PypiParser();
      return new PypiListener(
        new PypiFetcher(Settings.python.index, "python.indexServerURL" /* PYTHON_INDEX_SERVER_URL */),
        parser
      );
    }
    case 6 /* Dart */:
      if (!Settings.dart.enabled) return void 0;
      return new PubspecListener(
        new PubDevFetcher(Settings.dart.index, "dart.indexServerURL" /* DART_INDEX_SERVER_URL */),
        new PubspecParser()
      );
    case 7 /* CSharp */:
      if (!Settings.csharp.enabled) return void 0;
      return new CSharpListener(
        new NuGetFetcher(Settings.csharp.index, "csharp.indexServerURL" /* CSHARP_INDEX_SERVER_URL */),
        new CsprojParser()
      );
    case 9 /* Elixir */:
      if (!Settings.elixir.enabled) return void 0;
      return new MixExsListener(
        new HexFetcher(Settings.elixir.index, "elixir.indexServerURL" /* ELIXIR_INDEX_SERVER_URL */),
        new MixExsParser()
      );
    case 10 /* Gradle */:
      if (!Settings.gradle.enabled) return void 0;
      return new GradleListener(
        new MavenFetcher(Settings.gradle.index, "gradle.indexServerURL" /* GRADLE_INDEX_SERVER_URL */),
        new GradleParser()
      );
    case 11 /* Terraform */:
      if (!Settings.terraform.enabled) return void 0;
      return new TerraformListener(
        new TerraformFetcher(Settings.terraform.index, "terraform.indexServerURL" /* TERRAFORM_INDEX_SERVER_URL */),
        new TerraformParser()
      );
    default:
      return void 0;
  }
}
function buildVersionWithPrefix(dependency) {
  const latestVersion2 = dependency.versions?.[0] ?? "";
  const currentValue = dependency.item.value || "";
  if (currentValue === "*") {
    return "*";
  }
  const prefixMatch = currentValue.match(/^(\^|~|>=|<=|>|<|=)?(.+)$/);
  const prefix = prefixMatch ? prefixMatch[1] : "";
  if (!prefix) {
    return latestVersion2;
  }
  return prefix + latestVersion2;
}
function shouldFetchOsv(fetcher) {
  return Settings.vulnerability.enabled && !(fetcher instanceof DependiFetcher);
}
async function analyzeDocument(document) {
  if (!isManifestFile(document.fileName)) {
    return void 0;
  }
  setActiveDocument(document);
  let listener = listenerFor(document.fileName);
  if (!listener) {
    return void 0;
  }
  const editor = { document };
  if (listener instanceof CargoTomlListener) {
    await listener.loadAlternateRegistries(editor);
  }
  if (Settings.api.key !== "" && Settings.api.url !== "") {
    listener.fetcher = new DependiFetcher(Settings.api.url, "apiURL" /* INDEX_SERVER_URL */);
    console.info(
      `Dependi index ${Settings.api.url} VulnerabilityCheck=${Settings.vulnerability.enabled}`
    );
  }
  let parsed = listener.parse(editor);
  if (CurrentLanguage === 3 /* JS */ && !Settings.npm.jsrEnabled) {
    parsed = parsed.filter((d) => d.item.source !== "jsr");
  }
  const dependencies = await fetchVersions(listener, parsed);
  const updateAll = dependencies.map((d) => ({
    key: d.item.key,
    version: buildVersionWithPrefix(d),
    startLine: d.item.range.start.line
  }));
  return {
    language: CurrentLanguage,
    dependencies,
    updateAll
  };
}
async function fetchVersions(listener, dependencies) {
  if (listener instanceof CargoTomlListener) {
    return fetchRust(listener, dependencies);
  }
  if (listener instanceof NpmListener && Settings.npm.jsrEnabled) {
    const jsrDependencies = dependencies.filter((d) => d.item.source === "jsr");
    const npmDependencies = dependencies.filter((d) => d.item.source !== "jsr");
    const promises2 = [];
    if (npmDependencies.length > 0) {
      promises2.push(listener.fetcher.versions(npmDependencies));
      if (shouldFetchOsv(listener.fetcher)) {
        promises2.push(
          listener.fetcher.vulns(npmDependencies).catch((error) => {
            console.error("Dependi vulnerability fetch failed:", error);
            return npmDependencies;
          })
        );
      }
    }
    if (jsrDependencies.length > 0) {
      const jsrFetcher = new JsrFetcher(Settings.npm.jsrIndex, "dependi.npm.jsrIndexServerURL");
      promises2.push(jsrFetcher.versions(jsrDependencies));
    }
    await Promise.all(promises2);
    return npmDependencies.concat(jsrDependencies);
  }
  const promises = [listener.fetcher.versions(dependencies)];
  if (shouldFetchOsv(listener.fetcher)) {
    promises.push(
      listener.fetcher.vulns(dependencies).catch((error) => {
        console.error("Dependi vulnerability fetch failed:", error);
        return dependencies;
      })
    );
  }
  await Promise.all(promises);
  return dependencies;
}
async function fetchRust(listener, allDependencies) {
  const cratesIoDependencies = allDependencies.filter(
    (d) => !d.item.registry || d.item.registry === "crates-io"
  );
  const alternateDependencies = allDependencies.filter(
    (d) => d.item.registry && d.item.registry !== "crates-io"
  );
  const promises = [];
  const isCratesFetcher = listener.fetcher instanceof CratesFetcher;
  if (cratesIoDependencies.length > 0) {
    if (isCratesFetcher) {
      promises.push(
        listener.fetcher.fetchVersionsWithRegistries(
          cratesIoDependencies,
          listener.alternateRegistries
        )
      );
      if (shouldFetchOsv(listener.fetcher)) {
        promises.push(
          listener.fetcher.vulns(cratesIoDependencies).catch((error) => {
            console.error("Dependi vulnerability fetch failed:", error);
            return cratesIoDependencies;
          })
        );
      }
    } else {
      promises.push(listener.fetcher.versions(cratesIoDependencies));
    }
  }
  if (alternateDependencies.length > 0) {
    const cratesFetcher = isCratesFetcher ? listener.fetcher : new CratesFetcher(Settings.rust.index, "");
    promises.push(
      cratesFetcher.fetchVersionsWithRegistries(
        alternateDependencies,
        listener.alternateRegistries
      )
    );
    if (Settings.vulnerability.enabled) {
      promises.push(
        cratesFetcher.vulns(alternateDependencies).catch((error) => {
          console.error("Dependi vulnerability fetch failed:", error);
          return alternateDependencies;
        })
      );
    }
  }
  await Promise.all(promises);
  return cratesIoDependencies.concat(alternateDependencies);
}

// src/commands.ts
var import_node_fs = require("node:fs");
var import_node_os = require("node:os");
var import_node_path2 = __toESM(require("node:path"));
var import_node_url3 = require("node:url");
var import_node = __toESM(require_node3());

// ../../vscode/src/api/indexes/dependi/reports.ts
var LanguageArray = [
  { ID: 1 /* Rust */, Name: "Cargo.toml" },
  { ID: 2 /* Golang */, Name: "go.mod" },
  { ID: 3 /* JS */, Name: "package.json" },
  { ID: 5 /* PHP */, Name: "composer.json" },
  { ID: 4 /* Python */, Name: "requirements.txt" },
  { ID: 6 /* Dart */, Name: "pubspec.yaml" },
  { ID: 9 /* Elixir */, Name: "mix.exs" },
  { ID: 7 /* CSharp */, Name: "directory.build.props" },
  { ID: 7 /* CSharp */, Name: "directory.packages.props" },
  { ID: 10 /* Gradle */, Name: "build.gradle" },
  { ID: 10 /* Gradle */, Name: "build.gradle.kts" },
  { ID: 10 /* Gradle */, Name: "libs.versions.toml" },
  { ID: 10 /* Gradle */, Name: "gradle-wrapper.properties" },
  { ID: 11 /* Terraform */, Name: "main.tf" }
];
var getLangIdFromName = (name) => {
  const exactMatch = LanguageArray.find((lang) => lang.Name.toLowerCase() === name.toLowerCase());
  if (exactMatch) {
    return exactMatch.ID;
  }
  if (name.toLowerCase().endsWith(".csproj") || name.toLowerCase().endsWith(".fsproj")) {
    return 7 /* CSharp */;
  }
  if (name.toLowerCase().endsWith(".tf")) {
    return 11 /* Terraform */;
  }
  return 0 /* None */;
};
async function getVulnReport(req, options) {
  const response = await request(`v1/reports/vulnerability`, {
    method: "POST",
    headers: {
      Authorization: Settings.api.key,
      "X-Device-ID": Settings.api.deviceID,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req),
    ...options
  });
  return response;
}
async function getCurrentVulnReport(req, options) {
  const response = await request(`v1/reports/vulnerability/current`, {
    method: "POST",
    headers: {
      Authorization: Settings.api.key,
      "X-Device-ID": Settings.api.deviceID,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req),
    ...options
  });
  return response;
}

// ../../vscode/src/commands/report-generator/utils.ts
var import_os3 = __toESM(require("os"));
var parserInvoker = (language) => {
  switch (language) {
    case "Cargo.toml":
      return new CargoTomlParser();
    case "go.mod":
      return new GoModParser();
    case "package.json":
      return new NpmParser();
    case "composer.json":
      return new PhpParser();
    case "requirements.txt":
      return new PypiParser();
    case "pyproject.toml":
      return new PyProjectParser();
    case "pubspec.yaml":
      return new PubspecParser();
    case "mix.exs":
      return new MixExsParser();
    case "Directory.Build.props":
    case "Directory.Packages.props":
      return new CsprojParser();
    default:
      if (language.endsWith(".csproj") || language.endsWith(".fsproj")) {
        return new CsprojParser();
      }
      throw Error("Language not supported");
  }
};
var winHelper = (path12) => {
  if (import_os3.default.platform() !== "win32") {
    return path12;
  }
  let newPath = path12.slice(1);
  return newPath = newPath.replace(/\\/g, "/");
};
function handleReportError(reportResp) {
  if (reportResp.status !== 200) {
    switch (getError(reportResp.error)) {
      case "Device Limit reached. You can edit your api key or visit dependi.io dashboard to manage devices." /* DLR */:
        openDeviceLimitDialog();
        break;
      case "Payment required. Please visit dependi.io dashboard to update your payment method." /* PAYRQ */:
        openPaymentRequiredDialog();
        break;
      case "Unauthorized, please check your api key." /* UNAUTH */:
        openSettingsDialog("apiKey" /* INDEX_SERVER_API_KEY */, "Unauthorized, please check your api key.");
        break;
      case "Invalid api key or api key not found. Please check your api key." /* IVAK */:
        openSettingsDialog("apiKey" /* INDEX_SERVER_API_KEY */, "Invalid api key or api key not found. Please check your api key.");
        break;
      case "User is not active. Please check emails from us or visit dependi.io dashboard." /* UINA */:
        openSettingsDialog("apiKey" /* INDEX_SERVER_API_KEY */, "User is not active. Please check emails from us or visit dependi.io dashboard.");
        break;
      default:
        window2.showErrorMessage(getError(reportResp.error));
    }
  }
}

// ../../vscode/src/commands/report-generator/gitActions.ts
async function getRepo() {
  const gitExtension = extensions.getExtension("vscode.git").exports;
  if (!gitExtension) {
    throw new Error("Git extension not found");
  }
  const api = gitExtension.getAPI(1);
  const repos = api.repositories;
  if (!repos || repos.length === 0) {
    throw new Error("No repository found");
  }
  const activeEditor = window2.activeTextEditor;
  if (!activeEditor) {
    throw new Error("Active editor not found");
  }
  const activeFilePath = activeEditor.document.uri.fsPath;
  const repo = repos.find((repo2) => activeFilePath.includes(repo2.rootUri.fsPath));
  return { repo };
}
async function getRepoDetails() {
  const { repo } = await getRepo();
  const repoRootUri = repo.rootUri;
  let repoName;
  const path12 = winHelper(repoRootUri.path);
  if (repoRootUri) {
    repoName = path12.split("/").pop();
  }
  return { repoName, repoRootUri };
}
async function getCommitHistory(repo) {
  const editor = window2.activeTextEditor;
  if (!editor) {
    throw new Error("Active editor not found");
  }
  const uri = editor.document.uri;
  const newUriPath = winHelper(uri.path);
  const commits = await repo.log({ path: newUriPath });
  if (!commits || commits.length === 0) {
    throw new Error("There is no commit history on the active file");
  }
  return { commits };
}
async function parseTextDocument(parser, repo, commitId, activeFileLanguage) {
  const uri = winHelper(window2.activeTextEditor.document.uri.path);
  const file = await repo.show(commitId, uri);
  const textDocumentFile = await workspace.openTextDocument({
    language: activeFileLanguage,
    content: file
  });
  window2.showTextDocument(textDocumentFile).then(
    () => commands.executeCommand("workbench.action.revertAndCloseActiveEditor")
  );
  return parser.parse(textDocumentFile);
}

// ../../vscode/src/commands/report-generator/reportGenerator.ts
var progressSteps = {
  fetchingRepository: { label: "Fetching current repository", percentage: 5 },
  parsingFile: { label: "Parsing current file", percentage: 10 },
  comparingFiles: { label: "Comparing files", percentage: 25 },
  generatingReport: { label: "Generating vulnerability report", percentage: 55 },
  creatingUI: { label: "Creating Report", percentage: 80 }
};
async function fetchRepositoryData() {
  const { repo } = await getRepo();
  const { commits } = await getCommitHistory(repo);
  const { repoName, repoRootUri } = await getRepoDetails();
  const commitId = commits[0]?.hash;
  const author = commits[0]?.authorEmail;
  if (!commitId) {
    throw new Error("No commits found in the repository.");
  }
  return { repo, commits, repoName, repoRootUri, commitId, author };
}
async function getActiveEditorLanguage() {
  const editor = window2.activeTextEditor;
  if (!editor) {
    throw new Error("Active editor not found");
  }
  const filePath = editor.document.fileName || "";
  if (filePath === "") {
    throw new Error("File name has not been found.");
  }
  const fileName = filePath.split(/[/\\]/).pop();
  if (!fileName) {
    throw new Error("Failed to extract file name with extension.");
  }
  return { editor, fileName };
}
function incrementProgress(progress, step, totalPercentage) {
  const { percentage, label } = progressSteps[step];
  progress.report({
    increment: percentage,
    message: `Progress: ${totalPercentage + percentage}% ${label}`
  });
  return totalPercentage + percentage;
}
async function parseFiles(parser, repo, commitId, activeFileLanguage) {
  const editor = window2.activeTextEditor;
  if (!editor) {
    throw new Error("Active editor not found");
  }
  const currentItems = parser.parse(editor.document);
  const previousItems = await parseTextDocument(
    parser,
    repo,
    commitId,
    activeFileLanguage
  );
  const currentReportItems = currentItems.map((item) => ({
    Key: item.key,
    Value: item.value || ""
  }));
  const previousReportItems = previousItems.map((item) => ({
    Key: item.key,
    Value: item.value || ""
  }));
  return { currentReportItems, previousReportItems };
}
async function generateMainReport(progress) {
  let totalPercentage = 0;
  try {
    totalPercentage = incrementProgress(progress, "fetchingRepository", totalPercentage);
    const { repo, commits, repoName, repoRootUri, commitId, author } = await fetchRepositoryData();
    const { fileName } = await getActiveEditorLanguage();
    totalPercentage = incrementProgress(progress, "parsingFile", totalPercentage);
    const parser = parserInvoker(fileName);
    const { currentReportItems, previousReportItems } = await parseFiles(parser, repo, commitId, fileName);
    if (!repoRootUri) {
      throw new Error("Repository root URI not found");
    }
    totalPercentage = incrementProgress(progress, "generatingReport", totalPercentage);
    const vulnRequest = {
      RepoName: repoName || "",
      Commits: commits || [],
      PreviousItems: previousReportItems,
      CurrentItems: currentReportItems,
      Language: getLangIdFromName(fileName),
      GHSACheck: Settings.vulnerability.ghsa,
      Author: author
    };
    const reportResp = await getVulnReport(vulnRequest);
    if (!reportResp) {
      throw new Error("Failed to generate report");
    }
    handleReportError(reportResp);
    const reportHTML = reportResp.body || "";
    totalPercentage = incrementProgress(progress, "creatingUI", totalPercentage);
    return reportHTML;
  } catch (error) {
    throw new Error(`Error during report generation: ${error}`);
  }
}
async function generateCurrentReport(progress) {
  let totalPercentage = 0;
  try {
    const { fileName } = await getActiveEditorLanguage();
    const { commits, repoName, author } = await fetchRepositoryData();
    totalPercentage = incrementProgress(progress, "parsingFile", totalPercentage);
    const parser = parserInvoker(fileName);
    const { reportItems } = await parseFile(parser);
    totalPercentage = incrementProgress(progress, "generatingReport", totalPercentage);
    const vulnRequest = {
      RepoName: repoName || "",
      Commits: commits || [],
      PreviousItems: [],
      CurrentItems: reportItems,
      Language: getLangIdFromName(fileName),
      GHSACheck: Settings.vulnerability.ghsa,
      Author: author
    };
    const reportResp = await getCurrentVulnReport(vulnRequest);
    handleReportError(reportResp);
    const reportHTML = reportResp.body || "";
    totalPercentage = incrementProgress(progress, "creatingUI", totalPercentage);
    return reportHTML;
  } catch (error) {
    throw new Error(`Error during report generation: ${error}`);
  }
}
async function parseFile(parser) {
  const editor = window2.activeTextEditor;
  if (!editor) {
    throw new Error("Active editor not found");
  }
  const items = parser.parse(editor.document);
  const reportItems = items.map((item) => ({
    Key: item.key,
    Value: item.value?.replace(/[=><]/g, "") || ""
  }));
  return { reportItems };
}

// src/present.ts
var import_semver4 = __toESM(require_semver4());
function vulnsFor(dep, version) {
  const source = dep.vulns;
  if (!source) {
    return [];
  }
  if (source instanceof Map) {
    return source.get(version) ?? [];
  }
  return source[version] ?? [];
}
function isLocal2(version) {
  if (!version) return false;
  return version.startsWith("file:") || version.startsWith("path:") || version.startsWith("link:") || version.startsWith("git:") || version.startsWith("git+") || version.startsWith("github:") || version.startsWith("workspace:") || version.startsWith("ssh:") || version.startsWith("http:") || version.startsWith("https:");
}
function versionToSemverRange(version, language) {
  if (language === 4 /* Python */) {
    return convertPythonVersionToSemver(version);
  }
  if (language === 9 /* Elixir */) {
    return convertElixirVersionToSemver(version);
  }
  return version;
}
function getLinks2(lang, key, item) {
  const cleanKey = key.replace(/"/g, "");
  switch (lang) {
    case 1 /* Rust */:
      return ` _([View crate](https://crates.io/crates/${cleanKey}) | [Check reviews](https://web.crev.dev/rust-reviews/crate/${cleanKey}))_`;
    case 2 /* Golang */:
      return ` _([View module](https://pkg.go.dev/${cleanKey}))_`;
    case 3 /* JS */:
      if (item?.source === "jsr") {
        return ` _([View package](https://jsr.io/${cleanKey}))_`;
      }
      return ` _([View package](https://npmjs.com/package/${cleanKey}))_`;
    case 5 /* PHP */:
      return ` _([View package](https://packagist.org/packages/${cleanKey}))_`;
    case 4 /* Python */:
      return ` _([View package](https://pypi.org/project/${cleanKey}))_`;
    case 6 /* Dart */:
      return ` _([View package](https://pub.dev/packages/${cleanKey}))_`;
    case 7 /* CSharp */:
      return ` _([View package](https://www.nuget.org/packages/${cleanKey}))_`;
    case 9 /* Elixir */:
      return ` _([View package](https://hex.pm/packages/${cleanKey}))_`;
    case 10 /* Gradle */: {
      if (item?.source === "gradle-wrapper" || cleanKey === "gradle") {
        return ` _([View releases](https://gradle.org/releases/))_`;
      }
      const [group, artifact] = cleanKey.split(":");
      if (group && artifact) {
        return ` _([View artifact](https://central.sonatype.com/artifact/${group}/${artifact}))_`;
      }
      return "";
    }
    default:
      return "";
  }
}
function getVersionUrl(lang, key, version, item) {
  switch (lang) {
    case 1 /* Rust */:
      return `https://docs.rs/crate/${key}/${version}`;
    case 2 /* Golang */:
      return `https://pkg.go.dev/${key}@${version}`;
    case 3 /* JS */:
      if (item?.source === "jsr") {
        return `https://jsr.io/${key}/${version}`;
      }
      return `https://npmjs.com/package/${key}/v/${version}`;
    case 5 /* PHP */:
      return `https://packagist.org/packages/${key}#${version}`;
    case 4 /* Python */:
      return `https://pypi.org/project/${key}/${version}`;
    case 6 /* Dart */:
      return `https://pub.dev/packages/${key}/versions/${version}`;
    case 7 /* CSharp */:
      return `https://www.nuget.org/packages/${key}/${version}`;
    case 9 /* Elixir */:
      return `https://hexdocs.pm/${key}/${version}`;
    case 10 /* Gradle */: {
      if (item?.source === "gradle-wrapper" || key === "gradle") {
        return `https://docs.gradle.org/${version}/release-notes.html`;
      }
      const [group, artifact] = key.split(":");
      if (group && artifact) {
        return `https://central.sonatype.com/artifact/${group}/${artifact}/${version}`;
      }
      return "";
    }
    default:
      return "";
  }
}
function getDocsLink2(lang, key, version, item) {
  const url = getVersionUrl(lang, key, version, item);
  if (!url) {
    return "";
  }
  const label = lang === 10 /* Gradle */ && (item?.source === "gradle-wrapper" || key === "gradle") ? "release notes" : "docs";
  return `[${label}](${url})`;
}
function templateFor(kind) {
  switch (kind) {
    case "PATCH":
      return Settings.decorator.patchUpdate.template || "\u26A0\uFE0F ${version}";
    case "INCOMP":
      return Settings.decorator.incompatible.template || "\u274C ${version}";
    case "ERROR":
      return Settings.decorator.error.template || "\u2757\uFE0F\u2757\uFE0F\u2757\uFE0F";
    default:
      return Settings.decorator.compatible.template || "\u2705";
  }
}
function classify(dep, language) {
  if (dep.error && (!dep.versions || dep.versions.length === 0)) {
    return "ERROR";
  }
  const version = dep.item.value?.replace(",", "") ?? "";
  const versions12 = dep.versions ?? [];
  const [satisfies3, hasPatchUpdate, maxSatisfying2] = checkVersion(
    version,
    versions12,
    dep.item.lockedAt
  );
  if (!(0, import_semver4.validRange)(versionToSemverRange(version, language))) {
    return "ERROR";
  }
  let kind = versions12[0] !== maxSatisfying2 ? satisfies3 ? "COMP" : "INCOMP" : "COMP";
  if (hasPatchUpdate && kind === "COMP") {
    kind = "PATCH";
  }
  return kind;
}
function prepareDependencies(analysis, _uri) {
  const prepared = [];
  for (const dependency of analysis.dependencies) {
    if (dependency.item.registry && dependency.item.registry !== "crates-io" && (!dependency.versions || dependency.versions.length === 0)) {
      continue;
    }
    const versions12 = dependency.versions ?? [];
    const version = dependency.item.value?.replace(",", "") ?? "";
    const kind = dependency.error && versions12.length === 0 ? "ERROR" : classify(dependency, analysis.language);
    let label = "";
    if (!isLocal2(version) && kind !== "ERROR") {
      label = templateFor(kind).replace("${version}", versions12[0] ?? "");
    } else if (kind === "ERROR") {
      label = templateFor("ERROR");
    }
    const vulnCount = vulnsFor(dependency, dependency.item.lockedAt ?? version).length;
    if (vulnCount > 0 && !isLocal2(version)) {
      const vulnText = (Settings.decorator.vulnerability.template || "\u{1F6A8} ${count}").replace(
        "${count}",
        `${vulnCount}`
      );
      label = label ? `${label}  ${vulnText}` : vulnText;
    }
    prepared.push({
      dependency,
      kind,
      label,
      hover: buildHover(dependency, analysis.language, kind)
    });
  }
  return prepared;
}
function buildHover(dep, language, kind) {
  const lines = [];
  const version = dep.item.value?.replace(",", "") ?? "";
  if (kind === "ERROR" || dep.error) {
    lines.push("#### Errors");
    for (const part of (dep.error ?? "No versions found").split("\n").filter(Boolean)) {
      lines.push(`* ${part.trim()}`);
    }
    return lines.join("\n");
  }
  const currentVulns = vulnsFor(dep, version).length ? vulnsFor(dep, version) : vulnsFor(dep, dep.item.lockedAt ?? version);
  if (currentVulns?.length) {
    lines.push("#### Vulnerabilities (Current)");
    for (const id of currentVulns) {
      lines.push(`- [${id}](https://osv.dev/vulnerability/${id})`);
    }
    lines.push("");
  }
  lines.push(`#### Versions${getLinks2(language, dep.item.key, dep.item)}`);
  const versions12 = dep.versions ?? [];
  const [, , maxSatisfying2] = checkVersion(version, versions12, dep.item.lockedAt);
  const shown = versions12.slice(0, 40);
  for (const v of shown) {
    const isCurrent = v === maxSatisfying2;
    const isLatest = v === versions12[0];
    const url = getVersionUrl(language, dep.item.key, v, dep.item);
    const linked = url ? `[${v}](${url})` : v;
    const docs = isCurrent || isLatest ? ` ${getDocsLink2(language, dep.item.key, v, dep.item)}` : "";
    const vulns = vulnsFor(dep, v);
    const vulnSuffix = vulns?.length ? `  \u{1F6A8} ${vulns.length}` : "";
    const text = isCurrent ? `**${linked}**` : linked;
    lines.push(`* ${text}${docs}${vulnSuffix}`);
  }
  if (versions12.length > shown.length) {
    lines.push(`* \u2026 ${versions12.length - shown.length} more`);
  }
  lines.push("");
  lines.push("To change the version, use **code actions** (`cmd-.` / `ctrl-.`) and pick **Use \u2026 to**.");
  return lines.join("\n");
}
function preservePrefix(currentText, newVersion) {
  const prefixMatch = currentText.match(/^(\^|~|>=?|<=?|=)?(v|V)?/);
  if (prefixMatch?.[0]) {
    const operator = prefixMatch[1] || "";
    const vPrefix = prefixMatch[2] || "";
    const cleanVersion = newVersion.replace(/^(\^|~|>=?|<=?|=)?(v|V)?/, "");
    return operator + vPrefix + cleanVersion;
  }
  return newVersion;
}
function canUpdate(dep, language) {
  if (!dep.versions?.[0] || isLocal2(dep.item.value)) {
    return false;
  }
  if (language === 1 /* Rust */ && isPinnedCargoVersion(dep.item.value)) {
    return false;
  }
  return dep.versions[0] !== dep.item.value?.replace(/^(\^|~|>=?|<=?|=)?(v|V)?/, "");
}

// src/document.ts
var import_node_url2 = require("node:url");
var VsCodeDocument = class {
  constructor(doc) {
    this.doc = doc;
  }
  doc;
  get uri() {
    return Uri.parse(this.doc.uri);
  }
  get fileName() {
    try {
      return (0, import_node_url2.fileURLToPath)(this.doc.uri);
    } catch {
      return this.doc.uri;
    }
  }
  get languageId() {
    return this.doc.languageId;
  }
  get version() {
    return this.doc.version;
  }
  get lineCount() {
    return this.doc.lineCount;
  }
  getText(range) {
    if (!range) {
      return this.doc.getText();
    }
    return this.doc.getText({
      start: { line: range.start.line, character: range.start.character },
      end: { line: range.end.line, character: range.end.character }
    });
  }
  lineAt(lineOrPosition) {
    const line = typeof lineOrPosition === "number" ? lineOrPosition : lineOrPosition.line;
    const text = this.doc.getText({
      start: { line, character: 0 },
      end: { line, character: Number.MAX_SAFE_INTEGER }
    }).replace(/\r?\n$/, "");
    const indent = text.match(/^\s*/)?.[0].length ?? 0;
    return {
      lineNumber: line,
      text,
      range: new Range(line, 0, line, text.length),
      rangeIncludingLineBreak: new Range(line, 0, line + 1, 0),
      firstNonWhitespaceCharacterIndex: indent,
      isEmptyOrWhitespace: indent === text.length
    };
  }
  offsetAt(position) {
    return this.doc.offsetAt(position);
  }
  positionAt(offset) {
    const pos = this.doc.positionAt(offset);
    return new Position(pos.line, pos.character);
  }
};

// src/commands.ts
var COMMAND = {
  REPLACE_VERSION: Configs.REPLACE_VERSIONS,
  RETRY: Configs.RETRY,
  UPDATE_ALL: Configs.UPDATE_ALL,
  VULN_REPORT: Configs.GENERATE_VULNERABILITY_REPORT,
  VULN_CURRENT: Configs.GENERATE_VULNERABILITY_CURRENT_REPORT,
  ENABLE_LOCK: Configs.ENABLE_LOCK_FILE_PARSING,
  DISABLE_LOCK: Configs.DISABLE_LOCK_FILE_PARSING,
  LOCK_PARSED: Configs.LOCK_FILE_PARSED
};
var ALL_COMMANDS = Object.values(COMMAND);
var KIND = {
  UPDATE_ONE: "quickfix.dependi.update",
  UPDATE_ALL: "source.dependi.updateAll",
  RETRY: "source.dependi.retry",
  VULN_REPORT: "source.dependi.vulnerability.report",
  VULN_CURRENT: "source.dependi.vulnerability.currentReport",
  ENABLE_LOCK: "source.dependi.enableLockFileParsing",
  DISABLE_LOCK: "source.dependi.disableLockFileParsing",
  LOCK_PARSED: "source.dependi.lockFileParsed"
};
var SOURCE_KINDS = [
  import_node.CodeActionKind.QuickFix,
  import_node.CodeActionKind.Source,
  KIND.UPDATE_ONE,
  KIND.UPDATE_ALL,
  KIND.RETRY,
  KIND.VULN_REPORT,
  KIND.VULN_CURRENT,
  KIND.ENABLE_LOCK,
  KIND.DISABLE_LOCK,
  KIND.LOCK_PARSED
];
function toFsPath(uri) {
  try {
    return Uri.parse(uri).fsPath;
  } catch {
    return uri;
  }
}
function fileNameOf(uri) {
  return import_node_path2.default.basename(toFsPath(uri));
}
function lockConfigKey(language) {
  switch (language) {
    case 1 /* Rust */:
      return "rust.lockFileEnabled" /* RUST_ENABLED_LOCK_FILE */;
    case 3 /* JS */:
      return "npm.lockFileEnabled" /* NPM_ENABLED_LOCK_FILE */;
    case 5 /* PHP */:
      return "php.lockFileEnabled" /* PHP_ENABLED_LOCK_FILE */;
    case 4 /* Python */:
      return "python.lockFileEnabled" /* PYTHON_ENABLED_LOCK_FILE */;
    case 6 /* Dart */:
      return "dart.lockFileEnabled" /* DART_ENABLED_LOCK_FILE */;
    case 7 /* CSharp */:
      return "csharp.lockFileEnabled" /* CSHARP_ENABLED_LOCK_FILE */;
    case 9 /* Elixir */:
      return "elixir.lockFileEnabled" /* ELIXIR_ENABLED_LOCK_FILE */;
    default:
      return void 0;
  }
}
function supportsLockToggle(uri) {
  const filename = fileNameOf(uri);
  if (filename === "go.mod" || filename.toLowerCase().startsWith("requirement")) {
    return false;
  }
  setLanguage(toFsPath(uri));
  return Boolean(lockConfigKey(CurrentLanguage));
}
function lockEnabled(language) {
  switch (language) {
    case 1 /* Rust */:
      return Settings.rust.lockFileEnabled;
    case 3 /* JS */:
      return Settings.npm.lockFileEnabled;
    case 5 /* PHP */:
      return Settings.php.lockFileEnabled;
    case 4 /* Python */:
      return Settings.python.lockFileEnabled;
    case 6 /* Dart */:
      return Settings.dart.lockFileEnabled;
    case 7 /* CSharp */:
      return Settings.csharp.lockFileEnabled;
    case 9 /* Elixir */:
      return Settings.elixir.lockFileEnabled;
    default:
      return false;
  }
}
function command(title, id, uri) {
  return { title, command: id, arguments: [{ uri }] };
}
function commandAction(title, kind, id, uri) {
  return {
    title,
    kind,
    command: command(title, id, uri)
  };
}
function updateAllEdits(document, entry) {
  const language = entry.analysis?.language;
  if (!language) {
    return [];
  }
  const updates = [];
  for (const item of entry.analysis?.updateAll ?? []) {
    const dep = entry.prepared.find(
      (prepared) => prepared.dependency.item.key === item.key && prepared.dependency.item.range.start.line === item.startLine
    )?.dependency;
    if (!dep?.versions?.[0] || !canUpdate(dep, language)) {
      continue;
    }
    const range = dep.item.range;
    const currentText = document.getText({
      start: { line: range.start.line, character: range.start.character },
      end: { line: range.end.line, character: range.end.character }
    });
    if (language === 1 /* Rust */ && isPinnedCargoVersion(currentText.trim())) {
      continue;
    }
    updates.push(
      import_node.TextEdit.replace(
        {
          start: { line: range.start.line, character: range.start.character },
          end: { line: range.end.line, character: range.end.character }
        },
        preservePrefix(currentText, dep.versions[0])
      )
    );
  }
  return updates;
}
function oneDepUpdates(document, entry, range) {
  const language = entry.analysis?.language;
  if (!language) {
    return [];
  }
  const actions = [];
  for (const item of entry.prepared) {
    const dep = item.dependency;
    const depRange = dep.item.range;
    const overlaps = depRange.start.line <= range.end.line && depRange.end.line >= range.start.line;
    if (!overlaps || !canUpdate(dep, language)) {
      continue;
    }
    if (language === 1 /* Rust */ && isPinnedCargoVersion(dep.item.value)) {
      continue;
    }
    const currentText = document.getText({
      start: { line: depRange.start.line, character: depRange.start.character },
      end: { line: depRange.end.line, character: depRange.end.character }
    });
    const rangeEdit = {
      start: { line: depRange.start.line, character: depRange.start.character },
      end: { line: depRange.end.line, character: depRange.end.character }
    };
    const versions12 = dep.versions.slice(0, 12);
    for (const [index, version] of versions12.entries()) {
      if (preservePrefix(currentText, version) === currentText) {
        continue;
      }
      const vulnCount = dep.vulns?.get(version)?.length ?? 0;
      const vulnSuffix = vulnCount > 0 ? `  \u{1F6A8} ${vulnCount}` : "";
      actions.push({
        title: `${index === 0 ? "Update" : "Use"} ${dep.item.key} to ${version}${vulnSuffix}`,
        kind: KIND.UPDATE_ONE,
        isPreferred: index === 0,
        edit: {
          changes: {
            [document.uri]: [import_node.TextEdit.replace(rangeEdit, preservePrefix(currentText, version))]
          }
        }
      });
    }
  }
  return actions;
}
function sourceActions(document, entry) {
  const uri = document.uri;
  const actions = [
    commandAction("Dependi: Retry to fetch dependencies", KIND.RETRY, COMMAND.RETRY, uri),
    commandAction(
      "Dependi: Generate vulnerability report for current dependencies",
      KIND.VULN_CURRENT,
      COMMAND.VULN_CURRENT,
      uri
    ),
    commandAction(
      "Dependi: Generate vulnerability report compared to latest commit",
      KIND.VULN_REPORT,
      COMMAND.VULN_REPORT,
      uri
    )
  ];
  const updates = entry ? updateAllEdits(document, entry) : [];
  if (updates.length > 0) {
    actions.unshift({
      title: `Dependi: Update All dependencies to latest version (${updates.length})`,
      kind: KIND.UPDATE_ALL,
      edit: { changes: { [uri]: updates } }
    });
  }
  if (supportsLockToggle(uri)) {
    const enabled = lockEnabled(CurrentLanguage);
    const hasLockFile = Boolean(editorContext["dependi.hasLockFile"]);
    if (hasLockFile) {
      actions.push(
        commandAction("Dependi: Disable Lock File Parsing", KIND.LOCK_PARSED, COMMAND.LOCK_PARSED, uri)
      );
    } else if (enabled) {
      actions.push(
        commandAction("Dependi: Disable Lock File Parsing", KIND.DISABLE_LOCK, COMMAND.DISABLE_LOCK, uri)
      );
    } else {
      actions.push(
        commandAction("Dependi: Enable Lock File Parsing", KIND.ENABLE_LOCK, COMMAND.ENABLE_LOCK, uri)
      );
    }
  }
  return actions;
}
function codeLenses(uri, entry) {
  const range = { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } };
  const lenses = [
    { range, command: command("Dependi: Retry", COMMAND.RETRY, uri) },
    {
      range,
      command: command("Dependi: Current vuln report", COMMAND.VULN_CURRENT, uri)
    },
    {
      range,
      command: command("Dependi: Compare vuln report", COMMAND.VULN_REPORT, uri)
    }
  ];
  if (entry && updateAllEditsPlaceholder(entry)) {
    lenses.unshift({ range, command: command("Dependi: Update All", COMMAND.UPDATE_ALL, uri) });
  }
  if (supportsLockToggle(uri)) {
    const enabled = lockEnabled(CurrentLanguage);
    const hasLockFile = Boolean(editorContext["dependi.hasLockFile"]);
    if (hasLockFile || enabled) {
      lenses.push({
        range,
        command: command(
          "Dependi: Disable lock file",
          hasLockFile ? COMMAND.LOCK_PARSED : COMMAND.DISABLE_LOCK,
          uri
        )
      });
    } else {
      lenses.push({
        range,
        command: command("Dependi: Enable lock file", COMMAND.ENABLE_LOCK, uri)
      });
    }
  }
  return lenses;
}
function updateAllEditsPlaceholder(entry) {
  return Boolean(entry.analysis?.updateAll?.length);
}
async function applyEdits(host2, uri, edits) {
  if (edits.length === 0) {
    host2.connection.window.showInformationMessage("Dependi: no updatable dependencies found");
    return;
  }
  await host2.connection.workspace.applyEdit({ changes: { [uri]: edits } });
}
async function prepareDocument(host2, uri) {
  const document = host2.getDocument(uri);
  if (!document) {
    host2.connection.window.showErrorMessage("Dependi: open a supported manifest file first");
    return void 0;
  }
  setLanguage(toFsPath(uri));
  setActiveDocument(new VsCodeDocument(document));
  return document;
}
async function toggleLockFile(host2, uri, enabled) {
  const document = await prepareDocument(host2, uri);
  if (!document) {
    return;
  }
  const key = lockConfigKey(CurrentLanguage);
  if (!key) {
    host2.connection.window.showInformationMessage("Dependi: lock file parsing is not used for this file");
    return;
  }
  await workspace.getConfiguration("dependi").update(key, enabled);
  Settings.load();
  editorContext["dependi.isLockFileEnabled"] = enabled;
  if (!enabled) {
    editorContext["dependi.hasLockFile"] = false;
  }
  await host2.analyze(document);
  host2.connection.window.showInformationMessage(
    `Dependi: lock file parsing ${enabled ? "enabled" : "disabled"} for this session. Persist with lsp.dependi.settings.${key} in settings.json.`
  );
}
async function openHtmlReport(host2, html, label) {
  const file = import_node_path2.default.join((0, import_node_os.tmpdir)(), `dependi-${label}-${Date.now()}.html`);
  (0, import_node_fs.writeFileSync)(file, html, "utf8");
  const uri = (0, import_node_url3.pathToFileURL)(file).toString();
  try {
    const shown = await host2.connection.window.showDocument({ uri, external: true, takeFocus: true });
    if (!shown) {
      host2.connection.window.showInformationMessage(`Dependi: vulnerability report saved to ${file}`);
    }
  } catch {
    host2.connection.window.showInformationMessage(`Dependi: vulnerability report saved to ${file}`);
  }
}
async function generateReport(host2, uri, compared) {
  const document = await prepareDocument(host2, uri);
  if (!document) {
    return;
  }
  const dummyProgress = { report: () => {
  } };
  try {
    const html = compared ? await generateMainReport(dummyProgress) : await generateCurrentReport(dummyProgress);
    if (!html) {
      return;
    }
    await openHtmlReport(host2, html, compared ? "compare" : "current");
  } catch (error) {
    host2.connection.window.showErrorMessage(`Dependi: report generation failed: ${error}`);
  }
}
async function executeCommand(host2, command2, args) {
  const uri = args[0]?.uri || (typeof args[0] === "string" ? args[0] : void 0);
  if (!uri && command2 !== COMMAND.REPLACE_VERSION) {
    host2.connection.window.showErrorMessage("Dependi: no active document");
    return;
  }
  switch (command2) {
    case COMMAND.RETRY: {
      const document = await prepareDocument(host2, uri);
      if (!document) {
        return;
      }
      DependencyCache.delete(CurrentLanguage);
      await host2.analyze(document);
      host2.connection.window.showInformationMessage("Dependi: refetching dependencies");
      return;
    }
    case COMMAND.UPDATE_ALL: {
      const document = await prepareDocument(host2, uri);
      if (!document) {
        return;
      }
      const entry = host2.getCache(uri);
      if (!entry) {
        host2.connection.window.showInformationMessage("Dependi: still analyzing, try again in a moment");
        return;
      }
      await applyEdits(host2, uri, updateAllEdits(document, entry));
      return;
    }
    case COMMAND.REPLACE_VERSION: {
      let data;
      try {
        const raw = args[0];
        data = typeof raw === "string" ? JSON.parse(decodeURIComponent(raw)) : raw;
      } catch {
        data = void 0;
      }
      const documentUri = data?.uri || uri;
      if (!data || !documentUri || data.key === void 0 || data.version === void 0 || data.startLine === void 0) {
        return;
      }
      const document = await prepareDocument(host2, documentUri);
      const entry = host2.getCache(documentUri);
      const dep = entry?.prepared.find(
        (item) => item.dependency.item.key === data.key && item.dependency.item.range.start.line === data.startLine
      )?.dependency;
      if (!document || !dep) {
        return;
      }
      if (entry?.analysis?.language === 1 /* Rust */ && isPinnedCargoVersion(dep.item.value)) {
        return;
      }
      const range = dep.item.range;
      const currentText = document.getText({
        start: { line: range.start.line, character: range.start.character },
        end: { line: range.end.line, character: range.end.character }
      });
      await applyEdits(host2, documentUri, [
        import_node.TextEdit.replace(
          {
            start: { line: range.start.line, character: range.start.character },
            end: { line: range.end.line, character: range.end.character }
          },
          preservePrefix(currentText, data.version)
        )
      ]);
      return;
    }
    case COMMAND.VULN_CURRENT:
      await generateReport(host2, uri, false);
      return;
    case COMMAND.VULN_REPORT:
      await generateReport(host2, uri, true);
      return;
    case COMMAND.ENABLE_LOCK:
      await toggleLockFile(host2, uri, true);
      return;
    case COMMAND.DISABLE_LOCK:
    case COMMAND.LOCK_PARSED:
      await toggleLockFile(host2, uri, false);
      return;
    default:
      break;
  }
}

// src/settings.ts
var import_node_crypto = require("node:crypto");
var import_node_fs2 = require("node:fs");
var import_node_os2 = require("node:os");
var import_node_path3 = __toESM(require("node:path"));
var DEVICE_DIR = import_node_path3.default.join((0, import_node_os2.homedir)(), ".dependi");
var DEVICE_FILE = import_node_path3.default.join(DEVICE_DIR, "device-id");
function loadDeviceId() {
  try {
    const existing = (0, import_node_fs2.readFileSync)(DEVICE_FILE, "utf8").trim();
    if (existing) {
      return existing;
    }
  } catch {
  }
  const id = (0, import_node_crypto.randomUUID)();
  try {
    (0, import_node_fs2.mkdirSync)(DEVICE_DIR, { recursive: true });
    (0, import_node_fs2.writeFileSync)(DEVICE_FILE, id, "utf8");
  } catch {
  }
  return id;
}
function applyLspSettings(settings) {
  const raw = settings ?? {};
  const scoped = raw.dependi && typeof raw.dependi === "object" && !Array.isArray(raw.dependi) ? raw.dependi : raw;
  setWorkspaceConfig(scoped);
  Settings.version = "0.7.28";
  if (!Settings.api.deviceID) {
    Settings.api.deviceID = loadDeviceId();
  }
  Settings.load();
}

// src/shims/git.ts
var import_node_child_process = require("node:child_process");
var import_node_fs3 = require("node:fs");
var import_node_path4 = __toESM(require("node:path"));
var import_node_util = require("node:util");
var exec = (0, import_node_util.promisify)(import_node_child_process.execFile);
function findGitRoot(filePath) {
  let dir = import_node_path4.default.dirname(filePath);
  while (true) {
    if ((0, import_node_fs3.existsSync)(import_node_path4.default.join(dir, ".git"))) {
      return dir;
    }
    const parent = import_node_path4.default.dirname(dir);
    if (parent === dir) {
      return void 0;
    }
    dir = parent;
  }
}
async function git(cwd, args) {
  const { stdout } = await exec("git", args, { cwd, maxBuffer: 10 * 1024 * 1024 });
  return stdout;
}
function toRelative(root, filePath) {
  const relative = import_node_path4.default.relative(root, filePath);
  return relative.split(import_node_path4.default.sep).join("/");
}
function createRepository(root) {
  const rootUri = Uri.file(root);
  return {
    rootUri,
    async log(options) {
      const max = options?.maxEntries ?? 32;
      const args = ["log", `--max-count=${max}`, "--format=%H%x1f%an%x1f%ae%x1f%s%x1e"];
      if (options?.path) {
        const relative = options.path.startsWith(root) ? toRelative(root, options.path) : options.path.replace(/^\//, "");
        args.push("--", relative);
      }
      const output = await git(root, args);
      return output.split("").map((chunk) => chunk.trim()).filter(Boolean).map((chunk) => {
        const [hash, authorName, authorEmail, message] = chunk.split("");
        return {
          hash,
          authorName,
          authorEmail,
          message: message ?? "",
          parents: []
        };
      });
    },
    async show(ref, filePath) {
      const relative = filePath.startsWith(root) ? toRelative(root, filePath) : filePath.replace(/^\//, "");
      return git(root, ["show", `${ref}:${relative}`]);
    }
  };
}
function gitExtensionFor(filePath) {
  const empty = { enabled: true, getAPI: () => ({ repositories: [] }) };
  const target = filePath || getActiveFileName();
  if (!target) {
    return empty;
  }
  const root = findGitRoot(target);
  if (!root) {
    return empty;
  }
  const repo = createRepository(root);
  return {
    enabled: true,
    getAPI: () => ({ repositories: [repo] })
  };
}

// src/index.ts
var connection = (0, import_node2.createConnection)(import_node2.ProposedFeatures.all);
var documents = new import_node2.TextDocuments(TextDocument);
setMessageHandlers({
  error: (message) => {
    void connection.window.showErrorMessage(message);
  },
  info: (message) => {
    void connection.window.showInformationMessage(message);
  }
});
registerGitExtension(() => gitExtensionFor());
var cache2 = /* @__PURE__ */ new Map();
var timers = /* @__PURE__ */ new Map();
var analyzeQueue = Promise.resolve();
connection.onInitialize((params) => {
  applyLspSettings({});
  setWorkspaceFolders(params.workspaceFolders ?? void 0, params.rootUri);
  process.stderr.write("[dependi] language server initialized\n");
  return {
    capabilities: {
      textDocumentSync: import_node2.TextDocumentSyncKind.Incremental,
      hoverProvider: true,
      inlayHintProvider: {
        resolveProvider: false
      },
      codeActionProvider: {
        codeActionKinds: SOURCE_KINDS
      },
      executeCommandProvider: {
        commands: ALL_COMMANDS
      },
      codeLensProvider: {
        resolveProvider: false
      },
      completionProvider: {
        triggerCharacters: ['"', "'", ".", "^", "~", ">", "<", "="]
      }
    }
  };
});
connection.onInitialized(async () => {
  try {
    const settings = await Promise.race([
      connection.workspace.getConfiguration("dependi"),
      new Promise((resolve) => setTimeout(() => resolve({}), 750))
    ]);
    applyLspSettings(settings ?? {});
  } catch {
    applyLspSettings({});
  }
});
connection.onDidChangeConfiguration(async () => {
  try {
    const settings = await connection.workspace.getConfiguration("dependi");
    applyLspSettings(settings ?? {});
  } catch {
    applyLspSettings({});
  }
  for (const document of documents.all()) {
    scheduleAnalyze(document, 50);
  }
});
documents.onDidOpen((event) => scheduleAnalyze(event.document, 0));
documents.onDidChangeContent((event) => scheduleAnalyze(event.document, 250));
documents.onDidClose((event) => {
  const uri = event.document.uri;
  const timer = timers.get(uri);
  if (timer) {
    clearTimeout(timer);
    timers.delete(uri);
  }
  cache2.delete(uri);
  connection.sendDiagnostics({ uri, diagnostics: [] });
});
function logInfo(message) {
  connection.console.info(message);
  process.stderr.write(`[dependi] ${message}
`);
}
function logError(message) {
  connection.console.error(message);
  process.stderr.write(`[dependi] ${message}
`);
}
function scheduleAnalyze(document, delay) {
  const previous = timers.get(document.uri);
  if (previous) {
    clearTimeout(previous);
  }
  const timer = setTimeout(() => {
    timers.delete(document.uri);
    void runAnalyze(document);
  }, delay);
  timers.set(document.uri, timer);
}
async function runAnalyze(document) {
  const job = analyzeQueue.then(() => runAnalyzeExclusive(document));
  analyzeQueue = job.catch(() => {
  });
  await job;
}
async function runAnalyzeExclusive(document) {
  if (!isManifestFile(toFsPath2(document.uri))) {
    cache2.delete(document.uri);
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    return;
  }
  const current = cache2.get(document.uri);
  const version = document.version;
  const work = (async () => {
    try {
      const wrapped = new VsCodeDocument(document);
      const analysis = await analyzeDocument(wrapped);
      if (documents.get(document.uri)?.version !== version) {
        return;
      }
      const prepared = analysis ? prepareDependencies(analysis, document.uri) : [];
      const vulnHints = prepared.filter(
        (item) => (item.dependency.vulns instanceof Map ? [...item.dependency.vulns.values()] : Object.values(item.dependency.vulns ?? {})).some((ids) => ids.length > 0)
      ).length;
      cache2.set(document.uri, { version, analysis, prepared });
      logInfo(
        `analyzed ${toFsPath2(document.uri)} (${prepared.length} dependencies, ${vulnHints} with vulns)`
      );
      connection.sendDiagnostics({
        uri: document.uri,
        diagnostics: diagnosticsFor(prepared)
      });
    } catch (error) {
      const detail = error instanceof Error ? `${error.message}
${error.stack}` : String(error);
      logError(`analyze failed: ${detail}`);
    }
  })();
  cache2.set(document.uri, {
    version,
    analysis: current?.analysis,
    prepared: current?.prepared ?? [],
    running: work
  });
  await work;
  void connection.languages.inlayHint.refresh().catch(() => {
  });
  void connection.sendRequest("workspace/codeLens/refresh").catch(() => {
  });
}
function toFsPath2(uri) {
  try {
    return Uri.parse(uri).fsPath;
  } catch {
    return uri;
  }
}
function diagnosticsFor(prepared) {
  const diagnostics = [];
  for (const item of prepared) {
    const dep = item.dependency;
    const range = {
      start: { line: dep.item.range.start.line, character: dep.item.range.start.character },
      end: { line: dep.item.range.end.line, character: dep.item.range.end.character }
    };
    const version = dep.item.value ?? "";
    const vulns = dep.vulns?.get(dep.item.lockedAt ?? version) ?? [];
    if (vulns.length > 0) {
      diagnostics.push({
        range,
        severity: import_node2.DiagnosticSeverity.Warning,
        source: "dependi",
        message: `${dep.item.key} has ${vulns.length} known vulnerabilit${vulns.length === 1 ? "y" : "ies"}: ${vulns.join(", ")}`
      });
    }
    if (item.kind === "ERROR" && dep.error) {
      diagnostics.push({
        range,
        severity: import_node2.DiagnosticSeverity.Information,
        source: "dependi",
        message: dep.error
      });
    }
  }
  return diagnostics;
}
function cached(uri) {
  return cache2.get(uri);
}
function hintsFor(entry) {
  if (!entry?.prepared.length) {
    return [];
  }
  const hints = [];
  for (const item of entry.prepared) {
    if (!item.label) {
      continue;
    }
    const after = Settings.decorator.position !== "before";
    const range = item.dependency.item.decoRange ?? item.dependency.item.range;
    const position = after ? { line: range.end.line, character: range.end.character } : { line: item.dependency.item.line, character: 0 };
    hints.push({
      position,
      label: item.label,
      paddingLeft: after,
      paddingRight: !after,
      tooltip: { kind: import_node2.MarkupKind.Markdown, value: item.hover }
    });
  }
  return hints;
}
async function waitForAnalysis(uri) {
  const document = documents.get(uri);
  if (!document || !isManifestFile(toFsPath2(uri))) {
    return cache2.get(uri);
  }
  const entry = cache2.get(uri);
  if (entry?.running) {
    await entry.running;
  }
  const latest = cache2.get(uri);
  if (latest && latest.version === document.version && (latest.prepared.length > 0 || latest.analysis)) {
    return latest;
  }
  await runAnalyze(document);
  return cache2.get(uri);
}
connection.languages.inlayHint.on(async (params) => {
  const entry = await waitForAnalysis(params.textDocument.uri);
  const hints = hintsFor(entry);
  logInfo(`inlay hints ${toFsPath2(params.textDocument.uri)}: ${hints.length}`);
  return hints;
});
connection.onHover(async (params) => {
  await waitForAnalysis(params.textDocument.uri);
  const item = depAt(params);
  if (!item) {
    return null;
  }
  return {
    contents: { kind: import_node2.MarkupKind.Markdown, value: item.hover },
    range: {
      start: {
        line: item.dependency.item.range.start.line,
        character: item.dependency.item.range.start.character
      },
      end: {
        line: item.dependency.item.range.end.line,
        character: item.dependency.item.range.end.character
      }
    }
  };
});
connection.onCompletion((params) => {
  const document = documents.get(params.textDocument.uri);
  const entry = cached(params.textDocument.uri);
  if (!document || !entry?.prepared.length) {
    return [];
  }
  const item = depAt(params);
  if (!item) {
    return [];
  }
  const versions12 = item.dependency.versions ?? [];
  return versions12.slice(0, 50).map((version, index) => ({
    label: version,
    kind: import_node2.CompletionItemKind.Value,
    sortText: String(index).padStart(4, "0"),
    detail: index === 0 ? "latest" : void 0,
    textEdit: import_node2.TextEdit.replace(
      {
        start: {
          line: item.dependency.item.range.start.line,
          character: item.dependency.item.range.start.character
        },
        end: {
          line: item.dependency.item.range.end.line,
          character: item.dependency.item.range.end.character
        }
      },
      preservePrefix(
        document.getText({
          start: {
            line: item.dependency.item.range.start.line,
            character: item.dependency.item.range.start.character
          },
          end: {
            line: item.dependency.item.range.end.line,
            character: item.dependency.item.range.end.character
          }
        }),
        version
      )
    )
  }));
});
connection.onCodeAction((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document || !isManifestFile(toFsPath2(document.uri))) {
    return [];
  }
  const entry = cached(params.textDocument.uri);
  const actions = sourceActions(document, entry);
  if (entry) {
    actions.unshift(...oneDepUpdates(document, entry, params.range));
  }
  return actions;
});
var host = {
  connection,
  getCache: (uri) => cache2.get(uri),
  getDocument: (uri) => documents.get(uri),
  analyze: (document) => runAnalyze(document)
};
connection.onExecuteCommand(async (params) => {
  await executeCommand(host, params.command, params.arguments ?? []);
});
connection.onCodeLens((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document || !isManifestFile(toFsPath2(document.uri))) {
    return [];
  }
  return codeLenses(document.uri, cached(document.uri));
});
function depAt(params) {
  const entry = cached(params.textDocument.uri);
  if (!entry) {
    return void 0;
  }
  return entry.prepared.find((item) => {
    const start = item.dependency.item.range.start;
    const end = item.dependency.item.decoRange.end;
    if (params.position.line < start.line || params.position.line > end.line) {
      return false;
    }
    if (params.position.line === start.line && params.position.character < Math.max(0, start.character - 40)) {
      return false;
    }
    return true;
  });
}
documents.listen(connection);
connection.listen();
