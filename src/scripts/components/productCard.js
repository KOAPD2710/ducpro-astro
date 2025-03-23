import $ from 'jquery';
import Tempus from "tempus"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pointer } from '../utils/index';
import barba from '@barba/core';


let target;
let tempusProductCard;
let productCardItem 

gsap.registerPlugin(ScrollTrigger);

const productCard = (DOM) => {
    target = $(DOM)

    tempusProductCard = Tempus.add(handleProductCard)

    productCardItem = target.find('[data-product=item]')

    productCardItem.on('click', (e) =>  {
        e.preventDefault()
        if ($(e.target).is('[data-product=data]')) {
            // Clicked to Datasheet
            
        } else {
            // Clicked item
            const url = $(e.currentTarget).attr('href')
            barba.go(url)
        }
    })
}

const leaveProductCard = () => {
    tempusProductCard()
}

const handleProductCard = () => {
    const allProductCard = target.find('[data-product=item]')

    allProductCard.each((innerIdx, innerCard) => {
        const isInview = ScrollTrigger.isInViewport(innerCard)
        if (!isInview) return

        // const isHover = $(card).is(':hover');
        // if (!isHover) return
        
        const translateWrapper = $(innerCard).find('[data-product=translate_wrapper]')
        const translateItem = $(innerCard).find('[data-product=translate]')
        
        const boudingTranslateWrapper = translateWrapper.get(0).getBoundingClientRect()
        const boudingTranslateItem = translateItem.get(0).getBoundingClientRect()

        const offsetY = pointer.y - boudingTranslateWrapper.top - boudingTranslateItem.height / 2;
        const maxOffsetY = boudingTranslateWrapper.height - boudingTranslateItem.height;
        const yValue = Math.max(Math.min(offsetY, maxOffsetY), 0);

        // GSAP.to Normal
        // gsap.to(translateItem, {
        //     y: yValue,
        //     duration: 0.3,
        //     ease: 'power2.out',
        //     overwrite: true
        // })

        // Try to use QuickTo instead of GSAP.to
        if (!translateItem.data('quickToY')) {
            translateItem.data('quickToY', gsap.quickTo(translateItem.get(0), 'y', {
                duration: 0.2,
                ease: 'power3.out',
                overwrite: true
            }));
        }
        translateItem.data('quickToY')(yValue);
    })
}

export { productCard, leaveProductCard };