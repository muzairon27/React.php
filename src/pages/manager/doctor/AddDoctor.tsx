import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorSchema, DoctorFormData } from "../../../schemas/doctorSchema";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/types";
import { useCreateDoctor } from "../../../hooks/useDoctors";
import { useFetchHospitals } from "../../../hooks/useHospitals";
import { useFetchSpecialists } from "../../../hooks/useSpecialists";
import UserProfileCard from "../../../components/UserProfileCard";
import { useRef, useState } from "react";

const AddDoctor = () => {
  const navigate = useNavigate();
  const { mutate: createDoctor, isPending } = useCreateDoctor();
  const { data: hospitals } = useFetchHospitals();
  const { data: specialists } = useFetchSpecialists();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState(
    "/assets/images/icons/gallery-grey.svg"
  );

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
  });

  const onSubmit = (data: DoctorFormData) => {
    setError("root", { type: "server", message: "" });

    createDoctor(data, {
      onSuccess: () => navigate("/admin/doctors"),
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const { message, errors: fieldErrors } = error.response?.data || {};
        if (message) {
          setError("root", { type: "server", message });
        }
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([key, value]) => {
            setError(key as keyof DoctorFormData, {
              type: "server",
              message: value[0],
            });
          });
        }
      },
    });
  };

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
              <h1 className="font-bold text-2xl capitalize">Tambah Dokter</h1>
              <Link
                to={"/admin/doctors"}
                className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-[18px] flex shrink-0"
                  alt="icon"
                />
                Kelola Dokter
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full rounded-3xl p-5 gap-5 bg-white"
          >
            <h2 className="font-semibold text-xl capitalize">
              Lengkapi formulirnya
            </h2>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">
                Unggah Gambar
              </p>
              <div className="flex items-center justify-between w-[500px]">
                <div className="group relative flex size-[100px] rounded-full overflow-hidden items-center justify-center bg-monday-background">
                  <img
                    id="Thumbnail"
                    src={imagePreview}
                    className="size-full object-cover"
                    alt="icon"
                  />
                  <input
                    type="file"
                    id="File-Input"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue("photo", file);
                        setImagePreview(URL.createObjectURL(file));
                      } else {
                        setImagePreview(
                          "/assets/images/icons/gallery-grey.svg"
                        );
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-black w-[152px] font-semibold text-nowrap"
                >
                  {imagePreview !== "/assets/images/icons/gallery-grey.svg"
                    ? "Ubah Foto"
                    : "Tambahkan Foto"}
                </button>
              </div>
            </div>
            {errors.photo && (
              <p className="text-red-500">
                <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                  {errors.photo.message}
                </span>
              </p>
            )}
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">
                Nama Dokter
              </p>
              <div className="group/errorState flex flex-col gap-2 invalid">
                <label className="group relative w-[500px]">
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/user-thin-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                    Masukkan Nama Dokter
                  </p>
                  <input
                    type="text"
                    {...register("name")}
                    className={`appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300
                      ${errors.name
                        ? "group-[&.invalid]/errorState:border-monday-red"
                        : "border-monday-border"
                      }`}
                    placeholder=""
                  />
                </label>
                {errors.name && (
                  <p className="text-red-500">
                    <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                      {errors.name.message}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-lg text-monday-gray mt-[24.5px]">
                Tentang Dokter
              </p>
              <div className="group/errorState flex flex-col gap-2 invalid">
                <label
                  className={`group flex py-4 px-6 rounded-3xl border-[2px] transition-300 w-[500px] ${errors.about
                      ? "group-[&.invalid]/errorState:border-monday-red"
                      : "border-monday-border"
                    } focus-within:border-monday-black`}
                >
                  <div className="flex h-full pr-4 pt-2 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/note-text-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <div className="flex flex-col gap-[6px] pl-4 w-full">
                    <p className="placeholder font-semibold text-monday-gray text-sm group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:text-monday-black transition-300">
                      Masukkan Deskripsi Dokter
                    </p>
                    <textarea
                      className="appearance-none outline-none w-full font-semibold text-lg leading-[160%]"
                      rows={3}
                      {...register("about")}
                      placeholder=""
                      defaultValue={""}
                    />
                  </div>
                </label>
                {errors.about && (
                  <p className="text-red-500">
                    <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                      {errors.about.message}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">
                Pilih Rumah Sakit
              </p>
              <div className="group/errorState flex flex-col gap-2 invalid">
                <label
                  className={`group relative rounded-3xl border-[1.5px] focus-within:border-monday-black transition-300 overflow-hidden w-[500px] ${errors.hospital_id
                      ? "group-[&.invalid]/errorState:border-monday-red"
                      : "border-monday-border"
                    }`}
                >
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/hospital-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-medium text-lg absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-has-[:valid]:text-sm group-has-[:valid]:text-monday-gray group-focus-within:top-[25px] transition-300">
                    Pilih Rumah Sakit
                  </p>
                  <select
                    {...register("hospital_id")}
                    id=""
                    className="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
                  >
                    <option value="">Memilih</option>
                    {hospitals?.map((hospital) => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                  </select>
                  <img
                    src="/assets/images/icons/arrow-down-black.svg"
                    className="absolute transform -translate-y-1/2 top-1/2 right-6 size-6"
                    alt="icon"
                  />
                </label>
                {errors.hospital_id && (
                  <p className="text-red-500">
                    <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                      {errors.hospital_id.message}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">
                Pilih Spesialis
              </p>
              <div className="group/errorState flex flex-col gap-2 invalid">
                <label
                  className={`group relative rounded-3xl border-[1.5px] focus-within:border-monday-black transition-300 overflow-hidden w-[500px] ${errors.specialist_id
                      ? "group-[&.invalid]/errorState:border-monday-red"
                      : "border-monday-border"
                    }`}
                >
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/stetoscop-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-medium text-lg absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-has-[:valid]:text-sm group-has-[:valid]:text-monday-gray group-focus-within:top-[25px] transition-300">
                    Pilih Spesialis
                  </p>
                  <select
                    {...register("specialist_id")}
                    id=""
                    className="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
                  >
                    <option value="">Memilih</option>
                    {specialists?.map((specialist) => (
                      <option key={specialist.id} value={specialist.id}>
                        {specialist.name}
                      </option>
                    ))}
                  </select>
                  <img
                    src="/assets/images/icons/arrow-down-black.svg"
                    className="absolute transform -translate-y-1/2 top-1/2 right-6 size-6"
                    alt="icon"
                  />
                </label>
                {errors.specialist_id && (
                  <p className="text-red-500">
                    <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                      {errors.specialist_id.message}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-lg text-monday-gray mt-[24.5px]">
                Pilih Jenis Kelamin
              </p>
              <div className="flex items-center gap-6 w-[500px] h-[56px">
                <label className="group relative flex items-center h-full py-4 px-5 gap-4 rounded-3xl border-[2px] border-monday-border focus-within:border-monday-black transition-300 w-full">
                  <div className="flex h-full shrink-0 pr-4 pl-1 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/man-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="font-semibold text-lg leading-none w-full">
                    Pria
                  </p>
                  <div className="flex size-4 shrink-0 rounded-full ring-2 ring-monday-black border-[3px] border-white group-has-[:checked]:bg-monday-blue group-has-[:checked]:ring-monday-blue transition-300" />
                  <input
                    type="radio"
                    {...register("gender")}
                    id=""
                    value="Pria"
                    className="absolute opacity-0"
                  />
                </label>
                <label className="group relative flex items-center h-full py-4 px-5 gap-4 rounded-3xl border-[2px] border-monday-border focus-within:border-monday-black transition-300 w-full">
                  <div className="flex h-full shrink-0 pr-4 pl-1 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/woman-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="font-semibold text-lg leading-none w-full">
                    Wanita
                  </p>
                  <div className="flex size-4 shrink-0 rounded-full ring-2 ring-monday-black border-[3px] border-white group-has-[:checked]:bg-monday-blue group-has-[:checked]:ring-monday-blue transition-300" />
                  <input
                    type="radio"
                    {...register("gender")}
                    id=""
                    value="Wanita"
                    className="absolute opacity-0"
                  />
                </label>
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-500">
                <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                  {errors.gender.message}
                </span>
              </p>
            )}
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">Pengalaman</p>
              <div className="group/errorState flex flex-col gap-2 invalid">
                <label className="group relative w-[500px]">
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/briefcase-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                    Masukkan Pengalaman
                  </p>
                  <input
                    type="number"
                    {...register("yoe")}
                    className={`appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300
                      ${errors.name
                        ? "group-[&.invalid]/errorState:border-monday-red"
                        : "border-monday-border"
                      }`}
                    placeholder=""
                  />
                  <div className="flex items-center h-6 pl-[18px] absolute transform -translate-y-1/2 top-1/2 right-5 border-l-[1.5px] border-monday-border ">
                    <span className="font-semibold text-lg leading-none">
                      Tahun
                    </span>
                  </div>
                </label>
                {errors.yoe && (
                  <p className="text-red-500">
                    <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                      {errors.yoe.message}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Link to={"/admin/doctors"} className="btn btn-red font-semibold">
                Kembali
              </Link>
              <button
                type="submit"
                className="btn btn-primary font-semibold rounded-full"
              >
                {isPending ? "Simpan..." : "Simpan Data"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddDoctor;
