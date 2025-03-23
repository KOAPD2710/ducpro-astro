import initScriptPage from './pages/barba';

const main = () => {
    console.log("Inited Page's Script! 🎉")
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
    initScriptPage()
};

export default main;
