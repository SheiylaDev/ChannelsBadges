//META{"name":"ChannelsBadges","invite":"GWYNKpbunT","donate":"https://www.paypal.com/paypalme/Sheiylanie","website":"https://revgames.tech/","source":"https://github.com/SheiylaDev/ChannelsBadges/blob/main/ChannelsBadges.plugin.js","updateUrl":"https://raw.githubusercontent.com/SheiylaDev/ChannelsBadges/main/ChannelsBadges.plugin.js"}*//

class ChannelsBadges 
{  
    constructor() 
    {
        this.voiceCBTags = [];
        this.forumCBTags = [];
        this.nsfwCBTags  = [];
    }

    getName() { return "ChannelsBadges"; }
    getDescription() { return "Add Voice | Forum | Nsfw badges to channels."; }
    getVersion() { return "1.0.0"; }
    getAuthor() { return "Sheiylanie"; }

    start() 
    {
        this.injectCSS();
        this.tagChannels();
        this.setupObserver();
    }

    stop() 
    {
        this.voiceCBTags.forEach(tag => tag.remove());
        this.voiceCBTags = [];
        this.forumCBTags.forEach(tag => tag.remove());
        this.forumCBTags = [];
        this.nsfwCBTags.forEach(tag => tag.remove());
        this.nsfwCBTags = [];
        this.removeCSS();
        this.disconnectObserver();
    }

    injectCSS() 
    {
        const style = document.createElement('style');
        style.id    = 'ChannelsTagsStyle'; 
        style.textContent = `
            .voiceTags-2408cb                                             { margin-left: 2px; }
            .iconVisibility-vptxma.wrapper-NhbLHG:hover .voiceTags-2408cb { display: none; }
            .voiceTags-2409cb                                             { background-color: #1ABC9C; border-radius: 3px; }
            .forumTags-2408cb                                             { margin-left: 2px; }
            .iconVisibility-vptxma.wrapper-NhbLHG:hover .forumTags-2408cb { display: none; }
            .forumTags-2409cb                                             { background-color: #206694; border-radius: 3px; }
            .nsfwTags-2408cb                                              { margin-left: 2px; }
            .iconVisibility-vptxma.wrapper-NhbLHG:hover .nsfwTags-2408cb  { display: none; }
            .nsfwTags-2409cb                                              { background-color: var(--status-danger); border-radius: 3px; }
        `;
        document.head.append(style);
    }

    removeCSS() {
        const styleElement = document.querySelector('#ChannelsTagsStyle');
        if (styleElement) styleElement.remove();
    }

