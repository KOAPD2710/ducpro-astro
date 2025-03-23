import $ from 'jquery';
import gsap from 'gsap';


let target;
let accordion;

const productDetailAccordion = (DOM) => {
    target = $(DOM);

    accordion = DOM.find('.prodDtl-body-spec_content__item')



    accordion.each((idx, item) => {
        const head = $(item).find('.prodDtl-body-spec_content__item__head')

        head.on('click', handleClick)
    })
    
    // console.log(allAccordions)
}

const handleClick = ({ currentTarget }) => {
    if (!$(currentTarget).parent(accordion).hasClass('active')) {
        const index = $(currentTarget).parent(accordion).index()
        accordion.removeClass('active').eq(index).addClass('active')
        accordion.find('.prodDtl-body-spec_content__item__body').slideUp().eq(index).slideDown()
    } else {
        accordion.removeClass('active')
        accordion.find('.prodDtl-body-spec_content__item__body').slideUp()
    }

}



export { productDetailAccordion }