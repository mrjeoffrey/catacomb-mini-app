import React from 'react';
import './SplashPage.scss';

const SplashPage = ({ onStart }) => {
  return (
    <div className="splash-page">
      <div className="splash-page__social-icons">
      <img src="/images/svg/ico-telegram.svg" width="30" height="30" />
      <img src="/images/svg/ico-twitter.svg" width="30" height="30" />
      </div>
      <div className="splash-page__content">
        <img src="/images/temp/logoheader.png" alt="App Logo" className="splash-page__logo" />
        <p className="splash-page__text">
          To proceed, please <br />
          connect <br />
          your TON wallet.
        </p>
        <button className="splash-page__button-connect" >
          Connect Wallet
        </button>
        <button className="splash-page__button" >
          PLAY NOW
        </button>
        <p className="splash-page__audit">Audited by Verichains</p>
      </div>
      <footer className="splash-page__footer">
        <div className="splash-page__footer-left">
          <div className="splash-page__footer-item" onClick={onStart}>
            <img src="/images/svg/ico-play.svg" width="30" height="30" />
            <span>Play</span>
            <div className="badge">New</div>
          </div>
          <div className="splash-page__footer-item">
          <img src="/images/svg/ico-buy-sell.svg" width="30" height="30" />
            <span>Buy/Sell</span>
          </div>
          <div className="splash-page__footer-item">
          <img src="/images/svg/ico-chart.svg" width="30" height="30" />
            <span>Chart</span>
          </div>
        </div>
        <div className="splash-page__footer-right">
        <img src="/images/svg/ico-info.svg" width="30" height="30" />
        </div>
      </footer>
    </div>
  );
};

export default SplashPage;
