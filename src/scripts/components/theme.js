import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { isFirstLoad } from '@scripts/states';

gsap.registerPlugin(ScrollTrigger);

const header = $('.header')

const addLight = (target) => {
    // if ($(target).hasClass('dark-mode') && !isFirstLoad) {
    //     $(target).removeClass('dark-mode').addClass('light-mode');
    // }
    if (header.hasClass('light-mode') && !isFirstLoad) {
        header.removeClass('light-mode')
    }
}

const addDark = (target) => {
    // if ($(target).hasClass('light-mode') && !isFirstLoad) {
    //     $(target).removeClass('light-mode').addClass('dark-mode');
    // }
    if (!header.hasClass('light-mode') && !isFirstLoad) {
        header.addClass('light-mode');
    }
}

const initTheme = (data) => {
    const DOM = $('body')
    const nextDOM = $(data.next.container)
    const firstSc = nextDOM.find('section').eq(0)
    const darkPart = nextDOM.find('[data-theme=dark]');

    darkPart.each((__, el) => {
        const isHeroSc = $(el).offset().top < 10;
        ScrollTrigger.create({
            trigger: el,
            start: `top${isHeroSc && '-=50px'} top+=${header.height()/2}`,
            end: `bottom top+=${header.height()/2}`,
            onEnter: () => addDark(DOM),
            onEnterBack: () => addDark(DOM),
            onLeave: () => addLight(DOM),
            onLeaveBack: () => addLight(DOM),
        })
    })

    ScrollTrigger.refresh();

    const themeFirstSc = $(firstSc).attr('data-theme')

    if (themeFirstSc === 'dark') {
        header.addClass('light-mode');
    } else {
        header.removeClass('light-mode')
    }
}

export { initTheme }