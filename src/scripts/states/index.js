let isFirstLoad = true;
const delayTl = .6;

const setIsFirstLoad = (state) => {
    isFirstLoad = state
}

export {
    isFirstLoad,
    setIsFirstLoad,
    delayTl
}