import $ from 'jquery';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import InertiaPlugin from 'gsap/InertiaPlugin';
import { typeOpts } from '@/scripts/utils';
import { delayTl } from '@scripts/states';
import { debounce } from '@/scripts/utils/index';

gsap.registerPlugin(ScrollTrigger, SplitText, InertiaPlugin, Draggable);

let target;
let url;
let searchParams;
let brandState;
let draggabled;
let allProductFilter;
let allLabels;
let brandContainer;
let brandSlider;
let brandItems;

const checkURLForFilter = () => {
    url = new URL(window.location.href)
    searchParams = new URLSearchParams(window.location.search)
    if (!searchParams.has('brand')) return

    const brandInURL = searchParams.getAll('brand') 
    brandState = brandInURL[0]
}

const setBrandForEnter = (DOM) => {
    const brandItems = DOM.find('.prod-filter-brand-item');
    const allProductFilter = DOM.find('#product_filter_martin, #product_filter_optimal')

    if (brandState) {
        const brandTarget = brandItems.filter((idx, el) => $(el).data('filter') === brandState)

        if (brandTarget.length !== 0) {
            const index = brandTarget.index()
            
            const brandContainer = DOM.find('.prod-filter-brand');
            const brandSlider = brandContainer.find('.prod-filter-brand-inner');
            
            brandTarget.addClass('active')
            gsap.set(brandSlider, {
                x: brandContainer.width() * -1 * index,
            });
    
            const targetForm = allProductFilter.filter((idx, el) => $(el).data('filter') === brandState)
    
            allProductFilter.each((idx, el) => el.reset());
    
            allProductFilter.removeClass('isHide').filter((idx, el) => !$(el).is(targetForm)).addClass('isHide');
            
            targetForm.find('label')[0].click()
        } else {
            brandItems.eq(0).addClass('active')

            const targetForm = allProductFilter.eq(0)
            allProductFilter.each((idx, el) => el.reset());
            allProductFilter.removeClass('isHide').filter((idx, el) => !$(el).is(targetForm)).addClass('isHide');
            targetForm.find('label')[0].click()
        }
    } else {
        const targetForm = allProductFilter.eq(0)

        allProductFilter.each((idx, el) => el.reset());

        allProductFilter.removeClass('isHide').filter((idx, el) => !$(el).is(targetForm)).addClass('isHide');
        
        brandItems.eq(0).addClass('active')
        targetForm.find('label')[0].click()
    }
}

const updateURL = {
    brand: (filter) => {
        if (searchParams.get('brand') === filter) return
        searchParams.set('brand', filter)

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState({ path: newUrl }, '', newUrl);
    },
    filter: (target) => {
        if (target.includes('all')) {
            searchParams.delete('filter')
        } else {
            // const URI = encodeURI(target)
            searchParams.set('filter', target)
        }
        
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState({ path: newUrl }, '', newUrl);
    }
}

const productFilter = (DOM) => {
    target = $(DOM);

    allProductFilter = target.find('#product_filter_martin, #product_filter_optimal')

    brandContainer = target.find('.prod-filter-brand');
    brandSlider = brandContainer.find('.prod-filter-brand-inner');
    brandItems = target.find('.prod-filter-brand-item');


    const snapPos = []

    brandItems.each((idx, el) => {
        const pos = idx === 0 ? 0 : ($(el).offset().left - brandSlider.offset().left) * - 1
        snapPos.push(pos)
    })

    const updateFilterWhenSpam = () => {
        const index = Math.round(-draggabled[0].x / brandContainer.width());

        brandItems.removeClass('active').eq(index).addClass('active');
        updateURL.brand(brandItems.eq(index).data('filter'));
        const currentFilter = brandItems.eq(index).data('filter')
        resetFilter(currentFilter)
    }

    draggabled = Draggable.create(brandSlider, {
        bounds: {
            minX: snapPos[snapPos.length - 1],
            maxX: 0
        },
        edgeResistance: 0.7,
        overshootTolerance: 0.1,
        snap: snapPos,
        type: 'x',
        maxDuration: 1,
        inertia: true,
        applyBounds: true,
        onThrowUpdate: updateFilterWhenSpam,
        onDrag: updateFilterWhenSpam,
        onThrowComplete: updateFilterWhenSpam
    });


    brandItems.on('click', (e) => {
        e.preventDefault();
        
        const target = $(e.currentTarget);
        const index = target.index();
        
        gsap.to(brandSlider, {
            x: draggabled[0].vars.snap[index],
            ease: 'power2.out',
            duration: .8
        });

        brandItems.removeClass('active').eq(index).addClass('active')
        resetFilter(target.data('filter'))

        updateURL.brand($(e.currentTarget).data('filter'))
    });

    allLabels = target.find('label.prod-filter-form_label')

    allLabels.on('click', debounce((e) => {
        allLabels.removeClass('active')
        $(e.currentTarget).addClass('active')

        const targetFilter = $(e.currentTarget).find('input').val()

        updateURL.filter(targetFilter)
    }, 200))
};

const resizeProductFilter = () => {

}

const leaveProductFilter = () => {
    brandState = null

    draggabled[0].kill()
}

const resetFilter = (filter) => {
    const targetForm = allProductFilter.filter((idx, el) => $(el).data('filter') === filter)

    allProductFilter.each((idx, el) => el.reset());

    allProductFilter.removeClass('isHide').filter((idx, el) => !$(el).is(targetForm)).addClass('isHide');
    
    // Trigger first label
    targetForm.find('label')[0].click()
}



const onEnterProductFilter = (DOM) => {
    const target = $(DOM)

    const splitTxt = {
        title: new SplitText(target.find('.prod-filter-brand-item-txt'), typeOpts.chars),
    }

    gsap.set(splitTxt.title.chars, {
        yPercent: 100
    })

    const tl = gsap.timeline({
        onComplete: () => {
            splitTxt.title.revert()
        },
        delay: delayTl
    })

    tl
        .to(splitTxt.title.chars, {
            yPercent: 0,
            stagger: .01,
            duration: .6,
            ease: 'power1.out'
        }, .2)

    setBrandForEnter(target)
}

const onFirstLoadPorfolioFilter = (DOM) => {
    const target = $(DOM)

    const splitTxt = {
        title: new SplitText(target.find('.prod-filter-brand-item-txt'), typeOpts.chars),
    }

    gsap.set(splitTxt.title.chars, {
        yPercent: 100
    })

    const tl = gsap.timeline({
        onComplete: () => {
            splitTxt.title.revert()
        }
    })

    tl
        .to(splitTxt.title.chars, {
            yPercent: 0,
            stagger: .01,
            duration: .6,
            ease: 'power1.out'
        }, .2)

    setBrandForEnter(target)
}


export { productFilter, onEnterProductFilter, onFirstLoadPorfolioFilter, resizeProductFilter, leaveProductFilter, checkURLForFilter }