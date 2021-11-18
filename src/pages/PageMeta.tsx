import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useGetPriceDataFromLP } from 'hooks/useGetPriceData'
import { useLocation } from 'react-router'

type PageMeta = {
    title: string
    description?: string
    image?: string
}

const defaultPageTitle = 'CRYSTL.Finance'
  
const DEFAULT_META: PageMeta = {
    title: defaultPageTitle,
    description: `A Yield Maximizer with a $CRYSTL Clear Future`,
    image: 'https://crystl.finance/logo.png',
  }
  
const customMeta: { [key: string]: PageMeta } = {
    'swap': {
      title: `Swap | ${defaultPageTitle}`,
    },
    'pool': {
      title: `Liquidity | ${defaultPageTitle}`,
    },
    'add': {
      title: `Add Liquidity | ${defaultPageTitle}`,
    },
}
const PageMeta = () => {
    const { pathname } = useLocation()
    const bananaPriceUsd = useGetPriceDataFromLP()
    const bananaPriceUsdDisplay = !bananaPriceUsd
      ? ''
      : `$${bananaPriceUsd?.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`
    const path = pathname.split('/')[1];
    const pageMeta = customMeta[path] || {}
    const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
    const pageTitle = bananaPriceUsdDisplay ? [bananaPriceUsdDisplay, title].join(' - ') : title

    return (
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Helmet>
    )
  }

export default PageMeta
