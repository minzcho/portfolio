/* ============================================================
   포트폴리오 데이터 (CMS 역할)
   ------------------------------------------------------------
   프로젝트를 추가/수정하려면 이 파일만 편집하면 됩니다.
   - 홈 화면 카드 그리드와 프로젝트 페이지가 이 배열 순서대로
     자동 렌더링됩니다.
   - 프로젝트 페이지 주소: project.html?id=<id>

   각 프로젝트 필드:
   - id       : URL에 쓰이는 고유 슬러그 (영문/숫자/하이픈)
   - title    : 프로젝트 제목 (카드/페이지 타이틀 공용)
   - category : 카드와 페이지 상단에 표시되는 분류
   - date     : 표시용 날짜 텍스트
   - size     : 홈 카드 썸네일 크기 's' | 'm' | 'l'
   - thumb    : 홈 카드 썸네일 이미지 경로 (null이면 빈 영역)
   - thumbVideo: 홈 카드 영상 경로 (선택). 있으면 thumb 대신 자동재생·반복 표시,
                 thumb 이미지는 영상 로딩 전 poster로 사용
   - hero     : 페이지 상단 큰 이미지 경로 (null이면 그라데이션 더미)
   - externalUrl: 외부 링크 프로젝트 (선택). 있으면 홈 카드 클릭 시
                 상세 페이지 대신 이 주소가 새 탭으로 열림 (sections 불필요)
   - cursorLabel: 홈 카드에 마우스를 올렸을 때 커서 툴팁에 표시할 문구 (선택).
                 생략하면 'View Project' (외부 링크는 'Visit Site ↗')
   - summary  : 페이지 타이틀 아래 한 줄 요약 (선택)
   - sectionGap: 이 프로젝트의 섹션 사이 간격 px (선택, 기본 80)
   - meta     : { role, period, client 또는 service, contribution(줄 배열) }
                값이 있는 항목만 표시됨 (고객사 없으면 service만 넣기)

   - sections : 본문. 섹션 배열이며, 각 섹션이 aside 목차 한 줄이 됩니다.
     {
       subtitle: 'Background',   // 목차에 표시되는 라벨 (필수)
       title: '섹션 대제목',       // h2 (필수)
       text: '도입 문단',          // 선택
       hideHeader: true,           // 목차에만 표시하고 본문 제목은 숨길 때 (선택)
       children: [ ...블록들 ],    // 섹션 안에 들어가는 콘텐츠
     }

     children에 넣을 수 있는 블록 종류(type):
       { type: 'text',    text: '...' }
       { type: 'image',   src: '경로', caption: '...', ratio: '892/265' }
         → caption 없으면 회색 캡션 바 없이 라운드 이미지만 표시
       { type: 'imageGroup', images: [{ src, caption, ratio }, ...] }
       { type: 'video', src: '경로', poster: '이미지 경로', caption: '...' }
         → 화면에 55% 이상 들어오면 0초부터 자동 재생, 벗어나면 정지·초기화
       { type: 'quote',   name: '...', role: '...', text: '...' }
         → role 생략 가능. text 안에서 [문구](https://...) 형식의 새 탭 링크 사용 가능
           TASK, 시나리오, HMW 같은 라벨 박스로도 사용
       { type: 'heading', title: '...', text: '...', icon: '...' }
         → 20px 소제목 + 설명. icon(선택): 'warning' | 'check'(제목 뒤)
           'lightbulb' | 'chat'(제목 앞)
       { type: 'stats', items: [{ value: '↓65초', label: '소요 시간 중앙값' }],
         feedback: [{ good: true|false, text: '"..."', who: '채O일님' }] }
         → 다크 통계 밴드. feedback(선택)은 👍/👎 참가자 코멘트
       { type: 'metricTable', columns: ['AS-IS', 'TO-BE'],
         rows: [{ label: '평균 완료 시간', before: '67.1초', after: '19.5초', delta: '-48초', tone: 'negative' }] }
         → AS-IS/TO-BE 지표 비교표. tone: 'negative'는 악화 지표, 'neutral'은 변화 없음
       { type: 'criteria', title: '...', rows: [{ label: '관찰', text: '...' }] }
         → 관찰/측정/기준 카드
       { type: 'cta', text: '버튼 텍스트', href: 'https://...' }
         → 우측 정렬 파란 버튼 (외부 링크는 새 탭)

   * 간격은 CSS가 자동 처리: 섹션 사이 80px, 섹션 내부 블록 사이 40px
   * 스크롤하면 현재 보고 있는 섹션이 목차에서 강조되고,
     목차를 클릭하면 해당 섹션으로 스크롤됩니다.
   ============================================================ */

const DUMMY_TEXT =
    '이곳에 설명 텍스트가 들어갑니다. 이곳에 설명 텍스트가 들어갑니다. 이곳에 설명 텍스트가 들어갑니다. ' +
    '이곳에 설명 텍스트가 들어갑니다. 이곳에 설명 텍스트가 들어갑니다. 이곳에 설명 텍스트가 들어갑니다. ' +
    '이곳에 설명 텍스트가 들어갑니다.';

const DUMMY_QUOTE =
    '"이곳에 quote 텍스트가 들어갑니다. 이곳에 quote 텍스트가 들어갑니다. 이곳에 quote 텍스트가 들어갑니다. ' +
    '이곳에 quote 텍스트가 들어갑니다. 이곳에 quote 텍스트가 들어갑니다."';

function dummySections() {
    return [
        {
            subtitle: 'Overview',
            title: '이곳에 타이틀이 들어갑니다.',
            text: DUMMY_TEXT,
            children: [
                { type: 'image', src: null, caption: '이미지 설명 텍스트', ratio: '892/265' },
            ],
        },
        {
            subtitle: 'Background',
            title: '이곳에 타이틀이 들어갑니다.',
            text: DUMMY_TEXT,
            children: [
                { type: 'text', text: DUMMY_TEXT },
            ],
        },
        {
            subtitle: 'Problem',
            title: '이곳에 타이틀이 들어갑니다.',
            text: DUMMY_TEXT,
            children: [
                { type: 'quote', name: 'Quote 이름', role: 'Quote Title', text: DUMMY_QUOTE },
            ],
        },
        {
            subtitle: 'Solution',
            title: '이곳에 타이틀이 들어갑니다.',
            text: DUMMY_TEXT,
            children: [
                {
                    type: 'imageGroup',
                    images: [
                        { src: null, caption: '이미지 설명 텍스트', ratio: '436/265' },
                        { src: null, caption: '이미지 설명 텍스트', ratio: '436/265' },
                    ],
                },
            ],
        },
        {
            subtitle: 'UT Result',
            title: '이곳에 타이틀이 들어갑니다.',
            text: DUMMY_TEXT,
            children: [],
        },
        {
            subtitle: 'Lesson Learned',
            title: '이곳에 타이틀이 들어갑니다.',
            text: DUMMY_TEXT,
            children: [],
        },
    ];
}

const DUMMY_META = {
    role: '프로덕트 디자이너',
    period: '2025. 12 - 2026. 01',
    client: '서울시교육청, 농어촌공사',
    contribution: ['문제 정의, UT 진행 50%', 'UX 기획 20%, 디자인 100%', '프로토타이핑 100%'],
};

/* ------------------------------------------------------------
   Walla — 설문조사 로직 구조도 개선
   ------------------------------------------------------------ */
const WALLA_IMG = 'assets/img/walla/';

