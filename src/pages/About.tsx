import { ArrowLeft, Heart, Shield, Users, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We understand that recovery is a personal journey. Our team is dedicated to providing empathetic support and creating a warm, welcoming environment for every guest."
    },
    {
      icon: Shield,
      title: "Medical Safety",
      description: "All our properties are strategically located near major hospitals, ensuring quick access to medical facilities. We prioritize your health and safety above all else."
    },
    {
      icon: Users,
      title: "Family-Centered",
      description: "We believe in the power of family support during recovery. Our facilities accommodate family members and create a home-like atmosphere that promotes healing."
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Every property is carefully selected to be within 3km of leading hospitals, making follow-up appointments and emergency care easily accessible."
    }
  ];

  const achievements = [
    { number: "150+", label: "Verified Health Homes" },
    { number: "24/7", label: "Nursing Support" },
    { number: "100%", label: "Medical-Ready Facilities" },
    { number: "5000+", label: "Happy Patients Served" }
  ];

  const services = [
    "Hospital-adjacent recovery homes",
    "Fully equipped kitchenettes in every room",
    "Therapeutic meal services",
    "Airport pickup and transportation",
    "24/7 on-site coordinators",
    "Nursing care coordination",
    "Wheelchair accessible facilities",
    "Multilingual support staff",
    "Medical equipment arrangements",
    "Family-friendly accommodations"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header activePage="about" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 pt-6 pb-8">
        {/* Back to Home Button */}
        <div className="mb-6">
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
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
              About QureHome
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Purpose-built recovery residences for patients seeking comfort, care, and convenience near major hospitals.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                QureHome was born from a simple yet powerful observation: patients and their families often struggle to find comfortable, affordable, and medically-convenient accommodation during treatment and recovery periods. The stress of medical procedures is challenging enough without the added burden of finding suitable housing near hospitals.
              </p>
              <p>
                Founded with a mission to bridge the gap between medical care and comfortable living, QureHome has established a network of recovery homes strategically located within 3km of major hospitals in Bangalore, Chennai, and other key medical hubs across India.
              </p>
              <p>
                We understand that recovery is not just about medical treatment—it's about creating an environment that supports healing, reduces stress, and brings families together. Every property in our network is carefully vetted to ensure it meets our high standards for safety, comfort, and accessibility.
              </p>
              <p>
                Today, we're proud to serve thousands of patients and their families, providing them with a home away from home during their most critical moments. Our commitment to compassionate care, medical safety, and family-centered support drives everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#eaf3f1] rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To provide accessible, comfortable, and medically-convenient recovery homes that support healing and bring families together during treatment and recovery periods. We strive to eliminate the stress of finding suitable accommodation so patients can focus on what matters most—their health and recovery.
              </p>
            </div>
            <div className="bg-[#eaf3f1] rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To become India's most trusted network of recovery homes, expanding our reach to serve patients in every major medical hub. We envision a future where every patient has access to comfortable, affordable, and medically-convenient accommodation during their healthcare journey.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center font-heading">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#14B8A6] text-white rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center font-heading">
              Our Achievements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#14B8A6] mb-2">
                    {achievement.number}
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">
                    {achievement.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-heading">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#14B8A6] shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-[#eaf3f1] rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center font-heading">
              Why Choose QureHome?
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-[#14B8A6] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Proximity to Hospitals</h3>
                  <p>All our properties are within 3km of major hospitals, ensuring quick access to medical facilities for emergencies and follow-up appointments.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-[#14B8A6] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Verified & Safe</h3>
                  <p>Every property in our network undergoes rigorous verification to ensure safety, cleanliness, and compliance with medical accommodation standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="h-6 w-6 text-[#14B8A6] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Compassionate Support</h3>
                  <p>Our 24/7 coordinators and support staff are trained to provide empathetic, multilingual assistance throughout your stay.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-[#14B8A6] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Family-Friendly</h3>
                  <p>We understand the importance of family support during recovery. Our facilities accommodate family members and create a home-like atmosphere.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Have questions about our recovery homes? Our team is here to help you find the perfect accommodation for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/contact")}
                className="bg-[#14B8A6] hover:bg-[#119e8f] text-white px-8 py-6 text-base font-semibold rounded-full"
              >
                Contact Us
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white px-8 py-6 text-base font-semibold rounded-full"
              >
                Browse Health Homes
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;

