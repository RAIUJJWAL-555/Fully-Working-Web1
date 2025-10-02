import React from "react";
// import Title from "../../components/Title";
import hostel1 from "../../assets/hostel1.png";
import hostel2 from "../../assets/hostel2.png";



const HI2 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Title text1={"HOME"} text2={"SECTION"} /> */}
      
      {/* Parent Container */}
      <div className="flex-grow flex flex-col lg:flex-row mt-4 gap-6 lg:h-[80vh]">
        
        {/* Left Section (Images) */}
        <div className="flex-grow flex flex-col justify-center items-center w-full lg:w-1/2 gap-4">
          <img
            className="h-40 w-4/5 sm:h-56 md:h-64 lg:h-[40%] lg:w-[85%] object-cover rounded-xl shadow"
            src={hostel1}
            alt="Hostel 1"
          />
          <img
            className="h-40 w-4/5 sm:h-56 md:h-64 lg:h-[40%] lg:w-[85%] object-cover rounded-xl shadow"
            src={hostel2}
            alt="Hostel 2"
          />
        </div>

        {/* Right Section (Text) */}
        <div className="bg-cyan-50 w-full mr-4 lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 py-8 rounded-xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center lg:text-left">
            Welcome to Government Polytechnic of Ghaziabad
          </h1>
          <p className="font-serif text-base sm:text-lg md:text-xl mt-5 leading-relaxed text-gray-700 text-justify">
            A very warm and cheerful greeting from ABC Government College! We
            are delighted to welcome you to our vibrant campus, where learning
            meets comfort and growth. At ABC Government College, we believe that
            education is not limited to classrooms—it also comes from the
            friendships, experiences, and memories you create during your
            college journey.
            <br />
            <br />
            To support you in this exciting phase of life, we proudly provide
            safe, comfortable, and well-managed hostel facilities for our
            students. The hostel is not just a place to stay, but a second home
            where you will find an atmosphere of harmony, discipline, and care.
            With a focus on creating a balanced environment for study and
            recreation, our hostel ensures that every student feels secure,
            motivated, and connected.
            <br />
            <br />
            Whether you are coming from near or far, our hostel is designed to
            help you settle easily, meet new people, and make lifelong friends.
            We warmly welcome you and look forward to being a part of your
            academic and personal journey at ABC Government College.
            
          </p>
          {/* <p className="mt-10 ml-80 font-semibold">THANK YOU!!</p> */}
          <p className="mt-10 font-semibold text-center sm:text-left">
    THANK YOU!!
  </p>
        </div>
      </div>
      
    </div>
  );
};

export default HI2;
