import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h1>403 - Tidak Resmi</h1>
      <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      <Link to="/">Kembali</Link>
    </div>
  );
};

export default Unauthorized;