const WALLA_PROJECT = {
    id: 'walla',
    title: '처음 본 사람도 읽을 수 있게\n설문조사 로직 구조도 개선',
    summary: '설문조사 폼 빌더 SaaS의 설문 제작 화면에서 86% 이탈률, 데이터로 문제를 특정하고 UT로 검증한 UX 개선 프로젝트',
    category: '사이드 프로젝트',
    date: '2026. 04',
    size: 'l',
    thumb: WALLA_IMG + 'hero.png',
    thumbVideo: WALLA_IMG + 'hero.mov',
    hero: WALLA_IMG + 'hero.png',
    meta: {
        role: 'PM, PD · 5인 팀 프로젝트',
        period: '2026. 04 - 2026. 05 (3주)',
        service: '왈라 설문조사 폼 빌더 SaaS',
        contribution: [
            '문제 정의, 기획, 디자인,',
            'AI 활용 프로토타입 제작,',
            '리서치, UT 진행',
        ],
    },
    sections: [
        {
            subtitle: 'Overview',
            title: '로직 기능으로 경쟁사와 차별화된 설문조사 폼 빌더',
            children: [
                { type: 'image', src: WALLA_IMG + 'overview-position.png', alt: '경쟁사 포지셔닝 맵 — 로직 특화 영역의 왈라' },
                {
                    type: 'text',
                    text: '왈라(Walla)는 설문을 만들고 배포 및 분석할 수 있는 SaaS 폼 빌더입니다.\n' +
                        '로직 기능이란? 응답자의 선택에 따라 다음에 보여줄 질문을 다르게 설정하는 분기 기능으로, 왈라의 핵심 차별점입니다.',
                },
                { type: 'image', src: WALLA_IMG + 'overview-edit.png', alt: 'AS-IS 편집 화면' },
                {
                    type: 'heading',
                    title: 'AS-IS 편집 화면: 설문의 질문과 선택지를 구성하는 기본 화면',
                    text: '- 질문 추가 및 선택지 입력\n - 페이지 구성, 순서 설정\n - 설문의 기본 구조를 만드는 시작점',
                },
                { type: 'image', src: WALLA_IMG + 'overview-logic.png', alt: 'AS-IS 로직 화면' },
                {
                    type: 'heading',
                    title: 'AS-IS 로직 화면: 응답에 따라 다음 질문을 다르게 보여주는 분기 설정 화면',
                    text: '- 조건에 따른 응답자별 맞춤 흐름\n- 응답 시간 단축 및 완료율 향상\n- 응답 품질 높이는 스크리닝 설계',
                },
            ],
        },
        {
            subtitle: 'Background',
            title: '설문 제작 화면에서 86%의 이탈률, 기능 불편 VoC의 28%는 로직 관련',
            children: [
                { type: 'image', src: WALLA_IMG + 'bg-voc.png', alt: '로직 관련 사용자 VoC 모음' },
                {
                    type: 'text',
                    text: '유입 이후 설문 제작 단계에서의 이탈률이 86%로 가장 높아 이 부분의 개선이 필요했습니다.\n' +
                        'AI를 활용 및 자체 검토를 통해 177건의 VoC raw 데이터를 핵심 카테고리 3개로 분류하였습니다.\n' +
                        '분석 결과 로직 설정 기능의 불편이 28%로 가장 높다는 것을 알게 되었으며, 해당 기능은 협업하는 유료 플랜 사용자의 핵심 기능으로 개선을 통해 비즈니스 매출 성장에 직접적으로 기여할 수 있다는 점에도 집중했습니다.',
                },
                { type: 'image', src: WALLA_IMG + 'bg-funnel.png', alt: '퍼널 단계별 이탈률 차트' },
                { type: 'image', src: WALLA_IMG + 'bg-voc-analysis.png', alt: '177건의 VoC AI 활용 분석 차트' },
                {
                    type: 'text',
                    text: '기능 관련 VoC의 51%는 이미 있는 기능이지만 있는 줄 모르거나 사용에 어려움을 겪고 있었으며,\n그 중 28%는 로직 관련 불편이었습니다.',
                },
            ],
        },
        {
            subtitle: 'Problem',
            title: '분기 하나를 수정하기 위해 평균 3번의 화면 이동이 필요한 문제',
            text: '로직의 불편을 뾰족하게 잡기 위하여 5명의 팀원들과 자체 UT를 진행했습니다.\n' +
                'Task : 기존 왈라 서비스(AS-IS)를 이용해 동일한 시나리오로 설문지 제작',
            children: [
                {
                    type: 'quote',
                    name: '5명 전원 공통 언급',
                    text: '“로직 선이 복잡하고, 어떤 조건으로 어디에 연결되는지 보기 어렵다”',
                },
                { type: 'text', text: 'UT를 통해 로직 설정 화면의 문제점을 아래와 같이 크게 2가지로 나눌 수 있었습니다.' },
                {
                    type: 'heading',
                    title: '문제 1. 선택지가 보이지 않아 분기 조건 탐색이 어려운 로직 설정',
                },
                { type: 'image', src: WALLA_IMG + 'problem-ut.png', alt: 'AS-IS 로직 설정 UT 화면' },
                { type: 'text', text: '질문의 선택지는 편집 화면에서만 확인할 수 있어, 로직을 설정하기 위해서는 잦은 화면 전환이 필요했습니다.', },
                {
                    type: 'heading',
                    title: '문제 2. 복잡하게 얽혀있는 로직 구조도로 협업에 취약',
                },
                { type: 'image', src: WALLA_IMG + 'problem-switch.png', alt: '편집 화면과 로직 화면 사이의 잦은 전환' },
                { type: 'text', text: '설정한 조건은 우측 패널바에서 하나하나 확인해야 했고,  거미줄처럼 얽혀있는 조건 분기선으로 인해 직접 만든 로직조차 읽기 어려웠습니다.' },
                {
                    type: 'stats',
                    items: [
                        { value: '3회↑', label: '분기 수정 1건당 편집 화면으로 전환이 평균 3회 이상으로 번거로움을 경험' },
                        { value: '10+', label: '문항이 10개를 넘어갈 경우 전체 구조를 확인하기 어렵고, 드래그로만 탐색 가능' },
                    ],
                },
            ],
        },
        {
            subtitle: 'Solution',
            title: '맥락의 단절 없이 탐색하고 편집하는 To-Be UI 설계',
            children: [
                {
                    type: 'quote',
                    name: 'How Might We',
                    text: '어떻게 하면 유저가 편집 맥락을 잃지 않고 복잡한 분기 로직을 제어하게 할 수 있을까?',
                },
                { type: 'image', src: WALLA_IMG + 'solution-tobe.png', alt: 'To-Be 로직 화면 UI' },
                {
                    type: 'heading',
                    title: '정보 노출에 대한 가설',
                    text: '로직 카드 내에 선택지와 이동 경로를 함께 노출하면 맥락 확인을 위한 잦은 화면 전환 비용이 완전히 제거될 것이다.',
                },
                {
                    type: 'heading',
                    title: '미니맵 제공에 대한 가설',
                    text: '대량의 문항 편집 시 플로팅 미니맵을 제공하면 무한 드래그로 인한 조작 피로도를 개선할 수 있을 것이다.',
                },
            ],
        },
        {
            subtitle: 'UT',
            title: '실제 행동 패턴 검증을 위한 AI 활용 프로토타입 제작',
            text: '로직 선 연결, 조건에 따른 구조 변경처럼 실제 인터랙션이 일어나야 측정 가능한 항목이 있었습니다. 피그마 프로토타입은 클릭 경로가 고정되어 있어 사용자가 스스로 발견하는지를 테스트하기 어려워, 디자인한 시안을 토대로 실제 동작 가능한 프로토타입으로 구현하여 A/B Test UT를 진행했습니다.',
            children: [
                { type: 'quote', name: '테스트 방식', text: 'AS-IS 왈라 서비스 vs TO-BE 프로토타입 비교 관찰' },
                {
                    type: 'quote',
                    name: '테스트 유저',
                    text: '왈라 서비스 사용 경험이 없는 프로덕트 디자이너 6명\n신규 유저의 온보딩 허들을 빠르게 검증하기 위해, 왈라 서비스 경험이 없고 직무 특성 상 설문조사 폼을 만들어 본 경험이 있는 디자이너 군을 타겟으로 설정했습니다.',
                },
                {
                    type: 'quote',
                    name: '시나리오',
                    text: '당신은 프로덕트 디자이너로서 팀원들과 함께 사용자 조사를 위한 설문을 제작합니다. 동료가 설계한 1차 로직이 적용된 설문에서, 전체 흐름을 확인하고 일부 문항의 분기를 수정해야 합니다.',
                },
                { type: 'quote', name: '사용 툴', text: 'Figma, Figma Make, Figma MCP, Git, Claude Code, Vercel' },
                {
                    type: 'criteria',
                    title: '로직 흐름 파악 및 분기 수정',
                    rows: [
                        { label: '관찰', text: '선택지 노출과 정리된 조건 연결선만으로 편집화면 전환 없이 흐름을 즉시 이해하는가' },
                        { label: '측정', text: '소요 시간 / 편집 화면 전환 횟수' },
                        { label: '기준', text: 'AS-IS 대비 소요 시간 감소, 화면 전환 유의미한 감소' },
                    ],
                },
                {
                    type: 'criteria',
                    title: '미니맵 제공에 대한 가설',
                    rows: [
                        { label: '관찰', text: '드래그 및 스크롤 외에도 미니맵을 통해 원하는 문항으로 빠르게 이동하는가' },
                        { label: '측정', text: '소요 시간 / 미니맵 클릭 이동 사용 여부' },
                        { label: '기준', text: 'AS-IS 대비 이동 시간 감소, 마우스 조작 피로 감소' },
                    ],
                },
                { type: 'cta', text: 'TO-BE 프로토타입 바로가기', href: 'https://walla-ut.vercel.app/' },
            ],
        },
        {
            subtitle: 'UT Result 1',
            title: '선택지와 조건을 로직 카드에 표시해 화면 전환 없이도 흐름 파악',
            children: [
                {
                    type: 'quote',
                    name: 'TASK 1',
                    text: '“1번의 선택지 중 9번으로 연결된 것을 삭제하고, 4번으로 연결되도록 수정해주세요.”',
                },
                { type: 'image', src: WALLA_IMG + 'result1-asis.png', alt: 'Task 01 AS-IS 화면' },
                {
                    type: 'heading',
                    title: 'AS-IS : 중앙값 1분 10초',
                    icon: 'warning',
                    text: '기존에는 설문 문항의 선택지 정보가 로직 화면에서 보이지 않고, 말줄임표로 인한 질문 식별이 어려운 문제가 있었습니다.\n또한 로직 구조도에서 어떤 분기의 조건이 설정되어 있는지 직관적으로 확인이 어려웠습니다.',
                },
                { type: 'image', src: WALLA_IMG + 'result1-tobe.png', alt: 'Task 01 TO-BE 화면' },
                {
                    type: 'heading',
                    title: 'TO-BE : 중앙값 5초',
                    icon: 'check',
                    text: '기존 구조의 문제점을 해결하기 위해, 선택지와 조건 정보 함께 노출하는 방식으로 문제를 해결했습니다.\n노트 형태로 개선하여 연결선을 직접 움직여 문항들을 로직으로 연결할 수 있고, 연결선 위의 이동버튼으로 조건에 따른 경로를 빠르고 직관적으로 파악하도록 개선했습니다.',
                },
                {
                    type: 'stats',
                    items: [
                        { value: '↓65초', label: '소요 시간 중앙값' },
                        { value: '100%', label: '6명 전원 개선' },
                        { value: '3회 → 0회', label: '평균 화면 전환율 → 전원' },
                    ],
                    feedback: [
                        { good: true, text: '“기존에는 선택지 확인을 위해 자주 왔다갔다 해야해서 불편했는데, 도움이 돼요"', who: '채O일님' },
                        { good: true, text: '“작업 속도가 더 빨라진 것 같아요"', who: '이O늘님' },
                    ],
                },
            ],
        },
        {
            subtitle: 'UT Result 2',
            title: '즉시 이동 가능한 플로팅 미니맵으로 조작 피로도 개선, 전체 구조 확인 용이',
            children: [
                { type: 'quote', name: 'TASK 2', text: '“질문 10번, 1번, 7번으로 이동해주세요.”' },
                { type: 'image', src: WALLA_IMG + 'result2-asis.png', alt: 'Task 02 AS-IS 화면' },
                {
                    type: 'heading',
                    title: 'AS-IS : 중앙값 2분 3초',
                    icon: 'warning',
                    text: '기존에는 문항 리스트가 보이는 좌측패널은 있지만, 선택이 되지 않고 편집화면이 아닌 로직화면에서는 아무런 기능이 동작하지 않았습니다. 복잡한 로직 구조도에서 드래그로만 이동할 수 있어 탐색에 피로도가 증가했습니다.',
                },
                { type: 'image', src: WALLA_IMG + 'result2-tobe.png', alt: 'Task 02 TO-BE 화면 (플로팅 미니맵)' },
                {
                    type: 'heading',
                    title: 'TO-BE : 중앙값 39초',
                    icon: 'check',
                    text: '전체 구조를 조망할 수 있는 미니맵을 추가하였으며, 미니맵을 통해 원하는 문항을 콕 집어 즉시 이동할 수 있도록 했습니다. 또한 활용되지 않고 있던 좌측 패널을 통해서도 원하는 문항으로 이동할 수 있게 개선하여 두 가지 형태로 구조도 탐색에 사용성을 높였습니다.',
                },
                {
                    type: 'stats',
                    items: [
                        { value: '↓83초', label: '소요 시간 중앙값' },
                        { value: '100%', label: '6명 전원 개선' },
                        { value: '50%', label: '20초 이내 미니맵 발견 후 활용' },
                    ],
                    feedback: [
                        { good: true, text: '“훨씬 빠르게 이동돼서 되게 편했어요"', who: '김O우님, 박O름님' },
                        { good: false, text: '“피그마에서 줌 이동하는게 익숙해서 처음엔 미니맵을 써 볼 생각을 못 했어요"', who: '채O일님, 박O훈님' },
                    ],
                },
            ],
        },
        {
            subtitle: 'Lesson Learned',
            title: '수치는 개선되었지만, 더 중요한 것은 검증 단계의 발견',
            text: '협업하는 유료 플랜 사용자의 페인포인트였던 복잡한 로직 편집 경험을 대폭 개선하여, UT 참가자 전원의 작업 효율성을 극대화하고 제품의 사용성 경쟁력을 입증했습니다.',
            children: [
                {
                    type: 'heading',
                    title: '잘한 점',
                    icon: 'lightbulb',
                    text: 'VoC와 대시보드 데이터로 로직을 문제로 특정하고 팀 내 방향성 합의했습니다.\n' +
                        '인터랙션을 관찰할 수 있는 코드베이스 프로토타입으로 발견 가능성이 열린 UT 설계했습니다.\n' +
                        'UT 직후 인사이트를 즉시 코드에 반영해 2차 프로토타입까지 완성했습니다.\n' +
                        '비즈니스 매출 성장에 직접 기여할 수 있는 유료 플랜 사용자의 핵심 기능인 로직 구조도를 개선했습니다.',
                },
                {
                    type: 'heading',
                    title: '아쉬운 점',
                    icon: 'chat',
                    text: '미니맵 어포던스 및 니즈 문제를 설계 단계에서 예측하지 못했습니다. 타겟이 다른 직군이었을 때의 결과를 검증해보지 못해 아쉽습니다.\n' + '향후에는 타겟 유저에 맞춘 솔루션을 설계 시 더 깊이 고려하고자 합니다.\n' +
                        '저니맵에서 확인된 협업 관점 니즈(동시 편집, 온보딩 툴팁 등)는 3주 내 구현 범위를 벗어난다고 판단하여, 팀장으로서 로직 화면 단일 페인포인트에 집중하기로 결정하고 그 외 기능들은 UI 설계까지 완료 후 UT 범위에서는 의도적으로 제외했습니다.',
                },
            ],
        },
    ],
};

