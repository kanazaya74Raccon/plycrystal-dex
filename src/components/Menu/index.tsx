import React, { useContext } from 'react'
import { Menu as UikitMenu, ConnectorNames, useMatchBreakpoints } from '@crystals/uikit'
import { useWeb3React } from '@web3-react/core'
import { LanguageContext } from 'hooks/LanguageContext'
import { useGetPriceDataFromLP } from 'hooks/useGetPriceData'
import { languageList } from 'constants/localization/languages'
import { injected, bsc, walletconnect } from 'connectors'
import links from './config'

const Menu = (props) => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const lpPrice = useGetPriceDataFromLP()
  const isDark = true
  // when merged into main site, this will be deprecated.
  const infoLink = `https://polygon.info.apeswap.finance/token/0x76bF0C28e604CC3fE9967c83b3C3F31c213cfE64`
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  
  return (
    <UikitMenu
      links={links(isMobile)}
      account={account as string}
      login={(connectorId: ConnectorNames) => {
        if (connectorId === 'walletconnect') {
          return activate(walletconnect)
        }

        if (connectorId === 'bsc') {
          return activate(bsc)
        }

        return activate(injected)
      }}
      logout={deactivate}
      isDark={isDark}
      currentLang={selectedLanguage?.code || ''}
      setLang={setSelectedLanguage}
      hideNetwork
      crystlPriceUsd={lpPrice}
      langs={languageList}
      infoLink={infoLink}
      {...props}
    />
  )
}

export default Menu
