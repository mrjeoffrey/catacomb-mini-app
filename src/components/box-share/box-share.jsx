import { useState } from 'react';

const BoxShare = ({ userInfo }) => {
    // const [copied, setCopied] = useState(false);

    const referralLink = `${import.meta.env.VITE_TELEGRAM_APP_URL}?startapp=${userInfo?.referral_code}`;

    const shareOnTelegram = () => {
        const shareLink = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}`;
        window.open(shareLink, '_blank');
    };
    return (
        <div className="box-share">
            <div className="box__title">
                <h6>
                    Invite your friends
                    <span className="text-xs text-medium">You have {userInfo?.valid_referrals?.length} friends in your tribe</span>
                </h6>
            </div>

            <ul>
                <li>
                    <button onClick={shareOnTelegram}>
                        <img src="/images/svg/ico-share.svg" width="30" height="30" alt="Share on Telegram" />
                    </button>
                </li>

                {/* <li>
                    <button onClick={copyToClipboard}>
                        <img src="/images/svg/ico-copy.svg" width="26" height="30" alt="Copy to clipboard" />
                    </button>
                </li> */}
            </ul>

            {/* {copied && (
                <div className="copy-popup">
                    <p>Copied!</p>
                </div>
            )} */}
        </div>
    );
};

export default BoxShare;
