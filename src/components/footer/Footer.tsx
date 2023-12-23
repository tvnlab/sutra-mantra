import TooltipHorizon from "@app/components/tooltip";

const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 text-primary lg:px-8 xl:flex-row">
      {/* <TooltipHorizon
        trigger={<span>Homage to Amitabha Buddha</span>}
        content={
          <span className="text-white !w-[365px]">
            I am Nguyen Tuan Thanh, born in 1995. If you wish to express
            gratitude to me, please recite the mantra of Amitabha Buddha in your
            own language.
          </span>
        }
      ></TooltipHorizon> */}
      {/* <TooltipHorizon
        trigger={<span>Nam Mô A Di Đà Phật</span>}
        content={
          <span  className="text-white !w-[365px]">
            Tôi là Nguyễn Tuấn Thanh sinh năm 1995. Nếu bạn muốn cảm ơn tôi thì
            xin hãy bố thí cho tôi câu niệm Phật A Di Đà bằng ngôn ngữ của bạn.{" "}
          </span>
        }
      ></TooltipHorizon> */}
      {/* <TooltipHorizon
        trigger={<span>南无阿弥陀佛</span>}
        content={
          <span  className="text-white !w-[365px]">
            我是阮傳清，生於1995年。如果您想感謝我，請用您的語言念誦阿彌陀佛的真言。
          </span>
        }
      ></TooltipHorizon> */}
    </div>
  );
};

export default Footer;
