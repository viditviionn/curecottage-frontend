import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ = () => {
  const navigate = useNavigate();

  const faqData = [
    {
      question: "How close are you to the hospitals?",
      answer: "All our properties are strategically located within 3km (approximately 10-minute drive) of major hospitals including Apollo Hospitals and Fortis Healthcare on Bannerghatta Road, Bangalore. This proximity ensures quick and easy access to medical facilities for emergency situations, follow-up appointments, and regular medical consultations."
    },
    {
      question: "Can I cook my own food?",
      answer: "Yes, absolutely! All our recovery homes are equipped with fully functional kitchenettes that include basic cooking facilities such as a stove, refrigerator, microwave, and essential cookware. This allows you to prepare your own meals according to your dietary preferences and medical requirements. Additionally, we offer therapeutic meal services through our partner network if you prefer home-style, nutritious food prepared by professional chefs." 
    },
    {
      question: "Is airport pickup included?",
      answer: "Yes, airport transfers are included in our weekly and monthly packages at no additional cost. For shorter stays, airport pickup is available as an affordable add-on service. We ensure comfortable, air-conditioned transportation from Kempegowda International Airport (BLR) directly to your recovery home. Our drivers are trained to assist with luggage and provide a smooth, stress-free journey. We recommend booking your airport transfer at least 24 hours in advance to ensure availability."
    },
    {
      question: "Do you have wheelchair access?",
      answer: "Absolutely! Accessibility is a top priority for us. All our properties feature elevator access, wheelchair-friendly entrances with ramps, wide doorways, and adapted bathrooms equipped with grab rails, roll-in showers, and accessible fixtures. Our facilities comply with accessibility standards to ensure comfort and safety for guests with mobility challenges. We also provide wheelchair-accessible common areas and ensure that all essential facilities are easily reachable."
    },
    {
      question: "What if I need nursing care?",
      answer: "We understand that some guests may require professional nursing care during their recovery. We coordinate post-discharge nursing visits through our network of vetted, certified nursing agencies. Our team can help arrange qualified registered nurses (RNs) or certified nursing assistants (CNAs) based on your specific medical requirements. Services can include medication management, wound care, vital signs monitoring, assistance with daily activities, and coordination with your treating physicians."
    },
    {
      question: "What amenities are included in the rooms?",
      answer: "All our rooms come fully furnished with comfortable beds, study/work desk, chairs, wardrobe, and storage space. Each room includes a private kitchenette with cooking facilities, high-speed Wi-Fi internet, LED TV with cable connection, air conditioning, and regular housekeeping services. Additionally, most properties offer complimentary laundry services, secure parking, 24/7 security, power backup, and access to common areas. Some premium properties also feature fitness facilities, gardens, and recreational spaces. All utilities including electricity, water, and internet are included in the rental."
    },
    {
      question: "How do I book a stay?",
      answer: "Booking with QureHome is simple and straightforward. You can book directly through our website by selecting your preferred dates, location (city), and number of guests. The booking process takes just a few minutes - select your dates, choose a property, review the details, and complete the payment. Alternatively, you can contact us directly via phone (+91 7892341731) or email (info@qurehome.com), and our friendly team will assist you with the entire booking process, answer any questions you may have, and help you find the perfect property that meets your specific needs."
    },
    {
      question: "What is the minimum stay duration?",
      answer: "The minimum stay duration varies by property, but typically ranges from 3 to 7 days. Most of our properties have a minimum stay of 5 days, which allows for a comfortable recovery period. However, we understand that medical situations can vary, and we offer flexible booking options to accommodate both short-term recovery stays (3-7 days) and longer-term arrangements (weeks or months). Extended stays often come with discounted rates."
    },
    {
      question: "Are pets allowed?",
      answer: "Pet policies vary by property, as some of our recovery homes may have restrictions due to medical considerations and other guests' health needs. However, we do have pet-friendly properties available. If you need to bring a pet, please contact us directly to discuss your specific situation. We'll help you find a property that accommodates your pet while ensuring it doesn't interfere with your recovery or other guests' comfort. Service animals are always welcome at all our properties."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We offer flexible cancellation policies to accommodate the unpredictable nature of medical situations. Full refunds are available for cancellations made at least 7 days before your scheduled check-in date. For cancellations made between 3-7 days before check-in, we offer a 50% refund. Cancellations made less than 3 days before check-in may be subject to a cancellation fee, though we understand medical emergencies can arise, and we handle such cases with compassion on a case-by-case basis. In case of medical emergencies or hospital admission delays, we work with you to reschedule or provide appropriate refunds."
    },
    {
      question: "Do you provide medical equipment?",
      answer: "Yes, we can arrange various medical equipment through our partner network. Basic medical equipment such as hospital beds (electric or manual), wheelchairs, walkers, commodes, oxygen concentrators, and patient lifts can be arranged for your stay. Advanced medical equipment like CPAP machines, nebulizers, or specialized monitoring devices may require coordination with medical supply companies, which we can facilitate. Equipment rental charges are separate and vary based on the type and duration of use."
    },
    {
      question: "Is there 24/7 support available?",
      answer: "Yes, we provide round-the-clock support to ensure your peace of mind. Our on-site coordinators are available 24/7 to assist with any concerns, questions, or emergencies during your stay. We maintain an emergency helpline that you can call at any time for immediate assistance. Whether you need help with transportation, medical emergencies, property maintenance issues, or simply have questions about local services, our team is always ready to help."
    },
    {
      question: "Can family members stay with me?",
      answer: "Yes, family members are absolutely welcome to stay with you! We understand that having loved ones nearby is important for recovery. Our rooms are designed to accommodate additional guests, and we offer family-friendly packages that include extra beds or sofa beds. Most of our properties can accommodate 2-4 people comfortably. Additional charges may apply for extra guests, but we offer discounted rates for family members. Please mention your family accommodation requirements during booking so we can arrange the appropriate room size and configuration."
    },
    {
      question: "What languages do you support?",
      answer: "We offer comprehensive multilingual support to ensure clear communication and comfort for all our guests. Our coordinators and support staff can communicate in English, Hindi, Kannada, Tamil, Telugu, and several other regional languages. We understand that effective communication is crucial, especially in medical situations, and we ensure that language barriers never become an obstacle to your care. Our team members are trained to communicate clearly and patiently, and we can arrange interpreters if needed for medical consultations or other important communications."
    },
    {
      question: "How do I pay for my stay?",
      answer: "We accept multiple convenient payment methods to make the process as easy as possible. You can pay using credit cards, debit cards, UPI (Unified Payments Interface), net banking, bank transfers, or cash. Online payments can be made securely through our website during the booking process using our integrated payment gateway. For cash payments or bank transfers, payment can be made upon arrival or as per the agreed terms. We also offer flexible installment options for longer stays, allowing you to pay in monthly installments. All payment transactions are secure and encrypted."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header activePage="faq" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-6 pt-6 pb-8 max-w-7xl">
        {/* Back to Home Button */}
        <div className="mb-4">
        <Button
              onClick={() => navigate(-1)}
              className="mb-4 h-9 text-sm px-4 flex items-center gap-2"
              style={{
                backgroundColor: 'hsl(176.84deg 50.26% 37.06%)',
                color: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(42.69deg 77.34% 44.61%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(176.84deg 50.26% 37.06%)';
              }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </Button>
        </div>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-heading">
              Frequently Asked Questions
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our recovery homes, services, and booking process.
            </p>
          </div>

          <div className="space-y-5">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#14B8A6] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 pt-0.5">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className="ml-11">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;

