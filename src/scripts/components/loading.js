import $ from 'jquery';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { getLenis } from '@scripts/systems/lenis';
import { typeOpts } from '@scripts/utils/index';

gsap.registerPlugin(SplitText)


const loadingAnimation = async (data) => {
	const lenis = getLenis()
	lenis.stop()
	const target = $('.page-loading');
	const number = target.find('.page-loading-number');
	const splitTxt = {
		number: new SplitText(number, typeOpts.chars),
	}

	const fetchURL = `${window.location.origin}/product`;

	const tl = gsap.timeline();

	tl.set($('.page-curtain'), {
		transformOrigin: 'top',
		scaleY: 0,
	});

	let loadedAssets = 0;
	const allAssets = [...$('video, img')];
	let totalAssets = allAssets.length;


	try {
		const response = await fetch(fetchURL);
		const html = await response.text();
		const tempDiv = $('<div>').html(html);

		const allItems = tempDiv.find('.prod-list-item');
		const allImgs = allItems.find('img.img');

		const uniqueImages = (images) => {
			const checkAssets = new Set();
			return images.filter((img) => {
				const src = $(img).attr('data-src') || $(img).attr('src');
				if (checkAssets.has(src)) {
					return false;
				}
				checkAssets.add(src);
				return true;
			});
		};

		const uniqueImgs = uniqueImages(allImgs.toArray());
		allAssets.push(...uniqueImgs)
		totalAssets += uniqueImgs.length
	} catch (error) {
		console.log("Can't fetch Products")
	}

	if (totalAssets === 0) {
		const progress = '100';

		splitTxt.number.chars.forEach((el, idx) => {
			$(el).text(progress[idx])
		})
		tl
			.to(splitTxt.number.chars, {
				yPercent: -100,
				ease: 'power2.in',
				duration: 1,
				stagger: .05,
				delay: 0.2,
			})
			.to(target, {
				clipPath: 'inset(0% 0% 100%)',
				ease: 'power1.out',
				duration: .7,
				onStart: () => new Promise().resolve(),
				onComplete: () => {
					$('.page-container').removeClass('loading');
					lenis.start()
				}
			}, '>-.2');
	}

	const updateProgress = () => {
		const progress = totalAssets
			? Math.floor((loadedAssets / totalAssets) * 100)
			: 0;

		const formattedProgress = String(progress).padStart(3, '0');
		splitTxt.number.chars.forEach((el, idx) => {
			$(el).text(formattedProgress[idx])
		})
	};

	const promise = new Promise((resolve) => {
		const onLoaded = () => {
			loadedAssets += 1;

			updateProgress();

			if (loadedAssets === totalAssets) {
				tl
					.to(splitTxt.number.chars, {
						yPercent: -100,
						ease: 'power2.in',
						duration: 1,
						stagger: .05,
						delay: 0.2,
					})
					.to(target, {
						clipPath: 'inset(0% 0% 100%)',
						ease: 'power1.out',
						duration: .7,
						onStart: () => resolve(),
						onComplete: () => {
							$('.page-container').removeClass('loading');
							lenis.start()
						}
					}, '>-.2');
			}
		};

		const onError = () => {
			totalAssets -= 1;
		}

		$(allAssets).each((__, el) => {
			const asset = $(el);

			if (asset.is('video')) {
				const source = asset.find('source');
				const src = source.attr('data-src') || source.attr('src');
				asset[0].load();
				source.attr('src', src);
				asset.on('canplaythrough', onLoaded).on('error', onLoaded);
			} else {
				const src = asset.attr('data-src') || asset.attr('src');
				asset.removeAttr('loading');
				// const newSrc = src.split('.abc')[0]
				// console.log(newSrc)
				asset.attr('src', src);
				asset.on('load', onLoaded).on('error', onError);
			}
		});
	});

	return promise;
};


export default loadingAnimation