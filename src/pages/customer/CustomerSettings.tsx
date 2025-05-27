import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function CustomerSettings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/customer/login");
  };

  if (!user) return <p className="p-8">Pengguna tidak masuk.</p>;

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div id="Top-Nav" className="flex relative w-full h-[128px]">
          <div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
            <div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
              <Link to={'/customer/discover'} className="size-11 flex shrink-0">
                <img
                  src="/assets/images/icons/mobile-back-button.svg"
                  className="size-full"
                  alt="icon"
                />
              </Link>
              <h1 className="font-bold text-lg leading-none text-center">
                Profil Anda
              </h1>
              <a href="#" className="size-11 flex shrink-0">
                <img
                  src="/assets/images/icons/add-white.svg"
                  className="size-full"
                  alt="icon"
                />
              </a>
            </div>
          </div>
        </div>
        <main className="flex flex-col flex-1">
          <div className="flex items-center rounded-2xl py-5 px-4 bg-white gap-[10px] mx-5">
            <div className="relative flex size-[70px] shrink-0 items-center justify-center">
              <div
                id="Avatar-Container"
                className="flex size-full rounded-full overflow-hidden border-[6px] border-white ring-2 ring-monday-blue bg-monday-background"
              >
                <img
                  src={user.photo}
                  className="size-full object-cover"
                  alt="avatar"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1 w-full">
              <p className="font-semibold text-lg line-clamp-1">{user.name}</p>
              <div className="flex items-center gap-1 text-nowrap">
                <img
                  src={`${user.gender == "Male"
                      ? "/assets/images/icons/man-grey.svg"
                      : "/assets/images/icons/woman-grey.svg "
                    }`}
                  className="flex size-5 shrink-0"
                  alt="icon"
                />
                <p className="font-medium text-monday-gray leading-none">
                  {user.gender}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[14px] p-5 bg-white mt-5">
            <p className="font-medium text-sm text-monday-gray">Menu Utama</p>
            <div className="flex flex-col gap-3">
              <a href="#">
                <div className="flex items-center gap-2 py-2">
                  <img
                    src="/assets/images/icons/profile-grey-opacity.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-sm leading-none w-full">
                    Pengaturan Akun
                  </p>
                  <img
                    src="/assets/images/icons/arrow-right-grey.svg"
                    className="flex size-4 shrink-0"
                    alt="icon"
                  />
                </div>
              </a>
              <hr className="border-monday-stroke" />
              <a href="#">
                <div className="flex items-center gap-2 py-2">
                  <img
                    src="/assets/images/icons/crown-grey.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-sm leading-none w-full">
                    Langganan Paket
                  </p>
                  <img
                    src="/assets/images/icons/arrow-right-grey.svg"
                    className="flex size-4 shrink-0"
                    alt="icon"
                  />
                </div>
              </a>
              <hr className="border-monday-stroke" />
              <a href="#">
                <div className="flex items-center gap-2 py-2">
                  <img
                    src="/assets/images/icons/notification-grey-opacity.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-sm leading-none w-full">
                    Pemberitahuan
                  </p>
                  <img
                    src="/assets/images/icons/arrow-right-grey.svg"
                    className="flex size-4 shrink-0"
                    alt="icon"
                  />
                </div>
              </a>
              <hr className="border-monday-stroke" />
              <a href="#">
                <div className="flex items-center gap-2 py-2">
                  <img
                    src="/assets/images/icons/language-square-grey-opacity.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-sm leading-none w-full">
                    Bahasa Aplikasi
                  </p>
                  <img
                    src="/assets/images/icons/arrow-right-grey.svg"
                    className="flex size-4 shrink-0"
                    alt="icon"
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-[14px] p-5 bg-white mt-2">
            <p className="font-medium text-sm text-monday-gray">
              Cache &amp; Seluler
            </p>
            <div className="flex flex-col gap-3">
              <a href="#">
                <div className="flex items-center gap-2 py-2">
                  <img
                    src="/assets/images/icons/cloud-connection-grey-opacity.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-sm leading-none w-full">
                    Penghemat Kuota
                  </p>
                  <img
                    src="/assets/images/icons/arrow-right-grey.svg"
                    className="flex size-4 shrink-0"
                    alt="icon"
                  />
                </div>
              </a>
              <hr className="border-monday-stroke" />
              <a href="#">
                <div className="flex items-center gap-2 py-2">
                  <img
                    src="/assets/images/icons/trash-grey-opacity.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-sm leading-none w-full">
                    Kosongkan ruang
                  </p>
                  <img
                    src="/assets/images/icons/arrow-right-grey.svg"
                    className="flex size-4 shrink-0"
                    alt="icon"
                  />
                </div>
              </a>
            </div>
          </div>
          <div id="Bottom-Bar" className="flex relative w-full h-[138px]">
            <div className="fixed z-30 bottom-0 flex flex-col gap-3 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full h-[56px] rounded-2xl py-4 px-6 bg-monday-red/10 gap-2"
              >
                <span className="font-medium leading-none text-monday-red">
                  Keluar
                </span>
                <img
                  src="/assets/images/icons/logout-thick.svg"
                  className="flex size-5 shrink-0"
                  alt="icon"
                />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CustomerSettings;
