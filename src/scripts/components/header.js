import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getTlHeaderMarquee, resizeHeaderMarquee } from './header_partnership';
import barba from '@barba/core';

gsap.registerPlugin(ScrollTrigger);

let isOnTop = false;
let isSetClickNavItem = false
let isSetClickMenu = false

const header = $('.header')
const headerNav = header.find('[data-header=navi]')
const headerNavItems = header.find('[data-header=navi_item]')
const headerSub = header.find('[data-header=navi_sub]');
const subProduct = header.find('[data-header=navi_sub_product]')
const subPartnership = header.find('[data-header=navi_sub_partnership]')
const subProductItems = header.find('[data-header=navi_sub_item]')
const headerMenuBtn = header.find('[data-header=menu_btn]')
const subMenuProduct = header.find('[data-header=navi_menu_sub]')
const subMenuProductLink = header.find('[data-header=navi_menu_sub_link]')


const initHeader = (data) => {

    const nextDOM = $(data.next.container)
    const firstSc = nextDOM.find('section').eq(0)

    getTlHeaderMarquee()

    !isSetClickNavItem && handleClickNavItem()

    !isSetClickMenu && initClickMenu()

    // ScrollTrigger for open subheader in top
    const sct = ScrollTrigger.create({
        trigger: firstSc,
        start: 'top-=50px top',
        end: `top+=${$(window).innerHeight()/2} top`,
        onEnter: () => {
            isOnTop = true
            handleHeaderSub.openHeaderSub()
        },
        onEnterBack: () => {
            isOnTop = true
            !headerSub.is(':hover') && handleHeaderSub.openHeaderSub()
        },
        onLeave: () => {
            isOnTop = false
            handleHeaderSub.closeHeaderSub()
        },
        onLeaveBack: () => {
            isOnTop = false
            handleHeaderSub.closeHeaderSub()
        },
    })
}

const resizeHeader = () => {
    resizeHeaderMarquee()
}

const handleClickNavItem = () => {
    isSetClickNavItem = true

    headerNavItems.each((idx, el) => {
        $(el).find('[data-header=navi_link]').on('click', (e) => {
            e.preventDefault()
            const url = $(el).find('[data-header=navi_link]').attr('href')

            if (window.innerWidth > 991) {
                barba.go(url)
            } else {
                const isSub = $(el).hasClass('sub')

                if (isSub) {
                    const isOpenSub = $(el).hasClass('isOpenSub')
                    if (!isOpenSub) {
                        handleToggleMenuSub.open()
                    } else {
                        handleToggleMenuSub.close()
                    }

                } else {
                    barba.go(url)

                    handleToggleMenu.close()
                    handleToggleMenuSub.close()
                }
            }
        })
    })
}

const initActiveLinkHeader = () => {
    headerNavItems.removeClass('active').filter((idx, el) => {
        const url = $(el).find('[data-header=navi_link]').attr('href');
        const path = window.location.pathname;
    
        return path.includes(url);
    }).addClass('active');

    subProductItems.removeClass('active').filter((idx, el) => {
        const urlSplit = $(el).attr('href').split('?');

        const windowLocation = location

        return windowLocation.pathname.includes(urlSplit[0]) && windowLocation.search.includes(urlSplit[1]);
    }).addClass('active');

    subMenuProductLink.removeClass('active').filter((idx, el) => {
        const urlSplit = $(el).attr('href').split('?');

        const windowLocation = location

        return windowLocation.pathname.includes(urlSplit[0]) && windowLocation.search.includes(urlSplit[1]);
    }).addClass('active');
}

const handleHeaderSub = {
    openHeaderSub: () => {
        gsap.to(headerSub, {
            onStart: () => {
                getTlHeaderMarquee().play()
            },
            height: 'auto',
            duration: .3,
            ease: 'sine.inOut',
            overwrite: true
        })
    },
    closeHeaderSub: () => {
        gsap.to(headerSub, {
            onComplete: () => {
                getTlHeaderMarquee().pause()
            },
            height: 0,
            duration: .3,
            ease: 'sine.out',
            overwrite: true
        })
    },
}

const initSubHeader = () => {
    const sub = headerNavItems.filter('.sub')

    sub.on('pointerenter', () => {
        handleHeaderSub.openHeaderSub()
        handleToggleSub.openSub()
    })

    sub.on('pointerleave', () => {
        if (!isOnTop && !headerSub.is(':hover')) handleHeaderSub.closeHeaderSub()

        if (!headerSub.is(':hover')) {
            handleToggleSub.closeSub()
        }
    })

    headerSub.on('pointerleave', () => {
        if (!isOnTop && !headerSub.is(':hover')) handleHeaderSub.closeHeaderSub()

        handleToggleSub.closeSub()
    })
}

const handleToggleSub = {
    openSub: () => {
        gsap.to(subProduct, {
            y: '0%',
            duration: .3,
            ease: 'sine.inOut',
            overwrite: true
        })

        gsap.to(subPartnership, {
            onComplete: () => {
                getTlHeaderMarquee().pause()
            },
            y: '100%',
            duration: .3,
            ease: 'sine.inOut',
            overwrite: true
        })
    },
    closeSub: () => {
        gsap.to(subProduct, {
            y: '-100%',
            ease: 'sine.out',
            duration: .3,
            overwrite: true
        })

        gsap.to(subPartnership, {
            onStart: () => {
                getTlHeaderMarquee().play()
            },
            y: '-100%',
            ease: 'sine.out',
            duration: .3,
            overwrite: true
        })
    }
}

const initClickMenu = () => {
    isSetClickMenu = true

    headerMenuBtn.on('click', () => {
        if (headerNav.hasClass('isOpenMenu')) {
            handleToggleMenu.close()
        } else {
            handleToggleMenu.open()
        }
    })

    subMenuProductLink.on('click', () => {
        handleToggleMenu.close()

        handleToggleMenuSub.close()
    })
}

const handleToggleMenuSub = {
    open: () => {
        headerNavItems.filter('.sub').addClass('isOpenSub')

        gsap.to(subMenuProduct, {
            height: 'auto',
            duration: .3,
            ease: 'sine.inOut',
            overwrite: true,
        })
    },
    close: () => {
        headerNavItems.filter('.sub').removeClass('isOpenSub')

        gsap.to(subMenuProduct, {
            height: 0,
            duration: .3,
            ease: 'sine.out',
            overwrite: true,
        })
    }
}

const handleToggleMenu = {
    open: () => {
        headerNav.addClass('isOpenMenu')

        gsap.to(headerNav, {
            width: 'auto',
            height: 'auto',
            ease: 'power3.out',
            duration: .3 + headerNavItems.length * .03 + .05,
            overwrite: true,
        })

        gsap.to(headerNavItems, {
            opacity: 1,
            x: 0,
            ease: 'power1.out',
            stagger: .05,
            duration: .3,
            overwrite: true,
            delay: .05
        })

    },
    close: () => {
        headerNav.removeClass('isOpenMenu')

        gsap.to(headerNav, {
            width: 0,
            height: 0,
            ease: 'power2.in',
            duration: .4 + headerNavItems.length * .01,
            overwrite: true,
        })

        gsap.to(headerNavItems, {
            opacity: 0,
            x: '2rem',
            ease: 'sine.inOut',
            stagger: .03,
            duration: .3,
            overwrite: true,
        })
    }
}

export { initHeader, resizeHeader, initSubHeader, initActiveLinkHeader };