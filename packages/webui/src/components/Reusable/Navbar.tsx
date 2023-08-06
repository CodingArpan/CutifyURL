import React from "react";

const Navbar= (): JSX.Element => {
  return (
    <div className="w-full bg-transparent ">
      <div className="relative w-full md:max-w-6xl mx-auto py-3 px-10 flex flex-row justify-between items-center">
        <div className="brand text-xl md:text-3xl font-bold text-white px-4 py-1 cursor-pointer">
          CutifyURL
        </div>

        <div className="options flex flex-row justify-evenly items-center capitalize space-x-12 tracking-wider text-white font-semibold text-base">
          <div className="extra cursor-pointer md:relative p-2 group ">
            <input className="peer hidden" type="checkbox" id="menu" />

            <label
              htmlFor="menu"
              className="block mob_tab:peer-checked:hidden cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.25 3.625C7.25 4.58641 6.86808 5.50844 6.18826 6.18826C5.50844 6.86808 4.58641 7.25 3.625 7.25C2.66359 7.25 1.74156 6.86808 1.06174 6.18826C0.381918 5.50844 0 4.58641 0 3.625C0 2.66359 0.381918 1.74156 1.06174 1.06174C1.74156 0.381918 2.66359 0 3.625 0C4.58641 0 5.50844 0.381918 6.18826 1.06174C6.86808 1.74156 7.25 2.66359 7.25 3.625ZM7.25 14.5C7.25 15.4614 6.86808 16.3834 6.18826 17.0633C5.50844 17.7431 4.58641 18.125 3.625 18.125C2.66359 18.125 1.74156 17.7431 1.06174 17.0633C0.381918 16.3834 0 15.4614 0 14.5C0 13.5386 0.381918 12.6166 1.06174 11.9367C1.74156 11.2569 2.66359 10.875 3.625 10.875C4.58641 10.875 5.50844 11.2569 6.18826 11.9367C6.86808 12.6166 7.25 13.5386 7.25 14.5ZM3.625 29C4.58641 29 5.50844 28.6181 6.18826 27.9383C6.86808 27.2584 7.25 26.3364 7.25 25.375C7.25 24.4136 6.86808 23.4916 6.18826 22.8117C5.50844 22.1319 4.58641 21.75 3.625 21.75C2.66359 21.75 1.74156 22.1319 1.06174 22.8117C0.381918 23.4916 0 24.4136 0 25.375C0 26.3364 0.381918 27.2584 1.06174 27.9383C1.74156 28.6181 2.66359 29 3.625 29ZM18.125 3.625C18.125 4.58641 17.7431 5.50844 17.0633 6.18826C16.3834 6.86808 15.4614 7.25 14.5 7.25C13.5386 7.25 12.6166 6.86808 11.9367 6.18826C11.2569 5.50844 10.875 4.58641 10.875 3.625C10.875 2.66359 11.2569 1.74156 11.9367 1.06174C12.6166 0.381918 13.5386 0 14.5 0C15.4614 0 16.3834 0.381918 17.0633 1.06174C17.7431 1.74156 18.125 2.66359 18.125 3.625ZM14.5 18.125C15.4614 18.125 16.3834 17.7431 17.0633 17.0633C17.7431 16.3834 18.125 15.4614 18.125 14.5C18.125 13.5386 17.7431 12.6166 17.0633 11.9367C16.3834 11.2569 15.4614 10.875 14.5 10.875C13.5386 10.875 12.6166 11.2569 11.9367 11.9367C11.2569 12.6166 10.875 13.5386 10.875 14.5C10.875 15.4614 11.2569 16.3834 11.9367 17.0633C12.6166 17.7431 13.5386 18.125 14.5 18.125ZM18.125 25.375C18.125 26.3364 17.7431 27.2584 17.0633 27.9383C16.3834 28.6181 15.4614 29 14.5 29C13.5386 29 12.6166 28.6181 11.9367 27.9383C11.2569 27.2584 10.875 26.3364 10.875 25.375C10.875 24.4136 11.2569 23.4916 11.9367 22.8117C12.6166 22.1319 13.5386 21.75 14.5 21.75C15.4614 21.75 16.3834 22.1319 17.0633 22.8117C17.7431 23.4916 18.125 24.4136 18.125 25.375ZM25.375 7.25C26.3364 7.25 27.2584 6.86808 27.9383 6.18826C28.6181 5.50844 29 4.58641 29 3.625C29 2.66359 28.6181 1.74156 27.9383 1.06174C27.2584 0.381918 26.3364 0 25.375 0C24.4136 0 23.4916 0.381918 22.8117 1.06174C22.1319 1.74156 21.75 2.66359 21.75 3.625C21.75 4.58641 22.1319 5.50844 22.8117 6.18826C23.4916 6.86808 24.4136 7.25 25.375 7.25ZM29 14.5C29 15.4614 28.6181 16.3834 27.9383 17.0633C27.2584 17.7431 26.3364 18.125 25.375 18.125C24.4136 18.125 23.4916 17.7431 22.8117 17.0633C22.1319 16.3834 21.75 15.4614 21.75 14.5C21.75 13.5386 22.1319 12.6166 22.8117 11.9367C23.4916 11.2569 24.4136 10.875 25.375 10.875C26.3364 10.875 27.2584 11.2569 27.9383 11.9367C28.6181 12.6166 29 13.5386 29 14.5ZM25.375 29C26.3364 29 27.2584 28.6181 27.9383 27.9383C28.6181 27.2584 29 26.3364 29 25.375C29 24.4136 28.6181 23.4916 27.9383 22.8117C27.2584 22.1319 26.3364 21.75 25.375 21.75C24.4136 21.75 23.4916 22.1319 22.8117 22.8117C22.1319 23.4916 21.75 24.4136 21.75 25.375C21.75 26.3364 22.1319 27.2584 22.8117 27.9383C23.4916 28.6181 24.4136 29 25.375 29Z"
                  fill="white"
                />
              </svg>
            </label>

            <label
              htmlFor="menu"
              className="hidden mob_tab:peer-checked:block "
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                  fill="white"
                />
              </svg>
            </label>

            <div className="list absolute z-50 overflow-auto  w-[80%] md:w-max right-5 text-black  mt-8 bg-white py-5 rounded-md top-40 opacity-0 invisible mob_tab:peer-checked:opacity-100  mob_tab:peer-checked:visible mob_tab:peer-checked:top-7 md:top-20 md:-left-10 md:group-hover:top-5 md:group-hover:opacity-100 md:group-hover:visible transition-all ease-in-out duration-300 shadow-xl">
              <div className="">
                <div className="py-3 px-5 hover:bg-[#e9ecef] hover:text-blue-600 transition-all ease-in-out duration-200">
                  OptionOptionOptionOption
                </div>
                <div className="py-3 px-5 hover:bg-[#e9ecef] hover:text-blue-600 transition-all ease-in-out duration-200">
                  Option1
                </div>
                <div className="py-3 px-5 hover:bg-[#e9ecef] hover:text-blue-600 transition-all ease-in-out duration-200">
                  Option2
                </div>
                <div className="py-3 px-5 hover:bg-[#e9ecef] hover:text-blue-600 transition-all ease-in-out duration-200">
                  Option3
                </div>
                <div className="py-3 px-5 hover:bg-[#e9ecef] hover:text-blue-600 transition-all ease-in-out duration-200">
                  Option4
                </div>
                <div className="py-3 px-5 hover:bg-[#e9ecef] hover:text-blue-600 transition-all ease-in-out duration-200">
                  Option5
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 py-1.5  cursor-pointer hidden md:block">
            pricing
          </div>
          <div className="px-8 py-1.5 rounded-full bg-white/30  cursor-pointer hidden md:block">
            sign up
          </div>
          <div className="px-8 py-1.5 rounded-full border-2 border-white  cursor-pointer hidden md:block">
            log in
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
