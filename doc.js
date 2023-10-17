const backToTop = () => {

    try {

        if (document.querySelector('[data-js-back]')) {

            document.querySelector('[data-js-back]').addEventListener('click', () => {

                document.documentElement.scrollIntoView({behavior: 'smooth'});


            });

        }

    } catch {
    
        return false;
    
    }

}

const drawFromFavicon = () => {

    try {

        let favicon = document.querySelector('link[rel=icon]');

        let htmlStyle = getComputedStyle(document.documentElement);

        let color = htmlStyle.getPropertyValue('--primary-color');

        if (favicon) {
        
            let icon = favicon.getAttribute('data-icon');

            if (icon) {

                var canvas = document.createElement('canvas');

                canvas.height = 64;

                canvas.width = 64;

                var ctx = canvas.getContext('2d');

                ctx.fillStyle = color;

                ctx.font = '500 64px sans-serif';

                ctx.textAlign = 'center';

                ctx.textBaseline = 'middle';
                
                ctx.fillText(icon, canvas.height/2, canvas.width/2);

                favicon.href = canvas.toDataURL();

                canvas.remove();

                var canvas = document.createElement('canvas');

                canvas.height = 512;

                canvas.width = 512;

                var ctx = canvas.getContext('2d');

                ctx.fillStyle = color;

                ctx.font = '500 512px sans-serif';

                ctx.textAlign = 'center';

                ctx.textBaseline = 'middle';
                
                ctx.fillText(icon, canvas.height/2, canvas.width/2);

                document.querySelector('[data-js-logotype]').src = canvas.toDataURL();

                canvas.remove();
                
            }
        
        }

    } catch {

        return false;

    }

};

const formatText = (text) => {

    return document.documentElement.lang === 'fr' ? text.charAt(0).toUpperCase() + text.slice(1) : text.toUpperCase();

};

const getDimensions = () => {

    try {

        let widthScreen = window.screen.width * window.devicePixelRatio;

        let heightScreen = window.screen.height * window.devicePixelRatio;

        var scale = ``;

        if (heightScreen > widthScreen) {

            scale = heightScreen / widthScreen;

        } else {

            scale = widthScreen / heightScreen;

        }

        document.documentElement.style.setProperty('--scaleScreen', scale);

        document.documentElement.style.setProperty('--xs', Math.pow(scale, 0));

        var [backwardEnd, backwardPower, backwardStart, forwardEnd, forwardPower, forwardStart, step] = [-3.5, 0, 0.5, 3, 0, 1, 0.5];
        
        while (true) {

            forwardStart = forwardStart + step;

            document.documentElement.style.setProperty('--' + 'x'.repeat(++forwardPower), Math.pow(scale, forwardPower));

            if (forwardStart > forwardEnd) {

                break;

            }

        }
        
        while (true) {

            backwardStart = backwardStart - step;

            document.documentElement.style.setProperty('--' + 's'.repeat(++backwardPower), Math.pow(scale, -backwardPower));

            if (backwardStart < backwardEnd) {

                break;

            }

        }   

        document.documentElement.style.setProperty('--line-height', Math.pow(scale, 1));



    } catch {  

        return false; 

    }

};

const manageAbbreviations = (selector) => {

    try {

        const elements = document.querySelectorAll(selector + ' ' + '[data-ym-display^="block:lang('+ document.documentElement.lang +')"] [data-js-abbreviation]');

        if (elements.length) {

            const titlesAbbreviations = new Set();

            elements.forEach(element => {

                const text = element.textContent.toLowerCase();

                if (abbreviations.has(text)) {

                    let abbr = '';

                    const abbreviation = abbreviations.get(text);

                    if (!titlesAbbreviations.has(text)) {

                    titlesAbbreviations.add(text);

                    const title = abbreviation.title || abbreviation.titles[document.documentElement.lang];

                    if (title) {

                        abbr += `<abbr title="${title}">${title}</abbr> `;

                    }

                    abbr += `(<span data-ym-font-variant="small-caps">${formatText(abbreviation.text)}</span>)`;

                    } else {

                        abbr += `<span data-ym-font-variant="small-caps">${formatText(abbreviation.text)}</span>`;

                    }

                    element.innerHTML = ``;

                    element.insertAdjacentHTML('afterbegin', abbr);

                }

            });

        }

        } catch (error) {

            console.error(error);

            return false;

        }

};

