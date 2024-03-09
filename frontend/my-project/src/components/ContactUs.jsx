const ContactUs = () => {
  return (
    <div className="min-w-screen flex flex-col gap-y-7 min-h-[600px] bg-white">
      <h1 className="text-center font-bold text-5xl  mt-10">
        Get in Touch With Us
      </h1>
      <p className="text-center text-slate-500">
        Drop us a message, we will try to get back to you within 3 working days
      </p>

      <div className="flex flex-row justify-around">
        <div className="flex flex-col text-3xl font-bold">
          <p>📧 business inquiries</p>
          <p>📢 advertising</p>
          <p>🛠️ support</p>
        </div>

        <form className="flex flex-col gap-y-3">
          <label> Name</label>
          <input type="text" placeholder="Your Name" className="bg-slate-200 px-5 py-6 text-center" />
          <label> Email </label>
          <input type="text" placeholder="Email Address"className="bg-slate-200 px-5 py-6 text-center" />
          <label>Message</label>
          <input type="text" placeholder="Message" className="bg-slate-200 px-5 py-6 text-center" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-[300px]"> Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
