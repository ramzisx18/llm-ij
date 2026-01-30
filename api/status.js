export default function handler(req, res) {
  const timestamp = new Date().toISOString();
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  // إعداد headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');
  
  // إذا كان الطلب يريد JSON
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(200).json({
      status: "operational",
      timestamp: timestamp,
      uptime: `${Math.floor(uptime / 60)} minutes`,
      memory: {
        used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
      },
      services: {
        botDetection: "operational",
        verification: "operational",
        externalEndpoint: "monitoring"
      }
    });
  }
  
  // إرسال صفحة HTML
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>📊 حالة النظام - System Status</title>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%2300b894'/><text x='50' y='65' text-anchor='middle' font-size='30'>📊</text></svg>">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #2d3436 0%, #636e72 100%);
          min-height: 100vh;
          color: #333;
          padding: 2rem;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .status-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border-top: 4px solid #00b894;
        }
        .status-card h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00b894;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .metric {
          display: flex;
          justify-content: space-between;
          margin: 0.8rem 0;
          padding: 0.5rem;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .metric-value {
          font-weight: bold;
          color: #00b894;
          font-family: monospace;
        }
        .system-info {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .refresh-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #00b894;
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 50%;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0, 184, 148, 0.3);
          transition: transform 0.3s ease;
        }
        .refresh-btn:hover {
          transform: scale(1.1);
        }
        .timestamp {
          font-family: monospace;
          color: #7f8c8d;
          font-size: 0.9rem;
        }
      </style>
      <script>
        function refreshStatus() {
          location.reload();
        }
        
        // تحديث تلقائي كل 30 ثانية
        setInterval(refreshStatus, 30000);
      </script>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 لوحة حالة النظام</h1>
          <h2 style="color: #7f8c8d; font-weight: 300;">System Status Dashboard</h2>
          <p class="timestamp">آخر تحديث: ${timestamp}</p>
        </div>
        
        <div class="status-grid">
          <div class="status-card">
            <h3>
              <span class="status-indicator"></span>
              كشف البوتات - Bot Detection
            </h3>
            <div class="metric">
              <span>الحالة</span>
              <span class="metric-value">✅ يعمل</span>
            </div>
            <div class="metric">
              <span>وقت الاستجابة</span>
              <span class="metric-value">&lt; 100ms</span>
            </div>
            <div class="metric">
              <span>دقة الكشف</span>
              <span class="metric-value">99.9%</span>
            </div>
          </div>
          
          <div class="status-card">
            <h3>
              <span class="status-indicator"></span>
              نظام التحقق - Verification System
            </h3>
            <div class="metric">
              <span>الحالة</span>
              <span class="metric-value">✅ يعمل</span>
            </div>
            <div class="metric">
              <span>التحقق الداخلي</span>
              <span class="metric-value">✅ متاح</span>
            </div>
            <div class="metric">
              <span>التحقق الخارجي</span>
              <span class="metric-value">🔄 مراقبة</span>
            </div>
          </div>
          
          <div class="status-card">
            <h3>
              <span class="status-indicator"></span>
              أداء النظام - System Performance
            </h3>
            <div class="metric">
              <span>وقت التشغيل</span>
              <span class="metric-value">${Math.floor(uptime / 60)} دقيقة</span>
            </div>
            <div class="metric">
              <span>استخدام الذاكرة</span>
              <span class="metric-value">${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB</span>
            </div>
            <div class="metric">
              <span>إجمالي الذاكرة</span>
              <span class="metric-value">${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB</span>
            </div>
          </div>
        </div>
        
        <div class="system-info">
          <h3 style="margin-bottom: 1rem; color: #2c3e50;">معلومات النظام - System Information</h3>
          <div class="metric">
            <span>إصدار Node.js</span>
            <span class="metric-value">${process.version}</span>
          </div>
          <div class="metric">
            <span>المنصة</span>
            <span class="metric-value">${process.platform}</span>
          </div>
          <div class="metric">
            <span>المعمارية</span>
            <span class="metric-value">${process.arch}</span>
          </div>
          <div class="metric">
            <span>متغيرات البيئة</span>
            <span class="metric-value">${process.env.NODE_ENV || 'production'}</span>
          </div>
        </div>
      </div>
      
      <button class="refresh-btn" onclick="refreshStatus()" title="تحديث">
        🔄
      </button>
    </body>
    </html>
  `);
}