/* About 페이지 인터랙션
   - 호버 가능한 기기(데스크톱/태블릿+마우스): 키워드에 마우스를 올리면
     해당 플로팅 이미지(.about-float)가 텍스트 위로 나타남
   - 호버 불가 기기(모바일/터치): 키워드를 탭하면 텍스트 사이에
     인라인 이미지(.about-inline)가 펼쳐짐.
     같은 키워드 재탭 또는 바깥 영역 탭 → 닫힘 */
(function () {
    const keywords = document.querySelectorAll('.about-kw');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function floatOf(key) {
        return document.querySelector('.about-float[data-key="' + key + '"]');
    }
    function inlineOf(key) {
        return document.querySelector('.about-inline[data-key="' + key + '"]');
    }

    if (canHover) {
        /* --- 데스크톱/태블릿: 호버로 표시 --- */
        keywords.forEach(function (kw) {
            const reveal = floatOf(kw.dataset.key);
            if (!reveal) return;
            kw.addEventListener('mouseenter', function () {
                reveal.classList.add('is-on');
            });
            kw.addEventListener('mouseleave', function () {
                reveal.classList.remove('is-on');
            });
        });
    } else {
        /* --- 모바일: 탭으로 토글 --- */
        function closeAll(except) {
            document.querySelectorAll('.about-inline').forEach(function (el) {
                if (el !== except) el.hidden = true;
            });
            keywords.forEach(function (kw) {
                const inline = inlineOf(kw.dataset.key);
                kw.classList.toggle('is-open', Boolean(inline && !inline.hidden));
            });
        }

        keywords.forEach(function (kw) {
            kw.addEventListener('click', function (e) {
                e.stopPropagation();
                const inline = inlineOf(kw.dataset.key);
                if (!inline) return;
                const willOpen = inline.hidden;
                closeAll(null);
                document.querySelectorAll('.about-inline').forEach(function (el) { el.hidden = true; });
                inline.hidden = !willOpen;
                closeAll(inline);
            });
        });

        /* 바깥 영역 탭 → 모두 닫기 */
        document.addEventListener('click', function (e) {
            if (e.target.closest('.about-kw') || e.target.closest('.about-inline')) return;
            document.querySelectorAll('.about-inline').forEach(function (el) { el.hidden = true; });
            keywords.forEach(function (kw) { kw.classList.remove('is-open'); });
        });
    }
})();
