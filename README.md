# 🚀 Interactive CV — A Frontend Playground

Welcome! This isn't your typical static résumé. It's a single-page, interactive CV that doubles as a showcase for modern frontend tricks—everything from pixel-glow animations to live GitHub API calls, all written in vanilla HTML, CSS & JavaScript.

---

## 🔗 Live Preview

Just open `index.html` in your browser and dive right in.

---

## 🌟 What You'll See

### 1. Pixel-Perfect Animations
I've built custom keyframes to make elements glow and create that retro gaming feel:

```css
@keyframes miniPixelGlow {
  0%   { box-shadow: inset 0 0 2px rgba(255,255,255,0.2); filter: brightness(1); }
  100% { box-shadow: inset 0 0 4px rgba(255,255,255,0.4); filter: brightness(1.15); }
}

@keyframes typingDots {
  0%, 60%, 100% { opacity: 0; }
  10%, 50%      { opacity: 1; }
}
```

### 2. Responsive Layout with Grid & Flexbox
Whether you're on mobile or desktop, the sections rearrange themselves neatly:

```css
.activity-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}

.profile-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
```

### 3. Layered Gradients & Textures
Subtle radial dots over a dark linear gradient give depth to the background:

```css
background: linear-gradient(135deg, #000, #111 50%, #1a1a1a);
background-image:
  radial-gradient(circle at 20% 20%, rgba(0,255,0,0.03) 1px, transparent 1px),
  radial-gradient(circle at 80% 80%, rgba(0,255,0,0.02) 1px, transparent 1px);
```

### 4. Live GitHub Data
Fetches your latest GitHub profile and repos, all wrapped in async/await and robust error handling:

```javascript
async function fetchGitHubData() {
  try {
    const userResp  = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    const userData  = await userResp.json();
    const reposResp = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    const reposData = await reposResp.json();
    
    updateActivitySummary(userData, reposData);
    updateTopRepositories(reposData);
    await updateLanguageStats(reposData);
  } catch (error) {
    console.error('GitHub fetch error:', error);
    showGitHubError();
  }
}
```

### 5. Custom Number Animations
A tiny animation engine that counts up numbers smoothly:

```javascript
function animateNumber(elementId, finalValue) {
  const element = document.getElementById(elementId);
  const duration = 2000;
  const steps = 60;
  const increment = finalValue / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= finalValue) {
      current = finalValue;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, duration / steps);
}
```

### 6. Matrix Rain Background
Dynamic DOM creation with procedural animation for that cyberpunk vibe:

```javascript
function createMatrixEffect() {
  const chars = '01';
  const matrix = document.createElement('div');
  
  for (let i = 0; i < 50; i++) {
    const char = document.createElement('div');
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.cssText = `
      position: absolute;
      color: rgba(0, 255, 255, 0.1);
      animation: fall ${3 + Math.random() * 7}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    matrix.appendChild(char);
  }
  document.body.appendChild(matrix);
}
```

### 7. Silky Smooth Hover Effects
Pseudo-elements creating light sweeps across cards:

```css
.activity-card::before {
  content: '';
  position: absolute;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0,255,0,0.1), transparent);
  transition: left 0.5s ease;
}

.activity-card:hover::before {
  left: 100%;
}
```

### 8. Smart Contact Modals
Reusable modal system that adapts to email or phone interactions:

```javascript
function showContactModal(type, value) {
  const modal = document.getElementById('contactModal');
  
  if (type === 'email') {
    actionBtn.innerHTML = '📧 Send Email';
    actionBtn.onclick = () => window.location.href = `mailto:${value}`;
  } else if (type === 'phone') {
    actionBtn.innerHTML = '📞 Call';  
    actionBtn.onclick = () => window.location.href = `tel:${value}`;
  }
  
  modal.style.display = 'block';
}
```

### 9. Clipboard Magic with Fallbacks
Modern clipboard API with graceful degradation:

```javascript
function copyToClipboard(text, type) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification(`${type} copied to clipboard!`, 'success');
    }).catch(() => {
      fallbackCopyTextToClipboard(text, type);
    });
  } else {
    fallbackCopyTextToClipboard(text, type);
  }
}
```

---

## 🛠 Tech Stack & Features

**Vanilla HTML/CSS/JS** (no frameworks!)  
**CSS Grid & Flexbox** for responsive layouts  
**Keyframes, transitions, filters** for smooth animations  
**Fetch API + async/await** for GitHub data  
**Progressive enhancement** & accessibility best practices  
**Lazy loading** and optimized assets for performance  

---

## 📂 Structure

```
CV/
├── index.html          # Everything in one file
├── mePixelized.png     # Profile image  
├── myRes.png           # Resume PDF preview
└── README.md           # This file
```

---

## 🚀 Getting Started

1. Clone or download this repo
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)
3. Enjoy—and feel free to poke at the code!

