'use strict';

var React$1 = require('react');
var jsxRuntime = require('react/jsx-runtime');
var require$$2 = require('react-dom');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React$1);

/**
 * Контекст макета
 * @namespace Lucent.LayoutContext
 */
const LayoutContext = React$1.createContext({});
/**
 * Хук для получения API макета
 * @namespace Lucent.useLayout
 */
const useLayout = () => {
    const api = React$1.useContext(LayoutContext);
    if (!api) {
        throw new Error("Доступ к API макета возможен только внутри макета (@see Lucent.Provider)");
    }
    return api;
};

/**
 * Режимы темы макета
 * @namespace Lucent.Constants.ThemeMode
 */
const THEME_MODE_LIGHT = "light";
const THEME_MODE_DARK = "dark";
/**
 * Режимы шапки
 * @namespace Lucent.Constants.HeaderMode
 */
const HEADER_MODE_VISIBLE = "visible";
const HEADER_MODE_HIDDEN = "hidden";
/**
 * Режимы футера
 * @namespace Lucent.Constants.FooterMode
 */
const FOOTER_MODE_VISIBLE = "visible";
const FOOTER_MODE_HIDDEN = "hidden";
/**
 * Режимы сайдбара
 * @namespace Lucent.Constants.SidebarMode
 */
const SIDEBAR_MODE_VISIBLE = "visible";
const SIDEBAR_MODE_HIDDEN = "hidden";
const SIDEBAR_MODE_COLLAPSED = "collapsed";
const SIDEBAR_MODE_EXPANDED = "expanded";
/**
 * Режимы инфобара
 * @namespace Lucent.Constants.InfobarMode
 */
const INFOBAR_MODE_VISIBLE = "visible";
const INFOBAR_MODE_HIDDEN = "hidden";
const INFOBAR_MODE_COLLAPSED = "collapsed";
const INFOBAR_MODE_EXPANDED = "expanded";

/**
 * Объединяет классы в один строковый класс
 * @param inputs - массив классов
 * @returns строковый класс
 */
const cn = (...inputs) => {
    // Обработчик объединения классов
    const handle = (input) => {
        // Если передан falsy значение, то возвращаем пустую строку
        if (input === undefined || input === null || input === false || input === "") {
            return "";
        }
        // Если передан массив, то объединяем классы
        if (Array.isArray(input)) {
            return input.join(" ");
        }
        // Если передан объект, то объединяем классы по ключам
        else if (typeof input === "object") {
            const classes = [];
            Object.entries(input).forEach(([key, value]) => {
                if (value)
                    classes.push(key);
            });
            return classes.join(" ");
        }
        // Все остальное преобразуем в строку
        return input.toString();
    };
    return inputs.map(handle).join(" ");
};
/**
 * Нормализовать конфигурацию макета
 * @param {LayoutConfig} config Конфигурация макета
 * @returns {LayoutConfig} Нормализованная конфигурация макета
 */
const normalizeConfig = (config) => {
    config = config ?? {};
    const modes = config.modes ?? {};
    const slots = config.slots ?? {};
    const sidebarSlots = slots.sidebar ?? {};
    return {
        modes: {
            theme: modes.theme ?? THEME_MODE_LIGHT,
            headerVisible: modes.headerVisible ?? HEADER_MODE_VISIBLE,
            footerVisible: modes.footerVisible ?? FOOTER_MODE_VISIBLE,
            sidebarVisible: modes.sidebarVisible ?? SIDEBAR_MODE_VISIBLE,
            sidebarCollapsed: modes.sidebarCollapsed ?? SIDEBAR_MODE_COLLAPSED,
            infobarVisible: modes.infobarVisible ?? INFOBAR_MODE_VISIBLE,
            infobarCollapsed: modes.infobarCollapsed ?? INFOBAR_MODE_COLLAPSED
        },
        slots: {
            header: slots.header ?? null,
            sidebar: {
                header: sidebarSlots.header ?? null,
                body: sidebarSlots.body ?? null,
                footer: sidebarSlots.footer ?? null
            },
            content: slots.content ?? null,
            infobar: slots.infobar ?? null,
            footer: slots.footer ?? null
        }
    };
};

/**
 * Провайдер макета
 * @namespace Lucent.Provider
 * @param {ProviderProps.children} props.children - контент макета
 * @param {ProviderProps.config} props.config - конфигурация макета
 * @returns {ReactNode}
 */
const Provider = ({ children, config }) => {
    const defaultConfig = normalizeConfig(config);
    const [modes, setModes] = React$1.useState(defaultConfig.modes);
    const [slots, setSlots] = React$1.useState(defaultConfig.slots);
    /**
     * Установить режим
     * @param {LayoutMode} mode - название режима
     * @param {LayoutModeValue} value - значение режима
     */
    const setMode = (mode, value) => {
        setModes(prev => ({ ...prev, [mode]: value }));
    };
    /**
     * Установить слот
     * @param {LayoutSlot} slot - название слота
     * @param {LayoutSlotValue} value - значение слота
     */
    const setSlot = (slot, value) => {
        setSlots(prev => ({ ...prev, [slot]: value }));
    };
    /**
     * Установить слоты для сайдбара
     * @param {SidebarSlots} slots - слоты боковой панели
     */
    const setSidebarSlots = (slots) => {
        setSlots(prev => ({ ...prev, sidebar: slots }));
    };
    /**
     * Установить слот для сайдбара
     * @param {SidebarSlot} slot - название слота
     * @param {ReactNode} value - значение слота
     */
    const setSidebarSlot = (slot, value) => {
        setSidebarSlots({ ...slots.sidebar, [slot]: value });
    };
    /**
     * Получить режим макета
     * @param {LayoutMode} mode - название режима
     * @returns {LayoutModeValue} - значение режима
     */
    const getMode = (mode) => modes[mode] ?? null;
    /**
     * Получить слот макета
     * @param {LayoutSlot} slot - название слота
     * @returns {LayoutSlotValue} - значение слота
     */
    const getSlot = (slot) => slots[slot] ?? null;
    /**
     * Получить слот сайдбара
     * @param {SidebarSlot} slot - название слота
     * @returns {ReactNode} - значение слота
     */
    const getSidebarSlot = (slot) => slots.sidebar?.[slot] ?? null;
    // Проверки режимов макета
    const isThemeDark = () => modes.theme === THEME_MODE_DARK;
    const isHeaderHidden = () => modes.headerVisible === HEADER_MODE_HIDDEN;
    const isFooterHidden = () => modes.footerVisible === FOOTER_MODE_HIDDEN;
    const isSidebarCollapsed = () => modes.sidebarCollapsed === SIDEBAR_MODE_COLLAPSED;
    const isSidebarHidden = () => modes.sidebarVisible === SIDEBAR_MODE_HIDDEN;
    const isInfobarCollapsed = () => modes.infobarCollapsed === INFOBAR_MODE_COLLAPSED;
    const isInfobarHidden = () => modes.infobarVisible === INFOBAR_MODE_HIDDEN;
    // Проверки наличия слотов макета
    const hasSidebar = () => !!slots.sidebar && Object.values(slots.sidebar).some(Boolean);
    const hasHeader = () => !!slots.header;
    const hasContent = () => !!slots.content;
    const hasInfobar = () => !!slots.infobar;
    const hasFooter = () => !!slots.footer;
    // Переключатели режимов макета
    const toggleThemeMode = () => setMode("theme", isThemeDark() ? THEME_MODE_LIGHT : THEME_MODE_DARK);
    const toggleHeaderVisibleMode = () => {
        setMode("headerVisible", isHeaderHidden() ? HEADER_MODE_VISIBLE : HEADER_MODE_HIDDEN);
    };
    const toggleFooterVisibleMode = () => {
        setMode("footerVisible", isFooterHidden() ? FOOTER_MODE_VISIBLE : FOOTER_MODE_HIDDEN);
    };
    const toggleSidebarVisibleMode = () => {
        setMode("sidebarVisible", isSidebarHidden() ? SIDEBAR_MODE_VISIBLE : SIDEBAR_MODE_HIDDEN);
    };
    const toggleSidebarCollapsedMode = () => {
        setMode("sidebarCollapsed", isSidebarCollapsed() ? SIDEBAR_MODE_EXPANDED : SIDEBAR_MODE_COLLAPSED);
    };
    const toggleInfobarVisibleMode = () => {
        setMode("infobarVisible", isInfobarHidden() ? INFOBAR_MODE_VISIBLE : INFOBAR_MODE_HIDDEN);
    };
    const toggleInfobarCollapsedMode = () => {
        setMode("infobarCollapsed", isInfobarCollapsed() ? INFOBAR_MODE_EXPANDED : INFOBAR_MODE_COLLAPSED);
    };
    // API макета
    const api = {
        modes,
        slots,
        setModes,
        setMode,
        setSlots,
        setSlot,
        setSidebarSlots,
        setSidebarSlot,
        getMode,
        getSlot,
        getSidebarSlot,
        hasSidebar,
        hasHeader,
        hasContent,
        hasInfobar,
        hasFooter,
        isThemeDark,
        isHeaderHidden,
        isFooterHidden,
        isSidebarCollapsed,
        isSidebarHidden,
        isInfobarCollapsed,
        isInfobarHidden,
        toggleThemeMode,
        toggleHeaderVisibleMode,
        toggleFooterVisibleMode,
        toggleSidebarVisibleMode,
        toggleSidebarCollapsedMode,
        toggleInfobarVisibleMode,
        toggleInfobarCollapsedMode
    };
    return jsxRuntime.jsx(LayoutContext.Provider, { value: api, children: children });
};

var isArray = Array.isArray;
var toClassName = function (val) {
    var str = '';
    if (typeof val === 'string')
        str += val;
    else if (typeof val === 'object') {
        var tmp = void 0;
        if (isArray(val)) {
            var i = 0;
            var l = val.length;
            while (i < l) {
                tmp = toClassName(val[i++]);
                if (tmp) {
                    if (str) {
                        str += ' ';
                    }
                    str += tmp;
                }
            }
        }
        else {
            // eslint-disable-next-line guard-for-in
            for (tmp in val) {
                if (tmp && val[tmp]) {
                    if (str) {
                        str += ' ';
                    }
                    str += tmp;
                }
            }
        }
    }
    return str;
};
function cnb() {
    var l = arguments.length;
    var i = 0;
    var n;
    var tmp;
    var str = '';
    while (i < l) {
        n = arguments[i++];
        if (n) {
            tmp = toClassName(n);
            if (tmp) {
                if (str) {
                    str += ' ';
                }
                str += tmp;
            }
        }
    }
    return str;
}

function e$1(e,i,t,o){for(;i>=t&&!e("(min-resolution: "+i/o+"dppx)").matches;)i--;return i}function i(i){if(void 0===i&&(i=window),!i)return 1;if(void 0!==i.devicePixelRatio)return i.devicePixelRatio;var t=i.document.frames;return void 0!==t?void 0!==t.devicePixelRatio?t.devicePixelRatio:t.screen.deviceXDPI/t.screen.systemXDPI:void 0!==i.matchMedia?function(i){for(var t=i.matchMedia,o=10,n=.1,r=1,a=o,c=0;c<4;c++)o=(a=10*e$1(t,o,n,r))+9,n=a,r*=10;return a/r}(i):1}

var cjs = {exports: {}};

var Draggable$1 = {};

var propTypes = {exports: {}};

var reactIs = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min () {
	if (hasRequiredReactIs_production_min) return reactIs_production_min;
	hasRequiredReactIs_production_min = 1;
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
	Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
	function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
	reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
	reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
	reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;
	return reactIs_production_min;
}

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development;

function requireReactIs_development () {
	if (hasRequiredReactIs_development) return reactIs_development;
	hasRequiredReactIs_development = 1;



	if (process.env.NODE_ENV !== "production") {
	  (function() {

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	// (unstable) APIs that have been removed. Can we remove the symbols?

	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	} // AsyncMode is deprecated along with isAsyncMode

	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }

	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	reactIs_development.AsyncMode = AsyncMode;
	reactIs_development.ConcurrentMode = ConcurrentMode;
	reactIs_development.ContextConsumer = ContextConsumer;
	reactIs_development.ContextProvider = ContextProvider;
	reactIs_development.Element = Element;
	reactIs_development.ForwardRef = ForwardRef;
	reactIs_development.Fragment = Fragment;
	reactIs_development.Lazy = Lazy;
	reactIs_development.Memo = Memo;
	reactIs_development.Portal = Portal;
	reactIs_development.Profiler = Profiler;
	reactIs_development.StrictMode = StrictMode;
	reactIs_development.Suspense = Suspense;
	reactIs_development.isAsyncMode = isAsyncMode;
	reactIs_development.isConcurrentMode = isConcurrentMode;
	reactIs_development.isContextConsumer = isContextConsumer;
	reactIs_development.isContextProvider = isContextProvider;
	reactIs_development.isElement = isElement;
	reactIs_development.isForwardRef = isForwardRef;
	reactIs_development.isFragment = isFragment;
	reactIs_development.isLazy = isLazy;
	reactIs_development.isMemo = isMemo;
	reactIs_development.isPortal = isPortal;
	reactIs_development.isProfiler = isProfiler;
	reactIs_development.isStrictMode = isStrictMode;
	reactIs_development.isSuspense = isSuspense;
	reactIs_development.isValidElementType = isValidElementType;
	reactIs_development.typeOf = typeOf;
	  })();
	}
	return reactIs_development;
}

var hasRequiredReactIs;

