import $ from 'jquery';
import gsap from 'gsap';


const lerp = (a, b, t = 0.08) => {
    return a + (b - a) * t;
}

const parseRem = (input) => {
    return input / 10 * Number.parseFloat($('html').css('font-size'));
}

const xSetter = (el) => gsap.quickSetter(el, 'x', 'px');
const xGetter = (el) => gsap.getProperty(el, 'x');

const ySetter = (el) => gsap.quickSetter(el, 'y', 'px');
const yGetter = (el) => gsap.getProperty(el, 'y');

const rotSetter = (el) => gsap.quickSetter(el, 'rotate', 'deg');
const rotGetter = (el) => gsap.getProperty(el, 'rotate');

const rotXSetter = (el) => gsap.quickSetter(el, 'rotateX', 'deg');
const rotXGetter = (el) => gsap.getProperty(el, 'rotateX');

const rotYSetter = (el) => gsap.quickSetter(el, 'rotateY', 'deg');
const rotYGetter = (el) => gsap.getProperty(el, 'rotateY');

const scaleXSetter = (el) => gsap.quickSetter(el, 'scaleX');
const scaleXGetter = (el) => gsap.getProperty(el, 'scaleX');

const scaleYSetter = (el) => gsap.quickSetter(el, 'scaleY');
const scaleYGetter = (el) => gsap.getProperty(el, 'scaleY');


const typeOpts = {
    lines: { type: 'lines', linesClass: 'split-line' },
    words: { type: 'words,lines', linesClass: 'split-line', wordsClass: "split-word" },
    chars: { type: 'chars,words,lines', linesClass: 'split-line', wordsClass: "split-word", charsClass: "split-char" }
};

const pointer = { x: $(window).width() / 2, y: $(window).height() / 2 };

$(window).on('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
});

const inView = (el) => {
    if (0 <= el.getBoundingClientRect().bottom && el.getBoundingClientRect().top <= $(window).height()) {
        return true
    }
}

function debounce(func, delay = 100) {
    let timer;
    return (event) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, delay, event);
    };
}

const easingUtil = {
    sine: {
        in: (x) => 1 - Math.cos((x * Math.PI) / 2),
        out: (x) => Math.sin((x * Math.PI) / 2),
        inOut: (x) => -(Math.cos(Math.PI * x) - 1) / 2
    },
    cubic: {
        in: (x) => x ** 3,
        out: (x) => 1 - (1 - x) ** 3,
        inOut: (x) => x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2
    },
    quint: {
        in: (x) => x ** 5,
        out: (x) => 1 - (1 - x) ** 5,
        inOut: (x) => x < 0.5 ? 16 * x ** 5 : 1 - (-2 * x + 2) ** 5 / 2
    }
}

export {
    lerp,
    parseRem,
    xSetter,
    ySetter,
    xGetter,
    yGetter,
    rotSetter,
    rotGetter,
    rotXSetter,
    rotXGetter,
    rotYSetter,
    rotYGetter,
    scaleXSetter,
    scaleXGetter,
    scaleYSetter,
    scaleYGetter,
    typeOpts,
    pointer,
    debounce,
    inView,
    easingUtil
}