module.exports = {
  content: [
    "./*.html",
    "./*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        o: ['Oxanium', 'sans-serif'],
        s: ['Space Grotesk', 'sans-serif'],
        f: ['Orbitron']
      },
      colors: {
        'red': '#FF0000',
        'green': '#00FF00',
        'blue': '#0000FF',
        'yellow': '#FFFF00',
        'purple': '#800080',
        'orange': '#FFA500',
        'pink': '#FFC0CB',
        'cyan': '#34eba4',
        'lime': '#00FF00',
        'indigo': '#4B0082',
        'violet': '#EE82EE',
        'brown': '#A52A2A',
        'grey': '#808080',
        'black': '#000000',
        'white': '#FFFFFF',
      },
    },

  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        ieee: {
            "primary": "#d2a85c",
                      
            "secondary": "#2f9c95",
                      
            "accent": "#40c9a2",
                      
            "neutral": "#e5f9e0",
                      
            "base-100": "#1a2e37",
                      
            "info": "#3b82f6",
                      
            "success": "#22c55e",
                      
            "warning": "#f59e0b",
                      
            "error": "#ef4444",
        },
      },
    ],
  },
}
