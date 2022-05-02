import { Button, Center, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Head from 'next/head';
import Web3Eth from 'web3-eth';
import { Check, X } from 'tabler-icons-react';

export default function Home() {
  async function addNetwork({ type }) {
    let eth = new Web3Eth(ethereum);
    let params = null;

    if (typeof eth !== 'undefined') {
      var network = 0;
      network = await eth.net.getId();
      let netID = network.toString();

      if (type === 'bnb') {
        if (netID === '56') {
          showNotification({
            title: 'Failed',
            message: 'BNB Network has already been added to Metamask.',
            color: 'red',
            icon: <X size={18} />,
          });
        } else {
          params = [
            {
              chainId: '0x38',
              chainName: 'Smart Chain',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com'],
            },
          ];

          window.ethereum
            .request({ method: 'wallet_addEthereumChain', params })
            .then(() =>
              showNotification({
                title: 'Success',
                message: 'BNB Network has been added to Metamask.',
                color: 'green',
                icon: <Check size={18} />,
              })
            )
            .catch((error) =>
              showNotification({
                title: 'Failed',
                message: error.message,
                color: 'red',
                icon: <X size={18} />,
              })
            );
        }

        if (type === 'harmony') {
          if (netID === '56') {
            showNotification({
              title: 'Failed',
              message: 'Harmony Network has already been added to Metamask.',
              color: 'red',
              icon: <X size={18} />,
            });
          } else {
            params = [
              {
                chainId: '1666600000',
                chainName: 'Harmony Mainnet',
                nativeCurrency: {
                  name: 'ONE',
                  symbol: 'ONE',
                  decimals: 18,
                },
                rpcUrls: ['https://api.harmony.one'],
                blockExplorerUrls: ['https://explorer.harmony.one/'],
              },
            ];
  
            window.ethereum
              .request({ method: 'wallet_addEthereumChain', params })
              .then(() =>
                showNotification({
                  title: 'Success',
                  message: 'Harmony Network has been added to Metamask.',
                  color: 'green',
                  icon: <Check size={18} />,
                })
              )
              .catch((error) =>
                showNotification({
                  title: 'Failed',
                  message: error.message,
                  color: 'red',
                  icon: <X size={18} />,
                })
              );
          }
      }
    } else {
      showNotification({
        title: 'Failed',
        message: 'Unable to locate a compatible web3 browser!',
        color: 'red',
        icon: <X size={18} />,
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Metamask Network</title>
        <meta name="description" content="Metamask Network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        <Stack>
          <Text size="xl">Metamask Network</Text>
          <Button
            onClick={() => addNetwork({ type: 'bnb' })}
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
          >
            Add BNB Network
          </Button>
          <Button
            onClick={() => addNetwork({ type: 'harmony' })}
            variant="gradient"
            gradient={{ from: 'cyan', to: 'teal' }}
          >
            Add Harmony Network
          </Button>
        </Stack>
      </Center>
    </div>
  );
}
