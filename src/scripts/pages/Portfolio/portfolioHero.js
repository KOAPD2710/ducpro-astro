import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { delayTl } from '@scripts/states';
import { pointer, typeOpts } from '@scripts/utils';

gsap.registerPlugin(ScrollTrigger, SplitText)

let target;
let title;
let titleContainer;
let allImgs;
let currZIdx;
const shiftDis = 40;
let currDis = 0;
let currIndexImg = 0;
let debounceFirstError = true;

let lastPos = {
	x: pointer.x, y: pointer.y
};


const portfolioHero = (DOM) => {
	target = $(DOM);

	title = target.find('.port-hero-title');
	titleContainer = title.parent('.container.grid')
	allImgs = target.find('.port-hero-imgTrain-item')
	currZIdx = allImgs.length;

	titleContainer.on('mousemove', animation.onMove)
	titleContainer.on('mouseleave', animation.onLeave)
}
const resizePortfolioHero = () => {

}

const leavePortfolioHero = () => {

}

const onEnterPortfolioHero = (DOM) => {
	const spiltTxt = {
		title: new SplitText($(DOM).find('.port-hero-title'), typeOpts.words)
	}

	gsap.set(spiltTxt.title.words, {
        yPercent: 100
    })

	const tl = gsap.timeline({
        onComplete: () => {
            spiltTxt.title.revert()
        },
        delay: delayTl
    })

	tl.to(spiltTxt.title.words, {
        yPercent: 0,
        stagger: .03,
        duration: .6,
        ease: 'power1.out'
    }, 0)
}

const onFirstLoadPortfolioHero = (DOM) => {
	const spiltTxt = {
		title: new SplitText($(DOM).find('.port-hero-title'), typeOpts.words)
	}

	gsap.set(spiltTxt.title.words, {
        yPercent: 100
    })

	const tl = gsap.timeline({
        onComplete: () => {
            spiltTxt.title.revert()
        },
    })

	tl.to(spiltTxt.title.words, {
        yPercent: 0,
        stagger: .03,
        duration: .6,
        ease: 'power1.out'
    }, 0)
}

const animation = {
	onMove: () => {
		const delta = {
			x: pointer.x - lastPos.x,
			y: pointer.y - lastPos.y
		};

		lastPos = {
			x: pointer.x,
			y: pointer.y
		}

		if (debounceFirstError) {
			debounceFirstError = false
			return
		}

		currDis += Math.sqrt((delta.x ** 2) + (delta.y ** 2)) / 2;

		if (currDis > shiftDis) {
			const positionX = pointer.x - delta.x * 2;
			const positionY = pointer.y - delta.y * 2 + $(window).scrollTop();
			const rotation = (Math.atan2(delta.x, delta.y) * 180) / Math.PI;
			// const rotation = delta.x

			gsap.set(allImgs[currIndexImg], {
				scale: .6,
				zIndex: currZIdx,
				rotate: rotation % 45 % 15,
				opacity: 1,
				x: positionX - allImgs.eq(0).width() / 2,
				y: positionY - allImgs.eq(0).height() / 2,
				clipPath: 'circle(0%)',
				overwrite: true
			})
			const tl = gsap.timeline();

			tl
				.to(allImgs[currIndexImg], {
					clipPath: 'circle(100%)',
					duration: .4,
					ease: 'sine.out',
				}, 0)
				.to(allImgs[currIndexImg], {
					x: `+=${delta.x * 4}`,
					y: `+=${delta.y * 4}`,
					duration: 2,
					ease: 'none',
				}, 0)
				.to(allImgs[currIndexImg], {
					rotation: `+=${rotation % 20}`,
					duration: 2,
					ease: 'none',
				}, 0)
				.to(allImgs[currIndexImg], {
					scale: 1,
					duration: .6,
					ease: 'sine.out',
				}, 0)
				.to(allImgs[currIndexImg], {
					opacity: 0,
					duration: 1,
					ease: 'sine.in',
				}, '>')
				.to(allImgs[currIndexImg], {
					scale: .8,
					duration: 1,
					ease: 'sine.in',
				}, '<')



			currDis = currDis % shiftDis
			currZIdx += 1

			if (currIndexImg === allImgs.length - 1) {
				currIndexImg = 0
			} else {
				currIndexImg += 1
			}
		}
	},
	onLeave: () => {
		debounceFirstError = true
	}
}


export { portfolioHero, resizePortfolioHero, onEnterPortfolioHero, leavePortfolioHero, onFirstLoadPortfolioHero }