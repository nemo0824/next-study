export const QR_SELECT_LIST = [
  { field: "이메일", required: null },
  { field: "소속", required: null },
  { field: "부서/학과", required: null },
  { field: "사번/학번", required: null },
  { field: "직책", required: null },
  { field: "참여경로", required: null },
  { field: "개인정보 수집 및 활용 동의", required: null },
  { field: "사전 질문", required: null },
  { field: "기타 요청사항", required: null },
];

export const DEFAULT_FORM_FIELDS = [
  { field: "이름", required: true },
  { field: "연락처", required: true },
] as const;
