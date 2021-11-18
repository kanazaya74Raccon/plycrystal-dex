import { ChainId } from '@crystals/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x95028E5B8a734bb7E2071F96De89BABe75be9C8E', // TODO
  [ChainId.MATICTESTNET]: '0x9Fc8e50Eb08C1F463b45d1AFb9c261B0a1903006'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