/* ------------------------------------------------------------
   Tmax Admin — 신규 관리자도 쓸 수 있는 어드민 페이지로 재설계
   ------------------------------------------------------------ */
const ADMIN_IMG = 'assets/img/admin/';

const ADMIN_PROJECT = {
    id: 'admin',
    title: '신규 관리자도 쓸 수 있는\n어드민 페이지로 재설계',
    summary: '공공기관 드라이브 관리자가 복잡한 보안 정책을 빠르게 설정하도록 정보 위계를 재설계하고 UT로 검증한 UX 개선 프로젝트',
    category: '실무 프로젝트',
    date: '2024. 07',
    size: 'l',
    thumb: ADMIN_IMG + 'hero.png',
    thumbVideo: ADMIN_IMG + 'hypothesis_1.mp4',
    hero: ADMIN_IMG + 'hero.png',
    sectionGap: 120,
    meta: {
        role: ['프로덕트 디자이너', '티맥스 그룹 실무 프로젝트'],
        period: ['2024. 07 - 2024. 09', '개발 배포 포함'],
        client: ['서울시교육청', '농어촌공사'],
        contribution: '100% (문제 정의, UX 기획, 디자인, 프로토타입 제작, UT 진행)',
    },
    sections: [
        {
            subtitle: 'Background',
            title: '1명의 드라이브 관리자가 수백 명의 사용자 보안 설정을 관리하는 화면,\n신규 정책 추가로 2배 이상 늘어난 기능들',
            children: [
                {
                    type: 'video',
                    src: ADMIN_IMG + 'background.mp4',
                    alt: '신규 보안 기능이 추가되며 서비스 사용 설정 항목이 늘어나는 화면',
                },
                {
                    type: 'text',
                    text: '공공기관에 납품되는 B2B SaaS 드라이브의 관리자 페이지에 보안 옵션이 대거 추가되었습니다.\n' +
                        '해당 화면은 한 명의 관리자가 수백 명의 사용자 보안 설정을 관리하는 화면입니다.\n' +
                        '설정 항목이 7개 → 15개로 2배 이상 늘어난 화면에는 기존에 없던 하위 항목으로 뎁스까지 생겼으며\n' +
                        '위계 없이 기능 나열식이던 설정 화면은 보안, 편집, 복구 등 여러 항목이 뒤섞여 있었습니다.',
                },
                { type: 'image', src: ADMIN_IMG + 'background.png', alt: '신규 기능 추가 전후 서비스 사용 설정 화면 비교' },
            ],
        },
        {
            subtitle: 'Problem 1',
            title: '관리자가 의미를 재해석해야 했던 3가지 다른 표현의 동일한 기능',
            children: [
                { type: 'image', src: ADMIN_IMG + 'problem_1.png', alt: '미사용, 해제, 제한 없음으로 다르게 표현된 동일한 기능' },
                {
                    type: 'text',
                    text: "동일한 기능 꺼짐의 상태가 '미사용', '해제', '제한 없음'으로 각각 다르게 표현되어 관리자는 혼란을 겪고 '이 표현이 저 표현과 같은 건가?'를 매번 판단해야 했습니다. 리소스를 줄이기 위해 UX Writing을 개선하고 일관성을 지키는 것이 필요했습니다.",
                },
            ],
        },
        {
            subtitle: 'Hypothesis + Solution 1',
            title: '비슷한 기능의 명칭을 통일하고 단순화한다면, 관리자의 설정 시간이 줄어들 것이다',
            children: [
                {
                    type: 'video',
                    src: ADMIN_IMG + 'hypothesis_1.mp4',
                    alt: '서로 달랐던 기능 명칭과 컨트롤을 하나의 규칙으로 통일하는 화면',
                },
                {
                    type: 'text',
                    text: '동일한 의미를 가진 OFF 상태를 하나의 라벨과 하나의 컨트롤 타입으로 통일하여,\n' +
                        '사용/미사용은 토글로, 사용 시 세부 옵션은 라디오버튼으로 분기한다면\n' +
                        '명칭에 따른 혼란을 줄이고 직관성을 높일 수 있을 거라는 가설을 세웠습니다.',
                },
            ],
        },
        {
            subtitle: 'Problem 2',
            title: '하위 항목이 누적되며 불분명해진 기능의 위계',
            children: [
                {
                    type: 'video',
                    src: ADMIN_IMG + 'problem_2.mp4',
                    poster: ADMIN_IMG + 'problem_2.png',
                    alt: '우측과 하단으로 혼재된 설정 위계로 시선이 분산되는 화면',
                },
                {
                    type: 'text',
                    text: "'사용'을 누르면 하위 옵션이 우측으로 열리던 기존 구조에 신규 보안 기능이 추가되며 아래로도 하위 항목이 생겨났습니다.\n" +
                        '우측으로 열리는 항목과 하위로 펼쳐지는 항목이 혼재하면서 관리자가 설정 간의 위계를 판단하기 어려워졌습니다.',
                },
                { type: 'image', src: ADMIN_IMG + 'problem_2.png', alt: '기존 설정 위계에서 추정한 사용자의 시선 흐름' },
            ],
        },
        {
            subtitle: 'Hypothesis + Solution 2',
            title: '위계를 명확히 하고, 하위 옵션에 대한 힌트를 준다면 기능 오클릭률이 줄어들 것이다',
            children: [
                {
                    type: 'video',
                    src: ADMIN_IMG + 'hypothesis_2.mp4',
                    alt: '설정 위계를 명확히 하고 하위 옵션 힌트를 제공하는 개선 화면',
                },
                {
                    type: 'text',
                    text: '기존에는 툴팁으로 제공되던 기능 안내를 가능하다면 바로 보여주고, ‘사용’을 누르지 않아도 하위 항목에 어떤 것이 있는지 최소한의 힌트를 미리 보여준다면 탐색 중 잘못된 기능을 누르지 않아 오클릭률이 줄어들 것이라는 가설을 세웠습니다.',
                },
                {
                    type: 'image',
                    src: ADMIN_IMG + 'as-is.png',
                    alt: '기능 설명이 툴팁과 독립된 설정 블록으로 제공되는 기존 관리자 화면',
                },
                {
                    type: 'image',
                    src: ADMIN_IMG + 'to-be.png',
                    alt: '하위 옵션 힌트와 통합된 설정 블록을 제공하는 개선 관리자 화면',
                },
                {
                    type: 'text',
                    text: '관리자가 설정하는 항목을 직관적으로 찾을 수 있게 하위 항목에 대한 대략적인 기능 설명을 제공했습니다.\n' +
                        '확장자만 다르던 독립적 블록들을 다중 셀렉 필드 1개로 개선해 불필요한 중복을 덜어냈습니다. (세로 높이 612px↓)',
                },
            ],
        },
        {
            subtitle: 'UT Result 1',
            title: '새 구조가 보안 설정 탐색을 쉽게 만드는지를 검증\n완료시간 48초 단축, 오클릭률 49%p 감소',
            children: [
                { type: 'text', text: '사용 툴 : Maze / N = 10' },
                {
                    type: 'quote',
                    name: 'TASK 1',
                    text: '“파일 보안 설정을 켜고 다운로드 가능 기간을 30일로 설정하세요”',
                }, 
                {
                    type: 'metricTable',
                    rows: [
                        { label: '평균 완료 시간', before: '67.1초', after: '19.5초', delta: '-48초' },
                        { label: '성공률', before: '80%', after: '100%', delta: '+20%p' },
                        { label: '중도 포기', before: '20%', after: '0%', delta: '-20%p' },
                        { label: '평균 오클릭률', before: '80.8%', after: '31.9%', delta: '-49%p' },
                    ],
                },
                {
                    type: 'heading',
                    title: '1. AS-IS',
                    icon: 'warning',
                },
                {
                    type: 'imageGroup',
                    images: [
                        { src: ADMIN_IMG + 'ut1_as-is1.png', caption: '다운로드 가능 기간을 찾지 못해서 중도 포기한 케이스 10명 중 2명' },
                        { src: ADMIN_IMG + 'ut1_as-is2.png', caption: '기간과 관리자 복구 가능 기간을 헷갈린 케이스 10명 중 7명' },
                    ],
                },
                {
                    type: 'text',
                    text: '기존안에서는 태스크를 아예 통과하지 못한 사람도 있었고, 예상치 못한 부분에서 의외의 결과도 알 수 있었습니다.\n' +
                        '10명을 대상으로 진행된 UT는 태스크를 끝내기까지 평균 67.1초 소요 되었습니다.\n' +
                        "생각지 못했던 부분은, 하단의 ‘관리자 복구 가능 기간'의 30일 옵션과 헷갈린 케이스가 70%나 된 점이었습니다.",
                },
                {
                    type: 'heading',
                    title: '2. TO-BE : 하위 항목이 접혀있을 때도 내용을 먼저 표시, TASK 100% 성공',
                    icon: 'check',
                },
                { type: 'image', src: ADMIN_IMG + 'ut1_to-be1.png', alt: '하위 항목 힌트를 보여주는 TO-BE 사용성 테스트 화면' },
                { type: 'image', src: ADMIN_IMG + 'ut1_to-be2.png', alt: '다운로드 가능 기간을 빠르게 설정한 사용자 시선 흐름' },
                {
                    type: 'text',
                    text: '개선안의 동일한 태스크 UT는 완료 시간까지 47.4초 줄어들고, 오클릭률이 48.9%나 줄어든 결과를 얻었습니다.\n' +
                        '동일하게 10명을 대상으로 진행된 UT는 태스크를 끝내기까지 평균 19.7초 소요 되었습니다.\n' +
                        '‘항목’이라는 추상적인 단어를 명확한 기능의 명칭으로 미리 보여준 점이 크게 작용했다는 인사이트를 얻었습니다.',
                },
            ],
        },
        {
            subtitle: 'UT Result 2',
            title: '기능 그룹핑 개선에서는 관리자들의 긍정적인 정성 피드백 확보',
            children: [
                { type: 'text', text: '사용 툴 : Maze / N = 10' },
                { type: 'quote', name: 'TASK 2', text: '“뷰어 사용 여부를 TXT만 ‘사용 안 함’으로 바꾸고 적용하세요”' },
                {
                    type: 'metricTable',
                    rows: [
                        { label: '평균 완료 시간', before: '12.4초', after: '13.9초', delta: '+1.5초', tone: 'negative' },
                        { label: '성공률', before: '100%', after: '100%', delta: '-', tone: 'neutral' },
                        { label: '중도 포기', before: '0%', after: '0%', delta: '-', tone: 'neutral' },
                        { label: '평균 오클릭률', before: '42.9%', after: '23.1%', delta: '-20%p' },
                    ],
                },
                {
                    type: 'heading',
                    title: '1. AS-IS : 동일한 “뷰어 사용 여부” 설정이지만 확장자에 따라 독립적인 블록으로 나뉘어졌던 기존',
                    icon: 'warning',
                },
                { type: 'image', src: ADMIN_IMG + 'ut2_as-is.png', alt: '독립된 뷰어 설정 블록을 탐색하는 AS-IS 사용성 테스트' },
                {
                    type: 'heading',
                    title: '2. TO-BE : 관련 설정을 하나의 블록으로 묶어 탐색에 도움되도록 개선, 긍정적인 피드백 확보',
                    icon: 'check',
                },
                { type: 'image', src: ADMIN_IMG + 'ut2_to-be.png', alt: '관련 뷰어 설정을 한 블록으로 묶은 TO-BE 사용성 테스트' },
                {
                    type: 'text',
                    text: '완료 시간이 줄어들지는 않았지만 평균 오클릭률이 -20%p 줄어들었으며, 개선 후가 “훨씬 깔끔해보인다”, “모아두니 보기 편하다”와 같은 긍정적인 피드백을 얻을 수 있었습니다.',
                },
            ],
        },
        {
            subtitle: 'Lesson Learned',
            title: '설정 실수 감소 → 운영 문의 감소 → 운영 효율 향상 가능성',
            text: '평균적으로 태스크 하나를 완료하는 데 걸리는 시간이 약 48초 줄었습니다.\n' +
                '50명의 관리자가 한 주에 5번씩 이런 작업을 반복한다고 가정하면 1년 약 170시간의 절감 가능성이 생겼습니다. 특히 오클릭률이 절반 가까이 줄어들어 VoC와 재작업으로 직결되는 운영 리소스 감소 가능성도 생겼습니다.',
            children: [
                {
                    type: 'heading',
                    title: '이 프로젝트에서 배운 설계 원칙',
                    icon: 'lightbulb',
                    text: '[구조 우선] 구조와 위계를 먼저 정의하고 그 위에 기능을 쌓아야 한다는 원칙을 체감\n' +
                        '[러닝 커브] UT에서 제품을 처음 접한 참가자들이 오히려 더 빠르게 태스크를 완료\n' +
                        '“좋은 구조는 큰 러닝 커브 없이도 통한다”는 것을 보여주는 결과\n' +
                        '기존 UI에 익숙한 사용자일수록 새 구조에 적응하는 데 시간이 걸린다는 인사이트',
                },
                {
                    type: 'heading',
                    title: '아쉬운 점',
                    icon: 'chat',
                    text: '등급 라벨칩(주의/준수)과 카테고리 탭은 추가 사용성 향상이 기대되는 개선 아이디어였습니다.\n' +
                        '보안 정책의 기준을 정의하고 사용성을 검증해보고 싶었지만, 내부 사정으로 인해 추가 아이디어는 UT나 실제 릴리즈로는 이어지지 못해 아쉬움이 남습니다.',
                },
                { type: 'image', src: ADMIN_IMG + 'lesson_learned.png', alt: '실제 릴리즈되지 못한 보안 등급 라벨칩과 카테고리 탭 아이디어' },
            ],
        },
    ],
};

