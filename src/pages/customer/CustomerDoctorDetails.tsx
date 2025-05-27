import { Link, useParams } from "react-router-dom";
import { useFetchDoctor } from "../../hooks/useDoctors";


function CustomerDoctorDetail() {
  const { doctorId } = useParams();

  const { data: doctor, isPending, isError } = useFetchDoctor(Number(doctorId));

  if (isPending) {
    return <div className="text-center mt-10">Memuat...</div>;
  }

  if (isError || !doctor) {
    return <div className="text-center mt-10 text-red-500">Dokter tidak ditemukan</div>;
  }

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div id="Top-Nav" className="flex relative w-full">
          <div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
            <div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
              <Link to={`/customer/browse-doctors/${doctor.hospital.id}/${doctor.specialist.id}`}
                className="size-11 flex shrink-0"
              >
                <img
                  src="/assets/images/icons/mobile-back-button.svg"
                  className="size-full"
                  alt="icon"
                />
              </Link>
              <h1 className="font-bold text-lg leading-none text-center">
                Detail Dokter
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
        <main className="flex flex-col flex-1 bg-white">
          <div
            id="Thumbnail"
            className="flex flex-col w-full h-[622px] overflow-hidden bg-monday-background"
          >
            <div className="absolute transform -translate-x-1/2 left-1/2 top-[134px] flex w-[365px] h-[326px] overflow-hidden mx-auto">
              <img
                src={doctor.photo}
                className="size-full object-contain object-top"
                alt=""
              />
            </div>
            <div className="relative flex flex-col min-h-[189px] rounded-2xl border border-monday-stroke p-4 bg-white gap-4 mx-5 mb-5 mt-auto">
              <div className="flex items-center gap-[10px]">
                <div className="flex flex-col gap-[6px] w-full">
                  <p className="font-bold text-xl">{doctor.name}</p>
                  <div className="flex items-center gap-1 text-nowrap">
                    <img
                      src="/assets/images/icons/stetoscop-grey.svg"
                      className="flex size-5 shrink-0"
                      alt="icon"
                    />
                    <p className="font-semibold text-lg text-monday-gray leading-none">
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
                  <p className="font-semibold leading-none text-white">5.0</p>
                </div>
              </div>
              <div className="flex items-center rounded-2xl border border-monday-stroke p-4 gap-4">
                <div className="flex flex-col gap-2 items-center text-center w-full">
                  <p className="flex items-center gap-0.5 font-semibold leading-none text-nowrap">
                    <img
                      src="/assets/images/icons/briefcase-blue-fill.svg"
                      className="size-5"
                      alt="icon"
                    />
                    {doctor.yoe} Tahun
                  </p>
                  <p className="font-medium text-sm text-monday-gray leading-none">
                    Pengalaman
                  </p>
                </div>
                <div className="flex h-[32px] shrink-0 border border-monday-stroke" />
                <div className="flex flex-col gap-2 items-center text-center w-full">
                  <p className="flex items-center gap-0.5 font-semibold leading-none">
                    <img
                      src={`${doctor.gender == "Male"
                        ? "/assets/images/icons/man-black-fill.svg"
                        : "/assets/images/icons/woman-black-fill.svg "
                        }`}
                      className="size-5"
                      alt="icon"
                    />
                    {doctor.gender}
                  </p>
                  <p className="font-medium text-sm text-monday-gray leading-none">
                    Jenis Kelamin
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full py-6 px-5 bg-white gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-bold leading-none">Tentang Dokter</p>
              <p className="font-medium leading-[1.6em] text-monday-gray">
                {doctor.about}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Mengapa Memilih Saya</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="card flex flex-col items-center text-center rounded-2xl border border-monday-orange py-6 px-4 bg-monday-orange/10 gap-4">
                  <img
                    src="/assets/images/icons/clipboard-tick-orange.svg"
                    className="flex size-9 shrink-0"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="font-bold text-lg text-monday-orange">
                      Menjamin
                    </p>
                    <p className="font-medium text-sm text-monday-orange leading-none">
                      Dokter Terpercaya
                    </p>
                  </div>
                </div>
                <div className="card flex flex-col items-center text-center rounded-2xl border border-monday-cyan py-6 px-4 bg-monday-cyan/10 gap-4">
                  <img
                    src="/assets/images/icons/verify-cyan-fill.svg"
                    className="flex size-9 shrink-0"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="font-bold text-lg text-monday-cyan">
                      Sertifikasi
                    </p>
                    <p className="font-medium text-sm text-monday-cyan leading-none">
                      Dokter Berlisensi
                    </p>
                  </div>
                </div>
                <div className="card flex flex-col items-center text-center rounded-2xl border border-monday-light-green py-6 px-4 bg-monday-light-green/10 gap-4">
                  <img
                    src="/assets/images/icons/lovely-light-green-fill.svg"
                    className="flex size-9 shrink-0"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="font-bold text-lg text-monday-light-green">
                      Perawatan Pasien
                    </p>
                    <p className="font-medium text-sm text-monday-light-green leading-none">
                      Perawatan Pribadi
                    </p>
                  </div>
                </div>
                <div className="card flex flex-col items-center text-center rounded-2xl border border-monday-purple py-6 px-4 bg-monday-purple/10 gap-4">
                  <img
                    src="/assets/images/icons/timer-purple-fill.svg"
                    className="flex size-9 shrink-0"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="font-bold text-lg text-monday-purple">
                      Layanan Tepat Waktu
                    </p>
                    <p className="font-medium text-sm text-monday-purple leading-none">
                      Jadwal Tepat Waktu
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Pelanggan yang Bahagia</h2>
              </div>
              <div className="flex flex-col gap-4">
                <div className="card flex flex-col rounded-2xl border border-monday-stroke  p-4 bg-white gap-4">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex size-[62px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
                        <img
                          src="/assets/images/photos/cewe.jpeg"
                          className="size-full object-cover"
                          alt="icon"
                        />
                      </div>
                      <div className="flex flex-col gap-[6px] w-full">
                        <p className="font-semibold">Neybila Rayna</p>
                        <div className="flex items-center gap-0.5 text-nowrap">
                          <img
                            src="/assets/images/icons/woman-grey.svg"
                            className="flex size-5 shrink-0"
                            alt="icon"
                          />
                          <p className="font-medium text-monday-gray leading-none">
                            Wanita
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange/10 py-[6px] px-[10px] gap-0.5">
                      <img
                        src="/assets/images/icons/star-sliced.svg"
                        className="flex size-5 shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold leading-none text-monday-orange">
                        5.0
                      </p>
                    </div>
                  </div>
                  <hr className="border border-monday-stroke" />
                  <p className="font-medium text-monday-gray leading-[1.6em]">
                    “Pertemuan yang cepat dan mudah! drg. M. Faid Fahlevy. SpProst profesional, dan stafnya membuat saya merasa nyaman. Sangat direkomendasikan!"
                  </p>
                </div>
                <div className="card flex flex-col rounded-2xl border border-monday-stroke  p-4 bg-white gap-4">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex size-[62px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
                        <img
                          src="/assets/images/photos/cowo.jpeg"
                          className="size-full object-cover"
                          alt="icon"
                        />
                      </div>
                      <div className="flex flex-col gap-[6px] w-full">
                        <p className="font-semibold">Alexander Win</p>
                        <div className="flex items-center gap-0.5 text-nowrap">
                          <img
                            src="/assets/images/icons/man-grey.svg"
                            className="flex size-5 shrink-0"
                            alt="icon"
                          />
                          <p className="font-medium text-monday-gray leading-none">
                            Pria
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange/10 py-[6px] px-[10px] gap-0.5">
                      <img
                        src="/assets/images/icons/star-sliced.svg"
                        className="flex size-5 shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold leading-none text-monday-orange">
                        5.0
                      </p>
                    </div>
                  </div>
                  <hr className="border border-monday-stroke" />
                  <p className="font-medium text-monday-gray leading-[1.6em]">
                    "Pelayanan yang sangat baik! drg. M. Faid Fahlevy. SpProst sangat penuh perhatian dan teliti. Kliniknya bersih, dan stafnya ramah. Sangat direkomendasikan untuk perawatan langsung!"
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id="Bottom-Bar" className="flex relative w-full h-[141px] mt-3">
            <div className="fixed z-30 bottom-0 flex flex-col w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-nowrap">
                  <img
                    src="/assets/images/icons/ticket-expired-grey.svg"
                    className="flex size-5 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-monday-gray leading-none">
                    Harga:
                  </p>
                </div>
                <p className="font-bold text-xl text-monday-red">Rp {doctor.specialist.price.toLocaleString('id')}</p>
              </div>
              <Link to={`/customer/book-doctor/${doctor.id}`}
                className="flex items-center w-full justify-between rounded-full py-4 px-6 bg-monday-blue"
              >
                <span className="font-semibold text-lg leading-none text-white">
                  Tetapkan Janji Temu
                </span>
                <img
                  src="/assets/images/icons/arrow-right-circle-white.svg"
                  className="flex size-6 shrink-0"
                  alt="icon"
                />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>

  );
}

export default CustomerDoctorDetail;
