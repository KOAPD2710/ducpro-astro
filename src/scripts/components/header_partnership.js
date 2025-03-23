import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const header = $('.header')
const marquee = header.find('[data-header=navi_marquee]');
const marqueeTranslate = marquee.find('[data-header=navi_marquee_translate]');
const marqueeSpeed = 80;

let tlHeaderMarquee;

const initHeaderMarquee = () => {
    const ratioItem = marquee.eq(0).width() / marqueeTranslate.eq(0).width()
    const countItem = Number.parseInt(ratioItem + 1) 

    for (let i = 0; i < countItem; i++) {
        const cloner = marqueeTranslate.clone();
        marquee.append(cloner);
    }

    tlHeaderMarquee = gsap.timeline({
        repeat: -1,
    })

    tlHeaderMarquee.to(marquee.find('[data-header=navi_marquee_translate]'), {
        xPercent: -100,
        duration: marqueeTranslate.eq(0).outerWidth() / marqueeSpeed,
        ease: 'none'
    })
}

const resizeHeaderMarquee = () => {
    // tlHeaderMarquee.pause()
    // tlHeaderMarquee.progress(0)
    // tlHeaderMarquee.kill()

    // initHeaderMarquee()
}

const getTlHeaderMarquee = () => {
    if (!tlHeaderMarquee) {
        initHeaderMarquee()
        
        return tlHeaderMarquee
    }
    return tlHeaderMarquee
}

export { initHeaderMarquee, getTlHeaderMarquee, resizeHeaderMarquee }