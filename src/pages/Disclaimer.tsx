import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-fade-up opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Disclaimer
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: December 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none animate-fade-up opacity-0 stagger-1">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. General Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The information provided on the Ubuntu platform is for general informational purposes only. 
                  While we strive to keep the information accurate and up-to-date, we make no representations 
                  or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
                  suitability, or availability of the platform or the information contained on it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Earnings Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Earnings on the Ubuntu platform are not guaranteed and may vary based on:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Number of tasks completed</li>
                  <li>Number of successful referrals and their deposit amounts</li>
                  <li>Platform availability and task availability</li>
                  <li>Compliance with platform terms and conditions</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Past performance does not guarantee future results. Your actual earnings may differ from 
                  any examples or estimates provided on the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Withdrawal Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Withdrawals are subject to the following conditions:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Minimum withdrawal amount is 10,000 RWF</li>
                  <li>Withdrawal processing times may vary and are typically within 24 hours</li>
                  <li>Withdrawals may be delayed for security verification purposes</li>
                  <li>We are not responsible for delays caused by MTN Mobile Money or third-party payment processors</li>
                  <li>Withdrawal fees, if any, are the responsibility of the user</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Referral Program Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The referral program operates under the following conditions:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>You earn 40% commission on each successful referral's deposit</li>
                  <li>Commissions are only credited after the referred user completes their deposit</li>
                  <li>Self-referrals and fraudulent referrals are strictly prohibited</li>
                  <li>We reserve the right to verify referrals and withhold commissions for suspicious activity</li>
                  <li>Referral program terms may change with prior notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not guarantee that the Ubuntu platform will be available at all times or that it will 
                  be free from errors, interruptions, or technical issues. We reserve the right to suspend, 
                  modify, or discontinue any part of the service at any time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Ubuntu platform uses third-party services, including MTN Mobile Money for payment processing. 
                  We are not responsible for the availability, accuracy, or reliability of these third-party 
                  services. Your use of third-party services is subject to their respective terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, Ubuntu shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including but not limited to loss of profits, 
                  data, or use, arising out of or in connection with your use of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. No Investment Advice</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Ubuntu platform is not an investment service. The platform provides opportunities to earn 
                  money through tasks and referrals, but does not constitute financial, investment, or legal advice. 
                  You should not rely on the platform as a primary source of income.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this disclaimer, please contact us at legal@ubuntu.rw.
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

export default Disclaimer;

