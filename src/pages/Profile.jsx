import { useSelector } from "react-redux";
import { Container, Loading, LogoutBtn } from "../components";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <div className="w-full py-8  text-center">
      <Container>
        {userData ? (
          <div className="text-center">
            <div className="p-2 w-full">
              <p className="text-white">Hi !</p>
              <h1 className="text-4xl uppercase font-bold text-center text-[#eaa79c]">
                {userData.name}
              </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 py-6">
              <p className="text-white">Email - </p>
              <h2 className="text-xl font-bold text-center text-[#eaa79c]">
                {userData.email}
              </h2>
              <div className="text-center py-2">
                {userData.emailVerification ? (
                  <p className="text-green-500 ml-1">✅ Verified Email</p>
                ) : (
                  <p className="text-red-500 ml-1">❌ Email is not Verified</p>
                )}
              </div>
            </div>

            <div className="py-6">{authStatus && <LogoutBtn />}</div>
          </div>
        ) : (
          <Loading />
        )}
      </Container>
    </div>
  );
}

export default Profile;
