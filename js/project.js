/* 프로젝트 페이지: URL의 ?id= 값으로 data/projects.js에서 프로젝트를 찾아
   헤더(타이틀/히어로/메타) + 본문 블록을 렌더링.
   aside에는 본문 'section' 블록의 subtitle로 목차를 만들고,
   스크롤 위치에 따라 현재 섹션을 강조(스크롤 스파이)한다. */
(function () {
    const projects = window.PORTFOLIO_PROJECTS || [];
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const project = projects.find(function (p) { return p.id === id; }) || projects[0];
    if (!project) return;

    document.title = project.title + ' — MinJung Cho';

    /* --- 헤더 --- */
    document.getElementById('projCategory').textContent = project.category;
    document.getElementById('projDate').textContent = project.date;
    const titleEl = document.getElementById('projTitle');
    titleEl.textContent = project.title;

    /* 타이틀 아래 한 줄 요약 (선택) */
    if (project.summary) {
        const summary = document.createElement('p');
        summary.className = 'project-summary';
        summary.textContent = project.summary;
        titleEl.insertAdjacentElement('afterend', summary);
    }

    const hero = document.getElementById('projHero');
    if (project.hero) {
        const img = document.createElement('img');
        img.src = project.hero;
        img.alt = project.title;
        hero.appendChild(img);
    }

    const metaEl = document.getElementById('projMeta');
    /* 값이 없는 항목은 렌더링하지 않음 — 예: 고객사가 없는 프로젝트는
       meta에 client 대신 service(서비스명)만 넣으면 됨 */
    const metaDefs = [
        ['역할', project.meta.role],
        ['기간', project.meta.period],
        ['고객사', project.meta.client],
        ['서비스명', project.meta.service],
        ['기여도', project.meta.contribution],
    ].filter(function (def) {
        const value = def[1];
        return Array.isArray(value) ? value.length > 0 : Boolean(value);
    });
    metaDefs.forEach(function (def) {
        const item = document.createElement('div');
        item.className = 'meta-item';
        const dt = document.createElement('dt');
        dt.textContent = def[0];
        item.appendChild(dt);
        const lines = Array.isArray(def[1]) ? def[1] : [def[1]];
        lines.forEach(function (line, i) {
            const dd = document.createElement('dd');
            dd.textContent = line;
            if (i > 0) dd.style.marginTop = '0';
            item.appendChild(dd);
        });
        metaEl.appendChild(item);
    });

    /* --- 본문 블록 --- */
    /* 소제목/라벨 옆에 붙는 아이콘들 (24px: warning·check, 32px: lightbulb·chat) */
    const ICONS = {
        warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M10.3 3.8 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
        lightbulb: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M12 24h8"/><path d="M13.5 28h5"/><path d="M16 4a8.5 8.5 0 0 0-5 15.3c1 .8 1.6 1.5 1.8 2.7h6.4c.2-1.2.8-1.9 1.8-2.7A8.5 8.5 0 0 0 16 4z"/></svg>',
        chat: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M16 5C9.4 5 4 9.7 4 15.5c0 2.6 1.1 5 3 6.8L6 27l5.4-2a13.6 13.6 0 0 0 4.6.8c6.6 0 12-4.7 12-10.5S22.6 5 16 5z"/><circle cx="11" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="16" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="21" cy="15.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
        thumbsUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M7 10v11"/><path d="M3 11a1 1 0 0 1 1-1h3v11H4a1 1 0 0 1-1-1v-9z"/><path d="M7 11 11 3a2.4 2.4 0 0 1 2.4 2.4V9h5.2a2 2 0 0 1 2 2.4l-1.3 7a2 2 0 0 1-2 1.6H7"/></svg>',
        thumbsDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M17 14V3"/><path d="M21 13a1 1 0 0 1-1 1h-3V3h3a1 1 0 0 1 1 1v9z"/><path d="M17 13l-4 8a2.4 2.4 0 0 1-2.4-2.4V15H5.4a2 2 0 0 1-2-2.4l1.3-7a2 2 0 0 1 2-1.6H17"/></svg>',
    };

    function iconEl(name) {
        const span = document.createElement('span');
        span.className = 'block-icon';
        span.innerHTML = ICONS[name] || '';
        return span;
    }

    /* [표시 문구](https://...) 형식만 링크로 바꾸고 나머지는 일반 텍스트로 유지한다. */
    function appendTextWithLinks(parent, value) {
        const source = String(value || '');
        const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        let cursor = 0;
        let match;

        while ((match = linkPattern.exec(source)) !== null) {
            parent.appendChild(document.createTextNode(source.slice(cursor, match.index)));
            const link = document.createElement('a');
            link.href = match[2];
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = match[1];
            parent.appendChild(link);
            cursor = match.index + match[0].length;
        }

        parent.appendChild(document.createTextNode(source.slice(cursor)));
    }

    function imgBlockEl(data) {
        const block = document.createElement('figure');
        const hasCaption = Boolean(data.caption);
        /* 캡션이 없으면 회색 배경/캡션 바 없이 이미지만 라운드 처리 */
        block.className = hasCaption ? 'img-block' : 'img-block img-block--plain';
        const area = document.createElement('div');
        area.className = 'img-area';
        if (data.src) {
            const img = document.createElement('img');
            img.src = data.src;
            img.alt = data.caption || data.alt || '';
            area.appendChild(img);
        } else if (data.ratio) {
            area.style.aspectRatio = data.ratio.replace('/', ' / ');
        }
        block.appendChild(area);
        if (hasCaption) {
            const caption = document.createElement('figcaption');
            caption.className = 'img-caption';
            caption.textContent = data.caption;
            block.appendChild(caption);
        }
        return block;
    }

    function videoBlockEl(data) {
        const block = document.createElement('figure');
        block.className = 'video-block';

        const video = document.createElement('video');
        video.className = 'viewport-video';
        video.src = data.src || '';
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('aria-label', data.alt || '프로젝트 인터랙션 영상');
        if (data.poster) video.poster = data.poster;
        block.appendChild(video);

        if (data.caption) {
            const caption = document.createElement('figcaption');
            caption.className = 'video-caption';
            caption.textContent = data.caption;
            block.appendChild(caption);
        }
        return block;
    }

    const body = document.getElementById('projBody');
    const tocSections = []; /* { id, label, el } — aside 목차용 */

    /* 섹션 children 배열의 블록 하나를 DOM 요소로 변환 */
    function renderBlock(block) {
        let el;
        switch (block.type) {
            case 'text': {
                el = document.createElement('p');
                el.className = 'body-text';
                el.textContent = block.text || '';
                break;
            }
            case 'image': {
                el = imgBlockEl(block);
                break;
            }
            case 'imageGroup': {
                el = document.createElement('div');
                el.className = 'img-group';
                if (block.columns) {
                    el.style.setProperty('--img-group-columns', block.columns);
                }
                (block.images || []).forEach(function (img) {
                    el.appendChild(imgBlockEl(img));
                });
                break;
            }
            /* 비율이 서로 다른 긴 이미지들을 원본 비율로 넘겨보는 갤러리
               { images: [{src, alt, caption}], label?: '갤러리 설명' } */
            case 'horizontalGallery': {
                el = document.createElement('div');
                el.className = 'horizontal-gallery';
                el.setAttribute('role', 'region');
                el.setAttribute('aria-label', block.label || '프로젝트 이미지 갤러리');

                const track = document.createElement('div');
                track.className = 'horizontal-gallery-track';
                track.tabIndex = 0;
                (block.images || []).forEach(function (imageData) {
                    const figure = document.createElement('figure');
                    figure.className = 'horizontal-gallery-item';
                    const img = document.createElement('img');
                    img.src = imageData.src || '';
                    img.alt = imageData.alt || imageData.caption || '';
                    img.loading = 'lazy';
                    figure.appendChild(img);
                    if (imageData.caption) {
                        const caption = document.createElement('figcaption');
                        caption.className = 'horizontal-gallery-caption';
                        caption.textContent = imageData.caption;
                        figure.appendChild(caption);
                    }
                    track.appendChild(figure);
                });
                el.appendChild(track);
                break;
            }
            case 'video': {
                el = videoBlockEl(block);
                break;
            }
            case 'quote': {
                el = document.createElement('blockquote');
                el.className = 'quote-block';
                const head = document.createElement('p');
                head.className = 'quote-head';
                const name = document.createElement('span');
                name.className = 'quote-name';
                name.textContent = block.name || '';
                head.appendChild(name);
                if (block.role) {
                    const role = document.createElement('span');
                    role.className = 'quote-role';
                    role.textContent = block.role;
                    head.appendChild(role);
                }
                const text = document.createElement('p');
                text.className = 'quote-text';
                appendTextWithLinks(text, block.text);
                el.appendChild(head);
                el.appendChild(text);
                break;
            }
            /* 소제목 블록: 20px 제목(+선택 아이콘) + 설명 텍스트
               icon: 'warning' | 'check' → 제목 뒤 / 'lightbulb' | 'chat' → 제목 앞 */
            case 'heading': {
                el = document.createElement('div');
                el.className = 'block-heading';
                const h = document.createElement('h3');
                h.className = 'heading-title';
                const label = document.createElement('span');
                label.textContent = block.title || '';
                if (block.icon === 'lightbulb' || block.icon === 'chat') {
                    h.appendChild(iconEl(block.icon));
                    h.appendChild(label);
                } else {
                    h.appendChild(label);
                    if (block.icon) h.appendChild(iconEl(block.icon));
                }
                el.appendChild(h);
                if (block.text) {
                    const text = document.createElement('p');
                    text.className = 'body-text';
                    text.textContent = block.text;
                    el.appendChild(text);
                }
                break;
            }
            /* 통계 밴드: 다크 패널에 지표 나열 + 선택적으로 참가자 피드백 리스트
               { items: [{value, label}], feedback: [{good, text, who}] } */
            case 'stats': {
                el = document.createElement('div');
                el.className = 'stats-block';
                const row = document.createElement('div');
                row.className = 'stats-row';
                (block.items || []).forEach(function (item) {
                    const stat = document.createElement('div');
                    stat.className = 'stat-item';
                    const value = document.createElement('p');
                    value.className = 'stat-value';
                    value.textContent = item.value;
                    const label = document.createElement('p');
                    label.className = 'stat-label';
                    label.textContent = item.label;
                    stat.appendChild(value);
                    stat.appendChild(label);
                    row.appendChild(stat);
                });
                el.appendChild(row);
                if (block.feedback && block.feedback.length) {
                    const feed = document.createElement('div');
                    feed.className = 'stats-feedback';
                    block.feedback.forEach(function (fb) {
                        const line = document.createElement('div');
                        line.className = 'feedback-row';
                        const left = document.createElement('div');
                        left.className = 'feedback-text';
                        left.appendChild(iconEl(fb.good === false ? 'thumbsDown' : 'thumbsUp'));
                        const t = document.createElement('span');
                        t.textContent = fb.text;
                        left.appendChild(t);
                        line.appendChild(left);
                        if (fb.who) {
                            const who = document.createElement('span');
                            who.className = 'feedback-who';
                            who.textContent = fb.who;
                            line.appendChild(who);
                        }
                        feed.appendChild(line);
                    });
                    el.appendChild(feed);
                }
                break;
            }
            /* AS-IS / TO-BE 비교표
               { columns: ['AS-IS', 'TO-BE'], rows: [{ label, before, after, delta }] } */
            case 'metricTable': {
                el = document.createElement('div');
                el.className = 'metric-table';

                const header = document.createElement('div');
                header.className = 'metric-row metric-row--header';
                ['', ...(block.columns || ['AS-IS', 'TO-BE']), ''].forEach(function (value) {
                    const cell = document.createElement('div');
                    cell.className = 'metric-cell';
                    cell.textContent = value;
                    header.appendChild(cell);
                });
                el.appendChild(header);

                (block.rows || []).forEach(function (rowData) {
                    const row = document.createElement('div');
                    row.className = 'metric-row';
                    [rowData.label, rowData.before, rowData.after].forEach(function (value, i) {
                        const cell = document.createElement('div');
                        cell.className = 'metric-cell' + (i > 0 ? ' metric-value' : '');
                        cell.textContent = value || '';
                        row.appendChild(cell);
                    });
                    const delta = document.createElement('div');
                    delta.className = 'metric-cell';
                    const badge = document.createElement('span');
                    badge.className = 'metric-delta' +
                        (rowData.tone === 'neutral' ? ' metric-delta--neutral' : '') +
                        (rowData.tone === 'negative' ? ' metric-delta--negative' : '');
                    badge.textContent = rowData.delta || '';
                    delta.appendChild(badge);
                    row.appendChild(delta);
                    el.appendChild(row);
                });
                break;
            }
            /* 관찰/측정/기준 카드: { title, rows: [{label, text}] } */
            case 'criteria': {
                el = document.createElement('div');
                el.className = 'criteria-block';
                if (block.title) {
                    const h = document.createElement('h3');
                    h.className = 'heading-title';
                    h.textContent = block.title;
                    el.appendChild(h);
                }
                const card = document.createElement('div');
                card.className = 'criteria-card';
                const inner = document.createElement('div');
                inner.className = 'criteria-inner';
                (block.rows || []).forEach(function (rowData) {
                    const row = document.createElement('div');
                    row.className = 'criteria-row';
                    const label = document.createElement('p');
                    label.className = 'criteria-label';
                    label.textContent = rowData.label;
                    const text = document.createElement('p');
                    text.className = 'criteria-text';
                    text.textContent = rowData.text;
                    row.appendChild(label);
                    row.appendChild(text);
                    inner.appendChild(row);
                });
                card.appendChild(inner);
                el.appendChild(card);
                break;
            }
            /* CTA 버튼: { text, href } — 우측 정렬 파란 버튼 */
            case 'cta': {
                el = document.createElement('div');
                el.className = 'cta-row';
                const btn = document.createElement('a');
                btn.className = 'cta-button';
                btn.href = block.href || '#';
                if (/^https?:/.test(block.href || '')) {
                    btn.target = '_blank';
                    btn.rel = 'noopener';
                }
                const label = document.createElement('span');
                label.textContent = block.text || '';
                const arrow = document.createElement('span');
                arrow.className = 'cta-arrow';
                arrow.textContent = '↗';
                btn.appendChild(label);
                btn.appendChild(arrow);
                el.appendChild(btn);
                break;
            }
        }
        return el;
    }

    /* sections 배열 → <section class="block-section"> 하나씩 생성.
       섹션 사이 80px, 섹션 내부 블록 사이 40px 간격은 CSS gap이 처리 */
    (project.sections || []).forEach(function (sectionData, index) {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'block-section';
        const sectionSlugSource = sectionData.subtitle || sectionData.title || index;
        sectionEl.id = 'section-' + index + '-' +
            String(sectionSlugSource).toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-');
        /* 섹션 수에는 제한을 두지 않는다. title이 있으면 생성되는 h2와 1:1이고,
           title 없이 이미지만 쓰는 기존 프로젝트도 subtitle로 목차를 유지한다. */
        tocSections.push({
            id: sectionEl.id,
            label: sectionData.subtitle || sectionData.title || 'Section ' + (index + 1),
            el: sectionEl,
        });

        /* 섹션 머리(서브타이틀 + 제목 + 도입 텍스트).
           hideHeader가 true면 aside 목차에만 표시하고 본문 머리는 생략한다. */
        if (!sectionData.hideHeader) {
            const head = document.createElement('div');
            head.className = 'section-head';
            const sub = document.createElement('p');
            sub.className = 'section-subtitle';
            sub.textContent = sectionData.subtitle || '';
            head.appendChild(sub);
            if (sectionData.title) {
                const title = document.createElement('h2');
                title.className = 'section-title';
                title.textContent = sectionData.title;
                head.appendChild(title);
            }
            if (sectionData.text) {
                const text = document.createElement('p');
                text.className = 'body-text';
                text.textContent = sectionData.text;
                head.appendChild(text);
            }
            sectionEl.appendChild(head);
        }

        /* 섹션 내용물 */
        (sectionData.children || []).forEach(function (block) {
            const el = renderBlock(block);
            if (el) sectionEl.appendChild(el);
        });

        body.appendChild(sectionEl);
    });

    /* 프로젝트별 섹션 간격이 있으면 사용. 없으면 CSS 기본값을 유지한다. */
    if (project.sectionGap) body.style.gap = project.sectionGap + 'px';

    /* 영상이 충분히 화면에 들어왔을 때마다 0초부터 재생한다.
       화면을 벗어나면 정지하고 0초로 되돌려, 다시 볼 때 중간부터 시작하지 않는다. */
    const videos = Array.from(body.querySelectorAll('.viewport-video'));
    if (videos.length) {
        const videoObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                const video = entry.target;
                if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
                    if (video.dataset.playing !== 'true') {
                        video.dataset.playing = 'true';
                        video.currentTime = 0;
                        const playPromise = video.play();
                        if (playPromise) playPromise.catch(function () {});
                    }
                } else if (video.dataset.playing === 'true') {
                    video.dataset.playing = 'false';
                    video.pause();
                    video.currentTime = 0;
                }
            });
        }, { threshold: [0, 0.55, 1] });
        videos.forEach(function (video) { videoObserver.observe(video); });
    }

    /* --- aside 목차 + 스크롤 스파이 --- */
    const list = document.getElementById('asideList');
    if (!list || tocSections.length === 0) return;

    const tocLinks = tocSections.map(function (section) {
        const link = document.createElement('a');
        link.href = '#' + section.id;
        link.textContent = section.label;
        list.appendChild(link);
        return link;
    });

    let activeIndex = -1;
    function setActive(index) {
        if (index === activeIndex) return;
        activeIndex = index;
        tocLinks.forEach(function (link, i) {
            link.classList.toggle('active', i === index);
        });
        /* 태블릿 가로 목차에서 활성 항목이 보이도록 목록만 가로 스크롤
           (scrollIntoView는 문서 전체 스크롤을 건드려 부드러운 이동을 끊으므로 사용 금지) */
        const link = tocLinks[index];
        if (!link) return;

        if (list.scrollWidth > list.clientWidth) {
            const listRect = list.getBoundingClientRect();
            const rect = link.getBoundingClientRect();
            if (rect.left < listRect.left) {
                list.scrollLeft += rect.left - listRect.left;
            } else if (rect.right > listRect.right) {
                list.scrollLeft += rect.right - listRect.right;
            }
        }

        /* 항목이 많아 세로 스크롤이 생겨도 활성 항목이 항상 보이게 한다. */
        if (list.scrollHeight > list.clientHeight) {
            const listRect = list.getBoundingClientRect();
            const rect = link.getBoundingClientRect();
            if (rect.top < listRect.top) {
                list.scrollTop += rect.top - listRect.top;
            } else if (rect.bottom > listRect.bottom) {
                list.scrollTop += rect.bottom - listRect.bottom;
            }
        }
    }

    /* 뷰포트 상단 기준선(위에서 1/3 지점)을 지난 마지막 섹션을 현재 섹션으로 판단 */
    function onScroll() {
        const line = window.scrollY + window.innerHeight / 3;
        let current = 0;
        tocSections.forEach(function (section, i) {
            const top = section.el.getBoundingClientRect().top + window.scrollY;
            if (top <= line) current = i;
        });
        /* 페이지 끝까지 내려가면 마지막 섹션 활성화 */
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            current = tocSections.length - 1;
        }
        setActive(current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
})();
