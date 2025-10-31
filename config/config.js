// Root configuration object exported for the app
export default {
  // Human-readable project name shown in the header
  projectName: 'ZERA',
  // Short tagline shown under the title
  tagline: 'A NEW ZERO-KNOWLEDGE ERA IS HERE.',
  // Brief mission/description text
  mission: 'test ZERA turns your crypto assets into private, portable & secure digital cash',

  // Branding-related assets
  branding: {
    // Logo image URL displayed in the header
    logoUrl: 'https://api.zeralabs.org/image/1',
  },

  // Global feature toggles and layout prefs (boot-time)

  // Font families used across the app
  fonts: {
    // Default body font
    body: "'IBM Plex Mono",
    // Title/project-name font
    projectName: "'IBM Plex Mono",
    // Numeric/stats font
    stats: "'IBM Plex Mono"
  },
  // Background presentation (color or video)
  background: {
    // Background mode: 'color' or 'video'
    type: 'color',
    // Solid color override (null uses theme --bg-dark)
    color: null,
    // Optional background video URL
    videoUrl: '',
    // Opacity applied to background media
    opacity: 0.6,
    // CSS filter applied to background media
    filter: 'brightness(1) contrast(0.9)',
    // Overlay darkness for readability
    overlayOpacity: 0.4
  },

  // CSS variable theme for the UI
  theme: {
    // Primary brand color
    '--primary': '#2AABEE',
    // Darker shade of primary (hover/active)
    '--primary-dark': '#2291D9',
    // Lighter shade of primary (accents)
    '--primary-light': '#4FB7F3',
    // Main page background
    '--bg-dark': '#0E1621',
    // Card surface background
    '--bg-card': '#17212B',
    // Lighter card surface for gradients
    '--bg-card-light': '#1F2A38',
    // Primary text color
    '--text': '#E9EEF4',
    // Muted/secondary text color
    '--text-muted': '#8EA1B4',
    // Default border color for surfaces
    '--border': 'rgba(255,255,255,0.08)'
  },

  // Token configuration used to fetch/compute stats
  token: {
    // Token contract/address (chain-specific format)
    address: '2Bwbeh361ywi1PpypDHabDb8VphNKCQt9ht2CRzFsYAE',
    // Default chain to use for the token
    chain: 'solana',
    // Whether to supply circulatingSupply manually
    useManualCirculatingSupply: true,
    // Manually specified circulating supply (if enabled)
    circulatingSupply: 73564010,
    // Hide fully diluted valuation display
    hideFDV: false
  },

  // How we resolve address/chain from various sources
  resolution: {
    // Priority order for reading token address
    addressSourceOrder: ['config', 'urlParam', 'path'],
    // Priority order for determining chain
    chainSourceOrder: ['config', 'urlParam', 'detectFromAddress', 'default'],
    // Fallback chain if undetermined
    defaultChain: 'solana',
    // Try to infer chain from the address format
    detectChainFromAddress: true
  },

  // External links for the project
  socials: {
    // Twitter/X profile URL
    twitter: 'https://twitter.com/tokendockio',
    // Telegram group/channel URL
    telegram: 'https://t.me/tokendockio',
    // Main website URL
    website: 'https://www.tokendock.io/',
    // Medium or blog URL
    medium: 'https://www.tokendock.io/',
    // GitHub organization/user URL
    github: 'https://www.tokendock.io/',
    // Instagram profile URL
    instagram: 'https://www.tokendock.io/'
  },

  // Config for the three action buttons under the stats
  buttons: {
    // Button 1 label and destination
    button1: { label: 'Button 1', url: '' },
    // Button 2 label and destination
    button2: { label: 'Button 2', url: '' },
    // Button 3 opens an inline section with custom content
    button3: { label: 'Button 3 - Section', title: 'Branding', contentHtml: '' }
  },

  // Market links rendered as small logo chips
  marketLinks: {
    // Dexscreener logo, label and URL
    dexscreener: { label: 'Dexscreener', url: 'https://dexscreener.com', logoUrl: 'https://dexscreener.com/favicon.png' },
    // Birdeye logo, label and URL
    birdeye: { label: 'Birdeye', url: 'https://birdeye.so', logoUrl: 'https://birdeye.so/favicon.ico' },
    // Dextools logo, label and URL
    dextools: { label: 'Dextools', url: 'https://www.dextools.io/app', logoUrl: 'https://www.dextools.io/app/favicon.ico' }
  },

  // Native/wrapped native token addresses per chain
  nativeTokens: {
    // Ethereum mainnet wrapped native token (WETH)
    ethereum: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    // Base chain wrapped native token (WETH)
    base: '0x4200000000000000000000000000000000000006',
    // Arbitrum wrapped native token (WETH)
    arbitrum: '0x82aF49447D8A07e3bd95BD0d56f35241523fBab1',
    // BNB Smart Chain wrapped native token (WBNB)
    bsc: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    // Polygon wrapped native token (WMATIC)
    polygon: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    // Optimism wrapped native token (WETH)
    optimism: '0x4200000000000000000000000000000000000006',
    // Avalanche wrapped native token (WAVAX)
    avalanche: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    // Solana native token pseudo-address (SOL)
    solana: 'So11111111111111111111111111111111111111112',
    // Sui native token module (SUI)
    sui: '0x2::sui::SUI'
  },

  // Feature flags and layout prefs (merged)
  features: {
    // Show skeletons when pulling from cache
    skeletonOnCacheHit: false,
    // Minimum chart height specifically on mobile
    minChartHeightMobile: 280,
    // Enable chart module
    enableChart: true,
    // Enable metrics module
    enableMetrics: true,
    // Default chart candle interval
    defaultChartInterval: '1h',
    // Use Heikin Ashi candles by default
    defaultHeikinAshi: true,
    // Use modular chart implementation
    modularChart: true,
    // Use modular metrics implementation
    modularMetrics: false,
    // Enable the Contact Us form (can be overridden by contactForm.enabled)
    enableContactForm: true
  },

  // Contact form configuration and theming
  contactForm: {
    // Master enable for the contact form
    enabled: true,
    // Optional theme overrides scoped to the form
    theme: {
      // Primary brand color used by the form
      primary: '#2AABEE',
      // Darker primary shade for hovers
      primaryDark: '#2291D9',
      // Accent color for small highlights
      accent: '#17D77E',
      // Card background color
      bg: '#17212B',
      // Lighter card background for gradients
      bgLight: '#1F2A38',
      // Form text color
      text: '#E9EEF4',
      // Muted form text color
      textMuted: '#8EA1B4',
      // Border color for inputs and card
      border: 'rgba(255,255,255,0.12)'
    }
  },

  // Chart component theme (candles, grid, overlays)
  chartTheme: {
    // Candle up color (body fill)
    upColor: 'rgba(14,180,102,0.35)',
    // Candle down color (body fill)
    downColor: 'rgba(230,57,70,0.35)',
    // Candle outline color when price closes up
    borderUpColor: '#17D77E',
    // Candle outline color when price closes down
    borderDownColor: '#FF4B5C',
    // Wick color when price closes up
    wickUpColor: 'rgba(23,215,126,0.9)',
    // Wick color when price closes down
    wickDownColor: 'rgba(255,75,92,0.9)',
    // 20-period EMA line color
    ema20Color: '#4FB7F3',
    // 50-period EMA line color
    ema50Color: '#B084F7',
    // Volume bar color
    volumeColor: 'rgba(142,161,180,0.35)',
    // Chart axis and label text color
    textColor: 'rgba(142,161,180,0.18)',
    // Chart background (transparent over card)
    backgroundColor: 'transparent',
    // Grid line color (hidden/transparent)
    gridColor: 'transparent',
    // Crosshair color overlay
    crosshairColor: 'rgba(79,183,243,0.25)'
  }
};
