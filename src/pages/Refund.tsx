import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-fade-up opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Refund Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: December 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none animate-fade-up opacity-0 stagger-1">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Entry Deposit Refunds</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The initial 2,000 RWF entry deposit is non-refundable once your account has been activated. 
                  This deposit activates your membership and referral capabilities on the Ubuntu platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Cooling-Off Period</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have not made any referrals or used any platform features within 24 hours of your deposit, 
                  you may request a full refund of your entry deposit. To request a refund within this period, 
                  please contact our support team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Commission Withdrawals</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Earned commissions can be withdrawn at any time via MTN Mobile Money and are not subject to this refund policy. 
                  Once a withdrawal is processed, it cannot be reversed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Refund Exceptions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Refunds may be considered in the following exceptional circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Technical errors that resulted in duplicate payments</li>
                  <li>Unauthorized transactions (with proper documentation)</li>
                  <li>Service unavailability exceeding 7 consecutive days</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Refund Process</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To request a refund:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Contact our support team at refunds@ubuntu.rw</li>
                  <li>Provide your account email and transaction details</li>
                  <li>State the reason for your refund request</li>
                  <li>Allow up to 7 business days for review</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Refund Timeline</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Approved refunds will be processed within 7-14 business days and credited to your 
                  MTN Mobile Money account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Account Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If your account is terminated due to violations of our Terms of Service, no refund of 
                  the entry deposit will be provided. Any earned but unwithdrawn commissions may be forfeited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For any questions about our refund policy or to request a refund, please contact us at 
                  refunds@ubuntu.rw or through our support portal.
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

export default Refund;
