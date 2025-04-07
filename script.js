document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    
    // authForm 요소 확인
    if (!authForm) {
        console.error('authForm 요소를 찾을 수 없습니다.');
        return; // 폼이 없으면 실행 중단
    }

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 입력 필드 확인
        const apiUrlInput = document.getElementById('apiUrl');
        const basicAuthInput = document.getElementById('basicAuth');
        
        if (!apiUrlInput || !basicAuthInput) {
            console.error('필수 입력 필드(apiUrl 또는 basicAuth)가 없습니다.');
            return; // 필드가 없으면 실행 중단
        }

        const apiUrl = apiUrlInput.value.trim();
        const basicAuth = basicAuthInput.value.trim();

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
});
