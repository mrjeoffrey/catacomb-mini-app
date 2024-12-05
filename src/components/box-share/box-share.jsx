import { useState } from 'react';

const BoxShare = ({ code, userInfo }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://t.me/firstturbobot/CATAGAMEBOTforOpeningChest?startapp=${userInfo?.referral_code}`);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000); // Hide the popup after 1 second
    };

    return (
        <div className="box-share">
            <div className="box__title">
                <h6>
                    Invite your friends
                    <span className="text-xs text-medium">You have 234 friends in your tribe</span>
                </h6>
            </div>

            <ul>
                <li>
                    <button>
                        <img src="/images/svg/ico-share.svg" width="30" height="30" alt="" />
                    </button>
                </li>

                <li>
                    <button onClick={copyToClipboard}>
                        <img src="/images/svg/ico-copy.svg" width="26" height="30" alt="" />
                    </button>
                </li>
            </ul>

            {copied && (
                <div className="copy-popup">
                    <p>Copied!</p>
                </div>
            )}
        </div>
    );
};

export default BoxShare;
