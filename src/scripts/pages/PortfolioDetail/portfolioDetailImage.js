import $ from 'jquery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


let target;
let allImages;

const offset = .3

const portfolioDetailImage = (DOM) => {
    target = $(DOM)

    allImages = target.find('.portfolioDtl-body-img__item')

    allImages.each((idx, el) => {
        const img = $(el).find('.portfolioDtl-body-img')
        gsap.set(img, {
            height: `${100 * (1 + offset)}%`,
        })

        gsap.fromTo(img, {
            y: `${-100 * (offset / (1 + offset))}%`,
        }, {
            y: '0%',
            ease: 'none',
            scrollTrigger: {
                trigger: el,
                scrub: true,
            },
        })
    })
}

export default portfolioDetailImage;