/* ------------------------------------------------------------
   Bustago - 시외버스 공식 앱 ‘버스타고(BUSTAGO)' 리뉴얼 프로젝트
   ------------------------------------------------------------ */
const BUSTAGO_IMG = 'assets/img/bustago/';

const BUSTAGO_PROJECT = {
    id: 'bustago',
    title: '검색 실패와 결제 불안을 줄인\n 버스타고 앱 리뉴얼',
    summary: '검색 실패와 결제 불안을 리서치로 정의하고, 검색부터 QR 탑승까지 핵심 예매 흐름을 다시 설계한 앱 리뉴얼 프로젝트',
    category: '사이드 프로젝트',
    date: '2025. 12',
    size: 'l',
    thumb: BUSTAGO_IMG + 'hero.png',
    hero: BUSTAGO_IMG + 'hero.png',
    sectionGap: 120,
    meta: {
        role: ['프로덕트 디자이너', '개인 프로젝트'],
        period: ['2025. 12 (3주)'],
        service: ['버스타고', '이동의 즐거움'],
        contribution: '100% (리서치, 문제 정의, UX 기획, UI 디자인, 프로토타이핑)',
    },
    sections: [
        {
            subtitle: 'Overview',
            title: '예매 앱이 예매 기능을 제대로 수행할 수 있도록',
            children: [
                {
                    type: 'text',
                    text: '코로나19 이후 시외버스와 고속버스 예매는 터미널 현장에서 앱으로 빠르게 전환되었습니다.\n' +
                        '명절 귀성, 주말 여행, 공항 이동 등 시간이 정해진 일정에서 사전 예매는 이제 선택이 아닌 필수가 되었으며,\n' +
                        '비대면 예매 비율은 2020년 이후 3배 이상 증가했습니다.\n' +
                        '\n그러나 전국 시외버스 통합 예매를 표방하는 공식 앱 버스타고는 예매라는 핵심 기능에서 심각한 사용성 문제를 보이고 있습니다. 검색 기능이 제대로 작동하지 않아 사용자들은 터미널이나 노선을 찾지 못하고, 좌석을 선택한 후 결제를 진행하면 좌석이 갑자기 사라지며, 예매 완료 후에도 내역을 찾기 어려운 구조로 되어 있습니다.\n' +
                        '\n이는 일상적 불편함을 넘어 다음 버스 대기, 약속 지각, 비행기 탑승 차질로 이어질 수 있는 중요한 문제입니다.\n' +
                        '공식 통합 예매 앱으로서 독점적 지위를 갖고 있음에도, 기본적인 사용성조차 보장하지 못한다면 사용자 이탈과 신뢰 하락은 불가피합니다.\n' +
                        '이 프로젝트는 예매 앱이 예매 기능을 제대로 수행할 수 있도록 개선하는 것을 목표로 합니다.',
                },
            ],
        },
        {
            subtitle: 'Research / Survey / Interview',
            title: '공식 앱이지만...\n어쩔 수 없이 쓰고 있던 사용자들의 실제 경험을 리서치로 확인',
            text: '시외버스 예매 시장은 고속버스 전산망과 시외버스 전산망으로 나뉘어 있습니다. 티머니GO가 고속버스 예매와 여러 이동 수단을 통합한 반면, 버스타고는 약 140개 터미널의 시외버스 예매를 담당하는 사실상 독점적인 공식 앱입니다.\n\n하지만 앱 리뷰에는 검색 실패, 결제 오류, 복잡한 탐색이 반복해서 등장했습니다. 예매라는 핵심 목적을 달성하기 어렵다는 문제를 실제 사용자 경험으로 확인하고자 앱 리뷰, 설문, 심층 인터뷰를 함께 진행했습니다.',
            children: [
                {
                    type: 'stats',
                    items: [
                        { value: '1,280건', label: '앱 리뷰 분석' },
                        { value: 'N=20', label: '사용자 설문' },
                        { value: '2명', label: '심층 인터뷰: 각 40분' },
                    ],
                },
                {
                    type: 'quote',
                    name: '구글플레이/앱스토어 1,280개 리뷰 크롤링 분석',
                    text: '- 총 리뷰 수: 1,280개\n- [raw data spreadsheet 링크](https://docs.google.com/spreadsheets/d/1mo_Y9XcrAOo7cYZRBzACBFI5iSKkuj6yLuJs4b-bshs/edit?usp=sharing)',
                },
                {
                    type: 'horizontalGallery',
                    images: [
                        { src: BUSTAGO_IMG + 'app-review.png', alt: '구글플레이/앱스토어 리뷰 점수' },
                        { src: BUSTAGO_IMG + 'app-review-point.png', alt: '구글플레이/앱스토어 리뷰 분석' },
                    ],
                },
                {
                    type: 'quote',
                    name: '사용자 경험 설문 조사',
                    text: '- 기간: 2025. 12. 23 ~ 12. 29 (7일간) \n- 총 응답자 20명\n- [설문조사 링크](https://naver.me/xt4S3Jsx)',
                },
                {
                    type: 'horizontalGallery',
                    images: [
                        { src: BUSTAGO_IMG + 'survey-01.png', alt: '버스타고 사용자 설문 조사 결과1' },
                        { src: BUSTAGO_IMG + 'survey-02.png', alt: '버스타고 사용자 설문 조사 결과2' },
                        { src: BUSTAGO_IMG + 'survey-03.png', alt: '버스타고 사용자 설문 조사 결과3' },
                    ],
                },
                {
                    type: 'quote',
                    name: '사용자 경험 설문 조사',
                    text: '- 조사 일자: 2025. 12. 30\n- 참여자 수: 2명\n- 소요시간: 1인 당 약 40분',
                },
                {
                    type: 'image',
                    src: BUSTAGO_IMG + 'idi-00.png',
                    alt: '앱 리뷰와 사용자 인터뷰를 주제별로 묶은 어피니티 다이어그램',
                },
                {
                    type: 'horizontalGallery',
                    images: [
                        { src: BUSTAGO_IMG + 'idi-01.png', alt: '버스타고 사용자 심층 인터뷰 결과1' },
                        { src: BUSTAGO_IMG + 'idi-02.png', alt: '버스타고 사용자 심층 인터뷰 결과2' },
                        { src: BUSTAGO_IMG + 'idi-03.png', alt: '버스타고 사용자 심층 인터뷰 결과3' },
                        { src: BUSTAGO_IMG + 'idi-04.png', alt: '버스타고 사용자 심층 인터뷰 결과4' },
                    ],
                },

            ],
        },
        {
            subtitle: 'Affinity Diagram',
            title: '예매 상태와 결과를 신뢰할 수 없는 경험을 핵심 문제로 정의',
            text: '리서치 결과를 검색과 터미널 탐색, 좌석 선택과 결제, 예매 내역 확인의 세 구간으로 묶었습니다. 각 단계의 상태와 결과가 명확하게 전달되지 않아 사용자는 “예매가 정상적으로 완료되었는지” 신뢰하지 못하고 불안감을 느끼고 있었습니다.',
            children: [
                {
                    type: 'quote',
                    name: '문제점 분류 어피니티 다이어그램',
                    text: '- 데이터 출처: 앱 리뷰 1,280건 + 사용자 서베이 20명\n- 타겟: 버스타고 앱을 이용하는 시민(특히 경기도민)\n- 핵심 영역: 검색 단계 & 결제 단계',
                },
                {
                    type: 'image',
                    src: BUSTAGO_IMG + 'affinity.png',
                    alt: '앱 리뷰와 사용자 인터뷰를 주제별로 묶은 어피니티 다이어그램',
                },
            ],
        },
        {
            subtitle: 'Hypotheses',
            title: '검색 성공률과 좌석 상태 신뢰, 결제 불안을 중심으로 세운 핵심 가설',
            children: [
                {
                    type: 'imageGroup',
                    columns: 3,
                    images: [
                        { src: BUSTAGO_IMG + 'hypothesis_01.png', alt: '검색 인터페이스 개선' },
                        { src: BUSTAGO_IMG + 'hypothesis_02.png', alt: '좌석 점유 시스템 개선' },
                        { src: BUSTAGO_IMG + 'hypothesis_03.png', alt: '결제 단계 가시성 및 피드백' },
                    ],
                },
            ],
        },
        {
            subtitle: 'Information Architecture',
            title: '검색–선택–결제–확인의 핵심 예매 흐름을 다시 구성',
            text: '현재 작동하는 기능부터 안정화한다는 원칙으로 검색, 결제, 뒤로가기, 예매 내역을 우선했습니다. 기존 정보 구조에서 흩어져 있던 예매 내역과 탑승 정보를 홈 중심으로 정리하고, 출발지와 도착지는 지역 검색과 지도 탐색을 함께 제공하도록 설계했습니다.',
            children: [
                { type: 'image', src: BUSTAGO_IMG + 'ia.png', alt: '버스타고 앱의 기존 정보 구조와 개선 정보 구조 비교' },
                {
                    type: 'quote',
                    name: '기존 IA 문제점',
                    text: '- "내 정보" ≠ "예매조회"\n- 예매 내역 찾기 어려움(14일 필터 기본값)\n- 뒤로 가기 없음\n- 터미널 정보와 지도 연결 없음',
                },
            ],
        },
        {
            subtitle: 'Wireframe',
            title: '핵심 예매 흐름을 와이어프레임으로 구체화',
            text: '홈에서 출발지와 도착지를 찾고, 날짜와 승객을 선택한 뒤 시간표–좌석–결제로 이어지는 흐름을 먼저 검증했습니다. 예매 완료 후에는 예매 내역, 탑승 위치, QR 승차권까지 한 흐름 안에서 확인할 수 있도록 연결했습니다.',
            children: [
                { type: 'image', src: BUSTAGO_IMG + 'wireframe.png', alt: '버스타고 와이어프레임' },
            ],
        },
        {
            subtitle: 'Final UI - APP',
            title: '검색 실패와 결제 불안을 줄이는 버스타고 예매 경험',
            text: '출발지와 도착지는 가까운 터미널, 지역 검색, 지도 탐색을 함께 제공해 목적지를 찾는 방법을 넓혔습니다. 좌석과 결제 단계에는 현재 상태와 제한 시간을 명확히 보여주고, 예매 완료 후에는 예매 내역–탑승 위치–QR 승차권을 끊김 없이 확인할 수 있도록 설계했습니다.',
            children: [
                {
                    type: 'image',
                    src: BUSTAGO_IMG + 'ux_goal.png',
                    alt: '자세한 터미널 검색, 쉬운 검색, 편리한 예매 프로세스, 명확한 좌석 상태, 결제 불안 해소, 예매 내역 확인과 QR 탑승까지의 버스타고 UX 목표',
                },
                {
                    type: 'horizontalGallery',
                    label: '버스타고 최종 UI 화면',
                    images: [
                        { src: BUSTAGO_IMG + 'final-01.png', alt: 'Splash' },
                        { src: BUSTAGO_IMG + 'final-02.png', alt: '버스타고 홈과 예매 시작 화면' },
                        { src: BUSTAGO_IMG + 'final-03.png', alt: '가까운 터미널과 지역 검색, 지도 탐색을 제공하는 출발지와 도착지 선택 화면' },
                        { src: BUSTAGO_IMG + 'final-04.png', alt: '가는/오는 날 선택' },
                        { src: BUSTAGO_IMG + 'final-05.png', alt: '인원 및 유형 선택' },
                        { src: BUSTAGO_IMG + 'final-06.png', alt: '버스 시간대 선택' },
                        { src: BUSTAGO_IMG + 'final-07.png', alt: '좌석 상태와 선택 결과를 명확히 보여주는 좌석 선택 화면' },
                        { src: BUSTAGO_IMG + 'final-08.png', alt: '승차권 예매 여정 카드 (예매중)' },
                        { src: BUSTAGO_IMG + 'final-09.png', alt: '제한 시간과 결제 수단, 유의사항을 명확히 보여주는 결제 화면' },
                        { src: BUSTAGO_IMG + 'final-10.png', alt: '예매 요약을 보여주는 결제 완료 화면' },
                        { src: BUSTAGO_IMG + 'final-11.png', alt: '예매완료 내역' },
                        { src: BUSTAGO_IMG + 'final-12.png', alt: '탑승 위치와 상세 정보를 제공하는 예매 상세 화면' },
                        { src: BUSTAGO_IMG + 'final-13.png', alt: '현장에서 빠르게 제시할 수 있는 QR 승차권 화면' },
                    ],
                },
                {
                    type: 'image',
                    src: BUSTAGO_IMG + 'features.png',
                    alt: '기존 앱 및 경쟁 앱 대비 차별화 기능- 니즈 및 페인포인트 기반',
                },
                {
                    type: 'image',
                    src: BUSTAGO_IMG + 'prototype-info.png',
                    alt: '피그마 프로토타이핑 구현 내역',
                },
                {
                    type: 'cta',
                    text: 'Prototype 보기',
                    href: 'https://www.figma.com/proto/F3LhZgh6634HSlHBqrPoXe/%EC%A1%B0%EB%AF%BC%EC%A0%95%EB%8B%98?page-id=1664%3A26470&node-id=1664-26284&p=f&viewport=-1300%2C1347%2C0.72&t=mXf7AIkpfIzIR2Rx-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1664%3A26417',
                },
            ],
        },
        {
            subtitle: 'Final UI - Tablet/PC',
            title: '태블릿과 데스크탑에서도 같은 경험을 제공하도록 화면을 확장',
            text: '태블릿 및 데스크탑 화면에서는 검색과 예매 과정을 한눈에 볼 수 있도록 좌우로 확장했습니다. 출발지와 도착지 선택, 날짜와 승객 선택, 시간표와 좌석 선택, 결제와 예매 내역 확인까지의 핵심 예매 흐름을 한 화면에서 확인할 수 있도록 설계했습니다.',
            children: [
                {
                    type: 'horizontalGallery',
                    label: '버스타고 최종 UI 태블릿 화면',
                    images: [
                        { src: BUSTAGO_IMG + 'final-tablet-01.png', alt: 'Splash' },
                        { src: BUSTAGO_IMG + 'final-tablet-02.png', alt: '버스타고 홈과 예매 시작 화면' },
                        { src: BUSTAGO_IMG + 'final-tablet-03.png', alt: '가까운 터미널과 지역 검색, 지도 탐색을 제공하는 출발지와 도착지 선택 화면' },
                        { src: BUSTAGO_IMG + 'final-tablet-04.png', alt: '검색 결과 없음 화면' },
                        { src: BUSTAGO_IMG + 'final-tablet-05.png', alt: '가는/오는 날 선택' },
                        { src: BUSTAGO_IMG + 'final-tablet-06.png', alt: '버스 시간대 선택' },
                        { src: BUSTAGO_IMG + 'final-tablet-07.png', alt: '좌석 상태와 선택 결과를 명확히 보여주는 좌석 선택 화면' },
                        { src: BUSTAGO_IMG + 'final-tablet-08.png', alt: '승차권 예매 여정 카드 (예매중)' },
                        { src: BUSTAGO_IMG + 'final-tablet-09.png', alt: '제한 시간과 결제 수단, 유의사항을 명확히 보여주는 결제 화면' },
                        { src: BUSTAGO_IMG + 'final-tablet-10.png', alt: '예매 요약을 보여주는 결제 완료 화면' },
                        { src: BUSTAGO_IMG + 'final-tablet-11.png', alt: '예매완료 내역' },
                        { src: BUSTAGO_IMG + 'final-tablet-12.png', alt: '예매 상세 화면' },
                        { src: BUSTAGO_IMG + 'final-tablet-13.png', alt: '탑승 위치 안내' },
                    ],
                },
                {
                    type: 'horizontalGallery',
                    label: '버스타고 최종 UI 화면',
                    images: [
                        { src: BUSTAGO_IMG + 'final-pc-01.png', alt: 'Splash' },
                        { src: BUSTAGO_IMG + 'final-pc-02.png', alt: '버스타고 홈과 예매 시작 화면' },
                        { src: BUSTAGO_IMG + 'final-pc-03.png', alt: '가까운 터미널과 지역 검색, 지도 탐색을 제공하는 출발지와 도착지 선택 화면' },
                        { src: BUSTAGO_IMG + 'final-pc-04.png', alt: '검색 결과 없음 화면' },
                        { src: BUSTAGO_IMG + 'final-pc-05.png', alt: '가는/오는 날 선택' },
                        { src: BUSTAGO_IMG + 'final-pc-06.png', alt: '버스 시간대 선택' },
                    ],
                },
            ],
        },
        {
            subtitle: 'Design System',
            title: '일관된 예매 경험을 위한 시각 언어',
            text: '브랜드의 친근함을 유지하면서도 이동과 예매 과정에서 정보가 빠르게 읽히도록 컬러, 타이포그래피, 아이콘 규칙을 정리했습니다. 주요 행동과 상태에는 대비가 명확한 색을 사용하고, 작은 모바일 화면에서도 정보 위계가 흐트러지지 않도록 구성했습니다.',
            children: [
                {
                    type: 'cta',
                    text: '디자인 시스템 프로젝트 보러가기',
                    href: 'project.html?id=bustago-design-system',
                },
            ],
        },
    ],
};

