import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

let target;

const aboutCareer = (DOM) => {
    target = $(DOM);

    const imgTarget = target.find('.abt-career-img')
    const imgTranslate = imgTarget.find('.abt-career-img-container')

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: imgTarget,
            scrub: true,
        }
    })


    tl.to(imgTranslate, {
        x: - (imgTranslate.width() - imgTarget.width()),
        ease: 'none'
    })
}

export { aboutCareer }