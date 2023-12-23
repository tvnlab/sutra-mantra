// Content
import ChuChuanDe from "@app/assets/mantras/ChuChuanDe";
import ChuChuanDePhan from "@app/assets/mantras/ChuChuanDePhan";
import ChuDaiBi from "@app/assets/mantras/ChuDaiBi";
import ChuDiaTang from "@app/assets/mantras/ChuDiaTang";
import ChuDuocSu from "@app/assets/mantras/ChuDuocSu";
import ChuDuocSuPhan from "@app/assets/mantras/ChuDuocSuPhan";
import LucDaiMinhChu from "@app/assets/mantras/LucDaiMinhChu";
import KinhDiaTang from "@app/assets/sutras/kinh/KinhDiaTang";
import NamMoADiDaPhat from "@app/assets/sutras/niem_phat_hieu/NamMoADiDaPhat";
import NamMoBonSuThichCaMauNiPhat from "@app/assets/sutras/niem_phat_hieu/NamMoBonSuThichCaMauNiPhat";
import NamMoDaiBiQuanTheAmBoTat from "@app/assets/sutras/niem_phat_hieu/NamMoDaiBiQuanTheAmBoTat";
import NamMoDaiNguyenDiaTangVuongBoTa from "@app/assets/sutras/niem_phat_hieu/NamMoDaiNguyenDiaTangVuongBoTa";
import NamMoDuocSuLuuLyQuangVuongPhat from "@app/assets/sutras/niem_phat_hieu/NamMoDuocSuLuuLyQuangVuongPhat";

// Poster
import ADiDaPhatImg from "@app/assets/img/buddha/ADiDaPhat2.jpeg";
import PhatChuanDeImg from "@app/assets/img/buddha/PhatMauChuanDe.jpeg";
import PhatChuanDe2Img from "@app/assets/img/buddha/PhatMauChuanDe2.jpeg";
import DuocSuLuuLyQuangVuongPhatImg from "@app/assets/img/buddha/DuocSuLuuLyQuangVuongPhat.jpeg";
import DuocSuLuuLyQuangVuongPhat2Img from "@app/assets/img/buddha/DuocSuLuuLyQuangVuongPhat2.jpeg";
import DiaTangVuongBoTatImg from "@app/assets/img/buddha/DiaTangVuongBoTat.jpeg";
import DiaTangVuongBoTat2Img from "@app/assets/img/buddha/DiaTangVuongBoTat2.jpeg";
import QuanTheAmBoTatImg from "@app/assets/img/buddha/QuanTheAmBoTat.jpeg";
import QuanTheAmBoTat2Img from "@app/assets/img/buddha/QuanTheAmBoTat2.jpeg";
import QuanTheAmBoTat3Img from "@app/assets/img/buddha/QuanTheAmBoTat3.png";
import ThichCaMauNiPhatImg from "@app/assets/img/buddha/ThichCaMauNiPhat.png";
import { CategoryCode } from "@library/api/utils/constants";


// const index: Array<ITopic> = [
//   {
//     title: "Chép Phật hiệu A Di Đà Phật",
//     content: NamMoADiDaPhat,
//     author: "A Di Đà Phật",
//     image: ADiDaPhatImg as any,
//     category: CategoryCode.TRANSCRIBING_BUDDHA_NAME,
//   },
//   {
//     title: "Chép Phật hiệu Thích Ca Mâu Ni Phật",
//     content: NamMoBonSuThichCaMauNiPhat,
//     author: "Thích Ca Mâu Ni Phật",
//     image: ThichCaMauNiPhatImg,
//     categoryCode: CategoryCode.TRANSCRIBING_BUDDHA_NAME,
//   },
//   {
//     title: "Chép Phật hiệu Quan Thế Âm Bồ Tát",
//     content: NamMoDaiBiQuanTheAmBoTat,
//     author: "Quan Thế Âm Bồ Tát",
//     image: QuanTheAmBoTat2Img,
//     categoryCode: CategoryCode.TRANSCRIBING_BUDDHA_NAME,
//   },
//   {
//     title: "Chép Phật hiệu Địa Tạng Vương Bồ Tát",
//     content: NamMoDaiNguyenDiaTangVuongBoTa,
//     author: "Địa Tạng Vương Bồ Tát",
//     image: DiaTangVuongBoTatImg,
//     categoryCode: CategoryCode.TRANSCRIBING_BUDDHA_NAME,
//   },
//   {
//     title: "Chép Phật hiệu Dược Sư Lưu Ly Quang Vương Phật",
//     content: NamMoDuocSuLuuLyQuangVuongPhat,
//     author: "Dược Sư Lưu Ly Quang Vương Phật",
//     image: DuocSuLuuLyQuangVuongPhat2Img,
//     categoryCode: CategoryCode.TRANSCRIBING_BUDDHA_NAME,
//   },
//   {
//     title: "Chép kinh Địa Tạng Bồ Tát Bổn Nguyện",
//     content: KinhDiaTang,
//     author: "Địa Tạng Bồ Tát",
//     image: DiaTangVuongBoTat2Img,
//     categoryCode: CategoryCode.TRANSCRIBING_MANTRA,
//   },
//   {
//     title: "Chép thần chú Chuẩn Đề - Phiên Âm Việt",
//     content: ChuChuanDe,
//     author: "Phật Mẫu Chuẩn Đề",
//     image: PhatChuanDe2Img,
//     categoryCode: CategoryCode.TRANSCRIBING_SUTRA,
//   },
//   {
//     title: "Chép thần chú Chuẩn Đề - Phiên Âm Phạn",
//     content: ChuChuanDePhan,
//     author: "Phật Mẫu Chuẩn Đề",
//     image: PhatChuanDeImg,
//     categoryCode: CategoryCode.TRANSCRIBING_SUTRA,
//   },
//   {
//     title: "Chép thần chú Đại Bi - Phiên Âm Việt",
//     content: ChuDaiBi,
//     author: "Quan Thế Âm Bồ Tát",
//     image: QuanTheAmBoTat3Img,
//     categoryCode: CategoryCode.TRANSCRIBING_SUTRA,
//   },
//   {
//     title: "Chép thần chú Địa Tạng Bồ Tát - Phiên Âm Việt",
//     content: ChuDiaTang,
//     author: "Địa Tạng Bồ Tát",
//     image: DiaTangVuongBoTatImg,
//     categoryCode: CategoryCode.TRANSCRIBING_SUTRA,
//   },
//   {
//     title: "Chép thần chú Dược Sư Lưu Ly Quang Vương Phật - Phiên Âm Việt",
//     content: ChuDuocSu,
//     author: "Dược Sư Lưu Ly Quang Vương Phật",
//     image: DuocSuLuuLyQuangVuongPhatImg,
//     categoryCode: CategoryCode.TRANSCRIBING_SUTRA,
//   },
//   {
//     title: "Chép thần chú Dược Sư Lưu Ly Quang Vương Phật - Phiên Âm Phạn",
//     content: ChuDuocSuPhan,
//     author: "Dược Sư Lưu Ly Quang Vương Phật",
//     image: DuocSuLuuLyQuangVuongPhat2Img,
//     categoryCode: CategoryCode.TRANSCRIBING_SUTRA,
//   },
//   {
//     title: "Chép thần chú Lục Đại Minh Chú - Phiên Âm Phạn",
//     content: LucDaiMinhChu,
//     author: "Quan Thế Âm Bồ Tát",
//     image: QuanTheAmBoTatImg,
//     categoryCode: CategoryCode.TRANSCRIBING_SUTRA,
//   },
// ];

// export default index;
