import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			black: '#0A0A0A',
  			'black-app-bg': '#121212',
  			white: '#FFFFFF',
  			'blue-sec': '#00497C',
  			blue: '#086FB7',
  			'blue-button': '#008AEA',
  			green: '#1F9163',
  			'green-sec': '#3C7E00',
  			'yellow-sec': '#C9A700',
  			yellow: '#FFE564',
  			brown: '#91694A',
  			'text-grey': '#8B8B8B',
  			grey: '#F9F9F9',
  			'grey-sec': '#F1F1F1',
  			outline: '#DFDFDF',
  			'orange-icon': '#F66600',
  			red: '#DD3246',
  			'grey-dark': '#222222',
  			'grey-sec-dark': '#1C1C1C',
  			'outline-dark': '#4A4A4A',
  			'icon-blue': '#3FA4EA',
  			'icon-purple': '#A87EFF',
  			'icon-yellow': '#FFDF41',
  			'icon-yellow-border': '#C1A30A',
  			'icon-purple-text': '#A764DC',
  			'icon-yellow-text': '#C1A30A',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			fadeInUp: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(4rem)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			appear: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in-up': 'fadeInUp 0.5s ease-in-out forwards',
  			appear: 'appear 1s linear forwards'
  		},
  		'navbar-heigth': '107px'
  	},
  	fontFamily: {
  		geist: [
  			'var(--font-geist-sans)'
  		]
  	},
  	boxShadow: {
  		shortcut: '0 15px 3px -15px rgba(0, 0, 0, 0.1)'
  	}
  },
  variants: {
    extend: {
      animation: ['responsive', 'motion-safe', 'motion-reduce']
    }
  },
  plugins: [
    require("tailwindcss-animate"), 
    require('tailwindcss-children'), 
  ],
} satisfies Config

export default config