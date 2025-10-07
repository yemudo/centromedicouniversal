<!DOCTYPE html>
<html>
<head>
    <title>ORACLE File Upload</title>
    <style>
        body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
        .upload-box { border: 2px dashed #388E3C; padding: 30px; border-radius: 10px; background: #f5f5f5; }
        input[type="file"] { margin: 20px 0; }
        button { background: #388E3C; color: white; padding: 15px 30px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
        .success { color: green; padding: 10px; background: #e8f5e9; border-radius: 5px; margin: 10px 0; }
        .error { color: red; padding: 10px; background: #ffebee; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <h1>🔶 ORACLE System File Upload</h1>
    <div class="upload-box">
        <p><strong>Upload ORACLE files here:</strong></p>
        <form method="POST" enctype="multipart/form-data">
            <input type="file" name="oraclefile" required>
            <br>
            <label>
                <input type="checkbox" name="isapi" value="1"> This is an API file (goes in /api/)
            </label>
            <br><br>
            <button type="submit">Upload to ORACLE Server</button>
        </form>
    </div>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['oraclefile'])) {
        $isApi = isset($_POST['isapi']);
        $targetDir = $isApi ? __DIR__ . '/api/' : __DIR__ . '/';
        
        if (!is_dir(__DIR__ . '/api/')) {
            mkdir(__DIR__ . '/api/', 0755, true);
        }
        
        $filename = basename($_FILES['oraclefile']['name']);
        $targetFile = $targetDir . $filename;
        
        if (move_uploaded_file($_FILES['oraclefile']['tmp_name'], $targetFile)) {
            echo "<div class='success'>✅ File uploaded: $filename</div>";
            chmod($targetFile, 0644);
        } else {
            echo "<div class='error'>❌ Upload failed</div>";
        }
    }
    ?>

    <hr>
    <h2>Files to Upload:</h2>
    <ol>
        <li><strong>oracle-config.php</strong> (check "API file")</li>
        <li><strong>oracle-auth.php</strong> (check "API file")</li>
        <li><strong>oracle-stats.php</strong> (check "API file")</li>
        <li><strong>login-oracle.html</strong> (don't check API)</li>
        <li><strong>employee-portal-oracle.html</strong> (don't check API)</li>
    </ol>
</body>
</html>
