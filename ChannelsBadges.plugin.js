/**
 * @name ChannelsBadges
 * @author Sheiylanie
 * @authorId 183948625368317952
 * @description Add Voice | Forum | Nsfw | Rule | Ads badges to channels.
 * @version 1.1.4
 * @invite GWYNKpbunT
 * @donate https://www.paypal.com/paypalme/Sheiylanie
 * @website https://revgames.tech/
 * @source https://github.com/SheiylaDev/ChannelsBadges/blob/main/ChannelsBadges.plugin.js
 * @updateUrl https://raw.githubusercontent.com/SheiylaDev/ChannelsBadges/main/ChannelsBadges.plugin.js
 */

/**
 * Represents a plugin that adds badges to Discord channels.
 */
class ChannelsBadges {
    constructor(meta) {
        this.meta = meta;
        this.CBsettings = {
            version: "1.1.4",
            voice: { voice: true, text: true, emoji: true, voice_color: "#1ABC9C" },
            forum: { forum: true, text: true, emoji: true, forum_color: "#206694" },
            nsfw: { nsfw: true, text: true, emoji: true, nsfw_color: "#F23F42" },
            rule: { rule: true, text: true, emoji: true, rule_color: "#FF9B2B" },
            ads: { ads: true, text: true, emoji: true, ads_color: "#FF2BC2" }
        };
        this.styles = `
            .channelsBadges_v_FlexChild { margin-left: 0; margin-right: -130px; flex: 1 1 auto; }
            .channelsBadges_v_Header { display: flex; flex-direction: row; justify-content: space-between; flex-wrap: nowrap; position: relative; flex: 0 0 auto; padding: 16px; z-index: 1; overflow-x: hidden; } 
            .channelsBadges_v_Header_Title { color: var(--header-primary); font-family: var(--font-display); font-size: 20px; line-height: 24px; font-weight: 600; }
            .channelsBadges_v_Header_Version { color: var(--text-normal); font-family: var(--font-primary); font-size: 12px; line-height: 16px; font-weight: 400; }
            .channelsBadges_v_Button { height: 26px; padding: 4px; transition: opacity.2s ease-in-out; opacity: 0.5; cursor: pointer; border-radius: 3px; color: var(--interactive-normal); box-sizing: content-box; background: transparent; border: 0; }
            .channelsBadges_v_Button:hover { opacity: 1; color: var(--interactive-hover); }     
            .channelsBadges_v_Map { margin-top: 0px; margin-left: 15px; display: flex; align-items: center; color: var(--text-positive); }
            .channelsBadges_v_Map:after { content: ""; height: 1px; flex: 1 1 auto; margin-left: 4px; margin-right: 18px; opacity: 0.6; background-color: var(--info-positive-foreground); }
            .channelsBadges_v_Map_ul { margin-left: 35px !important; margin-bottom: 20px !important; font-size: 14px; }
            .channelsBadges_v_Footer { position: relative; flex: 0 0 auto; padding: 16px; z-index: 1; overflow-x: hidden; border-radius: 0 0 5px 5px; background-color: var(--modal-footer-background); }
            .channelsBadges_v_Footer > div { display: flex; }
            .channelsBadges_v_Footer > div > a { margin-right: 12px; color: #c4c9ce; }
            .channelsBadges_v_Footer > div > a:hover { color: #fff; }
            .channelsBadges_v_Footer_Title { color: var(--text-normal); font-family: var(--font-primary); font-size: 12px; line-height: 16px; font-weight: 400; }
            .channelsBadges_S_Header_Version { color: var(--text-normal); font-family: var(--font-primary); font-size: 12px; line-height: 16px; font-weight: 400; }
            .channelsBadges_S_Changelogs { position: fixed; top: 14px; right: 14px; cursor:pointer; }
            .channelsBadges_S_Changelogs > svg { width: 24px; height: 24px; color: var(--interactive-normal); }
            .channelsBadges_S_Changelogs > svg:hover { color: var(--interactive-hover); }
            .channelsBadges_S_Legend { display: flex; flexDirection: row; justify-content: flex-end; margin-bottom: -10px; margin-right: 0px; margin-top: 10px; }
            .channelsBadges_S_Legend > div { display: flex; justify-content: flex-end; margin-right: 10px; color: var(--interactive-normal); font-family: var(--font-display); font-size: 10px; line-height: 12px; font-weight: 600; text-transform: uppercase; min-height: 10px; }
            .channelsBadges_S_Legend > div:nth-child(1) { margin-right: 11px; }
            .channelsBadges_S_Legend > div:nth-child(2) { margin-right: 12px; }
            .channelsBadges_S_Legend > div:nth-child(3) { margin-right: 13px; }
            .channelsBadges_S_Legend > div:nth-child(4) { margin-right: 10px; }
            .channelsBadges_S_Legend > div:nth-child(5) { margin-right: 6px; }
            .channelsBadges_S_Title { display: flex; align-items: center; color: #3e82e5; margin-bottom: 10px !important; font-size: 12px; margin-top: 5px !important; }
            .channelsBadges_S_Title:after { content: ""; height: 1px; flex: 1 1 auto; margin-left: 4px; opacity: 0.6; background-color: #3e82e5; }
            .channelsBadges_S_Title > span { margin-left: 0; text-transform: uppercase; }   
            .channelsBadges_S_Switch{position:absolute;opacity:0;width:100%;height:100%;border-radius:14px;top:0;left:0;margin:0}
            .channelsBadges_S_Switch[disabled]{cursor:not-allowed;pointer-events:none}
            .channelsBadges_S_container { position: relative; border-radius: 14px; width: 40px; height: 24px; }
        `;
    }

    /**
     * Starts the plugin by adding the necessary styles, loading the settings, and checking the version.
     */
    start() {
        BdApi.DOM.addStyle(this.meta.name, this.styles);
        this.loadCBsettings();
        this.checkVersion(true);
        this.AddtagChannels();
        this.setupObserver();
    }

    /**
     * Loads the ChannelsBadges plugin settings from local storage.
     * @function
     * @name loadCBsettings
     * @memberof module:ChannelsBadgesPlugin
     * @instance
     * @returns {void}
     */
    loadCBsettings() {
        this.CBsettings = BdApi.Data.load(this.meta.name, "CBsettings") || this.CBsettings;
        if (BdApi.Data.load(this.meta.name, "settings")) BdApi.Data.delete(this.meta.name, "settings");
        this.saveCBsettings();
    }

