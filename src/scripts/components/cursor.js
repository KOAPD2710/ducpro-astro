import $ from 'jquery';
import { lerp, pointer, xGetter, xSetter, yGetter, ySetter } from '@scripts/utils';
import Tempus from "tempus"

let raf;
let tempusCursor;
let target;
const lerpConst = 0.1;
const cursor = $('.cursor-translate');

const initCursor = (data) => {
    target = $(data.next.container)
    
    tempusCursor = Tempus.add(rafAnimation)
}

const rafAnimation = () => {
    const cursorCurrentPos = {
        x: xGetter(cursor[0]),
        y: yGetter(cursor[0]),
    };
    
    const targetPos = {
        x: pointer.x,
        y: pointer.y
    }
    
    xSetter(cursor[0])(lerp(cursorCurrentPos.x, targetPos.x, lerpConst))
    ySetter(cursor[0])(lerp(cursorCurrentPos.y, targetPos.y, lerpConst))
}

export default initCursor;