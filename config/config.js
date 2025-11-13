// Root configuration object exported for the app
export default {
  // Human-readable project name shown in the header
  projectName: 'Codec Flow',
  // Short tagline shown under the title
  tagline: 'All Things Codec, in One Place.',
  // Brief mission/description text
  mission: 'Execution layer for AI Operators and Robotics on Solana',

  // Branding-related assets
  branding: {
    // Logo image URL displayed in the header
    logoUrl: 'https://cdn.dexscreener.com/cms/images/a742ed988ceae039b57790e0968761c70c7d90cf907ded65232b29d839e2f6b7?width=128&height=128&fit=crop&quality=95&format=auto',
  },

  // Global feature toggles and layout prefs (boot-time)

  // Font families used across the app
  fonts: {
    // Default body font
  body: '"Handjet", sans-serif',
    // Title/project-name font
  projectName: '"Handjet", sans-serif',
    // Numeric/stats font
    stats: '"Handjet", sans-serif',
  },
  // Background presentation (color, video, or image)
  background: {
    // Background mode: 'color', 'video', 'image'
    type: 'image',
    // Solid color override (null uses theme --bg-dark)
    color: "#000000",
    // Optional solid background layer color (overrides fallback when not using video/image)
    solid: "#000000",
    // Optional background video URL
    videoUrl: '',
    // Optional background image URL (used when type === 'image')
    imageUrl: './images/background.png',
    // Image fit mode: 'cover' | 'contain' | 'fill' (used when type === 'image')
    imageFit: 'cover',
    // Image position (CSS object-position value) e.g., 'center center'
    imagePosition: 'center center',
    // Image repeat behavior: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
    imageRepeat: 'no-repeat',
    // Opacity applied to background media
    opacity: 1,
    // CSS filter applied to background media
    filter: 'brightness(1) contrast(1)',
    // Overlay darkness for readability
    overlayOpacity: 0.15,
    // Optional animated effect when using type === 'color'
    // Supported: 'matrix' | '' (off)
    effect: 'numbers',
  },

  // CSS variable theme for the UI
  theme: {
    // Primary brand color
    '--primary': '#af0', 
    // Darker shade of primary (hover/active)
    '--primary-dark': '#ffffffff',
    // Lighter shade of primary (accents)
    '--primary-light': '#aaff002b',
    // Main page background
    '--bg-dark': '#ffffffff',
    // Card surface background
    '--bg-card': '#00000000',
    // Lighter card surface for gradients
    '--bg-card-light': '#000000',
    // Primary text color
    '--text': '#e5f8ecff',
    // Muted/secondary text color
    '--text-muted': '#8EA1B4',
    // Default border color for surfaces
    '--border': 'rgba(255,255,255,0.08)'
  },



  // Token configuration used to fetch/compute stats
  token: {
    // Token contract/address (chain-specific format)
    address: '69LjZUUzxj3Cb3Fxeo1X4QpYEQTboApkhXTysPpbpump',
    // Default chain to use for the token
    chain: 'solana',
    // Whether to supply circulatingSupply manually
    useManualCirculatingSupply: true,
    // Manually specified circulating supply (if enabled)
    circulatingSupply: 749900825,
    // Hide fully diluted valuation display
    hideFDV: false,

    // Verified badge controls
    // When true, shows a prominent Verified badge (see verifiedStyle)
    verified: true  ,
    // Badge label text
    verifiedLabel: 'Verified',
    // Tooltip/info text
    verifiedInfo: 'This token has been Verified.',
    // Optional link for proof/details
    verifiedLink: '',
    // 'corner' (prominent corner stamp) or 'pill' (inline next to name)
    verifiedStyle: 'inline',
    // Enable pulsing glow on the pill (ignored for corner)
    verifiedPulse: true
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
    twitter: 'https://x.com/Codecopenflow',
    // Telegram group/channel URL
    telegram: 'https://t.me/codeflow_portal',
    // Main website URL
    website: 'https://codecflow.ai/',
    // Medium or blog URL
    medium: '',
    // GitHub organization/user URL
    github: 'https://github.com/codecflow',
    // Instagram profile URL
    instagram: '',
  linkedin: '',
  discord: 'https://discord.gg/4Vu2CPepng'
  },

  // Config for the three action buttons under the stats
  buttons: {
    // Button 1 label and destination
    button1: { label: 'Docs', url: 'https://docs.codecflow.ai/' },
    // Button 2 label and destination
    button2: { label: '', url: '' },
    // Button 3 opens an inline section with custom content
    button3: { label: 'Articles', title: 'Branding', contentHtml: '' }
  },

  // Market links rendered as small logo chips
  marketLinks: {
    // Dexscreener logo, label and URL
    dexscreener: { label: 'Dexscreener', url: 'https://dexscreener.com/solana/69LjZUUzxj3Cb3Fxeo1X4QpYEQTboApkhXTysPpbpump', logoUrl: 'https://dexscreener.com/favicon.png' },
    // Birdeye logo, label and URL
    birdeye: { label: 'Birdeye', url: 'https://birdeye.so/solana/token/69LjZUUzxj3Cb3Fxeo1X4QpYEQTboApkhXTysPpbpump', logoUrl: 'https://birdeye.so/favicon.ico' },
    // Dextools logo, label and URL
    dextools: { label: 'Dextools', url: 'https://www.dextools.io/app/en/solana/pair-explorer/69LjZUUzxj3Cb3Fxeo1X4QpYEQTboApkhXTysPpbpump?t=1762235661354', logoUrl: 'https://www.dextools.io/app/favicon.ico' }
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
    enableContactForm: false
  },

  // Contact form configuration and theming
  contactForm: {
    // Master enable for the contact form
    enabled: false,
    // Optional theme overrides scoped to the form
    theme: {
      // Primary brand color used by the form
      primary: '#52c97d',
      // Darker primary shade for hovers
      primaryDark: '#2291D9',
      // Accent color for small highlights
      accent: '#17D77E',
      // Card background color
      bg: '',
      // Lighter card background for gradients
      bgLight: '',
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
