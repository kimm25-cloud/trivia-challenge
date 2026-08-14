---
applyTo: "app/**"
---

# Frontend Code Instructions

## Technology Rules
- Use vanilla JavaScript only (no React, Vue, or other frameworks)
- Use modern ES6+ syntax (const, let, arrow functions, template literals)
- Keep all code in single HTML files unless specifically asked to separate

## Styling Rules
- Use CSS variables for colors (define once like `--primary-color: #3B82F6`, use everywhere with `var(--primary-color)`)
- Mobile-first responsive design
- Minimum touch target size: 44x44 pixels

## Code Quality
- Add comments explaining "why", not "what"
- Use meaningful variable names (not x, y, temp)
- Handle errors gracefully with user-friendly messages

## Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML (button, nav, main, etc.)
- Include ARIA labels where needed
