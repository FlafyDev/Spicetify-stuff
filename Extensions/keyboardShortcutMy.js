//@ts-check

// NAME: Keyboard Shortcut
// AUTHOR: dax
// DESCRIPTION: Register a few more keybinds to support keyboard-driven navigation in Spotify client. 

/// <reference path="../spicetify-cli/globals.d.ts" />

(function KeyboardShortcutMy() {
    if (!Spicetify.Keyboard) {
        setTimeout(KeyboardShortcutMy, 1000);
        return;
    }

    const SCROLL_STEP = 50;

    /**
     * Register your own keybind with function `registerBind`
     * 
     * Syntax:
     *     registerBind(keyName, ctrl, shift, alt, callback)
     * 
     * ctrl, shift and alt are boolean, true or false
     * 
     * Valid keyName:
     * - BACKSPACE       - C               - Y               - F3
     * - TAB             - D               - Z               - F4
     * - ENTER           - E               - WINDOW_LEFT     - F5
     * - SHIFT           - F               - WINDOW_RIGHT    - F6
     * - CTRL            - G               - SELECT          - F7
     * - ALT             - H               - NUMPAD_0        - F8
     * - PAUSE/BREAK     - I               - NUMPAD_1        - F9
     * - CAPS            - J               - NUMPAD_2        - F10
     * - ESCAPE          - K               - NUMPAD_3        - F11
     * - SPACE           - L               - NUMPAD_4        - F12
     * - PAGE_UP         - M               - NUMPAD_5        - NUM_LOCK
     * - PAGE_DOWN       - N               - NUMPAD_6        - SCROLL_LOCK
     * - END             - O               - NUMPAD_7        - ;
     * - HOME            - P               - NUMPAD_8        - =
     * - ARROW_LEFT      - Q               - NUMPAD_9        - ,
     * - ARROW_UP        - R               - MULTIPLY        - -
     * - ARROW_RIGHT     - S               - ADD             - /
     * - ARROW_DOWN      - T               - SUBTRACT        - `
     * - INSERT          - U               - DECIMAL_POINT   - [
     * - DELETE          - V               - DIVIDE          - \
     * - A               - W               - F1              - ]
     * - B               - X               - F2              - "
     * 
     * Use one of keyName as a string. If key that you want isn't in that list,
     * you can also put its keycode number in keyName as a number.
     * 
     * callback is name of function you want your shortcut to bind to. It also 
     * returns one KeyboardEvent parameter.
     * 
     * Following are my default keybinds, use them as examples.
     */
    

     //My Personal Binds----------------------------------------------

     // Seek to progress percent of song
     registerBind("NUMPAD_0", false, false, false, ()=>Spicetify.Player.seek(0));
     registerBind("NUMPAD_1", false, false, false, ()=>Spicetify.Player.seek(.1));
     registerBind("NUMPAD_2", false, false, false, ()=>Spicetify.Player.seek(.2));
     registerBind("NUMPAD_3", false, false, false, ()=>Spicetify.Player.seek(.3));
     registerBind("NUMPAD_4", false, false, false, ()=>Spicetify.Player.seek(.4));
     registerBind("NUMPAD_5", false, false, false, ()=>Spicetify.Player.seek(.5));
     registerBind("NUMPAD_6", false, false, false, ()=>Spicetify.Player.seek(.6));
     registerBind("NUMPAD_7", false, false, false, ()=>Spicetify.Player.seek(.7));
     registerBind("NUMPAD_8", false, false, false, ()=>Spicetify.Player.seek(.8));
     registerBind("NUMPAD_9", false, false, false, ()=>Spicetify.Player.seek(.9));


    // Q to open Queue page
    registerBind("Q", false, false, false, clickQueueButton);

     // C to open current playing context, L to open Lyrics, H to open Home Tab , Y to Open the Ypur Library, S to open the Lyrics Plus Custom App
    registerBind("C", false, false, false, openContext)
    registerBind("L", false, false, false, toggleLyrics);
    registerBind("H", false, false, false, openHome);
    registerBind("Y", false, false, false, openLibrary);
    registerBind("S", false, false, false, openLyrics);
 
    // Arrow keys to change volume
    registerBind("ARROW_DOWN", false, false, false, decreaseVolume);
    registerBind("ARROW_UP"  , false, false, false, increaseVolume);
    
    // Arrow keys to seek track
    registerBind("ARROW_RIGHT", false, false, false, seekForward);
    registerBind("ARROW_LEFT", false, false, false, seekBack);
    

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    
   function clickQueueButton() {
        document.querySelector('.control-button-wrapper>button[Aria-label="Queue"]').click();
    }
    
    function openContext(){
       big = document.querySelector("#main > div > div.Root__top-container > nav > div.main-navBar-navBar > div:nth-child(3) > div > div > a > div")
       small = document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.main-nowPlayingBar-left > div > div.main-coverSlotCollapsed-container > div > a > div")
       if(big)
         big.click();
       else
        small.click()
    }
    
    function toggleLyrics() {
        document.querySelector('button[title="Popup Lyrics"]').click()
    }  
    function openHome(){
        ele = document.querySelector(`.main-navBar-navBar a[href="/"]`)
        if(ele)
            ele.click();
    }
    function openLyrics(){
        ele = document.querySelector(`.main-navBar-navBar a[href="/lyrics-plus"]`)
        if(ele)
            ele.click();
    }
     function openLibrary(){
        ele = document.querySelector(`.main-navBar-navBar a[href="/collection"]`)
        if(ele)
            ele.click();
    }
    function seekForward(){
        Spicetify.Player.skipForward(10000)
    }
    function seekBack(){
        Spicetify.Player.skipBack(10000)
    }  
    async function decreaseVolume(){
        if(Spicetify.Platform?.PlaybackAPI === undefined) Spicetify.Player?.origin?.setVolume(getVolume() - 0.05)
        else await Spicetify.Platform.PlaybackAPI.setVolume(getVolume() - 0.05)
    }
    async function increaseVolume(){
        if(Spicetify.Platform?.PlaybackAPI === undefined) Spicetify.Player?.origin?.setVolume(getVolume() + 0.05)
        else await Spicetify.Platform.PlaybackAPI.setVolume(getVolume() + 0.05)
    }
    function getVolume(){
        return (Spicetify.Player?.origin?._volume?._volume ?? Spicetify.Platform?.PlaybackAPI?._volume)
    }

    // ---------------------------------------------------------------------------------------



    // Ctrl + Tab and Ctrl + Shift + Tab to switch sidebar items
    registerBind("TAB", true, false, false, rotateSidebarDown);
    registerBind("TAB", true, true, false, rotateSidebarUp);

    // Ctrl + Q to open Queue page
    // registerBind("Q", true, false, false, clickQueueButton);

    // Shift + H and Shift + L to go back and forward page
    registerBind("H", false, true, false, clickNavigatingBackButton);
    registerBind("L", false, true, false, clickNavigatingForwardButton);

    // PageUp, PageDown to focus on iframe app before scrolling
    registerBind("PAGE_UP", false, true, false, focusOnApp);
    registerBind("PAGE_DOWN", false, true, false, focusOnApp);

    // J and K to vertically scroll app
    registerBind("J", false, false, false, appScrollDown);
    registerBind("K", false, false, false, appScrollUp);

    // G and Shift + G to scroll to top and to bottom
    registerBind("G", false, false, false, appScrollTop);
    registerBind("G", false, true, false, appScrollBottom);

    // M to Like/Unlike track
    registerBind("M", false, false, false, Spicetify.Player.toggleHeart);

    // Forward Slash to open search page
    registerBind("/", false, false, false, openSearchPage);

    // A to activate Link Follow function
    const vim = new VimBind();
    registerBind("A", false, false, false, vim.activate.bind(vim));
    
    // Esc to cancel Link Follow
    vim.setCancelKey("ESCAPE")
    vim.setCancelKey("Z")

    function rotateSidebarDown() {
        rotateSidebar(1)
    }

    function rotateSidebarUp() {
        rotateSidebar(-1)
    }

    // function clickQueueButton() {
    //     document.querySelector(".control-button-wrapper .spoticon-queue-16").click();
    // }

    function clickNavigatingBackButton() {
        document.querySelector(".main-topBar-historyButtons .main-topBar-back").click();
    }

    function clickNavigatingForwardButton() {
        document.querySelector(".main-topBar-historyButtons .main-topBar-forward").click();
    }

    function appScrollDown() {
        const app = focusOnApp();
        if (app) {
            app.scrollBy(0, SCROLL_STEP);
        }
    }

    function appScrollUp() {
        const app = focusOnApp();
        if (app) {
            app.scrollBy(0, -SCROLL_STEP);
        }
    }

    function appScrollBottom() {
        const app = focusOnApp();
        app.scroll(0, app.scrollHeight);
    }

    function appScrollTop() {
        const app = focusOnApp();
        app.scroll(0, 0);
    }

    /**
     * 
     * @param {KeyboardEvent} event 
     */
    function openSearchPage(event) {
        const searchInput = document.querySelector(".main-topBar-topbarContentWrapper input");
        if (searchInput) {
            searchInput.focus();
        } else {
            const sidebarItem = document.querySelector(`.main-navBar-navBar a[href="/search"]`);
            if (sidebarItem) {
                sidebarItem.click();
            }
        }

        event.preventDefault();
    }

    /**
     * 
     * @param {Spicetify.Keyboard.ValidKey} keyName 
     * @param {boolean} ctrl 
     * @param {boolean} shift 
     * @param {boolean} alt 
     * @param {(event: KeyboardEvent) => void} callback 
     */
    function registerBind(keyName, ctrl, shift, alt, callback) {
        const key = Spicetify.Keyboard.KEYS[keyName];

        Spicetify.Keyboard.registerShortcut(
            {
                key,
                ctrl,
                shift,
                alt,
            },
            (event) => {
                if (!vim.isActive) {
                    callback(event);
                }
            },
        );
    }

    function focusOnApp() {
        return document.querySelector("main .os-viewport");
    }

    /**
     * @returns {number}
     */
    function findActiveIndex(allItems) {
        const active = document.querySelector(
            ".main-navBar-navBarLinkActive, .main-collectionLinkButton-selected, .main-rootlist-rootlistItemLinkActive"
        );
        if (!active) {
            return -1;
        }

        let index = 0;
        for (const item of allItems) {
            if (item === active) {
                return index;
            }

            index++;
        }
    }

    /**
     * 
     * @param {1 | -1} direction 
     */
    function rotateSidebar(direction) {
        const allItems = document.querySelectorAll(
            ".main-navBar-navBarLink, .main-collectionLinkButton-collectionLinkButton, .main-rootlist-rootlistItemLink"
        );
        const maxIndex = allItems.length - 1;
        let index = findActiveIndex(allItems) + direction;

        if (index < 0) index = maxIndex;
        else if (index > maxIndex) index = 0;

        let toClick = allItems[index];
        if (!toClick.hasAttribute("href")) {
            toClick = toClick.querySelector(".main-rootlist-rootlistItemLink");
        }

        toClick.click();
    }
})();

