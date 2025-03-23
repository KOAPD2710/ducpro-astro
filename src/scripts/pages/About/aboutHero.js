import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/src/SplitText';
import { typeOpts } from '@scripts/utils';
import { delayTl } from '@scripts/states';
import { getLenis } from '@scripts/systems/lenis';

gsap.registerPlugin(ScrollTrigger, SplitText)

let target;

const aboutHero = (DOM) => {
    target = $(DOM);
}

const resizeAboutHero = () => {
}

const leaveAboutHero = () => {}

const onEnterAboutHero = (DOM) => {

    console.log('qq')
    const lenis = getLenis()
    lenis.stop()

    const splitTxt = {
        title: new SplitText(DOM.find('.abt-hero-title'), typeOpts.words),
        label: new SplitText(DOM.find('.abt-hero-label'), typeOpts.chars),
        desc: new SplitText(DOM.find('.abt-hero-desc'), typeOpts.words),
    }
    
    gsap.set(splitTxt.title.words, {
        yPercent: 100
    })
    gsap.set(splitTxt.label.chars, {
        yPercent: 100
    })
    gsap.set(splitTxt.desc.words, {
        yPercent: 100
    })
    gsap.set(DOM.find('.abt-hero-img'), {
        clipPath: "inset(90% 0% 10%)"
    })

    const allImgs = DOM.find('.abt-hero-img-inner')
    allImgs.each((idx, el) => {
        gsap.set(el, {
            position: 'relative',
            zIndex: allImgs.length - idx,
            scale: 1.1,
            opacity: 0
        })
    })

    const tl = gsap.timeline({
        delay: delayTl,
        onComplete: () => {
            splitTxt.title.revert()
            splitTxt.label.revert()
            splitTxt.desc.revert()
            lenis.start()
        }
    })

    tl
    .to(splitTxt.title.words, {
        yPercent: 0,
        stagger: .03,
        duration: .6,
        ease: 'power1.out'
    }, 0)
    .to(splitTxt.label.chars, {
        yPercent: 0,
        stagger: .005,
        duration: .4,
        ease: 'power1.out'
    }, '>-.6')
    .to(splitTxt.desc.words, {
        yPercent: 0,
        stagger: .005,
        duration: .6,
        ease: 'power1.out'
    }, '<+.1')
    .to(DOM.find('.abt-hero-img'), {
        clipPath: "inset(0% 0% 0%)",
        duration: .6,
        ease: 'power2.out'
    }, 0)
    .to(DOM.find('.abt-hero-img-inner'), {
        opacity: 1,
        scale: 1,
        stagger: -.1,
        duration: .5,
        ease: 'power1.out',
    }, 0)
}

const onFirstLoadAboutHero = (DOM) => {
    const lenis = getLenis()
    lenis.stop()

    const splitTxt = {
        title: new SplitText(DOM.find('.abt-hero-title'), typeOpts.words),
        label: new SplitText(DOM.find('.abt-hero-label'), typeOpts.chars),
        desc: new SplitText(DOM.find('.abt-hero-desc'), typeOpts.words),
    }
    
    gsap.set(splitTxt.title.words, {
        yPercent: 100
    })
    gsap.set(splitTxt.label.chars, {
        yPercent: 100
    })
    gsap.set(splitTxt.desc.words, {
        yPercent: 100
    })
    gsap.set(DOM.find('.abt-hero-img'), {
        clipPath: "inset(90% 0% 10%)"
    })

    const allImgs = DOM.find('.abt-hero-img-inner')
    allImgs.each((idx, el) => {
        gsap.set(el, {
            position: 'relative',
            zIndex: allImgs.length - idx,
            scale: 1.1,
            opacity: 0
        })
    })
    
    const tl = gsap.timeline({
        onComplete: () => {
            splitTxt.title.revert()
            splitTxt.label.revert()
            splitTxt.desc.revert()
            lenis.start()
        }
    })

    tl
    .to(splitTxt.title.words, {
        yPercent: 0,
        stagger: .03,
        duration: .6,
        ease: 'power1.out'
    }, 0)
    .to(splitTxt.label.chars, {
        yPercent: 0,
        stagger: .005,
        duration: .4,
        ease: 'power1.out'
    }, '>-.6')
    .to(splitTxt.desc.words, {
        yPercent: 0,
        stagger: .005,
        duration: .6,
        ease: 'power1.out'
    }, '<+.1')
    .to(DOM.find('.abt-hero-img'), {
        clipPath: "inset(0% 0% 0%)",
        duration: .6,
        ease: 'power2.out'
    }, 0)
    .to(DOM.find('.abt-hero-img-inner'), {
        opacity: 1,
        scale: 1,
        stagger: -.1,
        duration: .5,
        ease: 'power1.out',
    }, "<")
}

export { aboutHero, resizeAboutHero, leaveAboutHero, onEnterAboutHero, onFirstLoadAboutHero }