let startTime;

const getStartTime = () => {
    startTime = performance.now();
}

const getCurrentTime = () => {
    const endTime = performance.now();
    const initializationTime = endTime - startTime;

    return initializationTime
}

export { getCurrentTime, getStartTime }