import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const killScrolltrigger = () => {
    ScrollTrigger.getAll().forEach((trigger, idx) => {
        if (trigger.id !== 'globalAnimation') {
            trigger.kill();
        }
    });
}

const updateScrolltrigger = () => {
    ScrollTrigger.getAll().forEach((trigger, idx) => {
        if (trigger.id !== 'globalAnimation') {
            trigger.refresh();
            trigger.update();
        }
    });
}

export { killScrolltrigger, updateScrolltrigger };