    /**
     * Saves the current CBsettings to local storage using the plugin name as the key.
     */
    saveCBsettings() {
        BdApi.Data.save(this.meta.name, "CBsettings", this.CBsettings);
    }

    /**
     * Stops the plugin by removing the style and disconnecting the observer.
     */
    stop() {
        BdApi.DOM.removeStyle(this.meta.name);
        this.disconnectObserver();
    }

    /**
     * Displays a modal with the current version and changelogs.
     * @param {string} currentVersion - The current version of the plugin.
     * @param {object} ModalComponents - The components used to create the modal.
     * @param {object} ModalActions - The actions used to open and close the modal.
     * @param {string[]} changelogs - An array of strings representing the changelogs.
     * @param {string} changelogsTitle - The title of the changelogs section.
     */
    modalVersion(currentVersion, ModalComponents, ModalActions, changelogs, changelogsTitle) {
        const MyModal = (closeCallback) => {
            return BdApi.React.createElement(ModalComponents.ModalRoot, {
                transitionState: 1,
                size: 'small',
                children: [
                    BdApi.React.createElement('div', { className: 'channelsBadges_v_Header' }, [
                        BdApi.React.createElement('div', { className: 'channelsBadges_v_FlexChild' }, [
                            BdApi.React.createElement('h1', { className: 'channelsBadges_v_Header_Title', children: `${this.meta.name}` }),
                            BdApi.React.createElement('div', { className: 'channelsBadges_v_Header_Version', children: `Version ${currentVersion}` }),
                        ]),
                        BdApi.React.createElement('button', { 'aria-label': 'Close', type: 'button', className: 'channelsBadges_v_FlexChild channelsBadges_v_Button', onClick: closeCallback }, [
                            BdApi.React.createElement('div', { className: '' }, [
                                BdApi.React.createElement('svg', { 'aria-hidden': 'true', role: 'img', className: '', width: '24', height: '24', viewBox: '0 0 24 24' }, [
                                    BdApi.React.createElement('path', { fill: 'currentColor', d: 'M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z' }),
                                ]),
                            ]),
                        ]),
                    ]),
                    BdApi.React.createElement('div', { className: 'content__96073 thin_b1c063' }, [
                        BdApi.React.createElement('div', { tabindex: 0, role: 'region' }, [
                            BdApi.React.createElement('h2', { className: 'channelsBadges_v_Map' }, [BdApi.React.createElement('span', { children: `${changelogsTitle}` })]),
                            BdApi.React.createElement('ul', { className: 'channelsBadges_v_Map_ul' }, [changelogs.map((log, index) => (BdApi.React.createElement('li', { key: index }, log.trim())))]),
                        ]),
                    ]),
                    BdApi.React.createElement('div', { className: 'channelsBadges_v_Footer', style: { flex: '0 0 auto' } }, [
                        BdApi.React.createElement('div', null, [
                            BdApi.React.createElement('a', { href: 'https://www.paypal.me/Sheiylanie', rel: 'noreferrer noopener', target: '_blank' }, [
                                BdApi.React.createElement('svg', { name: 'PayPal', width: '16', height: '16', viewBox: '0 0 24 24' }, [
                                    BdApi.React.createElement('path', { fill: 'currentColor', d: 'M 5.6863929,0 C 5.1806043,0 4.7507198,0.3656279 4.6704813,0.85995389 L 1.6795909,19.673995 c -0.058746,0.371103 0.2309887,0.706911 0.6092555,0.706911 h 4.4338638 l 1.1121097,-7.006437 -0.033522,0.22009 c 0.078805,-0.494326 0.5072079,-0.859954 1.0129965,-0.859954 h 2.1061586 c 4.139443,0 7.378419,-1.667588 8.325519,-6.4919233 0.02866,-0.1432829 0.07434,-0.4183163 0.07434,-0.4183163 C 19.589638,4.0390606 19.318112,2.8290903 18.345211,1.7301106 17.276361,0.5193702 15.342278,0 12.867737,0 Z M 21.516831,7.8139196 c -1.028771,4.7498274 -4.3124,7.2629664 -9.522166,7.2629664 H 10.107139 L 8.6962314,24 H 11.76 c 0.442744,0 0.820329,-0.319405 0.889104,-0.753552 l 0.03498,-0.189482 0.705454,-4.428033 0.04519,-0.244868 c 0.06878,-0.434148 0.446338,-0.753554 0.887649,-0.753554 h 0.559699 c 3.620757,0 6.455196,-1.457472 7.283371,-5.677153 0.332416,-1.693603 0.172401,-3.113533 -0.64861,-4.1394384 z' })
                                ]),
                            ]),
                            BdApi.React.createElement('div', { className: 'channelsBadges_v_Footer_Title', children: `Support me for more updates !` }),
                        ]),
                    ]),
                ]
            });
        };
        ModalActions.openModal((props) => { return MyModal(props.onClose); });
        this.CBsettings['version'] = currentVersion;
        BdApi.Data.save(this.meta.name, "CBsettings", this.CBsettings);
    }

