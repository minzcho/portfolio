/* 홈 화면: data/projects.js 데이터로 프로젝트 카드 그리드 렌더링
   썸네일 아래에 제목과 세부 정보를 배치하고, 열 구성은 CSS가 처리합니다. */
(function () {
    const projects = window.PORTFOLIO_PROJECTS || [];
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    function cardEl(project) {
        const card = document.createElement('a');
        if (project.externalUrl) {
            /* 외부 링크 프로젝트: 상세 페이지 대신 새 탭으로 열기 */
            card.href = project.externalUrl;
            card.target = '_blank';
            card.rel = 'noopener';
        } else {
            card.href = 'project.html?id=' + encodeURIComponent(project.id);
        }
        /* 커스텀 커서 툴팁 문구 (projects.js의 cursorLabel로 프로젝트마다 변경 가능) */
        card.setAttribute('data-cursor-label',
            project.cursorLabel || (project.externalUrl ? 'Visit Site ↗' : 'View Project'));
        card.className = 'card card--' + (project.size || 'm');

        const text = document.createElement('div');
        text.className = 'card-text';

        const title = document.createElement('h2');
        title.className = 'card-title';
        title.textContent = project.title;

        const meta = document.createElement('p');
        meta.className = 'card-meta';
        [project.category, '•', project.date].forEach(function (t) {
            const span = document.createElement('span');
            span.textContent = t;
            meta.appendChild(span);
        });

        text.appendChild(title);
        text.appendChild(meta);

        const image = document.createElement('div');
        image.className = 'card-image';
        if (project.thumbVideo) {
            const video = document.createElement('video');
            video.src = project.thumbVideo;
            video.autoplay = true;
            video.muted = true;
            video.defaultMuted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'auto'; /* 경량 썸네일이라 즉시 전체 로드 */
            video.setAttribute('autoplay', '');
            video.setAttribute('muted', '');
            video.setAttribute('loop', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('aria-hidden', 'true');
            if (project.thumb) video.poster = project.thumb;
            image.appendChild(video);
        } else if (project.thumb) {
            const img = document.createElement('img');
            img.src = project.thumb;
            img.alt = project.title;
            image.appendChild(img);
        }

        card.appendChild(image);
        card.appendChild(text);
        return card;
    }

    projects.forEach(function (project) {
        grid.appendChild(cardEl(project));
    });
})();
