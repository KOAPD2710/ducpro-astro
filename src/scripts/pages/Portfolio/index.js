import $ from 'jquery';
import { debounce } from '@scripts/utils';
import { portfolioHero, onEnterPortfolioHero, resizePortfolioHero, leavePortfolioHero, onFirstLoadPortfolioHero } from './portfolioHero';
import { leavePortfolioFeat, portfolioFeat, resizePortfolioFeat } from './portfolioFeat';
import { isFirstLoad, setIsFirstLoad } from '@/scripts/states/index';

const portfolio = {
    namespace: "portfolio",
    debouncedResize: null,

    beforeEnter(data) {
        const pageDOM = $(data.next.container);
        !isFirstLoad && onEnterPortfolioHero(pageDOM.find('.port-hero'))
    },
    async afterEnter(data) {
        console.log(`Enter ${this.namespace} page`);

        const pageDOM = $(data.next.container);

        isFirstLoad && onFirstLoadPortfolioHero(pageDOM.find('.port-hero'))
        setIsFirstLoad(false)

        portfolioHero(pageDOM.find('.port-hero'))
        portfolioFeat(pageDOM.find('.port-feat'))

        this.debouncedResize = debounce(() => {
            resizePortfolioHero()
            resizePortfolioFeat()
        }, 250);

        $(window).on('resize', this.debouncedResize);
    },
    afterLeave(data) {
        console.log(`Leave ${this.namespace} page`);

        $(window).off('resize', this.debouncedResize);

        leavePortfolioHero()
        leavePortfolioFeat()
    }
}

export default portfolio;