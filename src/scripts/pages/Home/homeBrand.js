import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

let target;
const logoTimeline = [];
let currentzIndex = 0;

const homeBrand = (DOM) => {
    target = $(DOM);

    const logoContainer = target.find('.home-brand-logo');
    const logo = target.find('.home-brand-logo-item');
    const itemList = target.find('.home-brand-list');
    const items = itemList.find('.home-brand-list-item');
    currentzIndex = logo.length;

    logo.each((idx, el) => {
        // const topPos = (logoContainer.height() - $(el).height()) / 3 * (idx % 4);
        const topPos = (logoContainer.height() - $(el).height()) * (idx / (logo.length - 1));
        const defaulProp = $(el).width()

        gsap.set(el, {
            top: topPos,
            width: 0,
        });

        const tl = gsap.timeline({
            paused: true,
        })


        tl.fromTo(el, {
            width: 0,
        }, {
            width: defaulProp,
            duration: .4,
            ease: 'power4.out',
        })

        logoTimeline.push(tl)
    })

    items.on('mouseenter', ({ currentTarget }) => {
        const index = $(currentTarget).index();

        currentzIndex += 1;

        logoTimeline.forEach((tl, idx) => {
            if (idx === index) {
                tl.timeScale(1).play()
                gsap.set(logo[index], {
                    zIndex: currentzIndex,
                })
            } else {
                tl.timeScale(.5).reverse()
            }
        });
    })

    itemList.on('mouseleave', () => {
        logoTimeline.forEach((tl, idx) => {
            tl.timeScale(.5).reverse()
        })
    })
}


const leaveHomeBrand = () => {
    logoTimeline.forEach((tl, idx) => {
        tl.clear()
        logoTimeline.splice(0)
    })

    currentzIndex = 0;
}



export { homeBrand, leaveHomeBrand }