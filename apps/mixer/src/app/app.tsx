import { useEffect, useState } from 'react';
import { AppBar, Handle, Toolbar } from 'react95';

import { injectable } from '@mixer/injectable';
import { combineEff } from '@mixer/eff';
import { mkWalletConnect } from '@mixer/wallet';
import { mkDesktop, mkWidgetBar } from '@mixer/desktop';
import { mkNotifier } from '@mixer/notifier';
import { zKeyLoadingProgressBar } from '@mixer/zkey-loader';

import { mkWidgetsConfig } from './widgets';
import { Footer, InfoFrame, Main, Root } from './styled';

export const mkApp = injectable(
  mkWidgetsConfig,
  mkDesktop,
  mkWalletConnect,
  mkWidgetBar,
  mkNotifier,
  zKeyLoadingProgressBar,
  combineEff(
    (
        WIDGETS_CONFIG,
        Desktop,
        WalletConnect,
        WidgetsBar,
        Notifier,
        ZKeyLoadingProgress
      ) =>
      () => {
        return (
          <Root>
            <Main>
              {/* <ZKeyLoadingProgress /> */}
              <Desktop widgetsConfig={WIDGETS_CONFIG} />
            </Main>
            <Footer>
              <AppBar
                position="static"
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'max-content 1fr min-content max-content',
                }}
              >
                <WalletConnect />
                <WidgetsBar />
                <Handle />
                <Toolbar>
                  <InfoFrame variant="status">
                    {/* <Notifier /> */}
                    <Clock />
                  </InfoFrame>
                </Toolbar>
              </AppBar>
            </Footer>
          </Root>
        );
      }
  )
);

const Clock = () => {
  const now = () =>
    new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

  const [time, setTime] = useState(now());

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(now());
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  return <span>{time}</span>;
};
