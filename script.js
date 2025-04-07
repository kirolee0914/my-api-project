// 토큰 생성 로직
document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiUrl = document.getElementById('apiUrl').value;
    const apiKey = document.getElementById('apiKey').value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': 'your_client_id',
                'client_secret': apiKey
            })
        });

        if (!response.ok) throw new Error('인증 실패');
        
        const { access_token } = await response.json();
        localStorage.setItem('sesc_token', access_token);
        window.location.href = 'categories.html';
        
    } catch (error) {
        alert('토큰 생성 실패: ' + error.message);
    }
});

// API 카테고리 로직
document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        { name: "엔드포인트 관리", url: "endpoint.html" },
        { name: "위협 탐지", url: "threat.html" },
        { name: "정책 관리", url: "policy.html" }
    ];

    const container = document.getElementById('categoryContainer');
    
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.marginBottom = '10px';
        card.innerHTML = `
            <div class="card-body" onclick="window.open('${cat.url}', '_blank')">
                ${cat.name}
            </div>`;
        container.appendChild(card);
    });
});
