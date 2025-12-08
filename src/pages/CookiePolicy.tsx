import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-fade-up opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: December 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none animate-fade-up opacity-0 stagger-1">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit a website. 
                  They are widely used to make websites work more efficiently and provide information to 
                  the website owners. Cookies help us provide you with a better experience when you use 
                  the Ubuntu platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies on the Ubuntu platform for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the platform to function properly, including authentication and security</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our platform to improve performance</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and settings to enhance your experience</li>
                  <li><strong>Analytics Cookies:</strong> Collect anonymous information about how you use our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">3.1. Session Cookies</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      These cookies are temporary and are deleted when you close your browser. They are essential 
                      for maintaining your login session and ensuring security while using the platform.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">3.2. Persistent Cookies</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      These cookies remain on your device for a set period or until you delete them. They help us 
                      remember your preferences and improve your experience on return visits.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services that set cookies on your device. These include analytics 
                  services that help us understand how our platform is used. These third-party cookies are 
                  subject to the respective privacy policies of those third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to control and manage cookies on your device. You can:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Adjust your browser settings to refuse or delete cookies</li>
                  <li>Set your browser to notify you when cookies are being set</li>
                  <li>Use browser extensions or privacy tools to manage cookies</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong>Note:</strong> Disabling certain cookies may affect the functionality of the Ubuntu platform 
                  and may prevent you from accessing some features or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Browser-Specific Instructions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To manage cookies in your browser:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or 
                  for other operational, legal, or regulatory reasons. We will notify you of any material 
                  changes by posting the updated policy on this page with a new "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact 
                  us at privacy@ubuntu.rw.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;

