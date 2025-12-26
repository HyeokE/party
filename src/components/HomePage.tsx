import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffc155] to-[#f9b745] relative overflow-x-hidden">
      <div className="max-w-[512px] mx-auto relative min-h-screen pb-[120px] overflow-hidden">
        <BackgroundPattern />
        <Decorations />
        <MainContent />
        <InquiryButton />
      </div>
      <StickyFooter onApply={() => navigate("/join")} />
    </div>
  );
}

function BackgroundPattern() {
  return (
    <>
      <div className="absolute left-0 top-0 w-full h-[604px] overflow-hidden">
        <img
          src="/images/background-pattern.png"
          alt=""
          className="w-full h-full object-cover opacity-30 mix-blend-soft-light scale-y-[-1]"
        />
      </div>
      <div className="absolute left-0 top-[605px] w-full h-[604px] overflow-hidden">
        <img
          src="/images/background-pattern.png"
          alt=""
          className="w-full h-full object-cover opacity-30 mix-blend-soft-light rotate-180 scale-y-[-1]"
        />
      </div>
      <div className="absolute left-0 top-[1210px] w-full h-[828px] overflow-hidden">
        <img
          src="/images/background-pattern.png"
          alt=""
          className="w-full h-full object-cover opacity-30 mix-blend-soft-light scale-y-[-1]"
        />
      </div>
    </>
  );
}

function Decorations() {
  return (
    <>
      <div className="absolute right-0 top-0 w-[190px] h-[114px] overflow-hidden">
        <img
          src="/images/decoration-top.svg"
          alt=""
          className="w-[206px] h-[127px] -mt-[17px]"
        />
      </div>
      <div className="absolute left-[36px] top-[62px] w-[251px] h-[269px]">
        <img
          src="/images/chacha-logo.svg"
          alt="CHA CHA CHA"
          className="w-full h-full"
        />
      </div>
      <div className="absolute right-[38px] top-[127px] w-[74px] h-[75px] animate-wiggle">
        <img
          src="/images/decoration-sunglasses.svg"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="absolute -left-[181px] top-[315px] w-[472px] h-[198px]">
        <img
          src="/images/decoration-olives.svg"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="absolute right-[12px] top-[322px] w-[130px] h-[100px] animate-wiggle-slow">
        <img
          src="/images/decoration-drink.svg"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="absolute left-[180px] top-[403px] w-[79px] h-[105px] animate-wiggle-slow">
        <img
          src="/images/decoration-glass.svg"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="absolute left-[30px] top-[454px] w-[78px] h-[87px]">
        <div className="relative w-full h-full">
          <img
            src="/images/decoration-small-1.svg"
            alt=""
            className="absolute left-0 top-0 w-[60px] h-[68px] animate-wiggle-fast"
          />
          <img
            src="/images/decoration-small-2.svg"
            alt=""
            className="absolute right-0 top-[4px] w-[30px] h-[83px] animate-wiggle"
          />
        </div>
      </div>
      <div className="absolute -right-[60px] top-[1050px] w-[130px] h-[100px] animate-wiggle">
        <img
          src="/images/decoration-drink.svg"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="absolute -left-[30px] top-[1350px] w-[79px] h-[105px] animate-wiggle-slow">
        <img
          src="/images/decoration-glass.svg"
          alt=""
          className="w-full h-full"
        />
      </div>
    </>
  );
}

function MainContent() {
  return (
    <div className="relative z-10 px-6">
      <LocationSection />
      <TicketSection />
      <DJSection />
      <NoticeSection />
    </div>
  );
}

function LocationSection() {
  return (
    <div className="text-center pt-[552px]">
      <div className="flex items-center justify-center gap-1">
        <img
          src="/images/icon-location.svg"
          alt=""
          className="w-[13px] h-[18px]"
        />
      </div>
      <p className="font-pretendard font-extrabold text-[20px] text-[#e5261e] mt-2">
        더박스 잠실새내
      </p>
      <div className="font-futura font-medium text-[12px] text-[#562d2a] mt-2 leading-normal">
        <p>32-10, Baekjegobun-ro 7-gil,</p>
        <p>Songpa-gu, Seoul</p>
      </div>
      <p className="font-futura font-medium text-[14px] text-[#e5261e] mt-4">
        2026.01.30 (FRI) 8PM - LATE
      </p>
    </div>
  );
}

