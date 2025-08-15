import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';

const TermCondition: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#006400" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <Text style={styles.headerSubtitle}>Cab Car Self-Drive Rental</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.content}>
              These Terms and Conditions ("Terms") govern the rental of vehicles from Cab Car, a self-drive car rental service based in Ranchi, Jharkhand, India. By booking a vehicle with Cab Car, you ("the Hirer") agree to be bound by these Terms. These Terms ensure a transparent and fair rental process, aligning with applicable laws in India, including the Motor Vehicles Act, 1988, and local regulations in Jharkhand.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <Text style={styles.content}>
              For any queries or concerns, please contact Cab Car at:{'\n\n'}
              <Text style={styles.boldText}>• Address:</Text> Ratu Road, Marwari Bhawan, Near Pahadi Mandir, Nawa Toli, Ranchi, Jharkhand, India{'\n'}
              <Text style={styles.boldText}>• Phone:</Text> 9905503825{'\n'}
              <Text style={styles.boldText}>• Email:</Text> support@cabcar.in
            </Text>
          </View>

          {/* Definitions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Definitions</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1. Cab Car:</Text> The car rental service provider based in Ranchi, Jharkhand.{'\n'}
              <Text style={styles.boldText}>2. Hirer:</Text> The individual or entity renting the vehicle from Cab Car.{'\n'}
              <Text style={styles.boldText}>3. Vehicle:</Text> The car rented by the Hirer from Cab Car.{'\n'}
              <Text style={styles.boldText}>4. Rental Period:</Text> The period for which the Vehicle is rented, as specified in the booking confirmation.{'\n'}
              <Text style={styles.boldText}>5. Rental Charges:</Text> The fees payable by the Hirer for renting the Vehicle, detailed in the booking confirmation.
            </Text>
          </View>

          {/* Booking and Reservation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Booking and Reservation</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> Bookings can be made through Cab Car's website, mobile app, or customer service.{'\n'}
              <Text style={styles.boldText}>2.</Text> A booking is confirmed only upon receipt of the Rental Charges and any applicable security deposit.{'\n'}
              <Text style={styles.boldText}>3.</Text> Cab Car reserves the right to refuse a booking if the Hirer does not meet eligibility criteria or if the Vehicle is unavailable.
            </Text>
          </View>

          {/* Rental Charges and Payments */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Rental Charges and Payments</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> The Hirer must pay the Rental Charges in advance at the time of booking.{'\n'}
              <Text style={styles.boldText}>2.</Text> A refundable security deposit may be required, which will be returned upon the Vehicle's return in good condition, subject to deductions for damages, fines, or other losses.{'\n'}
              <Text style={styles.boldText}>3.</Text> All payments must be made in Indian Rupees (INR) via credit/debit cards or other methods specified by Cab Car.{'\n'}
              <Text style={styles.boldText}>4.</Text> Applicable taxes, such as Goods and Services Tax (GST), will be added to the Rental Charges and security deposit.
            </Text>
          </View>

          {/* Vehicle Condition and Inspection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Vehicle Condition and Inspection</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> Upon picking up the Vehicle, the Hirer must inspect it for pre-existing damages and report them to Cab Car immediately, noting any issues on the rental agreement.{'\n'}
              <Text style={styles.boldText}>2.</Text> The Hirer is responsible for returning the Vehicle in the same condition as when rented, fair wear and tear excepted.{'\n'}
              <Text style={styles.boldText}>3.</Text> Any unreported damages upon return will be charged to the Hirer's account.
            </Text>
          </View>

          {/* Hirer's Responsibilities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Hirer's Responsibilities</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> The Hirer must hold a valid Indian driving license or an international driving permit, held for at least two years.{'\n'}
              <Text style={styles.boldText}>2.</Text> The Hirer must comply with all traffic laws and regulations under the Motor Vehicles Act, 1988, and other applicable laws.{'\n'}
              <Text style={styles.boldText}>3.</Text> The Hirer is responsible for all costs related to fuel, tolls, parking, and other expenses incurred during the Rental Period.{'\n'}
              <Text style={styles.boldText}>4.</Text> The Vehicle must be returned to the designated location by the end of the Rental Period. Late returns will incur a fee of INR 500 per hour or 1/3 of the daily rate, whichever is higher.{'\n'}
              <Text style={styles.boldText}>5.</Text> The Vehicle must not be used for commercial purposes, racing, towing, or off-road driving.{'\n'}
              <Text style={styles.boldText}>6.</Text> Smoking or carrying luggage in a manner that damages the Vehicle is prohibited, with fines of INR 2,000 for violations.
            </Text>
          </View>

          {/* Insurance and Liability */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Insurance and Liability</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> Cab Car provides basic insurance coverage for the Vehicle, details of which will be provided at the time of booking.{'\n'}
              <Text style={styles.boldText}>2.</Text> The Hirer is liable for any insurance excess or deductible amounts in case of accidents or damages, as per the insurance policy.{'\n'}
              <Text style={styles.boldText}>3.</Text> The Hirer is personally liable for any injuries or damages caused to third parties while driving the Vehicle.{'\n'}
              <Text style={styles.boldText}>4.</Text> In case of an accident, the Hirer must obtain a police report and inform Cab Car immediately. Unreported damages will be fully charged to the Hirer.
            </Text>
          </View>

          {/* Cancellation and Refund Policy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Cancellation and Refund Policy</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> Cancellations made more than 48 hours before the start of the Rental Period are eligible for a full refund, minus a 5% administrative fee.{'\n'}
              <Text style={styles.boldText}>2.</Text> Cancellations made less than 48 hours before the start of the Rental Period may result in forfeiture of the Rental Charges.{'\n'}
              <Text style={styles.boldText}>3.</Text> No refunds will be issued for no-shows or cancellations after the Rental Period begins.{'\n'}
              <Text style={styles.boldText}>4.</Text> Modifications to bookings (e.g., change in return location) may incur a minimum fee of INR 5,000 plus GST and any towing expenses.
            </Text>
          </View>

          {/* Additional Drivers */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Additional Drivers</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> Only the Hirer and additional drivers authorised by Cab Car in writing may drive the Vehicle.{'\n'}
              <Text style={styles.boldText}>2.</Text> Additional drivers must meet the same eligibility criteria as the Hirer (minimum 25 years old, valid license for 2+ years) and may incur a fee of INR 400 per rental.{'\n'}
              <Text style={styles.boldText}>3.</Text> All authorised drivers are jointly and severally liable for obligations under these Terms.
            </Text>
          </View>

          {/* Geographic Restrictions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Geographic Restrictions</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> The Vehicle must be used only within the territory of India.{'\n'}
              <Text style={styles.boldText}>2.</Text> The Hirer must not drive the Vehicle into restricted areas, such as military zones, Naxal-affected areas, or international borders, without prior written permission from Cab Car.{'\n'}
              <Text style={styles.boldText}>3.</Text> Violation of geographic restrictions may result in a penalty of INR 10,000 plus recovery costs.
            </Text>
          </View>

          {/* Eligibility */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Eligibility</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> The Hirer must be at least 25 years old and have held a valid driving license for at least two years.{'\n'}
              <Text style={styles.boldText}>2.</Text> The Hirer must provide identification proof (e.g., Aadhaar, passport, or voter ID) at the time of booking.
            </Text>
          </View>

          {/* Return Condition */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Return Condition</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> The Vehicle must be returned clean, with the fuel tank at the same level as when picked up, and free of personal belongings.{'\n'}
              <Text style={styles.boldText}>2.</Text> Failure to return the Vehicle with the same fuel level may result in a refuelling charge.{'\n'}
              <Text style={styles.boldText}>3.</Text> Any cleaning required due to excessive dirt or damage will incur a fee of INR 1,000.
            </Text>
          </View>

          {/* Fines and Penalties */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>12. Fines and Penalties</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> The Hirer is responsible for any parking tickets, traffic fines, or other penalties incurred during the Rental Period.{'\n'}
              <Text style={styles.boldText}>2.</Text> Cab Car may charge the Hirer's credit/debit card for any fines or penalties, plus an administrative fee of INR 500 per incident.
            </Text>
          </View>

          {/* Reporting Incidents */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>13. Reporting Incidents</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> In the event of an accident, breakdown, or any other incident involving the Vehicle, the Hirer must immediately notify Cab Car and follow their instructions.{'\n'}
              <Text style={styles.boldText}>2.</Text> Failure to report incidents promptly may result in additional charges or liability for the Hirer.
            </Text>
          </View>

          {/* Governing Law and Jurisdiction */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>14. Governing Law and Jurisdiction</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> These Terms shall be governed by and construed by the laws of India, including the Motor Vehicles Act, 1988.{'\n'}
              <Text style={styles.boldText}>2.</Text> Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Ranchi, Jharkhand.
            </Text>
          </View>

          {/* Entire Agreement */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>15. Entire Agreement</Text>
            <Text style={styles.content}>
              <Text style={styles.boldText}>1.</Text> These Terms constitute the entire agreement between Cab Car and the Hirer and supersede all prior agreements or understandings.{'\n'}
              <Text style={styles.boldText}>2.</Text> Any amendments to these Terms must be made in writing and signed by both parties.
            </Text>
          </View>

          {/* Compliance with Applicable Laws */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compliance with Applicable Laws</Text>
            <Text style={styles.content}>
              Cab Car operates in compliance with all applicable laws and regulations in India, including those related to car rentals and self-drive services. The Hirer must also comply with all local laws and regulations while using the Vehicle, including obtaining any necessary permits for interstate travel.
            </Text>
          </View>

          {/* Summary Table */}
          <View style={[styles.section, styles.tableSection]}>
            <Text style={styles.sectionTitle}>Summary of Key Terms</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Aspect</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Details</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Eligibility</Text>
                <Text style={styles.tableCell}>Minimum 25 years old, valid driving license for 2+ years, ID proof required</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Rental Charges</Text>
                <Text style={styles.tableCell}>Paid upfront, plus refundable security deposit and applicable taxes</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Vehicle Use</Text>
                <Text style={styles.tableCell}>Only within India, no restricted areas, no commercial use or racing</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Insurance</Text>
                <Text style={styles.tableCell}>Basic coverage provided, Hirer liable for excess and third-party damages</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Cancellation</Text>
                <Text style={styles.tableCell}>Full refund (minus fees) if cancelled 48+ hours before, no refund for no-shows</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Fines/Penalties</Text>
                <Text style={styles.tableCell}>Hirer is responsible for traffic fines, parking tickets, plus an INR 500 admin fee per incident</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.boldText]}>Return Condition</Text>
                <Text style={styles.tableCell}>Clean, same fuel level, free of belongings; cleaning fee INR 1,000 if needed</Text>
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
              1. Self-Drive Terms and Conditions{'\n'}
              2. Onroadz Terms and Conditions{'\n'}
              3. Legal Requirements for Self-Drive Car Rental in India{'\n'}
              4. Standard Terms and Conditions for Car Rental in India{'\n'}
              5. Motor Vehicles Act, 1988
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

export default TermCondition;