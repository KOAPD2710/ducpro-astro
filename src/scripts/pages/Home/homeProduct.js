import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

let target;

const homeProduct = (DOM) => {
    target = $(DOM);

    const allTargetHover = target.find('.home-prod-name-inner')
    const allTargetImg = target.find('.home-prod-profile-img-inner')
    const allTargetName = target.find('.home-prod-profile-fullname-inner')
    const allTargetFeature = target.find('.home-prod-profile-feature-inner')


    allTargetHover.on('pointerenter', function(e) {
        const index = $(this).index();

        allTargetImg.removeClass('active').eq(index).addClass('active')
        allTargetName.removeClass('active').eq(index).addClass('active')
        allTargetFeature.removeClass('active').eq(index).addClass('active')
    })

    allTargetHover.on('pointerleave', () => {
        allTargetImg.removeClass('active')
        allTargetName.removeClass('active')
        allTargetFeature.removeClass('active')
    })
}

const resizeHomeProduct = () => {

}

export { homeProduct, resizeHomeProduct };