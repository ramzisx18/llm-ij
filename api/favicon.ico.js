export default function handler(req, res) {
  // إرسال SVG بسيط كـ favicon
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
    <circle cx="50" cy="50" r="45" fill="#667eea"/>
    <circle cx="35" cy="40" r="5" fill="white"/>
    <circle cx="65" cy="40" r="5" fill="white"/>
    <rect x="40" y="55" width="20" height="8" rx="4" fill="white"/>
    <rect x="25" y="25" width="50" height="8" rx="4" fill="#764ba2"/>
  </svg>`;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // cache لمدة يوم
  res.status(200).send(svg);
}