function requireReactIs () {
	if (hasRequiredReactIs) return reactIs.exports;
	hasRequiredReactIs = 1;

	if (process.env.NODE_ENV === 'production') {
	  reactIs.exports = requireReactIs_production_min();
	} else {
	  reactIs.exports = requireReactIs_development();
	}
	return reactIs.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign () {
	if (hasRequiredObjectAssign) return objectAssign;
	hasRequiredObjectAssign = 1;
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};
	return objectAssign;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;

function requireReactPropTypesSecret () {
	if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
	hasRequiredReactPropTypesSecret = 1;

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	ReactPropTypesSecret_1 = ReactPropTypesSecret;
	return ReactPropTypesSecret_1;
}

var has;
var hasRequiredHas;

function requireHas () {
	if (hasRequiredHas) return has;
	hasRequiredHas = 1;
	has = Function.call.bind(Object.prototype.hasOwnProperty);
	return has;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var checkPropTypes_1;
var hasRequiredCheckPropTypes;

function requireCheckPropTypes () {
	if (hasRequiredCheckPropTypes) return checkPropTypes_1;
	hasRequiredCheckPropTypes = 1;

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactPropTypesSecret = requireReactPropTypesSecret();
	  var loggedTypeFailures = {};
	  var has = requireHas();

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) { /**/ }
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
	              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          );
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function() {
	  if (process.env.NODE_ENV !== 'production') {
	    loggedTypeFailures = {};
	  }
	};

	checkPropTypes_1 = checkPropTypes;
	return checkPropTypes_1;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithTypeCheckers;
var hasRequiredFactoryWithTypeCheckers;

function requireFactoryWithTypeCheckers () {
	if (hasRequiredFactoryWithTypeCheckers) return factoryWithTypeCheckers;
	hasRequiredFactoryWithTypeCheckers = 1;

	var ReactIs = requireReactIs();
	var assign = requireObjectAssign();

	var ReactPropTypesSecret = requireReactPropTypesSecret();
	var has = requireHas();
	var checkPropTypes = requireCheckPropTypes();

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bigint: createPrimitiveTypeChecker('bigint'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message, data) {
	    this.message = message;
	    this.data = data && typeof data === 'object' ? data: {};
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError(
	          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
	          {expectedType: expectedType}
	        );
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!ReactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (arguments.length > 1) {
	          printWarning(
	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
	          );
	        } else {
	          printWarning('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var expectedTypes = [];
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
	        if (checkerResult == null) {
	          return null;
	        }
	        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
	          expectedTypes.push(checkerResult.data.expectedType);
	        }
	      }
	      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function invalidValidatorError(componentName, location, propFullName, key, type) {
	    return new PropTypeError(
	      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
	      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
	    );
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (has(shapeTypes, key) && typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	return factoryWithTypeCheckers;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;

function requireFactoryWithThrowingShims () {
	if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
	hasRequiredFactoryWithThrowingShims = 1;

	var ReactPropTypesSecret = requireReactPropTypesSecret();

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	factoryWithThrowingShims = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  }	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  }	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bigint: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	return factoryWithThrowingShims;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = requireReactIs();

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  propTypes.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = requireFactoryWithThrowingShims()();
}

var propTypesExports = propTypes.exports;

var clsx = {exports: {}};

function r(e){var o,t,f="";if("string"==typeof e||"number"==typeof e)f+=e;else if("object"==typeof e)if(Array.isArray(e)){var n=e.length;for(o=0;o<n;o++)e[o]&&(t=r(e[o]))&&(f&&(f+=" "),f+=t);}else for(t in e)e[t]&&(f&&(f+=" "),f+=t);return f}function e(){for(var e,o,t=0,f="",n=arguments.length;t<n;t++)(e=arguments[t])&&(o=r(e))&&(f&&(f+=" "),f+=o);return f}clsx.exports=e,clsx.exports.clsx=e;

var clsxExports = clsx.exports;

var domFns = {};

var shims = {};

Object.defineProperty(shims, "__esModule", {
  value: true
});
shims.dontSetMe = dontSetMe;
shims.findInArray = findInArray;
shims.int = int;
shims.isFunction = isFunction;
shims.isNum = isNum$1;
// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array /*: Array<any> | TouchList*/, callback /*: Function*/) /*: any*/{
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}
function isFunction(func /*: any*/) /*: boolean %checks*/{
  // $FlowIgnore[method-unbinding]
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}
function isNum$1(num /*: any*/) /*: boolean %checks*/{
  return typeof num === 'number' && !isNaN(num);
}
function int(a /*: string*/) /*: number*/{
  return parseInt(a, 10);
}
function dontSetMe(props /*: Object*/, propName /*: string*/, componentName /*: string*/) /*: ?Error*/{
  if (props[propName]) {
    return new Error(`Invalid prop ${propName} passed to ${componentName} - do not set this, set it on the child.`);
  }
}

var getPrefix$1 = {};

Object.defineProperty(getPrefix$1, "__esModule", {
  value: true
});
getPrefix$1.browserPrefixToKey = browserPrefixToKey;
getPrefix$1.browserPrefixToStyle = browserPrefixToStyle;
getPrefix$1.default = void 0;
getPrefix$1.getPrefix = getPrefix;
const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
function getPrefix() /*: string*/{
  let prop /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
  // Ensure we're running in an environment where there is actually a global
  // `window` obj
  if (typeof window === 'undefined') return '';

  // If we're in a pseudo-browser server-side environment, this access
  // path may not exist, so bail out if it doesn't.
  const style = window.document?.documentElement?.style;
  if (!style) return '';
  if (prop in style) return '';
  for (let i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }
  return '';
}
function browserPrefixToKey(prop /*: string*/, prefix /*: string*/) /*: string*/{
  return prefix ? `${prefix}${kebabToTitleCase(prop)}` : prop;
}
function browserPrefixToStyle(prop /*: string*/, prefix /*: string*/) /*: string*/{
  return prefix ? `-${prefix.toLowerCase()}-${prop}` : prop;
}
function kebabToTitleCase(str /*: string*/) /*: string*/{
  let out = '';
  let shouldCapitalize = true;
  for (let i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}

// Default export is the prefix itself, like 'Moz', 'Webkit', etc
// Note that you may have to re-test for certain things; for instance, Chrome 50
// can handle unprefixed `transform`, but not unprefixed `user-select`
getPrefix$1.default = (getPrefix() /*: string*/);

Object.defineProperty(domFns, "__esModule", {
  value: true
});
domFns.addClassName = addClassName;
domFns.addEvent = addEvent;
domFns.addUserSelectStyles = addUserSelectStyles;
domFns.createCSSTransform = createCSSTransform;
domFns.createSVGTransform = createSVGTransform;
domFns.getTouch = getTouch;
domFns.getTouchIdentifier = getTouchIdentifier;
domFns.getTranslation = getTranslation;
domFns.innerHeight = innerHeight;
domFns.innerWidth = innerWidth;
domFns.matchesSelector = matchesSelector;
domFns.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
domFns.offsetXYFromParent = offsetXYFromParent;
domFns.outerHeight = outerHeight;
domFns.outerWidth = outerWidth;
domFns.removeClassName = removeClassName;
domFns.removeEvent = removeEvent;
domFns.scheduleRemoveUserSelectStyles = scheduleRemoveUserSelectStyles;
var _shims$2 = shims;
var _getPrefix = _interopRequireWildcard$1(getPrefix$1);
function _interopRequireWildcard$1(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard$1 = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/*:: import type {ControlPosition, PositionOffsetControlPosition, MouseTouchEvent} from './types';*/
let matchesSelectorFunc = '';
function matchesSelector(el /*: Node*/, selector /*: string*/) /*: boolean*/{
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (0, _shims$2.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
      // $FlowIgnore: Doesn't think elements are indexable
      return (0, _shims$2.isFunction)(el[method]);
    });
  }

  // Might not be found entirely (not an Element?) - in that case, bail
  // $FlowIgnore: Doesn't think elements are indexable
  if (!(0, _shims$2.isFunction)(el[matchesSelectorFunc])) return false;

  // $FlowIgnore: Doesn't think elements are indexable
  return el[matchesSelectorFunc](selector);
}

// Works up the tree to the draggable itself attempting to match selector.
function matchesSelectorAndParentsTo(el /*: Node*/, selector /*: string*/, baseNode /*: Node*/) /*: boolean*/{
  let node = el;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    // $FlowIgnore[incompatible-type]
    node = node.parentNode;
  } while (node);
  return false;
}
function addEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/, inputOptions /*: Object*/) /*: void*/{
  if (!el) return;
  const options = {
    capture: true,
    ...inputOptions
  };
  // $FlowIgnore[method-unbinding]
  if (el.addEventListener) {
    el.addEventListener(event, handler, options);
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}
function removeEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/, inputOptions /*: Object*/) /*: void*/{
  if (!el) return;
  const options = {
    capture: true,
    ...inputOptions
  };
  // $FlowIgnore[method-unbinding]
  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options);
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}
function outerHeight(node /*: HTMLElement*/) /*: number*/{
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += (0, _shims$2.int)(computedStyle.borderTopWidth);
  height += (0, _shims$2.int)(computedStyle.borderBottomWidth);
  return height;
}
function outerWidth(node /*: HTMLElement*/) /*: number*/{
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += (0, _shims$2.int)(computedStyle.borderLeftWidth);
  width += (0, _shims$2.int)(computedStyle.borderRightWidth);
  return width;
}
function innerHeight(node /*: HTMLElement*/) /*: number*/{
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= (0, _shims$2.int)(computedStyle.paddingTop);
  height -= (0, _shims$2.int)(computedStyle.paddingBottom);
  return height;
}
function innerWidth(node /*: HTMLElement*/) /*: number*/{
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= (0, _shims$2.int)(computedStyle.paddingLeft);
  width -= (0, _shims$2.int)(computedStyle.paddingRight);
  return width;
}
/*:: interface EventWithOffset {
  clientX: number, clientY: number
}*/
// Get from offsetParent
function offsetXYFromParent(evt /*: EventWithOffset*/, offsetParent /*: HTMLElement*/, scale /*: number*/) /*: ControlPosition*/{
  const isBody = offsetParent === offsetParent.ownerDocument.body;
  const offsetParentRect = isBody ? {
    left: 0,
    top: 0
  } : offsetParent.getBoundingClientRect();
  const x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
  const y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;
  return {
    x,
    y
  };
}
function createCSSTransform(controlPos /*: ControlPosition*/, positionOffset /*: PositionOffsetControlPosition*/) /*: Object*/{
  const translation = getTranslation(controlPos, positionOffset, 'px');
  return {
    [(0, _getPrefix.browserPrefixToKey)('transform', _getPrefix.default)]: translation
  };
}
function createSVGTransform(controlPos /*: ControlPosition*/, positionOffset /*: PositionOffsetControlPosition*/) /*: string*/{
  const translation = getTranslation(controlPos, positionOffset, '');
  return translation;
}
function getTranslation(_ref /*:: */, positionOffset /*: PositionOffsetControlPosition*/, unitSuffix /*: string*/) /*: string*/{
  let {
    x,
    y
  } /*: ControlPosition*/ = _ref /*: ControlPosition*/;
  let translation = `translate(${x}${unitSuffix},${y}${unitSuffix})`;
  if (positionOffset) {
    const defaultX = `${typeof positionOffset.x === 'string' ? positionOffset.x : positionOffset.x + unitSuffix}`;
    const defaultY = `${typeof positionOffset.y === 'string' ? positionOffset.y : positionOffset.y + unitSuffix}`;
    translation = `translate(${defaultX}, ${defaultY})` + translation;
  }
  return translation;
}
function getTouch(e /*: MouseTouchEvent*/, identifier /*: number*/) /*: ?{clientX: number, clientY: number}*/{
  return e.targetTouches && (0, _shims$2.findInArray)(e.targetTouches, t => identifier === t.identifier) || e.changedTouches && (0, _shims$2.findInArray)(e.changedTouches, t => identifier === t.identifier);
}
function getTouchIdentifier(e /*: MouseTouchEvent*/) /*: ?number*/{
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}

// User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.

// Note we're passing `document` b/c we could be iframed
function addUserSelectStyles(doc /*: ?Document*/) {
  if (!doc) return;
  let styleEl = doc.getElementById('react-draggable-style-el');
  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {all: inherit;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }
  if (doc.body) addClassName(doc.body, 'react-draggable-transparent-selection');
}
function scheduleRemoveUserSelectStyles(doc /*: ?Document*/) {
  // Prevent a possible "forced reflow"
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(() => {
      removeUserSelectStyles(doc);
    });
  } else {
    removeUserSelectStyles(doc);
  }
}
function removeUserSelectStyles(doc /*: ?Document*/) {
  if (!doc) return;
  try {
    if (doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection');
    // $FlowIgnore: IE
    if (doc.selection) {
      // $FlowIgnore: IE
      doc.selection.empty();
    } else {
      // Remove selection caused by scroll, unless it's a focused input
      // (we use doc.defaultView in case we're in an iframe)
      const selection = (doc.defaultView || window).getSelection();
      if (selection && selection.type !== 'Caret') {
        selection.removeAllRanges();
      }
    }
  } catch (e) {
    // probably IE
  }
}
function addClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
      el.className += ` ${className}`;
    }
  }
}
function removeClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp(`(?:^|\\s)${className}(?!\\S)`, 'g'), '');
  }
}

var positionFns = {};

Object.defineProperty(positionFns, "__esModule", {
  value: true
});
positionFns.canDragX = canDragX;
positionFns.canDragY = canDragY;
positionFns.createCoreData = createCoreData;
positionFns.createDraggableData = createDraggableData;
positionFns.getBoundPosition = getBoundPosition;
positionFns.getControlPosition = getControlPosition;
positionFns.snapToGrid = snapToGrid;
var _shims$1 = shims;
var _domFns$1 = domFns;
/*:: import type Draggable from '../Draggable';*/
/*:: import type {Bounds, ControlPosition, DraggableData, MouseTouchEvent} from './types';*/
/*:: import type DraggableCore from '../DraggableCore';*/
function getBoundPosition(draggable /*: Draggable*/, x /*: number*/, y /*: number*/) /*: [number, number]*/{
  // If no bounds, short-circuit and move on
  if (!draggable.props.bounds) return [x, y];

  // Clone new bounds
  let {
    bounds
  } = draggable.props;
  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
  const node = findDOMNode(draggable);
  if (typeof bounds === 'string') {
    const {
      ownerDocument
    } = node;
    const ownerWindow = ownerDocument.defaultView;
    let boundNode;
    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      // Flow assigns the wrong return type (Node) for getRootNode(),
      // so we cast it to one of the correct types (Element).
      // The others are Document and ShadowRoot.
      // All three implement querySelector() so it's safe to call.
      const rootNode = ((node.getRootNode() /*: any*/) /*: Element*/);
      boundNode = rootNode.querySelector(bounds);
    }
    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    const boundNodeEl /*: HTMLElement*/ = boundNode; // for Flow, can't seem to refine correctly
    const nodeStyle = ownerWindow.getComputedStyle(node);
    const boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + (0, _shims$1.int)(boundNodeStyle.paddingLeft) + (0, _shims$1.int)(nodeStyle.marginLeft),
      top: -node.offsetTop + (0, _shims$1.int)(boundNodeStyle.paddingTop) + (0, _shims$1.int)(nodeStyle.marginTop),
      right: (0, _domFns$1.innerWidth)(boundNodeEl) - (0, _domFns$1.outerWidth)(node) - node.offsetLeft + (0, _shims$1.int)(boundNodeStyle.paddingRight) - (0, _shims$1.int)(nodeStyle.marginRight),
      bottom: (0, _domFns$1.innerHeight)(boundNodeEl) - (0, _domFns$1.outerHeight)(node) - node.offsetTop + (0, _shims$1.int)(boundNodeStyle.paddingBottom) - (0, _shims$1.int)(nodeStyle.marginBottom)
    };
  }

  // Keep x and y below right and bottom limits...
  if ((0, _shims$1.isNum)(bounds.right)) x = Math.min(x, bounds.right);
  if ((0, _shims$1.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);

  // But above left and top limits.
  if ((0, _shims$1.isNum)(bounds.left)) x = Math.max(x, bounds.left);
  if ((0, _shims$1.isNum)(bounds.top)) y = Math.max(y, bounds.top);
  return [x, y];
}
function snapToGrid(grid /*: [number, number]*/, pendingX /*: number*/, pendingY /*: number*/) /*: [number, number]*/{
  const x = Math.round(pendingX / grid[0]) * grid[0];
  const y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}
function canDragX(draggable /*: Draggable*/) /*: boolean*/{
  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
}
function canDragY(draggable /*: Draggable*/) /*: boolean*/{
  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
}

// Get {x, y} positions from event.
function getControlPosition(e /*: MouseTouchEvent*/, touchIdentifier /*: ?number*/, draggableCore /*: DraggableCore*/) /*: ?ControlPosition*/{
  const touchObj = typeof touchIdentifier === 'number' ? (0, _domFns$1.getTouch)(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
  const node = findDOMNode(draggableCore);
  // User can provide an offsetParent if desired.
  const offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return (0, _domFns$1.offsetXYFromParent)(touchObj || e, offsetParent, draggableCore.props.scale);
}

// Create an data object exposed by <DraggableCore>'s events
function createCoreData(draggable /*: DraggableCore*/, x /*: number*/, y /*: number*/) /*: DraggableData*/{
  const isStart = !(0, _shims$1.isNum)(draggable.lastX);
  const node = findDOMNode(draggable);
  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x,
      y
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node,
      deltaX: x - draggable.lastX,
      deltaY: y - draggable.lastY,
      lastX: draggable.lastX,
      lastY: draggable.lastY,
      x,
      y
    };
  }
}

// Create an data exposed by <Draggable>'s events
function createDraggableData(draggable /*: Draggable*/, coreData /*: DraggableData*/) /*: DraggableData*/{
  const scale = draggable.props.scale;
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX / scale,
    y: draggable.state.y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
}

// A lot faster than stringify/parse
function cloneBounds(bounds /*: Bounds*/) /*: Bounds*/{
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}
function findDOMNode(draggable /*: Draggable | DraggableCore*/) /*: HTMLElement*/{
  const node = draggable.findDOMNode();
  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  }
  // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME
  return node;
}

var DraggableCore$2 = {};

var log$1 = {};

Object.defineProperty(log$1, "__esModule", {
  value: true
});
log$1.default = log;
/*eslint no-console:0*/
function log() {
}

Object.defineProperty(DraggableCore$2, "__esModule", {
  value: true
});
DraggableCore$2.default = void 0;
var React = _interopRequireWildcard(React$1);
var _propTypes = _interopRequireDefault(propTypesExports);
var _reactDom = _interopRequireDefault(require$$2);
var _domFns = domFns;
var _positionFns = positionFns;
var _shims = shims;
var _log = _interopRequireDefault(log$1);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*:: import type {EventHandler, MouseTouchEvent} from './utils/types';*/
/*:: import type {Element as ReactElement} from 'react';*/
// Simple abstraction for dragging events names.
const eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
};

// Default to mouse events.
let dragEventFor = eventsFor.mouse;
/*:: export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
};*/
/*:: export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;*/
/*:: export type ControlPosition = {x: number, y: number};*/
/*:: export type PositionOffsetControlPosition = {x: number|string, y: number|string};*/
/*:: export type DraggableCoreDefaultProps = {
  allowAnyClick: boolean,
  allowMobileScroll: boolean,
  disabled: boolean,
  enableUserSelectHack: boolean,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
  scale: number,
};*/
/*:: export type DraggableCoreProps = {
  ...DraggableCoreDefaultProps,
  cancel: string,
  children: ReactElement<any>,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  nodeRef?: ?React.ElementRef<any>,
};*/
//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//

