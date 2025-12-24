import { CheckCircle, Mail, Phone, Send, User, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const FormOverlay = () => {
  const param = useParams()
  const id = param?.id ?? 0
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Open popup with smooth transition
  const openPopup = () => {
    setIsOpen(true);
    setShowThankYou(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  };

  // Close popup with smooth transition
  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setShowThankYou(false);
      setFormData({ name: "", email: "", phone: "" });
    }, 300);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/inventory/quote/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            car: +id
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setShowThankYou(true);
      } else {
        throw new Error(data.message || "Failed to submit appointment request");
      }
    } catch (error) {
      console.error("Error sending appointment request:", error);
      alert("There was an error sending your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Appointment Button */}

      <button
        onClick={openPopup}
        className="w-full bg-[rgba(255,221,187,1)] text-black font-bold py-3 px-4 rounded-lg hover:bg-[rgba(139,100,61,1)] transition cursor-pointer"
      >
        Get a Quote
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center transition-all duration-300 ease-in-out ${
            isVisible ? "bg-opacity-50 backdrop-blur-sm" : "bg-opacity-0"
          }`}
          onClick={closePopup}
        >
          <div
            className={`relative w-full max-w-md mx-4 transform transition-all duration-300 ease-in-out ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-4 relative">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  GET A QUOTE
                </h2>
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {!showThankYou ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Request
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Thank You Message */
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Your qoute request has been sent successfully.
                      </p>
                      <p className="text-sm text-gray-500">
                        We&apos;ll contact you soon at{" "}
                        <strong>{formData.email}</strong> to confirm your qoute.
                      </p>
                    </div>
                    <button
                      onClick={closePopup}
                      className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-medium py-2 px-6 rounded-lg transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormOverlay;
