import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-500 p-4 rounded-tl-3xl rounded-tr-none rounded-bl-none rounded-br-3xl justify-center items-center">
      <div className="flex flex-col flex-1 p-3">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 m-2">Checkout these resources with 100 JavaScript projects</p>
        <Button gradientDuoTone="purpleToPink" className="rounded-bl-none ">
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 js projects
          </a>
        </Button>
      </div>
      <div className=" flex-1 p-3">
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
          alt="image"
        />
      </div>
    </div>
  );
}
