import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-fade-up opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: December 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none animate-fade-up opacity-0 stagger-1">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using the Ubuntu platform, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Eligibility</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You must be at least 18 years old and have the legal capacity to enter into binding contracts 
                  to use our platform. By registering, you confirm that you meet these requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Account Registration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To use Ubuntu, you must:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Create an account with accurate information</li>
                  <li>Make an initial deposit of ₦2,000 to activate your membership</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Referral Program</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our referral program allows you to earn commissions by referring new users:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You earn 20% (₦400) of each successful referral's deposit</li>
                  <li>Commissions are credited after the referred user completes their deposit</li>
                  <li>Self-referrals are not permitted</li>
                  <li>Fraudulent referrals will result in account termination</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Withdrawals</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You may withdraw your earnings at any time, subject to our withdrawal processing times 
                  (typically 24 hours). Minimum withdrawal amount is ₦500. We reserve the right to verify 
                  your identity before processing withdrawals.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Prohibited Activities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Create multiple accounts</li>
                  <li>Use automated systems or bots</li>
                  <li>Engage in fraudulent activities</li>
                  <li>Misrepresent the platform to potential referrals</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time for violations of 
                  these terms or for any other reason at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ubuntu shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages resulting from your use of or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at legal@ubuntu.com.
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

export default Terms;
