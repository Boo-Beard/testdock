export default {
  projectName: 'TokenDock',
  tagline: 'test',
  mission: 'test missiion',
  branding: {
    logoUrl: '/images/tokendock-anchor-1024.png',
  },
  features: {
    skeletonOnCacheHit: false,
    minChartHeightMobile: 280
  },
  fonts: {
    body: "'Segoe UI', system-ui, sans-serif",
    projectName: "'DM Serif Text', serif",
    stats: "'Segoe UI', system-ui, sans-serif"
  },
  background: {
  
    type: 'color',  // type can be 'color' or 'video'
    color: null, // e.g. '#05080d' to override --bg-dark
    videoUrl: '', // e.g. 'https://framerusercontent.com/assets/UreOLyZkP4VdWf5ix2VEYeEMms.mp4'
    opacity: 0.6,
    filter: 'brightness(1) contrast(0.9)',
    overlayOpacity: 0.4
  },
  theme: {
    '--primary': '#2AABEE',
    '--primary-dark': '#2291D9',
    '--primary-light': '#4FB7F3',
    '--bg-dark': '#0E1621',
    '--bg-card': '#17212B',
    '--bg-card-light': '#1F2A38',
    '--text': '#E9EEF4',
    '--text-muted': '#8EA1B4',
    '--border': 'rgba(255,255,255,0.08)'
  },
  token: {
    address: '2Bwbeh361ywi1PpypDHabDb8VphNKCQt9ht2CRzFsYAE',
    chain: 'solana',
    useManualCirculatingSupply: true,
    circulatingSupply: 73564010,
    hideFDV: false
  },
  resolution: {
    addressSourceOrder: ['config', 'urlParam', 'path'],
    chainSourceOrder: ['config', 'urlParam', 'detectFromAddress', 'default'],
    defaultChain: 'solana',
    detectChainFromAddress: true
  },
  socials: {
    twitter: 'https://twitter.com/tokendockio',
    telegram: 'https://t.me/tokendockio',
    website: 'https://www.tokendock.io/',
    medium: 'https://www.tokendock.io/',
    github: 'https://www.tokendock.io/',
    instagram: 'https://www.tokendock.io/'
  },
  buttons: {
    button1: { label: 'Button 1', url: '' },
    button2: { label: 'Button 2', url: '' },
    button3: { label: 'Button 3 - Section', title: 'Branding', contentHtml: '' }
  },
  marketLinks: {
    dexscreener: { label: 'Dexscreener', url: 'https://dexscreener.com', logoUrl: 'https://dexscreener.com/favicon.png' },
    birdeye: { label: 'Birdeye', url: 'https://birdeye.so', logoUrl: 'https://birdeye.so/favicon.ico' },
    dextools: { label: 'Dextools', url: 'https://www.dextools.io/app', logoUrl: 'https://www.dextools.io/app/favicon.ico' }
  },
  nativeTokens: {
    // Chain -> native/wrapped native token address used for pricing in the chain badge
    ethereum: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    base: '0x4200000000000000000000000000000000000006',     // WETH
    arbitrum: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // WETH
    bsc: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',      // WBNB
    polygon: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',  // WMATIC
    optimism: '0x4200000000000000000000000000000000000006', // WETH
    avalanche: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',// WAVAX
    solana: 'So11111111111111111111111111111111111111112', // SOL
    sui: '0x2::sui::SUI'                                   // SUI
  },
  features: {
    enableChart: true,
    enableMetrics: true,
    defaultChartInterval: '1h',
    defaultHeikinAshi: true,
    modularChart: true,
    modularMetrics: false,
    // Contact form toggle (set to false to hide Contact button + form)
    enableContactForm: true
  },
  // Contact form configuration (optional)
  contactForm: {
    enabled: true,
    theme: {
      // Primary brand color used for header gradient, focus ring, and submit button
      primary: '#2AABEE',
      // Darker shade for hover states on submit button and title gradient
      primaryDark: '#2291D9',
      // Accent used for the header pill icon background
      accent: '#17D77E',
      // Card gradient background
      bg: '#17212B',
      bgLight: '#1F2A38',
      // Text colors
      text: '#E9EEF4',
      textMuted: '#8EA1B4',
      // Border color for inputs/card
      border: 'rgba(255,255,255,0.12)'
    }
  },
  chartTheme: {
    // Colors for candlesticks and indicators
    upColor: 'rgba(14,180,102,0.35)',
    downColor: 'rgba(230,57,70,0.35)',
    borderUpColor: '#17D77E',
    borderDownColor: '#FF4B5C',
    wickUpColor: 'rgba(23,215,126,0.9)',
    wickDownColor: 'rgba(255,75,92,0.9)',
    ema20Color: '#4FB7F3',
    ema50Color: '#B084F7',
    volumeColor: 'rgba(142,161,180,0.35)',
    // Layout & grid
    textColor: 'rgba(142,161,180,0.18)',
    backgroundColor: 'transparent',
    gridColor: 'transparent',
    crosshairColor: 'rgba(79,183,243,0.25)'
  }
};