    /**
     * Checks the version of the plugin and displays a modal with the changelog if there is a new version available.
     * @param {boolean} sys - Whether the check is being triggered by the system or manually by the user.
     */
    checkVersion(sys) {
        const currentVersion = this.meta.version;
        const previousVersion = BdApi.Data.load(this.meta.name, "CBsettings").version;
        const ModalComponents = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("ModalRoot"));
        const ModalActions = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("openModal", "updateModal"));
        const changelogsTitle = 'Updates & New Features';
        const changelogs = [
            `Enhancing the plugin code.`,
            `Plugin fully restructuring and integrated css style.`,
            `Added warning and error messages.`,
            `Added functionality for color picker.`,
            `Added functionality for emoji only.`,
            `Added functionality for text only.`,
            `Added functionality for reset color.`,
            `Added functionality for on/off.`,
        ];
        if (sys) {
            if (previousVersion && currentVersion !== previousVersion) this.modalVersion(currentVersion, ModalComponents, ModalActions, changelogs, changelogsTitle);
        } else {
            this.modalVersion(currentVersion, ModalComponents, ModalActions, changelogs, changelogsTitle);
        }
    }

    /**
     * Récupère un élément du DOM par son identifiant.
     * @param {string} id - L'identifiant de l'élément à récupérer.
     * @returns {HTMLElement} - L'élément du DOM correspondant à l'identifiant donné.
     */
    getById(id) { return document.getElementById(id); }

    /**
     * Sets attributes for an element with the given id.
     * @param {string} id - The id of the element to set attributes for.
     * @param {boolean} attributes - The attributes to set. If true, sets the fill color to "#3e82e5" and the d attribute to "M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z". If false, sets the fill color to "rgba(128, 132, 142, 1)" and the d attribute to "M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z".
     */
    setAttribute(id, attributes) {
        document.getElementById(`${id}1`).setAttribute('d', attributes ? "M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z" : "M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z");
        document.getElementById(`${id}1`).setAttribute('fill', attributes ? "#3e82e5" : "rgba(128, 132, 142, 1)");
        document.getElementById(`${id}2`).setAttribute('d', attributes ? "M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z" : "M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z");
        document.getElementById(`${id}2`).setAttribute('fill', attributes ? "#3e82e5" : "rgba(128, 132, 142, 1)");
    }

    /**
     * The SVG path data for the badges icons.
     * @type {string}
     */
    VOICE = "M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z";
    VOICE_CUT = "M15 12C15 12.0007 15 12.0013 15 12.002C15 12.553 14.551 13.002 14 13.002V15.002C15.654 15.002 17 13.657 17 12.002C17 12.0013 17 12.0007 17 12H15ZM19 12C19 12.0007 19 12.0013 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 12.0013 21 12.0007 21 12H19ZM10.293 3.29604C10.579 3.01004 11.009 2.92504 11.383 3.07904C11.757 3.23204 12 3.59904 12 4.00204V20.002C12 20.407 11.757 20.772 11.383 20.927C11.009 21.082 10.579 20.996 10.293 20.71L6 16.002H3C2.45 16.002 2 15.552 2 15.002V9.00204C2 8.45304 2.45 8.00204 3 8.00204H6L10.293 3.29604Z";
    VOICE_SECU = "M21.025 5V4C21.025 2.88 20.05 2 19 2C17.95 2 17 2.88 17 4V5C16.4477 5 16 5.44772 16 6V9C16 9.55228 16.4477 10 17 10H19H21C21.5523 10 22 9.55228 22 9V5.975C22 5.43652 21.5635 5 21.025 5ZM20 5H18V4C18 3.42857 18.4667 3 19 3C19.5333 3 20 3.42857 20 4V5Z";
    VOICE_WARN = "M19.8916 3.80204L22.2439 8.55654C22.5728 9.22119 22.0892 9.99999 21.3476 10L16.618 10C15.8746 10 15.3912 9.21769 15.7236 8.55279L18.1008 3.79829C18.4702 3.05951 19.5253 3.06172 19.8916 3.80204ZM18.4999 5H19.5V7.5H18.5L18.4999 5ZM18.4999 8.49887C18.4999 8.77589 18.724 9 19 9C19.276 9 19.5 8.77589 19.5 8.49887C19.5 8.22224 19.276 7.99773 19 7.99773C18.724 7.99773 18.4999 8.22224 18.4999 8.49887Z";
    FORUM = "M6.56929 14.6869H2.34375C1.97079 14.6869 1.61311 14.5387 1.34938 14.275C1.08566 14.0113 0.9375 13.6536 0.9375 13.2806V8.12437C0.9375 6.38389 1.6289 4.7147 2.85961 3.484C4.09032 2.25329 5.75951 1.56189 7.49999 1.56189C9.24047 1.56189 10.9097 2.25329 12.1404 3.484C12.6953 4.03895 13.1406 4.68307 13.4623 5.38267C14.9101 5.5973 16.2513 6.29124 17.2655 7.36251C18.4194 8.58133 19.0625 10.1959 19.0625 11.8744V17.0306C19.0625 17.4036 18.9144 17.7613 18.6506 18.025C18.3869 18.2887 18.0292 18.4369 17.6563 18.4369H12.5C11.1428 18.4369 9.81899 18.0162 8.71072 17.2328C7.7871 16.58 7.05103 15.7019 6.56929 14.6869ZM4.18544 4.80982C5.06451 3.93075 6.25679 3.43689 7.49999 3.43689C8.74319 3.43689 9.93549 3.93075 10.8146 4.80983C11.6936 5.6889 12.1875 6.88119 12.1875 8.12439C12.1875 9.36759 11.6936 10.5599 10.8146 11.439C9.93549 12.318 8.74321 12.8119 7.50001 12.8119H7.20268C7.19767 12.8118 7.19266 12.8118 7.18764 12.8119H2.8125V8.12438C2.8125 6.88118 3.30636 5.6889 4.18544 4.80982ZM8.672 14.5814C8.97763 15.0132 9.35591 15.3928 9.79299 15.7017C10.5847 16.2614 11.5305 16.5619 12.5 16.5619H17.1875V11.8744C17.1875 10.6755 16.7281 9.52219 15.9039 8.65159C15.3804 8.09865 14.735 7.68644 14.027 7.44246C14.0506 7.66798 14.0625 7.89557 14.0625 8.12439C14.0625 9.86487 13.3711 11.5341 12.1404 12.7648C11.1896 13.7156 9.97697 14.3445 8.672 14.5814Z";
    FORUM_CUT = "M13 4C13 3.66767 13.0405 3.3448 13.1169 3.03607C11.8881 2.28254 10.4651 1.87427 8.99999 1.87427C6.91141 1.87427 4.90838 2.70395 3.43153 4.1808C1.95469 5.65764 1.125 7.66067 1.125 9.74925V15.9368C1.125 16.3843 1.30279 16.8135 1.61926 17.13C1.93573 17.4465 2.36495 17.6243 2.8125 17.6243H7.88314C8.46123 18.8423 9.34451 19.896 10.4529 20.6794C11.7828 21.6195 13.3714 22.1242 15 22.1243H21.1875C21.6351 22.1243 22.0643 21.9465 22.3808 21.63C22.6972 21.3135 22.875 20.8843 22.875 20.4368V14.2492C22.875 13.3832 22.7323 12.5314 22.4596 11.7253C22.0074 11.9026 21.5151 12 21 12H20.1557C20.4625 12.7033 20.625 13.4682 20.625 14.2493V19.8743H15C13.8365 19.8743 12.7017 19.5136 11.7516 18.8421C11.2271 18.4713 10.7732 18.0159 10.4064 17.4977C11.9724 17.2135 13.4275 16.4587 14.5685 15.3177C15.5076 14.3786 16.185 13.2267 16.5538 11.9754C15.7646 11.8878 15.0447 11.5706 14.4624 11.0921C14.2192 12.0813 13.7097 12.9945 12.9775 13.7267C11.9226 14.7816 10.4919 15.3743 9.00001 15.3743H3.375V9.74925C3.375 8.25741 3.96763 6.82668 5.02252 5.77179C6.07741 4.7169 7.50815 4.12427 8.99999 4.12427C10.4918 4.12427 11.9226 4.7169 12.9775 5.77179L13 5.79444V4Z";
    FORUM_SECU = "M21.025 4V5C21.5635 5 22 5.43652 22 5.975V9C22 9.55228 21.5523 10 21 10H17C16.4477 10 16 9.55228 16 9V6C16 5.44772 16.4477 5 17 5V4C17 2.88 17.95 2 19 2C20.05 2 21.025 2.88 21.025 4ZM18 5H20V4C20 3.42857 19.5333 3 19 3C18.4667 3 18 3.42857 18 4V5Z";
    FORUM_WARN = "M22.2821 7.55654L19.9173 2.80204C19.5491 2.06172 18.4885 2.05951 18.1172 2.79829L15.7274 7.55279C15.3932 8.21769 15.8793 9 16.6265 9L21.3811 9C22.1265 8.99999 22.6126 8.22119 22.2821 7.55654ZM19.5237 4H18.5184L18.5184 6.5H19.5237V4ZM19.021 8C18.7436 8 18.5184 7.77589 18.5184 7.49887C18.5184 7.22224 18.7436 6.99773 19.021 6.99773C19.2985 6.99773 19.5237 7.22224 19.5237 7.49887C19.5237 7.77589 19.2985 8 19.021 8Z";
    ADS = "M19.1 4V5.12659L4.85 8.26447V18.1176C4.85 18.5496 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5242L19.1 17.9304V19.0588H21V4H19.1ZM9.2181 17.9944L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9944Z";
    ADS_CUT = "M22.545 4.87988V5.87988H23.28C23.4126 5.87988 23.52 5.98733 23.52 6.11988V10.6399C23.52 10.7724 23.4126 10.8799 23.28 10.8799H17.76C17.6275 10.8799 17.52 10.7724 17.52 10.6399V6.11988C17.52 5.98733 17.6275 5.87988 17.76 5.87988H18.52V4.87988C18.52 3.75988 19.47 2.87988 20.52 2.87988C21.57 2.87988 22.545 3.75988 22.545 4.87988ZM19.52 5.87988H21.52V4.87988C21.52 4.30845 21.0534 3.87988 20.52 3.87988C19.9867 3.87988 19.52 4.30845 19.52 4.87988V5.87988Z";
    ADS_CUT_W = "M20.4683 4.76211L22.8094 9.51661C23.1366 10.1813 22.6554 10.9601 21.9174 10.9601L17.2104 10.9601C16.4706 10.9601 15.9894 10.1778 16.3203 9.51286L18.6861 4.75836C19.0537 4.01957 20.1037 4.02179 20.4683 4.76211ZM19.0833 5.96007H20.0786V8.46007H19.0834L19.0833 5.96007ZM19.0833 9.45894C19.0833 9.73596 19.3063 9.96007 19.5809 9.96007C19.8556 9.96007 20.0786 9.73596 20.0786 9.45894C20.0786 9.18231 19.8556 8.9578 19.5809 8.9578C19.3063 8.9578 19.0833 9.18231 19.0833 9.45894Z";
    ADS_SECU = "M4.85 8.26429L15.84 5.84426V10.5599C15.84 11.6202 16.6996 12.4799 17.76 12.4799H21V19.0586H19.1V17.9302L12.7065 16.524L10.36 19.6233C10.1776 19.8633 9.89545 19.9998 9.6 19.9998C9.524 19.9998 9.4461 19.9904 9.3701 19.9725L5.5701 19.0313C5.1464 18.925 4.85 18.5495 4.85 18.1175V8.26429ZM9.2181 17.9942L6.75 17.3824V15.2111L10.6706 16.0751L9.2181 17.9942Z";
    ADS_WARN = "M4.85 8.26445L16.7165 5.65143L15.1067 9.30608C14.5477 10.5751 15.4771 12 16.8638 12H21V19.0588H19.1V17.9303L12.7065 16.5242L10.36 19.6235C10.1776 19.8635 9.89545 20 9.6 20C9.524 20 9.4461 19.9906 9.3701 19.9727L5.5701 19.0315C5.1464 18.9252 4.85 18.5496 4.85 18.1176V8.26445ZM9.2181 17.9943L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9943Z";
    RULE = "M33 34.5833V7.49998H35V36.6666H9C6.791 36.6666 5 34.801 5 32.5V7.49998C5 5.19894 6.791 3.33331 9 3.33331H31V30.4166H9C7.8955 30.4166 7 31.3485 7 32.5C7 33.6515 7.8955 34.5833 9 34.5833H33ZM23.9718 9.99998L15.8889 17.9915L12.7086 14.8441L10 17.5058L15.8885 23.3333L26.6667 12.6669L23.9718 9.99998Z";
    NSFW = "M19.8914 3.80204L22.2438 8.55654C22.5726 9.22119 22.0891 9.99999 21.3475 10L16.6179 10C15.8745 10 15.391 9.21769 15.7235 8.55279L18.1007 3.79829C18.4701 3.05951 19.5251 3.06172 19.8914 3.80204ZM18.4998 5H19.4999V7.5H18.4999L18.4998 5ZM18.4998 8.49887C18.4998 8.77589 18.7238 9 18.9998 9C19.2759 9 19.4999 8.77589 19.4999 8.49887C19.4999 8.22224 19.2759 7.99773 18.9998 7.99773C18.7238 7.99773 18.4998 8.22224 18.4998 8.49887Z";
    TEXT = "M14 8C14 7.44772 13.5523 7 13 7H9.76001L10.3657 3.58738C10.4201 3.28107 10.1845 3 9.87344 3H8.88907C8.64664 3 8.43914 3.17391 8.39677 3.41262L7.76001 7H4.18011C3.93722 7 3.72946 7.17456 3.68759 7.41381L3.51259 8.41381C3.45905 8.71977 3.69449 9 4.00511 9H7.41001L6.35001 15H2.77011C2.52722 15 2.31946 15.1746 2.27759 15.4138L2.10259 16.4138C2.04905 16.7198 2.28449 17 2.59511 17H6.00001L5.39427 20.4126C5.3399 20.7189 5.57547 21 5.88657 21H6.87094C7.11337 21 7.32088 20.8261 7.36325 20.5874L8.00001 17H14L13.3943 20.4126C13.3399 20.7189 13.5755 21 13.8866 21H14.8709C15.1134 21 15.3209 20.8261 15.3632 20.5874L16 17H19.5799C19.8228 17 20.0306 16.8254 20.0724 16.5862L20.2474 15.5862C20.301 15.2802 20.0655 15 19.7549 15H16.35L16.6758 13.1558C16.7823 12.5529 16.3186 12 15.7063 12C15.2286 12 14.8199 12.3429 14.7368 12.8133L14.3504 15H8.35045L9.41045 9H13C13.5523 9 14 8.55228 14 8Z";
    NSFW1 = "M20.4683 4.76211L22.8094 9.51661C23.1366 10.1813 22.6554 10.9601 21.9174 10.9601L17.2104 10.9601C16.4706 10.9601 15.9894 10.1778 16.3203 9.51286L18.6861 4.75836C19.0537 4.01957 20.1037 4.02179 20.4683 4.76211ZM19.0833 5.96007H20.0786V8.46007H19.0834L19.0833 5.96007ZM19.0833 9.45894C19.0833 9.73596 19.3063 9.96007 19.5809 9.96007C19.8556 9.96007 20.0786 9.73596 20.0786 9.45894C20.0786 9.18231 19.8556 8.9578 19.5809 8.9578C19.3063 8.9578 19.0833 9.18231 19.0833 9.45894Z";
    NSFW2 = "M22.2821 7.55654L19.9173 2.80204C19.5491 2.06172 18.4885 2.05951 18.1172 2.79829L15.7274 7.55279C15.3932 8.21769 15.8793 9 16.6265 9L21.3811 9C22.1265 8.99999 22.6126 8.22119 22.2821 7.55654ZM19.5237 4H18.5184L18.5184 6.5H19.5237V4ZM19.021 8C18.7436 8 18.5184 7.77589 18.5184 7.49887C18.5184 7.22224 18.7436 6.99773 19.021 6.99773C19.2985 6.99773 19.5237 7.22224 19.5237 7.49887C19.5237 7.77589 19.2985 8 19.021 8Z";
    NSFW3 = "M19.8914 3.80204L22.2438 8.55654C22.5726 9.22119 22.0891 9.99999 21.3475 10L16.6179 10C15.8745 10 15.391 9.21769 15.7235 8.55279L18.1007 3.79829C18.4701 3.05951 19.5251 3.06172 19.8914 3.80204ZM18.4998 5H19.4999V7.5H18.4999L18.4998 5ZM18.4998 8.49887C18.4998 8.77589 18.7238 9 18.9998 9C19.2759 9 19.4999 8.77589 19.4999 8.49887C19.4999 8.22224 19.2759 7.99773 18.9998 7.99773C18.7238 7.99773 18.4998 8.22224 18.4998 8.49887Z";
    NSFW4 = "M19.8916 3.80204L22.2439 8.55654C22.5728 9.22119 22.0892 9.99999 21.3476 10L16.618 10C15.8746 10 15.3912 9.21769 15.7236 8.55279L18.1008 3.79829C18.4702 3.05951 19.5253 3.06172 19.8916 3.80204ZM18.4999 5H19.5V7.5H18.5L18.4999 5ZM18.4999 8.49887C18.4999 8.77589 18.724 9 19 9C19.276 9 19.5 8.77589 19.5 8.49887C19.5 8.22224 19.276 7.99773 19 7.99773C18.724 7.99773 18.4999 8.22224 18.4999 8.49887Z";

    /**
     * Array of objects representing different channel badges.
     * @typedef {Object[]} BadgeListes
     * @property {string} setting - The setting for the badge.
     * @property {string} label - The label for the badge.
     * @property {string} className - The class name for the badge.
     * @property {string} color - The color for the badge.
     * @property {boolean} colorPicker - Whether or not the badge has a color picker.
     * @property {boolean} colorReset - Whether or not the badge can be reset to its default color.
     * @property {string} emoji - The emoji for the badge.
     * @property {string} text - The text for the badge.
     * @property {string} icon - The icon for the badge.
     */
    BadgeListes = [
        { svgContent: [this.NSFW1, this.NSFW2, this.NSFW3, this.NSFW4], setting: "nsfw", label: "NSFW", className: "channelsBadge_nsfw", tagName: 'NSFW', color: "var(--status-danger)", colorPicker: true, colorReset: true, emoji: "emoji", secureEmoji: '🔒', text: "text", icon: "🔞" },
        { svgContent: [this.VOICE, this.VOICE_CUT], setting: "voice", label: "VOICE", className: "channelsBadge_Voice", tagName: 'VOICE', color: "#1ABC9C", colorPicker: true, colorReset: true, emoji: "emoji", text: "text", icon: "🎤", secureEmoji: '🔒', warnTag: this.VOICE_WARN, secureTag: this.VOICE_SECU },
        { svgContent: [this.FORUM, this.FORUM_CUT], setting: "forum", label: "FORUM", className: "channelsBadge_forum", tagName: 'FORUM', color: "#206694", colorPicker: true, colorReset: true, emoji: "emoji", text: "text", icon: "📰", secureEmoji: '🔒', warnTag: this.FORUM_WARN, secureTag: this.FORUM_SECU },
        { svgContent: [this.RULE], setting: "rule", label: "RULE", className: "channelsBadge_rule", tagName: 'RULE', color: "#FF9B2B", colorPicker: true, colorReset: true, emoji: "emoji", text: "text", secureEmoji: '🔒', icon: "📋" },
        { svgContent: [this.ADS, this.ADS_CUT, this.ADS_CUT_W], setting: "ads", label: "ADS", className: "channelsBadge_ads", tagName: 'ADS', color: "#FF2BC2", colorPicker: true, colorReset: true, emoji: "emoji", text: "text", secureEmoji: '🔒', warnTag: this.ADS_WARN, secureTag: this.ADS_SECU, icon: "📝" },
    ];

    /**
     * Creates a badge element with the given parameters.
     * @param {Object} CB - An object containing the badge icon and label.
     * @param {string} badgeId - The ID of the badge element.
     * @param {Object} customStyle - An object containing custom styles for the badge element.
     * @param {ReactNode} children - The child elements of the badge element.
     * @returns {ReactNode} The created badge element.
     */
    createBadgeElement(CB, badgeId, customStyle, children) {
        return BdApi.React.createElement('span', {
            id: badgeId,
            style: { height: "15px", padding: "0 4px", marginTop: "3px !important", borderRadius: "3px", fontSize: ".625rem", textTransform: "uppercase", verticalAlign: "top", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: "0", textIdent: "0", color: "var(--white-500)", width: customStyle.width || "50px", backgroundColor: this.CBsettings[CB.setting][CB.setting + "_color"] },
            children: BdApi.React.createElement('span', {
                id: `${badgeId}_children`,
                style: { fontSize: "10px", lineHeight: "15px", position: "relative", fontWeight: "500", verticalAlign: "top" },
                children: children || `${CB.icon} ${CB.label}`
            })
        });
    }

    /**
     * Reloads the badge element with the given settings.
     * @param {Object} CB - An object containing the badge settings.
     */
    reloadBadgeElement(CB) {
        const badgeElement = document.getElementById(CB.setting);
        const badgeChildrenElement = document.getElementById(`${CB.setting}_children`);
        if (badgeElement && badgeChildrenElement) {
            let newWidth = "50px";
            if (this.CBsettings[CB.setting][CB.emoji] && !this.CBsettings[CB.setting][CB.text]) newWidth = "13px";
            else if (!this.CBsettings[CB.setting][CB.emoji] && this.CBsettings[CB.setting][CB.text]) newWidth = "33px";
            badgeElement.style.width = newWidth;
            badgeElement.style.backgroundColor = this.CBsettings[CB.setting][CB.setting + "_color"];
            let newContent = `${CB.icon} ${CB.label}`;
            if (this.CBsettings[CB.setting][CB.emoji] && !this.CBsettings[CB.setting][CB.text]) newContent = CB.icon;
            else if (!this.CBsettings[CB.setting][CB.emoji] && this.CBsettings[CB.setting][CB.text]) newContent = CB.label;
            badgeChildrenElement.textContent = newContent;
        }
    }

    /**
     * Returns the settings panel for the ChannelsBadges plugin.
     * @returns {React.ReactElement} The settings panel as a React element.
     */
    getSettingsPanel() {
        const changelogButton = BdApi.React.createElement('div', { className: 'channelsBadges_S_Changelogs', role: 'button', tabindex: '0', onClick: () => this.checkVersion(false) }, [
            BdApi.React.createElement('svg', { name: 'ChangeLog', viewBox: '0 0 24 24' }, [
                BdApi.React.createElement('path', { fill: 'currentColor', d: 'M 12.994141,2 C 7.4665894,2 3,6.4779848 3,12 H 1 L 4.0996094,15.408203 7.2226562,12 h -2 c 0,-4.2942525 3.4830736,-7.7773438 7.7773438,-7.7773438 4.294251,0 7.777344,3.4830913 7.777344,7.7773438 0,4.294253 -3.483093,7.779297 -7.777344,7.779297 -2.149914,0 -4.0886771,-0.879641 -5.4941406,-2.285156 L 5.9335938,19.066406 C 7.7390932,20.877425 10.233155,22 12.994141,22 18.521728,22 23,17.522015 23,12 23,6.4779858 18.521728,2 12.994141,2 Z m -1.496094,4.4375 v 6.632812 l 5.675781,3.367188 0.953125,-1.611328 -4.640625,-2.751953 V 6.4375 Z' })
            ]),
        ]);
        const badgesLegend = BdApi.React.createElement('div', { className: 'channelsBadges_S_Legend', style: {} }, [BdApi.React.createElement("div", { children: "Reset" }), BdApi.React.createElement("div", { children: "Color" }), BdApi.React.createElement("div", { children: "Text" }), BdApi.React.createElement("div", { children: "Emoji" }), BdApi.React.createElement("div", { children: "On/Off" }),]);
        const badgesTitle = BdApi.React.createElement('h2', { className: 'channelsBadges_S_Title' }, [BdApi.React.createElement('span', { children: `⚙️ Badges` })]);
        const badgesListes = this.BadgeListes.map(CB =>
            BdApi.React.createElement("div", { style: { border: "1px solid var(--background-tertiary)", padding: "10px", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", borderColor: "var(--background-tertiary)" } },
                (!this.CBsettings[CB.setting][CB.emoji] && !this.CBsettings[CB.setting][CB.text]) ? this.createBadgeElement(CB, CB.setting, { width: "50px" }, `${CB.icon} ${CB.label}`) : "",
                (this.CBsettings[CB.setting][CB.emoji] && this.CBsettings[CB.setting][CB.text]) ? this.createBadgeElement(CB, CB.setting, { width: "50px" }, `${CB.icon} ${CB.label}`) : "",
                (this.CBsettings[CB.setting][CB.emoji] && !this.CBsettings[CB.setting][CB.text]) ? this.createBadgeElement(CB, CB.setting, { width: "13px" }, `${CB.icon}`) : "",
                (!this.CBsettings[CB.setting][CB.emoji] && this.CBsettings[CB.setting][CB.text]) ? this.createBadgeElement(CB, CB.setting, { width: "33px" }, `${CB.label}`) : "",
                BdApi.React.createElement('div', { style: { display: "flex", flexDirection: "row", justifyContent: "flex-end" } }, [
                    BdApi.React.createElement("button", {
                        id: `${CB.setting}TagSettingreset`, style: { marginTop: "1px", borderRadius: "50%", height: "20px", width: "20px", outline: "none", border: "2px solid rgba(0, 0, 0, 0.1)", alignItems: "center", justifyContent: "center", backgroundColor: `${CB.color}`, cursor: this.CBsettings[CB.setting][CB.setting] ? "pointer" : "not-allowed" },
                        onClick: () => {
                            if (this.CBsettings[CB.setting][CB.setting]) {
                                BdApi.UI.showToast("Bagde (Voice) : Reset Color", { type: "info" });
                                this.CBsettings[CB.setting][CB.setting + "_color"] = CB.color;
                                document.getElementById(`${CB.setting}_color`).style.fill = CB.color;
                                this.saveCBsettings();
                                this.reloadBadgeElement(CB);
                                this.AddtagChannels();
                            }
                        }
                    }, [
                        BdApi.React.createElement('svg', { width: '20', height: '20', viewBox: '0 0 40 40', style: { marginLeft: "-4px", marginTop: "1px", color: "white" } }, [
                            BdApi.React.createElement('path', { fill: 'currentColor', d: 'M23.85,15.72l-3.51,3.51c-.49,.49-1.14,.76-1.84,.76s-1.35-.27-1.84-.76l-3.48-3.48,2.12-2.12,1.7,1.7V7.5c0-.28-.22-.5-.5-.5h-4l-3-3h7c1.93,0,3.5,1.57,3.5,3.5v7.84l1.73-1.73,2.12,2.12Zm-16.35,1.28c-.28,0-.5-.22-.5-.5v-7.84l1.7,1.7,2.12-2.12-3.48-3.48c-.98-.98-2.7-.98-3.68,0L.15,8.28l2.12,2.12,1.73-1.73v7.84c0,1.93,1.57,3.5,3.5,3.5h7l-3-3H7.5Z' })
                        ]),
                    ]),
                    BdApi.React.createElement('div', { className: "channelsBadges_S_container", style: { width: "30px", marginLeft: "16px" } }, [
                        BdApi.React.createElement('svg', { className: "", viewBox: '0 0 28 20', preserveAspectRatio: "xMinYMid meet", ariaHidden: "true", style: {} }, [
                            BdApi.React.createElement('rect', { id: `${CB.setting}_color`, fill: this.CBsettings[CB.setting][CB.setting + "_color"], x: "4", y: "0", width: "20", height: "20", rx: "10" }),
                        ]),
                        BdApi.React.createElement("input", {
                            type: "color", id: `${CB.setting}TagSettingcolor`, disabled: !this.CBsettings[CB.setting][CB.setting], style: { position: "absolute", top: 0, left: 0, width: "30px", opacity: 0, cursor: this.CBsettings[CB.setting][CB.setting] ? "pointer" : "not-allowed" },
                            onInput: (event) => {
                                if (this.CBsettings[CB.setting][CB.setting]) {
                                    document.getElementById(`${CB.setting}_color`).style.fill = event.target.value;
                                    BdApi.UI.showToast(`Bagde (${CB.label}) : Change Color ${event.target.value}`, { type: "info" });
                                    this.CBsettings[CB.setting][CB.setting + "_color"] = event.target.value;
                                    this.saveCBsettings();
                                    this.reloadBadgeElement(CB);
                                    this.AddtagChannels();
                                }
                            }
                        }),
                    ]),
                    BdApi.React.createElement('div', { className: "channelsBadges_S_container", style: { width: "30px", marginLeft: "10px" } }, [
                        BdApi.React.createElement('svg', { className: "", viewBox: '0 0 28 20', preserveAspectRatio: "xMinYMid meet", ariaHidden: "true", style: {} }, [
                            BdApi.React.createElement('rect', { fill: "white", x: "4", y: "0", width: "20", height: "20", rx: "10" }),
                            BdApi.React.createElement('svg', { viewBox: '0 0 20 20', fill: "none" }, [
                                BdApi.React.createElement('path', { id: `${CB.setting}switchtext1`, fill: this.CBsettings[CB.setting][CB.text] ? "#3e82e5" : "rgba(128, 132, 142, 1)", d: this.CBsettings[CB.setting][CB.text] ? "M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z" : "M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z" }),
                                BdApi.React.createElement('path', { id: `${CB.setting}switchtext2`, fill: this.CBsettings[CB.setting][CB.text] ? "#3e82e5" : "rgba(128, 132, 142, 1)", d: this.CBsettings[CB.setting][CB.text] ? "M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z" : "M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z" }),
                            ]),
                        ]),
                        BdApi.React.createElement("input", {
                            type: "checkbox", id: `${CB.setting}TagSettingtext`, checked: true, className: "channelsBadges_S_Switch", style: { cursor: this.CBsettings[CB.setting][CB.setting] ? "pointer" : "not-allowed" },
                            onClick: (e) => {
                                if (this.CBsettings[CB.setting][CB.setting]) {
                                    if (this.CBsettings[CB.setting][CB.emoji] === false) {
                                        BdApi.UI.showToast(`Cannot disable Text when Emoji is already disabled for Badge (${CB.label})`, { type: "error" });
                                    } else {
                                        switch (this.CBsettings[CB.setting][CB.text]) {
                                            case true: this.CBsettings[CB.setting][CB.text] = false; BdApi.UI.showToast(`Bagde (${CB.label}) : Disabled Text`, { type: "info" }); break;
                                            case false: this.CBsettings[CB.setting][CB.text] = true; BdApi.UI.showToast(`Bagde (${CB.label}) : Enabled Text`, { type: "success" }); break;
                                        }
                                        this.setAttribute(`${CB.setting}switchtext`, this.CBsettings[CB.setting][CB.text]);
                                        this.saveCBsettings();
                                        this.reloadBadgeElement(CB);
                                        this.AddtagChannels();
                                    }
                                }
                            },
                        }),
                    ]),
                    BdApi.React.createElement('div', { className: "channelsBadges_S_container", style: { width: "30px", marginLeft: "10px" } }, [
                        BdApi.React.createElement('svg', { className: "", viewBox: '0 0 28 20', preserveAspectRatio: "xMinYMid meet", ariaHidden: "true", style: {} }, [
                            BdApi.React.createElement('rect', { fill: "white", x: "4", y: "0", width: "20", height: "20", rx: "10" }),
                            BdApi.React.createElement('svg', { viewBox: '0 0 20 20', fill: "none" }, [
                                BdApi.React.createElement('path', { id: `${CB.setting}switchemoji1`, fill: this.CBsettings[CB.setting][CB.emoji] ? "#3e82e5" : "rgba(128, 132, 142, 1)", d: this.CBsettings[CB.setting][CB.emoji] ? "M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z" : "M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z" }),
                                BdApi.React.createElement('path', { id: `${CB.setting}switchemoji2`, fill: this.CBsettings[CB.setting][CB.emoji] ? "#3e82e5" : "rgba(128, 132, 142, 1)", d: this.CBsettings[CB.setting][CB.emoji] ? "M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z" : "M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z" }),
                            ]),
                        ]),
                        BdApi.React.createElement("input", {
                            type: "checkbox", id: `${CB.setting}TagSettingemoji`, checked: true, className: "channelsBadges_S_Switch", style: { cursor: this.CBsettings[CB.setting][CB.setting] ? "pointer" : "not-allowed" },
                            onClick: (e) => {
                                if (this.CBsettings[CB.setting][CB.setting]) {
                                    if (this.CBsettings[CB.setting][CB.text] === false) {
                                        BdApi.UI.showToast(`Cannot disable Emoji when Text is already disabled for Badge (${CB.label})`, { type: "error" });
                                    } else {
                                        switch (this.CBsettings[CB.setting][CB.emoji]) {
                                            case true: this.CBsettings[CB.setting][CB.emoji] = false; BdApi.UI.showToast(`Bagde (${CB.label}) : Disabled Emoji`, { type: "info" }); break;
                                            case false: this.CBsettings[CB.setting][CB.emoji] = true; BdApi.UI.showToast(`Bagde (${CB.label}) : Enabled Emoji`, { type: "success" }); break;
                                        }
                                        this.setAttribute(`${CB.setting}switchemoji`, this.CBsettings[CB.setting][CB.emoji]);
                                        this.saveCBsettings();
                                        this.reloadBadgeElement(CB);
                                        this.AddtagChannels();
                                    }
                                }
                            },
                        }),
                    ]),
                    BdApi.React.createElement('div', { className: "channelsBadges_S_container", style: { width: "30px", marginLeft: "10px" } }, [
                        BdApi.React.createElement('svg', { className: "", viewBox: '0 0 28 20', preserveAspectRatio: "xMinYMid meet", ariaHidden: "true", style: {} }, [
                            BdApi.React.createElement('rect', { fill: "white", x: "4", y: "0", width: "20", height: "20", rx: "10" }),
                            BdApi.React.createElement('svg', { viewBox: '0 0 20 20', fill: "none" }, [
                                BdApi.React.createElement('path', { id: `${CB.setting}switchsetting1`, fill: this.CBsettings[CB.setting][CB.setting] ? "#3e82e5" : "rgba(128, 132, 142, 1)", d: this.CBsettings[CB.setting][CB.setting] ? "M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z" : "M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z" }),
                                BdApi.React.createElement('path', { id: `${CB.setting}switchsetting2`, fill: this.CBsettings[CB.setting][CB.setting] ? "#3e82e5" : "rgba(128, 132, 142, 1)", d: this.CBsettings[CB.setting][CB.setting] ? "M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z" : "M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z" }),
                            ]),
                        ]),
                        BdApi.React.createElement("input", {
                            type: "checkbox", id: `${CB.setting}TagSettingsetting`, checked: true, className: "channelsBadges_S_Switch", style: { cursor: "pointer" },
                            onClick: (e) => {
                                const isEnabled = this.CBsettings[CB.setting][CB.setting];
                                this.CBsettings[CB.setting][CB.setting] = !isEnabled;
                                BdApi.UI.showToast(`Badge (${CB.label}) : ${isEnabled ? 'Disabled' : 'Enabled'}`, { type: isEnabled ? "info" : "success" });
                                const elementsToUpdate = ['emoji', 'text', 'reset', 'color'].map(suffix => this.getById(`${CB.setting}TagSetting${suffix}`));
                                elementsToUpdate.forEach(element => {
                                    element.style.cursor = isEnabled ? "not-allowed" : "pointer";
                                    if (element.id.includes('color')) element.disabled = isEnabled;
                                });
                                this.setAttribute(`${CB.setting}switchsetting`, !isEnabled);
                                this.saveCBsettings();
                                this.AddtagChannels();
                            },
                        }),
                    ]),
                ]),
            ),
        );
        return [changelogButton, badgesLegend, badgesTitle, badgesListes];
    }

    /**
     * Adds tags to the channel list items based on the BadgeListes array and CBsettings object.
     */
    AddtagChannels() {
        this.BadgeListes.forEach(tagClass => {
            const elements = document.querySelectorAll(`.${tagClass.className}`);
            elements.forEach(element => {
                element.parentNode.removeChild(element);
            });
        });
        const channelListItems = document.querySelectorAll('.containerDefault__3187b');
        channelListItems.forEach(item => {
            const svgElement = item.querySelector('svg'); if (!svgElement) return;
            const svgHTML = svgElement.innerHTML;
            const channelChildrenElement = item.querySelector('.children_a486f8'); if (!channelChildrenElement) return;
            this.BadgeListes.forEach(tag => {
                const isAlreadyTag = item.querySelector(`.${tag.className}`);
                const isSvgContainsTag = tag.svgContent.some(content => svgHTML.includes(content));
                const isTagEnabled = this.CBsettings[tag.tagName.toLowerCase()][tag.tagName.toLowerCase()];
                const isSecureTag = tag.secureTag && svgHTML.includes(tag.secureTag);
                let tagElementHtml;
                const tagElement = document.createElement('div');
                tagElement.className = `${tag.className} iconBase-2G48Fc`;
                const emoji = isSecureTag ? tag.secureEmoji : tag.icon;
                if (isSvgContainsTag && !isAlreadyTag && isTagEnabled) {
                    if (this.CBsettings[tag.setting][tag.setting]) {
                        item.addEventListener('mouseover', function () { const badges = this.querySelectorAll(`.${tag.className}`); badges.forEach(badge => badge.style.display = 'none'); });
                        item.addEventListener('mouseout', function () { const badges = this.querySelectorAll(`.${tag.className}`); badges.forEach(badge => badge.style.display = 'inline-flex'); });
                        tagElementHtml = `
                        <div style="background-color: ${this.CBsettings[tag.setting][tag.setting + "_color"]}; margin-right:5px; height: 15px; padding: 0 4px; margin-top: 3px !important; border-radius: 3px; text-transform: uppercase; vertical-align: top; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; text-ident: 0; color: var(--white-500);">
                            <span style="font-size: 10px; line-height: 15px; position: relative; vertical-align: top; padding: 0 4px; font-weight: 600">
                                ${(!this.CBsettings[tag.setting][tag.emoji] && !this.CBsettings[tag.setting][tag.text]) ? `${emoji} ${tag.label}` : ""}
                                ${(this.CBsettings[tag.setting][tag.emoji] && this.CBsettings[tag.setting][tag.text]) ? `${emoji} ${tag.label}` : ""}
                                ${(this.CBsettings[tag.setting][tag.emoji] && !this.CBsettings[tag.setting][tag.text]) ? `${emoji}` : ""}
                                ${(!this.CBsettings[tag.setting][tag.emoji] && this.CBsettings[tag.setting][tag.text]) ? `${tag.label}` : ""}
                            </span>
                        </div>`;
                        tagElement.innerHTML = tagElementHtml;
                        channelChildrenElement.appendChild(tagElement);
                    }
                }
            });
        });
    }

    /**
     * Sets up a MutationObserver to listen for changes in the document and calls AddtagChannels() if certain conditions are met.
     */
    setupObserver() {
        this.observer = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].classList && (mutation.addedNodes[0].classList.contains('listItem_fa7b36') || mutation.addedNodes[0].classList.contains('containerDefault__3187b'))) {
                    this.AddtagChannels();
                }
            }
        });
        this.observer.observe(document, { attributes: true, childList: true, subtree: true });
    }
    disconnectObserver() { if (this.observer) this.observer.disconnect(); }

}

module.exports = ChannelsBadges;