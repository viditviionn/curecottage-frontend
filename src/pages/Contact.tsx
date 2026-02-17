import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add API call here to send the form data
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+91 7892341731",
      link: "tel:+917892341731"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@qurehome.com",
      link: "mailto:info@qurehome.com"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "Bannerghatta Road Corridor, Bangalore, India",
      link: "#"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "24/7 Support Available",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header activePage="contact" />
      
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
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
              Contact Us
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions? We're here to help! Get in touch with our team and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#14B8A6] text-white rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-heading">
                  Send us a Message
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 1234567890"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-700 font-semibold">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this regarding?"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-semibold">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="mt-2 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#14B8A6] hover:bg-[#119e8f] text-white py-4 text-sm font-semibold rounded-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Info Cards */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.link}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-[#eaf3f1] group-hover:bg-[#14B8A6] rounded-full flex items-center justify-center transition-colors">
                          <Icon className="h-6 w-6 text-[#14B8A6] group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h3>
                          <p className="text-gray-600">
                            {info.content}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-[#eaf3f1] rounded-2xl p-8 md:p-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                  We're Here to Help
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Whether you're looking for a recovery home, have questions about our services, or need assistance with an existing booking, our team is ready to assist you.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  For urgent matters, please call us directly at <a href="tel:+917892341731" className="text-[#14B8A6] font-semibold hover:underline">+91 7892341731</a>. Our support team is available 24/7.
                </p>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/faq")}
                    className="w-full justify-start border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white"
                  >
                    View FAQ
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/about")}
                    className="w-full justify-start border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white"
                  >
                    Learn About Us
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full justify-start border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white"
                  >
                    Browse Health Homes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

