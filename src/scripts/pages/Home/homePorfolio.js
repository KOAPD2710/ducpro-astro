import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

let target;
let timeline;


const homePort = (DOM) => {
    target = $(DOM)

    timeline = gsap.timeline({
        scrollTrigger: {
            trigger: target.find('.home-port-img'),
            scrub: .5,
        }
    })

    setTimeline()
}

const resizeHomePort = () => {
    timeline.clear()

    setTimeline()
}

const leaveHomePort = () => {

}

const setTimeline = () => {
    timeline.set(target.find('.home-port-img-inner'), {
        height: `${(100 + 5) * (1 + .05)}%`,
        yPercent: 0,
    })
    timeline.to(target.find('.home-port-img-inner'), {
        yPercent: -5,
        ease: 'none'
    })
}

export { homePort, resizeHomePort, leaveHomePort }