const manageLinks = () => {

    try {

        if (document.querySelectorAll('[data-js-link]').length) {

            document.querySelectorAll('[data-js-link]').forEach(element => {

                if (links.has(element.textContent.toLowerCase())) {

                    /*
                        *
                            var str = "Crème brûlée et œuf";
                            str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
                        *
                    */

                    let hyperlink = '<a';

                    hyperlink += ' ';

                    if (!element.closest('h2, h3, h4, h5, h6')) {

                        hyperlink += `data-ym-color="var(--accent-color)::after || currentColor"`;

                        hyperlink += ` `;

                    }

                    hyperlink += `data-ym-content="' ↗'::after@media screen" data-ym-cursor="pointer" data-ym-font-weight="var(--font-weight-bold)::after" href="`;

                    if (links.get(element.textContent.toLowerCase()).href) {

                        hyperlink += links.get(element.textContent.toLowerCase()).href;

                    }

                    hyperlink += `"`;

                    hyperlink += ` `;

                    hyperlink += `title="`;

                    if (links.get(element.textContent.toLowerCase()).title) {

                        hyperlink += links.get(element.textContent.toLowerCase()).title;

                    } else {

                        if (links.get(element.textContent.toLowerCase()).titles[document.documentElement.lang]) {

                            hyperlink += links.get(element.textContent.toLowerCase()).titles[document.documentElement.lang];

                        }

                    }

                    hyperlink += ` `;

                    if (document.documentElement.lang === 'fr') { 
                        
                        hyperlink += `(S’ouvre dans une nouvelle fenêtre)`;  

                    } else {

                        hyperlink += `(Opens in a new window)`;
                                
                    }

                    hyperlink += `"`;

                    hyperlink += ` `;
                    
                    hyperlink += `target="_blank"`;

                    if (links.get(element.textContent.toLowerCase()).lang) {

                        if (document.documentElement.lang !== links.get(element.textContent.toLowerCase()).lang) {

                            hyperlink += `lang=`;

                            hyperlink += `"`;

                            hyperlink += links.get(element.textContent.toLowerCase()).lang;

                            hyperlink += `"`;

                        }

                    }

                    hyperlink += `>`;
                    
                    hyperlink += element.textContent;
                    
                    hyperlink += `</a>`;

                    /*element.innerHTML = element.textContent.replace(element.textContent, hyperlink);*/

                    element.innerHTML = ``;

                    element.insertAdjacentHTML('afterbegin', hyperlink);

                }

            });

        }

    } catch (error) {

        console.error(error);

        return false;

    }

};

