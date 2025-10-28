export default {
  projectName: 'TokenDock',
  tagline: 'test',
  mission: 'test missiion',
  branding: {
    logoUrl: '/images/tokendock-anchor-1024.png',
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
    address: '0xaA7D24c3E14491aBaC746a98751A4883E9b70843',
    chain: 'ethereum'
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
  features: {
    enableChart: true,
    enableMetrics: true,
    defaultChartInterval: '1h',
    defaultHeikinAshi: true,
    modularChart: true,
    modularMetrics: false
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
