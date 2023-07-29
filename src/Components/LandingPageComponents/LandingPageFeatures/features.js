import React from "react";

const Features = () => {
  return (
    <section id="features" className="w-full py-6 h-auto">
      <div className="w-[90%] md:w-[80%] mx-auto md:pb-32 lg:pb-20 pb-12 ">
        <div className="my-5 p-2">
          <h2 className="font-bold text-xl md:text-2xl myblack text-center mb-4">
            Features
          </h2>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            <div className=" shadow-lg px-2 py-6 md:col-span-2 lg:col-span-1">
              <div className="w-full md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] mx-auto ">
                <img
                  className="w-full object-fill "
                  src="/images/Gif/face id gif.gif"
                />
              </div>
              <div>
                <h3 className="text-center font-bold text-5 mt-4 myblack">
                  Face Scanner
                </h3>
                <p className="text-center py-2 text-[14px] leading-6">
                  Our attendance app utilizes advanced facial recognition
                  technology to allow students to quickly and easily check-in to
                  their classes. This feature works by capturing an image of the
                  student's face and comparing it to a database of
                  pre-registered student images to verify their identity. This
                  process is fast, accurate, and highly secure, ensuring that
                  only authorized students can check-in to their classes. This
                  feature also eliminates the need for teachers to take
                  attendance manually, saving time and reducing the risk of
                  errors.
                </p>
              </div>
            </div>
            <div className=" shadow-lg px-2 py-6 md:col-span-1 lg:col-span-1">
              <div className="w-full md:w-[200px] md:h-[200px] mx-auto ">
                <img
                  className="w-full object-fill "
                  src="/images/Gif/gps gif.gif"
                />
              </div>
              <div>
                <h3 className="text-center font-bold text-5 mt-4 myblack">
                  GPS
                </h3>
                <p className="py-2 text-center text-[14px] leading-6">
                  We utilizes GPS location technology to ensure that students
                  can only check-in to their classes when they are within the
                  location of their school. This feature works by using the GPS
                  coordinates of the student's device to verify that they are
                  within a specific radius of their school. This helps to
                  prevent students from checking-in remotely or from locations
                  outside of the school, ensuring that attendance records are
                  accurate and reliable.
                </p>
              </div>
            </div>
            <div className=" shadow-lg px-2 py-6 md:col-span-1 lg:col-span-1">
              <div className="w-full md:w-[200px] md:h-[200px] mx-auto ">
                <img
                  className="w-full object-fill "
                  src="/images/Gif/timer gif.gif"
                />
              </div>
              <div>
                <h3 className="text-center font-bold text-5 mt-4 myblack">
                  Timer
                </h3>
                <p className="py-2 text-center text-[14px] leading-6">
                  By including a timer feature, if a student arrives late to
                  class, they will be marked as such. This feature works by
                  setting a specific time limit for students to check-in to
                  their classes, after which they will be marked as late. This
                  helps to encourage students to arrive on time and ensures that
                  attendance records are always up-to-date and reflective of
                  each student's attendance status. Additionally, when class is
                  over, any student who has not yet checked-in will be marked as
                  absent, providing an easy way for teachers to keep track of
                  their students' attendance throughout the day
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
