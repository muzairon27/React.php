import { useFetchSpecialists } from "../../hooks/useSpecialists";
import { useFetchDoctors } from "../../hooks/useDoctors";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SwiperSlide, Swiper } from "swiper/react";

function DiscoverPage() {
  const { user } = useAuth();

  const {
    data: specialists,
  } = useFetchSpecialists();

  const {
    data: doctors,
  } = useFetchDoctors();

  if (!user) return <p className="p-8">User not logged in.</p>;

  return (
    <div id="Mobile-Body" className="min-w-0 flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div
          id="Top-Nav"
          className="flex items-center justify-between h-[112px] w-full p-5 pt-8 bg-white"
        >
          <div className="flex items-center w-full gap-2">
            <Link to={'/customer/settings'}>
              <div className="relative flex size-[60px] shrink-0 items-center justify-center">
                <div
                  id="Avatar-Container"
                  className="flex size-full rounded-full overflow-hidden border-[3px] border-white ring-2 ring-monday-blue bg-monday-background"
                >
                  <img
                    src={user.photo}
                    className="size-full object-cover"
                    alt="avatar"
                  />
                </div>
              </div>
            </Link>
            <div className="flex flex-col gap-[6px]">
              <p className="font-bold">{user.name}</p>
              <p className="flex items-center gap-0.5">
                <img
                  src="/assets/images/icons/location-rounded-grey-fill.svg"
                  className="flex size-4 shrink-0"
                  alt="icon"
                />
                <span className="font-semibold text-sm leading-none text-monday-gray text-nowrap">
                  Depok, Indonesia
                </span>
              </p>
            </div>
          </div>
        </div>
        <main className="flex flex-col flex-1">
          <div className="flex py-6 px-5">
            <a href="#">
              <img
                src="/assets/images/backgrounds/j.png"
                className="size-full"
                alt="banner"
              />
            </a>
          </div>
          <div
            id="Browse-Specialist"
            className="flex flex-col w-full p-5 gap-4 bg-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-lg">Telusuri Spesialis</h2>
                <p className="font-semibold text-sm text-monday-gray leading-none">
                  Temukan Dokter Ahli Kami
                </p>
              </div>
              <Link to={'/customer/discover/specialists'}
                className="rounded-full border border-monday-stroke py-3 px-4 font-bold text-xs leading-none text-monday-gray"
              >
                LIHAT SEMUA
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {specialists?.map((specialist) => (
                <Link
                  to={`/customer/discover/${specialist.id}/hospitals`}
                  key={specialist.id}
                  className="card"
                >
                  <div className="flex flex-col rounded-2xl border border-monday-stroke py-5 px-4 bg-white gap-6">
                    <div className="flex size-[52px] rounded-xl bg-monday-background overflow-hidden shrink-0 p-[5px]">
                      <img
                        src={specialist.photo}
                        className="size-full object-contain"
                        alt="icon"
                      />
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <p className="font-bold text-lg overflow-hidden truncate">
                        {specialist.name}
                      </p>
                      <div className="flex items-center gap-1 text-nowrap">
                        <img
                          src="/assets/images/icons/profile-2user-grey.svg"
                          className="flex size-5 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold text-monday-gray leading-none">
                          {specialist.doctors.length} Dokter
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div
            id="Our-Doctor"
            className="flex flex-col w-full py-5 gap-4 bg-white mt-5"
          >
            <div className="flex items-center justify-between px-5">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-lg">Dokter Hebat Kita</h2>
                <p className="font-semibold text-sm text-monday-gray leading-none">
                  Buat Janji Temu
                </p>
              </div>
            </div>
            <div className="swiper w-full">
              <Swiper
                className="swiper-wrapper w-full"
                direction="horizontal"
                spaceBetween={20}
                slidesPerView="auto"
                slidesOffsetAfter={20}
                slidesOffsetBefore={20}
              >
                {doctors &&
                  doctors.map((doctor) => (
                    <SwiperSlide className="swiper-slide !w-fit">
                      <div className="card">
                        <div className="flex flex-col rounded-2xl overflow-hidden border border-monday-stroke w-[300px] shrink-0">
                          <div className="relative flex w-full h-[180px] bg-monday-background overflow-hidden">
                            <img
                              src={doctor.photo}
                              className="size-full object-cover"
                              alt="photo"
                            />
                            <img
                              src="/assets/images/icons/available.svg"
                              className="w-[100px] absolute top-4 left-4"
                              alt="status"
                            />
                          </div>
                          <div className="flex items-center justify-between py-3 px-4 bg-monday-blue">
                            <p className="font-bold leading-none text-white overflow-hidden truncate">
                              {doctor.hospital.name}
                            </p>
                            <img
                              src="/assets/images/icons/hospital-white-fill.svg"
                              className="flex size-5 shrink-0"
                              alt="icon"
                            />
                          </div>
                          <div className="flex items-center justify-between py-5 px-4 bg-white">
                            <div className="flex flex-col gap-[6px]">
                              <p className="font-semibold text-lg w-[190px] overflow-hidden truncate">
                                {doctor.name}
                              </p>
                              <div className="flex items-center gap-1 text-nowrap">
                                <img
                                  src="/assets/images/icons/stetoscop-grey.svg"
                                  className="flex size-5 shrink-0"
                                  alt="icon"
                                />
                                <p className="font-semibold text-monday-gray leading-none">
                                  {doctor.specialist.name}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
                              <img
                                src="/assets/images/icons/star-sliced-white.svg"
                                className="flex size-5 shrink-0"
                                alt="icon"
                              />
                              <p className="font-semibold leading-none text-white">
                                4.8
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </main>
        <div id="Menu-Bar" className="flex relative h-[100px] w-full">
          <div className="fixed bottom-0 z-30 h-[100px] w-full max-w-[640px] grid grid-cols-2 gap-4 items-center">
            <div className="backdrop absolute flex justify-center w-full h-full drop-shadow-2xl">
              <img
                src="/assets/images/backgrounds/Subtract-menu-bar.svg"
                className="h-full"
                alt=""
              />
              <div className="absolute h-full w-1/3 bg-white left-0 border-t border-monday-stroke" />
              <div className="absolute h-full w-1/3 bg-white right-0 border-t border-monday-stroke" />
            </div>
            <div className="relative grid grid-cols-2 justify-evenly pr-[30px] h-full px-6">
              <Link to="/customer/discover" className="group menu active">
                <div className="flex flex-col h-full items-center gap-2 pt-6">
                  <img
                    src="/assets/images/icons/home-grey-fill-opacity.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/home-blue-fill-opacity.svg"
                    className="size-6 shrink-0 hidden group-[.active]:flex"
                    alt="icon"
                  />
                  <span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
                    Beranda
                  </span>
                  <img
                    src="/assets/images/icons/menu-active-icon.svg"
                    className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
                    alt="active"
                  />
                </div>
              </Link>
              <Link to="/customer/my-orders" className="group menu">
                <div className="flex flex-col h-full items-center gap-2 pt-6">
                  <img
                    src="/assets/images/icons/stickynote-grey-fill-opacity.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/stickynote-blue-fill-opacity.svg"
                    className="size-6 shrink-0 hidden group-[.active]:flex"
                    alt="icon"
                  />
                  <span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
                    Pesanan
                  </span>
                  <img
                    src="/assets/images/icons/menu-active-icon.svg"
                    className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
                    alt="active"
                  />
                </div>
              </Link>
            </div>
            <div className="relative grid grid-cols-2 justify-evenly pr-[30px] h-full px-6">
              <Link to="#" className="group menu">
                <div className="flex flex-col h-full items-center gap-2 pt-6">
                  <img
                    src="/assets/images/icons/stickynote-grey-fill-opacity.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/stickynote-blue-fill-opacity.svg"
                    className="size-6 shrink-0 hidden group-[.active]:flex"
                    alt="icon"
                  />
                  <span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
                    Kotak Masuk
                  </span>
                  <img
                    src="/assets/images/icons/menu-active-icon.svg"
                    className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
                    alt="active"
                  />
                </div>
              </Link>
              <Link to="/customer/settings" className="group menu">
                <div className="flex flex-col h-full items-center gap-2 pt-6">
                  <img
                    src="/assets/images/icons/setting-2-grey-fill-opacity.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                  <span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
                    Pengaturan
                  </span>
                  <img
                    src="/assets/images/icons/menu-active-icon.svg"
                    className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
                    alt="active"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverPage;
