import { MenuEntry } from '@crystals/uikit'

export const BASE_APP_URL = process.env.REACT_APP_BASE_APP_URL || 'https://crystl.finance'

// when merged into main site, this will be deprecated.
const crystlAddress = '0x76bF0C28e604CC3fE9967c83b3C3F31c213cfE64'
const overviewUrl = `https://polygon.info.apeswap.finance/token/${crystlAddress}`
const coinGeckoUrl = `https://www.coingecko.com/en/coins/crystl-finance`
const dexGuruUrl = `https://dex.guru/token/${crystlAddress}-polygon`
const githubUrl = 'https://github.com/polycrystal'
const docsUrl = 'https://polycrystal.gitbook.io/polycrystal-finance/'
const communityUrl = 'https://linktr.ee/Crystl.Finance'
const suggestionsUrl = 'https://crystlfinance-featuresuggestions.nolt.io/'
const auditUrl = 'https://polycrystal.gitbook.io/polycrystal-finance/security/audits'

const config: (isMobile: boolean) => MenuEntry[] = (isMobile) => 
[
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: BASE_APP_URL,
  },
  {
    label: 'Vaults',
    icon: 'VaultIcon',
    items: [
      {
        label: 'Vaults',
        href: `${BASE_APP_URL}/vaults-v2`,
      },
      {
        label: 'Legacy Vaults',
        href: `${BASE_APP_URL}/vaults`,
      },
    ],
  },
  {
    label: 'Mines',
    icon: 'FarmIcon',
    href: `${BASE_APP_URL}/farms`,
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    items: [
      {
        label: 'Pools',
        href: `${BASE_APP_URL}/pools`,
      },
      {
        label: 'Hidden Gems',
        href: `${BASE_APP_URL}/hidden-gems`,
      },
      {
        label: 'Jewels',
        href: `${BASE_APP_URL}/jewels`,
      }
    ],
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
      {
        label: 'Faucet',
        href: `${BASE_APP_URL}/faucet`,
      },
    ],
  },
  {
    label: 'Community',
    icon: 'Community',
    href: communityUrl,
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: overviewUrl,
      },
      {
        label: 'Docs',
        href: docsUrl,
      },
      {
        label: 'Audit',
        href: auditUrl,
      },
      {
        label: 'CoinGecko',
        href: coinGeckoUrl,
      },
      {
        label: 'Charts',
        href: dexGuruUrl,
      },
      {
        label: 'Suggestions',
        href: suggestionsUrl,
      },
      {
        label: 'Github',
        href: githubUrl,
      },
    ],
  },
].filter((x) => isMobile || x.label !== 'Home')

export default config