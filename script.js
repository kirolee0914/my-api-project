document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiUrl = document.getElementById('apiUrl').value;
    const basicAuth = document.getElementById('basicAuth').value;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "토큰 요청 중...";

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials'
            })
        });

        // 응답 상태 확인
        if (!response.ok) {
            const errorText = await response.text(); // 서버에서 반환한 에러 메시지
            throw new Error(`HTTP 오류: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const token = data.access_token;

        if (token) {
            localStorage.setItem('sesc_token', token);
            resultDiv.innerHTML = `<p style="color: green;">토큰 생성 성공!<br>Access Token: ${token}</p>`;
            setTimeout(() => {
                window.location.href = 'categories.html';
            }, 2000); // 2초 후 카테고리 페이지로 이동
        } else {
            resultDiv.innerHTML = `<p style="color: red;">토큰 생성 실패: 응답에 토큰이 없습니다.</p>`;
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `
            <p style="color: red;">오류 발생:</p>
            <pre>${error.message}</pre>
        `;
    }
});
