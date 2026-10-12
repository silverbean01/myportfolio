const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

const projects = [
  {
    name: "모아페이",
    type: "2024 · Product",
    description: "금융 생활을 가볍게 만드는 모바일 결제 경험",
    role: "결제 흐름 UX 설계, 모바일 화면 디자인, 개발 협업",
    technologies: ["Figma", "사용자 인터뷰", "프로토타이핑"],
    outcomes: ["결제 단계 단순화", "사용자 테스트를 통한 주요 화면 개선"],
  },
  {
    name: "리추얼 클럽",
    type: "2023 · Branding",
    description: "매일의 작은 습관을 위한 브랜드 아이덴티티",
    role: "브랜드 전략 수립, 비주얼 아이덴티티 및 가이드 제작",
    technologies: ["브랜드 전략", "Illustrator", "디자인 시스템"],
    outcomes: ["디지털·인쇄 매체에 적용 가능한 브랜드 체계 구축", "일관된 브랜드 경험을 위한 가이드 정리"],
  },
  {
    name: "커먼 아카이브",
    type: "2022 · Web / UX",
    description: "동네의 이야기를 기록하는 아카이브 웹사이트",
    role: "정보 구조 설계, 반응형 웹 UX/UI 디자인, 콘텐츠 템플릿 제작",
    technologies: ["Figma", "반응형 웹 디자인", "정보 구조 설계"],
    outcomes: ["지역 콘텐츠를 쉽게 탐색하는 웹 구조 설계", "콘텐츠 등록과 열람을 위한 공통 템플릿 제작"],
  },
];

const projectDialog = document.querySelector("#project-dialog");
let lastFocusedProject = null;

// 선택한 프로젝트의 정보를 모달에 채우고 포커스를 이동합니다.
function openProjectDialog(projectIndex, trigger) {
  const project = projects[projectIndex];
  if (!project || !projectDialog) return;

  lastFocusedProject = trigger;
  projectDialog.querySelector("#project-dialog-type").textContent = project.type;
  projectDialog.querySelector("#project-dialog-title").textContent = project.name;
  projectDialog.querySelector("#project-dialog-description").textContent = project.description;
  projectDialog.querySelector("#project-dialog-role").textContent = project.role;

  const technologies = projectDialog.querySelector("#project-dialog-technologies");
  technologies.replaceChildren(...project.technologies.map((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    return item;
  }));

  const outcomes = projectDialog.querySelector("#project-dialog-outcomes");
  outcomes.replaceChildren(...project.outcomes.map((outcome) => {
    const item = document.createElement("li");
    item.textContent = outcome;
    return item;
  }));

  projectDialog.showModal();
}

// 카드 클릭과 Enter/Space 입력으로 상세 모달을 엽니다.
document.querySelectorAll(".project-card").forEach((card) => {
  const open = () => openProjectDialog(Number(card.dataset.projectIndex), card);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
});

// 닫기 버튼, 바깥 영역 클릭, ESC 입력으로 모달을 닫습니다.
projectDialog?.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
projectDialog?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    projectDialog.close();
  }
});

// 모달이 닫히면 열었던 프로젝트 카드로 포커스를 돌려줍니다.
projectDialog?.addEventListener("close", () => {
  if (lastFocusedProject?.isConnected) lastFocusedProject.focus();
});