/* ------------------------------------------------------------
   Bustago Design System — 버스타고 디자인 시스템
   ------------------------------------------------------------ */
const BUSTAGO_DESIGN_SYSTEM_IMG = 'assets/img/bustago-design-system/';

const BUSTAGO_DESIGN_SYSTEM = {
    id: 'bustago-design-system',
    title: '버스타고 디자인 시스템',
    summary: '브랜드의 친근함을 유지하면서도 이동과 예매 과정에서 정보가 빠르게 읽히도록 컬러, 타이포그래피, 아이콘 규칙을 정리했습니다.\n 주요 행동과 상태에는 대비가 명확한 색을 사용하고, 작은 모바일 화면에서도 정보 위계가 흐트러지지 않도록 구성했습니다.',
    category: '사이드 프로젝트',
    date: '2026. 01',
    size: 'l',
    thumb: BUSTAGO_DESIGN_SYSTEM_IMG + 'hero.png',
    thumbVideo: BUSTAGO_DESIGN_SYSTEM_IMG + 'hypothesis_1.mp4',
    hero: BUSTAGO_DESIGN_SYSTEM_IMG + 'hero.png',
    sectionGap: 120,
    meta: {
        role: ['프로덕트 디자이너'],
        period: ['2025. 01'],
        service: ['버스타고'],
        contribution: '개인 프로젝트',
    },
    sections: [
        {
            subtitle: 'Logo and Illustration',
            children: [
                { type: 'image', src: BUSTAGO_DESIGN_SYSTEM_IMG + 'logo-illust.png', alt: '버스타고 리뉴얼 로고와 일러스트 시스템' },
            ],
        },
        {
            subtitle: 'Colors',
            children: [
                { type: 'image', src: BUSTAGO_DESIGN_SYSTEM_IMG + 'color.png', alt: '버스타고 리뉴얼 컬러 시스템' },
            ],
        },
        {
            subtitle: 'Typography',
            children: [
                { type: 'image', src: BUSTAGO_DESIGN_SYSTEM_IMG + 'typography.png', alt: '버스타고 리뉴얼 타이포그래피 시스템' },
            ],
        },
        {
            subtitle: 'Iconography',
            children: [
                { type: 'image', src: BUSTAGO_DESIGN_SYSTEM_IMG + 'iconography.png', alt: '버스타고 리뉴얼 아이콘 시스템' },
            ],
        },
        {
            subtitle: 'Navigation',
            children: [
                { type: 'image', src: BUSTAGO_DESIGN_SYSTEM_IMG + 'navigation.png', alt: '버스타고 리뉴얼 네비게이션 시스템' },
            ],
        },
        {
            subtitle: 'Button',
            children: [
                { type: 'image', src: BUSTAGO_DESIGN_SYSTEM_IMG + 'button.png', alt: '버스타고 리뉴얼 버튼 시스템' },
            ],
        },
        {
            subtitle: 'Mockup',
            children: [
                { type: 'image', src: BUSTAGO_DESIGN_SYSTEM_IMG + 'brand.png', alt: '버스타고 포스터 버스정류장 목업 이미지' },
            ],
        },
    ],
};

