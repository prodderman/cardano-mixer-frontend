import { useEffect, useState } from 'react';
import { AppBar, Handle, Toolbar } from 'react95';

import { runDeps } from '@mixer/react-injectable';
import { Mixer } from '@mixer/mixer';
import { WalletConnect, mkConnectWalletViewModel } from '@mixer/wallet-connect';

import { Footer, InfoFrame, Main, Root } from './styled';

function AppComponent() {
  return (
    <Root>
      <Main>
        {/* <div>
          <StyledMonitor backgroundStyles={{ backgroundColor: 'blue' }}>
            <ScrollView
              style={{ width: '100%', height: '100%' }}
              shadow={false}
            >
              {Object.keys(themes).map((theme) => (
                <div>{theme}</div>
              ))}
            </ScrollView>
          </StyledMonitor>
        </div> */}
        <Mixer />
      </Main>
      <Footer>
        <AppBar
          position="static"
          style={{
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr min-content max-content',
          }}
        >
          <WalletConnect />
          <div />
          <Handle />
          <Toolbar>
            <InfoFrame variant="status">
              <Clock />
            </InfoFrame>
          </Toolbar>
        </AppBar>
      </Footer>
    </Root>
  );
}

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

  return <>{time}</>;
};

export const App = runDeps(mkConnectWalletViewModel)(AppComponent);