function VimBind() {
    const elementQuery = ["[href]", "button", "td.tl-play", "td.tl-number", "tr.TableRow"].join(",");

    const keyList = "qwertasdfgzxcvyuiophjklbnm".split("");

    const lastKeyIndex = keyList.length - 1;

    this.isActive = false;

    const vimOverlay = document.createElement("div");
    vimOverlay.id = "vim-overlay";
    vimOverlay.style.zIndex = "9999";
    vimOverlay.style.position = "absolute";
    vimOverlay.style.width = "100%";
    vimOverlay.style.height = "100%";
    vimOverlay.style.display = "none";
    vimOverlay.innerHTML = `<style>
.vim-key {
    position: fixed;
    padding: 3px 6px;
    background-color: black;
    border-radius: 3px;
    border: solid 2px white;
    color: white;
    text-transform: lowercase;
    line-height: normal;
    font-size: 14px;
    font-weight: 500;
}
</style>`;
    document.body.append(vimOverlay);

    const mousetrap = new Spicetify.Mousetrap(document);
    mousetrap.bind(keyList, listenToKeys.bind(this), "keypress");
    // Pause mousetrap event emitter
    const orgStopCallback = mousetrap.stopCallback;
    mousetrap.stopCallback = () => true;

    /**
     *
     * @param {KeyboardEvent} event
     */
    this.activate = function (event) {
        vimOverlay.style.display = "block";

        const vimkey = getVims();
        if (vimkey.length > 0) {
            vimkey.forEach((e) => e.remove());
            return;
        }

        let firstKey = 0;
        let secondKey = 0;

        getLinks().forEach((e) => {
            if (e.style.display === "none" || e.style.visibility === "hidden" || e.style.opacity === "0") {
                return;
            }

            const bound = e.getBoundingClientRect();
            let owner = document.body;

            let top = bound.top;
            let left = bound.left;

            if (
                bound.bottom > owner.clientHeight ||
                bound.left > owner.clientWidth ||
                bound.right < 0 ||
                bound.top < 0 ||
                bound.width === 0 ||
                bound.height === 0
            ) {
                return;
            }

            vimOverlay.append(createKey(e, keyList[firstKey] + keyList[secondKey], top, left));

            secondKey++;
            if (secondKey > lastKeyIndex) {
                secondKey = 0;
                firstKey++;
            }
        });

        this.isActive = true;
        setTimeout(() => (mousetrap.stopCallback = orgStopCallback.bind(mousetrap)), 100);
    };

    /**
     *
     * @param {KeyboardEvent} event
     */
    this.deactivate = function (event) {
        mousetrap.stopCallback = () => true;
        this.isActive = false;
        vimOverlay.style.display = "none";
        getVims().forEach((e) => e.remove());
    };

    function getLinks() {
        const elements = Array.from(document.querySelectorAll(elementQuery));
        return elements;
    }

    function getVims() {
        return Array.from(vimOverlay.getElementsByClassName("vim-key"));
    }

    /**
     * @param {KeyboardEvent} event
     */
    function listenToKeys(event) {
        if (!this.isActive) {
            return;
        }

        const vimkey = getVims();

        if (vimkey.length === 0) {
            this.deactivate(event);
            return;
        }

        for (const div of vimkey) {
            const text = div.innerText.toLowerCase();
            if (text[0] !== event.key) {
                div.remove();
                continue;
            }

            const newText = text.slice(1);
            if (newText.length === 0) {
                click(div.target);
                this.deactivate(event);
                return;
            }

            div.innerText = newText;
        }

        if (vimOverlay.childNodes.length === 1) {
            this.deactivate(event);
        }
    }

    function click(element) {
        if (element.hasAttribute("href") || element.tagName === "BUTTON") {
            element.click();
            return;
        }

        const findButton = element.querySelector(`button[data-ta-id="play-button"]`) || element.querySelector(`button[data-button="play"]`);
        if (findButton) {
            findButton.click();
            return;
        }
        alert("Let me know where you found this button, please. I can't click this for you without that information.");
        return;
        // TableCell case where play button is hidden
        // Index number is in first column
        const index = parseInt(element.firstChild.innerText) - 1;
        const context = getContextUri();
        if (index >= 0 && context) {
            console.log(index);
            console.log(context);

            //Spicetify.PlaybackControl.playFromResolver(context, { index }, () => {});
            return;
        }
    }

    function createKey(target, key, top, left) {
        const div = document.createElement("span");
        div.classList.add("vim-key");
        div.innerText = key;
        div.style.top = top + "px";
        div.style.left = left + "px";
        div.target = target;
        return div;
    }

    function getContextUri() {
        const username = __spotify.username;
        const activeApp = localStorage.getItem(username + ":activeApp");
        if (activeApp) {
            try {
                return JSON.parse(activeApp).uri.replace("app:", "");
            } catch {
                return null;
            }
        }

        return null;
    }

    /**
     *
     * @param {Spicetify.Keyboard.ValidKey} key
     */
    this.setCancelKey = function (key) {
        mousetrap.bind(Spicetify.Keyboard.KEYS[key], this.deactivate.bind(this));
    };

    return this;
}