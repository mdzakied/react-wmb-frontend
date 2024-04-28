import MaintenanceImg from "@assets/images/maintenance.png";

export default function Maintenance() {
    return (
        <>
          {/* Maintenance Section */}
          <section
            id="maintenance"
            className="flex flex-col justify-center items-center"
          >
            {/* Image */}
            <div className="flex justify-center ">
              <img src={MaintenanceImg} alt="MaintenanceImg" className="w-3/4 md:w-1/3" />
            </div>
            {/* Text */}
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Under Maintenance</h1>
              <p className="text-md">
                Our website is under maintenance. Well be back soon!
              </p>
            </div>
          </section>
        </>
      );
}