    tagChannels() 
    {
        const VOICE         = "M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z";
        const VOICE_Limited = "M15 12C15 12.0007 15 12.0013 15 12.002C15 12.553 14.551 13.002 14 13.002V15.002C15.654 15.002 17 13.657 17 12.002C17 12.0013 17 12.0007 17 12H15ZM19 12C19 12.0007 19 12.0013 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 12.0013 21 12.0007 21 12H19ZM10.293 3.29604C10.579 3.01004 11.009 2.92504 11.383 3.07904C11.757 3.23204 12 3.59904 12 4.00204V20.002C12 20.407 11.757 20.772 11.383 20.927C11.009 21.082 10.579 20.996 10.293 20.71L6 16.002H3C2.45 16.002 2 15.552 2 15.002V9.00204C2 8.45304 2.45 8.00204 3 8.00204H6L10.293 3.29604Z";
        const FORUM         = "M6.56929 14.6869H2.34375C1.97079 14.6869 1.61311 14.5387 1.34938 14.275C1.08566 14.0113 0.9375 13.6536 0.9375 13.2806V8.12437C0.9375 6.38389 1.6289 4.7147 2.85961 3.484C4.09032 2.25329 5.75951 1.56189 7.49999 1.56189C9.24047 1.56189 10.9097 2.25329 12.1404 3.484C12.6953 4.03895 13.1406 4.68307 13.4623 5.38267C14.9101 5.5973 16.2513 6.29124 17.2655 7.36251C18.4194 8.58133 19.0625 10.1959 19.0625 11.8744V17.0306C19.0625 17.4036 18.9144 17.7613 18.6506 18.025C18.3869 18.2887 18.0292 18.4369 17.6563 18.4369H12.5C11.1428 18.4369 9.81899 18.0162 8.71072 17.2328C7.7871 16.58 7.05103 15.7019 6.56929 14.6869ZM4.18544 4.80982C5.06451 3.93075 6.25679 3.43689 7.49999 3.43689C8.74319 3.43689 9.93549 3.93075 10.8146 4.80983C11.6936 5.6889 12.1875 6.88119 12.1875 8.12439C12.1875 9.36759 11.6936 10.5599 10.8146 11.439C9.93549 12.318 8.74321 12.8119 7.50001 12.8119H7.20268C7.19767 12.8118 7.19266 12.8118 7.18764 12.8119H2.8125V8.12438C2.8125 6.88118 3.30636 5.6889 4.18544 4.80982ZM8.672 14.5814C8.97763 15.0132 9.35591 15.3928 9.79299 15.7017C10.5847 16.2614 11.5305 16.5619 12.5 16.5619H17.1875V11.8744C17.1875 10.6755 16.7281 9.52219 15.9039 8.65159C15.3804 8.09865 14.735 7.68644 14.027 7.44246C14.0506 7.66798 14.0625 7.89557 14.0625 8.12439C14.0625 9.86487 13.3711 11.5341 12.1404 12.7648C11.1896 13.7156 9.97697 14.3445 8.672 14.5814Z";
        const FORUM_Limited = "M13 4C13 3.66767 13.0405 3.3448 13.1169 3.03607C11.8881 2.28254 10.4651 1.87427 8.99999 1.87427C6.91141 1.87427 4.90838 2.70395 3.43153 4.1808C1.95469 5.65764 1.125 7.66067 1.125 9.74925V15.9368C1.125 16.3843 1.30279 16.8135 1.61926 17.13C1.93573 17.4465 2.36495 17.6243 2.8125 17.6243H7.88314C8.46123 18.8423 9.34451 19.896 10.4529 20.6794C11.7828 21.6195 13.3714 22.1242 15 22.1243H21.1875C21.6351 22.1243 22.0643 21.9465 22.3808 21.63C22.6972 21.3135 22.875 20.8843 22.875 20.4368V14.2492C22.875 13.3832 22.7323 12.5314 22.4596 11.7253C22.0074 11.9026 21.5151 12 21 12H20.1557C20.4625 12.7033 20.625 13.4682 20.625 14.2493V19.8743H15C13.8365 19.8743 12.7017 19.5136 11.7516 18.8421C11.2271 18.4713 10.7732 18.0159 10.4064 17.4977C11.9724 17.2135 13.4275 16.4587 14.5685 15.3177C15.5076 14.3786 16.185 13.2267 16.5538 11.9754C15.7646 11.8878 15.0447 11.5706 14.4624 11.0921C14.2192 12.0813 13.7097 12.9945 12.9775 13.7267C11.9226 14.7816 10.4919 15.3743 9.00001 15.3743H3.375V9.74925C3.375 8.25741 3.96763 6.82668 5.02252 5.77179C6.07741 4.7169 7.50815 4.12427 8.99999 4.12427C10.4918 4.12427 11.9226 4.7169 12.9775 5.77179L13 5.79444V4Z";
        const NSFW          = "M14 8C14 7.44772 13.5523 7 13 7H9.76001L10.3657 3.58738C10.4201 3.28107 10.1845 3 9.87344 3H8.88907C8.64664 3 8.43914 3.17391 8.39677 3.41262L7.76001 7H4.18011C3.93722 7 3.72946 7.17456 3.68759 7.41381L3.51259 8.41381C3.45905 8.71977 3.69449 9 4.00511 9H7.41001L6.35001 15H2.77011C2.52722 15 2.31946 15.1746 2.27759 15.4138L2.10259 16.4138C2.04905 16.7198 2.28449 17 2.59511 17H6.00001L5.39427 20.4126C5.3399 20.7189 5.57547 21 5.88657 21H6.87094C7.11337 21 7.32088 20.8261 7.36325 20.5874L8.00001 17H14L13.3943 20.4126C13.3399 20.7189 13.5755 21 13.8866 21H14.8709C15.1134 21 15.3209 20.8261 15.3632 20.5874L16 17H19.5799C19.8228 17 20.0306 16.8254 20.0724 16.5862L20.2474 15.5862C20.301 15.2802 20.0655 15 19.7549 15H16.35L16.6758 13.1558C16.7823 12.5529 16.3186 12 15.7063 12C15.2286 12 14.8199 12.3429 14.7368 12.8133L14.3504 15H8.35045L9.41045 9H13C13.5523 9 14 8.55228 14 8Z";
        const NSFW_Limited  = "M19.8914 3.80204L22.2438 8.55654C22.5726 9.22119 22.0891 9.99999 21.3475 10L16.6179 10C15.8745 10 15.391 9.21769 15.7235 8.55279L18.1007 3.79829C18.4701 3.05951 19.5251 3.06172 19.8914 3.80204ZM18.4998 5H19.4999V7.5H18.4999L18.4998 5ZM18.4998 8.49887C18.4998 8.77589 18.7238 9 18.9998 9C19.2759 9 19.4999 8.77589 19.4999 8.49887C19.4999 8.22224 19.2759 7.99773 18.9998 7.99773C18.7238 7.99773 18.4998 8.22224 18.4998 8.49887Z";

        const channelListItems = document.querySelectorAll('.containerDefault-YUSmu3');
        channelListItems.forEach(item => 
        {
            const svgElement     = item.querySelector('svg');
            const isAlreadyVoice = item.querySelector('.voiceTags-2408cb');
            const isAlreadyForum = item.querySelector('.forumTags-2408cb');
            const isAlreadynsfw  = item.querySelector('.nsfwTags-2408cb');
            if (svgElement && !isAlreadyVoice) 
            {
                if (svgElement.innerHTML.includes(VOICE) || svgElement.innerHTML.includes(VOICE_Limited)) 
                {
                    let channelChildrenElement = item.querySelector('.children-1MGS9G');
                    if (channelChildrenElement) 
                    {
                        let voiceTag       = document.createElement('div');
                        voiceTag.className = "voiceTags-2408cb iconBase-2G48Fc";
                        voiceTag.innerHTML = '<div class="textBadge-1fdDPJ base-3IDx3L eyebrow-132Xza baseShapeRound-3epLEv voiceTags-2409cb">VOICE</div>';
                        channelChildrenElement.appendChild(voiceTag);
                        this.voiceCBTags.push(voiceTag);
                    }
                }
            }
            if (svgElement && !isAlreadyForum) 
            {
                if (svgElement.innerHTML.includes(FORUM) || svgElement.innerHTML.includes(FORUM_Limited)) 
                {
                    let channelChildrenElement = item.querySelector('.children-1MGS9G');
                    if (channelChildrenElement) 
                    {
                        let forumTag       = document.createElement('div');
                        forumTag.className = "forumTags-2408cb iconBase-2G48Fc";
                        forumTag.innerHTML = '<div class="textBadge-1fdDPJ base-3IDx3L eyebrow-132Xza baseShapeRound-3epLEv forumTags-2409cb">FORUM</div>';
                        channelChildrenElement.appendChild(forumTag);
                        this.forumCBTags.push(forumTag);
                    }
                }
            }
            if (svgElement && !isAlreadynsfw) 
            {
                if (svgElement.innerHTML.includes(NSFW) && svgElement.innerHTML.includes(NSFW_Limited)) 
                {
                    let channelChildrenElement = item.querySelector('.children-1MGS9G');
                    if (channelChildrenElement) 
                    {
                        let nsfwTag       = document.createElement('div');
                        nsfwTag.className = "nsfwTags-2408cb iconBase-2G48Fc";
                        nsfwTag.innerHTML = '<div class="textBadge-1fdDPJ base-3IDx3L eyebrow-132Xza baseShapeRound-3epLEv nsfwTags-2409cb">NSFW</div>';
                        channelChildrenElement.appendChild(nsfwTag);
                        this.nsfwCBTags.push(nsfwTag);
                    }
                }
            }
        });
    }

    setupObserver() 
    {
        this.observer = new MutationObserver((mutations) => 
        {
            mutations.forEach((mutation) => 
            {
                const addedNodes    = Array.from(mutation.addedNodes);
                const isChannelItem = addedNodes.some(node => node.classList?.contains('containerDefault-YUSmu3'));
                if (isChannelItem) this.tagChannels();
            });
        });
        this.observer.observe(document, { childList: true, subtree: true });
    }

    disconnectObserver() { if (this.observer) this.observer.disconnect(); }

}

module.exports = ChannelsBadges;
