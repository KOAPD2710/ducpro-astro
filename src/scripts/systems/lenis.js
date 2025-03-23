import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Tempus from "tempus"


gsap.registerPlugin(ScrollTrigger);

let lenis;
let tempusLenis;
let tempusUpdateGSAP;

const easing = (x) => {
    return 1 - ((1 - x) ** 4);
}

const initLenis = () => {
    lenis = new Lenis({
        duration: 1,
        easing: (t) => easing(t),
    })

    tempusLenis = Tempus.add(lenis.raf)

    gsap.ticker.remove(gsap.updateRoot)
    // lenis.on('scroll', ScrollTrigger.update)

    tempusLenis = Tempus.add((time) => {
        gsap.updateRoot(time / 1000)
    }, {
        priority: 0
    })


    // gsap.ticker.add((time) => {
    //     lenis.raf(time * 1000)
    // })
    // gsap.ticker.lagSmoothing(0)
}

const getLenis = () => {
    if (!lenis) {
        initLenis()
        return lenis
    }
    return lenis
}

export { initLenis, getLenis };