let DraggableCore$1 = class DraggableCore extends React.Component /*:: <DraggableCoreProps>*/{
  constructor() {
    super(...arguments);
    _defineProperty(this, "dragging", false);
    // Used while dragging to determine deltas.
    _defineProperty(this, "lastX", NaN);
    _defineProperty(this, "lastY", NaN);
    _defineProperty(this, "touchIdentifier", null);
    _defineProperty(this, "mounted", false);
    _defineProperty(this, "handleDragStart", e => {
      // Make it possible to attach event handlers on top of this one.
      this.props.onMouseDown(e);

      // Only accept left-clicks.
      if (!this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

      // Get nodes. Be sure to grab relative document (could be iframed)
      const thisNode = this.findDOMNode();
      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error('<DraggableCore> not mounted on DragStart!');
      }
      const {
        ownerDocument
      } = thisNode;

      // Short circuit if handle or cancel prop was provided and selector doesn't match.
      if (this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.handle, thisNode) || this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.cancel, thisNode)) {
        return;
      }

      // Prevent scrolling on mobile devices, like ipad/iphone.
      // Important that this is after handle/cancel.
      if (e.type === 'touchstart' && !this.props.allowMobileScroll) e.preventDefault();

      // Set touch identifier in component state if this is a touch event. This allows us to
      // distinguish between individual touches on multitouch screens by identifying which
      // touchpoint was set to this element.
      const touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
      this.touchIdentifier = touchIdentifier;

      // Get the current drag point from the event. This is used as the offset.
      const position = (0, _positionFns.getControlPosition)(e, touchIdentifier, this);
      if (position == null) return; // not possible but satisfies flow
      const {
        x,
        y
      } = position;

      // Create an event object with all the data parents need to make a decision here.
      const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
      (0, _log.default)('DraggableCore: handleDragStart: %j', coreEvent);

      // Call event handler. If it returns explicit false, cancel.
      (0, _log.default)('calling', this.props.onStart);
      const shouldUpdate = this.props.onStart(e, coreEvent);
      if (shouldUpdate === false || this.mounted === false) return;

      // Add a style to the body to disable user-select. This prevents text from
      // being selected all over the page.
      if (this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument);

      // Initiate dragging. Set the current x and y as offsets
      // so we know how much we've moved during the drag. This allows us
      // to drag elements around even if they have been moved, without issue.
      this.dragging = true;
      this.lastX = x;
      this.lastY = y;

      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
      // this element. We use different events depending on whether or not we have detected that this
      // is a touch-capable device.
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, this.handleDrag);
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, this.handleDragStop);
    });
    _defineProperty(this, "handleDrag", e => {
      // Get the current drag point from the event. This is used as the offset.
      const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
      if (position == null) return;
      let {
        x,
        y
      } = position;

      // Snap to grid if prop has been provided
      if (Array.isArray(this.props.grid)) {
        let deltaX = x - this.lastX,
          deltaY = y - this.lastY;
        [deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
        if (!deltaX && !deltaY) return; // skip useless drag
        x = this.lastX + deltaX, y = this.lastY + deltaY;
      }
      const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
      (0, _log.default)('DraggableCore: handleDrag: %j', coreEvent);

      // Call event handler. If it returns explicit false, trigger end.
      const shouldUpdate = this.props.onDrag(e, coreEvent);
      if (shouldUpdate === false || this.mounted === false) {
        try {
          // $FlowIgnore
          this.handleDragStop(new MouseEvent('mouseup'));
        } catch (err) {
          // Old browsers
          const event = ((document.createEvent('MouseEvents') /*: any*/) /*: MouseTouchEvent*/);
          // I see why this insanity was deprecated
          // $FlowIgnore
          event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          this.handleDragStop(event);
        }
        return;
      }
      this.lastX = x;
      this.lastY = y;
    });
    _defineProperty(this, "handleDragStop", e => {
      if (!this.dragging) return;
      const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
      if (position == null) return;
      let {
        x,
        y
      } = position;

      // Snap to grid if prop has been provided
      if (Array.isArray(this.props.grid)) {
        let deltaX = x - this.lastX || 0;
        let deltaY = y - this.lastY || 0;
        [deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
        x = this.lastX + deltaX, y = this.lastY + deltaY;
      }
      const coreEvent = (0, _positionFns.createCoreData)(this, x, y);

      // Call event handler
      const shouldContinue = this.props.onStop(e, coreEvent);
      if (shouldContinue === false || this.mounted === false) return false;
      const thisNode = this.findDOMNode();
      if (thisNode) {
        // Remove user-select hack
        if (this.props.enableUserSelectHack) (0, _domFns.scheduleRemoveUserSelectStyles)(thisNode.ownerDocument);
      }
      (0, _log.default)('DraggableCore: handleDragStop: %j', coreEvent);

      // Reset the el.
      this.dragging = false;
      this.lastX = NaN;
      this.lastY = NaN;
      if (thisNode) {
        // Remove event handlers
        (0, _log.default)('DraggableCore: Removing handlers');
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, this.handleDrag);
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, this.handleDragStop);
      }
    });
    _defineProperty(this, "onMouseDown", e => {
      dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

      return this.handleDragStart(e);
    });
    _defineProperty(this, "onMouseUp", e => {
      dragEventFor = eventsFor.mouse;
      return this.handleDragStop(e);
    });
    // Same as onMouseDown (start drag), but now consider this a touch device.
    _defineProperty(this, "onTouchStart", e => {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;
      return this.handleDragStart(e);
    });
    _defineProperty(this, "onTouchEnd", e => {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;
      return this.handleDragStop(e);
    });
  }
  componentDidMount() {
    this.mounted = true;
    // Touch handlers must be added with {passive: false} to be cancelable.
    // https://developers.google.com/web/updates/2017/01/scrolling-intervention
    const thisNode = this.findDOMNode();
    if (thisNode) {
      (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
        passive: false
      });
    }
  }
  componentWillUnmount() {
    this.mounted = false;
    // Remove any leftover event handlers. Remove both touch and mouse handlers in case
    // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
    const thisNode = this.findDOMNode();
    if (thisNode) {
      const {
        ownerDocument
      } = thisNode;
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
      (0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
        passive: false
      });
      if (this.props.enableUserSelectHack) (0, _domFns.scheduleRemoveUserSelectStyles)(ownerDocument);
    }
  }

  // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
  // the underlying DOM node ourselves. See the README for more information.
  findDOMNode() /*: ?HTMLElement*/{
    return this.props?.nodeRef ? this.props?.nodeRef?.current : _reactDom.default.findDOMNode(this);
  }
  render() /*: React.Element<any>*/{
    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return /*#__PURE__*/React.cloneElement(React.Children.only(this.props.children), {
      // Note: mouseMove handler is attached to document so it will still function
      // when the user drags quickly and leaves the bounds of the element.
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      // onTouchStart is added on `componentDidMount` so they can be added with
      // {passive: false}, which allows it to cancel. See
      // https://developers.google.com/web/updates/2017/01/scrolling-intervention
      onTouchEnd: this.onTouchEnd
    });
  }
};
DraggableCore$2.default = DraggableCore$1;
_defineProperty(DraggableCore$1, "displayName", 'DraggableCore');
_defineProperty(DraggableCore$1, "propTypes", {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: _propTypes.default.bool,
  /**
   * `allowMobileScroll` turns off cancellation of the 'touchstart' event
   * on mobile devices. Only enable this if you are having trouble with click
   * events. Prefer using 'handle' / 'cancel' instead.
   *
   * Defaults to `false`.
   */
  allowMobileScroll: _propTypes.default.bool,
  children: _propTypes.default.node.isRequired,
  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: _propTypes.default.bool,
  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: _propTypes.default.bool,
  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function (props /*: DraggableCoreProps*/, propName /*: $Keys<DraggableCoreProps>*/) {
    if (props[propName] && props[propName].nodeType !== 1) {
      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
    }
  },
  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: _propTypes.default.arrayOf(_propTypes.default.number),
  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: _propTypes.default.string,
  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: _propTypes.default.string,
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * as in this example:
   *
   * function MyComponent() {
   *   const nodeRef = React.useRef(null);
   *   return (
   *     <Draggable nodeRef={nodeRef}>
   *       <div ref={nodeRef}>Example Target</div>
   *     </Draggable>
   *   );
   * }
   *
   * This can be used for arbitrarily nested components, so long as the ref ends up
   * pointing to the actual child DOM node and not a custom component.
   */
  nodeRef: _propTypes.default.object,
  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: _propTypes.default.func,
  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: _propTypes.default.func,
  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: _propTypes.default.func,
  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: _propTypes.default.func,
  /**
   * `scale`, if set, applies scaling while dragging an element
   */
  scale: _propTypes.default.number,
  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
});
_defineProperty(DraggableCore$1, "defaultProps", {
  allowAnyClick: false,
  // by default only accept left click
  allowMobileScroll: false,
  disabled: false,
  enableUserSelectHack: true,
  onStart: function () {},
  onDrag: function () {},
  onStop: function () {},
  onMouseDown: function () {},
  scale: 1
});

(function (exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "DraggableCore", {
	  enumerable: true,
	  get: function () {
	    return _DraggableCore.default;
	  }
	});
	exports.default = void 0;
	var React = _interopRequireWildcard(React$1);
	var _propTypes = _interopRequireDefault(propTypesExports);
	var _reactDom = _interopRequireDefault(require$$2);
	var _clsx = clsxExports;
	var _domFns = domFns;
	var _positionFns = positionFns;
	var _shims = shims;
	var _DraggableCore = _interopRequireDefault(DraggableCore$2);
	var _log = _interopRequireDefault(log$1);
	function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
	function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
	function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
	function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
	function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
	function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /*:: import type {ControlPosition, PositionOffsetControlPosition, DraggableCoreProps, DraggableCoreDefaultProps} from './DraggableCore';*/
	/*:: import type {Bounds, DraggableEventHandler} from './utils/types';*/
	/*:: import type {Element as ReactElement} from 'react';*/
	/*:: type DraggableState = {
	  dragging: boolean,
	  dragged: boolean,
	  x: number, y: number,
	  slackX: number, slackY: number,
	  isElementSVG: boolean,
	  prevPropsPosition: ?ControlPosition,
	};*/
	/*:: export type DraggableDefaultProps = {
	  ...DraggableCoreDefaultProps,
	  axis: 'both' | 'x' | 'y' | 'none',
	  bounds: Bounds | string | false,
	  defaultClassName: string,
	  defaultClassNameDragging: string,
	  defaultClassNameDragged: string,
	  defaultPosition: ControlPosition,
	  scale: number,
	};*/
	/*:: export type DraggableProps = {
	  ...DraggableCoreProps,
	  ...DraggableDefaultProps,
	  positionOffset: PositionOffsetControlPosition,
	  position: ControlPosition,
	};*/
	//
	// Define <Draggable>
	//
	class Draggable extends React.Component /*:: <DraggableProps, DraggableState>*/{
	  // React 16.3+
	  // Arity (props, state)
	  static getDerivedStateFromProps(_ref /*:: */, _ref2 /*:: */) /*: ?Partial<DraggableState>*/{
	    let {
	      position
	    } /*: DraggableProps*/ = _ref /*: DraggableProps*/;
	    let {
	      prevPropsPosition
	    } /*: DraggableState*/ = _ref2 /*: DraggableState*/;
	    // Set x/y if a new position is provided in props that is different than the previous.
	    if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
	      (0, _log.default)('Draggable: getDerivedStateFromProps %j', {
	        position,
	        prevPropsPosition
	      });
	      return {
	        x: position.x,
	        y: position.y,
	        prevPropsPosition: {
	          ...position
	        }
	      };
	    }
	    return null;
	  }
	  constructor(props /*: DraggableProps*/) {
	    super(props);
	    _defineProperty(this, "onDragStart", (e, coreData) => {
	      (0, _log.default)('Draggable: onDragStart: %j', coreData);

	      // Short-circuit if user's callback killed it.
	      const shouldStart = this.props.onStart(e, (0, _positionFns.createDraggableData)(this, coreData));
	      // Kills start event on core as well, so move handlers are never bound.
	      if (shouldStart === false) return false;
	      this.setState({
	        dragging: true,
	        dragged: true
	      });
	    });
	    _defineProperty(this, "onDrag", (e, coreData) => {
	      if (!this.state.dragging) return false;
	      (0, _log.default)('Draggable: onDrag: %j', coreData);
	      const uiData = (0, _positionFns.createDraggableData)(this, coreData);
	      const newState = {
	        x: uiData.x,
	        y: uiData.y,
	        slackX: 0,
	        slackY: 0
	      };

	      // Keep within bounds.
	      if (this.props.bounds) {
	        // Save original x and y.
	        const {
	          x,
	          y
	        } = newState;

	        // Add slack to the values used to calculate bound position. This will ensure that if
	        // we start removing slack, the element won't react to it right away until it's been
	        // completely removed.
	        newState.x += this.state.slackX;
	        newState.y += this.state.slackY;

	        // Get bound position. This will ceil/floor the x and y within the boundaries.
	        const [newStateX, newStateY] = (0, _positionFns.getBoundPosition)(this, newState.x, newState.y);
	        newState.x = newStateX;
	        newState.y = newStateY;

	        // Recalculate slack by noting how much was shaved by the boundPosition handler.
	        newState.slackX = this.state.slackX + (x - newState.x);
	        newState.slackY = this.state.slackY + (y - newState.y);

	        // Update the event we fire to reflect what really happened after bounds took effect.
	        uiData.x = newState.x;
	        uiData.y = newState.y;
	        uiData.deltaX = newState.x - this.state.x;
	        uiData.deltaY = newState.y - this.state.y;
	      }

	      // Short-circuit if user's callback killed it.
	      const shouldUpdate = this.props.onDrag(e, uiData);
	      if (shouldUpdate === false) return false;
	      this.setState(newState);
	    });
	    _defineProperty(this, "onDragStop", (e, coreData) => {
	      if (!this.state.dragging) return false;

	      // Short-circuit if user's callback killed it.
	      const shouldContinue = this.props.onStop(e, (0, _positionFns.createDraggableData)(this, coreData));
	      if (shouldContinue === false) return false;
	      (0, _log.default)('Draggable: onDragStop: %j', coreData);
	      const newState /*: Partial<DraggableState>*/ = {
	        dragging: false,
	        slackX: 0,
	        slackY: 0
	      };

	      // If this is a controlled component, the result of this operation will be to
	      // revert back to the old position. We expect a handler on `onDragStop`, at the least.
	      const controlled = Boolean(this.props.position);
	      if (controlled) {
	        const {
	          x,
	          y
	        } = this.props.position;
	        newState.x = x;
	        newState.y = y;
	      }
	      this.setState(newState);
	    });
	    this.state = {
	      // Whether or not we are currently dragging.
	      dragging: false,
	      // Whether or not we have been dragged before.
	      dragged: false,
	      // Current transform x and y.
	      x: props.position ? props.position.x : props.defaultPosition.x,
	      y: props.position ? props.position.y : props.defaultPosition.y,
	      prevPropsPosition: {
	        ...props.position
	      },
	      // Used for compensating for out-of-bounds drags
	      slackX: 0,
	      slackY: 0,
	      // Can only determine if SVG after mounting
	      isElementSVG: false
	    };
	    if (props.position && !(props.onDrag || props.onStop)) {
	      // eslint-disable-next-line no-console
	      console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
	    }
	  }
	  componentDidMount() {
	    // Check to see if the element passed is an instanceof SVGElement
	    if (typeof window.SVGElement !== 'undefined' && this.findDOMNode() instanceof window.SVGElement) {
	      this.setState({
	        isElementSVG: true
	      });
	    }
	  }
	  componentWillUnmount() {
	    if (this.state.dragging) {
	      this.setState({
	        dragging: false
	      }); // prevents invariant if unmounted while dragging
	    }
	  }

	  // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
	  // the underlying DOM node ourselves. See the README for more information.
	  findDOMNode() /*: ?HTMLElement*/{
	    return this.props?.nodeRef?.current ?? _reactDom.default.findDOMNode(this);
	  }
	  render() /*: ReactElement<any>*/{
	    const {
	      axis,
	      bounds,
	      children,
	      defaultPosition,
	      defaultClassName,
	      defaultClassNameDragging,
	      defaultClassNameDragged,
	      position,
	      positionOffset,
	      scale,
	      ...draggableCoreProps
	    } = this.props;
	    let style = {};
	    let svgTransform = null;

	    // If this is controlled, we don't want to move it - unless it's dragging.
	    const controlled = Boolean(position);
	    const draggable = !controlled || this.state.dragging;
	    const validPosition = position || defaultPosition;
	    const transformOpts = {
	      // Set left if horizontal drag is enabled
	      x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : validPosition.x,
	      // Set top if vertical drag is enabled
	      y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : validPosition.y
	    };

	    // If this element was SVG, we use the `transform` attribute.
	    if (this.state.isElementSVG) {
	      svgTransform = (0, _domFns.createSVGTransform)(transformOpts, positionOffset);
	    } else {
	      // Add a CSS transform to move the element around. This allows us to move the element around
	      // without worrying about whether or not it is relatively or absolutely positioned.
	      // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
	      // has a clean slate.
	      style = (0, _domFns.createCSSTransform)(transformOpts, positionOffset);
	    }

	    // Mark with class while dragging
	    const className = (0, _clsx.clsx)(children.props.className || '', defaultClassName, {
	      [defaultClassNameDragging]: this.state.dragging,
	      [defaultClassNameDragged]: this.state.dragged
	    });

	    // Reuse the child provided
	    // This makes it flexible to use whatever element is wanted (div, ul, etc)
	    return /*#__PURE__*/React.createElement(_DraggableCore.default, _extends({}, draggableCoreProps, {
	      onStart: this.onDragStart,
	      onDrag: this.onDrag,
	      onStop: this.onDragStop
	    }), /*#__PURE__*/React.cloneElement(React.Children.only(children), {
	      className: className,
	      style: {
	        ...children.props.style,
	        ...style
	      },
	      transform: svgTransform
	    }));
	  }
	}
	exports.default = Draggable;
	_defineProperty(Draggable, "displayName", 'Draggable');
	_defineProperty(Draggable, "propTypes", {
	  // Accepts all props <DraggableCore> accepts.
	  ..._DraggableCore.default.propTypes,
	  /**
	   * `axis` determines which axis the draggable can move.
	   *
	   *  Note that all callbacks will still return data as normal. This only
	   *  controls flushing to the DOM.
	   *
	   * 'both' allows movement horizontally and vertically.
	   * 'x' limits movement to horizontal axis.
	   * 'y' limits movement to vertical axis.
	   * 'none' limits all movement.
	   *
	   * Defaults to 'both'.
	   */
	  axis: _propTypes.default.oneOf(['both', 'x', 'y', 'none']),
	  /**
	   * `bounds` determines the range of movement available to the element.
	   * Available values are:
	   *
	   * 'parent' restricts movement within the Draggable's parent node.
	   *
	   * Alternatively, pass an object with the following properties, all of which are optional:
	   *
	   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
	   *
	   * All values are in px.
	   *
	   * Example:
	   *
	   * ```jsx
	   *   let App = React.createClass({
	   *       render: function () {
	   *         return (
	   *            <Draggable bounds={{right: 300, bottom: 300}}>
	   *              <div>Content</div>
	   *           </Draggable>
	   *         );
	   *       }
	   *   });
	   * ```
	   */
	  bounds: _propTypes.default.oneOfType([_propTypes.default.shape({
	    left: _propTypes.default.number,
	    right: _propTypes.default.number,
	    top: _propTypes.default.number,
	    bottom: _propTypes.default.number
	  }), _propTypes.default.string, _propTypes.default.oneOf([false])]),
	  defaultClassName: _propTypes.default.string,
	  defaultClassNameDragging: _propTypes.default.string,
	  defaultClassNameDragged: _propTypes.default.string,
	  /**
	   * `defaultPosition` specifies the x and y that the dragged item should start at
	   *
	   * Example:
	   *
	   * ```jsx
	   *      let App = React.createClass({
	   *          render: function () {
	   *              return (
	   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
	   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
	   *                  </Draggable>
	   *              );
	   *          }
	   *      });
	   * ```
	   */
	  defaultPosition: _propTypes.default.shape({
	    x: _propTypes.default.number,
	    y: _propTypes.default.number
	  }),
	  positionOffset: _propTypes.default.shape({
	    x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
	    y: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
	  }),
	  /**
	   * `position`, if present, defines the current position of the element.
	   *
	   *  This is similar to how form elements in React work - if no `position` is supplied, the component
	   *  is uncontrolled.
	   *
	   * Example:
	   *
	   * ```jsx
	   *      let App = React.createClass({
	   *          render: function () {
	   *              return (
	   *                  <Draggable position={{x: 25, y: 25}}>
	   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
	   *                  </Draggable>
	   *              );
	   *          }
	   *      });
	   * ```
	   */
	  position: _propTypes.default.shape({
	    x: _propTypes.default.number,
	    y: _propTypes.default.number
	  }),
	  /**
	   * These properties should be defined on the child, not here.
	   */
	  className: _shims.dontSetMe,
	  style: _shims.dontSetMe,
	  transform: _shims.dontSetMe
	});
	_defineProperty(Draggable, "defaultProps", {
	  ..._DraggableCore.default.defaultProps,
	  axis: 'both',
	  bounds: false,
	  defaultClassName: 'react-draggable',
	  defaultClassNameDragging: 'react-draggable-dragging',
	  defaultClassNameDragged: 'react-draggable-dragged',
	  defaultPosition: {
	    x: 0,
	    y: 0
	  },
	  scale: 1
	}); 
} (Draggable$1));

const {
  default: Draggable,
  DraggableCore
} = Draggable$1;

// Previous versions of this lib exported <Draggable> as the root export. As to no-// them, or TypeScript, we export *both* as the root and as 'default'.
// See https://github.com/mzabriskie/react-draggable/pull/254
// and https://github.com/mzabriskie/react-draggable/issues/266
cjs.exports = Draggable;
cjs.exports.default = Draggable;
var DraggableCore_1 = cjs.exports.DraggableCore = DraggableCore;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

