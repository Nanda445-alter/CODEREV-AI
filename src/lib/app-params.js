const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = (windowObj.localStorage || new Map());

const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	const storageKey = `base44_${toSnakeCase(paramName)}`;
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
			}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		if (typeof (storage).setItem === 'function') {
			(storage).setItem(storageKey, searchParam);
		}
		return searchParam;
	}
	if (defaultValue) {
		if (typeof (storage).setItem === 'function') {
			(storage).setItem(storageKey, defaultValue);
		}
		return defaultValue;
	}
	const storedValue = typeof (storage).getItem === 'function' ? (storage).getItem(storageKey) : null;
	if (storedValue) {
		return storedValue;
	}
	return null;
}

const getAppParams = () => {
	if (getAppParamValue("clear_access_token") === 'true') {
		if (typeof (storage).removeItem === 'function') {
			(storage).removeItem('base44_access_token');
			(storage).removeItem('token');
		}
	}
	return {
		appId: getAppParamValue("app_id", { defaultValue: typeof import.meta !== 'undefined' && import.meta.env?.VITE_BASE44_APP_ID || undefined }),
		token: getAppParamValue("access_token", { removeFromUrl: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: window.location.href }),
		functionsVersion: getAppParamValue("functions_version", { defaultValue: typeof import.meta !== 'undefined' && import.meta.env?.VITE_BASE44_FUNCTIONS_VERSION || undefined }),
		appBaseUrl: getAppParamValue("app_base_url", { defaultValue: typeof import.meta !== 'undefined' && import.meta.env?.VITE_BASE44_APP_BASE_URL || undefined }),
	}
}


export const appParams = {
	...getAppParams()
}
