import $ from 'jquery';

import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';

import { getStartTime, getCurrentTime } from '../helper/testLoadScriptSpeed';
import { initLenis } from '../systems/lenis';
import { killScrolltrigger } from '../helper/killScrolltrigger';
import { debounce } from '../utils';

import { initTheme } from '../components/theme';
import { initHeader, resizeHeader, initActiveLinkHeader, initSubHeader } from '../components/header';
import { initFooter, leaveFooter, resizeFooter } from '../components/footer';
import initCursor from '../components/cursor';
import pageTransitionTimeline from '../components/page-transition';
import loadingAnimation from '../components/loading';

import notFound from './NotFound/index';
import home from './Home/index';
import about from './About/index';
import portfolio from './Portfolio/index';
import portfolioDetail from './PortfolioDetail/index';

import product from './Product/index';
import productDetail from './ProductDetail/index';

const VIEWS = [notFound, home, about, portfolio, portfolioDetail, product, productDetail];


const initPageScripts = () => {
	getStartTime()

	const handleGlobal = {
		once: async (data, context) => {
			initLenis()
			initTheme(data)
			initHeader(data)
			initSubHeader()
			initActiveLinkHeader()
			initFooter(data)
			initCursor(data)

			context.debouncedResize = debounce(() => {
				resizeHeader()
				resizeFooter()
			}, 250);

			$(window).on('resize', context.debouncedResize);

			await loadingAnimation(data)
		},
		after: (data, context) => {
			initTheme(data)
			initHeader(data)
			initFooter(data)
			initCursor(data)

			context.debouncedResize = debounce(() => {
				resizeHeader()
				resizeFooter()
			}, 250);

			$(window).on('resize', context.debouncedResize);
		},
		leave: (data, context) => {
			initActiveLinkHeader()
			return pageTransitionTimeline(data)
		},
		afterLeave: (data, context) => {
			leaveFooter()
			killScrolltrigger()

			$(window).off('resize', context.debouncedResize);
		}
	}

	// barba.use(barbaPrefetch);
	barba.init({
		debug: true,
		prefetch: true,
		cacheFirstPage: true,
		preventRunning: true,
		transitions: [
			{
				name: 'page-transition',
				sync: true,
				debouncedResize: null,
				async once(data) {
					console.log("Barba's scripts initialized! 🎉");
					console.log(`Initialization took ${getCurrentTime().toFixed(3)} milliseconds.`);
					await handleGlobal.once(data, this)
				},
				leave(data) {
					return handleGlobal.leave(data, this)
				},
				afterLeave(data) {
					handleGlobal.afterLeave(data, this)
				},
				async after(data) {
					handleGlobal.after(data, this)
				},
			}, {
				name: 'self',
				sync: true,
				debouncedResize: null,
				leave(data) {
					return handleGlobal.leave(data, this)
				},
				afterLeave(data) {
					handleGlobal.afterLeave(data, this)
				},
				async after(data) {
					handleGlobal.after(data, this)
				},
			}
		],
		views: VIEWS
	});
};

export default initPageScripts;