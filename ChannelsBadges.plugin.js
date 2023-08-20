/**
 * @name ChannelsBadges
 * @author Sheiylanie
 * @authorId 183948625368317952
 * @description Add Voice | Forum | Nsfw | Rule | Ads badges to channels.
 * @version 1.1.2
 * @invite GWYNKpbunT
 * @donate https://www.paypal.com/paypalme/Sheiylanie
 * @website https://revgames.tech/
 * @source https://github.com/SheiylaDev/ChannelsBadges/blob/main/ChannelsBadges.plugin.js
 * @updateUrl https://raw.githubusercontent.com/SheiylaDev/ChannelsBadges/main/ChannelsBadges.plugin.js
 */

class ChannelsBadges {
    constructor(meta) { this.meta = meta; }

    /* Plugin Start */
    start() {
        this.loadSettings();
        this.saveSettings();
        this.addCSS();
        this.checkVersion(true);
        this.setupObserver();
        this.AddtagChannels();
    }

    /* Settings */
    settings = {
        version: "1.1.2",
        emoji: { emoji: true },
        voice: { voice: true, voice_color: "#1ABC9C" },
        forum: { forum: true, forum_color: "#206694" },
        nsfw: { nsfw: true, nsfw_color: "#F23F42" },
        rule: { rule: true, rule_color: "#FF9B2B" },
        ads: { ads: true, ads_color: "#FF2BC2" }
    };

    loadSettings() {
        this.settings = BdApi.Data.load(this.meta.name, "settings") || this.settings;
    }

    saveSettings() {
        BdApi.Data.save(this.meta.name, "settings", this.settings);
    }

    /* Plugin Stop */
    stop() {
        const stylesToRemove = ['CSS_SettingsPanel',];
        stylesToRemove.forEach(styleId => { const styleElement = document.getElementById(styleId); if (styleElement) styleElement.remove(); });
        const tagClasses = ['voiceTags-2408cb', 'forumTags-2408cb', 'nsfwTags-2408cb', 'ruleTags-2408cb', 'adsTags-2408cb'];
        tagClasses.forEach(tagClass => { const elements = document.querySelectorAll(`.${tagClass}`); elements.forEach(element => { element.parentNode.removeChild(element); }); });
        this.disconnectObserver();
    }

    /* CSS */
    addCSS() {
        const commonCSS = `.setting-item { display: flex; align-items: center; margin: 20px 0; } .setting-description { color: white; flex: 1; } .setting-switch { position: relative; display: inline-block; width: 42px; height: 24px; } .setting-switch input { opacity: 0; width: 0; height: 0; } .setting-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; border-radius: 24px; } .setting-slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 2px; bottom: 2px; background-color: white; -webkit-transition: .4s; transition: .4s; border-radius: 50%; } input:checked + .setting-slider { background-color: #2196F3; } input:focus + .setting-slider { box-shadow: 0 0 1px #2196F3; } input:checked + .setting-slider:before { -webkit-transform: translateX(18px); -ms-transform: translateX(18px); transform: translateX(18px); } .setting-slider.round { border-radius: 24px; } .setting-slider.round:before { border-radius: 50%; } `;
        if (!document.getElementById('CSS_SettingsPanel')) {
            let style = document.createElement('style');
            style.id = 'CSS_SettingsPanel';
            style.innerHTML = commonCSS;
            document.head.appendChild(style);
        }
        const tags = [{ setting: "voice", className: "voiceTags", colorSetting: "voice_color" }, { setting: "forum", className: "forumTags", colorSetting: "forum_color" }, { setting: "nsfw", className: "nsfwTags", colorSetting: "nsfw_color" }, { setting: "rule", className: "ruleTags", colorSetting: "rule_color" }, { setting: "ads", className: "adsTags", colorSetting: "ads_color" },];
        tags.forEach(tag => {
            if (this.settings[tag.setting] && !document.getElementById(`CSS_${tag.setting}`)) {
                let style = document.createElement('style');
                style.id = `CSS_${tag.setting}`;
                style.innerHTML = `.${tag.className}-2408cb { margin-left: 2px; } .iconVisibility-vptxma.wrapper-NhbLHG:hover .${tag.className}-2408cb { display: none; } .${tag.className}-2409cb { background-color: ${this.settings[tag.setting][tag.colorSetting]}; border-radius: 3px; }`;
                document.head.appendChild(style);
            }
        });
    }

    updateCSS() {
        const tags = [{ setting: "voice", className: "voiceTags", colorSetting: "voice_color" }, { setting: "forum", className: "forumTags", colorSetting: "forum_color" }, { setting: "nsfw", className: "nsfwTags", colorSetting: "nsfw_color" }, { setting: "rule", className: "ruleTags", colorSetting: "rule_color" }, { setting: "ads", className: "adsTags", colorSetting: "ads_color" },];
        tags.forEach(tag => {
            let style = document.getElementById(`CSS_${tag.setting}`);
            if (style && this.settings[tag.setting]) {
                style.innerHTML = `.${tag.className}-2408cb { margin-left: 2px; } .iconVisibility-vptxma.wrapper-NhbLHG:hover .${tag.className}-2408cb { display: none; } .${tag.className}-2409cb { background-color: ${this.settings[tag.setting][tag.colorSetting]}; border-radius: 3px; }`;
            }
        });
    }

