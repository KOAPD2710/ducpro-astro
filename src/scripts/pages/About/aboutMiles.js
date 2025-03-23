import $ from 'jquery';
import gsap, { Quint, Sine } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/src/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText)

let target;

const aboutMiles = (DOM) => {
    target = $(DOM)

    const allSites = target.find('.abt-miles-time, .abt-miles-since')
    const allSitesInner = target.find('.abt-miles-time-inner, .abt-miles-since-inner')

    const currentYear = new Date().getFullYear();
    const startYear = Number.parseFloat(target.find('.abt-miles-time-inner').text().trim());

    const gap = currentYear - startYear;

    const tlTxt = gsap.timeline({
        scrollTrigger: {
            trigger: target,
            start: `top top+=${gsap.getProperty(allSites[0], 'top')}`,
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                const progress = Number.parseFloat(Sine.easeInOut(self.progress.toFixed(2)))
                const updateYear = startYear + Number.parseInt(progress * gap)
                target.find('.abt-miles-time-inner').text(updateYear)
            }
        }
    })

    tlTxt.to(allSitesInner, {
        y: - (allSites.height() - allSitesInner.height()),
        ease: 'sine.inOut',
    })

    
    const tlImgs = gsap.timeline({
        scrollTrigger: {
            trigger: target,
            start: `top top+=${gsap.getProperty(allSites[0], 'top')}`,
            end: 'bottom bottom',
            scrub: .2,
        }
    })
    const allImgs = target.find('.abt-miles-img-inner')

    allImgs.each((idx, el) => {
        gsap.set(el, {
            position: 'relative',
            zIndex: allImgs.length - idx,
        })

        if (idx === allImgs.length - 1 ) return

        tlImgs.to(el, {
            opacity: 0,
            ease: 'sine.inOut',
            duration: 1,
        }, `${idx === 0 ? 0 : '>-.1'}`)
        .to(el, {
            scale: 1.1,
            ease: 'sine.inOut',
            duration: 1.9,
        }, "<-0.9")
    })
}


export { aboutMiles }