const manageToc = () => {

    try {

        if (document.querySelector('nav')) {

            let main = document.querySelector('[data-js-original]');

            let entries = main.querySelectorAll('h2[data-ym-display^="block:lang('+ document.documentElement.lang +')"], h2[data-ym-display="block"], h3[data-ym-display^="block:lang('+ document.documentElement.lang +')"], h3[data-ym-display="block"], h4[data-ym-display^="block:lang('+ document.documentElement.lang +')"], h4[data-ym-display="block"], h5[data-ym-display^="block:lang('+ document.documentElement.lang +')"], h5[data-ym-display="block"], h6[data-ym-display^="block:lang('+ document.documentElement.lang +')"], h6[data-ym-display="block"]');
        
            let toc = `<p data-ym-color="var(--text-color)::before@media screen and (max-width: 468px) || var(--primary-color)" data-ym-display="block" data-ym-content="'=Ox00A0'::before@media screen and (max-width: 467px)" data-ym-font-size="calc(var(--x) * 1rem)@media screen and (min-width: 468px)">`;
        
            if (document.documentElement.lang === 'fr') {
        
                toc += `Sommaire`;
        
            } else {
        
                toc += `Contents`;
        
            } 
            
            toc += `</p>`;

            toc += `<ul`;

            toc += ` `;

            if (document.documentElement.lang === 'fr') {

                toc += `data-ym-display="block:lang(fr) || none:lang(en)"`;
        
            } else {
        
                toc += `data-ym-display="block:lang(en) || none:lang(fr)"`;
        
            }

            toc += ` `;

            toc += `data-ym-margin-block-start="var(--margin-block)">`;

            var i = 0;

            entries.forEach((entry) => {

                i++;

                entry.setAttribute('data-js-in', 'in-' + i);

                toc += `<li data-ym-display="block"`;

                toc += ` `;

                switch (entry.tagName.toLowerCase()) {

                    case 'h3':

                        toc += `data-ym-margin-inline-start="1ch || 2ch@media screen and (min-width: 1024px)"`;

                    break;

                    case 'h4':

                        toc += `data-ym-margin-inline-start="2ch || 3ch@media screen and (min-width: 1024px)"`;

                    break;

                    case 'h5':

                        toc += `data-ym-margin-inline-start="3ch || 4ch@media screen and (min-width: 1024px)"`;

                    break;

                    case 'h6':

                        toc += `data-ym-margin-inline-start="4ch || 5ch@media screen and (min-width: 1024px)"`;

                    break;

                }

                toc += `<span data-ym-color="var(--accent-color)::after" data-ym-content="'&#x2009;→ '::after" data-ym-cursor="pointer" data-ym-font-weight="var(--font-weight-bold)::after"`;

                toc += `data-js-to=to-` + i;
        
                toc += `>`;
        
                toc += sanitizeHtml(entry.innerHTML);

                toc += `</span>`;
        
                toc += `</li>`;

            });

            toc += `</ul>`;

            document.querySelector('[data-js-toc]').insertAdjacentHTML('beforeend', toc);

            document.querySelectorAll('[data-js-to]').forEach((element) => {

                element.addEventListener('click', () => {
            
                    let scrollIn = element.getAttribute('data-js-to').replace('to', 'in');
            
                    document.querySelector('[data-js-in="' + scrollIn + '"]').scrollIntoView();
            
                    /*
                        *
                            The element exist if the user has already clicked on an hyperlink.
                        *
                    */
            
                    if (document.querySelector('[data-js-to-toc]')) {
            
                        document.querySelector('[data-js-to-toc]').remove();
            
                    }
            
                    if (document.documentElement.lang === 'fr') {

                        let html = `<span data-ym-color="var(--accent-color)" data-ym-cursor="pointer" data-ym-font-weight="var(--font-weight-bold)::after" data-js-to-toc title="retour au sommaire">&#x2009;↑</span>`;

                        document.querySelector('[data-js-in="' + scrollIn + '"]').insertAdjacentHTML('afterbegin', html)
            
                    } else {

                        let html = `<span data-ym-color="var(--accent-color)" data-ym-cursor="pointer" data-ym-font-weight="var(--font-weight-bold)::after" data-js-to-toc title="back to contents">&#x2009;↑</span>`;

                        document.querySelector('[data-js-in="' + scrollIn + '"]').insertAdjacentHTML('afterbegin', html)
            
                    }
            
                    document.querySelector('[data-js-to-toc]').addEventListener('click', () => {
            
                        document.querySelector('[data-js-toc]').scrollIntoView();
            
                        document.querySelector('[data-js-to-toc]').remove();
            
                    });
            
                });
            
            });

        }

    } catch (error) {

        console.error(error);

        return false;

    }   

};

