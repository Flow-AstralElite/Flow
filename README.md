# Flow - Project Guides Made Simple

A clean and modern guide/documentation site built with React, TypeScript, and Vite.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Flow-AstralElite/Flow.git
cd Flow

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📝 How to Add a New Post/Guide

### 1. Create Markdown File
Create a new `.md` file in `src/projects/markdown/`:
```bash
# Example: docker-guide.md
```

### 2. Import in GuidePage.tsx
Add to `src/pages/GuidePage.tsx`:
```typescript
import dockerGuideMarkdown from '../projects/markdown/docker-guide.md?raw'

const markdownFiles: Record<string, string> = {
  'openvpn-access-server.md': openvpnMarkdown,
  'docker-guide.md': dockerGuideMarkdown,  // Add this
}
```

### 3. Add to data.ts
Add to `src/projects/data.ts`:
```typescript
{
  slug: 'docker-guide',
  name: 'Docker Installation Guide',
  image: '/image/docker.png',
  tags: ['docker', 'tutorial'],
  markdownFile: 'docker-guide.md',
}
```

### 4. Add Image
Place image in `public/image/docker.png`

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

## 📧 Contact
Hi@astralelite.org