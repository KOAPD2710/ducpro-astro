import $ from 'jquery';
import { debounce } from '@scripts/utils';
import { productCard, leaveProductCard} from '../../components/productCard';

import { isFirstLoad, setIsFirstLoad } from '@scripts/states/index';
import { productDetailAccordion } from './productDetailAccordion';

const productDetail = {
    namespace: "productDetail",
    debouncedResize: null,

    beforeEnter(data) {
        const pageDOM = $(data.next.container);
        // checkURLForFilter(pageDOM.find('.prod-filter'))

        // !isFirstLoad && onEnterProductFilter(pageDOM.find('.prod-filter'))

    },
    async afterEnter(data) {
        console.log(`Enter ${this.namespace} page`);

        const pageDOM = $(data.next.container);

        // isFirstLoad && onFirstLoadPorfolioFilter(pageDOM.find('.prod-filter'))
        // setIsFirstLoad(false)
        
        productDetailAccordion(pageDOM)
        productCard(pageDOM.find('.prodDtl-relativeProd'))

        this.debouncedResize = debounce(() => {
        }, 250);

        $(window).on('resize', this.debouncedResize);
    },
    afterLeave(data) {
        console.log(`Leave ${this.namespace} page`);
        $(window).off('resize', this.debouncedResize);

        leaveProductCard()
    }
}

export default productDetail;