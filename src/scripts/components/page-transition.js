import $ from 'jquery';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '@scripts/systems/lenis';
import { typeOpts } from '@scripts/utils/index';

gsap.registerPlugin(ScrollTrigger, SplitText)

const pageTransitionTimeline = async (data) => {

	const lenis = getLenis();
	let startTime;

	const timeline = gsap.timeline({
		onStart: () => {
			startTime = performance.now();
		},
		onComplete: () => {
			lenis.scrollTo(0, {
				force: true,
				immediate: true
			})
			lenis.start();
			gsap.set(data.next.container, { clearProps: true });

			console.log(`Page transition took ${((performance.now() - startTime) / 1000).toFixed(3)} seconds`);
		}
	});

	timeline
		.set(data.current.container, {
			// default props
			// transformOrigin: 'top'
		})
		.set(data.next.container, {
			// default props
			position: 'fixed',
			top: 0,
			zIndex: 2,
			height: '100svh',
			overflow: 'hidden',

			// set default state
			clipPath: 'inset(100% 0% 0%)',
		})
		.set($(data.next.container).find('.page-curtain'), {
			scaleY: 1,
			transformOrigin: 'top',
		})

	timeline
		.to(data.current.container, {
			filter: 'blur(.8rem)',
			duration: .9,
			ease: 'power1.in'
		}, .1)
		.to(data.current.container, {
			transformOrigin: `center ${lenis.targetScroll}px`,
			scale: .9,
			duration: 1,
			ease: 'sine.out'
		}, .1)
		.to(data.current.container, {
			opacity: .5,
			y: -200,
			duration: 1,
			ease: 'power1.out'
		}, .1)
		.to(data.next.container, {
			clipPath: 'inset(0% 0% 0%)',
			ease: 'power1.inOut',
			duration: .6
		}, .2)
		.to($(data.next.container).find('.page-curtain'), {
			scaleY: 0,
			ease: 'power1.out',
			duration: .7
		}, .5)

	return timeline;
};

export default pageTransitionTimeline