    /* Changelogs */
    modalVersion(currentVersion, ModalComponents, ModalActions, changelogs) {
        const MyModal = (closeCallback) => {
            return BdApi.React.createElement(ModalComponents.ModalRoot, {
                transitionState: 1,
                size: 'small',
                children: [
                    BdApi.React.createElement('div', { className: 'flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignCenter-14kD11 noWrap-hBpHBz header-1ffhsl', style: { flex: '0 0 auto' } },
                        BdApi.React.createElement('div', { className: 'flexChild-3PzYmX', style: { flex: '1 1 auto' } },
                            BdApi.React.createElement('h1', { className: 'h4-6SAiIK title-lXcL8p defaultColor-3Olr-9 defaultMarginh4-3MmT5q', children: `${this.meta.name}` }),
                            BdApi.React.createElement('div', { className: 'colorStandard-1Xxp1s size12-12FL_s', children: `Version ${currentVersion}` })),
                        BdApi.React.createElement('button', { 'aria-label': 'Close', type: 'button', className: 'close-A4ZfTI button-ejjZWC lookBlank-FgPMy6 colorBrand-2M3O3N grow-2T4nbg', onClick: closeCallback },
                            BdApi.React.createElement('div', { className: 'contents-3NembX' },
                                BdApi.React.createElement('svg', { 'aria-hidden': 'true', role: 'img', className: 'closeIcon-pSJDFz', width: '24', height: '24', viewBox: '0 0 24 24' },
                                    BdApi.React.createElement('path', { fill: 'currentColor', d: 'M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z' }))))),
                    BdApi.React.createElement('div', { className: 'content-1OG56Q container-3PVapX content-FDHp32 thin-RnSY0a scrollerBase-1Pkza4', dir: 'ltr', style: { overflow: 'hidden scroll', paddingRigth: '8px' } }, [
                        BdApi.React.createElement('h1', { className: 'fixed-cTX7Hp title-2ftWWc marginTop20-2T8ZJx', style: { marginTop: '0px' }, children: 'Changelogs' }),
                        BdApi.React.createElement('ul', { style: { fontSize: '' } }, changelogs.split('\n').map((item, index) => (
                            BdApi.React.createElement('li', { key: index }, item.trim())
                        ))),
                        BdApi.React.createElement('div', { 'aria-hidden': 'true', style: { position: 'absolute', pointerEvents: 'none', minHeight: '0px', minWidth: '1px', flex: '0 0 auto', height: '20px' } })
                    ]),
                    BdApi.React.createElement('div', {
                        className: 'flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignStretch-Uwowzr noWrap-hBpHBz footer-IubaaS', style: { flex: '0 0 auto' }
                    }, [
                        BdApi.React.createElement('div', { className: 'footer-1gMODG' }, [
                            BdApi.React.createElement('a', { className: 'anchor-1X4H4q anchorUnderlineOnHover-wiZFZ_ socialLink-1qjJIk', href: 'https://www.paypal.me/Sheiylanie', rel: 'noreferrer noopener', target: '_blank', role: 'button', tabindex: '0' },
                                BdApi.React.createElement('svg', { name: 'PayPal', width: '16', height: '16', viewBox: '0 0 24 24', className: 'icon-GhnIRB' },
                                    BdApi.React.createElement('path', { fill: 'currentColor', d: 'M 5.6863929,0 C 5.1806043,0 4.7507198,0.3656279 4.6704813,0.85995389 L 1.6795909,19.673995 c -0.058746,0.371103 0.2309887,0.706911 0.6092555,0.706911 h 4.4338638 l 1.1121097,-7.006437 -0.033522,0.22009 c 0.078805,-0.494326 0.5072079,-0.859954 1.0129965,-0.859954 h 2.1061586 c 4.139443,0 7.378419,-1.667588 8.325519,-6.4919233 0.02866,-0.1432829 0.07434,-0.4183163 0.07434,-0.4183163 C 19.589638,4.0390606 19.318112,2.8290903 18.345211,1.7301106 17.276361,0.5193702 15.342278,0 12.867737,0 Z M 21.516831,7.8139196 c -1.028771,4.7498274 -4.3124,7.2629664 -9.522166,7.2629664 H 10.107139 L 8.6962314,24 H 11.76 c 0.442744,0 0.820329,-0.319405 0.889104,-0.753552 l 0.03498,-0.189482 0.705454,-4.428033 0.04519,-0.244868 c 0.06878,-0.434148 0.446338,-0.753554 0.887649,-0.753554 h 0.559699 c 3.620757,0 6.455196,-1.457472 7.283371,-5.677153 0.332416,-1.693603 0.172401,-3.113533 -0.64861,-4.1394384 z' }))
                            ),
                            BdApi.React.createElement('div', { className: 'colorStandard-1Xxp1s size12-12FL_s', children: 'Support me for more updates !' })
                        ])
                    ])
                ]
            });
        };
        ModalActions.openModal((props) => { return MyModal(props.onClose); });
        this.settings['version'] = currentVersion;
        BdApi.Data.save(this.meta.name, "settings", this.settings);
    }

