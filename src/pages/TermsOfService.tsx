import { ArrowLeft, FileText, Shield, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using QureHome's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: "2. Description of Service",
      content: `QureHome provides a platform that connects patients and their families with recovery homes and medical accommodation facilities located near major hospitals. We facilitate bookings, provide information about properties, and coordinate services related to recovery home stays. Our services include property listings, booking management, customer support, and coordination of additional services such as transportation and nursing care.`
    },
    {
      title: "3. User Responsibilities",
      content: `Users are responsible for:
- Providing accurate and complete information during booking
- Ensuring all personal and medical information is current and truthful
- Complying with all applicable laws and regulations
- Respecting the property and other guests during their stay
- Making timely payments as per the booking agreement
- Informing QureHome of any changes to booking requirements
- Following all property rules and guidelines provided by property owners`
    },
    {
      title: "4. Booking and Payment Terms",
      content: `Bookings are subject to availability and confirmation by the property owner. Payment terms vary by property and booking duration:
- Full payment or deposit may be required at the time of booking
- Cancellation policies vary by property (typically 7 days for full refund)
- Additional charges may apply for extra guests, extended stays, or special services
- All prices are displayed in Indian Rupees (INR) unless otherwise stated
- Payment methods accepted include credit/debit cards, UPI, net banking, and bank transfers
- Refunds, if applicable, will be processed according to the cancellation policy`
    },
    {
      title: "5. Cancellation and Refund Policy",
      content: `Cancellation policies are property-specific and will be clearly stated at the time of booking:
- Cancellations made 7 or more days before check-in: Full refund (minus processing fees)
- Cancellations made 3-7 days before check-in: 50% refund
- Cancellations made less than 3 days before check-in: No refund (unless due to medical emergency)
- Medical emergencies and hospital admission delays are handled with compassion on a case-by-case basis
- Refunds will be processed to the original payment method within 7-14 business days
- QureHome reserves the right to cancel bookings in exceptional circumstances with full refund`
    },
    {
      title: "6. Property Standards and Safety",
      content: `While we strive to ensure all properties meet our quality standards:
- Properties are verified for basic safety, cleanliness, and accessibility
- We do not guarantee specific amenities or conditions beyond what is listed
- Property owners are responsible for maintaining their facilities
- Guests should report any issues immediately to our support team
- QureHome is not liable for accidents, injuries, or property damage
- Medical emergencies should be directed to local emergency services (108/102)`
    },
    {
      title: "7. Limitation of Liability",
      content: `QureHome acts as an intermediary platform connecting guests with property owners. We are not responsible for:
- Property conditions, amenities, or services provided by property owners
- Medical care, nursing services, or health-related outcomes
- Transportation delays, accidents, or third-party service issues
- Loss of personal belongings or property damage
- Any disputes between guests and property owners
- Our liability is limited to the amount paid for the booking service fee`
    },
    {
      title: "8. Medical Disclaimer",
      content: `QureHome provides accommodation services only and does not provide medical care:
- We are not a medical facility or healthcare provider
- Our properties are recovery homes, not hospitals or clinics
- Guests are responsible for their own medical care and decisions
- We coordinate nursing services through third-party agencies but are not liable for their services
- Medical emergencies should be handled through proper medical channels
- Guests should consult with their healthcare providers regarding accommodation suitability`
    },
    {
      title: "9. Privacy and Data Protection",
      content: `Your privacy is important to us. Please review our Privacy Policy for details on how we collect, use, and protect your personal information. By using our services, you consent to the collection and use of information as described in our Privacy Policy.`
    },
    {
      title: "10. Intellectual Property",
      content: `All content on the QureHome website, including text, graphics, logos, images, and software, is the property of QureHome or its content suppliers and is protected by Indian and international copyright laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.`
    },
    {
      title: "11. Prohibited Activities",
      content: `Users are prohibited from:
- Using the service for any illegal or unauthorized purpose
- Violating any laws in your jurisdiction
- Transmitting any viruses, worms, or malicious code
- Attempting to gain unauthorized access to our systems
- Using automated systems to access the service without permission
- Impersonating any person or entity
- Harassing, threatening, or abusing other users or property owners`
    },
    {
      title: "12. Modifications to Service",
      content: `QureHome reserves the right to modify, suspend, or discontinue any aspect of the service at any time, with or without notice. We may update these Terms of Service periodically, and continued use of the service after changes constitutes acceptance of the new terms.`
    },
    {
      title: "13. Dispute Resolution",
      content: `In case of disputes:
- We encourage direct communication between guests and property owners
- QureHome support team is available to mediate disputes
- Disputes will be resolved through negotiation in good faith
- If resolution cannot be reached, disputes will be subject to the jurisdiction of courts in Bangalore, India
- Indian law governs these Terms of Service`
    },
    {
      title: "14. Contact Information",
      content: `For questions about these Terms of Service, please contact us:
- Email: info@qurehome.com
- Phone: +91 7892341731
- Address: Bannerghatta Road Corridor, Bangalore, India
- Our support team is available 24/7 to assist you`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header activePage="terms" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-6 pt-6 pb-8 max-w-7xl">
        {/* Back to Home Button */}
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FileText className="h-8 w-8 text-[#14B8A6]" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading">
                Terms of Service
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using QureHome services.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Important Notice */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 md:p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1 text-sm">Important Notice</h3>
                <p className="text-amber-800 leading-relaxed text-xs md:text-sm">
                  By using QureHome's services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services. We recommend reviewing these terms periodically as they may be updated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-heading">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agreement Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-[#eaf3f1] rounded-xl p-6 md:p-8 text-center">
            <Shield className="h-10 w-10 text-[#14B8A6] mx-auto mb-3" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-heading">
              Your Agreement
            </h2>
            <p className="text-gray-700 text-sm md:text-base mb-4 max-w-2xl mx-auto">
              By using QureHome services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you have any questions, please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate("/contact")}
                className="bg-[#14B8A6] hover:bg-[#119e8f] text-white px-6 py-4 text-sm font-semibold rounded-full"
              >
                Contact Support
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white px-6 py-4 text-sm font-semibold rounded-full"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;

