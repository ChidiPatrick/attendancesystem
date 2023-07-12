import React from "react";

const Features = () => {
  return (
    <section>
      <div className="my-5 p-2">
        <h2 className="font-bold text-2xl text-center mb-4">Features</h2>
        <figure className="w-full flex place-content-center">
          <img src="/images/Gif/face id gif.gif" />
        </figure>
        <div>
          <h3 className="text-center font-bold text-5 mt-4">Face Scanner</h3>
          <p className="text-center p-2">
            Our attendance app utilizes advanced facial recognition technology
            to allow students to quickly and easily check-in to their classes.
            This feature works by capturing an image of the student's face and
            comparing it to a database of pre-registered student images to
            verify their identity. This process is fast, accurate, and highly
            secure, ensuring that only authorized students can check-in to their
            classes. This feature also eliminates the need for teachers to take
            attendance manually, saving time and reducing the risk of errors.
          </p>
        </div>
      </div>
      <div className="mt-5">
        <figure className="w-full flex place-content-center">
          <img src="/images/Gif/gps gif.gif" />
        </figure>
        <div>
          <h3 className="text-center font-bold text-5 mt-4">GPS</h3>
          <p className="p-2 text-center">
            We utilizes GPS location technology to ensure that students can only
            check-in to their classes when they are within the location of their
            school. This feature works by using the GPS coordinates of the
            student's device to verify that they are within a specific radius of
            their school. This helps to prevent students from checking-in
            remotely or from locations outside of the school, ensuring that
            attendance records are accurate and reliable.
          </p>
        </div>
      </div>
      <div className="mt-5">
        <figure className="w-full flex place-content-center">
          <img src="/images/Gif/timer gif.gif" />
        </figure>
        <div>
          <h3 className="text-center font-bold text-5 mt-4">Timer</h3>
          <p className="p-2 text-center">
            By including a timer feature, if a student arrives late to class,
            they will be marked as such. This feature works by setting a
            specific time limit for students to check-in to their classes, after
            which they will be marked as late. This helps to encourage students
            to arrive on time and ensures that attendance records are always
            up-to-date and reflective of each student's attendance status.
            Additionally, when class is over, any student who has not yet
            checked-in will be marked as absent, providing an easy way for
            teachers to keep track of their students' attendance throughout the
            day
          </p>
        </div>
      </div>
      <div className="mt-5">
        <figure className="w-full flex place-content-center">
          <img src="/images/adminFeatures.svg" />
        </figure>
        <div>
          <h3 className="text-center font-bold text-5 mt-4">Admin Dashboard</h3>
          <p className="p-2 text-center">
            Admin Dashboard for the with many control features...
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
