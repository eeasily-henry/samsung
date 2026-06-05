import { ShadcnGenerator } from "./shadcn-generator";
import { CarbonGenerator } from "./carbon-generator";

export const metadata = {
  title: "Image Generator — shadcn vs Carbon",
};

export default function ImageGeneratorPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">이미지 생성기 비교</h1>
        <p className="mt-2 text-neutral-500">
          동일한 이미지 생성기 UI를 <strong>shadcn/ui</strong>와{" "}
          <strong>IBM Carbon</strong>으로 각각 구현했습니다. 프롬프트·스타일·개수를
          바꿔 Generate를 눌러 두 라이브러리의 폼·버튼·로딩·결과 그리드를
          나란히 비교해 보세요.
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          * 외부 API 없이 프롬프트를 시드로 SVG 추상 이미지를 즉석 생성합니다.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <ShadcnGenerator />
        <CarbonGenerator />
      </div>
    </main>
  );
}
