
export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Stay Protected. Stay Healthy.</h1>
        <p className="text-lg mb-6">
          Get timely reminders for your vaccines and your family.
        </p>       
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {[
          { icon: "📅", title: "Easy Scheduling", text: "Book vaccine appointments in seconds." },
          { icon: "🔔", title: "Smart Reminders", text: "Never miss a dose with SMS & email alerts." },
          { icon: "👨‍👩‍👧", title: "Family Tracking", text: "Track vaccination for the whole family." },
          { icon: "🏥", title: "Hospital Network", text: "Integrated with trusted healthcare centers." }
        ].map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.text}</p>
          </div>
        ))}
      </section>

      {/* Upcoming Reminders */}
      {/* <section className="bg-gray-50 py-12 px-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Reminders</h2>
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Polio Vaccine</h3>
          <p className="text-gray-600">Scheduled: 25th Aug, 2025</p>
          <p className="text-gray-600">For: Baby John</p>
        </div>
      </section> */}

    </div>
  );
}