function TicketSection() {
  return (
    <div className="relative flex justify-center mt-[71px]">
      <div className="relative w-[358px] h-[229px]">
        <img src="/images/ticket.svg" alt="Ticket" className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center font-pretendard font-semibold text-[14px] text-[#562d2a] leading-[24px] px-6">
            <p>나의 지인들의 지인들을 초대하여 즐기는</p>
            <p>디제잉 파티에 초대합니다.</p>
            <p className="mt-3">&nbsp;</p>
            <p>서로 모르는 사람들밖에 없더라도 괜찮아요.</p>
            <p>나쵸에 맥주나 데낄라를 신나게 즐기다가,</p>
            <p>어쩌면 건너 건너 아는 사람을 발견할지도요.</p>
            <p className="mt-3">&nbsp;</p>
            <p>다함께 차차차!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DJSection() {
  return (
    <div className="text-center mt-[40px]">
      <div className="flex justify-center mb-4">
        <img src="/images/divider.svg" alt="" className="w-[379px] h-[14px]" />
      </div>
      <p className="font-futura font-bold text-[24px] text-[#e5261e] mt-8">
        DJ
      </p>
      <div className="font-futura font-medium text-[16px] text-[#562d2a] leading-[36px] mt-4">
        <p>DEMIC</p>
        <p>DONGTAE</p>
        <p>DZNS</p>
        <p>SAEHUN</p>
        <p>UON</p>
      </div>
    </div>
  );
}

function NoticeSection() {
  return (
    <div className="text-center mt-[40px]">
      <p className="font-futura font-bold text-[24px] text-[#e5261e]">NOTICE</p>
      <div className="mt-8 font-pretendard text-[#562d2a] leading-[36px]">
        <p className="font-extrabold text-[16px]">입장료 1인 30,000원</p>
        <p className="font-semibold text-[14px]">
          맥주 / 데낄라 / 나쵸가 무료 제공됩니다.
        </p>
        <p className="font-semibold text-[14px]">
          (외부 음식, 배달, 주류 반입 환영)
        </p>
        <p className="font-semibold text-[12px]">
          (제공되는 주류 및 음식은 현장 사정에 따라 일부 변경될 수 있습니다.)
        </p>

        <div className="h-[14px]" />

        <p className="font-extrabold text-[16px]">입장 방법</p>
        <p className="font-semibold text-[14px]">
          오후 8시부터 입장 가능합니다.
        </p>
        <p className="font-semibold text-[14px]">
          당일 현장에서 입금 내역 확인 후 나눠드리는 입장 팔찌만
          <br />
          착용하시면 자유롭게 재입장 가능합니다.
        </p>

        <div className="h-[14px]" />

        <p className="font-extrabold text-[16px]">기타 문의</p>
        <p className="font-semibold text-[14px]">
          환불 및 기타 문의는 아래 오픈채팅방 링크를 통해
        </p>
        <p className="font-semibold text-[14px]">문의 부탁드립니다.</p>
      </div>
    </div>
  );
}

function InquiryButton() {
  const handleInquiry = () => {
    window.open("https://open.kakao.com/", "_blank");
  };

  return (
    <div className="relative z-10 flex justify-center mt-[40px] pb-[20px]">
      <button onClick={handleInquiry} className="relative w-[177px] h-[64px]">
        <img
          src="/images/btn-inquiry.svg"
          alt=""
          className="w-full h-full rotate-180"
        />
        <span className="absolute inset-0 flex items-center justify-center font-pretendard font-extrabold text-[16px] text-[#562d2a]">
          1:1 문의하기
        </span>
      </button>
    </div>
  );
}

interface StickyFooterProps {
  onApply: () => void;
}

function StickyFooter({ onApply }: StickyFooterProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: "max(21px, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-[512px] mx-auto px-[39px]">
        <div className="bg-gradient-to-b from-transparent to-[#f9b23c] pt-[40px] -mx-[39px] px-[39px]">
          <button onClick={onApply} className="relative w-full h-[64px]">
            <img src="/images/btn-apply.svg" alt="" className="w-full h-full" />
            <span className="absolute inset-0 flex items-center justify-center font-pretendard font-extrabold text-[16px] text-[#f8b13a]">
              신청하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
