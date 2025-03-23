import $ from 'jquery';

let target
let allFilter
let allProduct

const productFunc = (DOM) => {
    target = $(DOM)

    allFilter = target.find('#product_filter_martin, #product_filter_optimal')

    allFilter.on('change', 'input[type="checkbox"], input[type="radio"]', (e) => {
        const targetFilter = $(e.currentTarget).val();
        console.log(`Filter changed to: ${targetFilter}`);
    });

    allProduct = target.find('.prod-list-item')
}


export { productFunc }