import React from 'react';
import './SplashPage.scss';

const SplashPage = ({ onStart }) => {
  return (
    <div className="splash-page">
      <div className="splash-page__social-icons">
      <img src="/images/svg/ico-telegram.svg" width="43" height="43" />
      <img src="/images/svg/ico-twitter.svg" width="43" height="43" />
      </div>
      <div className="splash-page__content">
        <img src="/images/temp/logoheader.png" alt="App Logo" className="splash-page__logo" />
        <p className="splash-page__text">
          To proceed, please <br />
          connect <br />
          your TON wallet.
        </p>
        <button className="splash-page__button" >
          Connect Wallet
        </button>
        <p className="splash-page__audit">Audited by Verichains</p>
      </div>
      <footer className="splash-page__footer">
        <div className="splash-page__footer-left">
          <div className="splash-page__footer-item" onClick={onStart}>
            <img src="/images/svg/ico-play.svg" width="43" height="43" />
            <span>Play</span>
            <div className="badge">New</div>
          </div>
          <div className="splash-page__footer-item">
          <img src="/images/svg/ico-buy-sell.svg" width="43" height="43" />
            <span>Buy/Sell</span>
          </div>
          <div className="splash-page__footer-item">
          <img src="/images/svg/ico-chart.svg" width="43" height="43" />
            <span>Chart</span>
          </div>
        </div>
        <div className="splash-page__footer-right">
        <img src="/images/svg/ico-info.svg" width="43" height="43" />
        </div>
      </footer>
    </div>
  );
};

export default SplashPage;
