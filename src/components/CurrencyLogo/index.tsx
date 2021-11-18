import { Currency, ETHER, Token } from '@crystals/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import CoinLogo from "../pancake/CoinLogo"

const getTokenLogoURL = (symbol?: string) => `/images/coins/${symbol ?? 'token'}.svg`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  
  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      return [getTokenLogoURL(currency.symbol)]
    }
    return []
  }, [currency])

  if (currency === ETHER) {
    return <StyledEthereumLogo src='/images/coins/MATIC.svg' size='24px' style={style} />
  }

  return (currency as any)?.symbol ? (
    <CoinLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
  ) : (
    <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
  )
}