const minifyMyCss = (css) => {

    try {

        return css

            .replace(/([^0-9a-zA-Z\.#])\s+/g, '$1')

            .replace(/\s([^0-9a-zA-Z\.#]+)/g, '$1')

            .replace(/;}/g, `}`)

            .replace(/\/\*.*?\*\//g, '');

    } catch (error) {

        console.error(error);

        return false;

    }

};

const sanitizeHtml = (html) => {

    try {

        let div = document.createElement(`div`);

        document.querySelector('body').appendChild(div);

        let fragment = document.createRange().createContextualFragment(html);

        div.appendChild(fragment);

        var text = div.textContent || div.innerText || '';

        document.querySelector('body').removeChild(div);

        return text;

    } catch (error) {

        console.error(error);

        return false;

    }

};

const setLanguage = () => {

    try {

        try {

            if (localStorage.getItem('data-lang')) {
        
                document.querySelector('html').setAttribute('lang', localStorage.getItem('data-lang'));
        
            }
            
        } catch {
            
            try {
            
                if (window.navigator.language.substring(0, 2).toLowerCase() !== 'fr') {

                    document.querySelector('html').setAttribute('lang', 'en');
                    
                }
    
            } catch {
    
                document.querySelector('html').setAttribute('lang', 'fr');
    
            }
    
        }

        if (document.querySelector('[data-js-lang]')) {

            document.querySelector('[data-js-lang]').addEventListener('click', () => {

                if (document.documentElement.lang === 'fr') {
            
                    localStorage.setItem('data-lang', 'en');
            
                } else {
            
                    localStorage.setItem('data-lang', 'fr');
            
                }
            
                location.reload();
            
            });

        }

    } catch (error) {

        console.error(error);

        return false;

    }
};

const setStyles = () => {

    try {

        /* https://www.materialpalette.com/red/green */

        document.documentElement.style.setProperty('--accent-color', '#4cAf50');

        document.documentElement.style.setProperty('--dark-primary-color', '#d32f2f');

        document.documentElement.style.setProperty('--divider-color', '#bdbdbd');

        document.documentElement.style.setProperty('--primary-color', '#f44336');

        document.documentElement.style.setProperty('--text-color', '#212121');

        document.documentElement.style.setProperty('--font-family-sans-serif', '"IBM Plex Sans", sans-serif');

        document.documentElement.style.setProperty('--font-weight-regular', '400');

        document.documentElement.style.setProperty('--font-weight-bold', '700');

        document.documentElement.style.setProperty('--margin-block', 'calc(var(--s) * 1rem');

    } catch (error) {

        console.error(error);

        return false;

    }

};

const shapeContent = () => {

    try {

        if (document.querySelector('[data-ǝǝuɯʎl]')) {

            let main = document.querySelector('[data-ǝǝuɯʎl]');

            main.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((entry) => {

                switch (entry.tagName.toLowerCase()) {

                    case 'h1' :

                        entry.setAttribute('data-ym-color', 'var(--primary-color)');

                        entry.setAttribute('data-ym-font-size', 'calc(var(--x) * 1rem)@media screen and (max-width: 467px) || calc(var(--xxx) * 1rem)@media screen and (min-width: 468px)');

                        entry.setAttribute('data-ym-font-variant', 'small-caps')

                    break;

                    case 'h2' :

                        entry.setAttribute('data-ym-color', 'var(--text-color)::before@media screen and (max-width: 467px) || var(--primary-color)');

                        entry.setAttribute('data-ym-content', '"=Ox00A0"::before@media screen and (max-width: 467px)');

                        entry.setAttribute('data-ym-font-size', 'calc(var(--xx) * 1rem)@media screen and (min-width: 468px)');

                    break;

                    case 'h3' :

                        entry.setAttribute('data-ym-color', 'var(--text-color)::before@media screen and (max-width: 467px) || var(--primary-color)');

                        entry.setAttribute('data-ym-content', '"==Ox00A0"::before@media screen and (max-width: 467px)');

                        entry.setAttribute('data-ym-font-size', 'calc(var(--x) * 1rem)@media screen and (min-width: 468px)');

                    break;

                    default :

                        entry.setAttribute('data-ym-color', 'var(--text-color)::before@media screen and (max-width: 467px) || var(--primary-color)');

                        entry.setAttribute('data-ym-content', '"===Ox00A0"::before@media screen and (max-width: 467px)');

                        entry.setAttribute('data-ym-font-size', 'calc(var(--xs) * 1rem)@media screen and (min-width: 468px)');

                }

            });

        }

        let main = document.querySelector('[data-js-original]');

        if (main.querySelectorAll('code').length) {
    
            main.querySelectorAll('code').forEach((entry) => {

                entry.setAttribute('data-css-quote', '');

                if (!entry.closest('pre')) {

                    entry.setAttribute('data-ym-color', 'var(--accent-color)::before || var(--accent-color)::after');

                    entry.setAttribute('data-ym-content', '"<code>"::before || "</code>"::after');

                    entry.setAttribute('data-ym-line-break', 'anywhere');

                }

            });

        }

        if (main.querySelectorAll('dd').length) {
    
            main.querySelectorAll('dd').forEach((entry) => {

                entry.setAttribute('data-ym-display', 'block');

            });

        }
    
        if (main.querySelectorAll('dt, h2, h3, h4, h5, h6, p, ol, ul').length) {
    
            main.querySelectorAll('dt, dt, h2, h3, h4, h5, h6, p, ol, ul').forEach((entry) => {
                
                if (entry.hasAttribute('data-lang')) {

                    switch (entry.getAttribute('data-lang'))  {


                        case 'fr':

                            entry.setAttribute('data-ym-display', 'block:lang(fr) || none:lang(en)');

                            if (entry.nextElementSibling && entry.nextElementSibling.getAttribute('data-lang') === 'en') {

                                 console.log('oui');

                            } else {

                                console.log('non');
                            }
                        break;

                        default:

                            entry.setAttribute('data-ym-display', 'block:lang(en) || none:lang(fr)');
                    }
    
                }

                if (!entry.hasAttribute('data-lang')) {

                    entry.setAttribute('data-ym-display', 'block');

                }
    
                entry.setAttribute('data-ym-margin-block-start', 'var(--margin-block)');
            
            });
    
        }

        if (main.querySelectorAll('dt').length) {
    
            main.querySelectorAll('dt').forEach((entry) => {

                entry.setAttribute('data-ym-color', 'var(--accent-color)::first-letter');

                entry.setAttribute('data-ym-font-variant', 'small-caps::first-letter');

                entry.setAttribute('data-ym-font-weight', 'var(--font-weight-bold)::first-letter');

            });

        }

        if (main.querySelectorAll('li').length) {
    
            main.querySelectorAll('li').forEach((entry) => {

                if (!entry.hasAttribute('data-ym-color')) {

                    entry.setAttribute('data-ym-color', 'var(--primary-color)::marker');

                }

                if (!entry.hasAttribute('data-ym-display')) {

                    entry.setAttribute('data-ym-display', 'list-item');

                }

                entry.setAttribute('data-ym-margin-block-start', 'var(--margin-block)');

            });

        }

        if (main.querySelectorAll('ol, ul').length) {
    
            main.querySelectorAll('ol, ul').forEach((entry) => {

                if (!entry.hasAttribute('data-ym-list-style-position')) {

                    entry.setAttribute('data-ym-list-style-position', 'inside');

                }

            });

        }

        if (main.querySelectorAll('ol').length) {
    
            main.querySelectorAll('ol').forEach((entry) => {

                if (!entry.hasAttribute('data-ym-list-style-type')) {

                    entry.setAttribute('data-ym-list-style-type', 'decimal');

                }

            });

        }

        if (main.querySelectorAll('pre').length) {
    
            main.querySelectorAll('pre').forEach((entry) => {

                entry.setAttribute('data-ym-border-inline-start', 'calc(var(--sssssssss) * 1rem) solid var(--accent-color)');

                entry.setAttribute('data-ym-display', 'block');

                entry.setAttribute('data-ym-line-break', 'anywhere');

                entry.setAttribute('data-ym-margin-block-start', 'var(--margin-block)');

                entry.setAttribute('data-ym-padding-inline-start', 'calc(var(--s) * 1rem)');

                entry.setAttribute('data-ym-white-space', 'pre-wrap');
    
            });
    
        }

        if (main.querySelectorAll('ul').length) {
    
            main.querySelectorAll('ul').forEach((entry) => {

                if (!entry.hasAttribute('data-ym-list-style-type')) {

                    entry.setAttribute('data-ym-list-style-type', 'disc');

                }

            });

        }

        if (main.querySelectorAll('[data-css-html').length) {

            document.querySelectorAll('[data-css-html]').forEach((entry) => {

                entry.setAttribute('data-ym-border-inline-start', 'calc(var(--sssssssss) * 1rem) solid var(--accent-color)');

                entry.setAttribute('data-ym-display', 'block');

                entry.setAttribute('data-ym-margin-block-start', 'var(--margin-block)');

                entry.setAttribute('data-ym-padding-inline-start', 'calc(var(--s) * 1rem)'); 
        
            });

        }

        if (main.querySelectorAll('[data-css-lymnee]').length) {

            document.querySelectorAll('[data-css-lymnee]').forEach((entry) => {

                entry
                .setAttribute('data-ym-color', 'var(--primary-color)');
                entry
                .setAttribute('data-ym-font-variant', 'small-caps::first-letter');
                entry.setAttribute('data-ym-font-weight', 'var(--font-weight-bold)::first-letter');
        
            });

        }

        if (main.querySelectorAll('[data-css-quote]').length) {

            document.querySelectorAll('[data-css-quote]').forEach((entry) => {

                entry.setAttribute('data-ym-content', 'open-quote::before || close-quote::after');
        
            });

        }

        if (main.querySelectorAll('[data-css-line-break]').length) {

            document.querySelectorAll('[data-css-line-break]').forEach((entry) => {

                entry.setAttribute('data-ym-line-break', 'anywhere'); 
        
            });

        }
    
    } catch (error) {

        console.error(error);

        return false;

    }

};


const showTimestamp = () => {

    try {

        let today = new Date(document.lastModified);

        if (today.getDate() < '4') {

            var frenchDate = new Intl.DateTimeFormat('fr-FR').format(today);
        
            var englishDate = new Intl.DateTimeFormat('en-US').format(today);
                
        } else {
        
            let options = {day: 'numeric', month: 'long', year: 'numeric'};
        
            var frenchDate = new Intl.DateTimeFormat('fr-FR', options).format(today);
        
            var englishDate = new Intl.DateTimeFormat('en-US', options).format(today);
        
        }

        if (document.querySelector('[data-js-update]')) {

            if (document.documentElement.lang === 'fr') {

                document.querySelector('[data-js-update]').insertAdjacentHTML('afterbegin', frenchDate);

            } else {

                document.querySelector('[data-js-update]').insertAdjacentHTML('afterbegin', englishDate);

            }

        }

    } catch (error) {

        console.error(error);

        return false;

    }

};

const summarizeContent = () => {

    try {

        let summaryContent = '';

        document.querySelectorAll('[data-ym-display^="block:lang(' + document.documentElement.lang + ')"][data-js-summarize], [data-ym-display="block"][data-js-summarize], pre[data-js-summarize]').forEach(element => {

            summaryContent += element.outerHTML;

        });

        if (document.querySelector('[data-js-abstract]')) {

            document.querySelector('[data-js-abstract]').insertAdjacentHTML('afterbegin', summaryContent);

        }

    } catch (error) {

        console.error(error);

        return false;

    }

};

const toggleContent = () => {

    try {

        const summaryElement = document.querySelector('[data-js-summary]');

        const abstractElement = document.querySelector('[data-js-abstract]');

        const originalElement = document.querySelector('[data-js-original]');

        const tocElement = document.querySelector('[data-js-to-toc]');

        if (summaryElement) {

            summaryElement.addEventListener('click', () => {

                const isClose = summaryElement.getAttribute('data-js-summary') === 'close';

                summaryElement.setAttribute('data-js-summary', isClose ? 'open' : 'close');

                abstractElement.setAttribute('data-ym-display', isClose ? 'block' : 'none');

                originalElement.setAttribute('data-ym-display', isClose ? 'none' : 'block');

                if (tocElement) {

                    tocElement.remove();

                }

            });

        }

    } catch (error) {

        console.error(error);

        return false;

    }

};



const translateTags = () => {

    try {

        const tags = ['alt', 'content', 'title'];

        if (document.documentElement.lang !== 'fr') {

            document.querySelectorAll('[data-js-translation]').forEach((element) => {

                tags.forEach((tag) => {

                    if (element.hasAttribute(tag)) {

                        let text = element[tag];

                        element[tag] = element.getAttribute('data-js-translation');

                        element.setAttribute('data-js-translation', text);

                    }

                });

            });

        }

    } catch (error) {

        console.error(error);

        return false;

    }

};

async function runAsyncTasks() {

    try {

        await setStyles();

        await drawFromFavicon();

        await shapeContent();

        await setLanguage();

        await translateTags();

        await getDimensions();

        await manageLinks();

        await toggleContent();

        await showTimestamp();

        await summarizeContent();

        await manageToc();

        await backToTop();

        const versions = ['[data-js-original]', '[data-js-abstract]'];

        await Promise.all(versions.map(selector => manageAbbreviations(selector)));

    } catch (error) {

        console.log(error.name);

        console.log(error.message);

    }

}

runAsyncTasks();

var cssAfter;

var cssBefore;

cssAfter = `

:lang(fr) {  
    quotes: '«\u202F' '\u202F»'
}

:lang(en) {  
    quotes: '“' '”'
}

`;

cssBefore = `

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 700,
  'GRAD' 0,
  'opsz' 48
}
`;

var cssAfterLymnee = minifyMyCss(cssAfter);

var cssBeforeLymnee = minifyMyCss(cssBefore);

var boxSizingLymnee = true,

printLymnee = true,

entriesLymnee = new Set(['data-ym-display="none"']),

unsetLymnee = new Set(['abbr', 'em', 'strong']);
