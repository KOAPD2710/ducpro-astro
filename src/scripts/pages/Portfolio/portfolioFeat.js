import $ from 'jquery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lerp, parseRem, pointer, xGetter, xSetter, yGetter, ySetter } from '../../utils';
import Tempus from "tempus"

gsap.registerPlugin(ScrollTrigger);

let target;
let allItemsList;
let allItems;
let imageDOM;
let imageTranslate;
let imageTranslateClone;
let imageItems;
let tempusPortfolioFeat

const lerpConst = 0.15;


const portfolioFeat = (DOM) => {
    target = $(DOM)

    allItemsList = target.find('.port-feat-list')
    allItems = target.find('.port-feat-item')
    imageDOM = target.find('.port-feat-img')
    imageTranslate = imageDOM.find('.port-feat-img-translate')
    imageItems = imageDOM.find('.port-feat-img-item')

    imageTranslateClone = imageTranslate.clone()
    imageTranslateClone.addClass('clone')
    imageDOM.append(imageTranslateClone)

    enterEvent()
    tempusPortfolioFeat = Tempus.add(rafAnimation)
}

const resizePortfolioFeat = () => {

}

const leavePortfolioFeat = () => {
    tempusPortfolioFeat()
    allItems.off('mouseenter')
    allItemsList.off('mouseleave')
}

const enterEvent = () => {
    allItems.on('mouseenter', ({ currentTarget }) => {
        const index = $(currentTarget).index()

        const cloner = $(imageItems[index]).clone().addClass('clone')
        const cloner2 = $(imageItems[index]).clone().addClass('clone')
        
        imageTranslate.append(cloner)
        imageTranslateClone.append(cloner2)

        gsap.set([cloner, cloner2], {
            clipPath: 'inset(100% 0% 0%)'
        })

        gsap.set([cloner.find('img'), cloner2.find('img')], {
            yPercent: 50,
            scale: 1.5
        })

        const tl = gsap.timeline({
            onComplete: () => {
                if (cloner.prev().hasClass('clone')) cloner.prev().remove()
                if (cloner2.prev().hasClass('clone')) cloner2.prev().remove()
            },
        })

        const easing = "power4.out";
        const duration = .8;

        tl.to([cloner, cloner2], {
            clipPath: 'inset(0% 0% 0%)',
            duration: duration,
            ease: easing,
        }, 0).to([cloner.find('img'), cloner2.find('img')], {
            yPercent: 0,
            scale: 1,
            duration: duration,
            ease: easing,
        }, 0)
        if (cloner.prev().hasClass('clone')) {
            tl.to([cloner.prev(), cloner2.prev()], {
                clipPath: 'inset(0% 0% 100%)',
                duration: duration,
                ease: easing,
            }, 0).to([cloner.prev().find('img'), cloner2.prev().find('img')], {
                yPercent: -50,
                scale: 1.1,
                duration: duration,
                ease: easing,
            }, 0)
        }
    })

    allItemsList.on('mouseleave', () => {
        const imgs = imageTranslate.find('.port-feat-img-item.clone')
        const imgsClone = imageTranslateClone.find('.port-feat-img-item.clone')

        if (imgs) {
            const tl = gsap.timeline({
                onComplete: () => {
                    imgs.remove()
                    imgsClone.remove()
                }
            })

            tl.to([imgs, imgsClone], {
                clipPath: 'inset(0% 0% 100%)',
                duration: .6,
                ease: 'power1.out',
            }, 0).to([imgs.find('img'), imgsClone.find('img')], {
                yPercent: -50,
                scale: 1.1,
                duration: .6,
                ease: 'power1.out',
            }, 0)
        }
    })
}


const rafAnimation = () => {
    if (ScrollTrigger.isInViewport(target[0])) {
        const currentPos = {
            x: xGetter(imageTranslate[0]),
            y: yGetter(imageTranslate[0]),
        };
    
        const targetPos = {
            x: pointer.x - imageTranslate.innerWidth() / 2 + parseRem(300),
            y: pointer.y - imageTranslate.innerHeight() / 2 - imageDOM[0].getBoundingClientRect().top
        }
    
        xSetter(imageTranslate[0])(lerp(currentPos.x, targetPos.x, lerpConst))
        ySetter(imageTranslate[0])(lerp(currentPos.y, targetPos.y, lerpConst))
    
        xSetter(imageTranslateClone[0])(lerp(currentPos.x, targetPos.x, lerpConst / 4))
        ySetter(imageTranslateClone[0])(lerp(currentPos.y, targetPos.y, lerpConst / 4))
    }
}

export { portfolioFeat, resizePortfolioFeat, leavePortfolioFeat }