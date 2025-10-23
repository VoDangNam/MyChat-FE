import React from "react";

const HomeUser = () => {
  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <div className="basis-1/5 bg-blue-200">
          <div className="flex flex-col">
            <div className=" w-[300px] h-[120px] flex-2 bg-[url('/LoGo_MyChat.png')] bg-cover bg-center ">
             
            </div>

            <div className="flex-1 flex justify-center items-center text-center  hover:text-green-500 boxShadow-custom-down">
              <a href="#" className="flex-1 flex justify-center p-[10px] bg-gray-600 font-bold ">
                Message
              </a>
            </div>

            <div className="flex-1 bg-blue-500 flex justify-center items-center text-center hover:bg-blue-200">
              <a href="#" className="flex-1 flex justify-center p-[10px] ">
                Archived
              </a>
            </div>

            <div className="flex-1  flex justify-center items-center text-center mt-auto hover:text-green-500">
              <a href="#" className="flex-1 flex justify-center p-[10px] ">
                Help
              </a>
            </div>
          </div>
        </div>

        <div className="basis-4/5 bg-blue-300">
          <div class="flex flex-col">
            <div className="bg-red-300 h-[90px] "></div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeUser;