/* ------------------------------------------------------------
   Tmax Design System — 접근성을 품은 Atomic 디자인 시스템 구축기
   ------------------------------------------------------------ */
const DESIGN_SYSTEM_IMG = 'assets/img/design-system/';

const DESIGN_SYSTEM = {
    id: 'design-system',
    title: '접근성을 품은\nAtomic 디자인 시스템 구축기',
    summary: '공공기관 드라이브 관리자가 복잡한 보안 정책을 빠르게 설정하도록 정보 위계를 재설계하고 UT로 검증한 UX 개선 프로젝트',
    category: '실무 프로젝트',
    date: '2023. 12',
    size: 'l',
    thumb: DESIGN_SYSTEM_IMG + 'hero.png',
    thumbVideo: DESIGN_SYSTEM_IMG + 'hypothesis_1.mp4',
    hero: DESIGN_SYSTEM_IMG + 'hero.png',
    sectionGap: 120,
    meta: {
        role: ['프로덕트 디자이너', '티맥스 그룹 실무 프로젝트'],
        period: ['2023. 12 - 2024. 09'],
        service: ['Docs/Office 공통 디자인시스템'],
        contribution: '전체 50% (Docs 파트 100%)',
    },
    sections: [
        {
            subtitle: 'Background',
            children: [
                { type: 'image', src: DESIGN_SYSTEM_IMG + '02.png', alt: '두 제품을 하나의 경험으로 연결하기 위한 시작' },
            ],
        },
        {
            subtitle: 'Work Process',
            children: [
                { type: 'image', src: DESIGN_SYSTEM_IMG + '03.png', alt: '아토믹 디자인 시스템으로 디자이너도 개발자도 편리하게' },

            ],
        },
        {
            subtitle: 'Logo and Typography',
            children: [
                { type: 'image', src: DESIGN_SYSTEM_IMG + '04.png', alt: '로고, 타이포그래피' },

            ],
        },
        {
            subtitle: 'Colors',
            children: [
                { type: 'image', src: DESIGN_SYSTEM_IMG + '05.png', alt: '컬러시스템' },

            ],
        },
        {
            subtitle: 'Buttons',
            children: [
                { type: 'image', src: DESIGN_SYSTEM_IMG + '06.png', alt: '버튼 시스템' },

            ],
        },
        {
            subtitle: 'Controls and Pagination',
            children: [
                { type: 'image', src: DESIGN_SYSTEM_IMG + '07.png', alt: '컨트롤과 페이징' },

            ],
        },
        {
            subtitle: 'Cases',
            children: [
                { type: 'image', src: DESIGN_SYSTEM_IMG + '08.png', alt: '시스템 적용 사례1' },
                { type: 'image', src: DESIGN_SYSTEM_IMG + '09.png', alt: '시스템 적용 사례2' },

            ],
        },
        {
            subtitle: 'Other Components',
            children: [
                { type: 'image', src: DESIGN_SYSTEM_IMG + '10.png', alt: '기타 컴포넌트' },

            ],
        },
        {
            subtitle: 'Results and Lessons Learned',
            children: [
                { type: 'image', src: DESIGN_SYSTEM_IMG + '11.png', alt: '성과와 회고' },

            ],
        },
    ],
};

