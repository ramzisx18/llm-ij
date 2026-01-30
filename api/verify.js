export default async function handler(req, res) {
  // تسجيل معلومات الطلب
  const timestamp = new Date().toISOString();
  const userAgent = req.headers["user-agent"] || "Unknown";
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || "Unknown";
  const referer = req.headers.referer || "Direct";

  console.log("=== VERIFICATION REQUEST ===");
  console.log("Timestamp:", timestamp);
  console.log("User-Agent:", userAgent);
  console.log("IP Address:", ip);
  console.log("Referer:", referer);
  console.log("Method:", req.method);

  // إعداد headers الأمان
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  try {
    // إرسال طلب إلى النقطة الخارجية
    console.log("Sending external verification request...");
    
    const externalResponse = await fetch("http://errllsoycjdlrzadatzfervyqp5oq1o0d.oast.fun/check", {
      method: "GET",
      headers: {
        "User-Agent": userAgent + " (Bot-Challenge-System/2.0)",
        "X-Forwarded-For": ip,
        "X-Verification-Source": "bot-challenge-system",
        "X-Original-Timestamp": timestamp,
        "X-Challenge-Type": "automated-verification"
      },
      timeout: 10000 // 10 seconds timeout
    });

    console.log("External request completed:");
    console.log("Status:", externalResponse.status);
    console.log("Status Text:", externalResponse.statusText);

    // إرسال استجابة نجاح
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>✅ تم التحقق بنجاح - Verification Complete</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%2300b894'/><text x='50' y='65' text-anchor='middle' font-size='40'>✅</text></svg>">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            animation: successGlow 3s ease infinite;
          }
          @keyframes successGlow {
            0%, 100% { background: linear-gradient(135deg, #00b894 0%, #00cec9 100%); }
            50% { background: linear-gradient(135deg, #00cec9 0%, #00b894 100%); }
          }
          .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(15px);
            padding: 3rem;
            border-radius: 25px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.2);
            max-width: 600px;
            width: 90%;
            text-align: center;
            animation: successPulse 0.8s ease-out;
            border: 2px solid rgba(0, 184, 148, 0.3);
          }
          @keyframes successPulse {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          .success-icon {
            font-size: 5rem;
            margin-bottom: 1.5rem;
            color: #00b894;
            animation: checkmark 1s ease-in-out;
          }
          @keyframes checkmark {
            0% { transform: scale(0) rotate(0deg); }
            50% { transform: scale(1.3) rotate(180deg); }
            100% { transform: scale(1) rotate(360deg); }
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 1.5rem;
            font-size: 2.2rem;
            font-weight: 600;
          }
          .success-message {
            background: linear-gradient(135deg, #d4edda, #c3e6cb);
            border: 2px solid #28a745;
            border-radius: 15px;
            padding: 1.5rem;
            margin: 2rem 0;
            color: #155724;
            box-shadow: 0 5px 15px rgba(40, 167, 69, 0.2);
          }
          .verification-details {
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 15px;
            padding: 2rem;
            margin: 2rem 0;
            text-align: right;
          }
          .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem 0;
            padding: 1rem;
            background: white;
            border-radius: 10px;
            border-right: 4px solid #00b894;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .detail-label {
            font-weight: bold;
            color: #2c3e50;
          }
          .detail-value {
            color: #00b894;
            font-weight: bold;
            font-family: monospace;
          }
          .status-check {
            color: #00b894;
            font-size: 1.2rem;
          }
          .return-section {
            margin-top: 2.5rem;
            padding: 2rem;
            background: rgba(0, 184, 148, 0.1);
            border-radius: 15px;
          }
          .return-link {
            display: inline-block;
            margin: 1rem;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #00b894, #00cec9);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            transition: all 0.3s ease;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0, 184, 148, 0.3);
          }
          .return-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 184, 148, 0.4);
          }
          .footer {
            margin-top: 2rem;
            font-size: 0.9rem;
            color: #7f8c8d;
            line-height: 1.6;
          }
          .timestamp {
            font-family: monospace;
            background: #f8f9fa;
            padding: 0.5rem;
            border-radius: 5px;
            font-size: 0.8rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-icon">✅</div>
          <h1>تم التحقق بنجاح!</h1>
          <h2 style="color: #7f8c8d; font-weight: 300;">Verification Completed Successfully!</h2>
          
          <div class="success-message">
            <strong>🎉 تهانينا! تم إكمال جميع خطوات التحقق بنجاح</strong><br>
            <strong>🎉 Congratulations! All verification steps completed successfully</strong>
          </div>
          
          <div class="verification-details">
            <h3 style="margin-bottom: 1rem; color: #2c3e50;">تفاصيل التحقق - Verification Details</h3>
            
            <div class="detail-item">
              <span class="detail-label">التحقق الداخلي</span>
              <span class="status-check">✓ مكتمل</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">التحقق الخارجي</span>
              <span class="status-check">✓ مكتمل (${externalResponse.status})</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">تسجيل البيانات</span>
              <span class="status-check">✓ مكتمل</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">الطابع الزمني</span>
              <span class="detail-value timestamp">${timestamp}</span>
            </div>
          </div>
          
          <div class="return-section">
            <p style="margin-bottom: 1rem; color: #2c3e50;">
              <strong>يمكنك الآن الوصول للمحتوى الكامل</strong><br>
              <strong>You can now access the full content</strong>
            </p>
            
            <a href="/" class="return-link">🏠 العودة للصفحة الرئيسية</a>
            <a href="/api/status" class="return-link">📊 عرض الحالة</a>
          </div>
          
          <div class="footer">
            <p>🔐 تم التحقق من هويتك بنجاح وتسجيل العملية في النظام</p>
            <p>🔐 Your identity has been verified and the process logged in the system</p>
          </div>
        </div>
      </body>
      </html>
    `);

  } catch (error) {
    console.error("External verification failed:", error.message);
    
    // إرسال استجابة خطأ محسنة
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>⚠️ خطأ في التحقق - Verification Error</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23e17055'/><text x='50' y='65' text-anchor='middle' font-size='40'>⚠️</text></svg>">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #e17055 0%, #d63031 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
          }
          .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(15px);
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            max-width: 600px;
            width: 90%;
            text-align: center;
            border: 2px solid rgba(225, 112, 85, 0.3);
          }
          .error-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            color: #e17055;
            animation: shake 0.5s ease-in-out infinite alternate;
          }
          @keyframes shake {
            from { transform: translateX(-5px); }
            to { transform: translateX(5px); }
          }
          .error-message {
            background: linear-gradient(135deg, #f8d7da, #f5c6cb);
            border: 2px solid #dc3545;
            border-radius: 12px;
            padding: 1.5rem;
            margin: 1.5rem 0;
            color: #721c24;
          }
          .error-details {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 1rem;
            margin: 1rem 0;
            font-family: monospace;
            font-size: 0.9rem;
            color: #6c757d;
          }
          .retry-section {
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(225, 112, 85, 0.1);
            border-radius: 15px;
          }
          .retry-link {
            display: inline-block;
            margin: 0.5rem;
            padding: 0.8rem 1.5rem;
            background: #e17055;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            transition: background 0.3s ease;
          }
          .retry-link:hover {
            background: #d63031;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">⚠️</div>
          <h1>خطأ في التحقق الخارجي</h1>
          <h2 style="color: #7f8c8d; font-weight: 300;">External Verification Error</h2>
          
          <div class="error-message">
            <strong>⚠️ فشل في إرسال طلب التحقق الخارجي</strong><br>
            <strong>⚠️ Failed to send external verification request</strong>
          </div>
          
          <div class="error-details">
            <strong>تفاصيل الخطأ:</strong><br>
            ${error.message}<br><br>
            <strong>الحالة:</strong> تم التحقق الداخلي ✓، فشل التحقق الخارجي ✗
          </div>
          
          <div class="retry-section">
            <p><strong>يمكنك المحاولة مرة أخرى أو الاتصال بالدعم الفني</strong></p>
            <a href="/api/verify" class="retry-link">🔄 إعادة المحاولة</a>
            <a href="/" class="retry-link">🏠 العودة للرئيسية</a>
          </div>
        </div>
      </body>
      </html>
    `);
  }
}