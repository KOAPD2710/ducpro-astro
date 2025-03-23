import $ from 'jquery';
import { debounce } from '@scripts/utils';
import { checkURLForFilter, leaveProductFilter, onEnterProductFilter, onFirstLoadPorfolioFilter, productFilter } from './productFilter';
import { productFunc } from './productFunc';
import { productCard, leaveProductCard } from '../../components/productCard';
import { isFirstLoad, setIsFirstLoad } from '@scripts/states/index';

const product = {
    namespace: "product",
    debouncedResize: null,

    beforeEnter(data) {
        const pageDOM = $(data.next.container);
        checkURLForFilter(pageDOM.find('.prod-filter'))

        !isFirstLoad && onEnterProductFilter(pageDOM.find('.prod-filter'))

    },
    async afterEnter(data) {
        console.log(`Enter ${this.namespace} page`);

        const pageDOM = $(data.next.container);
        isFirstLoad && onFirstLoadPorfolioFilter(pageDOM.find('.prod-filter'))
        setIsFirstLoad(false)
        
        productFunc(pageDOM)
        productFilter(pageDOM.find('.prod-filter'))
        productCard(pageDOM.find('.prod-list'))


        this.debouncedResize = debounce(() => {
        }, 250);

        $(window).on('resize', this.debouncedResize);
    },
    afterLeave(data) {
        console.log(`Leave ${this.namespace} page`);
        $(window).off('resize', this.debouncedResize);


        leaveProductFilter()
        leaveProductCard()
    }
}

export default product;