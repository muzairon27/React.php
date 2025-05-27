import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useFetchSpecialist } from "../../../hooks/useSpecialists";
import UserProfileCard from "../../../components/UserProfileCard";
import React from "react";

const SpecialistDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: specialist, isPending } = useFetchSpecialist(Number(id));

  if (isPending) return <p>Memuat detail spesialis...</p>;
  if (!specialist) return <p> spesialis tidak ditemukan...</p>;

  return (
    <div id="main-container" className="flex flex-1">
      <Sidebar />
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        <div
          id="Top-Bar"
          className="flex items-center w-full gap-6 mt-[30px] mb-6"
        >
          <div className="flex items-center gap-6 h-[102px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-2 w-full">
              <h1 className="font-bold text-2xl capitalize">
                Detail Spesialis
              </h1>
              <Link to={`/admin/specialists/`}
                className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-[18px] flex shrink-0"
                  alt="icon"
                />
                Spesialis
              </Link>
            </div>
            <div className="flex items-center flex-nowrap gap-3">
              <div className="relative w-fit">
                <div className="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden">
                  <img
                    src="/assets/images/icons/help-desk-black.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <p className="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]">
                  24/7
                </p>
              </div>
            </div>
          </div>
          <UserProfileCard />
        </div>
        <main className="flex flex-col gap-5 flex-1">
          <section
            id="Specialist-Info"
            className="flex items-center justify-between gap-5 rounded-[20px] p-5 bg-white"
          >
            <div className="flex items-center gap-4 w-[320px] shrink-0">
              <div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0 p-[10px]">
                <img
                  src={specialist.photo}
                  className="size-full object-contain"
                  alt="icon"
                />
              </div>
              <div className="flex flex-col gap-[6px] flex-1">
                <p className="font-semibold text-xl w-[212px] truncate">
                  {specialist.name}
                </p>
                <p className="font-semibold text-xl text-monday-red leading-none">
                  Rp {Number(specialist.price).toLocaleString("id")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 w-[164px] shrink-0">
              <img
                src="/assets/images/icons/verify-blue-fill.svg"
                className="size-6 flex shrink-0"
                alt="icon"
              />
              <p className="font-semibold text-lg text-nowrap text-monday-blue">
                Bersertifikat
              </p>
            </div>
            <div className="flex items-center gap-1 w-[210px] shrink-0">
              <img
                src="/assets/images/icons/profile-2user-black.svg"
                className="size-6 flex shrink-0"
                alt="icon"
              />
              <p className="font-semibold text-lg text-nowrap">
                {specialist.doctors.length} Dokter
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to={`/admin/specialists/edit/${specialist.id}`}
                className="btn btn-black min-w-[120px] font-semibold"
              >
                <img
                  src="/assets/images/icons/edit-white.svg"
                  className="flex size-6 shrink-0"
                  alt="icon"
                />
                Edit
              </Link>
            </div>
          </section>
          <section
            id="Doctor-List"
            className="flex flex-col flex-1 shrink-0 rounded-[20px] p-5 gap-5 bg-white"
          >
            <p className="header font-semibold text-xl">Daftar Dokter</p>
            {specialist.doctors && specialist.doctors.length > 0 ? (
              <div className="flex flex-col gap-5">
                {specialist.doctors.map((doctor) => (
                  <React.Fragment key={doctor.id}>
                    <hr className="border-monday-stroke last:hidden" />
                    <div className="card flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4 w-[320px] shrink-0">
                        <div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
                          <img
                            src={doctor.photo}
                            className="size-full object-cover"
                            alt="icon"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] flex-1">
                          <p className="font-semibold text-xl w-[222px] truncate">
                            {doctor.name}
                          </p>
                          <p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
                            <img
                              src="/assets/images/icons/stetoscop-grey.svg"
                              className="size-5"
                              alt="icon"
                            />
                            {specialist.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-[180px]">
                        <p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
                          <img
                            src="/assets/images/icons/star-sliced.svg"
                            className="size-6"
                            alt="icon"
                          />
                          4.8/5.0
                        </p>
                        <p className="font-medium text-lg text-monday-gray leading-none">
                          Peringkat
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 w-[180px]">
                        <p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
                          <img
                            src="/assets/images/icons/briefcase-blue-fill.svg"
                            className="size-6"
                            alt="icon"
                          />
                          {doctor.yoe} Tahun
                        </p>
                        <p className="font-medium text-lg text-monday-gray leading-none">
                          Pengalaman
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 w-[180px]">
                        <p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
                          <img
                            src={`${
                              doctor.gender == "Male"
                                ? "/assets/images/icons/man-black-fill.svg"
                                : "/assets/images/icons/woman-black-fill.svg "
                            }`}
                            className="size-6"
                            alt="icon"
                          />
                          {doctor.gender}
                        </p>
                        <p className="font-medium text-lg text-monday-gray leading-none">
                          Jenis kelamin
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div
                id="Empty-State"
                className="  flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-stroke gap-8"
              >
                <img
                  src="/assets/images/icons/note-remove-grey.svg"
                  className="size-[52px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-1 items-center text-center">
                  <p className="font-semibold text-monday-gray">
                    Ups, Anda belum memiliki data apa pun
                  </p>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default SpecialistDetails;
