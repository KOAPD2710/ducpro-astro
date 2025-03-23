import $ from 'jquery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger)

let interval;
let target
let tlScrubFooter

const initFooter = (data) => {
    target = $(data.next.container).find('.footer');

    if (interval) {
        clearInterval(interval);
    }
    initLocalTime();

    tlScrubFooter = gsap.timeline({
        scrollTrigger: {
            trigger: target,
            end: 'bottom bottom',
            scrub: true,
        }
    })

    setTlScrubFooter()
};

const resizeFooter = () => {
    tlScrubFooter.clear()
    setTlScrubFooter()
}

const leaveFooter = () => {
    clearInterval(interval);
    tlScrubFooter.kill();
}

const setTlScrubFooter = () => {
    tlScrubFooter
    .set(target.find('.container.grid'), {
        yPercent: -80
    })
    .to(target.find('.container.grid'), {
        yPercent: 0,
        ease: 'none'
    })
}

const initLocalTime = () => {
    const timeTarget = target.find('.footer-time-inner span');

    const updateLocalTime = () => {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        const hcmcTime = now.toLocaleTimeString('en-GB', options);
        timeTarget.text(hcmcTime);
    };

    // Update immediately and set the interval
    updateLocalTime();
    interval = setInterval(updateLocalTime, 3000);
};

export { initFooter, leaveFooter, resizeFooter };