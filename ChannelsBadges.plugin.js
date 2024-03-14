/**
 * @name ChannelsBadges
 * @author Sheiylanie
 * @authorId 183948625368317952
 * @description Add Voice | Forum | Nsfw | Rule | Ads badges to channels.
 * @version 1.1.7
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
            version: "1.1.7",
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
        const changelogsTitle = 'Update';
        const changelogs = [
            `iconBase-2G48Fc >  iconBase_de0cd6`,
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
    VOICE = "M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z";
    VOICE_CUT = "M11 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-.06a1 1 0 0 1-.74-.32L5.92 17H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.92l4.28-4.68a1 1 0 0 1 .74-.32H11ZM20.5 12c-.28 0-.5.22-.52.5a7 7 0 0 1-5.13 6.25c-.48.13-.85.55-.85 1.05v.03c0 .6.52 1.06 1.1.92a9 9 0 0 0 6.89-8.25.48.48 0 0 0-.49-.5h-1ZM16.5 12c-.28 0-.5.23-.54.5a3 3 0 0 1-1.33 2.02c-.35.23-.63.6-.63 1.02v.14c0 .63.59 1.1 1.16.83a5 5 0 0 0 2.82-4.01c.02-.28-.2-.5-.48-.5h-1Z";
    VOICE_SECU = "M16 4h.5v-.5a2.5 2.5 0 0 1 5 0V4h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4-.5V4h-2v-.5a1 1 0 1 1 2 0Z";
    VOICE_WARN = "M19.8916 3.80204L22.2439 8.55654C22.5728 9.22119 22.0892 9.99999 21.3476 10L16.618 10C15.8746 10 15.3912 9.21769 15.7236 8.55279L18.1008 3.79829C18.4702 3.05951 19.5253 3.06172 19.8916 3.80204ZM18.4999 5H19.5V7.5H18.5L18.4999 5ZM18.4999 8.49887C18.4999 8.77589 18.724 9 19 9C19.276 9 19.5 8.77589 19.5 8.49887C19.5 8.22224 19.276 7.99773 19 7.99773C18.724 7.99773 18.4999 8.22224 18.4999 8.49887Z";
    FORUM = "M18.91 12.98a5.45 5.45 0 0 1 2.18 6.2c-.1.33-.09.68.1.96l.83 1.32a1 1 0 0 1-.84 1.54h-5.5A5.6 5.6 0 0 1 10 17.5a5.6 5.6 0 0 1 5.68-5.5c1.2 0 2.32.36 3.23.98Z";
    FORUM_CUT = "M13.58 3.23c.24-.33.16-.86-.24-.96C12.59 2.1 11.8 2 11 2c-4.97 0-9 3.58-9 8 0 1.5.47 2.91 1.28 4.11.14.21.12.49-.06.67l-1.51 1.51A1 1 0 0 0 2.4 18h5.1a.5.5 0 0 0 .49-.5c0-3.17 2-5.82 4.77-6.94.29-.11.43-.45.34-.75A3 3 0 0 1 13 9V5c0-.66.22-1.28.58-1.77ZM18.91 12.98a5.45 5.45 0 0 1 2.18 6.2c-.1.33-.09.68.1.96l.83 1.32a1 1 0 0 1-.84 1.54h-5.5A5.6 5.6 0 0 1 10 17.5a5.6 5.6 0 0 1 5.68-5.5c1.2 0 2.32.36 3.23.98Z";
    FORUM_SECU = "M16 4h.5v-.5a2.5 2.5 0 0 1 5 0V4h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4-.5V4h-2v-.5a1 1 0 1 1 2 0Z";
    FORUM_WARN = "M14.8 3.34a.48.48 0 0 0-.24-.69A9.94 9.94 0 0 0 11 2c-4.97 0-9 3.58-9 8 0 1.5.47 2.91 1.28 4.11.14.21.12.49-.06.67l-1.51 1.51A1 1 0 0 0 2.4 18h5.1a.5.5 0 0 0 .49-.5c0-2.86 1.62-5.3 3.97-6.56.28-.15.38-.51.25-.8a2.87 2.87 0 0 1 .18-2.61l2.4-4.19ZM18.91 12.98a5.45 5.45 0 0 1 2.18 6.2c-.1.33-.09.68.1.96l.83 1.32a1 1 0 0 1-.84 1.54h-5.5A5.6 5.6 0 0 1 10 17.5a5.6 5.6 0 0 1 5.68-5.5c1.2 0 2.32.36 3.23.98Z"; 
    ADS = "M19.56 2a3 3 0 0 0-2.46 1.28 3.85 3.85 0 0 1-1.86 1.42l-8.9 3.18a.5.5 0 0 0-.34.47v10.09a3 3 0 0 0 2.27 2.9l.62.16c1.57.4 3.15-.56 3.55-2.12a.92.92 0 0 1 1.23-.63l2.36.94c.42.27.79.62 1.07 1.03A3 3 0 0 0 19.56 22h.94c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5h-.94Zm-8.53 15.8L8 16.7v1.73a1 1 0 0 0 .76.97l.62.15c.5.13 1-.17 1.12-.67.1-.41.29-.78.53-1.1Z";
    ADS_CUT = "M12.43 5.7a.5.5 0 0 1 .6.72l-.63 1.1c-1.22 2.13.46 4.48 2.64 4.48h6.46c.28 0 .5.22.5.5v8c0 .83-.67 1.5-1.5 1.5h-.94a3 3 0 0 1-2.46-1.28 3.85 3.85 0 0 0-1.07-1.03l-2.36-.94a.92.92 0 0 0-1.23.63 2.92 2.92 0 0 1-3.55 2.12l-.62-.15A3 3 0 0 1 6 18.44V8.35c0-.2.13-.4.33-.47l6.1-2.18Zm-1.4 12.1L8 16.7v1.73a1 1 0 0 0 .76.97l.62.15c.5.13 1-.17 1.12-.67.1-.41.29-.78.53-1.1Z";
    ADS_CUT_W = "M12.33 5.74a.5.5 0 0 1 .67.47V9a3 3 0 0 0 3 3h5.5c.28 0 .5.22.5.5v8c0 .83-.67 1.5-1.5 1.5h-.94a3 3 0 0 1-2.46-1.28 3.86 3.86 0 0 0-1.07-1.03l-2.36-.94a.92.92 0 0 0-1.23.63 2.92 2.92 0 0 1-3.55 2.12l-.62-.15A3 3 0 0 1 6 18.44V8.35c0-.2.13-.4.33-.47l6-2.14Zm-1.3 12.06L8 16.7v1.73a1 1 0 0 0 .76.97l.62.15c.5.13 1-.17 1.12-.67.1-.41.29-.78.53-1.1Z";
    ADS_SECU = "M12.33 5.74a.5.5 0 0 1 .67.47V9a3 3 0 0 0 3 3h5.5c.28 0 .5.22.5.5v8c0 .83-.67 1.5-1.5 1.5h-.94a3 3 0 0 1-2.46-1.28 3.86 3.86 0 0 0-1.07-1.03l-2.36-.94a.92.92 0 0 0-1.23.63 2.92 2.92 0 0 1-3.55 2.12l-.62-.15A3 3 0 0 1 6 18.44V8.35c0-.2.13-.4.33-.47l6-2.14Zm-1.3 12.06L8 16.7v1.73a1 1 0 0 0 .76.97l.62.15c.5.13 1-.17 1.12-.67.1-.41.29-.78.53-1.1Z";
    ADS_WARN = "M12.33 5.74a.5.5 0 0 1 .67.47V9a3 3 0 0 0 3 3h5.5c.28 0 .5.22.5.5v8c0 .83-.67 1.5-1.5 1.5h-.94a3 3 0 0 1-2.46-1.28 3.86 3.86 0 0 0-1.07-1.03l-2.36-.94a.92.92 0 0 0-1.23.63 2.92 2.92 0 0 1-3.55 2.12l-.62-.15A3 3 0 0 1 6 18.44V8.35c0-.2.13-.4.33-.47l6-2.14Zm-1.3 12.06L8 16.7v1.73a1 1 0 0 0 .76.97l.62.15c.5.13 1-.17 1.12-.67.1-.41.29-.78.53-1.1Z";
    RULE = "M15 2a3 3 0 0 1 3 3v12H5.5a1.5 1.5 0 0 0 0 3h14a.5.5 0 0 0 .5-.5V5h1a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h10Zm-.3 5.7a1 1 0 0 0-1.4-1.4L9 10.58l-2.3-2.3a1 1 0 0 0-1.4 1.42l3 3a1 1 0 0 0 1.4 0l5-5Z";
    NSFW = "M19.8914 3.80204L22.2438 8.55654C22.5726 9.22119 22.0891 9.99999 21.3475 10L16.6179 10C15.8745 10 15.391 9.21769 15.7235 8.55279L18.1007 3.79829C18.4701 3.05951 19.5251 3.06172 19.8914 3.80204ZM18.4998 5H19.4999V7.5H18.4999L18.4998 5ZM18.4998 8.49887C18.4998 8.77589 18.7238 9 18.9998 9C19.2759 9 19.4999 8.77589 19.4999 8.49887C19.4999 8.22224 19.2759 7.99773 18.9998 7.99773C18.7238 7.99773 18.4998 8.22224 18.4998 8.49887Z";
    NSFW1 = "M18.09 1.63c.4-.7 1.43-.7 1.82 0l3.96 6.9c.38.66-.12 1.47-.91 1.47h-7.92c-.79 0-1.3-.81-.91-1.48l3.96-6.9Zm.46 1.87h.9c.3 0 .52.26.5.55l-.22 2.02c-.01.16-.17.26-.33.23a1.92 1.92 0 0 0-.8 0c-.16.03-.32-.07-.33-.23l-.21-2.02a.5.5 0 0 1 .5-.55ZM19 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z";
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
            const svgElement = item.querySelector('svg'); 
            if (!svgElement) return;
            const svgHTML = svgElement.innerHTML;
            const channelChildrenElement = item.querySelector('.children_a486f8'); if (!channelChildrenElement) return;
            this.BadgeListes.forEach(tag => {
                const isAlreadyTag = item.querySelector(`.${tag.className}`);
                const isSvgContainsTag = tag.svgContent.some(content => svgHTML.includes(content));
                const isTagEnabled = this.CBsettings[tag.tagName.toLowerCase()][tag.tagName.toLowerCase()];
                const isSecureTag = tag.secureTag && svgHTML.includes(tag.secureTag);
                let tagElementHtml;
                const tagElement = document.createElement('div');
                tagElement.className = `${tag.className} iconBase_de0cd6`;
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