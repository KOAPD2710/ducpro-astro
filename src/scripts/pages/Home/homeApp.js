import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { parseRem } from '@scripts/utils';

gsap.registerPlugin(ScrollTrigger)

let timeline;
let target;
let stickyPos;
let offset;
let allImg;
const timelineAllImg = [];

const homeApp = (DOM) => {
    target = $(DOM)
    allImg = target.find('.home-app-item')

    setTimeline()
}

const resizeHomeApp = () => {
    timeline.scrollTrigger.kill();
    
    timelineAllImg.forEach((tl, idx) => {
        tl.scrollTrigger.kill();

        timelineAllImg.splice(0)
    })
    setTimeline();
}

const leaveHomeApp = () => {
    timeline.scrollTrigger.kill();

    timelineAllImg.forEach((tl, idx) => {
        timelineAllImg.splice(0)
    })
}

const setTimeline = () => {
    stickyPos = gsap.getProperty(target.find('.home-app-list')[0], '--sticky-pos');
    offset = gsap.getProperty(target[0], 'margin-bottom');

    timeline = gsap.timeline({
        scrollTrigger: {
            trigger: target.find('.home-app-list'),
            start: `top top+=${parseRem(stickyPos * 10)}`,
            end: `bottom+=${offset} top+=${parseRem(stickyPos * 10)}`,
            scrub: true,
        },
    })

    timeline.set(target.find('.home-app-title'), {
        position: 'sticky',
        top: parseRem(stickyPos * 10) - target.find('.home-app-title').innerHeight() - gsap.getProperty(target.find('.home-app-list')[0], 'margin-top'),
    })

    timeline.to([target.find('.home-app-list'), target.find('.home-app-title')], {
        y: offset,
        ease: 'none',
    })


    allImg.each((idx, el) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: `top+=${gsap.getProperty(target[0], 'margin-bottom') / allImg.length * idx} bottom`,
                endTrigger: $(el).find('.home-app-item-img'),
                end: `bottom+=${gsap.getProperty(target[0], 'margin-bottom') / allImg.length * idx} top`,
                scrub: true,
            },
        });
        tl.set($(el).find('.home-app-item-img-inner'), {
            height: `${(100 + 10) * (1 + .1)}%`,
            yPercent: 0, 
        })
        tl.to($(el).find('.home-app-item-img-inner'), {
            yPercent: -10,
            ease: 'none'
        })

        timelineAllImg.push(tl)
    })
}

export { homeApp, resizeHomeApp, leaveHomeApp };