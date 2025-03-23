import $ from 'jquery';
import { debounce } from '@scripts/utils';
import { aboutHero, leaveAboutHero, onEnterAboutHero, onFirstLoadAboutHero, resizeAboutHero } from './aboutHero';
import { aboutMiles } from './aboutMiles';
import { isFirstLoad, setIsFirstLoad } from '@/scripts/states/index';
import { aboutCareer } from './aboutCareer';


const about = {
    namespace: "about",
    debouncedResize: null,

    beforeEnter(data) {
        const pageDOM = $(data.next.container);
        !isFirstLoad && onEnterAboutHero(pageDOM.find('.abt-hero'))
    },
    async afterEnter(data) {
        console.log(`Enter ${this.namespace} page`);
        const pageDOM = $(data.next.container);

        isFirstLoad && onFirstLoadAboutHero(pageDOM.find('.abt-hero'))
        setIsFirstLoad(false)
        aboutHero(pageDOM.find('.abt-hero'))
        aboutMiles(pageDOM.find('.abt-miles'))
        aboutCareer(pageDOM.find('.abt-career'))

        this.debouncedResize = debounce(() => {
            resizeAboutHero()
        }, 250);

        $(window).on('resize', this.debouncedResize);
    },
    afterLeave(data) {
        console.log(`Leave ${this.namespace} page`);

        $(window).off('resize', this.debouncedResize);

        leaveAboutHero()
    }
}

export default about;