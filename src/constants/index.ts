import { ChainId, JSBI, Percent, Token, WETH } from '@crystals/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

// import { bsc, fortmatic, injected, portis, walletconnect, walletlink } from '../connectors'
import { injected, bsc } from '../connectors'

// TODO
export const ROUTER_ADDRESS = process.env.REACT_APP_ROUTER_ADDRESS || '0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607'
export const FACTORY_ADDRESS = process.env.REACT_APP_FACTORY_ADDRESS || '0xCf083Be4164828f00cAE704EC15a36D711491284'
export const INIT_CODE = process.env.INIT_CODE || '0x511f0f358fe530cda0859ec20becf391718fdf5a329be02f4c95361f3d6a42d8'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const CRYSTL = new Token(
  ChainId.MAINNET,
  '0xda7b38fcb5d88be356b15fb45d6795ea3a15feb1',
  18,
  'CRYSTL',
  'Polycrystal Token'
)
export const USDC = new Token(ChainId.MAINNET, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6, 'USDC', 'USD Coin')
export const WBTC = new Token(
  ChainId.MAINNET,
  '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
  8,
  'WBTC',
  'Wrapped Bitcoin'
)
export const DAI = new Token(ChainId.MAINNET, '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 18, 'DAI', 'Dai Stablecoin')
export const ETH = new Token(ChainId.MAINNET, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, 'WETH', 'Wrapped Ether')
export const USDT = new Token(ChainId.MAINNET, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 6, 'USDT', 'Tether USD')
export const TEL = new Token(ChainId.MAINNET, '0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32', 2, 'TEL', 'Telcoin')
export const SUSHI = new Token(ChainId.MAINNET, '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a', 18, 'SUSHI', 'SushiToken')
export const BANANA = new Token(
  ChainId.MAINNET,
  '0x5d47baba0d66083c52009271faf3f50dcc01023c',
  18,
  'BANANA',
  'BananaToken'
)
export const AAVE = new Token(ChainId.MAINNET, '0xD6DF932A45C0f255f85145f286eA0b292B21C90B', 18, 'AAVE', 'Aave')
export const FRAX = new Token(ChainId.MAINNET, '0x104592a158490a9228070E0A8e5343B499e125D0', 18, 'FRAX', 'Frax')
export const FXS = new Token(ChainId.MAINNET, '0x3e121107F6F22DA4911079845a470757aF4e1A1b', 18, 'FXS', 'Frax Share')

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.MATICTESTNET]: [WETH[ChainId.MATICTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], CRYSTL, DAI, USDT, USDC],
  [ChainId.MATICTESTNET]: [...WETH_ONLY[ChainId.MATICTESTNET], CRYSTL, USDT],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [ETH.address]: [DAI, WETH[ChainId.MAINNET], ETH],
  },
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDT, USDC, CRYSTL],
  [ChainId.MATICTESTNET]: [...WETH_ONLY[ChainId.MATICTESTNET], CRYSTL, ETH],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDT, USDC, ETH, CRYSTL],
  [ChainId.MATICTESTNET]: [...WETH_ONLY[ChainId.MATICTESTNET], CRYSTL, USDT, ETH],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0xda7b38fcb5d88be356b15fb45d6795ea3a15feb1', 18, 'CRYSTL', 'Polycrystal Token'),
      new Token(ChainId.MAINNET, '0x5d47baba0d66083c52009271faf3f50dcc01023c', 18, 'BANANA', 'BANANA Token'),
    ],
    [CRYSTL, USDT],
    [BANANA, USDT],
  ],
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  BSC: {
    connector: bsc,
    name: 'Binance Chain Wallet',
    iconName: 'binance.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  // WALLET_CONNECT: {
  //   connector: walletconnect,
  //   name: 'WalletConnect',
  //   iconName: 'walletConnectIcon.svg',
  //   description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  //   href: null,
  //   color: '#4196FC',
  //   mobile: true
  // },
  // WALLET_LINK: {
  //   connector: walletlink,
  //   name: 'Coinbase Wallet',
  //   iconName: 'coinbaseWalletIcon.svg',
  //   description: 'Use Coinbase Wallet app on mobile device',
  //   href: null,
  //   color: '#315CF5'
  // },
  // COINBASE_LINK: {
  //   name: 'Open in Coinbase Wallet',
  //   iconName: 'coinbaseWalletIcon.svg',
  //   description: 'Open in Coinbase Wallet app.',
  //   href: 'https://go.cb-w.com/mtUDhEZPy1',
  //   color: '#315CF5',
  //   mobile: true,
  //   mobileOnly: true
  // },
  // FORTMATIC: {
  //   connector: fortmatic,
  //   name: 'Fortmatic',
  //   iconName: 'fortmaticIcon.png',
  //   description: 'Login using Fortmatic hosted wallet',
  //   href: null,
  //   color: '#6748FF',
  //   mobile: true
  // },
  // Portis: {
  //   connector: portis,
  //   name: 'Portis',
  //   iconName: 'portisIcon.png',
  //   description: 'Login using Portis hosted wallet',
  //   href: null,
  //   color: '#4A6C9B',
  //   mobile: true
  // }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))
