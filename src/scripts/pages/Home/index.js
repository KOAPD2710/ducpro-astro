import $ from 'jquery';
import { debounce } from '@scripts/utils';

import { homeHero, resizeHomeHero, onEnterHome, leaveHomeHero, onFirstLoadHomeHero } from './homeHero';
import { homeProduct2, resizeHomeProduct2, leaveHomeProduct2 } from './homeProduct2';
import { homeApp, resizeHomeApp, leaveHomeApp } from './homeApp';
import { homePort, resizeHomePort, leaveHomePort } from './homePorfolio';
import { isFirstLoad, setIsFirstLoad } from '@scripts/states';
import { homeBrand, leaveHomeBrand } from './homeBrand';

const home = {
    namespace: "home",
    debouncedResize: null,

    beforeEnter(data) {
        const pageDOM = $(data.next.container);

        !isFirstLoad && onEnterHome(pageDOM.find('.home-hero'))
    },
    async afterEnter(data) {
        console.log(`Enter ${this.namespace} page`);

        const pageDOM = $(data.next.container);

        isFirstLoad && onFirstLoadHomeHero(pageDOM.find('.home-hero'));
        setIsFirstLoad(false)

        homeHero(pageDOM.find('.home-hero'))
        homeProduct2(pageDOM.find('.home-prod2'))
        homeBrand(pageDOM.find('.home-brand'))
        homeApp(pageDOM.find('.home-app'))
        homePort(pageDOM.find('.home-port'))

        this.debouncedResize = debounce(() => {
            resizeHomeHero();
            resizeHomeProduct2();
            resizeHomeApp();
            resizeHomePort();
        }, 250);

        $(window).on('resize', this.debouncedResize);
    },
    afterLeave(data) {
        console.log(`Leave ${this.namespace} page`);

        $(window).off('resize', this.debouncedResize);

        leaveHomeHero()
        leaveHomeProduct2()
        leaveHomeBrand()
        leaveHomeApp()
        leaveHomePort()
    }
}

export default home;