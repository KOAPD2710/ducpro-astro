import $ from 'jquery';
import { debounce } from '@scripts/utils';
import portfolioDetailImage from './portfolioDetailImage';

import { isFirstLoad, setIsFirstLoad } from '@/scripts/states/index';

const portfolioDetail = {
    namespace: "portfolioDetail",
    debouncedResize: null,

    beforeEnter(data) {
        const pageDOM = $(data.next.container);
        // !isFirstLoad && onEnterPortfolioHero(pageDOM.find('.port-hero'))
    },
    async afterEnter(data) {
        console.log(`Enter ${this.namespace} page`);

        const pageDOM = $(data.next.container);
        portfolioDetailImage(pageDOM.find('.portfolioDtl-body'))

        // isFirstLoad && onFirstLoadPortfolioHero(pageDOM.find('.port-hero'))
        // setIsFirstLoad(false)


        this.debouncedResize = debounce(() => {
        }, 250);

        $(window).on('resize', this.debouncedResize);
    },
    afterLeave(data) {
        console.log(`Leave ${this.namespace} page`);

        $(window).off('resize', this.debouncedResize);
    }
}

export default portfolioDetail;