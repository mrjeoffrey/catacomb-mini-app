import { useState } from 'react';

const BoxShare = ({ code, userInfo }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const referralLink = `https://t.me/firstturbobot/CATAGAMEBOTforOpeningChest?startapp=${userInfo?.referral_code}`;

        if (navigator.clipboard) {
            // Modern Clipboard API
            navigator.clipboard.writeText(referralLink)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1000);
                })
                .catch((error) => console.error('Clipboard write failed:', error));
        } else {
            // Fallback for environments where Clipboard API is not allowed
            const input = document.createElement('input');
            input.value = referralLink;
            document.body.appendChild(input);
            input.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
            } catch (error) {
                console.error('Fallback copy failed:', error);
            }
            document.body.removeChild(input);
        }
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
