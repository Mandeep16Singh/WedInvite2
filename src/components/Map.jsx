export default function Map() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">

        <div className="text-center py-10 px-6">
          <h2 className="text-4xl font-semibold mb-4">
            Venue Location
          </h2>
          <p className="text-lg text-gray-700">
            Shubh Banquets & Convention Centre, Gurgaon
          </p>
        </div>

        <iframe
          className="w-full h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.940681861402!2d77.0451791!3d28.481333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19bab9dffaa7%3A0x22ac65738c0fc42!2sShubh%20Banquets%20%26%20Convention%20Centre!5e0!3m2!1sen!2sin!4v1771240204737!5m2!1sen!2sin"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>

        <div className="text-center py-8">
          <a
            href="https://maps.app.goo.gl/rGR9iUByEfHf6U7E9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-black text-white rounded-full hover:opacity-80 transition"
          >
            Open in Google Maps
          </a>
        </div>

      </div>
    </section>
  );
}
