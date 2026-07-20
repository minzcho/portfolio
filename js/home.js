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
            /* iOS 자동재생 조건: muted/playsinline이 src보다 먼저 설정되어야 함 */
            video.muted = true;
            video.defaultMuted = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'auto'; /* 경량 썸네일이라 즉시 전체 로드 */
            video.setAttribute('autoplay', '');
            video.setAttribute('muted', '');
            video.setAttribute('loop', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('aria-hidden', 'true');
            if (project.thumb) video.poster = project.thumb;
            video.src = project.thumbVideo;
            /* 재생 가능해지면 즉시 재생 시도 (autoplay 속성이 무시되는 경우 대비) */
            video.addEventListener('loadeddata', function () {
                if (video.paused) {
                    const p = video.play();
                    if (p) p.catch(function () { /* 저전력 모드 등에서 거부 → 첫 제스처에서 재시도 */ });
                }
            });
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

    /* iOS 저전력 모드 등에서 자동재생이 거부된 경우:
       첫 터치/스크롤(카드가 아니어도 됨)에서 멈춰 있는 썸네일 영상을 일괄 재생.
       카드를 직접 누르지 않아도 되므로 페이지 이동 없이 재생이 시작된다. */
    function resumePausedVideos() {
        grid.querySelectorAll('video').forEach(function (video) {
            if (video.paused) {
                const p = video.play();
                if (p) p.catch(function () { /* 여전히 거부되면 다음 제스처에서 재시도 */ });
            }
        });
    }
    ['touchstart', 'scroll', 'pointerdown'].forEach(function (evt) {
        window.addEventListener(evt, resumePausedVideos, { passive: true });
    });
})();
