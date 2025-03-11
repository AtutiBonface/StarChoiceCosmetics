module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: {
          1: 'var(--accent-color-1)',
          2: 'var(--accent-color-2)',
          3: 'var(--accent-color-3)',
        },
        text: {
          primary: 'var(--text-color-1)',
          secondary: 'var(--text-color-2)',
        }
      },
      boxShadow: {
        'card': '0 2px 4px var(--shadow-color)',
      }
    }
  }
}