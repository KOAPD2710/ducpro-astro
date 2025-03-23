import $ from 'jquery';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { parseRem, typeOpts } from '@scripts/utils';
import { getLenis } from '@scripts/systems/lenis';
import { delayTl } from '@scripts/states';

gsap.registerPlugin(ScrollTrigger, SplitText)

let timeline;
let target;

const homeHero = (DOM) => {
    target = $(DOM);
    const lenis = getLenis();

    timeline = gsap.timeline({
        scrollTrigger: {
            trigger: target,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
        }
    })

    setTimeline()

    target.find('.home-hero-hint').on('click', () => {
        lenis.scrollTo(target.height(), {
            duration: 1
        })
    })
}

const resizeHomeHero = () => {
    timeline.clear()
    setTimeline()
}

const leaveHomeHero = () => {
    timeline.scrollTrigger?.kill()
    timeline.clear()
}

const setTimeline = () => {
    timeline.set(target.find('.container.grid'), { clearProps: 'all' })
    timeline.set(target.find('.home-hero-overlay'), { clearProps: 'all' })

    timeline
    .to(target.find('.container.grid'), {
        y: parseRem(300),
        ease: 'none'
    }, 0)
    .to(target.find('.home-hero-overlay'), {
        opacity: 1,
        ease: 'none'
    }, 0)
}

const onEnterHome = (DOM) => {
    const splitTxt = {
        title: new SplitText($(DOM).find('.home-hero-title'), typeOpts.words),
        label: new SplitText($(DOM).find('.home-hero-label'), typeOpts.chars),
        desc: new SplitText($(DOM).find('.home-hero-desc'), typeOpts.words),
    }
    gsap.set($(DOM).find('.home-hero-bg-inner'), {
        scale: 1.2
    })
    gsap.set(splitTxt.title.words, {
        yPercent: 100
    })
    gsap.set(splitTxt.desc.words, {
        yPercent: 100
    })
    gsap.set(splitTxt.label.chars, {
        yPercent: 100
    })
    gsap.set($(DOM).find('.home-hero-label-line'), {
        scaleX: 0,
        transformOrigin: 'left'
    })
    gsap.set($(DOM).find('.home-hero-hint'), {
        opacity: 0,
        yPercent: -50,
    })
    gsap.set($(DOM).find('.home-hero-social'), {
        opacity: 0,
        scale: 0
    })

    const tl = gsap.timeline({
        onComplete: () => {
            splitTxt.title.revert()
            splitTxt.label.revert()
            splitTxt.desc.revert()

            gsap.set($(DOM).find('.home-hero-bg-inner'), { clearProps: true })
        },
        delay: delayTl,
    })
    tl
    .to($(DOM).find('.home-hero-bg-inner'), {
        scale: 1,
        ease: 'power2.out',
        duration: 1
    }, 0)
    .to(splitTxt.label.chars, {
        yPercent: 0,
        stagger: .005,
        duration: .4,
        ease: 'power1.out'
    }, 0)
    .to($(DOM).find('.home-hero-label-line'), {
        scaleX: 1,
        duration: .6,
        ease: 'power2.out',
        clearProps: true
    }, '<+.1')
    .to(splitTxt.title.words, {
        yPercent: 0,
        stagger: .03,
        duration: .6,
        ease: 'power1.out'
    }, '<+.1')
    .to(splitTxt.desc.words, {
        yPercent: 0,
        stagger: .01,
        duration: .6,
        ease: 'power1.out'
    }, '<+.1')
    .to($(DOM).find('.home-hero-hint'), {
        opacity: 1,
        yPercent: 0,
        duration: .6,
        ease: 'power2.out',
        clearProps: true
    }, '<')
    .to($(DOM).find('.home-hero-social'), {
        opacity: 1,
        scale: 1,
        duration: .4,
        ease: 'power3.out',
        clearProps: true
    }, '<')
}

const onFirstLoadHomeHero = (DOM) => {
    const splitTxt = {
        title: new SplitText($(DOM).find('.home-hero-title'), typeOpts.words),
        label: new SplitText($(DOM).find('.home-hero-label'), typeOpts.chars),
        desc: new SplitText($(DOM).find('.home-hero-desc'), typeOpts.words),
    }
    gsap.set($(DOM).find('.home-hero-bg-inner'), {
        scale: 1.2
    })
    gsap.set(splitTxt.title.words, {
        yPercent: 100
    })
    gsap.set(splitTxt.desc.words, {
        yPercent: 100
    })
    gsap.set(splitTxt.label.chars, {
        yPercent: 100
    })
    gsap.set($(DOM).find('.home-hero-label-line'), {
        scaleX: 0,
        transformOrigin: 'left'
    })
    gsap.set($(DOM).find('.home-hero-hint'), {
        opacity: 0,
        yPercent: -50,
    })
    gsap.set($(DOM).find('.home-hero-social'), {
        opacity: 0,
        scale: 0
    })

    const tl = gsap.timeline({
        onComplete: () => {
            splitTxt.title.revert()
            splitTxt.label.revert()
            splitTxt.desc.revert()

            gsap.set($(DOM).find('.home-hero-bg-inner'), { clearProps: true })
        },
    })
    tl
    .to($(DOM).find('.home-hero-bg-inner'), {
        scale: 1,
        ease: 'power2.out',
        duration: 1
    }, 0)
    .to(splitTxt.label.chars, {
        yPercent: 0,
        stagger: .005,
        duration: .4,
        ease: 'power1.out'
    }, 0)
    .to($(DOM).find('.home-hero-label-line'), {
        scaleX: 1,
        duration: .6,
        ease: 'power2.out',
        clearProps: true
    }, '<+.1')
    .to(splitTxt.title.words, {
        yPercent: 0,
        stagger: .03,
        duration: .6,
        ease: 'power1.out'
    }, '<+.1')
    .to(splitTxt.desc.words, {
        yPercent: 0,
        stagger: .01,
        duration: .6,
        ease: 'power1.out'
    }, '<+.1')
    .to($(DOM).find('.home-hero-hint'), {
        opacity: 1,
        yPercent: 0,
        duration: .6,
        ease: 'power2.out',
        clearProps: true
    }, '<')
    .to($(DOM).find('.home-hero-social'), {
        opacity: 1,
        scale: 1,
        duration: .4,
        ease: 'power3.out',
        clearProps: true
    }, '<')
}


export { homeHero, resizeHomeHero, leaveHomeHero, onEnterHome, onFirstLoadHomeHero }