var doc = (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' ? document : null;
var isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof document !== 'undefined';
var isUndef = function isUndef(v) {
  return typeof v === 'undefined';
};
var isFun = function isFun(v) {
  return typeof v === 'function';
};
var isNum = function isNum(v) {
  return typeof v === 'number';
};
/**
 * @description Will return renderer result if presented, div element otherwise.
 * If renderer is presented it'll receive `elementRef` function which should be used as HTMLElement's ref.
 *
 * @param props {ElementPropsWithElementRefAndRenderer}
 * @param elementRef {ElementRef}
 */

var renderDivWithRenderer = function renderDivWithRenderer(props, elementRef) {
  if (isFun(props.renderer)) {
    props.elementRef = elementRef;
    var renderer = props.renderer;
    delete props.renderer;
    return renderer(props);
  }

  delete props.elementRef;
  return React__namespace.createElement("div", __assign({}, props, {
    ref: elementRef
  }));
};

var getInnerSize = function getInnerSize(el, dimension, padding1, padding2) {
  var styles = getComputedStyle(el);

  if (styles.boxSizing === 'border-box') {
    return Math.max(0, (Number.parseFloat(styles[dimension]) || 0) - (Number.parseFloat(styles[padding1]) || 0) - (Number.parseFloat(styles[padding2]) || 0));
  }

  return Number.parseFloat(styles[dimension]) || 0;
};
/**
 * @description Return element's height without padding
 */


var getInnerHeight = function getInnerHeight(el) {
  return getInnerSize(el, 'height', 'paddingTop', 'paddingBottom');
};
/**
 * @description Return element's width without padding
 */

var getInnerWidth = function getInnerWidth(el) {
  return getInnerSize(el, 'width', 'paddingLeft', 'paddingRight');
};
/**
 * @description Return unique UUID v4
 */

var uuid = function uuid() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  var uuid = '';

  for (var i = 0; i < 32; i++) {
    switch (i) {
      case 8:
      case 20:
        {
          uuid += "-".concat(Math.trunc(Math.random() * 16).toString(16));
          break;
        }

      case 12:
        {
          uuid += '-4';
          break;
        }

      case 16:
        {
          uuid += "-".concat((Math.random() * 16 | 0 & 3 | 8).toString(16));
          break;
        }

      default:
        {
          uuid += Math.trunc(Math.random() * 16).toString(16);
        }
    }
  }

  return uuid;
};
/**
 * @description Calculate thumb size for given viewport and track parameters
 *
 * @param {number} contentSize - Scrollable content size
 * @param {number} viewportSize - Viewport size
 * @param {number} trackSize - Track size thumb can move
 * @param {number} minimalSize - Minimal thumb's size
 * @param {number} maximalSize - Maximal thumb's size
 */

var calcThumbSize = function calcThumbSize(contentSize, viewportSize, trackSize, minimalSize, maximalSize) {
  if (viewportSize >= contentSize) {
    return 0;
  }

  var thumbSize = viewportSize / contentSize * trackSize;

  if (isNum(maximalSize)) {
    thumbSize = Math.min(maximalSize, thumbSize);
  }

  if (isNum(minimalSize)) {
    thumbSize = Math.max(minimalSize, thumbSize);
  }

  return thumbSize;
};
/**
 * @description Calculate thumb offset for given viewport, track and thumb parameters
 *
 * @param {number} contentSize - Scrollable content size
 * @param {number} viewportSize - Viewport size
 * @param {number} trackSize - Track size thumb can move
 * @param {number} thumbSize - Thumb size
 * @param {number} scroll - Scroll value to represent
 */

var calcThumbOffset = function calcThumbOffset(contentSize, viewportSize, trackSize, thumbSize, scroll) {
  if (!scroll || !thumbSize || viewportSize >= contentSize) {
    return 0;
  }

  return (trackSize - thumbSize) * scroll / (contentSize - viewportSize);
};
/**
 * @description Calculate scroll for given viewport, track and thumb parameters
 *
 * @param {number} contentSize - Scrollable content size
 * @param {number} viewportSize - Viewport size
 * @param {number} trackSize - Track size thumb can move
 * @param {number} thumbSize - Thumb size
 * @param {number} thumbOffset - Thumb's offset representing the scroll
 */

var calcScrollForThumbOffset = function calcScrollForThumbOffset(contentSize, viewportSize, trackSize, thumbSize, thumbOffset) {
  if (!thumbOffset || !thumbSize || viewportSize >= contentSize) {
    return 0;
  }

  return thumbOffset * (contentSize - viewportSize) / (trackSize - thumbSize);
};
/**
 * @description Returns scrollbar width specific for current environment. Can return undefined if DOM is not ready yet.
 */

var getScrollbarWidth = function getScrollbarWidth(force) {
  if (force === void 0) {
    force = false;
  }

  if (!doc) {
    getScrollbarWidth._cache = 0;
    return getScrollbarWidth._cache;
  }

  if (!force && !isUndef(getScrollbarWidth._cache)) {
    return getScrollbarWidth._cache;
  }

  var el = doc.createElement('div');
  el.setAttribute('style', 'position:absolute;width:100px;height:100px;top:-999px;left:-999px;overflow:scroll;');
  doc.body.append(el);
  /* istanbul ignore next */

  if (el.clientWidth === 0) {
    // Do not even cache this value because there is no calculations. Issue https://github.com/xobotyi/react-scrollbars-custom/issues/123
    el.remove();
    return;
  }

  getScrollbarWidth._cache = 100 - el.clientWidth;
  el.remove();
  return getScrollbarWidth._cache;
};
/**
 * @description Detect need of horizontal scroll reverse while RTL.
 */

var shouldReverseRtlScroll = function shouldReverseRtlScroll(force) {
  if (force === void 0) {
    force = false;
  }

  if (!force && !isUndef(shouldReverseRtlScroll._cache)) {
    return shouldReverseRtlScroll._cache;
  }

  if (!doc) {
    shouldReverseRtlScroll._cache = false;
    return shouldReverseRtlScroll._cache;
  }

  var el = doc.createElement('div');
  var child = doc.createElement('div');
  el.append(child);
  el.setAttribute('style', 'position:absolute;width:100px;height:100px;top:-999px;left:-999px;overflow:scroll;direction:rtl');
  child.setAttribute('style', 'width:1000px;height:1000px');
  doc.body.append(el);
  el.scrollLeft = -50;
  shouldReverseRtlScroll._cache = el.scrollLeft === -50;
  el.remove();
  return shouldReverseRtlScroll._cache;
};

var Emittr =
/** @class */
function () {
  function Emittr(maxHandlers) {
    if (maxHandlers === void 0) {
      maxHandlers = 10;
    }

    this.setMaxHandlers(maxHandlers);
    this._handlers = Object.create(null);
  }

  Emittr._callEventHandlers = function (emitter, handlers, args) {
    if (!handlers.length) {
      return;
    }

    if (handlers.length === 1) {
      Reflect.apply(handlers[0], emitter, args);
      return;
    }

    handlers = __spreadArray([], handlers);
    var idx;

    for (idx = 0; idx < handlers.length; idx++) {
      Reflect.apply(handlers[idx], emitter, args);
    }
  };

  Emittr.prototype.setMaxHandlers = function (count) {
    if (!isNum(count) || count <= 0) {
      throw new TypeError("Expected maxHandlers to be a positive number, got '".concat(count, "' of type ").concat(_typeof(count)));
    }

    this._maxHandlers = count;
    return this;
  };

  Emittr.prototype.getMaxHandlers = function () {
    return this._maxHandlers;
  };

  Emittr.prototype.emit = function (name) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    if (_typeof(this._handlers[name]) !== 'object' || !Array.isArray(this._handlers[name])) {
      return false;
    }

    Emittr._callEventHandlers(this, this._handlers[name], args);

    return true;
  };

  Emittr.prototype.on = function (name, handler) {
    Emittr._addHandler(this, name, handler);

    return this;
  };

  Emittr.prototype.prependOn = function (name, handler) {
    Emittr._addHandler(this, name, handler, true);

    return this;
  };

  Emittr.prototype.once = function (name, handler) {
    if (!isFun(handler)) {
      throw new TypeError("Expected event handler to be a function, got ".concat(_typeof(handler)));
    }

    Emittr._addHandler(this, name, this._wrapOnceHandler(name, handler));

    return this;
  };

  Emittr.prototype.prependOnce = function (name, handler) {
    if (!isFun(handler)) {
      throw new TypeError("Expected event handler to be a function, got ".concat(_typeof(handler)));
    }

    Emittr._addHandler(this, name, this._wrapOnceHandler(name, handler), true);

    return this;
  };

  Emittr.prototype.off = function (name, handler) {
    Emittr._removeHandler(this, name, handler);

    return this;
  };

  Emittr.prototype.removeAllHandlers = function () {
    var handlers = this._handlers;
    this._handlers = Object.create(null);
    var removeHandlers = handlers.removeHandler;
    delete handlers.removeHandler;
    var idx;
    var eventName; // eslint-disable-next-line guard-for-in,no-restricted-syntax

    for (eventName in handlers) {
      for (idx = handlers[eventName].length - 1; idx >= 0; idx--) {
        Emittr._callEventHandlers(this, removeHandlers, [eventName, handlers[eventName][idx].handler || handlers[eventName][idx]]);
      }
    }

    return this;
  };

  Emittr.prototype._wrapOnceHandler = function (name, handler) {
    var onceState = {
      fired: false,
      handler: handler,
      wrappedHandler: undefined,
      emitter: this,
      event: name
    };

    var wrappedHandler = Emittr._onceWrapper.bind(onceState);

    onceState.wrappedHandler = wrappedHandler;
    wrappedHandler.handler = handler;
    wrappedHandler.event = name;
    return wrappedHandler;
  };

  Emittr._addHandler = function (emitter, name, handler, prepend) {
    if (prepend === void 0) {
      prepend = false;
    }

    if (!isFun(handler)) {
      throw new TypeError("Expected event handler to be a function, got ".concat(_typeof(handler)));
    }

    emitter._handlers[name] = emitter._handlers[name] || [];
    emitter.emit('addHandler', name, handler);

    if (prepend) {
      emitter._handlers[name].unshift(handler);
    } else {
      emitter._handlers[name].push(handler);
    }

    return emitter;
  };

  Emittr._onceWrapper = function _onceWrapper() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (!this.fired) {
      this.fired = true;
      this.emitter.off(this.event, this.wrappedHandler);
      Reflect.apply(this.handler, this.emitter, args);
    }
  };

  Emittr._removeHandler = function (emitter, name, handler) {
    if (!isFun(handler)) {
      throw new TypeError("Expected event handler to be a function, got ".concat(_typeof(handler)));
    }

    if (isUndef(emitter._handlers[name]) || !emitter._handlers[name].length) {
      return emitter;
    }

    var idx = -1;

    if (emitter._handlers[name].length === 1) {
      if (emitter._handlers[name][0] === handler || emitter._handlers[name][0].handler === handler) {
        idx = 0;
        handler = emitter._handlers[name][0].handler || emitter._handlers[name][0];
      }
    } else {
      for (idx = emitter._handlers[name].length - 1; idx >= 0; idx--) {
        if (emitter._handlers[name][idx] === handler || emitter._handlers[name][idx].handler === handler) {
          handler = emitter._handlers[name][idx].handler || emitter._handlers[name][idx];
          break;
        }
      }
    }

    if (idx === -1) {
      return emitter;
    }

    if (idx === 0) {
      emitter._handlers[name].shift();
    } else {
      emitter._handlers[name].splice(idx, 1);
    }

    emitter.emit('removeHandler', name, handler);
    return emitter;
  };

  return Emittr;
}();

var RAFLoop =
/** @class */
function () {
  function RAFLoop() {
    var _this = this;
    /**
     * @description List of targets to update
     */


    this.targets = [];
    /**
     * @description ID of requested animation frame. Valuable only if loop is active and has items to iterate.
     */

    this.animationFrameID = 0;
    /**
     * @description Loop's state.
     */

    this._isActive = false;
    /**
     * @description Start the loop if it wasn't yet.
     */

    this.start = function () {
      if (!_this._isActive && _this.targets.length) {
        _this._isActive = true;
        if (_this.animationFrameID) cancelAnimationFrame(_this.animationFrameID);
        _this.animationFrameID = requestAnimationFrame(_this.rafCallback);
      }

      return _this;
    };
    /**
     * @description Stop the loop if is was active.
     */


    this.stop = function () {
      if (_this._isActive) {
        _this._isActive = false;
        if (_this.animationFrameID) cancelAnimationFrame(_this.animationFrameID);
        _this.animationFrameID = 0;
      }

      return _this;
    };
    /**
     * @description Add target to the iteration list if it's not there.
     */


    this.addTarget = function (target, silent) {
      if (silent === void 0) {
        silent = false;
      }

      if (!_this.targets.includes(target)) {
        _this.targets.push(target);

        if (_this.targets.length === 1 && !silent) _this.start();
      }

      return _this;
    };
    /**
     * @description Remove target from iteration list if it was there.
     */


    this.removeTarget = function (target) {
      var idx = _this.targets.indexOf(target);

      if (idx !== -1) {
        _this.targets.splice(idx, 1);

        if (_this.targets.length === 0) _this.stop();
      }

      return _this;
    };
    /**
     * @description Callback that called each animation frame.
     */


    this.rafCallback = function () {
      if (!_this._isActive) {
        return 0;
      }

      for (var i = 0; i < _this.targets.length; i++) {
        if (!_this.targets[i]._unmounted) _this.targets[i].update();
      }

      _this.animationFrameID = requestAnimationFrame(_this.rafCallback);
      return _this.animationFrameID;
    };
  }

  Object.defineProperty(RAFLoop.prototype, "isActive", {
    /**
     * @description Loop's state.
     */
    get: function get() {
      return this._isActive;
    },
    enumerable: false,
    configurable: true
  });
  return RAFLoop;
}();
var Loop = new RAFLoop();

var AXIS_DIRECTION;

(function (AXIS_DIRECTION) {
  AXIS_DIRECTION["X"] = "x";
  AXIS_DIRECTION["Y"] = "y";
})(AXIS_DIRECTION || (AXIS_DIRECTION = {}));

var TRACK_CLICK_BEHAVIOR;

(function (TRACK_CLICK_BEHAVIOR) {
  TRACK_CLICK_BEHAVIOR["JUMP"] = "jump";
  TRACK_CLICK_BEHAVIOR["STEP"] = "step";
})(TRACK_CLICK_BEHAVIOR || (TRACK_CLICK_BEHAVIOR = {}));

var ScrollbarThumb =
/** @class */
function (_super) {
  __extends(ScrollbarThumb, _super);

  function ScrollbarThumb() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.element = null;
    _this.initialOffsetX = 0;
    _this.initialOffsetY = 0;
    _this.elementRefHack = React__namespace.createRef();
    _this.lastDragData = {
      x: 0,
      y: 0,
      deltaX: 0,
      deltaY: 0,
      lastX: 0,
      lastY: 0
    };

    _this.handleOnDragStart = function (ev, data) {
      if (!_this.element) {
        _this.handleOnDragStop(ev, data);

        return;
      }

      if (isBrowser) {
        _this.prevUserSelect = document.body.style.userSelect;
        document.body.style.userSelect = 'none';
        _this.prevOnSelectStart = document.onselectstart;
        document.addEventListener('selectstart', ScrollbarThumb.selectStartReplacer);
      }

      if (_this.props.onDragStart) {
        _this.props.onDragStart(_this.lastDragData = {
          x: data.x - _this.initialOffsetX,
          y: data.y - _this.initialOffsetY,
          lastX: data.lastX - _this.initialOffsetX,
          lastY: data.lastY - _this.initialOffsetY,
          deltaX: data.deltaX,
          deltaY: data.deltaY
        });
      }

      _this.element.classList.add('dragging');
    };

    _this.handleOnDrag = function (ev, data) {
      if (!_this.element) {
        _this.handleOnDragStop(ev, data);

        return;
      }

      if (_this.props.onDrag) {
        _this.props.onDrag(_this.lastDragData = {
          x: data.x - _this.initialOffsetX,
          y: data.y - _this.initialOffsetY,
          lastX: data.lastX - _this.initialOffsetX,
          lastY: data.lastY - _this.initialOffsetY,
          deltaX: data.deltaX,
          deltaY: data.deltaY
        });
      }
    };

    _this.handleOnDragStop = function (ev, data) {
      var resultData = data ? {
        x: data.x - _this.initialOffsetX,
        y: data.y - _this.initialOffsetY,
        lastX: data.lastX - _this.initialOffsetX,
        lastY: data.lastY - _this.initialOffsetY,
        deltaX: data.deltaX,
        deltaY: data.deltaY
      } : _this.lastDragData;
      if (_this.props.onDragEnd) _this.props.onDragEnd(resultData);
      if (_this.element) _this.element.classList.remove('dragging');

      if (isBrowser) {
        document.body.style.userSelect = _this.prevUserSelect;

        if (_this.prevOnSelectStart) {
          document.addEventListener('selectstart', _this.prevOnSelectStart);
        }

        _this.prevOnSelectStart = null;
      }

      _this.initialOffsetX = 0;
      _this.initialOffsetY = 0;
      _this.lastDragData = {
        x: 0,
        y: 0,
        deltaX: 0,
        deltaY: 0,
        lastX: 0,
        lastY: 0
      };
    };

    _this.handleOnMouseDown = function (ev) {
      if (!_this.element) {
        return;
      }

      ev.preventDefault();
      ev.stopPropagation();

      if (!isUndef(ev.offsetX)) {
        /* istanbul ignore next */
        _this.initialOffsetX = ev.offsetX;
        /* istanbul ignore next */

        _this.initialOffsetY = ev.offsetY;
      } else {
        var rect = _this.element.getBoundingClientRect();

        _this.initialOffsetX = (ev.clientX || ev.touches[0].clientX) - rect.left;
        _this.initialOffsetY = (ev.clientY || ev.touches[0].clientY) - rect.top;
      }
    };

    _this.elementRef = function (ref) {
      if (isFun(_this.props.elementRef)) _this.props.elementRef(ref);
      _this.element = ref; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      _this.elementRefHack.current = ref;
    };

    return _this;
  }

  ScrollbarThumb.prototype.componentDidMount = function () {
    if (!this.element) {
      this.setState(function () {
        throw new Error("<ScrollbarThumb> Element was not created. Possibly you haven't provided HTMLDivElement to renderer's `elementRef` function.");
      });
    }
  };

  ScrollbarThumb.prototype.componentWillUnmount = function () {
    this.handleOnDragStop();
    this.elementRef(null);
  };

  ScrollbarThumb.prototype.render = function () {
    var _a = this.props;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.elementRef;
        var axis = _a.axis;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.onDrag;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.onDragEnd;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.onDragStart;
        var props = __rest(_a, ["elementRef", "axis", "onDrag", "onDragEnd", "onDragStart"]);

    props.className = cnb('ScrollbarsCustom-Thumb', axis === AXIS_DIRECTION.X ? 'ScrollbarsCustom-ThumbX' : 'ScrollbarsCustom-ThumbY', props.className);

    if (props.renderer) {
      props.axis = axis;
    }

    return React__namespace.createElement(DraggableCore_1, {
      allowAnyClick: false,
      enableUserSelectHack: false,
      onMouseDown: this.handleOnMouseDown,
      onDrag: this.handleOnDrag,
      onStart: this.handleOnDragStart,
      onStop: this.handleOnDragStop,
      nodeRef: this.elementRefHack
    }, renderDivWithRenderer(props, this.elementRef));
  };

  ScrollbarThumb.selectStartReplacer = function () {
    return false;
  };

  return ScrollbarThumb;
}(React__namespace.Component);

