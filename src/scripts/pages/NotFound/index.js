import $ from 'jquery';
import { debounce } from '@scripts/utils';

const notFound = {
    namespace: "notFound",
    debouncedResize: null,
    
    async afterEnter(data) {
        console.log(`Enter ${this.namespace} page`);

        const pageDOM = $(data.next.container);

        this.debouncedResize = debounce(() => {
        }, 250);

        $(window).on('resize', this.debouncedResize);
    },
    afterLeave(data) {
        console.log(`Leave ${this.namespace} page`);

        $(window).off('resize', this.debouncedResize);
    }
}

export default notFound;