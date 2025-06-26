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

### 10. Internet Speed Test 🌐
Diagnostic tool that rivals commercial speed test services:

#### **M-Lab NDT7 Integration**
Uses Measurement Lab's professional infrastructure for accurate download testing:

```javascript
async function runMLABSpeedTest() {
  // Locate nearest M-Lab server
  const server = await locateMLABServer();
  
  // Establish WebSocket connection for NDT7 protocol
  const ws = new WebSocket(server.wsUrl, 'net.measurementlab.ndt.v7');
  
  ws.onmessage = (event) => {
    if (event.data instanceof Blob) {
      totalBytes += event.data.size;
      const speedMbps = (totalBytes * 8) / (duration * 1024 * 1024);
      updateDownloadGauge(speedMbps);
    }
  };
}
```

#### **Smart Upload Testing**
Multi-tier upload testing with automatic fallbacks and data generation:

```javascript
// Bypass crypto API 65KB limit with chunked data generation
function createTestData(size) {
  const chunkSize = 65536;
  const chunks = Math.ceil(size / chunkSize);
  const result = new Uint8Array(size);
  
  for (let i = 0; i < chunks; i++) {
    const chunk = new Uint8Array(chunkLength);
    if (i === 0) {
      crypto.getRandomValues(chunk); // Real random data for first chunk
    } else {
      // Pattern data for remaining chunks
      for (let j = 0; j < chunkLength; j++) {
        chunk[j] = (i * 255 + j) % 256;
      }
    }
    result.set(chunk, start);
  }
  return result;
}

async function comprehensiveUploadTest() {
  // Primary: HTTPBin.org for accurate echo testing
  const httpbinResults = await testUploadWithHttpbin();
  
  // Fallback: Multiple endpoints with correction factors
  if (httpbinResults.length === 0) {
    const fallbackResults = await testUploadFallback();
    // Apply 30% correction for server processing overhead
    results.forEach(r => r.speed *= 0.7);
  }
  
  // Remove outliers (top/bottom 10%)
  const trimmed = results.slice(
    Math.floor(results.length * 0.1),
    Math.ceil(results.length * 0.9)
  );
  
  return calculateAverageSpeed(trimmed);
}
```

#### **Multi-Round Latency Testing**
Enhanced ping testing with outlier removal and multiple endpoints:

```javascript
async function comprehensiveLatencyTest() {
  const testEndpoints = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://api.github.com',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
  ];
  
  const results = [];
  
  // Multiple rounds for statistical accuracy
  for (let round = 0; round < 2; round++) {
    for (const endpoint of testEndpoints) {
      const startTime = performance.now();
      const response = await fetch(endpoint, { method: 'HEAD' });
      const latency = performance.now() - startTime;
      
      // Filter unrealistic results (cached or errors)
      if (latency > 1 && latency < 5000 && response.ok) {
        results.push(latency);
      }
    }
  }
  
  // Remove outliers for accuracy
  const sorted = results.sort((a, b) => a - b);
  const trimmed = sorted.slice(
    Math.floor(sorted.length * 0.1),
    Math.ceil(sorted.length * 0.9)
  );
  
  return {
    average: trimmed.reduce((a, b) => a + b) / trimmed.length,
    min: Math.min(...results),
    max: Math.max(...results)
  };
}
```

#### **Real-Time Visual Feedback**
Dynamic gauges and server information with live updates:

```javascript
function updateDownloadGauge(speedMbps) {
  const gauge = document.getElementById('downloadGauge');
  const percentage = Math.min(speedMbps / 100 * 100, 100);
  
  // Smooth animation
  gauge.style.width = `${percentage}%`;
  document.getElementById('downloadValue').textContent = `${speedMbps.toFixed(1)} Mbps`;
}

function updateServerInfo(serverData) {
  // Display M-Lab server details
  document.getElementById('serverDetails').innerHTML = `
    <div class="server-detail">
      <span>Provider</span>
      <span>${serverData.provider}</span>
    </div>
    <div class="server-detail">
      <span>Location</span>
      <span>${serverData.location.city}, ${serverData.location.country}</span>
    </div>
  `;
}
```

#### **Key Features:**
- **Professional Infrastructure**: Uses M-Lab's global network of servers
- **Accurate Measurements**: NDT7 protocol for download, multi-size uploads
- **Outlier Filtering**: Statistical analysis removes anomalous results
- **Fallback Systems**: Multiple endpoints ensure tests complete successfully
- **Real-Time Logging**: Detailed console output for transparency
- **Visual Feedback**: Live gauges and server information updates

---

## 🛠 Tech Stack & Features

**Vanilla HTML/CSS/JS** (no frameworks!)  
**CSS Grid & Flexbox** for responsive layouts  
**Keyframes, transitions, filters** for smooth animations  
**Fetch API + async/await** for GitHub data & speed testing  
**WebSocket connections** for M-Lab NDT7 protocol  
**Professional speed testing** with statistical analysis  
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