var ScrollbarTrack =
/** @class */
function (_super) {
  __extends(ScrollbarTrack, _super);

  function ScrollbarTrack() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.element = null;

    _this.elementRef = function (ref) {
      if (isFun(_this.props.elementRef)) _this.props.elementRef(ref);
      _this.element = ref;
    };

    _this.handleClick = function (ev) {
      if (!ev || !_this.element || ev.button !== 0) {
        return;
      }

      if (isFun(_this.props.onClick) && ev.target === _this.element) {
        if (!isUndef(ev.offsetX)) {
          _this.props.onClick(ev, {
            axis: _this.props.axis,
            offset: _this.props.axis === AXIS_DIRECTION.X ? ev.offsetX : ev.offsetY
          });
        } else {
          // support for old browsers

          /* istanbul ignore next */
          var rect = _this.element.getBoundingClientRect();
          /* istanbul ignore next */


          _this.props.onClick(ev, {
            axis: _this.props.axis,
            offset: _this.props.axis === AXIS_DIRECTION.X ? (ev.clientX || ev.touches[0].clientX) - rect.left : (ev.clientY || ev.touches[0].clientY) - rect.top
          });
        }
      }

      return true;
    };

    return _this;
  }

  ScrollbarTrack.prototype.componentDidMount = function () {
    if (!this.element) {
      this.setState(function () {
        throw new Error("Element was not created. Possibly you haven't provided HTMLDivElement to renderer's `elementRef` function.");
      });
      return;
    }

    this.element.addEventListener('click', this.handleClick);
  };

  ScrollbarTrack.prototype.componentWillUnmount = function () {
    if (this.element) {
      this.element.removeEventListener('click', this.handleClick);
      this.element = null;
      this.elementRef(null);
    }
  };

  ScrollbarTrack.prototype.render = function () {
    var _a = this.props;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.elementRef;
        var axis = _a.axis;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.onClick;
        var props = __rest(_a, ["elementRef", "axis", "onClick"]);

    props.className = cnb('ScrollbarsCustom-Track', axis === AXIS_DIRECTION.X ? 'ScrollbarsCustom-TrackX' : 'ScrollbarsCustom-TrackY', props.className);

    if (props.renderer) {
      props.axis = axis;
    }

    return renderDivWithRenderer(props, this.elementRef);
  };

  return ScrollbarTrack;
}(React__namespace.Component);

var style = {
  holder: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  content: {
    boxSizing: 'border-box'
  },
  track: {
    common: {
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: 4,
      background: 'rgba(0,0,0,.1)',
      userSelect: 'none'
    },
    x: {
      height: 10,
      width: 'calc(100% - 20px)',
      bottom: 0,
      left: 10
    },
    y: {
      width: 10,
      height: 'calc(100% - 20px)',
      top: 10
    }
  },
  thumb: {
    common: {
      cursor: 'pointer',
      borderRadius: 4,
      background: 'rgba(0,0,0,.4)'
    },
    x: {
      height: '100%',
      width: 0
    },
    y: {
      width: '100%',
      height: 0
    }
  }
};

var pageZoomLevel = isBrowser ? i() : 1;

if (isBrowser) {
  window.addEventListener('resize', function () {
    pageZoomLevel = i();
  }, {
    passive: true
  });
}

var ScrollbarContext = React__namespace.createContext({
  parentScrollbar: null
});

