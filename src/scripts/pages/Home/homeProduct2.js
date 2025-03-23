import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

let target;
let accordion;
let accordionImg;

const homeProduct2 = (DOM) => {
    target = $(DOM);

    accordion = target.find('.home-prod2-main-accor-item')
    accordionImg = target.find('.home-prod2-main-img-inner')

    accordion.eq(0).addClass('active')
    accordion.find('.home-prod2-main-accor-item_body').eq(0).slideDown()
    accordionImg.eq(0).addClass('active')

    accordion.find('.home-prod2-main-accor-item_head').on('click', handleClick)
}

const resizeHomeProduct2 = () => {

}

const leaveHomeProduct2 = () => {
    accordion.find('.home-prod2-main-accor-item_head').off('click', handleClick)
}



const handleClick = ({ currentTarget }) => {
    if (!$(currentTarget).parent(accordion).hasClass('active')) {
        const index = $(currentTarget).parent(accordion).index()
        accordion.removeClass('active').eq(index).addClass('active')
        accordion.find('.home-prod2-main-accor-item_body').slideUp().eq(index).slideDown()
        accordionImg.removeClass('active').eq(index).addClass('active')
    } else {
        accordion.removeClass('active')
        accordion.find('.home-prod2-main-accor-item_body').slideUp()
        // accordionImg.removeClass('active')
    }
}

export { homeProduct2, resizeHomeProduct2, leaveHomeProduct2 }