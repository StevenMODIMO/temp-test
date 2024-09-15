"use cilent";
import Backdrop from "./Backdrop";
import ResetCode from "./ResetCode";
import ResetVerify from "./ResetVerify";
import Reset from "./Reset";

export default function ResetPassword() {
  return (
    <Backdrop>
      <main className="bg-gray-100 my-5 py-5 rounded-md w-[90%] mx-auto lg:w-[70%]">
        <header className="text-center text-black text-xl font-semibold p-3 lg:text-2xl">
          <h1>Reset your password</h1>
        </header>
        <ResetCode />
        {/* <ResetVerify />
        <Reset /> */}
      </main>
    </Backdrop>
  );
}