    checkVersion(sys) {
        const currentVersion = this.meta.version;
        const previousVersion = BdApi.Data.load(this.meta.name, "settings").version;
        const ModalComponents = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("ModalRoot"));
        const ModalActions = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("openModal", "updateModal"));
        const changelogs = `Reset color fix not working`;
        if (sys) {
            if (previousVersion && currentVersion !== previousVersion) this.modalVersion(currentVersion, ModalComponents, ModalActions, changelogs);
        } else {
            this.modalVersion(currentVersion, ModalComponents, ModalActions, changelogs);
        }
    }

    /* Tags */
    AddtagChannels() {
        const VOICE = "M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z";
        const VOICE_CUT = "M15 12C15 12.0007 15 12.0013 15 12.002C15 12.553 14.551 13.002 14 13.002V15.002C15.654 15.002 17 13.657 17 12.002C17 12.0013 17 12.0007 17 12H15ZM19 12C19 12.0007 19 12.0013 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 12.0013 21 12.0007 21 12H19ZM10.293 3.29604C10.579 3.01004 11.009 2.92504 11.383 3.07904C11.757 3.23204 12 3.59904 12 4.00204V20.002C12 20.407 11.757 20.772 11.383 20.927C11.009 21.082 10.579 20.996 10.293 20.71L6 16.002H3C2.45 16.002 2 15.552 2 15.002V9.00204C2 8.45304 2.45 8.00204 3 8.00204H6L10.293 3.29604Z";
        const VOICE_SECU = "M21.025 5V4C21.025 2.88 20.05 2 19 2C17.95 2 17 2.88 17 4V5C16.4477 5 16 5.44772 16 6V9C16 9.55228 16.4477 10 17 10H19H21C21.5523 10 22 9.55228 22 9V5.975C22 5.43652 21.5635 5 21.025 5ZM20 5H18V4C18 3.42857 18.4667 3 19 3C19.5333 3 20 3.42857 20 4V5Z";
        const VOICE_WARN = "M19.8916 3.80204L22.2439 8.55654C22.5728 9.22119 22.0892 9.99999 21.3476 10L16.618 10C15.8746 10 15.3912 9.21769 15.7236 8.55279L18.1008 3.79829C18.4702 3.05951 19.5253 3.06172 19.8916 3.80204ZM18.4999 5H19.5V7.5H18.5L18.4999 5ZM18.4999 8.49887C18.4999 8.77589 18.724 9 19 9C19.276 9 19.5 8.77589 19.5 8.49887C19.5 8.22224 19.276 7.99773 19 7.99773C18.724 7.99773 18.4999 8.22224 18.4999 8.49887Z";
        const FORUM = "M6.56929 14.6869H2.34375C1.97079 14.6869 1.61311 14.5387 1.34938 14.275C1.08566 14.0113 0.9375 13.6536 0.9375 13.2806V8.12437C0.9375 6.38389 1.6289 4.7147 2.85961 3.484C4.09032 2.25329 5.75951 1.56189 7.49999 1.56189C9.24047 1.56189 10.9097 2.25329 12.1404 3.484C12.6953 4.03895 13.1406 4.68307 13.4623 5.38267C14.9101 5.5973 16.2513 6.29124 17.2655 7.36251C18.4194 8.58133 19.0625 10.1959 19.0625 11.8744V17.0306C19.0625 17.4036 18.9144 17.7613 18.6506 18.025C18.3869 18.2887 18.0292 18.4369 17.6563 18.4369H12.5C11.1428 18.4369 9.81899 18.0162 8.71072 17.2328C7.7871 16.58 7.05103 15.7019 6.56929 14.6869ZM4.18544 4.80982C5.06451 3.93075 6.25679 3.43689 7.49999 3.43689C8.74319 3.43689 9.93549 3.93075 10.8146 4.80983C11.6936 5.6889 12.1875 6.88119 12.1875 8.12439C12.1875 9.36759 11.6936 10.5599 10.8146 11.439C9.93549 12.318 8.74321 12.8119 7.50001 12.8119H7.20268C7.19767 12.8118 7.19266 12.8118 7.18764 12.8119H2.8125V8.12438C2.8125 6.88118 3.30636 5.6889 4.18544 4.80982ZM8.672 14.5814C8.97763 15.0132 9.35591 15.3928 9.79299 15.7017C10.5847 16.2614 11.5305 16.5619 12.5 16.5619H17.1875V11.8744C17.1875 10.6755 16.7281 9.52219 15.9039 8.65159C15.3804 8.09865 14.735 7.68644 14.027 7.44246C14.0506 7.66798 14.0625 7.89557 14.0625 8.12439C14.0625 9.86487 13.3711 11.5341 12.1404 12.7648C11.1896 13.7156 9.97697 14.3445 8.672 14.5814Z";
        const FORUM_CUT = "M13 4C13 3.66767 13.0405 3.3448 13.1169 3.03607C11.8881 2.28254 10.4651 1.87427 8.99999 1.87427C6.91141 1.87427 4.90838 2.70395 3.43153 4.1808C1.95469 5.65764 1.125 7.66067 1.125 9.74925V15.9368C1.125 16.3843 1.30279 16.8135 1.61926 17.13C1.93573 17.4465 2.36495 17.6243 2.8125 17.6243H7.88314C8.46123 18.8423 9.34451 19.896 10.4529 20.6794C11.7828 21.6195 13.3714 22.1242 15 22.1243H21.1875C21.6351 22.1243 22.0643 21.9465 22.3808 21.63C22.6972 21.3135 22.875 20.8843 22.875 20.4368V14.2492C22.875 13.3832 22.7323 12.5314 22.4596 11.7253C22.0074 11.9026 21.5151 12 21 12H20.1557C20.4625 12.7033 20.625 13.4682 20.625 14.2493V19.8743H15C13.8365 19.8743 12.7017 19.5136 11.7516 18.8421C11.2271 18.4713 10.7732 18.0159 10.4064 17.4977C11.9724 17.2135 13.4275 16.4587 14.5685 15.3177C15.5076 14.3786 16.185 13.2267 16.5538 11.9754C15.7646 11.8878 15.0447 11.5706 14.4624 11.0921C14.2192 12.0813 13.7097 12.9945 12.9775 13.7267C11.9226 14.7816 10.4919 15.3743 9.00001 15.3743H3.375V9.74925C3.375 8.25741 3.96763 6.82668 5.02252 5.77179C6.07741 4.7169 7.50815 4.12427 8.99999 4.12427C10.4918 4.12427 11.9226 4.7169 12.9775 5.77179L13 5.79444V4Z";
        const FORUM_SECU = "M21.025 4V5C21.5635 5 22 5.43652 22 5.975V9C22 9.55228 21.5523 10 21 10H17C16.4477 10 16 9.55228 16 9V6C16 5.44772 16.4477 5 17 5V4C17 2.88 17.95 2 19 2C20.05 2 21.025 2.88 21.025 4ZM18 5H20V4C20 3.42857 19.5333 3 19 3C18.4667 3 18 3.42857 18 4V5Z";
        const FORUM_WARN = "M22.2821 7.55654L19.9173 2.80204C19.5491 2.06172 18.4885 2.05951 18.1172 2.79829L15.7274 7.55279C15.3932 8.21769 15.8793 9 16.6265 9L21.3811 9C22.1265 8.99999 22.6126 8.22119 22.2821 7.55654ZM19.5237 4H18.5184L18.5184 6.5H19.5237V4ZM19.021 8C18.7436 8 18.5184 7.77589 18.5184 7.49887C18.5184 7.22224 18.7436 6.99773 19.021 6.99773C19.2985 6.99773 19.5237 7.22224 19.5237 7.49887C19.5237 7.77589 19.2985 8 19.021 8Z";
        const ADS = "M19.1 4V5.12659L4.85 8.26447V18.1176C4.85 18.5496 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5242L19.1 17.9304V19.0588H21V4H19.1ZM9.2181 17.9944L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9944Z";
        const ADS_CUT = "M22.545 4.87988V5.87988H23.28C23.4126 5.87988 23.52 5.98733 23.52 6.11988V10.6399C23.52 10.7724 23.4126 10.8799 23.28 10.8799H17.76C17.6275 10.8799 17.52 10.7724 17.52 10.6399V6.11988C17.52 5.98733 17.6275 5.87988 17.76 5.87988H18.52V4.87988C18.52 3.75988 19.47 2.87988 20.52 2.87988C21.57 2.87988 22.545 3.75988 22.545 4.87988ZM19.52 5.87988H21.52V4.87988C21.52 4.30845 21.0534 3.87988 20.52 3.87988C19.9867 3.87988 19.52 4.30845 19.52 4.87988V5.87988Z";
        const ADS_CUT_W = "M20.4683 4.76211L22.8094 9.51661C23.1366 10.1813 22.6554 10.9601 21.9174 10.9601L17.2104 10.9601C16.4706 10.9601 15.9894 10.1778 16.3203 9.51286L18.6861 4.75836C19.0537 4.01957 20.1037 4.02179 20.4683 4.76211ZM19.0833 5.96007H20.0786V8.46007H19.0834L19.0833 5.96007ZM19.0833 9.45894C19.0833 9.73596 19.3063 9.96007 19.5809 9.96007C19.8556 9.96007 20.0786 9.73596 20.0786 9.45894C20.0786 9.18231 19.8556 8.9578 19.5809 8.9578C19.3063 8.9578 19.0833 9.18231 19.0833 9.45894Z";
        const ADS_SECU = "M4.85 8.26429L15.84 5.84426V10.5599C15.84 11.6202 16.6996 12.4799 17.76 12.4799H21V19.0586H19.1V17.9302L12.7065 16.524L10.36 19.6233C10.1776 19.8633 9.89545 19.9998 9.6 19.9998C9.524 19.9998 9.4461 19.9904 9.3701 19.9725L5.5701 19.0313C5.1464 18.925 4.85 18.5495 4.85 18.1175V8.26429ZM9.2181 17.9942L6.75 17.3824V15.2111L10.6706 16.0751L9.2181 17.9942Z";
        const ADS_WARN = "M4.85 8.26445L16.7165 5.65143L15.1067 9.30608C14.5477 10.5751 15.4771 12 16.8638 12H21V19.0588H19.1V17.9303L12.7065 16.5242L10.36 19.6235C10.1776 19.8635 9.89545 20 9.6 20C9.524 20 9.4461 19.9906 9.3701 19.9727L5.5701 19.0315C5.1464 18.9252 4.85 18.5496 4.85 18.1176V8.26445ZM9.2181 17.9943L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9943Z";
        const RULE = "M33 34.5833V7.49998H35V36.6666H9C6.791 36.6666 5 34.801 5 32.5V7.49998C5 5.19894 6.791 3.33331 9 3.33331H31V30.4166H9C7.8955 30.4166 7 31.3485 7 32.5C7 33.6515 7.8955 34.5833 9 34.5833H33ZM23.9718 9.99998L15.8889 17.9915L12.7086 14.8441L10 17.5058L15.8885 23.3333L26.6667 12.6669L23.9718 9.99998Z";
        const NSFW = "M19.8914 3.80204L22.2438 8.55654C22.5726 9.22119 22.0891 9.99999 21.3475 10L16.6179 10C15.8745 10 15.391 9.21769 15.7235 8.55279L18.1007 3.79829C18.4701 3.05951 19.5251 3.06172 19.8914 3.80204ZM18.4998 5H19.4999V7.5H18.4999L18.4998 5ZM18.4998 8.49887C18.4998 8.77589 18.7238 9 18.9998 9C19.2759 9 19.4999 8.77589 19.4999 8.49887C19.4999 8.22224 19.2759 7.99773 18.9998 7.99773C18.7238 7.99773 18.4998 8.22224 18.4998 8.49887Z";
        const tags = [
            { svgContent: [VOICE, VOICE_CUT], className1: 'voiceTags-2408cb', className2: 'voiceTags-2409cb', tagName: 'VOICE', emoji: '🎤', secureEmoji: '🔒', warnTag: VOICE_WARN, secureTag: VOICE_SECU },
            { svgContent: [FORUM, FORUM_CUT], className1: 'forumTags-2408cb', className2: 'forumTags-2409cb', tagName: 'FORUM', emoji: '📰', secureEmoji: '🔒', warnTag: FORUM_WARN, secureTag: FORUM_SECU },
            { svgContent: [ADS, ADS_CUT, ADS_CUT_W], className1: 'adsTags-2408cb', className2: 'adsTags-2409cb', tagName: 'ADS', emoji: '📝', secureEmoji: '🔒', warnTag: ADS_WARN, secureTag: ADS_SECU },
            { svgContent: [RULE], className1: 'ruleTags-2408cb', className2: 'ruleTags-2409cb', tagName: 'RULE', emoji: '📋' },
            { svgContent: [NSFW], className1: 'nsfwTags-2408cb', className2: 'nsfwTags-2409cb', tagName: 'NSFW', emoji: '🔞' },
        ];
        const channelListItems = document.querySelectorAll('.containerDefault-YUSmu3');
        channelListItems.forEach(item => {
            const svgElement = item.querySelector('svg');
            if (!svgElement) return;
            const svgHTML = svgElement.innerHTML;
            const channelChildrenElement = item.querySelector('.children-1MGS9G');
            if (!channelChildrenElement) return;
            tags.forEach(tag => {
                const isAlreadyTag = item.querySelector(`.${tag.className1}`);
                const isSvgContainsTag = tag.svgContent.some(content => svgHTML.includes(content));
                const isTagEnabled = this.settings[tag.tagName.toLowerCase()][tag.tagName.toLowerCase()];
                if (isSvgContainsTag && !isAlreadyTag && isTagEnabled) {
                    const isWarnTag = tag.warnTag && svgHTML.includes(tag.warnTag);
                    const isSecureTag = tag.secureTag && svgHTML.includes(tag.secureTag);
                    const emoji = isSecureTag ? tag.secureEmoji : tag.emoji;
                    let tagElementHtml;
                    let tagContent = tag.tagName;
                    if (this.settings['emoji'].emoji) tagContent = `${emoji} ${tagContent}`;
                    if (isWarnTag && this.settings['nsfw'].nsfw) {
                        tagElementHtml = `
                            <div style="display: flex;">
                                <div style="margin-right:5px;" class="textBadge-1fdDPJ base-3IDx3L eyebrow-132Xza baseShapeRound-3epLEv nsfwTags-2409cb">${this.settings['emoji'].emoji ? "🔞 NSFW" : "NSFW"}</div>
                                <div class="textBadge-1fdDPJ base-3IDx3L eyebrow-132Xza baseShapeRound-3epLEv ${tag.className2}">${tagContent}</div>
                            </div>`;
                    } else {
                        tagElementHtml = `<div class="textBadge-1fdDPJ base-3IDx3L eyebrow-132Xza baseShapeRound-3epLEv ${tag.className2}">${tagContent}</div>`;
                    }
                    const tagElement = document.createElement('div');
                    tagElement.className = `${tag.className1} iconBase-2G48Fc`;
                    tagElement.innerHTML = tagElementHtml;
                    channelChildrenElement.appendChild(tagElement);
                }
            });
        });
    }

    reloadTags() {
        const tagClasses = ['voiceTags-2408cb', 'forumTags-2408cb', 'nsfwTags-2408cb', 'ruleTags-2408cb', 'adsTags-2408cb'];
        tagClasses.forEach(tagClass => { const elements = document.querySelectorAll(`.${tagClass}`); elements.forEach(element => { element.parentNode.removeChild(element); }); });
        this.AddtagChannels();
    }

    /* Settings Panel */
    getSettingsPanel() {
        const checkboxes1 = [
            { setting: "voice", label: "VOICE", className: "voiceTags-2409cb", color: "#1ABC9C", colorPicker: true, colorReset: true },
            { setting: "forum", label: "FORUM", className: "forumTags-2409cb", color: "#206694", colorPicker: true, colorReset: true },
            { setting: "nsfw", label: "NSFW", className: "nsfwTags-2409cb", color: "var(--status-danger)", colorPicker: true, colorReset: true },
            { setting: "rule", label: "RULE", className: "ruleTags-2409cb", color: "#FF9B2B", colorPicker: true, colorReset: true },
            { setting: "ads", label: "ADS", className: "adsTags-2409cb", color: "#FF2BC2", colorPicker: true, colorReset: true },
        ];

        const checkboxes2 = [
            { setting: "emoji", label: "🎤🔒📰📝📋🔞", className: "", color: "#ffffff", colorPicker: false, colorReset: false },
        ];
        const wrapper = document.createElement("div");
        wrapper.className = "cb-settings-panel";
        const createTitle = (titleText) => {
            const title = document.createElement("h2");
            title.innerText = titleText;
            title.style.color = "#fff";
            title.style.fontSize = "16px";
            title.style.fontFamily = "var(--font-display)";
            title.style.textAlign = "left";
            title.style.marginTop = "30px";
            title.style.marginBottom = "4px";
            return title;
        };
        const createSettingItem = (checkbox) => {
            const settingItem = document.createElement("div");
            settingItem.className = "setting-item";
            settingItem.style.border = "1px solid var(--background-tertiary)";
            settingItem.style.borderRadius = "10px";
            settingItem.style.padding = "10px";
            settingItem.style.display = "flex";
            settingItem.style.alignItems = "center";
            settingItem.style.justifyContent = "space-between";
            settingItem.style.marginRight = "10px";
            const settingDescription = createSettingDescription(checkbox)
            const colorPickerContainer = document.createElement("div");
            colorPickerContainer.style.marginLeft = "0px";
            colorPickerContainer.style.position = "relative";
            colorPickerContainer.style.width = "24px";
            const colorPickerButton = document.createElement("button");
            colorPickerButton.style.width = "23px";
            colorPickerButton.style.height = "23px";
            colorPickerButton.style.borderRadius = "50%";
            colorPickerButton.style.backgroundColor = this.settings[checkbox.setting][checkbox.setting + "_color"];
            colorPickerButton.style.cursor = "pointer";
            colorPickerButton.style.outline = "none";
            colorPickerButton.style.border = "2px solid rgba(0, 0, 0, 0.1)";
            const resetEmoji = document.createElement("button");
            resetEmoji.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAACtUlEQVRIibVWT0gUURj/fW9mZ1dbNkOL1LKsBOliQWGgQQcrBCE8SNIfKOjUpVOnDhLVRTpGpyCCyoSOHpKC3AjDg6cVEwvJghVxlfbvjDt/XszM7rqz83Yhan877Jv5vjff7733/b73hvB6k6MAgvtHzq9g4PZV6gIigAFg5Do5J5iFPtxpvZDLnzgqAlb2LthMj1PUaQespvc/wJ1pnUBEYHWMD865mKArLGOgXfHZmxTC8YgE6S9GJUtkq8CbqJEOBbe7QnjQkMOLFQ23joZwtTOI7ojkpDRvAnMJHU++a3i/ptckIGVyi+dNL8FYTyPudocQYkBctdAaKtMCeZUxHdcx8jmNrCkmYOB+mdmLI3NAAnCwgUEmYH7LwJ35LIajaTxcULGhcYdosC2AZ73hqjNgJJCRxd2CKsf4ooan37YxFdcxFlNxejqJ1azl+EYPKTi3T/bFKczAb6RiVZfh7dkwLnfsJP5XzsLgTBq6y4GbR4JCAtkXCe5yRNcNyJKXqLdZxuTPfOn5a8rE/QUV5/cHkNgWVzQpb7Z43qpd7v8C2RK83NMkYfzkLljguD6b8Yyur0XGo55G3zsf13VnNr4lEogIaYOjf6+MkATc6Azi8ZJW8qV0jhN7JOwOeNe2JUhCAkbkZ1jJWPiyYTj5t0c72qGUtB9LmhiKpqFV6L5adTN7PxfhXiznWBUGTPSF8WkggqG2AC61B3CxNQC1ojhJpBbbziY2ebUcXzus4PmZcGnDorLdvxiOF+6X0xa6p36LZiAObuPljzz6P6TwajWP5ZSFnAGoBpzlWUxZuDKbwal3SaypHJpILZUnmghzCQNziYzjaQ4SjoUlRwRLSRPFmBdmUhg+IC40z5lcD9T1yGRUZwIJVF8CE9yf5NL3kGBH9fSpkKrT2p885LY2LA78AY2Q/spQ+pk6AAAAAElFTkSuQmCC')";
            resetEmoji.style.backgroundSize = "cover";
            resetEmoji.style.width = "22px";
            resetEmoji.style.height = "22px";
            resetEmoji.style.marginRight = "15px";
            resetEmoji.style.cursor = "pointer";
            resetEmoji.style.borderRadius = "50%";
            resetEmoji.title = "Reset Color";
            if (this.settings[checkbox.setting][checkbox.setting]) {
                colorPickerButton.style.cursor = "pointer";
                colorPickerButton.style.opacity = "1";
                colorPickerButton.disabled = false;
                resetEmoji.style.cursor = "pointer";
                resetEmoji.style.opacity = "1";
                resetEmoji.disabled = false;
            } else {
                colorPickerButton.style.cursor = "not-allowed";
                colorPickerButton.style.opacity = "0.5";
                colorPickerButton.disabled = true;
                resetEmoji.style.cursor = "not-allowed";
                resetEmoji.style.opacity = "0.5";
                resetEmoji.disabled = true;
            }
            const label = createLabel(checkbox, colorPickerButton, resetEmoji);
            let colorPickerOpen = false;
            colorPickerButton.addEventListener("mousedown", (event) => {
                event.stopPropagation();
                let input = colorPickerContainer.querySelector("input[type='color']");
                if (!input) {
                    input = document.createElement("input");
                    input.type = "color";
                    input.style.position = "absolute";
                    input.style.top = 0;
                    input.style.left = 0;
                    input.style.opacity = 0;
                    input.addEventListener("input", (event) => {
                        checkbox.color = event.target.value;
                        this.settings[checkbox.setting][checkbox.setting + "_color"] = checkbox.color;
                        BdApi.Data.save(this.meta.name, "settings", this.settings);
                        this.updateCSS();
                        this.reloadTags();
                        colorPickerButton.style.backgroundColor = checkbox.color;
                    });
                    colorPickerContainer.appendChild(input);
                }
                input.value = checkbox.color;
                colorPickerOpen = true;
            });
            colorPickerButton.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
            });
            document.addEventListener("mouseup", () => {
                if (colorPickerOpen) {
                    colorPickerOpen = false;
                    const input = colorPickerContainer.querySelector("input[type='color']");
                    if (input) {
                        input.click();
                    }
                }
            });
            colorPickerContainer.appendChild(colorPickerButton);
            settingItem.appendChild(settingDescription);
            resetEmoji.addEventListener("click", () => {
                const defaultSettings = { voice: "#1ABC9C", forum: "#206694", nsfw: "#F23F42", rule: "#FF9B2B", ads: "#FF2BC2" };
                this.settings[checkbox.setting][checkbox.setting + "_color"] = defaultSettings[checkbox.setting];
                BdApi.Data.save(this.meta.name, "settings", this.settings);
                this.updateCSS();
                this.reloadTags();
                colorPickerButton.style.backgroundColor = this.settings[checkbox.setting][checkbox.setting + "_color"];
            });
            if (checkbox.colorReset) settingItem.appendChild(resetEmoji);
            if (checkbox.colorPicker) settingItem.appendChild(colorPickerContainer);
            settingItem.appendChild(label);
            return settingItem;
        };
        const createSettingDescription = (checkbox) => {
            const settingDescription = document.createElement("div");
            settingDescription.className = "setting-description";
            const badgeDiv = document.createElement("div");
            badgeDiv.className = `textBadge-1fdDPJ base-3IDx3L eyebrow-132Xza baseShapeRound-3epLEv ${checkbox.className}`;
            badgeDiv.style.width = checkbox.setting === "emoji" ? "125px" : "70px";
            badgeDiv.style.fontSize = checkbox.setting === "emoji" ? "13px" : "12px";
            badgeDiv.innerText = checkbox.label;
            settingDescription.appendChild(badgeDiv);
            return settingDescription;
        };
        const createLabel = (checkbox, colorPickerButton, resetEmoji) => {
            const label = document.createElement("label");
            label.className = "setting-switch";
            label.style.marginLeft = "10px";
            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = `${checkbox.setting}TagSetting`;
            input.checked = this.settings[checkbox.setting][checkbox.setting];
            label.appendChild(input);
            const sliderSpan = document.createElement("span");
            sliderSpan.className = "setting-slider";
            label.appendChild(sliderSpan);
            input.addEventListener("change", (event) => {
                this.settings[checkbox.setting][checkbox.setting] = event.target.checked;
                BdApi.Data.save(this.meta.name, "settings", this.settings);
                if (event.target.checked) {
                    colorPickerButton.style.cursor = "pointer";
                    colorPickerButton.style.opacity = "1";
                    colorPickerButton.disabled = false;
                    resetEmoji.style.cursor = "pointer";
                    resetEmoji.style.opacity = "1";
                    resetEmoji.disabled = false;
                } else {
                    colorPickerButton.style.cursor = "not-allowed";
                    colorPickerButton.style.opacity = "0.5";
                    colorPickerButton.disabled = true;
                    resetEmoji.style.cursor = "not-allowed";
                    resetEmoji.style.opacity = "0.5";
                    resetEmoji.disabled = true;
                }
                this.updateCSS();
                this.reloadTags();
            });
            return label;
        };
        wrapper.appendChild(createTitle("⚙️ Badge Lists"));
        const settingsTableHeaders = document.createElement("div");
        settingsTableHeaders.innerHTML = `
        <div style="display: flex; justify-content: flex-end; margin-bottom: -15px; margin-right: 25px;">
            <div style="margin-right: 10px; color: var(--text-normal); font-weight: 600; font-family: var(--font-display); font-size: 10px; line-height: 12px; text-transform: uppercase; min-height: 10px;">
                <span>Reset</span>
            </div>
            <div style="margin-right: 10px; color: var(--text-normal); font-weight: 600; font-family: var(--font-display); font-size: 10px; line-height: 12px; text-transform: uppercase; min-height: 10px;">
                <span>Color</span>
            </div>
            <div style="color: var(--text-normal); font-weight: 600; font-family: var(--font-display); font-size: 10px; line-height: 12px; text-transform: uppercase; min-height: 10px;">
                <span>Active</span>
            </div>
        </div>
        `;
        wrapper.appendChild(settingsTableHeaders);
        checkboxes1.forEach(checkbox => {
            const settingItem = createSettingItem(checkbox);
            wrapper.appendChild(settingItem);
        });
        wrapper.appendChild(createTitle("⚙️ Icons Lists"));
        checkboxes2.forEach(checkbox => {
            const settingItem = createSettingItem(checkbox);
            wrapper.appendChild(settingItem);
        });
        const changeLogButton = document.createElement("div");
        changeLogButton.style.cssText = "position: fixed; top: 14px; right: 14px; cursor: pointer !important;";
        changeLogButton.innerHTML = `<svg name="ChangeLog" width="24" height="24" viewBox="0 0 24 24" class="icon-GhnIRB"><path fill="currentColor" d="M 12.994141,2 C 7.4665894,2 3,6.4779848 3,12 H 1 L 4.0996094,15.408203 7.2226562,12 h -2 c 0,-4.2942525 3.4830736,-7.7773438 7.7773438,-7.7773438 4.294251,0 7.777344,3.4830913 7.777344,7.7773438 0,4.294253 -3.483093,7.779297 -7.777344,7.779297 -2.149914,0 -4.0886771,-0.879641 -5.4941406,-2.285156 L 5.9335938,19.066406 C 7.7390932,20.877425 10.233155,22 12.994141,22 18.521728,22 23,17.522015 23,12 23,6.4779858 18.521728,2 12.994141,2 Z m -1.496094,4.4375 v 6.632812 l 5.675781,3.367188 0.953125,-1.611328 -4.640625,-2.751953 V 6.4375 Z" class=""></path></svg>`;
        wrapper.appendChild(changeLogButton);
        changeLogButton.addEventListener("click", () => {
            this.checkVersion(false);
        });
        return wrapper;
    }

    /* Observer */
    setupObserver() {
        this.observer = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].classList && (mutation.addedNodes[0].classList.contains('listItem-3SmSlK') || mutation.addedNodes[0].classList.contains('containerDefault-YUSmu3'))) {
                    this.AddtagChannels();
                }
            }
        });
        this.observer.observe(document, { attributes: true, childList: true, subtree: true });
    }
    disconnectObserver() { if (this.observer) this.observer.disconnect(); }

}

module.exports = ChannelsBadges;