import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';

const PrivacyPolicy: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#800000" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <Text style={styles.headerSubtitle}>Cab Car Self-Drive Rental</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.content}>
              At Cab Car, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our self-drive car rental services. By using our services, you consent to the practices described in this policy. This policy complies with the Digital Personal Data Protection Act, 2023 (DPDP Act), ensuring transparency and protection of your data.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <Text style={styles.content}>
              If you have any questions about this Privacy Policy or wish to exercise your rights under the DPDP Act, please contact us at:{'\n\n'}
              <Text style={styles.boldText}>1. Cab Car</Text>{'\n'}
              <Text style={styles.boldText}>2. Address:</Text> Ratu Road, Marwari Bhawan, Near Pahadi Mandir, Nawa Toli, Ranchi, Jharkhand, India{'\n'}
              <Text style={styles.boldText}>3. Phone:</Text> 9905503825{'\n'}
              <Text style={styles.boldText}>4. Email:</Text> support@cabcar.in
            </Text>
          </View>

          {/* Information We Collect */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Text style={styles.content}>
              We collect personal information you provide directly, such as when you book a rental, create an account, or contact customer service. This may include:{'\n\n'}
              <Text style={styles.boldText}>1. Personal details:</Text> Name, date of birth, address, phone number, email address{'\n'}
              <Text style={styles.boldText}>2. Identification documents:</Text> Driver's license number, passport number{'\n'}
              <Text style={styles.boldText}>3. Payment information:</Text> Credit card details, bank account information{'\n'}
              <Text style={styles.boldText}>4. Location data:</Text> GPS coordinates if you use our navigation services{'\n'}
              <Text style={styles.boldText}>5. Other information:</Text> Rental preferences, feedback, etc.{'\n\n'}
              We may also collect information automatically through your use of our website or mobile app, such as your IP address, browser type, device information, and cookies.
            </Text>
          </View>

          {/* Purpose of Data Collection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Purpose of Data Collection</Text>
            <Text style={styles.content}>
              We collect your personal information for the following purposes:{'\n\n'}
              <Text style={styles.boldText}>1.</Text> To provide and improve our services{'\n'}
              <Text style={styles.boldText}>2.</Text> To process your rental bookings and payments{'\n'}
              <Text style={styles.boldText}>3.</Text> To communicate with you about your rentals, promotions, and other updates{'\n'}
              <Text style={styles.boldText}>4.</Text> To ensure compliance with legal obligations{'\n'}
              <Text style={styles.boldText}>5.</Text> To prevent fraud and ensure security
            </Text>
          </View>

          {/* How We Use Your Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
            <Text style={styles.content}>
              We use your personal information as described in the "Purpose of Data Collection" section above. This includes facilitating your car rental experience, personalising services, and ensuring operational efficiency.
            </Text>
          </View>

          {/* Sharing Your Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Sharing Your Information</Text>
            <Text style={styles.content}>
              We may share your personal information with:{'\n\n'}
              <Text style={styles.boldText}>1.</Text> Service providers who help us operate our business (e.g., payment processors, IT support){'\n'}
              <Text style={styles.boldText}>2.</Text> Law enforcement or government agencies, when required by law{'\n'}
              <Text style={styles.boldText}>3.</Text> Third parties with your consent{'\n\n'}
              We ensure that any third parties to whom we share data adhere to applicable data protection standards.
            </Text>
          </View>

          {/* Data Security */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Data Security</Text>
            <Text style={styles.content}>
              We implement reasonable security measures to protect your personal information from unauthorised access, use, or disclosure. We take particular care to safeguard sensitive information, such as payment details and identification documents. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </Text>
          </View>

          {/* Data Retention */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Data Retention</Text>
            <Text style={styles.content}>
              We retain your personal information only for as long as necessary to provide our services, comply with applicable laws and regulations, and resolve any disputes that may arise. The retention period may vary depending on the type of data and legal requirements.
            </Text>
          </View>

          {/* Your Rights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Your Rights</Text>
            <Text style={styles.content}>
              Under the Digital Personal Data Protection Act, 2023, you have the right to:{'\n\n'}
              <Text style={styles.boldText}>1.</Text> Access your data{'\n'}
              <Text style={styles.boldText}>2.</Text> Correct or update your data{'\n'}
              <Text style={styles.boldText}>3.</Text> Delete your data{'\n'}
              <Text style={styles.boldText}>4.</Text> Opt out of certain uses of your data{'\n'}
              <Text style={styles.boldText}>5.</Text> Withdraw your consent{'\n\n'}
              To exercise these rights, please contact us at the details provided in the "Contact Us" section.
            </Text>
          </View>

          {/* Consent */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Consent</Text>
            <Text style={styles.content}>
              By using our services and providing your personal information, you consent to the collection, use, and disclosure of your information as described in this policy. You may withdraw your consent at any time by contacting us, but this may limit our ability to provide our services to you.
            </Text>
          </View>

          {/* Children's Privacy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Children's Privacy</Text>
            <Text style={styles.content}>
              Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected such data, we will take steps to delete it.
            </Text>
          </View>

          {/* International Data Transfers */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. International Data Transfers</Text>
            <Text style={styles.content}>
              Your personal information may be transferred to and processed in countries other than India, where data protection laws may differ. We will ensure that such transfers comply with applicable laws, including the DPDP Act.
            </Text>
          </View>

          {/* Cookies and Tracking Technologies */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Cookies and Tracking Technologies</Text>
            <Text style={styles.content}>
              We use cookies and similar technologies to enhance your experience on our website and app. These help us understand user preferences and improve our services. You can manage your cookie preferences through your browser settings.
            </Text>
          </View>

          {/* Changes to This Policy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>12. Changes to This Policy</Text>
            <Text style={styles.content}>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any changes by posting the updated policy on our website. The "Last Updated" date will be revised accordingly.
            </Text>
          </View>

          {/* Compliance with the DPDP Act */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compliance with the DPDP Act</Text>
            <Text style={styles.content}>
              This Privacy Policy is designed to comply with the Digital Personal Data Protection Act, 2023. We provide this notice to inform you of our data practices and obtain your consent for processing your data. If Cab Car is designated as a Significant Data Fiduciary (SDF) by the government, we will appoint a Data Protection Officer, conduct Data Protection Impact Assessments, and comply with additional obligations as required.
            </Text>
          </View>

          {/* Summary Table */}
          <View style={[styles.section, styles.tableSection]}>
            <Text style={styles.sectionTitle}>Summary of Data Practices</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Aspect</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Details</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Data Collected</Text>
                <Text style={styles.tableCell}>Name, address, phone, email, driver's license, payment info, location data</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Purpose</Text>
                <Text style={styles.tableCell}>Service provision, booking processing, communication, fraud prevention</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Sharing</Text>
                <Text style={styles.tableCell}>Service providers, legal authorities (if required), with user consent</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Security Measures</Text>
                <Text style={styles.tableCell}>Encryption, access controls, special care for sensitive data</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Retention Period</Text>
                <Text style={styles.tableCell}>As long as necessary for services, legal obligations, or dispute resolution</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>User Rights</Text>
                <Text style={styles.tableCell}>Access, correct, delete, opt-out, withdraw consent</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Contact for Queries</Text>
                <Text style={styles.tableCell}>support@cabcar.in, 9905503825, Ratu Road, Marwari Bhawan, Near Pahadi Mandir, Nawa Toli, Ranchi, Jharkhand, India</Text>
              </View>
            </View>
          </View>

          {/* Citations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Citations</Text>
            <Text style={styles.content}>
              1. Digital Personal Data Protection Act, 2023{'\n'}
              2. Data Protection Laws of the World - India{'\n'}
              3. Privacy Notice Requirements
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Last Updated: June 2023</Text>
            <Text style={styles.footerText}>© 2023 Cab Car. All rights reserved.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f1f1',
  },
  header: {
    backgroundColor: '#006400',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#f8d7da',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  section: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    paddingBottom: 20,
  },
  tableSection: {
    borderBottomWidth: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#006400',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  content: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 24,
  },
  boldText: {
    fontWeight: '600',
    color: '#006400',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: '700',
    color: '#006400',
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  footerText: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default PrivacyPolicy;