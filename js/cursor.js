/* 커스텀 마우스 커서
   - 기본: 색깔 있는 동그라미가 마우스를 따라다님 (색상은 CSS 변수 --cursor-color)
   - 링크/버튼 등 선택 가능한 영역 호버: 동그라미가 커짐
   - data-cursor-label 속성이 있는 요소 호버: 동그라미가 텍스트 툴팁으로 변함
     (홈 프로젝트 카드 — 문구는 data/projects.js의 cursorLabel 필드로 프로젝트마다 변경)
   - 터치 기기에서는 동작하지 않음 */
(function () {
    /* 마우스 없는 기기(터치)는 커스텀 커서 제외 */
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.documentElement.classList.add('has-custom-cursor');

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const label = document.createElement('span');
    label.className = 'cursor-label';
    dot.appendChild(label);
    document.body.appendChild(dot);

    /* 마우스를 즉시 따라감 (지연 없음) */
    window.addEventListener('mousemove', function (e) {
        dot.style.transform =
            'translate(' + e.clientX + 'px, ' + e.clientY + 'px) translate(-50%, -50%)';
        dot.classList.add('cursor-dot--visible');
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', function () {
        dot.classList.remove('cursor-dot--visible');
    });

    /* 호버 대상에 따라 커서 상태 변경 */
    document.addEventListener('mouseover', function (e) {
        const labeled = e.target.closest('[data-cursor-label]');
        if (labeled) {
            label.textContent = labeled.getAttribute('data-cursor-label');
            dot.classList.add('cursor-dot--tooltip');
            dot.classList.remove('cursor-dot--grow');
            return;
        }
        dot.classList.remove('cursor-dot--tooltip');
        const interactive = e.target.closest('a, button, [role="button"], input, textarea, select, label');
        dot.classList.toggle('cursor-dot--grow', Boolean(interactive));
    });
})();