/* ------------------------------------------------------------
   싸이월드 미니홈피 — 외부 링크 프로젝트 (상세 페이지 없음)
   externalUrl이 있으면 홈 카드 클릭 시 해당 주소가 새 탭으로 열림
   ------------------------------------------------------------ */
const CYWORLD_IMG = 'assets/img/cyworld/';

const CYWORLD_PROJECT = {
    id: 'cyworld',
    title: '싸이월드 미니홈피',
    category: '토이 프로젝트',
    date: '2021',
    size: 'm',
    thumb: CYWORLD_IMG + 'hero.png',
    thumbVideo: CYWORLD_IMG + 'hero.mp4',
    externalUrl: 'https://minjungcho.netlify.app/',
    cursorLabel: 'Visit Site ↗',
};


window.PORTFOLIO_PROJECTS = [
    WALLA_PROJECT,
    ADMIN_PROJECT,
    BUSTAGO_PROJECT,
    BUSTAGO_DESIGN_SYSTEM,
    DESIGN_SYSTEM,
    CYWORLD_PROJECT,
    /* 더미 프로젝트가 필요하면 이 형태로 추가:
    { id: 'project-1', title: '프로젝트 타이틀', category: 'Category', date: 'Date', size: 's', thumb: null, hero: null, meta: DUMMY_META, sections: dummySections() },
    */
];
