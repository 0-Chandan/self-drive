import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';

const ReturnPolicy: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#006400" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Return Policy</Text>
        <Text style={styles.headerSubtitle}>Cab Car Self-Drive Rental</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.content}>
              This Return Policy governs the process for returning vehicles rented from Cab Car, a self-drive car rental service based in Ranchi, Jharkhand, India. By renting a vehicle from Cab Car, you ("the Hirer") agree to comply with the conditions outlined below. This policy is designed to ensure a smooth and transparent return process, aligning with standard practices in the Indian self-drive car rental industry and applicable regulations, such as the Motor Vehicles Act, 1988.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <Text style={styles.content}>
              For any queries or assistance regarding vehicle returns, please contact:{'\n\n'}
              <Text style={styles.boldText}>1. Address:</Text> Ratu Road, Marwari Bhawan, Near Pahadi Mandir, Nawa Toli, Ranchi, Jharkhand, India{'\n'}
              <Text style={styles.boldText}>2. Phone:</Text> 9905503825{'\n'}
              <Text style={styles.boldText}>3. Email:</Text> support@cabcar.in
            </Text>
          </View>

          {/* Return Time and Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Return Time and Location</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1. Scheduled Return:</Text> The vehicle must be returned on the scheduled date and time to the designated return location specified in the rental agreement. The return location is typically the same as the pick-up location unless otherwise agreed upon.{'\n\n'}
              <Text style={styles.boldText}>2. Late Returns:</Text> Failure to return the vehicle on time will incur additional charges. Late returns are charged at INR 500 per hour or one-third of the daily rental rate, whichever is higher, with a one-hour grace period.{'\n\n'}
              <Text style={styles.boldText}>3. Change in Return Location:</Text> Any change to the return location must be pre-approved by Cab Car. Such changes may incur a minimum fee of INR 5,000 plus GST and any additional towing or recovery costs based on the distance to the new location.
            </Text>
          </View>

          {/* Vehicle Condition */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Vehicle Condition</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1. Cleanliness:</Text> The vehicle must be returned clean and in the same condition as when rented, fair wear and tear excepted. A cleaning fee of INR 1,000 will be charged if the vehicle is returned excessively dirty (e.g., mud, stains, or debris).{'\n\n'}
              <Text style={styles.boldText}>2. Fuel Level:</Text> The vehicle must be returned with the same fuel level as at the time of pick-up. If the fuel level is lower, the Hirer will be charged for the cost of refuelling at prevailing market rates plus an administrative fee of INR 500.{'\n\n'}
              <Text style={styles.boldText}>3. Personal Belongings:</Text> All personal belongings must be removed from the vehicle before return. Cab Car is not responsible for any items left in the vehicle. If belongings are left behind, the Hirer must arrange to collect them within 15 days, or they may be disposed of.
            </Text>
          </View>

          {/* Damages and Reporting */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Damages and Reporting</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1. Reporting Damages:</Text> Any damage to the vehicle during the rental period must be reported to Cab Car immediately. In the case of an accident, the Hirer must obtain a police report and notify Cab Car within 24 hours.{'\n\n'}
              <Text style={styles.boldText}>2. Unreported Damages:</Text> Any unreported damages discovered upon return will be charged to the Hirer's security deposit or credit/debit card. The cost will include repair expenses and any associated administrative fees.{'\n\n'}
              <Text style={styles.boldText}>3. Inspection:</Text> Upon return, Cab Car will inspect the vehicle for damages. The Hirer is encouraged to be present during the inspection to ensure transparency.
            </Text>
          </View>

          {/* Early Return */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Early Return</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1. No Refunds:</Text> Early returns are permitted, but no refunds will be issued for the unused portion of the rental period. The Hirer remains responsible for the full rental charges as per the rental agreement.{'\n\n'}
              <Text style={styles.boldText}>2. Notification:</Text> If you plan to return the vehicle early, notify Cab Car as soon as possible to facilitate scheduling.
            </Text>
          </View>

          {/* Late Return */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Late Return</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1. Grace Period:</Text> A one-hour grace period is provided for returns. Beyond this, late return fees will apply as outlined in Section 1.{'\n\n'}
              <Text style={styles.boldText}>2. Impact on Next Rental:</Text> Late returns may disrupt Cab Car's scheduling for other customers, and additional charges may reflect the cost of such disruptions.
            </Text>
          </View>

          {/* Extension of Rental */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Extension of Rental</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1. Request Process:</Text> To extend the rental period, the Hirer must contact Cab Car at least 24 hours before the scheduled return time via email (support@cabcar.in) or phone (9905503825).{'\n\n'}
              <Text style={styles.boldText}>2. Availability and Charges:</Text> Extensions are subject to vehicle availability and may incur additional rental charges at the prevailing rate. The Hirer will be informed of any additional costs before the extension is confirmed.{'\n\n'}
              <Text style={styles.boldText}>3. Auto-Extension:</Text> If the Hirer fails to return the vehicle or request an extension, Cab Car may auto-extend the rental period based on the original booking terms, with no refunds for the extended period.
            </Text>
          </View>

          {/* Security Deposit */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Security Deposit</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1. Requirement:</Text> A refundable security deposit is required at the time of booking to cover potential damages, fines, or other charges.{'\n\n'}
              <Text style={styles.boldText}>2. Refund Process:</Text> The security deposit will be refunded within 30 working days after the vehicle is returned, subject to deductions for:{'\n'}
              <Text style={styles.boldText}>•</Text> Damages to the vehicle{'\n'}
              <Text style={styles.boldText}>•</Text> Traffic fines or penalties incurred during the rental period{'\n'}
              <Text style={styles.boldText}>•</Text> Cleaning or refuelling fees{'\n'}
              <Text style={styles.boldText}>•</Text> Late return fees{'\n\n'}
              <Text style={styles.boldText}>3. Disputes:</Text> If the Hirer disputes any deductions, they may contact Cab Car to resolve the issue.
            </Text>
          </View>

          {/* Compliance with Applicable Laws */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Compliance with Applicable Laws</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> The Hirer must comply with all applicable traffic laws and regulations under the Motor Vehicles Act, 1988, during the rental period.{'\n\n'}
              <Text style={styles.boldText}>2.</Text> Any fines or penalties incurred due to non-compliance will be the responsibility of the Hirer and may be deducted from the security deposit.
            </Text>
          </View>

          {/* Summary Table */}
          <View style={[styles.section, styles.tableSection]}>
            <Text style={styles.sectionTitle}>Summary of Return Policy</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Aspect</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Details</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Return Time</Text>
                <Text style={styles.tableCell}>On the scheduled date and time, with a 1-hour grace period</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Return Location</Text>
                <Text style={styles.tableCell}>Designated location in rental agreement; changes incur INR 5,000 + GST + towing costs</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Vehicle Condition</Text>
                <Text style={styles.tableCell}>Clean, same fuel level, free of belongings; cleaning fee INR 1,000 if dirty</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Fuel Level</Text>
                <Text style={styles.tableCell}>Same as at pick-up; refuelling charges + INR 500 admin fee if lower</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Damages</Text>
                <Text style={styles.tableCell}>Report immediately; unreported damages are charged to the security deposit</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Early Return</Text>
                <Text style={styles.tableCell}>Allowed, no refunds for unused time</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Late Return</Text>
                <Text style={styles.tableCell}>INR 500/hour or 1/3 daily rate after 1-hour grace period</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Extension</Text>
                <Text style={styles.tableCell}>Notify 24 hours prior; subject to availability and additional charges</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Security Deposit</Text>
                <Text style={styles.tableCell}>Refunded within 30 working days, subject to deductions</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Contact</Text>
                <Text style={styles.tableCell}>support@cabcar.in, 9905503825, Ratu Road, Ranchi, Jharkhand</Text>
              </View>
            </View>
          </View>

          {/* Citations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Citations</Text>
            <Text style={styles.content}>
              1. Motor Vehicles Act, 1988
            </Text>
          </View>

          {/* Note */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Note</Text>
            <Text style={styles.content}>
              1. This Return Policy is subject to change, and updates will be communicated via Cab Car's website or direct notification. For legal compliance, this policy should be reviewed by a professional to ensure alignment with local regulations in Jharkhand and India.
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

export default ReturnPolicy;