var Scrollbar$1 =
/** @class */
function (_super) {
  __extends(Scrollbar, _super);

  function Scrollbar(props) {
    var _this = _super.call(this, props) || this;
    /**
     * @description Get current scroll-related values.<br/>
     * If <i>force</i> if truthy - will recalculate them instead of returning cached values.
     *
     * @return ScrollState
     */


    _this.getScrollState = function (force) {
      if (force === void 0) {
        force = false;
      }

      if (_this.scrollValues && !force) {
        return __assign({}, _this.scrollValues);
      }

      var scrollState = {
        clientHeight: 0,
        clientWidth: 0,
        contentScrollHeight: 0,
        contentScrollWidth: 0,
        scrollHeight: 0,
        scrollWidth: 0,
        scrollTop: 0,
        scrollLeft: 0,
        scrollYBlocked: false,
        scrollXBlocked: false,
        scrollYPossible: false,
        scrollXPossible: false,
        trackYVisible: false,
        trackXVisible: false,
        zoomLevel: pageZoomLevel * 1,
        isRTL: undefined
      };
      var props = _this.props;
      scrollState.isRTL = _this.state.isRTL;
      scrollState.scrollYBlocked = props.noScroll || props.noScrollY;
      scrollState.scrollXBlocked = props.noScroll || props.noScrollX;

      if (_this.scrollerElement) {
        scrollState.clientHeight = _this.scrollerElement.clientHeight;
        scrollState.clientWidth = _this.scrollerElement.clientWidth;
        scrollState.scrollHeight = _this.scrollerElement.scrollHeight;
        scrollState.scrollWidth = _this.scrollerElement.scrollWidth;
        scrollState.scrollTop = _this.scrollerElement.scrollTop;
        scrollState.scrollLeft = _this.scrollerElement.scrollLeft;
        scrollState.scrollYPossible = !scrollState.scrollYBlocked && scrollState.scrollHeight > scrollState.clientHeight;
        scrollState.scrollXPossible = !scrollState.scrollXBlocked && scrollState.scrollWidth > scrollState.clientWidth;
        scrollState.trackYVisible = scrollState.scrollYPossible || props.permanentTracks || props.permanentTrackY;
        scrollState.trackXVisible = scrollState.scrollXPossible || props.permanentTracks || props.permanentTrackX;
      }

      if (_this.contentElement) {
        scrollState.contentScrollHeight = _this.contentElement.scrollHeight;
        scrollState.contentScrollWidth = _this.contentElement.scrollWidth;
      }

      return scrollState;
    };
    /**
     * @description Scroll to top border
     */


    _this.scrollToTop = function () {
      if (_this.scrollerElement) {
        _this.scrollerElement.scrollTop = 0;
      }

      return _this;
    };
    /**
     * @description Scroll to left border
     */


    _this.scrollToLeft = function () {
      if (_this.scrollerElement) {
        _this.scrollerElement.scrollLeft = 0;
      }

      return _this;
    };
    /**
     * @description Scroll to bottom border
     */


    _this.scrollToBottom = function () {
      if (_this.scrollerElement) {
        _this.scrollerElement.scrollTop = _this.scrollerElement.scrollHeight - _this.scrollerElement.clientHeight;
      }

      return _this;
    };
    /**
     * @description Scroll to right border
     */


    _this.scrollToRight = function () {
      if (_this.scrollerElement) {
        _this.scrollerElement.scrollLeft = _this.scrollerElement.scrollWidth - _this.scrollerElement.clientWidth;
      }

      return _this;
    };
    /**
     * @description Set the scrolls at given coordinates.<br/>
     * If coordinate is undefined - current scroll value will persist.
     */


    _this.scrollTo = function (x, y) {
      if (_this.scrollerElement) {
        if (isNum(x)) _this.scrollerElement.scrollLeft = x;
        if (isNum(y)) _this.scrollerElement.scrollTop = y;
      }

      return _this;
    };
    /**
     * @description Center the viewport at given coordinates.<br/>
     * If coordinate is undefined - current scroll value will persist.
     */


    _this.centerAt = function (x, y) {
      if (_this.scrollerElement) {
        if (isNum(x)) _this.scrollerElement.scrollLeft = x - _this.scrollerElement.clientWidth / 2;
        if (isNum(y)) _this.scrollerElement.scrollTop = y - _this.scrollerElement.clientHeight / 2;
      }

      return _this;
    };

    _this.update = function (force) {
      if (force === void 0) {
        force = false;
      }

      if (!_this.scrollerElement) {
        return;
      } // autodetect direction if not defined


      if (isUndef(_this.state.isRTL)) {
        _this.setState({
          isRTL: getComputedStyle(_this.scrollerElement).direction === 'rtl'
        });

        return _this.getScrollState();
      }

      var scrollState = _this.getScrollState(true);

      var prevScrollState = __assign({}, _this.scrollValues);

      var props = _this.props;
      var bitmask = 0;

      if (!force) {
        if (prevScrollState.clientHeight !== scrollState.clientHeight) bitmask |= Math.trunc(1);
        if (prevScrollState.clientWidth !== scrollState.clientWidth) bitmask |= 1 << 1;
        if (prevScrollState.scrollHeight !== scrollState.scrollHeight) bitmask |= 1 << 2;
        if (prevScrollState.scrollWidth !== scrollState.scrollWidth) bitmask |= 1 << 3;
        if (prevScrollState.scrollTop !== scrollState.scrollTop) bitmask |= 1 << 4;
        if (prevScrollState.scrollLeft !== scrollState.scrollLeft) bitmask |= 1 << 5;
        if (prevScrollState.scrollYBlocked !== scrollState.scrollYBlocked) bitmask |= 1 << 6;
        if (prevScrollState.scrollXBlocked !== scrollState.scrollXBlocked) bitmask |= 1 << 7;
        if (prevScrollState.scrollYPossible !== scrollState.scrollYPossible) bitmask |= 1 << 8;
        if (prevScrollState.scrollXPossible !== scrollState.scrollXPossible) bitmask |= 1 << 9;
        if (prevScrollState.trackYVisible !== scrollState.trackYVisible) bitmask |= 1 << 10;
        if (prevScrollState.trackXVisible !== scrollState.trackXVisible) bitmask |= 1 << 11;
        if (prevScrollState.isRTL !== scrollState.isRTL) bitmask |= 1 << 12;
        if (prevScrollState.contentScrollHeight !== scrollState.contentScrollHeight) bitmask |= 1 << 13;
        if (prevScrollState.contentScrollWidth !== scrollState.contentScrollWidth) bitmask |= 1 << 14;
        if (prevScrollState.zoomLevel !== scrollState.zoomLevel) bitmask |= 1 << 15; // if not forced and nothing has changed - skip this update

        if (bitmask === 0) {
          return prevScrollState;
        }
      } else {
        bitmask = 32767;
      }

      if (!props.native && _this.holderElement) {
        if (bitmask & 1 << 13 && (props.translateContentSizesToHolder || props.translateContentSizeYToHolder)) {
          _this.holderElement.style.height = "".concat(scrollState.contentScrollHeight, "px");
        }

        if (bitmask & 1 << 14 && (props.translateContentSizesToHolder || props.translateContentSizeXToHolder)) {
          _this.holderElement.style.width = "".concat(scrollState.contentScrollWidth, "px");
        }

        if (props.translateContentSizesToHolder || props.translateContentSizeYToHolder || props.translateContentSizeXToHolder) {
          if (!scrollState.clientHeight && scrollState.contentScrollHeight || !scrollState.clientWidth && scrollState.contentScrollWidth) {
            return;
          }
        }
      } // if scrollbars visibility has changed


      if (bitmask & 1 << 10 || bitmask & 1 << 11) {
        prevScrollState.scrollYBlocked = scrollState.scrollYBlocked;
        prevScrollState.scrollXBlocked = scrollState.scrollXBlocked;
        prevScrollState.scrollYPossible = scrollState.scrollYPossible;
        prevScrollState.scrollXPossible = scrollState.scrollXPossible;

        if (_this.trackYElement && bitmask & 1 << 10) {
          _this.trackYElement.style.display = scrollState.trackYVisible ? '' : 'none';
        }

        if (_this.trackXElement && bitmask & 1 << 11) {
          _this.trackXElement.style.display = scrollState.trackXVisible ? '' : 'none';
        }

        _this.scrollValues = prevScrollState;

        _this.setState({
          trackYVisible: _this.scrollValues.trackYVisible = scrollState.trackYVisible,
          trackXVisible: _this.scrollValues.trackXVisible = scrollState.trackXVisible
        });

        return;
      }

      (props.native ? _this.updaterNative : _this.updaterCustom)(bitmask, scrollState);
      _this.scrollValues = scrollState;

      if (!props.native && bitmask & 1 << 15) {
        getScrollbarWidth(true);

        _this.forceUpdate();
      }

      _this.eventEmitter.emit('update', __assign({}, scrollState), prevScrollState);

      if (bitmask & 1 << 4 || bitmask & 1 << 5) _this.eventEmitter.emit('scroll', __assign({}, scrollState), prevScrollState);
      return _this.scrollValues;
    }; // eslint-disable-next-line class-methods-use-this


    _this.updaterNative = function () {
      // just for future
      return true;
    };

    _this.updaterCustom = function (bitmask, scrollValues) {
      var props = _this.props;

      if (_this.trackYElement) {
        if (_this.thumbYElement && (bitmask & Math.trunc(1) || bitmask & 1 << 2 || bitmask & 1 << 4 || bitmask & 1 << 6 || bitmask & 1 << 8)) {
          if (scrollValues.scrollYPossible) {
            var trackInnerSize = getInnerHeight(_this.trackYElement);
            var thumbSize = calcThumbSize(scrollValues.scrollHeight, scrollValues.clientHeight, trackInnerSize, props.minimalThumbYSize || props.minimalThumbSize, props.maximalThumbYSize || props.maximalThumbSize);
            var thumbOffset = calcThumbOffset(scrollValues.scrollHeight, scrollValues.clientHeight, trackInnerSize, thumbSize, scrollValues.scrollTop);
            _this.thumbYElement.style.transform = "translateY(".concat(thumbOffset, "px)");
            _this.thumbYElement.style.height = "".concat(thumbSize, "px");
            _this.thumbYElement.style.display = '';
          } else {
            _this.thumbYElement.style.transform = '';
            _this.thumbYElement.style.height = '0px';
            _this.thumbYElement.style.display = 'none';
          }
        }
      }

      if (_this.trackXElement) {
        if (_this.thumbXElement && (bitmask & 1 << 1 || bitmask & 1 << 3 || bitmask & 1 << 5 || bitmask & 1 << 7 || bitmask & 1 << 9 || bitmask & 1 << 12)) {
          if (scrollValues.scrollXPossible) {
            var trackInnerSize = getInnerWidth(_this.trackXElement);
            var thumbSize = calcThumbSize(scrollValues.scrollWidth, scrollValues.clientWidth, trackInnerSize, props.minimalThumbXSize || props.minimalThumbSize, props.maximalThumbXSize || props.maximalThumbSize);
            var thumbOffset = calcThumbOffset(scrollValues.scrollWidth, scrollValues.clientWidth, trackInnerSize, thumbSize, scrollValues.scrollLeft);

            if (_this.state.isRTL && shouldReverseRtlScroll()) {
              thumbOffset += trackInnerSize - thumbSize;
            }

            _this.thumbXElement.style.transform = "translateX(".concat(thumbOffset, "px)");
            _this.thumbXElement.style.width = "".concat(thumbSize, "px");
            _this.thumbXElement.style.display = '';
          } else {
            _this.thumbXElement.style.transform = '';
            _this.thumbXElement.style.width = '0px';
            _this.thumbXElement.style.display = 'none';
          }
        }
      }

      return true;
    };

    _this.elementRefHolder = function (ref) {
      _this.holderElement = ref;

      if (isFun(_this.props.elementRef)) {
        _this.props.elementRef(ref);
      }
    };

    _this.elementRefWrapper = function (ref) {
      _this.wrapperElement = ref;

      if (isFun(_this.props.wrapperProps.elementRef)) {
        _this.props.wrapperProps.elementRef(ref);
      }
    };

    _this.elementRefScroller = function (ref) {
      _this.scrollerElement = ref;

      if (isFun(_this.props.scrollerProps.elementRef)) {
        _this.props.scrollerProps.elementRef(ref);
      }
    };

    _this.elementRefContent = function (ref) {
      _this.contentElement = ref;

      if (isFun(_this.props.contentProps.elementRef)) {
        _this.props.contentProps.elementRef(ref);
      }
    };

    _this.elementRefTrackX = function (ref) {
      _this.trackXElement = ref;

      if (isFun(_this.props.trackXProps.elementRef)) {
        _this.props.trackXProps.elementRef(ref);
      }
    };

    _this.elementRefTrackY = function (ref) {
      _this.trackYElement = ref;

      if (isFun(_this.props.trackYProps.elementRef)) {
        _this.props.trackYProps.elementRef(ref);
      }
    };

    _this.elementRefThumbX = function (ref) {
      _this.thumbXElement = ref;

      if (isFun(_this.props.thumbXProps.elementRef)) {
        _this.props.thumbXProps.elementRef(ref);
      }
    };

    _this.elementRefThumbY = function (ref) {
      _this.thumbYElement = ref;

      if (isFun(_this.props.thumbYProps.elementRef)) {
        _this.props.thumbYProps.elementRef(ref);
      }
    };

    _this.handleTrackXClick = function (ev, values) {
      if (_this.props.trackXProps.onClick) {
        _this.props.trackXProps.onClick(ev, values);
      }

      if (!_this.scrollerElement || !_this.trackXElement || !_this.thumbXElement || !_this.scrollValues || !_this.scrollValues.scrollXPossible) {
        return;
      }

      _this._scrollDetection();

      var thumbSize = _this.thumbXElement.clientWidth;
      var trackInnerSize = getInnerWidth(_this.trackXElement);
      var thumbOffset = (_this.scrollValues.isRTL && shouldReverseRtlScroll() ? values.offset + thumbSize / 2 - trackInnerSize : values.offset - thumbSize / 2) - (Number.parseFloat(getComputedStyle(_this.trackXElement).paddingLeft) || 0);
      var target = calcScrollForThumbOffset(_this.scrollValues.scrollWidth, _this.scrollValues.clientWidth, trackInnerSize, thumbSize, thumbOffset);

      if (_this.props.trackClickBehavior === TRACK_CLICK_BEHAVIOR.STEP) {
        target = (_this.scrollValues.isRTL ? _this.scrollValues.scrollLeft > target : _this.scrollValues.scrollLeft < target) ? _this.scrollValues.scrollLeft + _this.scrollValues.clientWidth : _this.scrollValues.scrollLeft - _this.scrollValues.clientWidth;
      }

      _this.scrollerElement.scrollLeft = target;
    };

    _this.handleTrackYClick = function (ev, values) {
      if (_this.props.trackYProps.onClick) _this.props.trackYProps.onClick(ev, values);

      if (!_this.scrollerElement || !_this.trackYElement || !_this.thumbYElement || !_this.scrollValues || !_this.scrollValues.scrollYPossible) {
        return;
      }

      _this._scrollDetection();

      var thumbSize = _this.thumbYElement.clientHeight;
      var target = calcScrollForThumbOffset(_this.scrollValues.scrollHeight, _this.scrollValues.clientHeight, getInnerHeight(_this.trackYElement), thumbSize, values.offset - thumbSize / 2) - (Number.parseFloat(getComputedStyle(_this.trackYElement).paddingTop) || 0);

      if (_this.props.trackClickBehavior === TRACK_CLICK_BEHAVIOR.JUMP) {
        _this.scrollerElement.scrollTop = target;
      } else {
        _this.scrollerElement.scrollTop = _this.scrollValues.scrollTop < target ? _this.scrollValues.scrollTop + _this.scrollValues.clientHeight : _this.scrollValues.scrollTop - _this.scrollValues.clientHeight;
      }
    };

    _this.handleTrackYMouseWheel = function (ev) {
      var props = _this.props;

      if (props.trackYProps && props.trackYProps.onWheel) {
        props.trackYProps.onWheel(ev);
      }

      if (props.disableTracksMousewheelScrolling || props.disableTrackYMousewheelScrolling) {
        return;
      }

      _this._scrollDetection();

      if (!_this.scrollerElement || _this.scrollValues.scrollYBlocked) {
        return;
      }

      _this.scrollTop += ev.deltaY;
    };

    _this.handleTrackXMouseWheel = function (ev) {
      var props = _this.props;

      if (props.trackXProps && props.trackXProps.onWheel) {
        props.trackXProps.onWheel(ev);
      }

      if (props.disableTracksMousewheelScrolling || props.disableTrackXMousewheelScrolling) {
        return;
      }

      _this._scrollDetection();

      if (!_this.scrollerElement || _this.scrollValues.scrollXBlocked) {
        return;
      }

      _this.scrollLeft += ev.deltaX;
    };

    _this.handleThumbXDrag = function (data) {
      var _a;

      if (!_this.trackXElement || !_this.thumbXElement || !_this.scrollerElement || !_this.scrollValues || !_this.scrollValues.scrollXPossible) {
        return;
      }

      _this._scrollDetection();

      var trackRect = _this.trackXElement.getBoundingClientRect();

      var styles = getComputedStyle(_this.trackXElement);
      var paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
      var paddingRight = Number.parseFloat(styles.paddingRight) || 0;
      var trackInnerSize = trackRect.width - paddingLeft - paddingRight;
      var thumbSize = _this.thumbXElement.clientWidth;
      var offset = _this.scrollValues.isRTL && shouldReverseRtlScroll() ? data.x + thumbSize - trackInnerSize + paddingLeft : data.lastX - paddingLeft;
      _this.scrollerElement.scrollLeft = calcScrollForThumbOffset(_this.scrollValues.scrollWidth, _this.scrollValues.clientWidth, trackInnerSize, thumbSize, offset);

      if ((_a = _this.props.thumbXProps) === null || _a === void 0 ? void 0 : _a.onDrag) {
        _this.props.thumbXProps.onDrag(data);
      }
    };

    _this.handleThumbXDragEnd = function (data) {
      var _a;

      _this.handleThumbXDrag(data);

      if ((_a = _this.props.thumbXProps) === null || _a === void 0 ? void 0 : _a.onDragEnd) {
        _this.props.thumbXProps.onDragEnd(data);
      }
    };

    _this.handleThumbYDrag = function (data) {
      var _a;

      if (!_this.scrollerElement || !_this.trackYElement || !_this.thumbYElement || !_this.scrollValues || !_this.scrollValues.scrollYPossible) {
        return;
      }

      _this._scrollDetection();

      var trackRect = _this.trackYElement.getBoundingClientRect();

      var styles = getComputedStyle(_this.trackYElement);
      var paddingTop = Number.parseFloat(styles.paddingTop) || 0;
      var paddingBottom = Number.parseFloat(styles.paddingBottom) || 0;
      var trackInnerSize = trackRect.height - paddingTop - paddingBottom;
      var thumbSize = _this.thumbYElement.clientHeight;
      var offset = data.y - paddingTop;
      _this.scrollerElement.scrollTop = calcScrollForThumbOffset(_this.scrollValues.scrollHeight, _this.scrollValues.clientHeight, trackInnerSize, thumbSize, offset);

      if ((_a = _this.props.thumbYProps) === null || _a === void 0 ? void 0 : _a.onDrag) {
        _this.props.thumbYProps.onDrag(data);
      }
    };

    _this.handleThumbYDragEnd = function (data) {
      var _a;

      _this.handleThumbYDrag(data);

      if ((_a = _this.props.thumbYProps) === null || _a === void 0 ? void 0 : _a.onDragEnd) {
        _this.props.thumbYProps.onDragEnd(data);
      }
    };

    _this.handleScrollerScroll = function () {
      _this._scrollDetection();
    };

    _this._scrollDetection = function () {
      if (!_this._scrollDetectionTO) {
        _this.eventEmitter.emit('scrollStart', _this.getScrollState());
      } else if (isBrowser) {
        window.clearTimeout(_this._scrollDetectionTO);
      }

      _this._scrollDetectionTO = isBrowser ? window.setTimeout(_this._scrollDetectionCallback, _this.props.scrollDetectionThreshold || 0) : null;
    };

    _this._scrollDetectionCallback = function () {
      _this._scrollDetectionTO = null;

      _this.eventEmitter.emit('scrollStop', _this.getScrollState());
    };

    _this.state = {
      trackXVisible: false,
      trackYVisible: false,
      isRTL: props.rtl
    };
    _this.scrollValues = _this.getScrollState(true);
    _this.eventEmitter = new Emittr(15);
    if (props.onUpdate) _this.eventEmitter.on('update', props.onUpdate);
    if (props.onScroll) _this.eventEmitter.on('scroll', props.onScroll);
    if (props.onScrollStart) _this.eventEmitter.on('scrollStart', props.onScrollStart);
    if (props.onScrollStop) _this.eventEmitter.on('scrollStop', props.onScrollStop);
    _this.id = uuid();
    return _this;
  }

  Object.defineProperty(Scrollbar.prototype, "scrollTop", {
    // eslint-disable-next-line react/sort-comp
    get: function get() {
      if (this.scrollerElement) {
        return this.scrollerElement.scrollTop;
      }

      return 0;
    },
    set: function set(top) {
      if (this.scrollerElement) {
        this.scrollerElement.scrollTop = top;
        this.update();
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Scrollbar.prototype, "scrollLeft", {
    get: function get() {
      if (this.scrollerElement) {
        return this.scrollerElement.scrollLeft;
      }

      return 0;
    },
    set: function set(left) {
      if (this.scrollerElement) {
        this.scrollerElement.scrollLeft = left;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Scrollbar.prototype, "scrollHeight", {
    get: function get() {
      if (this.scrollerElement) {
        return this.scrollerElement.scrollHeight;
      }

      return 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Scrollbar.prototype, "scrollWidth", {
    get: function get() {
      if (this.scrollerElement) {
        return this.scrollerElement.scrollWidth;
      }

      return 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Scrollbar.prototype, "clientHeight", {
    get: function get() {
      if (this.scrollerElement) {
        return this.scrollerElement.clientHeight;
      }

      return 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Scrollbar.prototype, "clientWidth", {
    get: function get() {
      if (this.scrollerElement) {
        return this.scrollerElement.clientWidth;
      }

      return 0;
    },
    enumerable: false,
    configurable: true
  }); // eslint-disable-next-line react/sort-comp

  Scrollbar.calculateStyles = function (props, state, scrollValues, scrollbarWidth) {
    var _a, _b, _c, _d;

    var useDefaultStyles = !props.noDefaultStyles;
    return {
      holder: __assign(__assign(__assign({}, useDefaultStyles && style.holder), {
        position: 'relative'
      }), props.style),
      wrapper: __assign(__assign(__assign({}, useDefaultStyles && __assign(__assign(__assign({}, style.wrapper), !props.disableTracksWidthCompensation && !props.disableTrackYWidthCompensation && (_a = {}, _a[state.isRTL ? 'left' : 'right'] = state.trackYVisible ? 10 : 0, _a)), !props.disableTracksWidthCompensation && !props.disableTrackXWidthCompensation && {
        bottom: state.trackXVisible ? 10 : 0
      })), props.wrapperProps.style), {
        position: 'absolute',
        overflow: 'hidden'
      }),
      content: __assign(__assign(__assign(__assign(__assign({}, useDefaultStyles && style.content), props.translateContentSizesToHolder || props.translateContentSizeYToHolder || props.translateContentSizeXToHolder ? {
        display: 'table-cell'
      } : {
        padding: 0.05 // needed to disable margin collapsing without flexboxes, other possible solutions here: https://stackoverflow.com/questions/19718634/how-to-disable-margin-collapsing

      }), useDefaultStyles && !(props.translateContentSizesToHolder || props.translateContentSizeYToHolder) && {
        minHeight: '100%'
      }), useDefaultStyles && !(props.translateContentSizesToHolder || props.translateContentSizeXToHolder) && {
        minWidth: '100%'
      }), props.contentProps.style),
      scroller: __assign(__assign(__assign(__assign((_b = {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        paddingBottom: !scrollbarWidth && scrollValues.scrollXPossible ? props.fallbackScrollbarWidth : undefined
      }, _b[state.isRTL ? 'paddingLeft' : 'paddingRight'] = !scrollbarWidth && scrollValues.scrollYPossible ? props.fallbackScrollbarWidth : undefined, _b), props.scrollerProps.style), !isUndef(props.rtl) && {
        direction: props.rtl ? 'rtl' : 'ltr'
      }), props.momentum && {
        WebkitOverflowScrolling: 'touch'
      }), (_c = {
        overflowY: scrollValues.scrollYPossible ? 'scroll' : 'hidden',
        overflowX: scrollValues.scrollXPossible ? 'scroll' : 'hidden',
        marginBottom: scrollValues.scrollXPossible ? -(scrollbarWidth || props.fallbackScrollbarWidth) - Number(scrollValues.zoomLevel !== 1) : undefined
      }, _c[state.isRTL ? 'marginLeft' : 'marginRight'] = scrollValues.scrollYPossible ? -(scrollbarWidth || props.fallbackScrollbarWidth) - Number(scrollValues.zoomLevel !== 1) : undefined, _c)),
      trackX: __assign(__assign(__assign(__assign({}, useDefaultStyles && style.track.common), useDefaultStyles && style.track.x), props.trackXProps.style), !state.trackXVisible && {
        display: 'none'
      }),
      trackY: __assign(__assign(__assign(__assign(__assign({}, useDefaultStyles && style.track.common), useDefaultStyles && style.track.y), useDefaultStyles && (_d = {}, _d[state.isRTL ? 'left' : 'right'] = 0, _d)), props.trackYProps.style), !state.trackYVisible && {
        display: 'none'
      }),
      thumbX: __assign(__assign(__assign({}, useDefaultStyles && style.thumb.common), useDefaultStyles && style.thumb.x), props.thumbXProps.style),
      thumbY: __assign(__assign(__assign({}, useDefaultStyles && style.thumb.common), useDefaultStyles && style.thumb.y), props.thumbYProps.style)
    };
  };

  Scrollbar.prototype.componentDidMount = function () {
    if (!this.scrollerElement) {
      this.setState(function () {
        throw new Error("scroller element was not created. Possibly you haven't provided HTMLDivElement to renderer's `elementRef` function.");
      });
      return;
    }

    if (!this.contentElement) {
      this.setState(function () {
        throw new Error("content element was not created. Possibly you haven't provided HTMLDivElement to renderer's `elementRef` function.");
      });
      return;
    }

    var props = this.props;

    if (!props.native && !props.mobileNative) {
      // ToDo: move native state to the state so it can be synchronized
      if (!this.holderElement) {
        this.setState(function () {
          throw new Error("holder element was not created. Possibly you haven't provided HTMLDivElement to renderer's `elementRef` function.");
        });
        return;
      }

      if (!this.wrapperElement) {
        this.setState(function () {
          throw new Error("wrapper element was not created. Possibly you haven't provided HTMLDivElement to renderer's `elementRef` function.");
        });
        return;
      }
    }

    Loop.addTarget(this);

    if (!isUndef(props.scrollTop)) {
      this.scrollerElement.scrollTop = props.scrollTop;
    }

    if (!isUndef(props.scrollLeft)) {
      this.scrollerElement.scrollLeft = props.scrollLeft;
    }

    this.update(true);
  };

  Scrollbar.prototype.componentWillUnmount = function () {
    Loop.removeTarget(this);
  };

  Scrollbar.prototype.componentDidUpdate = function (prevProps, prevState) {
    if (!this.scrollerElement) {
      return;
    }

    var props = this.props;

    if (props.rtl !== prevProps.rtl && props.rtl !== this.state.isRTL) {
      this.setState({
        isRTL: props.rtl
      });
    }

    if (this.state.isRTL !== prevState.isRTL) {
      this.update();
    }

    if (!isUndef(props.scrollTop) && props.scrollTop !== this.scrollerElement.scrollTop) {
      this.scrollerElement.scrollTop = props.scrollTop;
    }

    if (!isUndef(props.scrollLeft) && props.scrollLeft !== this.scrollerElement.scrollLeft) {
      this.scrollerElement.scrollLeft = props.scrollLeft;
    }

    if (prevProps.onUpdate !== props.onUpdate) {
      if (prevProps.onUpdate) this.eventEmitter.off('update', prevProps.onUpdate);
      if (props.onUpdate) this.eventEmitter.on('update', props.onUpdate);
    }

    if (prevProps.onScroll !== props.onScroll) {
      if (prevProps.onScroll) this.eventEmitter.off('scroll', prevProps.onScroll);
      if (props.onScroll) this.eventEmitter.on('scroll', props.onScroll);
    }

    if (prevProps.onScrollStart !== props.onScrollStart) {
      if (prevProps.onScrollStart) this.eventEmitter.off('scrollStart', prevProps.onScrollStart);
      if (props.onScrollStart) this.eventEmitter.on('scrollStart', props.onScrollStart);
    }

    if (prevProps.onScrollStop !== props.onScrollStop) {
      if (prevProps.onScrollStop) this.eventEmitter.off('scrollStop', prevProps.onScrollStop);
      if (props.onScrollStop) this.eventEmitter.on('scrollStop', props.onScrollStop);
    }
  }; // eslint-disable-next-line react/sort-comp


  Scrollbar.prototype.render = function () {
    var _a = this.props,
        createContext = _a.createContext,
        rtl = _a.rtl,
        native = _a.native,
        mobileNative = _a.mobileNative,
        momentum = _a.momentum;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.noDefaultStyles;
        var disableTracksMousewheelScrolling = _a.disableTracksMousewheelScrolling,
        disableTrackXMousewheelScrolling = _a.disableTrackXMousewheelScrolling,
        disableTrackYMousewheelScrolling = _a.disableTrackYMousewheelScrolling;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.disableTracksWidthCompensation;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.disableTrackXWidthCompensation;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.disableTrackYWidthCompensation;
        var noScrollX = _a.noScrollX,
        noScrollY = _a.noScrollY,
        noScroll = _a.noScroll,
        permanentTrackX = _a.permanentTrackX,
        permanentTrackY = _a.permanentTrackY,
        permanentTracks = _a.permanentTracks,
        removeTracksWhenNotUsed = _a.removeTracksWhenNotUsed,
        removeTrackYWhenNotUsed = _a.removeTrackYWhenNotUsed,
        removeTrackXWhenNotUsed = _a.removeTrackXWhenNotUsed;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.minimalThumbSize;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.maximalThumbSize;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.minimalThumbXSize;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.maximalThumbXSize;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.minimalThumbYSize;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.maximalThumbYSize;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.fallbackScrollbarWidth;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.scrollTop;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.scrollLeft;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.trackClickBehavior;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.scrollDetectionThreshold;
        var propsWrapperProps = _a.wrapperProps,
        propsScrollerProps = _a.scrollerProps,
        propsContentProps = _a.contentProps,
        propsTrackXProps = _a.trackXProps,
        propsTrackYProps = _a.trackYProps,
        propsThumbXProps = _a.thumbXProps,
        propsThumbYProps = _a.thumbYProps,
        propsScrollbarWidth = _a.scrollbarWidth;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.elementRef;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.onUpdate;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.onScroll;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.onScrollStart;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.onScrollStop;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.translateContentSizesToHolder;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.translateContentSizeYToHolder;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a.translateContentSizeXToHolder;
        var children = _a.children,
        propsHolderProps = __rest(_a, ["createContext", "rtl", "native", "mobileNative", "momentum", "noDefaultStyles", "disableTracksMousewheelScrolling", "disableTrackXMousewheelScrolling", "disableTrackYMousewheelScrolling", "disableTracksWidthCompensation", "disableTrackXWidthCompensation", "disableTrackYWidthCompensation", "noScrollX", "noScrollY", "noScroll", "permanentTrackX", "permanentTrackY", "permanentTracks", "removeTracksWhenNotUsed", "removeTrackYWhenNotUsed", "removeTrackXWhenNotUsed", "minimalThumbSize", "maximalThumbSize", "minimalThumbXSize", "maximalThumbXSize", "minimalThumbYSize", "maximalThumbYSize", "fallbackScrollbarWidth", "scrollTop", "scrollLeft", "trackClickBehavior", "scrollDetectionThreshold", "wrapperProps", "scrollerProps", "contentProps", "trackXProps", "trackYProps", "thumbXProps", "thumbYProps", "scrollbarWidth", "elementRef", "onUpdate", "onScroll", "onScrollStart", "onScrollStop", "translateContentSizesToHolder", "translateContentSizeYToHolder", "translateContentSizeXToHolder", "children"]);

    var scrollbarWidth = !isUndef(propsScrollbarWidth) ? propsScrollbarWidth : getScrollbarWidth() || 0;

    if (native || !scrollbarWidth && mobileNative) {
      this.elementRefHolder(null);
      this.elementRefWrapper(null);
      this.elementRefTrackX(null);
      this.elementRefTrackY(null);
      this.elementRefThumbX(null);
      this.elementRefThumbY(null);

      var contentProps_1 = __assign(__assign({}, propsContentProps), {
        key: 'ScrollbarsCustom-Content',
        className: cnb('ScrollbarsCustom-Content', propsContentProps.className),
        children: children
      });

      var scrollerProps_1 = __assign(__assign({}, propsHolderProps), {
        className: cnb('ScrollbarsCustom native', this.state.trackYVisible && 'trackYVisible', this.state.trackXVisible && 'trackXVisible', this.state.isRTL && 'rtl', propsHolderProps.className),
        style: __assign(__assign(__assign(__assign({}, propsHolderProps.style), !isUndef(rtl) && {
          direction: rtl ? 'rtl' : 'ltr'
        }), momentum && {
          WebkitOverflowScrolling: 'touch'
        }), {
          overflowX: noScroll || noScrollX ? 'hidden' : permanentTracks || permanentTrackX ? 'scroll' : 'auto',
          overflowY: noScroll || noScrollY ? 'hidden' : permanentTracks || permanentTrackY ? 'scroll' : 'auto'
        }),
        onScroll: this.handleScrollerScroll,
        children: renderDivWithRenderer(contentProps_1, this.elementRefContent),
        renderer: propsScrollerProps.renderer,
        elementRef: propsScrollerProps.elementRef
      });

      return renderDivWithRenderer(scrollerProps_1, this.elementRefScroller);
    }

    var styles = Scrollbar.calculateStyles(this.props, this.state, this.scrollValues, scrollbarWidth);
    var holderChildren = [];

    var contentProps = __assign(__assign({}, propsContentProps), {
      key: 'ScrollbarsCustom-Content',
      className: cnb('ScrollbarsCustom-Content', propsContentProps.className),
      style: styles.content,
      children: createContext ? // eslint-disable-next-line react/jsx-no-constructed-context-values
      React__namespace.createElement(ScrollbarContext.Provider, {
        value: {
          parentScrollbar: this
        }
      }, children) : children
    });

    var scrollerProps = __assign(__assign({}, propsScrollerProps), {
      key: 'ScrollbarsCustom-Scroller',
      className: cnb('ScrollbarsCustom-Scroller', propsScrollerProps.className),
      style: styles.scroller,
      children: renderDivWithRenderer(contentProps, this.elementRefContent),
      onScroll: this.handleScrollerScroll
    });

    var wrapperProps = __assign(__assign({}, propsWrapperProps), {
      key: 'ScrollbarsCustom-Wrapper',
      className: cnb('ScrollbarsCustom-Wrapper', propsWrapperProps.className),
      style: styles.wrapper,
      children: renderDivWithRenderer(scrollerProps, this.elementRefScroller)
    });

    holderChildren.push(renderDivWithRenderer(wrapperProps, this.elementRefWrapper));

    if (this.state.trackYVisible || !removeTracksWhenNotUsed && !removeTrackYWhenNotUsed) {
      var thumbYProps = __assign(__assign({}, propsThumbYProps), {
        key: 'ScrollbarsCustom-ThumbY',
        style: styles.thumbY,
        elementRef: this.elementRefThumbY,
        onDrag: this.handleThumbYDrag,
        onDragEnd: this.handleThumbYDragEnd,
        axis: AXIS_DIRECTION.Y
      });

      var trackYProps = __assign(__assign(__assign(__assign({}, propsTrackYProps), {
        key: 'ScrollbarsCustom-TrackY',
        style: styles.trackY,
        elementRef: this.elementRefTrackY,
        onClick: this.handleTrackYClick
      }), (disableTracksMousewheelScrolling || disableTrackYMousewheelScrolling) && {
        onWheel: this.handleTrackYMouseWheel
      }), {
        axis: AXIS_DIRECTION.Y
      });

      trackYProps.children = React__namespace.createElement(ScrollbarThumb, __assign({}, thumbYProps));
      holderChildren.push(React__namespace.createElement(ScrollbarTrack, __assign({}, trackYProps)));
    } else {
      this.elementRefTrackY(null);
      this.elementRefThumbY(null);
    }

    if (this.state.trackXVisible || !removeTracksWhenNotUsed && !removeTrackXWhenNotUsed) {
      var thumbXProps = __assign(__assign({}, propsThumbXProps), {
        key: 'ScrollbarsCustom-ThumbX',
        style: styles.thumbX,
        elementRef: this.elementRefThumbX,
        onDrag: this.handleThumbXDrag,
        onDragEnd: this.handleThumbXDragEnd,
        axis: AXIS_DIRECTION.X
      });

      var trackXProps = __assign(__assign(__assign(__assign({}, propsTrackXProps), {
        key: 'ScrollbarsCustom-TrackX',
        style: styles.trackX,
        elementRef: this.elementRefTrackX,
        onClick: this.handleTrackXClick
      }), (disableTracksMousewheelScrolling || disableTrackXMousewheelScrolling) && {
        onWheel: this.handleTrackXMouseWheel
      }), {
        axis: AXIS_DIRECTION.X
      });

      trackXProps.children = React__namespace.createElement(ScrollbarThumb, __assign({}, thumbXProps));
      holderChildren.push(React__namespace.createElement(ScrollbarTrack, __assign({}, trackXProps)));
    } else {
      this.elementRefTrackX(null);
      this.elementRefThumbX(null);
    }

    var holderProps = __assign(__assign({}, propsHolderProps), {
      className: cnb('ScrollbarsCustom', this.state.trackYVisible && 'trackYVisible', this.state.trackXVisible && 'trackXVisible', this.state.isRTL && 'rtl', propsHolderProps.className),
      style: styles.holder,
      children: holderChildren
    });

    return renderDivWithRenderer(holderProps, this.elementRefHolder);
  }; // eslint-disable-next-line react/static-property-placement


  Scrollbar.contextType = ScrollbarContext; // eslint-disable-next-line react/static-property-placement

  Scrollbar.defaultProps = {
    momentum: true,
    minimalThumbSize: 30,
    fallbackScrollbarWidth: 20,
    trackClickBehavior: TRACK_CLICK_BEHAVIOR.JUMP,
    scrollDetectionThreshold: 100,
    wrapperProps: {},
    scrollerProps: {},
    contentProps: {},
    trackXProps: {},
    trackYProps: {},
    thumbXProps: {},
    thumbYProps: {}
  };
  return Scrollbar;
}(React__namespace.Component);

/**
 * Хук для автоматического скрытия скроллбара
 * @namespace Lucent.UI.Scrollbar.useAutoHide
 */
const useAutoHide = (config = {}) => {
    const DEFAULT_DELAY = 150;
    const { delay = DEFAULT_DELAY } = config;
    const [visible, setVisible] = React$1.useState(false);
    const timerRef = React$1.useRef(null);
    const onScrollStart = React$1.useCallback(() => {
        if (timerRef.current)
            clearTimeout(timerRef.current);
        setVisible(true);
    }, []);
    const onScrollStop = React$1.useCallback(() => {
        timerRef.current = setTimeout(() => setVisible(false), delay);
    }, [delay]);
    return {
        visible,
        onScrollStart,
        onScrollStop
    };
};
/**
 * Скроллбар
 * @namespace Lucent.UI.Scrollbar
 */
const Scrollbar = ({ children, ...props }) => {
    const { visible, onScrollStart, onScrollStop } = useAutoHide();
    const SCROLLBAR_SIZE = ".35rem";
    const wrapperProps = { className: "!inset-0" };
    const contentProps = { style: {} };
    const trackProps = {
        style: {
            background: "var(--color-scrollbar-track)",
            opacity: visible ? 1 : 0,
            pointerEvents: visible ? "auto" : "none",
            transition: "opacity 0.15s ease"
        }
    };
    const thumbProps = {
        style: {
            background: "var(--color-scrollbar-thumb)",
            borderRadius: ".25rem"
        }
    };
    const trackXProps = { style: { ...trackProps.style, height: SCROLLBAR_SIZE } };
    const trackYProps = { style: { ...trackProps.style, width: SCROLLBAR_SIZE } };
    const thumbXProps = { style: thumbProps.style };
    const thumbYProps = { style: thumbProps.style };
    return (jsxRuntime.jsx(Scrollbar$1, { contentProps: contentProps, wrapperProps: wrapperProps, trackYProps: trackYProps, thumbYProps: thumbYProps, trackXProps: trackXProps, thumbXProps: thumbXProps, onScrollStart: onScrollStart, onScrollStop: onScrollStop, ...props, children: children }));
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$7 = "/* Lucent CSS: Sidebar */\n/* Lucent CSS: Tokens */\n:root {\n  --layout-lucent-separator-color: var(--color-border);\n  --layout-lucent-animation-change-duration: 0.15s;\n  --layout-lucent-animation-inner-change-duration: 1s;\n\n  --layout-lucent-header-height: 5rem;\n  --layout-lucent-header-gap: 1.5rem;\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-header-offset-x: 3rem;\n  --layout-lucent-header-offset-y: 0;\n\n  --layout-lucent-content-offset-x: 5rem;\n  --layout-lucent-content-offset-y: 3.5rem;\n\n  --layout-lucent-footer-height: 5rem;\n  --layout-lucent-footer-gap: 1.5rem;\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-footer-offset-x: var(--layout-lucent-header-offset-x);\n  --layout-lucent-footer-offset-y: 0;\n\n  --layout-lucent-sidebar-width: 16.875rem;\n  --layout-lucent-sidebar-offset-x: 1rem;\n  --layout-lucent-sidebar-offset-y: 1rem;\n  --layout-lucent-sidebar-background-color: var(--color-background-hard);\n  --layout-lucent-sidebar-header-height: var(--layout-lucent-header-height);\n  --layout-lucent-sidebar-footer-height: var(--layout-lucent-footer-height);\n  --layout-lucent-sidebar-footer-background-color: var(--color-gradient-brand);\n  --layout-lucent-sidebar-footer-text-color: var(--color-primary-foreground);\n  --layout-lucent-sidebar-collapsed-width: 5rem;\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background);\n\n  --layout-lucent-infobar-width: 25rem;\n  --layout-lucent-infobar-offset-x: 2rem;\n  --layout-lucent-infobar-offset-y: 2rem;\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n  --layout-lucent-infobar-collapsed-width: 5rem;\n  --layout-lucent-infobar-collapsed-background-color: var(--color-background-soft);\n}\n/* Темная движуха */\n[data-theme-mode=\"dark\"] {\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background-soft);\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n}\n/* Lucent CSS: Animation */\n@keyframes sidebar-module__sidebarExpand___-qbZo {\n  0% {\n    width: var(--layout-lucent-sidebar-collapsed-width);\n  }\n  100% {\n    width: var(--layout-lucent-sidebar-width);\n  }\n}\n@keyframes sidebar-module__sidebarCollapse___2m14x {\n  0% {\n    width: var(--layout-lucent-sidebar-width);\n  }\n  100% {\n    width: var(--layout-lucent-sidebar-collapsed-width);\n  }\n}\n@keyframes sidebar-module__innerShow___bLARm {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes sidebar-module__innerHide___2g0LK {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.sidebar-module__sidebar___ohciD {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  position: relative;\n  z-index: 10;\n  width: var(--layout-lucent-sidebar-width);\n  height: 100%;\n  overflow: hidden;\n  box-shadow: var(--layout-lucent-shadow-ghost-xl);\n  transition: width var(--layout-lucent-animation-change-duration) ease-in-out;\n  /* animation: sidebarExpand var(--layout-lucent-animation-change-duration) ease-in-out forwards; */\n\n  &.sidebar-module__hidden___iJHQS {\n    display: none;\n  }\n  &.sidebar-module__collapsed___ypY0Q {\n    width: var(--layout-lucent-sidebar-collapsed-width);\n    /* animation: sidebarCollapse var(--layout-lucent-animation-change-duration) ease-in-out forwards; */\n  }\n}\n.sidebar-module__sidebarHeader___Y23un {\n  height: var(--layout-lucent-sidebar-header-height);\n  border-block-end: 0.0625rem solid var(--layout-lucent-separator-color);\n  background-color: var(--color-background-soft);\n\n  /* &.hidden {} */\n  /* &.collapsed {} */\n}\n.sidebar-module__sidebarHeaderInner___beSdE {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  animation: sidebar-module__innerShow___bLARm var(--layout-lucent-animation-inner-change-duration) ease-in-out forwards;\n\n  /* &.hidden {} */\n  &.sidebar-module__collapsed___ypY0Q {\n    animation: sidebar-module__innerHide___2g0LK var(--layout-lucent-animation-inner-change-duration) ease-in-out forwards;\n  }\n}\n.sidebar-module__sidebarBody___01Iok {\n  flex-grow: 1;\n\n  /* &.hidden {} */\n  /* &.collapsed {} */\n}\n.sidebar-module__sidebarBodyInner___KcI7Q {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  height: 100%;\n  animation: sidebar-module__innerShow___bLARm var(--layout-lucent-animation-inner-change-duration) ease-in-out forwards;\n\n  /* &.hidden {} */\n  &.sidebar-module__collapsed___ypY0Q {\n    animation: sidebar-module__innerHide___2g0LK var(--layout-lucent-animation-inner-change-duration) ease-in-out forwards;\n  }\n}\n.sidebar-module__sidebarFooter___q8st2 {\n  margin-top: auto;\n  height: var(--layout-lucent-sidebar-footer-height);\n  background: var(--layout-lucent-sidebar-footer-background-color);\n  color: var(--layout-lucent-sidebar-footer-text-color);\n\n  /* &.hidden {} */\n  /* &.collapsed {} */\n}\n.sidebar-module__sidebarFooterInner___Bm9Ns {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  animation: sidebar-module__innerShow___bLARm var(--layout-lucent-animation-inner-change-duration) ease-in-out forwards;\n\n  /* &.hidden {} */\n  &.sidebar-module__collapsed___ypY0Q {\n    animation: sidebar-module__innerHide___2g0LK var(--layout-lucent-animation-inner-change-duration) ease-in-out forwards;\n  }\n}\n";
var styles$7 = {"sidebar":"sidebar-module__sidebar___ohciD","hidden":"sidebar-module__hidden___iJHQS","collapsed":"sidebar-module__collapsed___ypY0Q","sidebarHeader":"sidebar-module__sidebarHeader___Y23un","sidebarHeaderInner":"sidebar-module__sidebarHeaderInner___beSdE","sidebarBody":"sidebar-module__sidebarBody___01Iok","sidebarBodyInner":"sidebar-module__sidebarBodyInner___KcI7Q","sidebarFooter":"sidebar-module__sidebarFooter___q8st2","sidebarFooterInner":"sidebar-module__sidebarFooterInner___Bm9Ns"};
styleInject(css_248z$7);

/**
 * Шапка боковой панели макета
 * @namespace Lucent.UI.Sidebar.Header
 */
const SidebarHeader = ({ children, collapsed }) => {
    const classes = cn({ [styles$7.sidebarHeader]: true, [styles$7.collapsed]: collapsed });
    const innerClasses = cn({ [styles$7.sidebarHeaderInner]: true, [styles$7.collapsed]: collapsed });
    return (jsxRuntime.jsx("header", { className: classes, children: jsxRuntime.jsx("div", { className: innerClasses, children: children }) }));
};
/**
 * Тело боковой панели макета
 * @namespace Lucent.UI.Sidebar.Body
 */
const SidebarBody = ({ children, collapsed }) => {
    const classes = cn({ [styles$7.sidebarBody]: true, [styles$7.collapsed]: collapsed });
    const innerClasses = cn({ [styles$7.sidebarBodyInner]: true, [styles$7.collapsed]: collapsed });
    return (jsxRuntime.jsx("div", { className: classes, children: jsxRuntime.jsx(Scrollbar, { children: jsxRuntime.jsx("div", { className: innerClasses, children: children }) }) }));
};
/**
 * Футер боковой панели макета
 * @namespace Lucent.UI.Sidebar.Footer
 */
const SidebarFooter = ({ children, collapsed }) => {
    const classes = cn({ [styles$7.sidebarFooter]: true, [styles$7.collapsed]: collapsed });
    const innerClasses = cn({ [styles$7.sidebarFooterInner]: true, [styles$7.collapsed]: collapsed });
    return (jsxRuntime.jsx("footer", { className: classes, children: jsxRuntime.jsx("div", { className: innerClasses, children: children }) }));
};
/**
 * Сайдбар макета
 * @namespace Lucent.UI.Sidebar
 */
const Sidebar = ({ header, body, footer }) => {
    const { isSidebarCollapsed, isSidebarHidden } = useLayout();
    const collapsed = isSidebarCollapsed();
    const hidden = isSidebarHidden();
    const classes = cn({
        [styles$7.sidebar]: true,
        [styles$7.collapsed]: collapsed,
        [styles$7.hidden]: hidden
    });
    return (jsxRuntime.jsxs("aside", { className: classes, children: [header && jsxRuntime.jsx(SidebarHeader, { collapsed: collapsed, children: header }), body && jsxRuntime.jsx(SidebarBody, { collapsed: collapsed, children: body }), footer && jsxRuntime.jsx(SidebarFooter, { collapsed: collapsed, children: footer })] }));
};

var css_248z$6 = "/* Lucent CSS: Page */\n/* @import \"./common/tokens.css\"; */\n.page-module__page___zYj1M {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n";
var styles$6 = {"page":"page-module__page___zYj1M"};
styleInject(css_248z$6);

/**
 * Основная часть макета
 * @namespace Lucent.UI.Page
 */
const Page = ({ children }) => {
    return jsxRuntime.jsx("div", { className: styles$6.page, children: children });
};

var css_248z$5 = "/* Lucent CSS: Header */\n/* Lucent CSS: Tokens */\n:root {\n  --layout-lucent-separator-color: var(--color-border);\n  --layout-lucent-animation-change-duration: 0.15s;\n  --layout-lucent-animation-inner-change-duration: 1s;\n\n  --layout-lucent-header-height: 5rem;\n  --layout-lucent-header-gap: 1.5rem;\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-header-offset-x: 3rem;\n  --layout-lucent-header-offset-y: 0;\n\n  --layout-lucent-content-offset-x: 5rem;\n  --layout-lucent-content-offset-y: 3.5rem;\n\n  --layout-lucent-footer-height: 5rem;\n  --layout-lucent-footer-gap: 1.5rem;\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-footer-offset-x: var(--layout-lucent-header-offset-x);\n  --layout-lucent-footer-offset-y: 0;\n\n  --layout-lucent-sidebar-width: 16.875rem;\n  --layout-lucent-sidebar-offset-x: 1rem;\n  --layout-lucent-sidebar-offset-y: 1rem;\n  --layout-lucent-sidebar-background-color: var(--color-background-hard);\n  --layout-lucent-sidebar-header-height: var(--layout-lucent-header-height);\n  --layout-lucent-sidebar-footer-height: var(--layout-lucent-footer-height);\n  --layout-lucent-sidebar-footer-background-color: var(--color-gradient-brand);\n  --layout-lucent-sidebar-footer-text-color: var(--color-primary-foreground);\n  --layout-lucent-sidebar-collapsed-width: 5rem;\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background);\n\n  --layout-lucent-infobar-width: 25rem;\n  --layout-lucent-infobar-offset-x: 2rem;\n  --layout-lucent-infobar-offset-y: 2rem;\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n  --layout-lucent-infobar-collapsed-width: 5rem;\n  --layout-lucent-infobar-collapsed-background-color: var(--color-background-soft);\n}\n/* Темная движуха */\n[data-theme-mode=\"dark\"] {\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background-soft);\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n}\n.header-module__header___UBB7f {\n  position: relative;\n  z-index: 10;\n  height: var(--layout-lucent-header-height);\n  overflow: hidden;\n  border-block-end: 0.0625rem solid var(--layout-lucent-separator-color);\n  background-color: var(--layout-lucent-header-background-color);\n  transition: height var(--layout-lucent-animation-change-duration) ease-in-out;\n\n  &.header-module__hidden___4D-Ak {\n    height: 0;\n  }\n}\n.header-module__headerInner___LKUUq {\n  display: flex;\n  align-items: center;\n  gap: var(--layout-lucent-header-gap);\n  padding-inline: var(--layout-lucent-header-offset-x);\n  padding-block: var(--layout-lucent-header-offset-y);\n  height: 100%;\n  opacity: 1;\n  transition: opacity var(--layout-lucent-animation-inner-change-duration) ease-in-out;\n\n  &.header-module__hidden___4D-Ak {\n    opacity: 0;\n    transition: none;\n  }\n}\n";
var styles$5 = {"header":"header-module__header___UBB7f","hidden":"header-module__hidden___4D-Ak","headerInner":"header-module__headerInner___LKUUq"};
styleInject(css_248z$5);

/**
 * Шапка макета
 * @namespace Lucent.UI.Header
 */
const Header = ({ children }) => {
    const hidden = useLayout().isHeaderHidden();
    const classes = cn({
        [styles$5.header]: true,
        [styles$5.hidden]: hidden
    });
    const innerClasses = cn({
        [styles$5.headerInner]: true,
        [styles$5.hidden]: hidden
    });
    return (jsxRuntime.jsx("header", { className: classes, children: jsxRuntime.jsx("div", { className: innerClasses, children: children }) }));
};

var css_248z$4 = "/* Lucent CSS: Body */\n/* @import \"./common/tokens.css\"; */\n.body-module__body___uXor9 {\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: stretch;\n}\n";
var styles$4 = {"body":"body-module__body___uXor9"};
styleInject(css_248z$4);

/**
 * Тело макета
 * @namespace Lucent.UI.Body
 */
const Body = ({ children, ...props }) => {
    return (jsxRuntime.jsx("div", { className: styles$4.body, ...props, children: children }));
};

var css_248z$3 = "/* Lucent CSS: Content */\n/* Lucent CSS: Tokens */\n:root {\n  --layout-lucent-separator-color: var(--color-border);\n  --layout-lucent-animation-change-duration: 0.15s;\n  --layout-lucent-animation-inner-change-duration: 1s;\n\n  --layout-lucent-header-height: 5rem;\n  --layout-lucent-header-gap: 1.5rem;\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-header-offset-x: 3rem;\n  --layout-lucent-header-offset-y: 0;\n\n  --layout-lucent-content-offset-x: 5rem;\n  --layout-lucent-content-offset-y: 3.5rem;\n\n  --layout-lucent-footer-height: 5rem;\n  --layout-lucent-footer-gap: 1.5rem;\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-footer-offset-x: var(--layout-lucent-header-offset-x);\n  --layout-lucent-footer-offset-y: 0;\n\n  --layout-lucent-sidebar-width: 16.875rem;\n  --layout-lucent-sidebar-offset-x: 1rem;\n  --layout-lucent-sidebar-offset-y: 1rem;\n  --layout-lucent-sidebar-background-color: var(--color-background-hard);\n  --layout-lucent-sidebar-header-height: var(--layout-lucent-header-height);\n  --layout-lucent-sidebar-footer-height: var(--layout-lucent-footer-height);\n  --layout-lucent-sidebar-footer-background-color: var(--color-gradient-brand);\n  --layout-lucent-sidebar-footer-text-color: var(--color-primary-foreground);\n  --layout-lucent-sidebar-collapsed-width: 5rem;\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background);\n\n  --layout-lucent-infobar-width: 25rem;\n  --layout-lucent-infobar-offset-x: 2rem;\n  --layout-lucent-infobar-offset-y: 2rem;\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n  --layout-lucent-infobar-collapsed-width: 5rem;\n  --layout-lucent-infobar-collapsed-background-color: var(--color-background-soft);\n}\n/* Темная движуха */\n[data-theme-mode=\"dark\"] {\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background-soft);\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n}\n.content-module__content___PjKWy {\n  flex: 1;\n  height: 100%;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.content-module__contentInner___TaaGm {\n  display: flex;\n  flex-direction: column;\n  padding-inline: var(--layout-lucent-content-offset-x);\n  padding-block: var(--layout-lucent-content-offset-y);\n}\n";
var styles$3 = {"content":"content-module__content___PjKWy","contentInner":"content-module__contentInner___TaaGm"};
styleInject(css_248z$3);

/**
 * Основной контент в макете
 * @namespace Lucent.UI.Content
 */
const Content = ({ children }) => {
    return (jsxRuntime.jsx("main", { className: styles$3.content, children: jsxRuntime.jsx(Scrollbar, { children: jsxRuntime.jsx("div", { className: styles$3.contentInner, children: children }) }) }));
};

var css_248z$2 = "/* Lucent CSS: Infobar */\n/* Lucent CSS: Tokens */\n:root {\n  --layout-lucent-separator-color: var(--color-border);\n  --layout-lucent-animation-change-duration: 0.15s;\n  --layout-lucent-animation-inner-change-duration: 1s;\n\n  --layout-lucent-header-height: 5rem;\n  --layout-lucent-header-gap: 1.5rem;\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-header-offset-x: 3rem;\n  --layout-lucent-header-offset-y: 0;\n\n  --layout-lucent-content-offset-x: 5rem;\n  --layout-lucent-content-offset-y: 3.5rem;\n\n  --layout-lucent-footer-height: 5rem;\n  --layout-lucent-footer-gap: 1.5rem;\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-footer-offset-x: var(--layout-lucent-header-offset-x);\n  --layout-lucent-footer-offset-y: 0;\n\n  --layout-lucent-sidebar-width: 16.875rem;\n  --layout-lucent-sidebar-offset-x: 1rem;\n  --layout-lucent-sidebar-offset-y: 1rem;\n  --layout-lucent-sidebar-background-color: var(--color-background-hard);\n  --layout-lucent-sidebar-header-height: var(--layout-lucent-header-height);\n  --layout-lucent-sidebar-footer-height: var(--layout-lucent-footer-height);\n  --layout-lucent-sidebar-footer-background-color: var(--color-gradient-brand);\n  --layout-lucent-sidebar-footer-text-color: var(--color-primary-foreground);\n  --layout-lucent-sidebar-collapsed-width: 5rem;\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background);\n\n  --layout-lucent-infobar-width: 25rem;\n  --layout-lucent-infobar-offset-x: 2rem;\n  --layout-lucent-infobar-offset-y: 2rem;\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n  --layout-lucent-infobar-collapsed-width: 5rem;\n  --layout-lucent-infobar-collapsed-background-color: var(--color-background-soft);\n}\n/* Темная движуха */\n[data-theme-mode=\"dark\"] {\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background-soft);\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n}\n/* Lucent CSS: Animation */\n@keyframes infobar-module__sidebarExpand___17y5a {\n  0% {\n    width: var(--layout-lucent-sidebar-collapsed-width);\n  }\n  100% {\n    width: var(--layout-lucent-sidebar-width);\n  }\n}\n@keyframes infobar-module__sidebarCollapse___jeHoy {\n  0% {\n    width: var(--layout-lucent-sidebar-width);\n  }\n  100% {\n    width: var(--layout-lucent-sidebar-collapsed-width);\n  }\n}\n@keyframes infobar-module__innerShow___PzfOU {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes infobar-module__innerHide___ptYVu {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.infobar-module__infobar___miOYN {\n  width: var(--layout-lucent-infobar-width);\n  background-color: var(--layout-lucent-infobar-background-color);\n  box-shadow: var(--layout-lucent-shadow-ghost-md);\n  transition: width var(--layout-lucent-animation-change-duration) ease-in-out;\n\n  &.infobar-module__hidden___kLqkg {\n    display: none;\n  }\n  &.infobar-module__collapsed___lAzYk {\n    width: var(--layout-lucent-infobar-collapsed-width);\n  }\n}\n.infobar-module__infobarInner___ks4z0 {\n  display: flex;\n  flex-direction: column;\n  padding-block: var(--layout-lucent-infobar-offset-y);\n  padding-inline: var(--layout-lucent-infobar-offset-x);\n  height: 100%;\n  opacity: 1;\n  animation: infobar-module__innerShow___PzfOU var(--layout-lucent-animation-inner-change-duration) ease-in-out forwards;\n\n  /* &.hidden {} */\n  &.infobar-module__collapsed___lAzYk {\n    animation: infobar-module__innerHide___ptYVu var(--layout-lucent-animation-inner-change-duration) ease-in-out forwards;\n  }\n}\n";
var styles$2 = {"infobar":"infobar-module__infobar___miOYN","hidden":"infobar-module__hidden___kLqkg","collapsed":"infobar-module__collapsed___lAzYk","infobarInner":"infobar-module__infobarInner___ks4z0"};
styleInject(css_248z$2);

/**
 * Инфобар макета
 * @namespace Lucent.UI.Infobar
 */
const Infobar = ({ children }) => {
    const { isInfobarHidden, isInfobarCollapsed } = useLayout();
    const hidden = isInfobarHidden();
    const collapsed = isInfobarCollapsed();
    const classes = cn({
        [styles$2.infobar]: true,
        [styles$2.hidden]: hidden,
        [styles$2.collapsed]: collapsed
    });
    const innerClasses = cn({
        [styles$2.infobarInner]: true,
        [styles$2.hidden]: hidden,
        [styles$2.collapsed]: collapsed
    });
    return (jsxRuntime.jsx("aside", { className: classes, children: jsxRuntime.jsx("div", { className: innerClasses, children: children }) }));
};

var css_248z$1 = "/* Lucent CSS: Footer */\n/* Lucent CSS: Tokens */\n:root {\n  --layout-lucent-separator-color: var(--color-border);\n  --layout-lucent-animation-change-duration: 0.15s;\n  --layout-lucent-animation-inner-change-duration: 1s;\n\n  --layout-lucent-header-height: 5rem;\n  --layout-lucent-header-gap: 1.5rem;\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-header-offset-x: 3rem;\n  --layout-lucent-header-offset-y: 0;\n\n  --layout-lucent-content-offset-x: 5rem;\n  --layout-lucent-content-offset-y: 3.5rem;\n\n  --layout-lucent-footer-height: 5rem;\n  --layout-lucent-footer-gap: 1.5rem;\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-footer-offset-x: var(--layout-lucent-header-offset-x);\n  --layout-lucent-footer-offset-y: 0;\n\n  --layout-lucent-sidebar-width: 16.875rem;\n  --layout-lucent-sidebar-offset-x: 1rem;\n  --layout-lucent-sidebar-offset-y: 1rem;\n  --layout-lucent-sidebar-background-color: var(--color-background-hard);\n  --layout-lucent-sidebar-header-height: var(--layout-lucent-header-height);\n  --layout-lucent-sidebar-footer-height: var(--layout-lucent-footer-height);\n  --layout-lucent-sidebar-footer-background-color: var(--color-gradient-brand);\n  --layout-lucent-sidebar-footer-text-color: var(--color-primary-foreground);\n  --layout-lucent-sidebar-collapsed-width: 5rem;\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background);\n\n  --layout-lucent-infobar-width: 25rem;\n  --layout-lucent-infobar-offset-x: 2rem;\n  --layout-lucent-infobar-offset-y: 2rem;\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n  --layout-lucent-infobar-collapsed-width: 5rem;\n  --layout-lucent-infobar-collapsed-background-color: var(--color-background-soft);\n}\n/* Темная движуха */\n[data-theme-mode=\"dark\"] {\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background-soft);\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n}\n.footer-module__footer___8Z0S8 {\n  height: var(--layout-lucent-footer-height);\n  overflow: hidden;\n  border-block-start: 0.0625rem solid var(--layout-lucent-separator-color);\n  background-color: var(--layout-lucent-footer-background-color);\n  transition: height var(--layout-lucent-animation-change-duration) ease-in-out;\n\n  &.footer-module__hidden___dGu-5 {\n    height: 0;\n  }\n}\n.footer-module__footerInner___71GfP {\n  display: flex;\n  align-items: center;\n  gap: var(--layout-lucent-footer-gap);\n  padding-inline: var(--layout-lucent-footer-offset-x);\n  padding-block: var(--layout-lucent-footer-offset-y);\n  height: 100%;\n  opacity: 1;\n  transition: opacity var(--layout-lucent-animation-inner-change-duration) ease-in-out;\n\n  &.footer-module__hidden___dGu-5 {\n    opacity: 0;\n    transition: none;\n  }\n}\n";
var styles$1 = {"footer":"footer-module__footer___8Z0S8","hidden":"footer-module__hidden___dGu-5","footerInner":"footer-module__footerInner___71GfP"};
styleInject(css_248z$1);

/**
 * Футер макета
 * @namespace Lucent.UI.Footer
 */
const Footer = ({ children }) => {
    const hidden = useLayout().isFooterHidden();
    const classes = cn({
        [styles$1.footer]: true,
        [styles$1.hidden]: hidden
    });
    const innerClasses = cn({
        [styles$1.footerInner]: true,
        [styles$1.hidden]: hidden
    });
    return (jsxRuntime.jsx("footer", { className: classes, children: jsxRuntime.jsx("div", { className: innerClasses, children: children }) }));
};

var css_248z = "/* Lucent CSS: Layout */\n/* Lucent CSS: Tokens */\n:root {\n  --layout-lucent-separator-color: var(--color-border);\n  --layout-lucent-animation-change-duration: 0.15s;\n  --layout-lucent-animation-inner-change-duration: 1s;\n\n  --layout-lucent-header-height: 5rem;\n  --layout-lucent-header-gap: 1.5rem;\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-header-offset-x: 3rem;\n  --layout-lucent-header-offset-y: 0;\n\n  --layout-lucent-content-offset-x: 5rem;\n  --layout-lucent-content-offset-y: 3.5rem;\n\n  --layout-lucent-footer-height: 5rem;\n  --layout-lucent-footer-gap: 1.5rem;\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-footer-offset-x: var(--layout-lucent-header-offset-x);\n  --layout-lucent-footer-offset-y: 0;\n\n  --layout-lucent-sidebar-width: 16.875rem;\n  --layout-lucent-sidebar-offset-x: 1rem;\n  --layout-lucent-sidebar-offset-y: 1rem;\n  --layout-lucent-sidebar-background-color: var(--color-background-hard);\n  --layout-lucent-sidebar-header-height: var(--layout-lucent-header-height);\n  --layout-lucent-sidebar-footer-height: var(--layout-lucent-footer-height);\n  --layout-lucent-sidebar-footer-background-color: var(--color-gradient-brand);\n  --layout-lucent-sidebar-footer-text-color: var(--color-primary-foreground);\n  --layout-lucent-sidebar-collapsed-width: 5rem;\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background);\n\n  --layout-lucent-infobar-width: 25rem;\n  --layout-lucent-infobar-offset-x: 2rem;\n  --layout-lucent-infobar-offset-y: 2rem;\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n  --layout-lucent-infobar-collapsed-width: 5rem;\n  --layout-lucent-infobar-collapsed-background-color: var(--color-background-soft);\n}\n/* Темная движуха */\n[data-theme-mode=\"dark\"] {\n  --layout-lucent-sidebar-collapsed-background-color: var(--color-background-soft);\n  --layout-lucent-header-background-color: var(--color-background-soft);\n  --layout-lucent-footer-background-color: var(--color-background-hard);\n  --layout-lucent-infobar-background-color: var(--color-background-soft);\n}\n/* Layout */\n.layout-module__layout___Pd2UM {\n  position: fixed;\n  inset: 0;\n  display: flex;\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden;\n  background-color: var(--layout-lucent-background-color);\n  color: var(--layout-lucent-color);\n  font-family: var(--layout-lucent-font-family-base);\n  font-size: var(--layout-lucent-text-base);\n  font-weight: var(--layout-lucent-font-weight-normal);\n  line-height: var(--layout-lucent-line-height-normal);\n  letter-spacing: var(--layout-lucent-letter-spacing-normal);\n}\n";
var styles = {"layout":"layout-module__layout___Pd2UM"};
styleInject(css_248z);

/**
 * Каркас макета
 * @namespace Lucent.UI.Layout
 */
const Layout = () => {
    const { modes, slots, hasSidebar, hasHeader, hasInfobar, hasFooter, hasContent } = useLayout();
    if (!hasContent()) {
        throw new Error("Ну контент же, все-таки, нужно передать 🙄");
    }
    const header = hasHeader() ? jsxRuntime.jsx(Header, { children: slots.header }) : null;
    const sidebar = hasSidebar() ? jsxRuntime.jsx(Sidebar, { ...slots.sidebar }) : null;
    const infobar = hasInfobar() ? jsxRuntime.jsx(Infobar, { children: slots.infobar }) : null;
    const footer = hasFooter() ? jsxRuntime.jsx(Footer, { children: slots.footer }) : null;
    const content = jsxRuntime.jsx(Content, { children: slots.content });
    // Аттрибуты для опредления глобальных стилей
    const modeAttributes = {
        "data-theme-mode": modes.theme,
        "data-header-visible-mode": modes.headerVisible,
        "data-footer-visible-mode": modes.footerVisible,
        "data-sidebar-visible-mode": modes.sidebarVisible,
        "data-sidebar-collapsed-mode": modes.sidebarCollapsed,
        "data-infobar-visible-mode": modes.infobarVisible,
        "data-infobar-collapsed-mode": modes.infobarCollapsed
    };
    return (jsxRuntime.jsxs("div", { className: styles.layout, ...modeAttributes, children: [sidebar, jsxRuntime.jsxs(Page, { children: [header, jsxRuntime.jsxs(Body, { children: [content, infobar] }), footer] })] }));
};

/**
 * Макет "Lucent" (хз почему так назвал, но пусть будет так 🙃)
 * @namespace Lucent
 */
const Lucent = ({ config }) => {
    return (jsxRuntime.jsx(Provider, { config: config, children: jsxRuntime.jsx(Layout, {}) }));
};

exports.Lucent = Lucent;
exports.normalizeConfig = normalizeConfig;
exports.useLayout = useLayout;
//# sourceMappingURL=index.js.map
