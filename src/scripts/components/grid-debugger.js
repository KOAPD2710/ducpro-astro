import $ from 'jquery';

const initGridDebugger = () => {
    const gridDebugger = $(document).find('.grid-debug');

    const updateGridVisibilityUI = (isVisible) => {
        if (isVisible) {
            gridDebugger.addClass('active')
        } else {
            gridDebugger.removeClass('active')
        }
    };
    let isGridVisible = localStorage.getItem("isGridShow") === 'true';
    updateGridVisibilityUI(isGridVisible);

    const toggleGridVisibility = () => {
        isGridVisible = !isGridVisible;
        localStorage.setItem("isGridShow", isGridVisible);
        updateGridVisibilityUI(isGridVisible);
    };

    const handleKeyDown = (event) => {
        if (event.shiftKey && event.key === 'G') {
            toggleGridVisibility();
        }
    };

    $(window).on('keydown', handleKeyDown);

    $(window).on('unload', () => {
        $(window).off('keydown', handleKeyDown);
    });
};

export default initGridDebugger;